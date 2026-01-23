"use client";
import { DATA_NORMATIVA } from '@/lib/normativa';
import { useState } from 'react';
import { Search, Book } from 'lucide-react';

export default function NormativaPage() {
    const [activeDoc, setActiveDoc] = useState('programa_desarrollo_web');
    const [searchTerm, setSearchTerm] = useState('');

    const content = DATA_NORMATIVA[activeDoc] || "No hay contenido. Pega el texto en lib/normativa.js";

    // Simple highlight search
    const highlightedContent = content.split('\n').map((line, i) => {
        if (!searchTerm) return <p key={i} className="mb-2 text-slate-600">{line}</p>;
        if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
            return <p key={i} className="mb-2 bg-yellow-100 text-slate-900 border-l-4 border-yellow-400 pl-2">{line}</p>;
        }
        return <p key={i} className="mb-2 text-slate-400 text-sm hidden">...</p>; // Hide irrelevant lines in search mode
    });

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Normativa y Programas</h2>
                    <p className="text-slate-500">Consulta directa de los documentos oficiales.</p>
                </div>
                <div className="join">
                    {Object.keys(DATA_NORMATIVA).map(key => (
                        <button
                            key={key}
                            className={`btn join-item ${activeDoc === key ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveDoc(key)}
                        >
                            {key.replace(/_/g, ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Buscar en el documento (ej. 'evaluación', 'criterio')..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-inner border border-slate-200 p-6 flex-1 overflow-y-auto font-mono text-sm leading-relaxed">
                {highlightedContent.length > 0 ? highlightedContent : <div className="text-center text-slate-400 mt-10">No se encontraron resultados para "{searchTerm}"</div>}
            </div>
        </div>
    );
}
