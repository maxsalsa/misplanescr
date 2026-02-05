"use client";
import { useSearchParams } from "next/navigation";
import { 
  User, TrendingUp, Download, Calendar, 
  CheckCircle, AlertCircle, FileText, Star 
} from "lucide-react";

export default function StudentDashboard() {
  const searchParams = useSearchParams();
  const pin = searchParams.get("pin") || "INVITADO";

  // DATOS SIMULADOS (Esto vendría de la DB usando el PIN)
  const estudiante = {
    nombre: "Valentina Calvo",
    grupo: "10-1",
    asistencia: "95%",
    nivel: "Avanzado",
    recursos: [
        { id: 1, titulo: "Guía de Estudio: Lógica de Programación", tipo: "RESUMEN", fecha: "Hoy" },
        { id: 2, titulo: "Infografía: Normas de Seguridad", tipo: "IMAGEN", fecha: "Ayer" },
        { id: 3, titulo: "Tarea Corta #3: Diagramas", tipo: "TAREA", fecha: "12 Feb" }
    ],
    indicadores: [
        { tema: "Algoritmos", estado: 3 }, // 3=Verde
        { tema: "Estructuras If/Else", estado: 2 }, // 2=Amarillo
        { tema: "Diagramas de Flujo", estado: 3 }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* HEADER MOVIL AMIGABLE */}
      <div className="bg-blue-600 text-white p-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex justify-between items-start">
                <div>
                    <span className="bg-blue-500 text-blue-100 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Estudiante Activo</span>
                    <h1 className="text-2xl font-bold mt-2">{estudiante.nombre}</h1>
                    <p className="text-blue-100 text-sm flex items-center gap-1">
                        <User size={14}/> Sección {estudiante.grupo}
                    </p>
                </div>
                <div className="text-center bg-white/20 backdrop-blur-md rounded-xl p-2">
                    <p className="text-xs font-bold text-blue-100">Asistencia</p>
                    <p className="text-xl font-bold">{estudiante.asistencia}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6 -mt-4">
        
        {/* 1. SEMÁFORO DE INDICADORES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-500"/> Mi Progreso (Indicadores)
            </h2>
            <div className="space-y-3">
                {estudiante.indicadores.map((ind, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-600">{ind.tema}</span>
                        <div className="flex gap-1">
                            {/* Visualización de Nivel 1, 2, 3 */}
                            {[1,2,3].map(n => (
                                <div key={n} className={`w-3 h-3 rounded-full ${n <= ind.estado 
                                    ? (ind.estado===3 ? "bg-green-500" : "bg-yellow-400") 
                                    : "bg-slate-200"}`}>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-800 flex gap-2 items-start">
                <Star size={16} className="shrink-0"/>
                <p><strong>Recomendación del Docente:</strong> ¡Excelente trabajo en lógica! Reforzar un poco las estructuras condicionales el fin de semana.</p>
            </div>
        </div>

        {/* 2. MOCHILA DIGITAL (RECURSOS) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h2 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Download className="text-blue-600"/> Mochila de Recursos
            </h2>
            <div className="space-y-3">
                {estudiante.recursos.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${rec.tipo==="TAREA"?"bg-orange-100 text-orange-600":"bg-indigo-100 text-indigo-600"}`}>
                                <FileText size={20}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-700 group-hover:text-blue-700">{rec.titulo}</h4>
                                <p className="text-xs text-slate-400">{rec.tipo} • Publicado: {rec.fecha}</p>
                            </div>
                        </div>
                        <Download size={18} className="text-slate-300 group-hover:text-blue-600"/>
                    </div>
                ))}
            </div>
        </div>

        {/* 3. AVISOS DISCIPLINARIOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h2 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                <AlertCircle className="text-orange-500"/> Reportes de Conducta
            </h2>
            <div className="text-center py-4">
                <CheckCircle size={40} className="text-green-200 mx-auto mb-2"/>
                <p className="text-sm font-bold text-slate-600">¡Sin reportes nuevos!</p>
                <p className="text-xs text-slate-400">Excelente comportamiento esta semana.</p>
            </div>
        </div>

      </div>
    </div>
  );
}