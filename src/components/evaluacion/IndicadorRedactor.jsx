"use client";
import React, { useState } from 'react';
import { PenTool } from 'lucide-react';

export default function IndicadorRedactor() {
    const [verbo, setVerbo] = useState('');
    const [contenido, setContenido] = useState('');
    const [condicion, setCondicion] = useState('');

    const resultado = `${verbo || '[Verbo]'} ${contenido || '[Objeto de Estudio]'} ${condicion || '[Condición de Calidad]'}`;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="flex items-center gap-2 font-bold uppercase mb-4 text-[#003366]">
                <PenTool size={20} /> Redactor Técnico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="form-control">
                    <label className="label text-xs font-bold">Verbo (3ra Persona)</label>
                    <input type="text" className="input input-sm input-bordered" placeholder="Ej. Identifica" onChange={(e) => setVerbo(e.target.value)} />
                </div>
                <div className="form-control">
                    <label className="label text-xs font-bold">Contenido</label>
                    <input type="text" className="input input-sm input-bordered" placeholder="Ej. las partes de la célula" onChange={(e) => setContenido(e.target.value)} />
                </div>
                <div className="form-control">
                    <label className="label text-xs font-bold">Condición</label>
                    <input type="text" className="input input-sm input-bordered" placeholder="Ej. mediante esquemas" onChange={(e) => setCondicion(e.target.value)} />
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-dashed border-slate-300">
                <p className="text-xs text-slate-400 uppercase font-black mb-1">Resultado (Indicador):</p>
                <p className="text-lg font-bold text-slate-800">{resultado}.</p>
            </div>
        </div>
    );
}
