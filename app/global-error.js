"use client";
import { AlertTriangle, RefreshCw, Power } from "lucide-react";

export default function GlobalError({ reset }) {
  return (
    <html>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
            <div className="mx-auto bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="text-amber-600 w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-2">
              Sistemas en Recalibración
            </h2>
            <p className="text-slate-500 mb-8">
              Antigravity ha detectado una anomalía temporal. Los núcleos se
              están auto-reparando.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => reset()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Reintentar Conexión
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Power size={18} /> Reiniciar Sistema
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <span className="text-xs font-mono text-slate-400">
                ERROR_CODE: OMEGA_RESILIENCE_01
              </span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
