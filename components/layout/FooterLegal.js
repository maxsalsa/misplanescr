import { ShieldCheck } from "lucide-react";

export default function FooterLegal() {
  return (
    <footer className="w-full py-6 mt-10 border-t border-slate-200 bg-slate-50 text-center">
      <div className="flex items-center justify-center gap-2 mb-2 text-slate-400">
        <ShieldCheck size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Sistema AulaPlan V200</span>
      </div>
      <p className="text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed">
        Plataforma conforme a la Circular DAJ-001 y Programas de Estudio MEP 2026. 
        El uso de esta herramienta garantiza el cumplimiento de la Ley de Simplificación de Trámites.
        <br/>
        <strong>Soporte Crítico: 6090-6359 (Max Salazar)</strong>
      </p>
    </footer>
  );
}