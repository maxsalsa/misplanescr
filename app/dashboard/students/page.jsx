"use client";
import { useState, useEffect } from "react";
import { Users, Eye, Brain, Zap, FileText } from "lucide-react";

export default function StudentsPage() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos reales (Simulamos fetch a API por brevedad en este script)
  // En producción esto conecta a /api/students
  useEffect(() => {
    // Simulamos retardo de red
    setTimeout(() => {
        // Estos datos coinciden con la semilla que acabamos de cargar
        setGrupos([{
            nombre: "11-2 (Técnico)",
            estudiantes: [
                { id: 1, nombre: "Sebastián Mora", condicion: null, tipo: "Regular" },
                { id: 2, nombre: "Valentina Calvo", condicion: "TDAH", tipo: "Adecuación NS", nota: "Tiempo Extra" },
                { id: 3, nombre: "Andrés Gómez", condicion: "Baja Visión", tipo: "Acceso", nota: "Letra Grande" },
                { id: 4, nombre: "Lucía Vargas", condicion: "Alta Dotación", tipo: "Talento", nota: "Retos Extra" },
                { id: 5, nombre: "Diego Sánchez", condicion: "Cognitiva", tipo: "Adecuación Sig", nota: "Nivel 8vo" },
            ]
        }]);
        setLoading(false);
    }, 800);
  }, []);

  const getBadgeColor = (tipo) => {
    if(tipo.includes("NS")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if(tipo.includes("Sig")) return "bg-red-100 text-red-800 border-red-200";
    if(tipo.includes("Acceso")) return "bg-blue-100 text-blue-800 border-blue-200";
    if(tipo.includes("Talento")) return "bg-purple-100 text-purple-800 border-purple-200";
    return "bg-slate-50 text-slate-500 border-slate-100";
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Users className="text-blue-600"/> Gestión Docente Guía
        </h1>
        <p className="text-slate-500 mb-8">Control de matrícula, expedientes y condiciones particulares.</p>

        {loading ? <div className="text-slate-400">Cargando expedientes...</div> : (
            <div className="space-y-8">
                {grupos.map((grupo, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-slate-700">{grupo.nombre}</h2>
                            <span className="text-sm bg-white px-3 py-1 rounded border text-slate-500">
                                {grupo.estudiantes.length} Estudiantes
                            </span>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Estudiante</th>
                                        <th className="px-6 py-3">Condición (DUA)</th>
                                        <th className="px-6 py-3">Notas de Apoyo</th>
                                        <th className="px-6 py-3 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grupo.estudiantes.map((est) => (
                                        <tr key={est.id} className="border-b hover:bg-slate-50 transition">
                                            <td className="px-6 py-4 font-medium text-slate-800">{est.nombre}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded border text-xs font-bold ${getBadgeColor(est.tipo)}`}>
                                                    {est.tipo}
                                                </span>
                                                {est.condicion && <span className="ml-2 text-xs text-slate-500">({est.condicion})</span>}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 italic">{est.nota || "---"}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Ver Expediente</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}