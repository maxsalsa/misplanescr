export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import SpecTableEditor from "@/components/evaluation/SpecTableEditor";
import { FileText, Download } from "lucide-react";

export default async function EvaluationPage() {
  // OBTENER EL ÚLTIMO PLAN CREADO
  const plan = await prisma.lessonPlan.findFirst({
    where: { content: { path: ["evaluation_system", "written_test"] } },
    orderBy: { createdAt: "desc" },
  });

  const testData = plan?.content?.evaluation_system?.written_test || {
    title: "Prueba Nueva",
    rows: [],
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Centro de Evaluación
          </h1>
          <p className="text-slate-500">
            Diseño técnico de pruebas y balanceo de puntajes (Reglamento de
            Evaluación).
          </p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-50">
          <Download size={16} /> Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SpecTableEditor initialData={testData.rows} title={testData.title} />
        </div>

        {/* SIDEBAR CONTEXTO */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
              <FileText size={16} /> Plan Vinculado
            </h3>
            <p className="text-sm text-blue-900 font-medium">
              {plan?.title || "Sin Plan Seleccionado"}
            </p>
            <p className="text-xs text-blue-600 mt-1 uppercase font-bold">
              {plan?.subject || "General"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 text-sm">
              Distribución Cognitiva
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Conocimiento</span>{" "}
                <span className="font-bold">20%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full w-[20%]"></div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Aplicación</span>{" "}
                <span className="font-bold">50%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[50%]"></div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Análisis</span>{" "}
                <span className="font-bold">30%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[30%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
