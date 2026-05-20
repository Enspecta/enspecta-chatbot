const css = require('./styles');
const Vapi = require('@vapi-ai/web').default;

const CONFIG = {
  bookingUrl: 'https://www.enspecta.se',
  phone: '010 33 33 365',
  email: 'info@enspecta.se',
  apiUrl: (typeof window !== 'undefined' && window.__ENSPECTA_CHAT_API_URL__)
    || 'https://enspecta-chatbot.onrender.com/api/chat',
};

const VAPI_PUBLIC_KEY = 'ee95b777-9ad5-443d-9b5d-0c733a319276';
const VAPI_ASSISTANT_ID = '466c99ad-1a4f-4952-a21f-c092c25d0a93';

const WELCOME = 'Hej! Jag är Aida, besiktningstekniker hos Enspecta. Jag kan svara på frågor om besiktningar, besiktningsprotokoll och byggnadsteknik. Vad kan jag hjälpa dig med?';

const QUICK_ACTIONS = [];

function getSessionId() {
  try {
    let id = sessionStorage.getItem('enspecta_session_id');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('enspecta_session_id', id);
    }
    return id;
  } catch { return 'unknown'; }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMarkdown(text) {
  return escapeHtml(text).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_, label, url) =>
    /^https:\/\/(www\.)?enspecta\.se(\/|$)/.test(url)
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
      : label
  );
}


(function () {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function getHistory() {
    try { return JSON.parse(sessionStorage.getItem('enspecta_chat_history') || '[]'); }
    catch { return []; }
  }
  function saveHistory(h) {
    sessionStorage.setItem('enspecta_chat_history', JSON.stringify(h));
  }

  const toggle = document.createElement('button');
  toggle.className = 'enspecta-chat-toggle';
  toggle.setAttribute('aria-label', 'Öppna chatt');
  toggle.innerHTML = '💬';

  const win = document.createElement('div');
  win.className = 'enspecta-chat-window enspecta-chat-hidden';
  win.innerHTML = `
    <div class="enspecta-chat-header">
      <div class="enspecta-chat-avatar-wrap">
        <img class="enspecta-chat-avatar" src="https://enspecta-chatbot.onrender.com/aida.jpg" alt="Aida Enspectsson">
      </div>
      <div>
        <div class="enspecta-chat-header-name">Aida Enspectsson</div>
        <div class="enspecta-chat-header-sub">Besiktningstekniker · Enspecta</div>
      </div>
    </div>
    <div class="enspecta-chat-messages"></div>
    <div class="enspecta-chat-quick"></div>

    <!-- Röstvy — visas när samtal är aktivt -->
    <div class="enspecta-voice-screen" id="enspecta-voice-screen">
      <img class="enspecta-voice-screen-avatar" src="https://enspecta-chatbot.onrender.com/aida.jpg" alt="Aida Enspectsson">
      <div class="enspecta-voice-screen-name">Aida Enspectsson</div>
      <div class="enspecta-voice-screen-status" id="enspecta-voice-status">Ansluter…</div>
      <div class="enspecta-voice-screen-pulse" id="enspecta-voice-pulse"></div>
      <div class="enspecta-voice-screen-btns">
        <button class="enspecta-voice-screen-mute" id="enspecta-voice-mute" title="Stäng av mikrofon">🎤</button>
        <button class="enspecta-voice-screen-end" id="enspecta-voice-end" title="Avsluta samtal">Avsluta</button>
      </div>
    </div>

    <div class="enspecta-chat-voice-bar">
      <button class="enspecta-chat-voice-btn" id="enspecta-voice-btn">
        <span class="enspecta-voice-icon">🎙️</span>
        <span class="enspecta-voice-label">Prata med mig</span>
      </button>
    </div>
    <div class="enspecta-chat-input-row">
      <textarea class="enspecta-chat-input" placeholder="Skriv din fråga..." rows="1"></textarea>
      <button class="enspecta-chat-send" aria-label="Skicka">➤</button>
    </div>
    <div class="enspecta-chat-footer">Enspecta · Certifierade besiktningstekniker</div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(win);

  const messagesEl = win.querySelector('.enspecta-chat-messages');
  const quickEl = win.querySelector('.enspecta-chat-quick');
  const inputEl = win.querySelector('.enspecta-chat-input');
  const sendBtn = win.querySelector('.enspecta-chat-send');
  const voiceBtn = win.querySelector('#enspecta-voice-btn');
  const voiceScreen = win.querySelector('#enspecta-voice-screen');
  const voiceStatus = win.querySelector('#enspecta-voice-status');
  const voicePulse = win.querySelector('#enspecta-voice-pulse');
  const voiceMute = win.querySelector('#enspecta-voice-mute');
  const voiceEnd = win.querySelector('#enspecta-voice-end');

  function showVoiceScreen() {
    voiceScreen.classList.add('visible');
    win.querySelector('.enspecta-chat-messages').style.display = 'none';
    win.querySelector('.enspecta-chat-quick').style.display = 'none';
    win.querySelector('.enspecta-chat-voice-bar').style.display = 'none';
    win.querySelector('.enspecta-chat-input-row').style.display = 'none';
  }

  function hideVoiceScreen() {
    voiceScreen.classList.remove('visible');
    win.querySelector('.enspecta-chat-messages').style.display = '';
    win.querySelector('.enspecta-chat-quick').style.display = '';
    win.querySelector('.enspecta-chat-voice-bar').style.display = '';
    win.querySelector('.enspecta-chat-input-row').style.display = '';
  }
  let quickShown = false;
  let vapi = null;
  let muted = false;

  function addBubble(text, role) {
    if (role === 'user') {
      const bubble = document.createElement('div');
      bubble.className = 'enspecta-chat-bubble enspecta-chat-user';
      bubble.innerHTML = renderMarkdown(text);
      messagesEl.appendChild(bubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return bubble;
    }
    const row = document.createElement('div');
    row.className = 'enspecta-chat-bot-row';
    const avatar = document.createElement('img');
    avatar.className = 'enspecta-chat-bubble-avatar';
    avatar.src = 'https://enspecta-chatbot.onrender.com/aida.jpg';
    avatar.alt = 'Aida';
    const bubble = document.createElement('div');
    bubble.className = 'enspecta-chat-bubble enspecta-chat-bot';
    bubble.innerHTML = renderMarkdown(text);
    row.appendChild(avatar);
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'enspecta-chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function showQuickActions() {
    if (quickShown) return;
    quickShown = true;
    QUICK_ACTIONS.forEach(({ label, action }) => {
      const btn = document.createElement('button');
      btn.className = 'enspecta-chat-quick-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        quickEl.innerHTML = '';
        if (action === 'book') {
          window.open(CONFIG.bookingUrl, '_blank', 'noopener,noreferrer');
        } else {
          sendMessage(label);
        }
      });
      quickEl.appendChild(btn);
    });
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    const history = getHistory();
    addBubble(text, 'user');
    inputEl.value = '';
    sendBtn.disabled = true;
    const typing = showTyping();

    try {
      const res = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, sessionId: getSessionId() }),
      });
      typing.remove();

      if (res.status === 429) {
        const data = await res.json();
        addBubble(data.error || 'För många frågor. Vänta lite och försök igen.', 'bot');
      } else if (!res.ok) {
        addBubble(`Något gick fel. Försök igen eller ring oss på ${CONFIG.phone}`, 'bot');
      } else {
        const data = await res.json();
        const reply = typeof data.reply === 'string' && data.reply.length > 0
          ? data.reply
          : 'Inget svar från servern.';
        addBubble(reply, 'bot');
        saveHistory([...history, { role: 'user', content: text }, { role: 'assistant', content: reply }]);
      }
    } catch {
      typing.remove();
      addBubble(`Något gick fel. Försök igen eller ring oss på ${CONFIG.phone}`, 'bot');
    } finally {
      sendBtn.disabled = false;
    }
  }

  // ── Voice ──
  voiceBtn.addEventListener('click', async () => {
    voiceBtn.disabled = true;
    voiceStatus.textContent = 'Laddar…';
    try {
      if (!vapi) {
        vapi = new Vapi(VAPI_PUBLIC_KEY);
        vapi.on('call-start', () => {
          showVoiceScreen();
          voiceStatus.textContent = 'Aida lyssnar…';
          voicePulse.classList.add('active');
        });
        vapi.on('call-end', () => {
          hideVoiceScreen();
          voiceBtn.disabled = false;
          muted = false;
          voiceMute.textContent = '🎤';
          voicePulse.classList.remove('active');
        });
        vapi.on('speech-start', () => { voiceStatus.textContent = 'Aida pratar…'; });
        vapi.on('speech-end', () => { voiceStatus.textContent = 'Aida lyssnar…'; });
        vapi.on('error', (e) => {
          console.error('VAPI error:', e);
          hideVoiceScreen();
          voiceBtn.disabled = false;
          addBubble('Det gick inte att starta samtalet: ' + (e?.message || JSON.stringify(e)), 'bot');
        });
      }
      await vapi.start(VAPI_ASSISTANT_ID);
    } catch (e) {
      console.error('Voice start error:', e);
      voiceBtn.disabled = false;
      hideVoiceScreen();
      addBubble('Det gick inte att starta samtalet: ' + (e?.message || String(e)), 'bot');
    }
  });

  voiceMute.addEventListener('click', () => {
    if (!vapi) return;
    muted = !muted;
    vapi.setMuted(muted);
    voiceMute.textContent = muted ? '🔇' : '🎤';
    voiceStatus.textContent = muted ? 'Mikrofon av' : 'Aida lyssnar…';
  });

  voiceEnd.addEventListener('click', () => {
    if (vapi) vapi.stop();
  });

  toggle.addEventListener('click', () => {
    const isOpen = !win.classList.contains('enspecta-chat-hidden');
    if (isOpen) {
      win.classList.add('enspecta-chat-hidden');
    } else {
      win.classList.remove('enspecta-chat-hidden');
      if (messagesEl.children.length === 0) {
        addBubble(WELCOME, 'bot');
        showQuickActions();
      }
      inputEl.focus();
    }
  });

  sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });
})();
