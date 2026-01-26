"use client"; 
import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <html>
      <body className="bg-slate-50 min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="inline-block p-4 bg-red-50 text-red-500 rounded-full mb-4">
            <AlertOctagon size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Interrupción del Sistema</h2>
          <p className="text-slate-500 mb-8">
            Nuestros sensores detectaron una anomalía. No se preocupe, sus datos están seguros.
          </p>
          <button onClick={() => reset()} className="btn btn-institutional shadow-lg">
            Reiniciar Sistema
          </button>
        </div>
      </body>
    </html>
  );
}