"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("🔥 ERROR CRÍTICO CAPTURADO:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <div className="alert alert-error max-w-md shadow-lg mb-6">
        <AlertTriangle />
        <span>Se ha detectado una anomalía en el sistema.</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Protocolo de Seguridad Activado</h2>
      <p className="text-base-content/60 mb-6 max-w-lg">
        Antigravity ha detenido la operación para proteger la integridad de los datos.
        El error ha sido registrado en la caja negra.
      </p>
      <button onClick={() => reset()} className="btn btn-outline gap-2">
        <RefreshCcw size={18} /> Reintentar Operación
      </button>
    </div>
  );
}
