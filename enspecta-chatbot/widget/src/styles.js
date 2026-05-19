const css = `
.enspecta-chat-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #1a3c5e;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.enspecta-chat-toggle:hover { background: #245080; }

.enspecta-chat-window {
  position: fixed;
  bottom: 92px;
  right: 24px;
  width: 360px;
  max-height: 520px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  z-index: 9998;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  overflow: hidden;
}
.enspecta-chat-window.enspecta-chat-hidden { display: none; }

.enspecta-chat-header {
  background: #1a3c5e;
  color: #fff;
  padding: 14px 16px;
  font-weight: 600;
  font-size: 15px;
  flex-shrink: 0;
}

.enspecta-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.enspecta-chat-bubble {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 12px;
  line-height: 1.45;
  word-break: break-word;
}
.enspecta-chat-bubble.enspecta-chat-bot {
  background: #f0f4f8;
  color: #1a1a1a;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.enspecta-chat-bubble.enspecta-chat-user {
  background: #1a3c5e;
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.enspecta-chat-bubble a {
  display: inline-block;
  margin-top: 6px;
  padding: 6px 12px;
  background: #1a3c5e;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
}

.enspecta-chat-typing {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 8px 12px;
  background: #f0f4f8;
  border-radius: 12px;
  border-bottom-left-radius: 4px;
  align-self: flex-start;
}
.enspecta-chat-typing span {
  width: 7px;
  height: 7px;
  background: #999;
  border-radius: 50%;
  animation: enspecta-bounce 1.2s infinite;
}
.enspecta-chat-typing span:nth-child(2) { animation-delay: 0.2s; }
.enspecta-chat-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes enspecta-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

.enspecta-chat-quick {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 12px 8px;
}
.enspecta-chat-quick-btn {
  padding: 6px 12px;
  border: 1.5px solid #1a3c5e;
  border-radius: 20px;
  background: #fff;
  color: #1a3c5e;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
.enspecta-chat-quick-btn:hover { background: #f0f4f8; }

.enspecta-chat-input-row {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #e5e5e5;
  flex-shrink: 0;
}
.enspecta-chat-input {
  flex: 1;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  resize: none;
  font-family: inherit;
}
.enspecta-chat-input:focus { border-color: #1a3c5e; }

.enspecta-chat-send {
  background: #1a3c5e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 14px;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
}
.enspecta-chat-send:hover { background: #245080; }
.enspecta-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }

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
