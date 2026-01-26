'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Users, CheckSquare, FileText, HeartPulse, BrainCircuit, Database, Activity, ShieldAlert, Award, Flame, Sun, Moon } from 'lucide-react';
import { getDatabaseStats } from '@/app/actions/admin';
import { toast } from 'sonner';



export default function DashboardContent({ initialPlans, userRole, userName }) {
    // Admin State & Context State
    const [adminStats, setAdminStats] = useState<any>(null);
    const [contexto, setContexto] = useState('DIURNA'); // DIURNA | NOCTURNA

    const handleAdminAudit = async () => {
        const loadingToast = toast.loading("Ejecutando Auditoría Sentinel...");
        try {
            const dbStats = await getDatabaseStats();
            setAdminStats(dbStats);
            toast.dismiss(loadingToast);
            toast.success("Auditoría completada. DB conectada.");
        } catch (e) {
            toast.error("Error en auditoría.");
            toast.dismiss(loadingToast);
        }
    };

    const toggleContext = () => {
        const nuevo = contexto === 'DIURNA' ? 'NOCTURNA' : 'DIURNA';
        setContexto(nuevo);
        toast(nuevo === 'DIURNA' ? '☀️ Modo Diurno Activo' : '🌙 Modo Nocturno (Técnico) Activo');
    };

    return (
        <div className="p-8 space-y-8 animate-fade-in max-w-7xl mx-auto">
            {/* Header & Gamification Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                        ¡Hola, {userName}!
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="badge badge-primary">{userRole}</span>
                        <span className={`badge ${contexto === 'DIURNA' ? 'badge-warning' : 'badge-neutral'}`}>
                            {contexto === 'DIURNA' ? '☀️ Académica' : '🌙 Técnica/Nocturna'}
                        </span>
                    </div>
                </div>

                {/* Streak Widget */}
                <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Racha Semanal</p>
                        <div className="flex items-center gap-1 text-orange-500 font-bold text-xl">
                            <Flame fill="currentColor" size={24} />
                            <span>12 Días</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-200"></div>
                    <div className="text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Nivel XP</p>
                        <div className="flex items-center gap-1 text-indigo-600 font-bold text-xl">
                            <Award size={24} />
                            <span>Lvl. 5</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-200"></div>
                    <button onClick={toggleContext} className="btn btn-circle btn-ghost btn-sm tooltip tooltip-bottom" data-tip="Cambiar Contexto Laboral">
                        {contexto === 'DIURNA' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>

            {/* SUPER ADMIN ZONE (V49 GOD MODE) */}
            {userRole === 'SUPER_ADMIN' && (
                <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldAlert className="text-red-500" size={28} />
                        <h3 className="text-xl font-bold">NÚCLEO SENTINEL (MODO DIOS)</h3>
                        <Link href="/dashboard/admin" className="ml-auto btn btn-xs btn-outline btn-error">
                            Ir a Panel Avanzado →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={handleAdminAudit} className="btn bg-slate-800 border-slate-700 hover:bg-slate-700 text-white gap-2">
                            <Database size={18} /> Auditoría DB
                        </button>
                        <button className="btn bg-slate-800 border-slate-700 hover:bg-slate-700 text-white gap-2">
                            <Users size={18} /> Usuarios ({adminStats?.users ?? '?'})
                        </button>
                    </div>

                    {adminStats && (
                        <div className="mt-4 p-4 bg-slate-800/50 rounded-lg font-mono text-sm text-green-400">
                            <p>DB Status: {adminStats.dbStatus}</p>
                            <p>Version: {adminStats.version}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Panel Principal */}
                <div className="md:col-span-2 space-y-6">
                    <div className="card bg-base-100 shadow-xl p-6 border-t-4 border-indigo-500">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="card-title text-xl">
                                <FileText className="text-indigo-500" />
                                {contexto === 'DIURNA' ? 'Mis Planes (Diurno)' : 'Mis Planes (Nocturno/Técnico)'}
                            </h2>
                            <Link href="/dashboard/generator">
                                <button className="btn btn-primary gap-2">
                                    <Sparkles size={16} /> Nuevo Planeamiento
                                </button>
                            </Link>
                        </div>

                        {initialPlans.length > 0 ? (
                            <div className="grid gap-3">
                                {initialPlans.map((plan) => (
                                    <div key={plan.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors flex justify-between items-center group">
                                        <div>
                                            <h4 className="font-semibold text-slate-800">{plan.asignatura || 'Sin Título'}</h4>
                                            <p className="text-sm text-slate-500">{plan.nivel} • {plan.modalidad || 'Académica'}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="badge badge-ghost opacity-0 group-hover:opacity-100 transition-opacity">v3.0</span>
                                            <button className="btn btn-sm btn-ghost">Editar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <BrainCircuit className="mx-auto text-slate-300 mb-2" size={48} />
                                <p className="text-slate-500">No hay planes en este contexto.</p>
                                <Link href="/dashboard/generator" className="text-indigo-600 hover:underline text-sm font-medium">
                                    ¡Crea el primero con IA!
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panel Lateral de Gamificación */}
                <div className="space-y-6">
                    <div className="card bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Award size={120} />
                        </div>
                        <h2 className="font-bold relative z-10 text-lg flex items-center gap-2">
                            <Sparkles size={18} /> Misión Diaria
                        </h2>
                        <p className="text-indigo-100 mt-2 relative z-10 text-sm">
                            Genera 1 planeamiento de Ciencias para desbloquear la insignia "Científico Loco".
                        </p>
                        <div className="mt-4 relative z-10">
                            <div className="w-full bg-indigo-900/50 rounded-full h-2 mb-1">
                                <div className="bg-white h-2 rounded-full w-2/3"></div>
                            </div>
                            <p className="text-xs text-indigo-200 text-right">2/3 Completado</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl p-6">
                        <h2 className="font-bold mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-green-500" /> Actividad Reciente
                        </h2>
                        <ul className="text-sm space-y-3">
                            <li className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                                <span className="text-slate-600">Quiz de Matemáticas generado.</span>
                            </li>
                            <li className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5"></div>
                                <span className="text-slate-600">Racha de 5 días alcanzada 🔥</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}