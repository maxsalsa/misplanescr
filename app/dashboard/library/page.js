export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/db";
import CategoryFilter from "@/components/dashboard/CategoryFilter";
import {
  BookOpen,
  Gamepad2,
  Palette,
  BrainCircuit,
  Wrench,
  Sparkles,
  Code,
  FlaskConical,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// 🧬 DNA FAMILY MAPPING (The Brain Logic - Server Side)
const DNA_MAP = {
  HARD_TECH: {
    keywords: [
      "Ciber",
      "Web",
      "Software",
      "Redes",
      "Infor",
      "Datos",
      "Prog",
      "Python",
    ],
    label: "HARD TECH",
  },
  STEAM: {
    keywords: ["Cien", "Fís", "Quí", "Bio", "Mate", "Investig", "Ingen"],
    label: "STEAM",
  },
  SERVICE: {
    keywords: ["Turis", "Conta", "Ejec", "Banca", "Hotel", "Event"],
    label: "GESTIÓN",
  },
  ART: {
    keywords: ["Arte", "Músic", "Pint", "Danz", "Teat"],
    label: "ART/CULT",
  },
  ACADEMIC: {
    keywords: ["Espa", "Social", "Cívic", "Ingl", "Fran", "Filo"],
    label: "ACADÉMICO",
  },
};

export default async function LibraryPage({ searchParams }) {
  const category = searchParams?.category || "Todo";

  // 1. Construct Filter (Backend Logic)
  let whereClause = { status: "PUBLISHED" };

  if (category !== "Todo" && DNA_MAP[category]) {
    whereClause.OR = DNA_MAP[category].keywords.map((k) => ({
      subject: { contains: k, mode: "insensitive" },
    }));
  }

  const plans = await prisma.lessonPlan.findMany({
    where: whereClause,
    take: 50,
    orderBy: { createdAt: "desc" },
  });

  // HELPER PARA ICONOS DE SABOR
  const getFlavorIcon = (flavor) => {
    switch (flavor) {
      case "GAMIFICATION":
        return <Gamepad2 size={14} className="text-purple-600" />;
      case "CREATIVE":
        return <Palette size={14} className="text-pink-600" />;
      case "ANALYTICAL":
        return <BrainCircuit size={14} className="text-blue-600" />;
      case "TECHNICAL":
        return <Wrench size={14} className="text-slate-600" />;
      default:
        return <Sparkles size={14} className="text-amber-500" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Librería Infinita
          </h1>
          <p className="text-slate-500">
            Recursos: Juegos, Trivias, Proyectos y Retos.
          </p>
        </div>
      </div>

      <CategoryFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const flavor = plan.content?.meta?.flavor || "GENERAL";
          const activity =
            plan.content?.planning_module?.mediation?.[2]?.activity ||
            "Actividad General";

          return (
            <Link key={plan.id} href={`/dashboard/library/${plan.id}`}>
              <Card className="group hover:shadow-xl transition-all border-slate-200 h-full cursor-pointer hover:-translate-y-1 duration-300 overflow-hidden">
                <div
                  className={`h-2 w-full ${
                    flavor === "GAMIFICATION"
                      ? "bg-purple-500"
                      : flavor === "CREATIVE"
                        ? "bg-pink-500"
                        : flavor === "TECHNICAL"
                          ? "bg-slate-700"
                          : "bg-blue-500"
                  }`}
                ></div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {plan.subject}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      {getFlavorIcon(flavor)}
                      <span className="text-[10px] font-bold text-slate-600">
                        {flavor}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 leading-tight">
                    {plan.title
                      .replace("MEP VARIETY:", "")
                      .replace("MEP 2026:", "")
                      .replace("MEP OFICIAL:", "")}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                      Actividad Central:
                    </p>
                    <p className="text-sm text-slate-700 font-medium line-clamp-2">
                      {activity}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
