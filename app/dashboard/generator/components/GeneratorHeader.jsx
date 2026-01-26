import React from 'react';

export default function GeneratorHeader({ activeInstitution, modoOperativo }) {
    const getModeTitle = () => {
        switch (modoOperativo) {
            case 'clasico': return 'Basado en plantillas precargadas.';
            case 'recursos': return 'Generador de Material Didáctico y Evaluación.';
            case 'ia_normativa': default: return 'Inteligencia Artificial Normativa (MEP-PLANNER).';
        }
    };

    return (
        <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-primary badge-outline text-xs font-bold uppercase tracking-widest">
                    {activeInstitution?.name || "Sin Institución"}
                </span>
                <span className="text-xs text-slate-400">| {activeInstitution?.type}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Generador de Planeamiento</h2>
            <p className="text-sm md:text-base text-slate-500">
                {getModeTitle()}
            </p>
        </div>
    );
}
