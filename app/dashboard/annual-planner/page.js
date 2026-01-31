"use client";
import { useState } from "react";
import { Calculator, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

export default function AnnualPlannerPage() {
  // DATOS OFICIALES (INMUTABLES)
  // El programa pide estas horas y NO se pueden bajar.
  const [units, setUnits] = useState([
    { id: 1, name: "Unidad 1: Fundamentos TI", officialHours: 96, plannedHours: 96 },
    { id: 2, name: "Unidad 2: Seguridad Industrial", officialHours: 36, plannedHours: 36 },
    { id: 3, name: "Unidad 3: Electricidad y Electrónica", officialHours: 28, plannedHours: 28 }
  ]);

  // CÁLCULO DE REALIDAD
  const totalOfficial = units.reduce((acc, u) => acc + u.officialHours, 0);
  const totalPlanned = units.reduce((acc, u) => acc + u.plannedHours, 0);
  
  // Disponibilidad Real (36 semanas x 4 lecciones = 144 horas reales aprox)
  // Si el programa pide 160 (96+36+28), hay un "Déficit Físico", pero pedagógicamente cumplimos.
  const physicalAvailability = 144; 
  const intensity = (totalPlanned / physicalAvailability) * 100;

  const handleSave = () => {
    if (totalPlanned < totalOfficial) {
      toast.error("Plan Incompleto", { description: "Debe cubrir el 100% de horas oficiales." });
    } else {
      toast.success("Plan Anual Validado", { description: "Cobertura curricular del 100% garantizada." });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-blue-600"/> Plan Anual Oficial 2026
          </h1>
          <p className="text-slate-500">Distribución de horas según Programa de Estudio (Cobertura Total).</p>
        </div>
        
        {/* INDICADOR DE CUMPLIMIENTO */}
        <div className={`px-6 py-3 rounded-xl border-2 font-bold text-lg flex items-center gap-3 ${totalPlanned >= totalOfficial ? "border-blue-100 bg-blue-50 text-blue-700" : "border-yellow-100 bg-yellow-50 text-yellow-700"}`}>
           <CheckCircle2 size={24}/>
           <span>Cobertura: {Math.round((totalPlanned / totalOfficial) * 100)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         <div className="lg:col-span-2 space-y-6">
            <div className="card-solemn p-6">
               <h3 className="font-bold text-slate-900 mb-4">Distribución Curricular</h3>
               <div className="overflow-x-auto">
                  <table className="table w-full">
                     <thead>
                        <tr className="bg-slate-50 text-slate-500 uppercase text-xs">
                           <th>Unidad de Estudio</th>
                           <th className="text-center">Requisito MEP</th>
                           <th className="text-center">Planificado</th>
                           <th>Estado</th>
                        </tr>
                     </thead>
                     <tbody>
                        {units.map(u => (
                           <tr key={u.id}>
                              <td className="font-bold text-slate-700">{u.name}</td>
                              <td className="text-center font-mono text-slate-400">{u.officialHours}h</td>
                              <td className="text-center">
                                 <input 
                                   type="number" 
                                   className="input input-sm input-bordered w-20 text-center font-bold text-blue-600"
                                   value={u.plannedHours}
                                   onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      setUnits(units.map(unit => unit.id === u.id ? {...unit, plannedHours: val} : unit));
                                   }}
                                 />
                              </td>
                              <td>
                                 {u.plannedHours === u.officialHours ? (
                                    <span className="badge badge-success badge-sm gap-1 text-white"><CheckCircle2 size={10}/> Completo</span>
                                 ) : u.plannedHours < u.officialHours ? (
                                    <span className="badge badge-warning badge-sm">Faltan Horas</span>
                                 ) : (
                                    <span className="badge badge-neutral badge-sm">Excede</span>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                     <tfoot>
                        <tr className="font-bold text-slate-900 bg-slate-50">
                           <td>TOTAL ANUAL</td>
                           <td className="text-center">{totalOfficial}h</td>
                           <td className="text-center text-blue-700">{totalPlanned}h</td>
                           <td></td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
            </div>

            <div className="flex justify-end">
               <button onClick={handleSave} className="btn btn-institutional w-full md:w-auto">
                  Guardar Plan Oficial
               </button>
            </div>
         </div>

         {/* ANÁLISIS DE INTENSIDAD (LA REALIDAD) */}
         <div className="space-y-6">
            <div className="card-solemn p-6 bg-slate-900 text-white border-none">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-400"/> Realidad 2026
               </h3>
               
               <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Horas Programa:</span>
                     <span className="font-bold">{totalOfficial} h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Horas Calendario (aprox):</span>
                     <span className="font-bold text-yellow-400">{physicalAvailability} h</span>
                  </div>
                  
                  <div className="divider divider-primary opacity-20 my-2"></div>
                  
                  <div>
                     <span className="text-xs uppercase font-bold text-slate-500">Nivel de Intensidad Requerido</span>
                     <div className="flex items-end gap-2 mt-1">
                        <span className="text-3xl font-black text-white">{Math.round(intensity)}%</span>
                        <span className="text-xs text-slate-400 mb-1">de ritmo normal</span>
                     </div>
                     <progress className={`progress w-full mt-2 ${intensity > 100 ? "progress-warning" : "progress-success"}`} value={intensity} max="120"></progress>
                  </div>

                  <div className="bg-white/10 p-3 rounded-lg text-xs leading-relaxed mt-4">
                     <strong>Nota Técnica:</strong> Debido a la capacitación de febrero, el ritmo de clase debe acelerarse un <strong>{Math.round(intensity - 100)}%</strong> para cubrir el 100% de contenidos sin recortar el programa.
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}