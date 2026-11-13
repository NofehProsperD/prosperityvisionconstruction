import React, { useMemo, useRef, useState } from "react";
import { askVisionEngineer } from "../services/visionEngineerAI";
import "./VisionEngineer.css";

const suggestions = [
  { icon: "⌂", title: "Construction advice", prompt: "What should I consider before starting a small residential construction project?" },
  { icon: "▤", title: "Work estimate", prompt: "Help me prepare a preliminary construction cost estimate. What information do you need?" },
  { icon: "↗", title: "Project prediction", prompt: "What are the common causes of construction delays and how can I reduce the risk?" },
  { icon: "♻", title: "Sustainable building", prompt: "Suggest practical ways to make a new building more sustainable." },
];

const welcomeMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hello! I'm Vision Engineer, your construction-focused AI assistant. I can help you explore project estimates, construction methods, planning, risk factors and sustainable building ideas. What are you working on?",
};

function renderText(text) {
  return String(text || "").split("\n").map((line, index) => (
    <React.Fragment key={index}>{line}{index < String(text || "").split("\n").length - 1 && <br />}</React.Fragment>
  ));
}

export default function VisionEngineer() {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Ready to assist");
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const canSend = input.trim().length > 0 && !busy;

  const chatContext = useMemo(
    () => messages.filter((message) => message.id !== "welcome").slice(-10),
    [messages]
  );

  async function sendMessage(value = input) {
    const question = value.trim();
    if (!question || busy) return;

    const userMessage = { id: `${Date.now()}-user`, role: "user", text: question };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);
    setError("");
    setStatus("Thinking through your question…");

    try {
      const answer = await askVisionEngineer({
        question,
        history: [...chatContext, userMessage],
      });
      setMessages((current) => [
        ...current,
        { id: `${Date.now()}-assistant`, role: "assistant", text: answer.text, source: answer.source },
      ]);
      setStatus(answer.source === "local" ? "Answered on this device" : answer.source === "frontend" ? "Quick answer" : "Gemini AI response");
    } catch (err) {
      setError(err.message || "Vision Engineer could not respond. Please try again.");
      setStatus("Connection needs attention");
    } finally {
      setBusy(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="ve-page">
      <section className="ve-shell">
        <aside className="ve-sidebar">
          <div className="ve-brand">
            <div className="ve-brand-mark">PV</div>
            <div><strong>Prosperity Vision</strong><span>CONSTRUCTION</span></div>
          </div>

          <div className="ve-assistant-profile">
            <div className="ve-avatar-wrap">
              <img src="/images/vision-engineer-ai.png" alt="AI-generated Vision Engineer construction assistant" />
              <span className="ve-online-dot" />
            </div>
            <p className="ve-eyebrow">YOUR AI CONSTRUCTION PARTNER</p>
            <h1>Vision Engineer</h1>
            <p className="ve-profile-copy">Plan smarter. Build better. Make informed decisions.</p>
            <div className="ve-status"><span />{status}</div>
          </div>

          <div className="ve-sidebar-section">
            <p className="ve-sidebar-label">WHAT I CAN HELP WITH</p>
            {suggestions.map((item) => (
              <button className="ve-side-suggestion" key={item.title} onClick={() => sendMessage(item.prompt)} disabled={busy}>
                <span>{item.icon}</span>{item.title}<b>›</b>
              </button>
            ))}
          </div>

          <div className="ve-sidebar-note">
            <span>♧</span>
            <div><strong>Build with the future in mind</strong><p>Explore practical and sustainable construction choices.</p></div>
          </div>
          <p className="ve-image-credit">AI-generated Vision Engineer illustration</p>
        </aside>

        <section className="ve-chat-panel">
          <header className="ve-chat-header">
            <div className="ve-mobile-avatar"><img src="/images/vision-engineer-ai.png" alt="" /></div>
            <div><h2>Ask Vision Engineer</h2><p>Construction knowledge and project guidance</p></div>
            <span className="ve-header-status"><i /> AI ASSISTANT</span>
          </header>

          <div className="ve-chat-scroll">
            <div className="ve-date-divider"><span>YOUR CONSTRUCTION ASSISTANT</span></div>
            {messages.map((message) => (
              <article className={`ve-message ve-message-${message.role}`} key={message.id}>
                {message.role === "assistant" && <div className="ve-message-avatar"><img src="/images/vision-engineer-ai.png" alt="" /></div>}
                <div className="ve-message-content">
                  <div className="ve-message-name">{message.role === "assistant" ? "Vision Engineer" : "You"}</div>
                  <div className="ve-bubble">{renderText(message.text)}</div>
                  {message.source && <span className="ve-source-tag">{message.source === "local" ? "On-device AI" : message.source === "frontend" ? "Quick response" : "Firebase AI Logic · Gemini"}</span>}
                </div>
              </article>
            ))}
            {busy && <div className="ve-typing"><span /><span /><span /> <small>Vision Engineer is thinking</small></div>}
            {error && <div className="ve-error">{error}</div>}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="ve-starter-prompts">
              {suggestions.map((item) => (
                <button key={item.title} onClick={() => sendMessage(item.prompt)} disabled={busy}>
                  <span>{item.icon}</span><strong>{item.title}</strong><small>{item.prompt}</small>
                </button>
              ))}
            </div>
          )}

          <form className="ve-composer" onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSubmit(event); } }}
              placeholder="Ask about estimates, materials, project planning or sustainable construction…"
              rows={2}
              aria-label="Message Vision Engineer"
              disabled={busy}
            />
            <div className="ve-composer-bottom">
              <span>Vision Engineer can make mistakes. Verify estimates and safety-critical advice with qualified professionals.</span>
              <button type="submit" disabled={!canSend} aria-label="Send message">➤</button>
            </div>
          </form>
          <footer className="ve-chat-footer">Powered by Firebase AI Logic and Google Gemini · Hybrid inference where supported</footer>
        </section>
      </section>
    </main>
  );
}
