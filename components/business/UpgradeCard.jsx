"use client";
import { Check, CreditCard, ShieldCheck } from "lucide-react";

export default function UpgradeCard() {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl border border-blue-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
        RECOMENDADO
      </div>

      <h3 className="text-2xl font-black mb-1">Plan Anual VIP</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold text-blue-400">₡15.000</span>
        <span className="text-slate-400 text-sm">/año</span>
      </div>

      <ul className="space-y-3 mb-6 text-sm">
        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400"/> Generación Ilimitada</li>
        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400"/> Sin Marcas de Agua</li>
        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400"/> Acceso a 1 Asignatura</li>
        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400"/> Soporte Prioritario</li>
      </ul>

      <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-4">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-xs">BP</div>
            <span className="font-bold text-sm">SINPE MÓVIL OFICIAL</span>
        </div>
        <p className="text-2xl font-mono font-bold text-yellow-400 tracking-wider">6450-3722</p>
        <div className="text-xs text-slate-300 mt-1">
            <p><strong>Banco:</strong> Banco Popular</p>
            <p><strong>Titular:</strong> Max Salazar Sánchez</p>
        </div>
      </div>

      <a 
        href="https://wa.me/50664503722?text=Hola%20Don%20Max,%20ya%20realicé%20el%20SINPE%20de%2015.000%20para%20activar%20mi%20cuenta%20Anual."
        target="_blank"
        className="btn bg-blue-600 hover:bg-blue-500 text-white w-full border-none font-bold"
      >
        <CreditCard className="w-4 h-4 mr-2"/>
        REPORTAR PAGO Y ACTIVAR
      </a>
      
      <p className="text-[10px] text-center text-slate-500 mt-4 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3"/> Pago Seguro y Directo
      </p>
    </div>
  );
}