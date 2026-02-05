import Link from "next/link";
import { PlusCircle, FileClock, Users, BarChart3, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      
      {/* BIENVENIDA */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-black text-slate-800">Panel de Control</h1>
            <p className="text-slate-500">Bienvenido, Lic. Max Salazar</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
            PLAN ULTRA ACTIVO
        </span>
      </div>

      {/* TARJETAS DE ACCESO RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* TARJETA 1: NUEVO PLAN (LA IMPORTANTE) */}
        <Link href="/dashboard/planning/new" className="group bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <PlusCircle className="w-32 h-32" />
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    <PlusCircle className="w-6 h-6 text-white"/>
                </div>
                <h2 className="text-xl font-bold mb-1">Nuevo Planeamiento</h2>
                <p className="text-blue-100 text-sm mb-4">Generar con IA (Malla Oficial)</p>
                <div className="flex items-center text-xs font-bold bg-white/10 w-fit px-3 py-1 rounded-full">
                    INICIAR <ChevronRight className="w-3 h-3 ml-1"/>
                </div>
            </div>
        </Link>

        {/* TARJETA 2: HISTORIAL */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-blue-200 transition-colors group cursor-pointer opacity-75 hover:opacity-100">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <FileClock className="w-6 h-6 text-purple-600"/>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Mis Planeamientos</h2>
            <p className="text-slate-400 text-sm">Ver historial de documentos</p>
        </div>

        {/* TARJETA 3: ESTUDIANTES */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-blue-200 transition-colors group cursor-pointer opacity-75 hover:opacity-100">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <Users className="w-6 h-6 text-emerald-600"/>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Mis Grupos</h2>
            <p className="text-slate-400 text-sm">Gestión de estudiantes y notas</p>
        </div>
      </div>

      {/* SECCIÓN DE ACTIVIDAD RECIENTE (Simulada para visual) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    DS
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-700 text-sm">Desarrollo de Software - Décimo</h4>
                    <p className="text-xs text-slate-400">Unidad: Tecnologías de Información • Hace 2 horas</p>
                </div>
                <span className="badge badge-sm badge-success">Completado</span>
            </div>
        </div>
      </div>
    </div>
  );
}