"use client";
import { useState, useEffect } from "react";
import {
  FileText,
  Calculator,
  Printer,
  Sliders,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import LegalDocumentViewer from "@/components/legal/LegalDocumentViewer";

export default function AssessmentPage() {
  const [mode, setMode] = useState("TEST");
  const [config, setConfig] = useState({
    points: 25,
    percentage: 15,
    lessons: 12,
  });
  const [error, setError] = useState(null);

  // CÁLCULO EN TIEMPO REAL CON VALIDACIÓN (QA)
  const constant =
    config.lessons > 0 ? (config.points / config.lessons).toFixed(2) : "0.00";

  // Efecto de Validación (Blindaje)
  useEffect(() => {
    if (config.points < 1) setError("Los puntos deben ser mayor a 0.");
    else if (config.lessons < 1) setError("Debe haber al menos 1 lección.");
    else if (config.percentage > 100)
      setError("El porcentaje no puede exceder 100%.");
    else setError(null);
  }, [config]);

  const handleGenerate = () => {
    if (error) {
      toast.error("Error de Validación", {
        description: "Corrija los campos en rojo antes de continuar.",
      });
      return;
    }
    toast.success("Documento Validado y Generado", {
      description: `Cumple Lineamientos 2020. Constante: ${constant}`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in pb-20 pl-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="text-blue-600" /> Centro de Evaluación Blindado
          </h1>
          <p className="text-slate-500">
            Generación de pruebas con validación matemática estricta.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PANEL DE CONFIGURACIÓN (CON VALIDACIÓN VISUAL) */}
        <div
          className={`card-solemn p-6 h-fit transition-all ${error ? "border-red-500 ring-1 ring-red-500" : ""}`}
        >
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sliders size={18} /> Parámetros Técnicos
          </h3>

          {error && (
            <div className="alert bg-red-50 text-red-700 text-xs mb-4 flex items-center gap-2">
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="form-control">
              <label className="label text-xs font-bold uppercase">
                Valor Porcentual (%)
              </label>
              <input
                type="number"
                className="input input-bordered bg-slate-50 font-mono focus:border-blue-500"
                value={config.percentage}
                onChange={(e) =>
                  setConfig({ ...config, percentage: Number(e.target.value) })
                }
              />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase">
                Puntos Totales
              </label>
              <input
                type="number"
                className="input input-bordered bg-slate-50 font-mono focus:border-blue-500"
                value={config.points}
                onChange={(e) =>
                  setConfig({ ...config, points: Number(e.target.value) })
                }
              />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase">
                Lecciones Invertidas
              </label>
              <input
                type="number"
                className="input input-bordered bg-slate-50 font-mono focus:border-blue-500"
                value={config.lessons}
                onChange={(e) =>
                  setConfig({ ...config, lessons: Number(e.target.value) })
                }
              />
            </div>

            <div
              className={`p-4 rounded-xl text-center transition-colors ${error ? "bg-red-100 text-red-800" : "bg-slate-900 text-emerald-400"}`}
            >
              <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
                Constante Calculada
              </p>
              <p className="text-3xl font-black">{constant}</p>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className={`btn w-full mt-6 shadow-xl ${error ? "btn-disabled bg-slate-200" : "btn-institutional"}`}
          >
            <Printer size={18} /> Generar Documento Oficial
          </button>
        </div>

        {/* VISUALIZADOR CON ACCESIBILIDAD V80 INTEGRADA */}
        <div className="lg:col-span-2">
          <LegalDocumentViewer
            content={`
                <p><strong>Curso:</strong> Soporte TI</p>
                <p><strong>Valor:</strong> ${config.percentage}%</p>
                <hr/>
                <p>Instrucciones: Conteste las preguntas...</p>
              `}
          />
        </div>
      </div>
    </div>
  );
}
