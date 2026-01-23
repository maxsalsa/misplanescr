"use client";
import React from "react";
import { BookOpen, Calendar, Settings, User, LogOut, PlusCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">AutoPlanea Ultra</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-xl text-white font-medium cursor-pointer">
            <BookOpen size={20} /> Mis Planeamientos
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer">
            <Calendar size={20} /> Calendario Escolar
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer">
            <FileText size={20} /> Reportes MEP
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition">
            <LogOut size={20} /> Salir
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
            <p className="text-slate-500">Bienvenido, Profesor Max.</p>
          </div>
          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
            PM
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-slate-400 text-sm font-medium uppercase">Planes Activos</h3>
            <p className="text-4xl font-black text-slate-800 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-slate-400 text-sm font-medium uppercase">Próximo Examen</h3>
            <p className="text-xl font-bold text-slate-800 mt-2">Matemáticas 8-2</p>
            <p className="text-sm text-indigo-600">En 3 días</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-slate-400 text-sm font-medium uppercase">Estado</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-lg font-bold text-slate-800">Sincronizado</p>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-xl shadow-indigo-500/20">
          <div>
            <h2 className="text-2xl font-bold mb-2">Generar Nuevo Planeamiento</h2>
            <p className="text-indigo-100 max-w-md">La IA analizará el programa de estudio y creará las actividades automáticamente.</p>
          </div>
          <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center gap-2 shadow-lg">
            <PlusCircle size={20} />
            Crear Ahora
          </button>
        </div>
      </main>
    </div>
  );
}
