"use client";
import { useState } from "react";
import { RefreshCw, CheckCircle, Database, Server } from "lucide-react";
import { toast } from "sonner";
import { ingestMepPrograms } from "@/app/actions/admin-actions";

export default function AdminPrograms() {
  const [loading, setLoading] = useState(false);

  const handleIngest = async () => {
    setLoading(true);
    const toastId = toast.loading("Iniciando motor de ingesta...");

    try {
      const result = await ingestMepPrograms();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Error de comunicación con el servidor", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Gestión de Ingesta (MEP Core)
        </h1>
        <span className="badge badge-neutral font-mono">
          SERVER ACTIONS ENABLED
        </span>
      </div>

      <div className="card bg-white border border-slate-200 shadow-lg">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
              <Database size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">
                Sincronización de Base de Datos
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Ejecuta el script Python para leer PDFs y actualizar la tabla
                `mep_programs_core`.
              </p>
              <button
                onClick={handleIngest}
                disabled={loading}
                className="btn btn-primary btn-sm gap-2"
              >
                {loading ? (
                  <RefreshCw className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                {loading ? "Procesando..." : "Ejecutar Ingesta V5"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
