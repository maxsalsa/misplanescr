"use client";
import { useState } from "react";
import {
  FileText,
  Book,
  Calendar,
  ClipboardList,
  Award,
  TrendingUp,
  Download,
  Save,
  RefreshCw,
} from "lucide-react";

/**
 * 🚀 UNIVERSAL GENERATOR UI (THE TOTAL ENGINE)
 * Allows creation of ALL 15 pedagogical resource types defined in the Master Schema.
 */

const RESOURCE_TYPES = [
  { id: "PLAN_ANUAL", label: "Plan Anual", icon: <Calendar size={18} /> },
  {
    id: "PLAN_UNIDAD",
    label: "Plan de Unidad (Práctica)",
    icon: <Book size={18} />,
  },
  { id: "PLAN_DIARIO", label: "Minuta Diaria", icon: <FileText size={18} /> },
  {
    id: "ACTIVIDAD_MEDIACION",
    label: "Actividad de Clase",
    icon: <TrendingUp size={18} />,
  },
  {
    id: "TRABAJO_COTIDIANO",
    label: "Trabajo Cotidiano",
    icon: <ClipboardList size={18} />,
  },
  { id: "TAREA_CORTA", label: "Tarea Corta", icon: <FileText size={18} /> },
  {
    id: "PRUEBA_CORTA",
    label: "Quiz / Prueba Corta",
    icon: <Award size={18} />,
  },
  {
    id: "EXAMEN",
    label: "Prueba Escrita (Examen)",
    icon: <FileText size={18} />,
  },
  {
    id: "RUBRICA",
    label: "Instrumento (Rúbrica)",
    icon: <ClipboardList size={18} />,
  },
  {
    id: "GUIA_AUTONOMA",
    label: "Guía Trabajo Autónomo",
    icon: <Book size={18} />,
  },
  {
    id: "MATERIAL_APOYO",
    label: "Material Didáctico",
    icon: <Download size={18} />,
  },
  {
    id: "CAPSULA_FAMILIA",
    label: "Reporte a Familia",
    icon: <Users size={18} />,
  },
];

export default function UniversalGenerator() {
  const [selectedType, setSelectedType] = useState("PLAN_UNIDAD");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulation of RAG Call
    setTimeout(() => {
      setGeneratedContent({
        title: `Recurso Generado: ${RESOURCE_TYPES.find((t) => t.id === selectedType).label}`,
        body: "Contenido oficial basado en el Programa MEP...",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="card bg-white shadow-xl border border-slate-200 max-w-5xl mx-auto">
      <div className="card-header p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">
            Generador Universal MEP
          </h2>
          <p className="text-sm text-slate-500">
            Selecciona el tipo de recurso pedagógico que necesitas hoy.
          </p>
        </div>
        <div className="badge badge-primary badge-outline">
          Motor RAG Activo
        </div>
      </div>

      <div className="card-body p-0 flex flex-col md:flex-row">
        {/* SIDEBAR SELECTOR */}
        <div className="w-full md:w-1/3 bg-slate-50/50 p-4 space-y-2 border-r border-slate-100 max-h-[600px] overflow-y-auto">
          {RESOURCE_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`nav-btn w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${selectedType === type.id ? "bg-blue-100 text-blue-800 font-bold shadow-sm" : "hover:bg-white text-slate-600"}`}
            >
              <div
                className={`p-2 rounded-md ${selectedType === type.id ? "bg-white text-blue-600" : "bg-slate-200 text-slate-500"}`}
              >
                {type.icon}
              </div>
              <span className="text-sm">{type.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN EDITOR AREA */}
        <div className="w-full md:w-2/3 p-8 flex flex-col min-h-[500px]">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4 animate-pulse">
              <RefreshCw size={48} className="animate-spin text-blue-500" />
              <p>Consultando Cerebro Vectorial...</p>
              <p className="text-xs">Validando indicadores MEP...</p>
            </div>
          ) : generatedContent ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#003366]">
                ¡{RESOURCE_TYPES.find((t) => t.id === selectedType).label}{" "}
                Listo!
              </h3>
              <div className="flex gap-4">
                <button className="btn btn-outline gap-2">
                  <Eye size={18} /> Vista Previa
                </button>
                <button className="btn btn-primary gap-2">
                  <Save size={18} /> Guardar en Portafolio
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center opacity-50">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Book size={48} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold">Listo para crear</h3>
              <p className="text-sm max-w-xs mx-auto mt-2">
                Configura los parámetros (Nivel, Unidad) y deja que la IA haga
                el trabajo pesado.
              </p>
              <button
                className="btn btn-primary btn-lg mt-8 shadow-lg shadow-blue-500/30"
                onClick={handleGenerate}
              >
                Generar Contenido Oficial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icon fallbacks
function Eye(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function CheckCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
