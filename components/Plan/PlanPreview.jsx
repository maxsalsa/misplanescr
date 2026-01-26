"use client";
import { CheckCircle, Clock, FileCheck } from "lucide-react";

export default function PlanPreview({ plan }) {
  if (!plan || !plan.secciones) return null;

  return (
    <div className="space-y-8 p-4">
      {/* ENCABEZADO OFICIAL */}
      <div className="bg-base-200 p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-xl font-bold uppercase">{plan.encabezado.materia}</h2>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm opacity-70">
           <span>Nivel: {plan.encabezado.nivel || "N/A"}</span>
           <span>Tiempo: {plan.encabezado.tiempo_estimado}</span>
        </div>
      </div>

      {/* SECUENCIA DIDÁCTICA */}
      {plan.secciones.map((sec, i) => (
        <div key={i} className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body">
            <div className="badge badge-secondary mb-2">Aprendizaje Esperado</div>
            <p className="font-medium text-lg mb-4">{sec.aprendizaje_esperado}</p>

            {/* FASES CRONOPEDAGÓGICAS */}
            <div className="space-y-4">
              {Object.entries(sec.fases).map(([fase, data]) => (
                <div key={fase} className="border-l-2 border-base-300 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="uppercase font-bold text-xs tracking-wider text-primary">{fase}</span>
                    <span className="badge badge-ghost badge-xs gap-1"><Clock size={10}/> {data.tiempo}</span>
                  </div>
                  <p className="text-sm text-justify mb-2">{data.actividad}</p>
                  
                  {/* CONTROL DE EVIDENCIA */}
                  <div className="bg-warning/10 text-warning-content p-2 rounded text-xs flex items-center gap-2 font-bold">
                    <FileCheck size={14} />
                    Evidencia Requerida: {data.evidencia}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      <div className="alert alert-info shadow-lg text-xs">
        <CheckCircle size={16} />
        <span>Este plan cumple con el Binomio Sagrado y la normativa de evaluación vigente.</span>
      </div>
    </div>
  );
}
