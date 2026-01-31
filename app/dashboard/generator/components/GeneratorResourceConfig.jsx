import React from 'react';

export default function GeneratorResourceConfig({
    config_recurso,
    setConfigRecurso,
    handleGenerarRecurso,
    cargando_ia,
    resultado_plan,
    error_validacion
}) {
    // Helper to download MD
    const downloadMD = () => {
        const blob = new Blob([resultado_plan], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Recurso_${config_recurso.tipo.replace(/\s/g, '_')}.md`;
        a.click();
    };

    return (
        <div className="card glass-card p-4 md:p-8 animate-fade-in border-2 border-pink-100 shadow-xl">
            <div className="mb-6">
                <h3 className="card-title text-2xl text-pink-900 flex items-center gap-2">
                    <span className="text-3xl">🎲</span> Generador de Recursos
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Convierte cualquier texto (Plan, Unidad o Tema) en un recurso listo para usar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* INPUT CONTEXTO */}
                <div className="form-control md:col-span-2">
                    <label className="label font-bold text-slate-600">
                        1. Contexto Base (Pegar Plan o Tema)
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-40 font-mono text-sm"
                        placeholder="Pegue aquí el Resultado de Aprendizaje, la Unidad de Estudio o el texto del plan..."
                        value={config_recurso.contexto}
                        onChange={e => setConfigRecurso({ ...config_recurso, contexto: e.target.value })}
                    />
                    <label className="label">
                        <span className="label-text-alt text-slate-400">
                            💡 Puede pegar el contenido de un PDF o JSON oficial aquí.
                        </span>
                    </label>
                </div>

                {/* TIPO DE RECURSO */}
                <div className="form-control">
                    <label className="label font-bold text-slate-600">2. Tipo de Recurso</label>
                    <select
                        className="select select-bordered w-full"
                        value={config_recurso.tipo}
                        onChange={e => setConfigRecurso({ ...config_recurso, tipo: e.target.value })}
                    >
                        <option>Quiz Interactivo (10+ Preguntas)</option>
                        <option>Juego &quot;Jeopardy&quot; de Repaso</option>
                        <option>Sopa de Letras (20+ Palabras)</option>
                        <option>Escape Room de Aula (5 Retos)</option>
                        <option>Proyecto con Rúbrica (Evaluación)</option>
                        <option>Guía de Trabajo Cotidiano (Práctica Masiva)</option>
                        <option>Guía de Trabajo Autónomo (GTA Oficial)</option>
                        <option>Tarea Corta (Refuerzo)</option>
                        <option>Tabla de Evaluación (Desglose de Porcentajes)</option>
                    </select>
                </div>

                {/* NIVEL */}
                <div className="form-control">
                    <label className="label font-bold text-slate-600">3. Nivel Académico</label>
                    <select
                        className="select select-bordered w-full"
                        value={config_recurso.nivel}
                        onChange={e => setConfigRecurso({ ...config_recurso, nivel: e.target.value })}
                    >
                        <option>Preescolar</option>
                        <option>Primaria (I Ciclo)</option>
                        <option>Primaria (II Ciclo)</option>
                        <option>Secundaria (7°-9°)</option>
                        <option>Diversificada (10°-11°)</option>
                        <option>Técnica (10°-12°)</option>
                    </select>
                </div>

                {/* BOTÓN GENERAR */}
                <div className="form-control md:col-span-2 mt-4">
                    <button
                        className={`btn btn-secondary w-full btn-lg gap-2 shadow-lg ${cargando_ia ? 'loading' : ''}`}
                        onClick={handleGenerarRecurso}
                        disabled={cargando_ia || config_recurso.contexto.length < 10}
                    >
                        {cargando_ia ? 'Diseñando Recurso...' : '✨ Generar Material Didáctico'}
                    </button>
                </div>

                {/* RESULTADO (PREVIEW) */}
                {resultado_plan && (
                    <div className="md:col-span-2 mt-8 p-6 bg-white rounded-xl shadow-inner border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg text-slate-700">Vista Previa del Recurso</h4>
                            <button
                                className="btn btn-sm btn-ghost text-pink-600"
                                onClick={downloadMD}
                            >
                                ⬇️ Descargar MD
                            </button>
                        </div>
                        <div className="prose max-w-none text-sm bg-slate-50 p-4 rounded-lg overflow-x-auto">
                            <pre className="whitespace-pre-wrap font-sans">{resultado_plan}</pre>
                        </div>
                    </div>
                )}

                {error_validacion && (
                    <div className="alert alert-warning md:col-span-2">
                        <span>{error_validacion}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
