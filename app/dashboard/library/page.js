import { getUserPlans } from "@/app/actions/library"; // Server Component
import { FileText, Calendar, Trash2, Download, Search } from "lucide-react";
import DeleteButton from "./delete-btn"; // Client Component pequeño

export default async function LibraryPage() {
  const plans = await getUserPlans();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portafolio Digital</h1>
          <p className="text-slate-500">Repositorio histórico de su práctica pedagógica.</p>
        </div>
        <div className="bg-white border border-slate-300 rounded-lg flex items-center px-3 py-2 gap-2 text-slate-400">
          <Search size={16} />
          <span className="text-xs font-mono">Buscar expedientes...</span>
        </div>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
           <FileText size={48} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-lg font-bold text-slate-600">Portafolio Vacío</h3>
           <p className="text-slate-400 mb-6">Aún no ha generado documentos.</p>
           <a href="/dashboard/create" className="btn btn-institutional">Crear Primer Plan</a>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs">
              <tr>
                <th>Documento / Título</th>
                <th>Asignatura & Nivel</th>
                <th>Fecha Creación</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{plan.title || "Sin Título"}</div>
                        <div className="text-xs text-slate-400 font-mono uppercase">ID: {plan.id.substring(0,8)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium text-slate-700">{plan.subject}</div>
                    <span className="badge badge-ghost badge-sm text-xs">{plan.gradeLevel}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Calendar size={14} />
                      {new Date(plan.createdAt).toLocaleDateString("es-CR")}
                    </div>
                  </td>
                  <td className="text-right flex justify-end gap-2">
                    <button className="btn btn-ghost btn-sm text-blue-600 gap-1">
                      <Download size={14} /> <span className="hidden md:inline">Ver</span>
                    </button>
                    {/* Botón de Borrar (Componente Cliente) */}
                    <DeleteButton id={plan.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}