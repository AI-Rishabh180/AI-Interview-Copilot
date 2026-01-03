import { useEffect, useRef, useState } from "react";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("idle");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/live-interview");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAnswer(data.answer);
      setStatus("idle");
    };

    ws.current.onerror = () => {
      setStatus("error");
    };
  }, []);

  const startInterview = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";

    rec.onstart = () => setStatus("listening");

    rec.onresult = (e) => {
      const q = e.results[0][0].transcript;
      setQuestion(q);
      setAnswer("");
      setStatus("thinking");
      ws.current.send(q);
    };

    rec.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white flex justify-center items-center px-4">
      <div className="w-full max-w-4xl bg-[#020617]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            🎤 <span>AI Interview Copilot</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Live speech → intelligent interview-ready answers
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={startInterview}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
            ${
              status === "listening"
                ? "bg-amber-500 text-black"
                : status === "thinking"
                ? "bg-indigo-500 animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {status === "listening"
              ? "🎧 Listening..."
              : status === "thinking"
              ? "🤖 AI Thinking..."
              : "▶ Start Interview"}
          </button>
        </div>

        {/* Conversation Area */}
        <div className="space-y-6">

          {/* Interviewer Question */}
          {question && (
            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">
              <div className="text-sm text-cyan-400 font-semibold mb-2">
                INTERVIEWER
              </div>
              <div className="text-lg leading-relaxed">
                {question}
              </div>
            </div>
          )}

          {/* AI Answer */}
          {answer && (
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
              <div className="text-sm text-green-400 font-semibold mb-2">
                AI ANSWER
              </div>
              <div className="text-base leading-relaxed text-slate-100 whitespace-pre-line">
                {answer}
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 text-red-300">
              Backend connection failed. Please restart backend.
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
          Built for real interview practice · Speak clearly and confidently
        </div>

      </div>
    </div>
  );
}
