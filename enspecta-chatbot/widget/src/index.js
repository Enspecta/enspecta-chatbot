const css = require('./styles');

const CONFIG = {
  bookingUrl: 'https://www.enspecta.se',
  phone: '010 33 33 365',
  email: 'info@enspecta.se',
  apiUrl: (typeof window !== 'undefined' && window.__ENSPECTA_CHAT_API_URL__)
    || 'https://enspecta-chatbot.onrender.com/api/chat',
};

const WELCOME = 'Hej! Jag är Aida, besiktningstekniker hos Enspecta. Jag kan svara på frågor om besiktningar, besiktningsprotokoll och byggnadsteknik. Vad kan jag hjälpa dig med?';

const QUICK_ACTIONS = [
  { label: 'Vad kostar en besiktning?', action: 'send' },
  { label: 'Hur går det till?', action: 'send' },
  { label: 'Boka besiktning', action: 'book' },
];

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

// Render [text](url) as <a> only when url is on enspecta.se
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
      <img class="enspecta-chat-avatar" src="https://enspecta-chatbot.onrender.com/aida.svg" alt="Aida Enspectsson">
      <div>
        <div class="enspecta-chat-header-name">Aida</div>
        <div class="enspecta-chat-header-sub">Besiktningsmannen · Enspecta</div>
      </div>
    </div>
    <div class="enspecta-chat-messages"></div>
    <div class="enspecta-chat-quick"></div>
    <div class="enspecta-chat-input-row">
      <textarea class="enspecta-chat-input" placeholder="Skriv din fråga..." rows="1"></textarea>
      <button class="enspecta-chat-send" aria-label="Skicka">➤</button>
    </div>
    <div class="enspecta-chat-footer">Enspecta · Certifierade besiktningsmän</div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(win);

  const messagesEl = win.querySelector('.enspecta-chat-messages');
  const quickEl = win.querySelector('.enspecta-chat-quick');
  const inputEl = win.querySelector('.enspecta-chat-input');
  const sendBtn = win.querySelector('.enspecta-chat-send');
  let quickShown = false;

  function addBubble(text, role) {
    const bubble = document.createElement('div');
    bubble.className = `enspecta-chat-bubble enspecta-chat-${role === 'user' ? 'user' : 'bot'}`;
    bubble.innerHTML = renderMarkdown(text);
    messagesEl.appendChild(bubble);
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
