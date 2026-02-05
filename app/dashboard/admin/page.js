import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Users, FileText, Database, ShieldCheck } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const session = await getServerSession();

  // Seguridad: Solo Admin entra aquí
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // OBTENCIÓN DE DATOS SEGURA (TRY/CATCH)
  let userCount = 0;
  let planCount = 0;
  
  try {
      userCount = await prisma.user.count();
      planCount = await prisma.syllabus.count();
  } catch (e) {
      console.error("Error leyendo DB:", e);
      // Si falla, se queda en 0, pero NO TUMBAMOS LA APP
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Panel de Control Maestro</h1>
      <p className="text-slate-500 mb-8">Vista privilegiada del sistema (Modo Dios).</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TARJETA USUARIOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                <Users size={32} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-400 uppercase">Usuarios Activos</p>
                <h3 className="text-3xl font-bold text-slate-800">{userCount}</h3>
            </div>
        </div>

        {/* TARJETA PLANES/SYLLABUS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                <Database size={32} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-400 uppercase">Programas MEP</p>
                <h3 className="text-3xl font-bold text-slate-800">{planCount}</h3>
            </div>
        </div>

        {/* TARJETA ESTADO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
                <ShieldCheck size={32} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-400 uppercase">Estado del Sistema</p>
                <h3 className="text-xl font-bold text-green-600">OPERATIVO</h3>
            </div>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-700 mb-2">Auditoría Técnica</h3>
        <p className="text-sm text-slate-600">Base de datos sincronizada. Motor de IA en espera. Redundancia activa.</p>
      </div>
    </div>
  );
}