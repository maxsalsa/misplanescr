"use client";
import { Sparkles, CheckCircle } from "lucide-react";

export default function UpgradeCard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-4 text-white shadow-xl relative overflow-hidden border border-blue-500/30">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 blur-[50px] opacity-20 pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-3">
        <div className="bg-yellow-500/20 p-1.5 rounded-lg">
          <Sparkles size={16} className="text-yellow-400" />
        </div>
        <h3 className="font-bold text-sm tracking-tight">Plan ULTRA</h3>
      </div>

      <p className="text-[10px] text-slate-300 mb-4 leading-relaxed border-l-2 border-blue-500 pl-2">
        Ahorro de Tiempo + Cumplimiento Legal (Circular DAJ-001)
      </p>

      <ul className="space-y-2 mb-4">
        {["Descargas ilimitadas", "Sin marcas de agua", "Soporte Prioritario"].map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[10px] text-slate-200">
            <CheckCircle size={10} className="text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>

      <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all flex flex-col items-center justify-center gap-0.5 border border-white/10">
        <span>ACTIVAR AHORA</span>
        <span className="text-[9px] font-normal opacity-80 backdrop-blur-sm">SINPE: 6090-6359</span>
      </button>
    </div>
  );
}
