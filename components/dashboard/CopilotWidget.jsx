"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";

export default function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hola, soy Antigravity. ¿En qué te ayudo con tu planeamiento hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      // LLAMADA A NUESTRA API DE INTELIGENCIA
      const res = await fetch("/api/copilot", {
        method: "POST",
        body: JSON.stringify({
          subject: "General",
          moment: "Consulta",
          studentNeeds: userMsg,
        }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.suggestion || "Entendido. He analizado tu solicitud.",
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error de conexión con el núcleo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* VENTANA DE CHAT */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2 font-bold">
              <Sparkles size={16} className="text-yellow-400" /> Copilot AI
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-300"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50"
            ref={scrollRef}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 rounded-tl-none shadow-sm flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 size={14} className="animate-spin" /> Pensando...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-slate-900 hover:bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <Bot size={28} />
      </button>
    </div>
  );
}
