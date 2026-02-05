import { ClipboardCheck, CheckCircle2 } from "lucide-react";

export default function RubricMaster({ evaluation }) {
  if (!evaluation || !evaluation.daily_work) return null;

  const { daily_work, project, short_task } = evaluation;

  return (
    <div className="mt-8 break-inside-avoid">
      <div className="bg-slate-900 text-white p-4 rounded-t-xl flex items-center gap-3">
        <ClipboardCheck size={24} className="text-emerald-400" />
        <div>
          <h3 className="font-bold text-lg">Sistema de Evaluación</h3>
          <p className="text-slate-400 text-xs uppercase">
            Instrumentos Oficiales de Calificación
          </p>
        </div>
      </div>

      <div className="border border-slate-200 bg-white rounded-b-xl overflow-hidden shadow-sm">
        {/* SECCIÓN 1: TRABAJO COTIDIANO (RÚBRICA) */}
        <div className="p-6 border-b border-slate-100">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
              RÚBRICA
            </span>
            {daily_work.title}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                <tr>
                  <th className="p-3">Indicador de Aprendizaje</th>
                  <th className="p-3 text-center w-24">Inicial (1)</th>
                  <th className="p-3 text-center w-24">Intermedio (2)</th>
                  <th className="p-3 text-center w-24">Avanzado (3)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {daily_work.rubric.map((r, i) => (
                  <tr key={i}>
                    <td className="p-3 font-medium text-slate-700">
                      {r.indicator}
                    </td>
                    <td className="p-3 text-center text-slate-400 border-l">
                      ⬜
                    </td>
                    <td className="p-3 text-center text-slate-400 border-l">
                      ⬜
                    </td>
                    <td className="p-3 text-center text-slate-400 border-l">
                      ⬜
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECCIÓN 2: TAREA CORTA Y PROYECTO (GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-6 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 mb-2 flex justify-between">
              <span>📝 Tarea Corta</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {short_task?.value}
              </span>
            </h4>
            <p className="text-sm font-bold text-slate-900">
              {short_task?.title}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              {short_task?.description}
            </p>
          </div>

          <div className="p-6 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 mb-2 flex justify-between">
              <span>🚀 Proyecto / Estrategia</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                {project?.value}
              </span>
            </h4>
            <p className="text-sm font-bold text-slate-900">{project?.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project?.phases?.map((p, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase bg-white border border-slate-200 px-2 py-1 rounded text-slate-500"
                >
                  <CheckCircle2 size={10} /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
