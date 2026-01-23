"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

/**
 * PAGE: JORNALIZACIÓN (Annual Pacing)
 * Permite al docente generar el mapa de ruta anual basado en el programa oficial.
 */
export default function PacingPage() {
    const [periodo, setPeriodo] = useState('I Semestre');
    const [horas, setHoras] = useState(5);
    const [textoOficial, setTextoOficial] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    // MOCK DATA for "Select Official Program" simulation
    const loadDemoProgram = () => {
        setTextoOficial(`
        PROGRAMA DE ESTUDIO DE MATEMÁTICAS (MEP) - DECIMO AÑO
        
        EJES DE APRENDIZAJE:
        1. Geometría Analítica: Circunferencia, Rectas, Polígonos.
        2. Funciones: Concepto, Representación Gráfica, Función Lineal, Cuadrática.
        3. Estadística y Probabilidad: Medidas de posición, Variabilidad.

        RESULTADOS DE APRENDIZAJE ESPERADOS:
        - Analizar geométrica y algebraicamente la circunferencia.
        - Resolver problemas que involucren polígonos regulares.
        - Plantear y resolver problemas utilizando funciones.
        ... (Texto simulado del programa oficial)
        `);
        toast.info("Programa oficial cargado (Simulación)");
    };

    const handleGenerate = async () => {
        if (!textoOficial) return toast.error("Falta el Programa Oficial");
        setLoading(true);
        setResult('');

        try {
            // We reuse the basic AI generation pattern but calling a specific 'action' if we had a unified route,
            // or here we assume we might need a specific API route for this big text.
            // For simplicity, let's reuse /api/generate if adapted, but let's create a specific one on the fly or reuse /api/family logic? No, let's keep it clean.
            // We'll call a new server action or API. Let's assume we use the client-side wrapping of the service for now 
            // OR create a quick API router for this specific heavy task.

            // To be consistent with "Let's work", I'll use a direct fetch to a new endpoint.
            const res = await fetch('/api/pacing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto_oficial: textoOficial, periodo, horas_semanales: horas })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data.result);
            toast.success("Jornalización Generada");

        } catch (e) {
            console.error(e);
            toast.error("Error generando el mapa de ruta.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Mapa de Ruta (Jornalización)</h1>
                    <p className="text-slate-500">Distribuye el programa oficial en el tiempo real disponible.</p>
                </div>
                <button className="btn btn-outline" onClick={loadDemoProgram}>Cargar Demo Matemáticas 10°</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SETTINGS CARD */}
                <div className="card bg-white shadow-sm border border-slate-200 h-fit">
                    <div className="card-body">
                        <h2 className="card-title text-sm uppercase text-slate-400">Configuración</h2>

                        <div className="form-control">
                            <label className="label">Periodo</label>
                            <select className="select select-bordered" value={periodo} onChange={e => setPeriodo(e.target.value)}>
                                <option>I Semestre</option>
                                <option>II Semestre</option>
                                <option>Anual</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">Lecciones Semanales</label>
                            <input type="number" className="input input-bordered" value={horas} onChange={e => setHoras(e.target.value)} />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Programa Oficial (Texto)</span>
                                <span className="label-text-alt text-blue-600 cursor-pointer" onClick={loadDemoProgram}>Auto-llenar</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-48 text-xs font-mono"
                                placeholder="Pega aquí los contenidos del PDF oficial..."
                                value={textoOficial}
                                onChange={e => setTextoOficial(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            className="btn btn-primary mt-4 w-full shadow-lg shadow-indigo-500/30"
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "✨ Generar Ruta Anual"}
                        </button>
                    </div>
                </div>

                {/* RESULTS AREA */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 min-h-[600px] shadow-sm">
                    {result ? (
                        <article className="prose prose-slate max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {result}
                            </ReactMarkdown>
                        </article>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                            <p>Configura tu curso y genera el mapa.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
