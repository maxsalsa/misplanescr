"use client";
import Link from 'next/link';
import { useSaaS } from '@/context/saas-context';
import { getMockData } from '@/services/mock-data';
import { UserCheck, MessageCircle, AlertCircle, FileText } from 'lucide-react';

export default function ParentDashboard() {
    const { userProfile } = useSaaS();
    const data = getMockData('parent');

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Familia {data.name.split(' ')[2] || 'Rodríguez'}</h2>
                    <p className="text-slate-500">Monitoreando a: <span className="font-bold text-indigo-700">{data.children[0]}</span></p>
                </div>
                <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={data.avatar} alt="Profile" />
                    </div>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body flex flex-row items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <UserCheck />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-700">Asistencia</h3>
                            <p className="text-2xl font-black text-slate-900">98%</p>
                            <p className="text-xs text-slate-500">Presente todo el mes</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body flex flex-row items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <FileText />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-700">Promedio General</h3>
                            <p className="text-2xl font-black text-slate-900">92</p>
                            <p className="text-xs text-slate-500">↑ 2 puntos vs mes anterior</p>
                        </div>
                    </div>
                </div>

                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body flex flex-row items-center gap-4">
                        <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                            <AlertCircle />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-700">Observaciones</h3>
                            <p className="text-2xl font-black text-slate-900">0</p>
                            <p className="text-xs text-slate-500">Sin reportes de conducta</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Communication */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-4">Comunicaciones Recientes</h3>
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 h-fit">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">Reunión de Padres - Entrega de Notas</h4>
                                    <p className="text-slate-500 text-xs mt-1">Enviado por: Dirección Administrativa</p>
                                    <p className="text-slate-400 text-[10px] mt-1">Hace 2 días</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-4">Próximos Eventos</h3>
                    <ul className="steps steps-vertical w-full">
                        <li className="step step-primary">Feria Científica (20 Mar)</li>
                        <li className="step step-primary">Exámenes Parciales (15 Abr)</li>
                        <li className="step">Vacaciones Medio Periodo (Jun)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
