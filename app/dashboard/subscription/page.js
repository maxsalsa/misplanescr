"use client";
import { Check, ShieldCheck, Star, CreditCard, Globe } from "lucide-react";

export default function Subscription() {
  // CONFIGURACIÓN DE TIPO DE CAMBIO
  const EXCHANGE_RATE = 515; // Ajustable según BCCR

  const formatUSD = (colones) => {
    const dollars = (colones / EXCHANGE_RATE).toFixed(2);
    return `$${dollars}`;
  };

  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-700">

      {/* HEADER SOLEMNE */}
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Membresía Profesional AulaPlan</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Inversión estratégica en su productividad docente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* OPCIÓN A: SEMESTRAL */}
        <div className="card-solemn p-8 border-t-4 border-slate-300 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Plan Semestral</h3>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-black text-slate-900">₡8,000</span>
            <span className="text-slate-400 font-medium text-sm ml-2">($15 USD)</span>
            <span className="text-slate-400 font-medium block text-sm"> / semestre</span>
          </div>
          {/* REFERENCIA USD */}
          <div className="mb-6 text-sm font-medium text-slate-400 flex items-center gap-1">
            <Globe size={14} /> Aprox. {formatUSD(8000)} USD
          </div>

          <ul className="space-y-4 mb-8 text-sm text-slate-600">
            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Acceso a Generador IA</li>
            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Adecuaciones Ley 7600</li>
            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Soporte por Correo</li>
          </ul>
          <button className="btn btn-outline w-full rounded-lg font-medium border-slate-300 hover:bg-slate-50 text-slate-700">
            Seleccionar Opción
          </button>
        </div>

        {/* OPCIÓN B: ANUAL (TARGET) */}
        <div className="card-solemn p-8 border-t-4 border-blue-600 bg-slate-50/50 shadow-xl relative transform md:-translate-y-2">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider shadow-sm">
            Mejor Valor
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-blue-700 uppercase tracking-widest flex items-center gap-2">
              Plan Anual Ultra <Star size={14} fill="currentColor" />
            </h3>
          </div>
          <div className="mb-2">
            <span className="text-5xl font-black text-slate-900">₡15,000</span>
            <span className="text-slate-500 font-medium text-lg ml-2">($29 USD)</span>
            <span className="text-slate-500 font-medium text-sm"> / año</span>
          </div>
          {/* REFERENCIA USD */}
          <div className="mb-2 text-sm font-medium text-blue-600/60 flex items-center gap-1">
            <Globe size={14} /> Aprox. {formatUSD(15000)} USD
          </div>

          <p className="text-xs text-emerald-700 font-bold mb-6 bg-emerald-100/50 w-fit px-2 py-1 rounded border border-emerald-200">
            Ahorras ₡1,000 + Beneficios VIP
          </p>
          <ul className="space-y-4 mb-8 text-sm text-slate-700 font-medium">
            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> <span><strong>Todo</strong> lo del plan semestral</span></li>
            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> <span>Prioridad de Procesamiento (Fast Lane)</span></li>
            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> <span>Soporte Directo WhatsApp</span></li>
          </ul>

          <a href="https://wa.me/50660906359?text=Hola%20Max,%20deseo%20activar%20el%20Plan%20Anual%20de%2015000"
            target="_blank"
            className="btn btn-primary bg-blue-700 border-none hover:bg-blue-800 w-full flex items-center justify-center gap-2 mb-3 shadow-lg shadow-blue-900/20">
            <CreditCard size={18} />
            Activar con SINPE Móvil
          </a>
          <p className="text-xs text-center text-slate-400">
            Número oficial: <strong>6090-6359</strong> (Max Salazar)
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8 text-center">
        <div className="inline-flex gap-8 text-slate-400 text-xs font-medium uppercase tracking-wider">
          <span className="flex items-center gap-2"><ShieldCheck size={14} /> Pagos Seguros (SINPE)</span>
          <span className="flex items-center gap-2"><ShieldCheck size={14} /> Garantía de Satisfacción</span>
        </div>
      </div>
    </div>
  );
}