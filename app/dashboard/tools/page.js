"use client";
import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import {
  FileText,
  Gavel,
  ClipboardCheck,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState(null); // rubrica, examen, conducta
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Inputs genéricos
  const [inputData, setInputData] = useState({
    materia: "",
    tema: "",
    estudiante: "",
    falta: "",
  });

  const handleGenerate = async (type) => {
    setLoading(true);
    setResult(null);
    const toastId = toast.loading("Procesando solicitud...");

    try {
      const res = await fetch("/api/planning/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type, // RUBRICA, EXAMEN, CONDUCTA
          materia: inputData.materia,
          tema: inputData.tema,
          studentInfo: { name: inputData.estudiante, falta: inputData.falta },
          provider: "OPENAI",
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setResult(data.data);
      toast.success("Documento generado.", { id: toastId });
    } catch (e) {
      toast.error(e.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Herramientas Docentes (Swiss Mode)
          </h1>
          <p className="opacity-60">
            Generación de instrumentos, evaluaciones y gestión disciplinaria.
          </p>
        </div>

        {/* SELECTOR DE HERRAMIENTAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setActiveTool("RUBRICA");
              setResult(null);
            }}
            className={`btn h-auto py-4 flex flex-col gap-2 ${activeTool === "RUBRICA" ? "btn-primary" : "btn-outline"}`}
          >
            <ClipboardCheck size={32} /> Generar Rúbrica
          </button>
          <button
            onClick={() => {
              setActiveTool("EXAMEN");
              setResult(null);
            }}
            className={`btn h-auto py-4 flex flex-col gap-2 ${activeTool === "EXAMEN" ? "btn-primary" : "btn-outline"}`}
          >
            <FileText size={32} /> Crear Prueba Escrita
          </button>
          <button
            onClick={() => {
              setActiveTool("CONDUCTA");
              setResult(null);
            }}
            className={`btn h-auto py-4 flex flex-col gap-2 ${activeTool === "CONDUCTA" ? "btn-error" : "btn-outline btn-error"}`}
          >
            <Gavel size={32} /> Boleta Conducta
          </button>
        </div>

        {/* ÁREA DE TRABAJO */}
        {activeTool && (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {activeTool === "RUBRICA" && "Configurar Rúbrica de Evaluación"}
                {activeTool === "EXAMEN" && "Diseñar Prueba Escrita"}
                {activeTool === "CONDUCTA" &&
                  "Reporte Disciplinario (Reglamento MEP)"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CAMPOS COMUNES */}
                {(activeTool === "RUBRICA" || activeTool === "EXAMEN") && (
                  <>
                    <div className="form-control">
                      <label className="label">Materia</label>
                      <input
                        className="input input-bordered"
                        placeholder="Ej: Ciencias"
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            materia: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Tema / Contenido</label>
                      <input
                        className="input input-bordered"
                        placeholder="Ej: Ciclo del agua"
                        onChange={(e) =>
                          setInputData({ ...inputData, tema: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}

                {/* CAMPOS CONDUCTA */}
                {activeTool === "CONDUCTA" && (
                  <>
                    <div className="form-control">
                      <label className="label">Nombre Estudiante</label>
                      <input
                        className="input input-bordered"
                        placeholder="Nombre completo"
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            estudiante: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Descripción de la Falta</label>
                      <textarea
                        className="textarea textarea-bordered"
                        placeholder="¿Qué sucedió exactamente?"
                        onChange={(e) =>
                          setInputData({ ...inputData, falta: e.target.value })
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="card-actions justify-end mt-6">
                <button
                  onClick={() => handleGenerate(activeTool)}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Procesar Solicitud"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULTADOS */}
        {result && (
          <div className="mockup-window border border-base-300 bg-base-200">
            <div className="flex justify-center px-4 py-16 bg-base-100 font-mono text-sm overflow-auto max-h-[500px]">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
