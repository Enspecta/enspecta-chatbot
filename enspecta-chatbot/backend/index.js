const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk').default;
const { systemPrompt } = require('./knowledge');
const { logChat, getStats } = require('./analytics');

const app = express();
app.use(express.json({ limit: '50kb' }));

// Public widget API — allow all origins so it can be embedded on any site
app.use(cors());

// Rate limit: 20 requests per IP per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: 'För många frågor. Vänta lite och försök igen.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/chat', limiter);

// Serve built widget and admin dashboard as static files
app.use(express.static(path.join(__dirname, '../widget/dist')));

// Admin auth middleware
function checkAdminAuth(req, res, next) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return res.status(503).json({ error: 'Admin inte konfigurerat (ADMIN_PASSWORD saknas).' });
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${password}`) return res.status(401).json({ error: 'Fel lösenord.' });
  next();
}

// Health check — visar om Supabase och admin är konfigurerade
app.get('/api/health', (_req, res) => {
  res.json({
    supabase: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    admin: !!process.env.ADMIN_PASSWORD,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
  });
});

// Supabase diagnostik — testar insert och select
app.get('/api/db-test', async (_req, res) => {
  const { createClient } = require('@supabase/supabase-js');
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return res.json({ error: 'SUPABASE_URL eller SUPABASE_ANON_KEY saknas' });

  const db = createClient(url, key);

  // Raw insert — show actual Supabase error
  const insert = await db.from('chat_logs').insert({
    session_id: 'db-test',
    user_message: 'testfråga',
    bot_reply: 'testsvar',
    had_error: false,
  });

  // Raw count — show actual result
  const count = await db.from('chat_logs').select('*', { count: 'exact', head: true });

  res.json({
    supabaseUrl: url,
    insertError: insert.error ? { message: insert.error.message, code: insert.error.code, details: insert.error.details, hint: insert.error.hint } : null,
    countError: count.error ? { message: count.error.message, code: count.error.code } : null,
    totalMessages: count.count,
  });
});

// Root → demo page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../widget/dist/demo.html'));
});

// Admin dashboard page
app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, '../widget/dist/admin.html'));
});

// Admin stats API
app.get('/api/admin/stats', checkAdminAuth, async (_req, res) => {
  try {
    const stats = await getStats();
    if (!stats) return res.status(503).json({ error: 'Analytics inte konfigurerat (SUPABASE_URL/SUPABASE_ANON_KEY saknas).' });
    res.json(stats);
  } catch (err) {
    console.error('Admin stats error:', err.message);
    res.status(500).json({ error: 'Kunde inte hämta statistik.' });
  }
});

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { message, history, sessionId } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: 'Ogiltig förfrågan. Kontrollera att message är ifyllt och max 1000 tecken.'
    });
  }
  if (message.length > 1000) {
    return res.status(400).json({
      error: 'Ogiltig förfrågan. Kontrollera att message är ifyllt och max 1000 tecken.'
    });
  }
  if (history !== undefined && !Array.isArray(history)) {
    return res.status(400).json({
      error: 'Ogiltig förfrågan. Kontrollera att message är ifyllt och max 1000 tecken.'
    });
  }

  const sid = (typeof sessionId === 'string' && sessionId) ? sessionId : 'unknown';
  const validRoles = new Set(['user', 'assistant']);
  const truncatedHistory = Array.isArray(history)
    ? history
        .slice(-10)
        .filter(h => validRoles.has(h?.role) && typeof h?.content === 'string')
    : [];

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' }
        }
      ],
      messages: [
        ...truncatedHistory,
        { role: 'user', content: message }
      ]
    });

    const reply = response.content[0]?.text ?? '';
    res.json({ reply });

    logChat({ sessionId: sid, userMessage: message, botReply: reply, hadError: false }).catch(() => {});
  } catch (err) {
    console.error('Claude API error:', err.message);
    logChat({ sessionId: sid, userMessage: message, botReply: null, hadError: true }).catch(() => {});
    res.status(500).json({ error: 'Något gick fel. Försök igen eller kontakta oss direkt.' });
  }
});

module.exports = app;
