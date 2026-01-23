"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

/**
 * PAGE: FÁBRICA DE ASOMBRO (GAMIFICACIÓN Y RECURSOS)
 * Genera Quizzes, Juegos, Rubricas y Material Lúdico.
 */
export default function ResourcesPage() {
    // State
    const [tipo, setTipo] = useState("JUEGO DE CLASE");
    const [tema, setTema] = useState("");
    const [nivel, setNivel] = useState("");
    const [indicaciones, setIndicaciones] = useState("");

    // Output
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!tema || !nivel) return toast.error("Tema y Nivel son obligatorios.");
        setLoading(true);
        setResult("");

        try {
            const res = await fetch('/api/resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tipo, tema, nivel, indicaciones })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data.result);
            toast.success("Recurso generado con éxito.");

        } catch (e) {
            console.error(e);
            toast.error("Error al generar recurso.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Fábrica de Asombro (Recursos)</h1>
                    <p className="text-slate-500">Crea juegos, evaluaciones y materiales listos para imprimir.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CONFIG PANEl */}
                <div className="card bg-white shadow-sm border border-slate-200 h-fit">
                    <div className="card-body">
                        <h2 className="card-title text-sm uppercase text-slate-400">Diseñador</h2>

                        {/* SELECT RESOURCE TYPE */}
                        <div className="form-control w-full">
                            <label className="label font-bold">Tipo de Recurso</label>
                            <select className="select select-bordered w-full" value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option>QUIZ INTERACTIVO (5 Ítems)</option>
                                <option>JUEGO DE CLASE (Sopa, Pareo, Escape)</option>
                                <option>PROYECTO CREATIVO (Maqueta / Video)</option>
                                <option>GUÍA DE TRABAJO AUTÓNOMO (GTA)</option>
                                <option>TAREA CORTA (Refuerzo)</option>
                                <option>¿QUIÉN QUIERE SER MILLONARIO?</option>
                                <option>TRABAJO COTIDIANO (Portafolio)</option>
                                <option>CÁLCULO DE EVALUACIÓN (Tabla)</option>
                            </select>
                        </div>

                        {/* INPUTS */}
                        <div className="form-control">
                            <label className="label">Nivel Educativo</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="Ej. 6to Grado, 10mo Año Técnico"
                                value={nivel}
                                onChange={e => setNivel(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Tema / Contenido / Texto Base</label>
                            <textarea
                                className="textarea textarea-bordered h-32"
                                placeholder="Pega aquí el tema, los indicadores o un texto pequeño para convertir en juego..."
                                value={tema}
                                onChange={e => setTema(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">Instrucciones Especiales (Opcional)</label>
                            <input
                                type="text"
                                className="input input-bordered text-sm"
                                placeholder="Ej. 'Enfocado en dislexia', 'Muy divertido'..."
                                value={indicaciones}
                                onChange={e => setIndicaciones(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="btn btn-primary mt-4 w-full shadow-lg shadow-indigo-500/30"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "✨ Generar Magia"}
                        </button>
                    </div>
                </div>

                {/* VISUALIZER */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 min-h-[600px] shadow-sm relative">
                    {result ? (
                        <>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="btn btn-sm btn-ghost" onClick={() => navigator.clipboard.writeText(result)}>Copiar Texto</button>
                                <button className="btn btn-sm btn-outline" onClick={() => window.print()}>🖨️ PDF</button>
                            </div>
                            <article className="prose prose-slate max-w-none prose-headings:text-indigo-700">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {result}
                                </ReactMarkdown>
                            </article>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                            <div className="text-6xl mb-4">🧩</div>
                            <p className="text-lg">Selecciona un juego o recurso para generarlo.</p>
                            <p className="text-sm">¡Prueba el "Quién quiere ser millonario"!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
