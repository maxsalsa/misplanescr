export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import React from "react";
import { getCurriculumData } from "@/actions/curriculum-actions";
import EvaluationBuilder from "@/components/curriculum/EvaluationBuilder";
import { Database, Cpu } from "lucide-react";

export const metadata = {
  title: "Arquitecto Curricular | AulaPlan",
  description: "Visualizador de ADN Semántico MEP",
};

export default async function ArchitectPage() {
  const curriculumData = await getCurriculumData();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <header className="max-w-4xl mx-auto mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-indigo-900 text-indigo-100 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-indigo-900/20">
          <Cpu size={14} /> Fase 5: El Arquitecto - Beta
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
          ADN Curricular <span className="text-indigo-600">MEP</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl">
          Visualización quirúrgica de los datos extraídos por el{" "}
          <strong>Motor de Inteligencia Colectiva</strong>. Aquí convergen la
          normativa legal, la neurociencia (DUA) y el stack tecnológico.
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {curriculumData && curriculumData.length > 0 ? (
          curriculumData.map((module) => (
            <EvaluationBuilder key={module.id} curriculumModule={module} />
          ))
        ) : (
          <div className="card bg-white p-12 text-center border border-dashed border-slate-300">
            <Database size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700">
              Esperando Ingesta de Datos...
            </h3>
            <p className="text-slate-500 mt-2">
              El &quot;Architect Engine&quot; está procesando los documentos PDF
              en segundo plano. <br />
              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded mt-2 inline-block">
                Table: public.curriculum (Neon DB)
              </span>
            </p>
            <div className="mt-6">
              <button className="btn btn-primary btn-outline gap-2">
                <Cpu size={16} className="animate-pulse" /> Verificar Estado del
                Motor
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
