import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LessonMixer from "@/components/dashboard/LessonMixer";
import SafetyAlert from "@/components/pedagogy/SafetyAlert";
import ResourceList from "@/components/pedagogy/ResourceList";
import PrintAction from "@/components/pedagogy/PrintAction";
import GamificationCard from "@/components/pedagogy/GamificationCard";
import RubricMaster from "@/components/pedagogy/RubricMaster";
import DownloadPDF from "@/components/pedagogy/DownloadPDF"; // ✅ AHORA ES PDF

export default async function PlanDetailPage({ params }) {
  const plan = await prisma.lessonPlan.findUnique({ where: { id: params.id } });
  if (!plan) return <div>No encontrado</div>;

  const isHydra = plan.content?.meta?.mode === "HYDRA_MATRIX";
  const matrix = plan.content?.planning_matrix;
  const meta = plan.content?.meta || {};
  const game = plan.content?.planning_module?.gamification;
  const evaluation = plan.content?.planning_module?.evaluation_system;

  if (isHydra && matrix) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <LessonMixer matrix={matrix} />
      </div>
    );
  }

  const mediation = plan.content?.planning_module?.mediation || [];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 print:p-0 print:max-w-none">
      <div className="flex justify-between items-start no-print">
        <Link
          href="/dashboard/library"
          className="text-slate-400 text-sm font-bold flex items-center gap-2 mb-4 hover:text-slate-800"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
        <div className="flex gap-2 items-center">
          <DownloadPDF plan={plan} /> {/* ✅ EL CANDADO PDF */}
          <PrintAction />
        </div>
      </div>

      <div>
        <div className="flex gap-2 mb-2">
          <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold print:border print:text-black">
            {plan.subject}
          </span>
          <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
            {plan.level}
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          {plan.title.replace(/MEP \w+: /, "")}
        </h1>
        <p className="text-slate-500 mt-2">
          Docente: {plan.content?.administrative?.docente || "Usuario AulaPlan"}
        </p>
      </div>

      <SafetyAlert meta={meta} />
      <GamificationCard game={game} />

      <div className="grid gap-6">
        <h2 className="text-xl font-bold text-slate-900 border-b pb-2 mt-4">
          Secuencia Didáctica
        </h2>
        {mediation.map((m, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm break-inside-avoid"
          >
            <h3 className="text-sm font-bold text-blue-600 uppercase mb-2">
              {m.moment}
            </h3>
            <p className="text-slate-800 font-medium text-lg">{m.activity}</p>
            {m.dua_variant && (
              <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                <strong>DUA:</strong> {m.dua_variant}
              </div>
            )}
          </div>
        ))}
      </div>

      <RubricMaster evaluation={evaluation} />
      <ResourceList resources={plan.content?.resources} />
    </div>
  );
}
