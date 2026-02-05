"use client";
import React from "react";
import { Eye, CheckCircle } from "lucide-react";

export default function Evidencias() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* EVIDENCE CARD */}
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="h-32 bg-slate-700 flex items-center justify-center text-slate-500 italic">
          [Previsualización FOTO]
        </div>
        <div className="p-4">
          <h3 className="font-bold text-sm mb-1">Práctica de Ciberseguridad</h3>
          <p className="text-xs text-slate-400 mb-4">
            Por: Max Salazar • Hace 10 min
          </p>
          <div className="flex gap-2">
            <button className="btn btn-xs btn-primary gap-2 flex-1">
              <Eye size={12} /> Ver
            </button>
            <button className="btn btn-xs btn-success text-white gap-2 flex-1">
              <CheckCircle size={12} /> Aprobar
            </button>
          </div>
        </div>
      </div>
      {/* EVIDENCE CARD 2 */}
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="h-32 bg-slate-700 flex items-center justify-center text-slate-500 italic">
          [Resultado JUEGO]
        </div>
        <div className="p-4">
          <h3 className="font-bold text-sm mb-1">Trivia Redes - Nivel 1</h3>
          <p className="text-xs text-slate-400 mb-4">
            Por: Sofia Vargas • Hace 1 hora
          </p>
          {/* Badge: Linked to LO */}
          <div className="badge badge-warning badge-xs mb-2 w-full text-[10px] text-black font-bold">
            LO: Identifica protocolos
          </div>
          <div className="flex gap-2">
            <button className="btn btn-xs btn-primary gap-2 flex-1">
              <Eye size={12} /> Ver
            </button>
            <button className="btn btn-xs btn-success text-white gap-2 flex-1">
              <CheckCircle size={12} /> Aprobar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
