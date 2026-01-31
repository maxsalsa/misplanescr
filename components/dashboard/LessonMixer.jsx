"use client";
import { useState } from "react";
import { CheckCircle2, Circle, Save, RefreshCw } from "lucide-react";

export default function LessonMixer({ matrix }) {
  const [selection, setSelection] = useState({
    conn: matrix.connection_options[0],
    collab: matrix.collaboration_options[0],
    const: matrix.construction_options[0],
    clarif: matrix.clarification_options[0],
    eval: matrix.evaluation_options[0]
  });

  const handleSelect = (category, option) => {
    setSelection(prev => ({ ...prev, [category]: option }));
  };

  return (
    <div className="space-y-8">
        {/* HEADER DEL MEZCLADOR */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold flex items-center gap-2">🎛️ Mezclador Pedagógico</h2>
                <p className="text-slate-300 text-sm">Personaliza tu ruta de aprendizaje.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all">
                <Save size={18}/> GUARDAR RUTA
            </button>
        </div>

        {/* SECCIÓN 1: MOMENTOS (SELECTOR) */}
        <div className="grid gap-6">
            <Section title="1. CONEXIÓN (Elige una)" options={matrix.connection_options} active={selection.conn} onSelect={(o) => handleSelect("conn", o)} color="blue" />
            <Section title="2. COLABORACIÓN (Elige una)" options={matrix.collaboration_options} active={selection.collab} onSelect={(o) => handleSelect("collab", o)} color="purple" />
            <Section title="3. CONSTRUCCIÓN (Elige una)" options={matrix.construction_options} active={selection.const} onSelect={(o) => handleSelect("const", o)} color="emerald" />
            <Section title="4. CLARIFICACIÓN (Elige una)" options={matrix.clarification_options} active={selection.clarif} onSelect={(o) => handleSelect("clarif", o)} color="amber" />
        </div>

        {/* RESUMEN DE SELECCIÓN */}
        <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Resumen de tu Planeamiento:</h3>
            <ul className="space-y-2 text-sm text-slate-600">
                <li>🔹 <strong>Inicio:</strong> {selection.conn.title} - {selection.conn.desc}</li>
                <li>🔹 <strong>Desarrollo:</strong> {selection.const.title} - {selection.const.desc}</li>
                <li>🔹 <strong>Evidencia:</strong> {selection.const.evidence || "N/A"}</li>
                <li>🔹 <strong>Instrumento:</strong> {selection.eval.title} ({selection.eval.type})</li>
            </ul>
        </div>
    </div>
  );
}

// SUB-COMPONENTE DE TARJETAS
function Section({ title, options, active, onSelect, color }) {
    const colors = {
        blue: "border-blue-200 bg-blue-50 text-blue-700 ring-blue-500",
        purple: "border-purple-200 bg-purple-50 text-purple-700 ring-purple-500",
        emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 ring-emerald-500",
        amber: "border-amber-200 bg-amber-50 text-amber-700 ring-amber-500",
    };

    return (
        <div>
            <h3 className="text-sm font-black text-slate-400 uppercase mb-3">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((opt) => {
                    const isSelected = active.id === opt.id;
                    return (
                        <div 
                            key={opt.id}
                            onClick={() => onSelect(opt)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative ${
                                isSelected ? colors[color] + " ring-1 shadow-md" : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-slate-800">{opt.title}</span>
                                {isSelected ? <CheckCircle2 size={18}/> : <Circle size={18} className="text-slate-300"/>}
                            </div>
                            <p className="text-xs text-slate-500 leading-snug">{opt.desc}</p>
                            {opt.evidence && (
                                <span className="mt-2 inline-block text-[10px] font-bold bg-white border px-2 py-1 rounded text-slate-400">
                                    Evidencia: {opt.evidence}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}