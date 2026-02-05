import React from "react";
import { FlaskConical, Atom, Flame } from "lucide-react";

export default function LabSimulation({ title }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-indigo-500/50 shadow-lg text-white p-6 my-4">
      <div className="absolute top-0 right-0 p-3 opacity-20">
        <Atom size={64} className="animate-spin-slow" />
      </div>

      <div className="relative z-10">
        <div className="badge badge-primary gap-2 mb-3">
          <FlaskConical size={12} /> Laboratorio Virtual
        </div>
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          {title || "Simulación de Reacción Exotérmica"}
        </h3>
        <p className="text-sm text-slate-400 mt-1 mb-4">
          Interactúa con los reactivos para observar el cambio de entalpía en
          tiempo real.
        </p>

        <div className="flex gap-4">
          <div className="h-24 w-24 bg-red-500/20 rounded-full border-2 border-red-500 flex items-center justify-center animate-pulse">
            <Flame size={32} className="text-red-500" />
          </div>
          <div className="flex-1 bg-slate-800/50 rounded p-3 text-xs font-mono text-green-400">
            &gt; Temperatura: 105°C
            <br />
            &gt; Presión: 1.2 atm
            <br />
            &gt; Estado: CRÍTICO
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="btn btn-sm btn-outline btn-info">
            Iniciar Experimento
          </button>
          <button className="btn btn-sm btn-ghost text-slate-400">
            Ver Ficha Técnica
          </button>
        </div>
      </div>
    </div>
  );
}
