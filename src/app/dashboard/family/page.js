"use client";

import { useAuth } from '@/context/auth-context';
import {
    LineChart,
    UserCheck,
    AlertTriangle,
    MessageCircle,
    Calendar,
    CheckCircle2
} from 'lucide-react';

export default function FamilyDashboard() {
    const { user } = useAuth();

    // MOCK DATA LINKED TO TEACHER DASHBOARD LOGIC
    // In a real app, this would fetch the specific student's data
    const conductScore = 85;
    const tickets = [
        { id: 1, type: 'Leve', points: 10, description: 'Uso de celular en clase sin permiso.', date: '2026-02-15' },
        { id: 2, type: 'Muy Leve', points: 5, description: 'Llegada tardía injustificada.', date: '2026-03-01' }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                        👶
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Panel de Familia</h1>
                        <p className="text-slate-500">
                            Bienvenido, <span className="font-bold text-indigo-600">Familia Pérez</span>.
                            Aquí pueden ver el progreso de <span className="font-bold text-slate-700">Juanito</span> en tiempo real.
                            <span className="inline-block ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">🟢 Al día</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Asistencia Visual (Mini Chart) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <UserCheck className="text-blue-500" /> Asistencia y Puntualidad
                        </h3>
                        <span className="badge badge-success text-white font-bold">98% Total</span>
                    </div>

                    {/* Visual Bar Graph */}
                    <div className="flex h-4 w-full rounded-full overflow-hidden bg-slate-100 mb-4">
                        <div className="h-full bg-emerald-500" style={{ width: '92%' }} title="Presente (92%)"></div>
                        <div className="h-full bg-amber-400" style={{ width: '6%' }} title="Tardías (6%)"></div>
                        <div className="h-full bg-red-400" style={{ width: '2%' }} title="Ausencias (2%)"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <span className="block font-bold text-emerald-700 text-lg">45</span>
                            <span className="text-emerald-600">Presente</span>
                        </div>
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <span className="block font-bold text-amber-700 text-lg">3</span>
                            <span className="text-amber-600">Tardías</span>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg">
                            <span className="block font-bold text-red-700 text-lg">1</span>
                            <span className="text-red-600">Ausencias</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                        <span className="font-bold text-indigo-500">Nota:</span> Su asistencia es excelente. ¡Sigan así!
                    </p>
                </div>

                {/* Avance Académico (Graph Style) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <LineChart className="text-indigo-500" /> Rendimiento Actual
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {/* Subject 1 */}
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                        Matemáticas
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-indigo-600">
                                        85/100
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                                <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-1000 ease-out"></div>
                            </div>
                        </div>

                        {/* Subject 2 */}
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                                        Ciencias
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-emerald-600">
                                        92/100
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
                                <div style={{ width: "92%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000 ease-out"></div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 text-center">
                            Promedio General: <span className="font-bold text-slate-700">88.5</span> (Supera la media del grupo)
                        </p>
                    </div>
                </div>

                {/* Boletas / Conducta (UPDATED FOR TRANSPARENCY) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <AlertTriangle className="text-amber-500" /> Reporte de Conducta
                        </h3>
                        <div className={`badge ${conductScore >= 80 ? 'badge-success text-white' : 'badge-warning'} font-bold`}>
                            Nota: {conductScore}/100
                        </div>
                    </div>

                    <div className="space-y-3 relative z-10 max-h-48 overflow-y-auto">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Boletas Digitales Registradas</p>

                        {tickets.length > 0 ? (
                            tickets.map(ticket => (
                                <div key={ticket.id} className="p-3 bg-slate-50 rounded-lg border-l-4 border-amber-400">
                                    <div className="flex justify-between items-start">
                                        <span className="badge badge-sm badge-warning mb-1">{ticket.type} (-{ticket.points} pts)</span>
                                        <span className="text-[10px] text-slate-400 font-mono">{ticket.date}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">{ticket.description}</p>
                                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                        <CheckCircle2 size={10} className="text-indigo-500" /> Firmado Digitalmente por Docente
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="flex gap-3 items-start p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-emerald-800">Sin boletas registradas</p>
                                    <p className="text-xs text-emerald-600">¡Excelente comportamiento hasta la fecha!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Communication Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-600 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg shadow-indigo-200">
                    <div>
                        <h3 className="font-bold text-lg">Contacto Directo</h3>
                        <p className="text-indigo-100 text-sm">¿Dudas sobre el rendimiento?</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn bg-white/20 hover:bg-white/30 text-white border-none gap-2">
                            <MessageCircle size={18} /> Enviar Mensaje
                        </button>
                        <button className="btn bg-white text-indigo-600 border-none hover:bg-indigo-50 gap-2">
                            <Calendar size={18} /> Solicitar Cita
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
