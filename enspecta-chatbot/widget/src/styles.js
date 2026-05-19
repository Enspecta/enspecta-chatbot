const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.enspecta-chat-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a3c5e 0%, #1e5491 100%);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 26px;
  box-shadow: 0 4px 16px rgba(26,60,94,0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.enspecta-chat-toggle:hover {
  transform: scale(1.06);
  box-shadow: 0 6px 20px rgba(26,60,94,0.5);
}
.enspecta-chat-toggle:focus-visible { outline: 3px solid #4a90d9; outline-offset: 2px; }

.enspecta-chat-window {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 370px;
  max-height: 540px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  z-index: 9998;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  overflow: hidden;
}
.enspecta-chat-window.enspecta-chat-hidden { display: none; }

.enspecta-chat-header {
  background: linear-gradient(135deg, #1a3c5e 0%, #1e5491 100%);
  color: #fff;
  padding: 14px 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.enspecta-chat-avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
}
.enspecta-chat-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.35);
  display: block;
}
.enspecta-chat-avatar-wrap::after {
  content: '';
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 12px;
  height: 12px;
  background: #4cd964;
  border-radius: 50%;
  border: 2px solid #1a3c5e;
}

.enspecta-chat-bot-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  align-self: flex-start;
}
.enspecta-chat-bubble-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid #e4edf6;
  box-shadow: 0 1px 4px rgba(0,0,0,0.10);
}
.enspecta-chat-header-name {
  font-weight: 600;
  font-size: 15px;
  line-height: 1.2;
}
.enspecta-chat-header-sub {
  font-size: 11px;
  opacity: 0.72;
  margin-top: 2px;
}

.enspecta-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f4f7fa;
}

.enspecta-chat-bubble {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  line-height: 1.5;
  word-break: break-word;
}
.enspecta-chat-bubble.enspecta-chat-bot {
  background: #fff;
  color: #1a1a1a;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.enspecta-chat-bubble.enspecta-chat-user {
  background: #1a3c5e;
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.enspecta-chat-bubble a {
  display: inline-block;
  margin-top: 8px;
  padding: 7px 14px;
  background: #1a3c5e;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}
.enspecta-chat-bubble a:hover { background: #245080; }

.enspecta-chat-typing {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 12px 14px;
  background: #fff;
  border-radius: 14px;
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.enspecta-chat-typing span {
  width: 7px;
  height: 7px;
  background: #aab;
  border-radius: 50%;
  animation: enspecta-bounce 1.2s infinite;
}
.enspecta-chat-typing span:nth-child(2) { animation-delay: 0.2s; }
.enspecta-chat-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes enspecta-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .enspecta-chat-typing span { animation: none; }
}

.enspecta-chat-quick {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 12px;
  background: #f4f7fa;
}
.enspecta-chat-quick-btn {
  padding: 7px 13px;
  border: 1.5px solid #1a3c5e;
  border-radius: 20px;
  background: #fff;
  color: #1a3c5e;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background 0.15s;
}
.enspecta-chat-quick-btn:hover { background: #e4edf6; }

.enspecta-chat-input-row {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #e4edf6;
  flex-shrink: 0;
  background: #fff;
}
.enspecta-chat-input {
  flex: 1;
  border: 1.5px solid #d0dce8;
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 14px;
  resize: none;
  font-family: inherit;
  background: #f4f7fa;
  transition: border-color 0.15s, background 0.15s;
}
.enspecta-chat-input:focus { border-color: #1a3c5e; background: #fff; outline: none; }
.enspecta-chat-input:focus-visible { outline: 2px solid #4a90d9; outline-offset: 2px; }

.enspecta-chat-send {
  background: #1a3c5e;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0 16px;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.15s;
}
.enspecta-chat-send:hover { background: #245080; }
.enspecta-chat-send:disabled { opacity: 0.45; cursor: not-allowed; }
.enspecta-chat-send:focus-visible { outline: 3px solid #4a90d9; outline-offset: 2px; }

.enspecta-chat-footer {
  text-align: center;
  font-size: 10px;
  color: #aab;
  padding: 4px 0 6px;
  background: #fff;
  font-family: inherit;
}

@media (max-width: 400px) {
  .enspecta-chat-window {
    right: 0; bottom: 0;
    width: 100vw; max-height: 100vh;
    border-radius: 0;
  }
  .enspecta-chat-toggle { bottom: 16px; right: 16px; }
}
`;

module.exports = css;
