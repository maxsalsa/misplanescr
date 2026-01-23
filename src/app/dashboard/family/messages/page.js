"use client";
import { useState } from "react";
import { MessageCircle, Send, User, Clock, CheckCheck, Paperclip, Smile } from "lucide-react";

// Simulated messages
const MESSAGES = [
    { id: 1, sender: "teacher", name: "Prof. María Jiménez", content: "Buenos días. Le informo que su hijo ha mostrado un excelente avance en Matemáticas esta semana. ¡Felicidades!", timestamp: "2026-01-19 09:30", read: true },
    { id: 2, sender: "parent", name: "Usted", content: "¡Muchas gracias, profe! En casa hemos estado practicando las tablas juntos.", timestamp: "2026-01-19 10:15", read: true },
    { id: 3, sender: "teacher", name: "Prof. María Jiménez", content: "Eso es maravilloso. El apoyo en casa hace toda la diferencia. Recordatorio: mañana hay prueba corta de fracciones.", timestamp: "2026-01-19 14:00", read: true },
    { id: 4, sender: "teacher", name: "Prof. María Jiménez", content: "Adjunto una guía de repaso para que practiquen en casa. 📎 guia_fracciones.pdf", timestamp: "2026-01-20 08:00", read: false },
];

export default function FamilyMessagesPage() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(MESSAGES);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const msg = {
            id: Date.now(),
            sender: "parent",
            name: "Usted",
            content: newMessage,
            timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
            read: true,
        };
        setMessages(prev => [...prev, msg]);
        setNewMessage("");
    };

    return (
        <div className="p-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-150px)]">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-slate-800">💬 Mensajes del Docente</h1>
                <p className="text-slate-500">Comunicación directa con el equipo educativo de su hijo/a.</p>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-100 bg-indigo-50 flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-indigo-500 text-white rounded-full w-10">
                            <span>MJ</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-slate-800">Prof. María Jiménez</p>
                        <p className="text-xs text-slate-500">Docente de Matemáticas • 10-A</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === "parent" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${msg.sender === "parent"
                                ? "bg-indigo-500 text-white rounded-br-none"
                                : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                                }`}>
                                {msg.sender === "teacher" && (
                                    <p className="text-xs font-medium text-indigo-600 mb-1">{msg.name}</p>
                                )}
                                <p className="text-sm">{msg.content}</p>
                                <div className={`flex items-center gap-1 mt-2 text-xs ${msg.sender === "parent" ? "text-indigo-200" : "text-slate-400"}`}>
                                    <Clock size={12} />
                                    <span>{msg.timestamp}</span>
                                    {msg.sender === "parent" && msg.read && <CheckCheck size={14} className="ml-1" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-circle btn-sm text-slate-400">
                            <Paperclip size={18} />
                        </button>
                        <input
                            type="text"
                            placeholder="Escriba su mensaje..."
                            className="input input-bordered flex-1"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button className="btn btn-ghost btn-circle btn-sm text-slate-400">
                            <Smile size={18} />
                        </button>
                        <button onClick={handleSend} className="btn btn-primary btn-circle">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
