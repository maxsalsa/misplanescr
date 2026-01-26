import { prisma } from "@/lib/db";
import { BookOpen, Users, Sparkles, Sun } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const planCount = await prisma.pedagogicalPlan.count().catch(() => 0);
    const studentCount = await prisma.student.count().catch(() => 0);
    return { planCount, studentCount };
  } catch { return { planCount: 0, studentCount: 0 }; }
}

export default async function DashboardPage() {
  const stats = await getStats();
  const hour = new Date().getHours();
  let greeting = "Buenas noches";
  if (hour < 12) greeting = "Buenos días";
  else if (hour < 18) greeting = "Buenas tardes";

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER HUMANO */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-6">
        <div>
           <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
              <Sun size={20} className="animate-pulse" /> {greeting}, Profe Max.
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel de Control</h1>
           <p className="text-slate-500">
             "La enseñanza es el acto más grande de optimismo."
           </p>
        </div>
        <div className="flex gap-2">
           <a href="/dashboard/create" className="btn btn-institutional gap-2 shadow-lg">
             <Sparkles size={16} className="text-yellow-400" /> Crear Nuevo Plan
           </a>
        </div>
      </div>

      {/* METRICAS VIVAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta Estudiantes */}
        <div className="card-solemn p-6 border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mis Estudiantes</p>
               <h3 className="text-3xl font-black text-slate-900 mt-2">{stats.studentCount}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Users size={24} /></div>
          </div>
          <div className="mt-4 text-xs font-medium text-slate-500">
             Gestión de Expedientes y Ley 7600
          </div>
        </div>

        {/* Tarjeta Planes */}
        <div className="card-solemn p-6 border-l-4 border-emerald-500">
          <div className="flex justify-between items-start">
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Planeamientos</p>
               <h3 className="text-3xl font-black text-slate-900 mt-2">{stats.planCount}</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><BookOpen size={24} /></div>
          </div>
          <div className="mt-4 text-xs font-medium text-slate-500">
             Documentos listos para entregar
          </div>
        </div>

        {/* Tarjeta Estado (Venta Sutil) */}
        <div className="card-solemn p-6 bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20">
           <div className="flex items-center gap-3 mb-3">
              <div className="badge badge-warning gap-1 font-bold text-xs"><Sparkles size={10}/> PLAN ULTRA</div>
           </div>
           <p className="text-sm text-slate-300 mb-4">
             Su cuenta tiene prioridad de procesamiento IA y soporte directo.
           </p>
           <div className="text-xs text-slate-500 font-mono">
             LICENCIA: ACTIVA (2026)
           </div>
        </div>
      </div>
    </div>
  );
}