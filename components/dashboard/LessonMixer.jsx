"use client";
import { useState } from "react";
import { CheckCircle2, Circle, Save, RefreshCw } from "lucide-react";

export default function LessonMixer({ matrix }) {
  const [selection, setSelection] = useState({
    conn: matrix.connection_options[0],
    collab: matrix.collaboration_options[0],
    const: matrix.construction_options[0],
    clarif: matrix.clarification_options[0],
    eval: matrix.evaluation_options[0],
  });

  const handleSelect = (category, option) => {
    setSelection((prev) => ({ ...prev, [category]: option }));
  };

  return (
    <div className="space-y-8">
      {/* HEADER DEL MEZCLADOR */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            🎛️ Mezclador Pedagógico
          </h2>
          <p className="text-slate-300 text-sm">
            Personaliza tu ruta de aprendizaje.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all">
          <Save size={18} /> GUARDAR RUTA
        </button>
      </div>

      {/* SECCIÓN 1: MOMENTOS (SELECTOR) */}
      <div className="grid gap-6">
        <Section
          title="1. CONEXIÓN (Elige una)"
          options={matrix.connection_options}
          active={selection.conn}
          onSelect={(o) => handleSelect("conn", o)}
          color="blue"
        />
        <Section
          title="2. COLABORACIÓN (Elige una)"
          options={matrix.collaboration_options}
          active={selection.collab}
          onSelect={(o) => handleSelect("collab", o)}
          color="purple"
        />
        <Section
          title="3. CONSTRUCCIÓN (Elige una)"
          options={matrix.construction_options}
          active={selection.const}
          onSelect={(o) => handleSelect("const", o)}
          color="emerald"
        />
        <Section
          title="4. CLARIFICACIÓN (Elige una)"
          options={matrix.clarification_options}
          active={selection.clarif}
          onSelect={(o) => handleSelect("clarif", o)}
          color="amber"
        />
      </div>

      {/* RESUMEN DE SELECCIÓN */}
      <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4">
          Resumen de tu Planeamiento:
        </h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>
            🔹 <strong>Inicio:</strong> {selection.conn.title} -{" "}
            {selection.conn.desc}
          </li>
          <li>
            🔹 <strong>Desarrollo:</strong> {selection.const.title} -{" "}
            {selection.const.desc}
          </li>
          <li>
            🔹 <strong>Evidencia:</strong> {selection.const.evidence || "N/A"}
          </li>
          <li>
            🔹 <strong>Instrumento:</strong> {selection.eval.title} (
            {selection.eval.type})
          </li>
        </ul>
      </div>
    </div>
  );
}

// SUB-COMPONENTE DE TARJETAS (RESPONSIVE ACCORDION)
function Section({ title, options, active, onSelect, color }) {
  const [isOpen, setIsOpen] = useState(true); // Default open on desktop, mobile could differ

  const colors = {
    blue: "border-blue-200 bg-blue-50 text-blue-700 ring-blue-500 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
    purple:
      "border-purple-200 bg-purple-50 text-purple-700 ring-purple-500 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300",
    emerald:
      "border-emerald-200 bg-emerald-50 text-emerald-700 ring-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300",
    amber:
      "border-amber-200 bg-amber-50 text-amber-700 ring-amber-500 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors"
      >
        <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase flex items-center gap-2">
          {title}
          {active && (
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Seleccionado
            </span>
          )}
        </h3>
        <div
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </div>
      </button>

      {isOpen && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-down">
          {options.map((opt) => {
            const isSelected = active.id === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onSelect(opt)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative ${
                  isSelected
                    ? colors[color] + " ring-1 shadow-md scale-[1.02]"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {opt.title}
                  </span>
                  {isSelected ? (
                    <CheckCircle2 size={18} className="text-current" />
                  ) : (
                    <Circle size={18} className="text-slate-300" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {opt.desc}
                </p>
                {opt.evidence && (
                  <span className="mt-2 inline-block text-[10px] font-bold bg-white dark:bg-slate-900 border dark:border-slate-700 px-2 py-1 rounded text-slate-400">
                    Experiencia: {opt.evidence}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
