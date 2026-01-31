import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Users, Search, Filter } from "lucide-react";
import Link from "next/link";

export default async function GroupsPage() {
  const session = await getServerSession(authOptions);
  
  // CONSULTA REAL A NEON DB
  // Trae los grupos creados por el usuario logueado (o todos si es GOD_TIER)
  const where = session?.user?.role === "GOD_TIER" ? {} : { userId: session?.user?.id };
  
  const groups = await prisma.group.findMany({
    where: where,
    include: { _count: { select: { students: true } } },
    orderBy: { name: "asc" }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            <Users className="text-purple-600" /> Gestión de Grupos
          </h1>
          <p className="text-slate-500">Administre sus secciones y listas de estudiantes.</p>
        </div>
        <Link href="/dashboard/groups/new" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-purple-200 transition-all">
          + Nuevo Grupo
        </Link>
      </div>

      {/* LISTADO DE GRUPOS REALES */}
      {groups.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border-dashed border-2 border-slate-200">
          <Users size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-600">No hay grupos registrados</h3>
          <p className="text-slate-400 mb-6">Comience creando su primer grupo de estudiantes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={64} className="text-purple-600" />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">{group.name}</h2>
                    <p className="text-sm font-bold text-purple-600 uppercase tracking-wider">{group.grade} • {group.shift}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
                <div className="text-center">
                    <span className="block text-2xl font-bold text-slate-800">{group._count.students}</span>
                    <span className="text-xs text-slate-400 font-bold uppercase">Estudiantes</span>
                </div>
                <div className="flex-1 text-right">
                    <span className="text-sm font-bold text-blue-600 hover:underline">Ver Lista →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}