let supabase = null;

function getClient() {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(url, key);
  return supabase;
}

async function logVoiceCall({ callId, transcript, summary, durationSeconds }) {
  const db = getClient();
  if (!db) return;
  const { error } = await db.from('voice_logs').insert({
    call_id: callId,
    transcript: transcript || null,
    summary: summary || null,
    duration_seconds: durationSeconds || null,
  });
  if (error) console.error('Voice log insert error:', error.message);
}

async function logChat({ sessionId, userMessage, botReply, hadError }) {
  const db = getClient();
  if (!db) {
    console.warn('Analytics: SUPABASE_URL/SUPABASE_ANON_KEY saknas — loggar inte.');
    return;
  }
  const { error } = await db.from('chat_logs').insert({
    session_id: sessionId,
    user_message: userMessage,
    bot_reply: botReply || null,
    had_error: hadError,
  });
  if (error) console.error('Analytics insert error:', error.message, error.details);
}

async function getStats() {
  const db = getClient();
  if (!db) {
    console.warn('Analytics: SUPABASE_URL/SUPABASE_ANON_KEY saknas.');
    return null;
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [total, today, week, errors, topQ, daily, recent, voiceTotal, voiceRecent] = await Promise.all([
    db.from('chat_logs').select('*', { count: 'exact', head: true }),
    db.from('chat_logs').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
    db.from('chat_logs').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
    db.from('chat_logs').select('*', { count: 'exact', head: true }).eq('had_error', true),
    db.rpc('top_questions', { lim: 20 }),
    db.rpc('daily_chats', { days: 7 }),
    db.from('chat_logs').select('session_id, user_message, bot_reply, had_error, created_at')
      .order('created_at', { ascending: false }).limit(50),
    db.from('voice_logs').select('*', { count: 'exact', head: true }),
    db.from('voice_logs').select('call_id, transcript, summary, duration_seconds, created_at')
      .order('created_at', { ascending: false }).limit(20),
  ]);

  return {
    totalMessages: total.count ?? 0,
    todayMessages: today.count ?? 0,
    weekMessages: week.count ?? 0,
    errorCount: errors.count ?? 0,
    topQuestions: topQ.data || [],
    dailyChats: daily.data || [],
    recentLogs: recent.data || [],
    totalVoiceCalls: voiceTotal.count ?? 0,
    recentVoiceCalls: voiceRecent.data || [],
  };
}

module.exports = { logChat, logVoiceCall, getStats };
