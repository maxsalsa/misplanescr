"use client";
import { useState } from 'react';
import { MessageCircle, Heart, Share2, Sparkles } from 'lucide-react';

/**
 * 👪 FAMILY CAPSULE GENERATOR
 * Translates pedagogical jargon into simple, actionable messages for parents.
 * "Hoy vimos X" -> "Pregúntele sobre Y al cenar".
 */

export default function FamilyCapsuleGenerator({ topic, learningOutcome }) {
    const [loading, setLoading] = useState(false);
    const [capsule, setCapsule] = useState(null);

    const generateCapsule = () => {
        setLoading(true);
        // Simulación de llamada a RAG (Universal Bridge)
        setTimeout(() => {
            setCapsule({
                emoji: "🌱",
                title: "¡Hoy aprendimos sobre La Naturaleza!",
                message_body: `Hola familia. Hoy en clase exploramos cómo las plantas comen usando el sol (Fotosíntesis).`,
                action_item: "Esta noche, pregúntele a su hijo/a: ¿Qué necesitan las plantas de nuestro jardín para no morir?",
                sentiment: "Curiosidad y Cuidado"
            });
            setLoading(false);
        }, 1800);
    };

    return (
        <div className="card bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 shadow-sm">
            <div className="card-body">
                <h3 className="card-title text-purple-900 flex gap-2 items-center">
                    <Heart size={20} className="text-pink-500" /> Vínculo con el Hogar
                </h3>
                <p className="text-xs text-purple-700/70 mb-2">
                    Transforma el tema <strong>&quot;{topic}&quot;</strong> en un mensaje simple para WhatsApp.
                </p>

                {!capsule && !loading && (
                    <button className="btn btn-sm btn-outline btn-primary w-fit gap-2" onClick={generateCapsule}>
                        <Sparkles size={16} /> Crear Cápsula Familiar
                    </button>
                )}

                {loading && (
                    <div className="flex gap-2 items-center text-purple-400 text-sm animate-pulse">
                        <Sparkles size={16} /> Traduciendo pedagogía a lenguaje familiar...
                    </div>
                )}

                {capsule && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 animate-pop-in">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-3xl">{capsule.emoji}</div>
                            <button className="btn btn-xs btn-ghost text-success gap-1">
                                <MessageCircle size={14} /> Enviar WhatsApp
                            </button>
                        </div>
                        <div className="font-bold text-slate-800 mb-1">{capsule.title}</div>
                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">{capsule.message_body}</p>

                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                            <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Reto para la cena:</div>
                            <div className="text-sm text-amber-900 italic">&quot;{capsule.action_item}&quot;</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
