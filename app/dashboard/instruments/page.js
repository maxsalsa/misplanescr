export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import InstrumentBuilder from "@/components/evaluation/InstrumentBuilder";
import { PenTool } from "lucide-react";

export default async function InstrumentsPage() {
  // SIMULACIÓN: OBTENER INDICADORES DEL ÚLTIMO PLAN (PARA NO EMPEZAR EN BLANCO)
  const lastPlan = await prisma.lessonPlan.findFirst({
    orderBy: { createdAt: "desc" },
    select: { title: true, content: true },
  });

  // Extraer indicadores si existen, o usar genéricos del MEP
  const indicators = lastPlan?.content?.evaluation?.criteria?.map(
    (c) => c.indicator,
  ) || [
    "Aplica las normas de seguridad en el taller.",
    "Utiliza el equipo de protección personal correctamente.",
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <PenTool className="text-purple-600" /> Diseño de Instrumentos
        </h1>
        <p className="text-slate-500 max-w-2xl">
          Herramienta técnica para la creación de Rúbricas, Listas de Cotejo y
          Escalas. Cumple con el REA para la evaluación del Trabajo Cotidiano y
          Proyectos.
        </p>
      </div>

      <InstrumentBuilder defaultIndicators={indicators} />
    </div>
  );
}
