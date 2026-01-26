'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("🔥 Error reportado:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 p-8">
      <div className="p-4 bg-red-50 text-red-600 rounded-full animate-pulse">
        <AlertTriangle size={48} />
      </div>
      
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">¡Ups! Algo salió mal</h2>
        <p className="text-slate-500">
          Hubo un problema al cargar los datos. No se preocupe, su información está segura.
        </p>
        <p className="text-xs font-mono text-red-400 bg-red-50 p-2 rounded border border-red-100 mt-2">
          {error.message || "Error desconocido"}
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-transform active:scale-95"
      >
        <RefreshCcw size={18} />
        Intentar de nuevo
      </button>
    </div>
  );
}
