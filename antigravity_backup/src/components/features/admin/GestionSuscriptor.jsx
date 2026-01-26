"use client"
import React, { useState } from 'react';
import { Users, Calculator, FolderOpen, Crown, Settings } from "lucide-react";

export default function GestionSuscriptor() {
    const [activeTab, setActiveTab] = useState('GRUPOS'); // GRUPOS, NOTAS, CONFIG

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
            <header className="flex justify-between items-center mb-8 bg-slate-900 p-6 rounded-3xl border border-white/5 shadow-2xl">
                <div>
                    <h1 className="text-2xl font-black uppercase text-[var(--color-primary-400)]">Panel de Control: Suscriptor</h1>
                    <p className="text-xs text-slate-400">Licencia Activa: <span className="text-green-400 font-bold">PROFESIONAL 2026</span></p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setActiveTab('GRUPOS')} className={`btn btn-sm ${activeTab === 'GRUPOS' ? 'btn-primary' : 'btn-ghost'}`}>
                        <Users size={16} /> Grupos
                    </button>
                    <button onClick={() => setActiveTab('NOTAS')} className={`btn btn-sm ${activeTab === 'NOTAS' ? 'btn-primary' : 'btn-ghost'}`}>
                        <Calculator size={16} /> Notas
                    </button>
                    <button onClick={() => setActiveTab('EVIDENCIAS')} className={`btn btn-sm ${activeTab === 'EVIDENCIAS' ? 'btn-primary' : 'btn-ghost'}`}>
                        <FolderOpen size={16} /> Evidencias
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                {activeTab === 'GRUPOS' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Group Card */}
                        <div className="card bg-slate-900 border border-slate-800 hover:border-[var(--color-primary)] transition-colors p-6 rounded-3xl group cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users size={64} />
                            </div>
                            <h3 className="text-xl font-bold">10-1 Ciberseguridad</h3>
                            <p className="text-sm text-slate-500 mb-4">24 Estudiantes</p>
                            <div className="flex gap-2 mt-auto">
                                <button className="btn btn-xs btn-outline">Editar Lista</button>
                                <button className="btn btn-xs btn-outline">Asistencia</button>
                            </div>
                        </div>

                        {/* Add Group */}
                        <div className="card border-2 border-dashed border-slate-800 p-6 rounded-3xl flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                            <span className="text-sm font-bold uppercase">+ Crear Nueva Sección</span>
                        </div>
                    </div>
                )}

                {activeTab === 'NOTAS' && (
                    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Calculator size={20} className="text-yellow-400" />
                            Cálculo Automático (Reglamento de Evaluación)
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="table w-full text-sm">
                                <thead>
                                    <tr className="text-slate-400 border-b border-slate-700">
                                        <th>Componente</th>
                                        <th>Porcentaje</th>
                                        <th>Estado</th>
                                        <th>Instrumento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-bold">Trabajo Cotidiano</td>
                                        <td>20%</td>
                                        <td><span className="badge badge-success badge-xs">Activo</span></td>
                                        <td><button className="btn btn-xs btn-link text-blue-400">Ver Rúbrica</button></td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Pruebas (x2)</td>
                                        <td>30%</td>
                                        <td><span className="badge badge-warning badge-xs">Pendiente Config</span></td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Proyecto</td>
                                        <td>10%</td>
                                        <td><span className="badge badge-ghost badge-xs">Inactivo</span></td>
                                        <td><button className="btn btn-xs btn-link text-blue-400">Crear Lista Cotejo</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button className="btn btn-primary gap-2">
                                <Settings size={16} /> Configurar Pesos (Período 1)
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'EVIDENCIAS' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-[#162534] p-6 rounded-3xl border border-white/5">
                            <h3 className="font-bold mb-4 uppercase text-sm">Entregas Recientes</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                                            <span className="text-xs">RM</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Roberto Mendez</p>
                                        <p className="text-xs text-slate-400">10-1 Ciberseguridad • Hace 5 min</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="badge badge-info badge-xs text-xs">Juego</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                                            <span className="text-xs">LP</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Lucía Perez</p>
                                        <p className="text-xs text-slate-400">10-1 Ciberseguridad • Hace 1 hor</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="badge badge-success badge-xs text-xs">Práctica</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-center">
                            <Crown size={48} className="text-yellow-500 mb-4" />
                            <h3 className="text-xl font-black text-yellow-500 mb-2">Portafolio Premium</h3>
                            <p className="text-slate-400 text-sm max-w-xs mb-6">
                                La gestión de evidencias requiere almacenamiento en la nube. Actualice su plan para habilitar 50GB de espacio para sus estudiantes.
                            </p>
                            <button className="btn btn-warning w-full max-w-xs font-bold text-black">Aumentar Capacidad</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
