import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Suspense } from "react";
import { BookOpen, Users, PlusCircle, Calendar } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = user?.role || "GUEST";

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Hola, {user?.name || "Docente"}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Panel de Control: <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">{role}</span>
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ciclo Lectivo</p>
          <p className="text-xl font-bold text-slate-700">2026</p>
        </div>
      </div>

      {/* ESTADÍSTICAS REALES (SOLO GOD_TIER Y ADMINS) */}
      {(role === "GOD_TIER" || role === "DIRECTOR") && (
        <Suspense fallback={<div className="h-32 bg-slate-100 animate-pulse rounded-xl"></div>}>
          <StatsCards />
        </Suspense>
      )}

      {/* ÁREA DE TRABAJO (DOCENTES) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* TARJETA DE ACCIÓN 1: NUEVO PLAN */}
        <Link href="/dashboard/create" className="group">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 h-full">
            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-blue-200 shadow-lg group-hover:scale-110 transition-transform">
              <PlusCircle size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">Crear Planeamiento</h3>
            <p className="text-sm text-slate-400 mt-2">Usar el generador IA o plantillas MEP oficiales.</p>
          </div>
        </Link>

        {/* TARJETA DE ACCIÓN 2: MIS GRUPOS */}
        <Link href="/dashboard/groups" className="group">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 h-full">
            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-purple-200 shadow-lg group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-purple-600 transition-colors">Mis Grupos</h3>
            <p className="text-sm text-slate-400 mt-2">Gestionar estudiantes, asistencia y reportes.</p>
          </div>
        </Link>

        {/* TARJETA DE ACCIÓN 3: AGENDA */}
        <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 h-full flex flex-col justify-center items-center text-center">
            <Calendar size={32} className="text-slate-300 mb-2"/>
            <p className="text-slate-500 font-medium">Agenda en Desarrollo</p>
            <p className="text-xs text-slate-400">Próximamente disponible</p>
        </div>
      </div>
    </div>
  );
}