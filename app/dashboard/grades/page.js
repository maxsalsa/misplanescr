import { prisma } from "@/lib/db";
import { Users, AlertTriangle, Star, Shield, Eye } from "lucide-react";

export default async function GradesPage() {
  const groups = await prisma.group.findMany({
    include: {
      students: { include: { grades: true }, orderBy: { name: "asc" } }
    },
    take: 5
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">📊 Alerta Temprana y Calificaciones</h1>
        <p className="text-slate-500">Monitoreo de rendimiento según Art. 37 REA.</p>
      </div>

      {groups.map((group) => (
        <div key={group.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="bg-slate-50 p-4 border-b flex justify-between">
                <h2 className="font-bold text-slate-800">{group.name}</h2>
                <span className="text-xs bg-white px-2 py-1 rounded border font-bold text-slate-500">{group.students.length} Estudiantes</span>
            </div>
            
            <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-400 font-bold uppercase text-xs border-b">
                    <tr>
                        <th className="p-4">Estudiante</th>
                        <th className="p-4">Perfil DUA / Alertas</th>
                        <th className="p-4 text-center">Promedio Ponderado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {group.students.map((std) => {
                        const profile = std.profile || {};
                        const dua = profile.dua_profile || {};
                        const history = profile.academic_history || {};
                        const isRisk = history.risk_alert;
                        const isTalent = profile.high_potential;

                        return (
                            <tr key={std.id} className={isRisk ? "bg-red-50/30" : ""}>
                                <td className="p-4 font-bold text-slate-700 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white ${isRisk ? "bg-red-500" : isTalent ? "bg-purple-600" : "bg-slate-300"}`}>
                                        {std.name.charAt(0)}
                                    </div>
                                    {std.name}
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                        {isTalent && (
                                            <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200 flex items-center gap-1">
                                                <Star size={10}/> ALTA DOTACIÓN
                                            </span>
                                        )}
                                        {isRisk && (
                                            <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded border border-red-200 flex items-center gap-1 animate-pulse">
                                                <AlertTriangle size={10}/> RIESGO ACADÉMICO
                                            </span>
                                        )}
                                        {dua.level === "SIGNIFICATIVA" && (
                                            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200 flex items-center gap-1">
                                                <Shield size={10}/> ADECUACIÓN SIG.
                                            </span>
                                        )}
                                        {dua.level === "NO_SIGNIFICATIVA" && (
                                            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                                                <Eye size={10}/> APOYO ACCESO
                                            </span>
                                        )}
                                    </div>
                                    {/* DETALLES DE APOYOS */}
                                    {dua.supports?.length > 0 && (
                                        <p className="text-[10px] text-slate-400 mt-1 pl-1 border-l-2 border-slate-200">
                                            Apoyos: {dua.supports.join(", ")}
                                        </p>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`text-lg font-black ${isRisk ? "text-red-600" : isTalent ? "text-purple-600" : "text-slate-700"}`}>
                                        {history.weighted_average || "-"}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      ))}
    </div>
  );
}