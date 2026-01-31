"use client";
import { useState, useEffect } from "react";
import { getStrategies } from "@/app/actions/strategy-actions";
import { Wand2, Book, FlaskConical, Layout, Search } from "lucide-react";

export default function StrategySelector({ onSelect, triggerLabel = "Asistente IA" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [strategies, setStrategies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("TODOS"); // TODOS, COTIDIANO, TAREA, PROYECTO
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isOpen && strategies.length === 0) {
            setLoading(true);
            getStrategies()
                .then((res) => {
                    if (res.success) setStrategies(res.data);
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen, strategies.length]);

    const filteredStrategies = strategies.filter(s => {
        const matchesFilter = filter === "TODOS" || s.category === filter;
        const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
            s.content.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleSelect = (strategy) => {
        onSelect(strategy); // RETURN FULL OBJECT (Content + Rubric)
        setIsOpen(false);
    };

    return (
        <>
            {/* TRIGGER BUTTON */}
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-xs btn-outline btn-primary gap-2"
                title="Abrir HUD Pedagógico"
            >
                <Wand2 size={12} /> {triggerLabel}
            </button>

            {/* MODAL HUD */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-slate-200">

                        {/* HEADER */}
                        <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-600 rounded-lg">
                                    <Wand2 size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">HUD Pedagógico V-Ultra</h3>
                                    <p className="text-[10px] text-slate-400">Banco de Estrategias Oficiales (MEP)</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-white">✕</button>
                        </div>

                        {/* FILTROS */}
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto">
                            <button onClick={() => setFilter("TODOS")} className={`btn btn-xs ${filter === "TODOS" ? "btn-neutral" : "btn-ghost"}`}>Todo</button>
                            <button onClick={() => setFilter("COTIDIANO")} className={`btn btn-xs gap-1 ${filter === "COTIDIANO" ? "btn-primary" : "btn-ghost"}`}><Book size={12} /> Cotidiano</button>
                            <button onClick={() => setFilter("TAREA")} className={`btn btn-xs gap-1 ${filter === "TAREA" ? "btn-secondary" : "btn-ghost"}`}><Layout size={12} /> Tareas</button>
                            <button onClick={() => setFilter("PROYECTO")} className={`btn btn-xs gap-1 ${filter === "PROYECTO" ? "btn-accent" : "btn-ghost"}`}><FlaskConical size={12} /> Proyectos</button>
                        </div>

                        {/* SEARCH */}
                        <div className="px-4 py-2 bg-white border-b border-slate-100">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar (ej: Debate, TEA, Visual, DUA)..."
                                    className="input input-sm input-bordered w-full pl-9"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* LISTA DE ESTRATEGIAS */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                            {loading ? (
                                <div className="flex justify-center py-10"><span className="loading loading-spinner text-primary"></span></div>
                            ) : (
                                filteredStrategies.map((strat) => (
                                    <div
                                        key={strat.id}
                                        onClick={() => handleSelect(strat)}
                                        className="card bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                                    >
                                        <div className="card-body p-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{strat.title}</h4>
                                                <span className="badge badge-xs text-[10px] font-bold uppercase tracking-wider opacity-70">
                                                    {strat.category}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-2">{strat.content}</p>
                                            {/* DUA TAGS IF ANY (Mocked logic or real if schema implies) */}
                                            {strat.title.includes("Picto") && <span className="text-[9px] text-purple-600 font-bold mt-1 block">✨ DUA VISUAL</span>}
                                            {strat.title.includes("Podcast") && <span className="text-[9px] text-rose-600 font-bold mt-1 block">🎧 DUA AUDITIVO</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                            {filteredStrategies.length === 0 && !loading && (
                                <p className="text-center text-xs text-slate-400 py-4">No se encontraron estrategias.</p>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="p-3 bg-white border-t border-slate-200 text-[10px] text-slate-400 text-center">
                            Binomio Sagrado: Docente-Estudiante (Activo)
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
