"use client";
import { Lock } from "lucide-react";

export default function PremiumGuard({ children, isPremium, type = "text" }) {
  // 1. SI PAGA O ES ADMIN, PASE ADELANTE
  if (isPremium) {
    return <>{children}</>;
  }

  // 2. SI ES FREE, MOSTRAMOS EL CEBO (TEASER)
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200">
      {/* Contenido Real (Oculto/Borroso) */}
      <div className="blur-sm select-none opacity-50 grayscale p-4 pointer-events-none">
        {children}
        {type === "text" && (
           <p className="mt-4 text-justify">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
             incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
             (Contenido Exclusivo Oculto)
           </p>
        )}
      </div>

      {/* Capa de Bloqueo (Overlay) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
        <div className="bg-white p-4 rounded-full shadow-xl mb-3 border border-slate-100">
          <Lock className="text-blue-600 h-8 w-8" />
        </div>
        <h3 className="text-lg font-black text-slate-800">Contenido Premium</h3>
        <p className="text-sm text-slate-600 mb-4 max-w-[200px] text-center">
          Suscríbase para ver este plan completo y sin marca de agua.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all hover:scale-105">
          Desbloquear Ahora
        </button>
      </div>
      
      {/* Marca de Agua Sutil de Fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 -rotate-12">
        <span className="text-6xl font-black text-slate-900">AULAPLAN DEMO</span>
      </div>
    </div>
  );
}