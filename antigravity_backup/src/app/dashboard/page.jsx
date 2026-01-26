"use client";
import Link from 'next/link';
import { Users, ShieldAlert, UploadCloud, FileText, Activity } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="p-8 text-white max-w-7xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-black uppercase tracking-tight text-[var(--color-primary-400)]">
                    Centro de Comando <span className="text-white">Antigravity</span>
                </h1>
                <p className="text-slate-400 font-bold opacity-60">
                    Bienvenido, Profesor. Su sesión está blindada y activa.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* 1. GRUPOS & ASISTENCIA */}
                <Link href="/dashboard/grupos" className="bg-[#162534] p-6 rounded-3xl border border-white/5 hover:border-[var(--color-primary)] transition-all group hover:-translate-y-1 shadow-2xl">
                    <div className="bg-[var(--color-primary)] w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Users className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Mis Grupos</h3>
                    <p className="text-xs text-slate-400">Asistencia, Listas y Perfiles.</p>
                </Link>

                {/* 2. VIDA ESTUDIANTIL (BOTÓN ROJO) */}
                <Link href="/dashboard/life" className="bg-[#162534] p-6 rounded-3xl border border-white/5 hover:border-red-500 transition-all group hover:-translate-y-1 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-500 blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <ShieldAlert className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Conducta y Seguridad</h3>
                    <p className="text-xs text-slate-400">Reporte de Incidentes y Protocolos.</p>
                </Link>

                {/* 3. EVIDENCIAS ESTUDIANTILES */}
                <Link href="/dashboard/control" className="bg-[#162534] p-6 rounded-3xl border border-white/5 hover:border-green-500 transition-all group hover:-translate-y-1 shadow-2xl">
                    <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <UploadCloud className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Evidencias</h3>
                    <p className="text-xs text-slate-400">Revisión de Portafolios y Juegos.</p>
                </Link>

                {/* 4. PLANEAMIENTO & EVALUACIÓN */}
                <Link href="/dashboard/generator" className="bg-[#162534] p-6 rounded-3xl border border-white/5 hover:border-yellow-500 transition-all group hover:-translate-y-1 shadow-2xl">
                    <div className="bg-yellow-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <FileText className="text-black" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Planeamiento</h3>
                    <p className="text-xs text-slate-400">Generación IA y Rúbricas.</p>
                </Link>
            </div>

            {/* QUICK STATS */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex items-center gap-4">
                    <Activity className="text-green-400" size={32} />
                    <div>
                        <h4 className="font-black text-2xl">98%</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase">Estado de la Plataforma (Neon DB)</p>
                    </div>
                </div>
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex items-center gap-4">
                    <Users className="text-blue-400" size={32} />
                    <div>
                        <h4 className="font-black text-2xl">10-1</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase">Grupo Activo Actual</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
