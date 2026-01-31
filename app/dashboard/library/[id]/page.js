import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LessonMixer from "@/components/dashboard/LessonMixer";
import CodeMockup from "@/components/pedagogy/CodeMockup";
import SafetyAlert from "@/components/pedagogy/SafetyAlert"; // NUEVO IMPORT

export default async function PlanDetailPage({ params }) {
  const plan = await prisma.lessonPlan.findUnique({ where: { id: params.id } });
  if (!plan) return <div>No encontrado</div>;

  const isHydra = plan.content?.meta?.mode === "HYDRA_MATRIX";
  const matrix = plan.content?.planning_matrix;
  const meta = plan.content?.meta || {}; // Extraemos meta para SafetyAlert

  if (isHydra && matrix) {
    return (
        <div className="p-8 max-w-6xl mx-auto">
             {/* ... Header Hydra ... */}
             <LessonMixer matrix={matrix} />
        </div>
    );
  }

  // VISTA ESTÁNDAR (Con SafetyAlert)
  const mediation = plan.content?.planning_module?.mediation || [];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
        <Link href="/dashboard/library" className="text-slate-400 text-sm font-bold flex items-center gap-2 mb-4 hover:text-slate-800"><ArrowLeft size={16}/> Volver</Link>
        
        <div>
            <div className="flex gap-2 mb-2">
                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold">{plan.subject}</span>
                {meta.context === "INDIGENA" && <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">🌿 COSMOVISIÓN</span>}
                {meta.context === "SPED" && <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">♿ ACCESIBILIDAD</span>}
            </div>
            <h1 className="text-3xl font-black text-slate-900">{plan.title.replace("MEP CULTURAL:", "").replace("MEP CTP:", "").replace("MEP SPED:", "")}</h1>
        </div>

        {/* ALERTA DE SEGURIDAD AUTOMÁTICA */}
        <SafetyAlert meta={meta} />

        {/* CONTENIDO DEL PLAN */}
        <div className="grid gap-6">
            {mediation.map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-blue-600 uppercase mb-2">{m.moment}</h3>
                    <p className="text-slate-800 font-medium text-lg">{m.activity}</p>
                    {m.dua_variant && (
                        <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                            <strong>DUA/Ajuste:</strong> {m.dua_variant}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}