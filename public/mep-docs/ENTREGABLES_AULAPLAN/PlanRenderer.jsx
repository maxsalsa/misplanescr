
import React from 'react';
import { BookOpen, User, GraduationCap, Rocket, Wrench, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

// COMPONENTE GENERADO POR ANTIGRAVITY V35
// Renderiza planes con Matriz MEP y Sintaxis Estricta

const PlanRenderer = ({ plan }) => {
  const getIcon = () => {
    if (plan.perfilEducativo === 'TECNICO') return <Wrench className="text-orange-500" />;
    if (plan.perfilEducativo === 'PRIMARIA') return <User className="text-purple-500" />;
    return <BookOpen className="text-blue-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      {/* ENCABEZADO */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border-l-8 border-blue-600">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {getIcon()}
              <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">{plan.perfilEducativo}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{plan.asignatura}</h1>
            <p className="text-xl text-gray-600">{plan.nivel}</p>
            {plan.marcoCualif && (
              <div className="mt-2 flex items-center gap-2 text-orange-700 bg-orange-50 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                <ShieldCheck size={16} /> {plan.marcoCualif}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className="text-xs font-semibold text-gray-400 uppercase">Valores</span>
             <div className="flex flex-wrap gap-2 justify-end">
               {plan.valores?.map((v, i) => <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{v}</span>)}
             </div>
          </div>
        </div>
      </div>

      {/* MATRIZ */}
      <div className="space-y-12">
        {plan.bloques?.map((bloque, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-slate-800 text-white p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><CheckCircle size={20} className="text-green-400" /> {bloque.resultadoAprendizaje}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="md:col-span-4 p-6 bg-gray-50 space-y-6">
                 <div><h4 className="font-bold text-slate-700 uppercase text-xs border-b pb-1">Saberes</h4><ul className="list-disc list-inside text-sm">{bloque.saberesEsenciales?.map((s,i)=><li key={i}>{s}</li>)}</ul></div>
                 <div><h4 className="font-bold text-slate-700 uppercase text-xs border-b pb-1">Indicadores</h4><ul className="text-sm">{bloque.indicadoresLogro?.map((ind,i)=><li key={i} className="flex gap-2">✓ {ind}</li>)}</ul></div>
              </div>
              <div className="md:col-span-8 p-6 space-y-6">
                <h4 className="font-bold text-slate-700 uppercase text-xs border-b pb-1">Mediación</h4>
                {bloque.actividades?.map((act, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-white relative group hover:shadow-md">
                    <div className="absolute -top-3 left-4 bg-slate-700 text-white text-xs px-3 py-1 rounded uppercase font-bold">{act.fase} - {act.tiempoMinutos} min</div>
                    <div className="mt-4 space-y-4">
                      <div className="flex gap-4"><GraduationCap className="text-blue-600" /><div className="text-sm"><span className="font-bold text-blue-900 block text-xs uppercase">Docente</span>{act.actividadDocente}</div></div>
                      <div className="flex gap-4 border-t pt-4 border-dashed"><Rocket className="text-green-600" /><div className="text-sm"><span className="font-bold text-green-800 block text-xs uppercase">Estudiante</span>{act.actividadEstudiante}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PlanRenderer;
    