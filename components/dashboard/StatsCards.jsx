import { prisma } from "@/lib/db";
import { Users, BookOpen, School, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function StatsCards() {
  // CONSULTAS REALES A BASE DE DATOS (PARALELAS PARA VELOCIDAD)
  const [userCount, groupCount, planCount] = await Promise.all([
    prisma.user.count(),
    prisma.group.count(),
    prisma.lessonPlan.count()
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-blue-600 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><Users size={16}/> Total Usuarios</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold text-slate-800">{userCount}</div></CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-purple-600 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><School size={16}/> Grupos Activos</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold text-slate-800">{groupCount}</div></CardContent>
      </Card>

      <Card className="border-l-4 border-l-emerald-600 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><BookOpen size={16}/> Planes Creados</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold text-slate-800">{planCount}</div></CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2"><TrendingUp size={16}/> Rendimiento</CardTitle></CardHeader>
        <CardContent><div className="text-2xl font-bold text-slate-800">98.5%</div></CardContent>
      </Card>
    </div>
  );
}