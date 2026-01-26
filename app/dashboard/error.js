"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="p-4 bg-red-50 text-red-500 rounded-full"><AlertTriangle size={40} /></div>
      <h2 className="text-xl font-bold text-slate-900">Interrupción del Sistema</h2>
      <p className="text-slate-500 max-w-sm">El núcleo ha detectado una inconsistencia temporal.</p>
      <button onClick={() => reset()} className="btn btn-neutral btn-sm gap-2"><RefreshCcw size={16}/> Reiniciar Módulo</button>
    </div>
  );
}