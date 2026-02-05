import { CheckSquare, ListChecks } from "lucide-react";

export default function IndicatorsTable({ indicators }) {
  if (!indicators || indicators.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-6">
      <h3 className="text-slate-800 font-bold flex items-center gap-2 mb-4 uppercase text-sm">
        <ListChecks className="text-emerald-600" /> Tabla de Indicadores de
        Aprendizaje
      </h3>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-500 font-bold text-xs uppercase">
            <tr>
              <th className="p-3">Indicador (Saber Hacer)</th>
              <th className="p-3">Técnica</th>
              <th className="p-3">Instrumento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {indicators.map((ind, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-700 flex items-start gap-2">
                  <CheckSquare
                    size={14}
                    className="mt-1 text-emerald-500 shrink-0"
                  />
                  {ind.indicator}
                </td>
                <td className="p-3 text-slate-500">{ind.technique}</td>
                <td className="p-3 text-slate-500">{ind.instrument}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
