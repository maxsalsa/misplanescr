"use client";
import { Users, Plus, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function GroupsPage() {
  // Datos simulados (Se conectarán a DB en V26)
  const sections = [
    { id: "10-1", level: "Décimo", count: 28, guide: true },
    { id: "11-2", level: "Undécimo", count: 24, guide: false },
    { id: "7-3",  level: "Sétimo", count: 30, guide: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
         <div>
           <h1 className="text-2xl font-black text-slate-900">Mis Secciones</h1>
           <p className="text-slate-500">Gestión de matrícula y expedientes.</p>
         </div>
         <button className="btn btn-institutional gap-2"><Plus size={16}/> Crear Sección</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {sections.map((s) => (
           <div key={s.id} className="card-solemn p-6 group cursor-pointer hover:border-blue-400">
              <div className="flex justify-between items-start mb-4">
                 <div className="bg-slate-100 p-3 rounded-xl font-black text-xl text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {s.id}
                 </div>
                 {s.guide && <span className="badge badge-primary badge-outline text-xs">Prof. Guía</span>}
              </div>
              <div className="space-y-1">
                 <p className="font-bold text-slate-800">{s.level}</p>
                 <p className="text-sm text-slate-400 flex items-center gap-2"><Users size={14}/> {s.count} Estudiantes</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                 <Link href={`/dashboard/classroom/${s.id}`} className="btn btn-sm btn-ghost w-full justify-between hover:bg-slate-50">
                    Ir al Cuaderno <ArrowRight size={14}/>
                 </Link>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}