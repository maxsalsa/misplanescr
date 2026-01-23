"use client";
import React, { useState } from 'react';
import { useGroups } from '@/context/groups-context';
import { Sparkles, ClipboardList, Plus, Calendar, CheckSquare } from 'lucide-react';

export default function TasksPage() {
    const { groups } = useGroups();
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Investigación: Funciones Lineales', group: '10-1 (Desarrollo Web)', status: 'active', due: '2024-03-25', progress: 15 },
        { id: 2, title: 'Laboratorio: Ensamble de PC', group: '11-2 (Soporte TI)', status: 'pending', due: '2024-03-30', progress: 0 }
    ]);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // AI SIMULATION (Since we don't have a backend route for just rubrics yet)
    const handleAiGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const newTask = {
                id: Date.now(),
                title: aiPrompt || "Nueva Tarea Generada por IA",
                group: groups[0]?.name || "Sin Grupo",
                status: 'active',
                due: new Date().toISOString().split('T')[0],
                progress: 0,
                isAiGenerated: true
            };
            setTasks([...tasks, newTask]);
            setIsGenerating(false);
            setIsWizardOpen(false);
            setWizardStep(1);
            setAiPrompt('');
        }, 2000);
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Tareas y Evaluaciones</h2>
                    <p className="text-slate-500">Gestiona entregas y asignaciones para tus grupos.</p>
                </div>
                <button
                    onClick={() => setIsWizardOpen(true)}
                    className="btn btn-primary shadow-lg shadow-indigo-500/30 gap-2"
                >
                    <Sparkles size={16} className="text-yellow-300" /> Nueva Tarea con IA
                </button>
            </div>

            {/* AI WIZARD MODAL */}
            {isWizardOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden">
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Sparkles className="text-purple-600" />
                            {isGenerating ? 'Generando Rúbrica Intelegente...' : 'Asistente de Evaluación IA'}
                        </h3>

                        {!isGenerating ? (
                            <>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="label font-bold text-slate-600">¿Qué deben hacer los estudiantes?</label>
                                        <textarea
                                            className="textarea textarea-bordered w-full h-24"
                                            placeholder="Ej: Un ensayo sobre la independencia de Costa Rica de 500 palabras, enfocándose en causas y consecuencias."
                                            value={aiPrompt}
                                            onChange={e => setAiPrompt(e.target.value)}
                                        ></textarea>
                                        <p className="text-xs text-slate-400 mt-2">
                                            La IA generará automáticamente: instrucciones paso a paso, rúbrica de evaluación (1-5 pts) y lista de cotejo para el MEP.
                                        </p>
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-bold text-slate-600">Asignar a Grupo</label>
                                        <select className="select select-bordered w-full">
                                            {groups.map(g => <option key={g.id}>{g.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setIsWizardOpen(false)} className="btn btn-ghost">Cancelar</button>
                                    <button
                                        onClick={handleAiGenerate}
                                        disabled={!aiPrompt}
                                        className="btn btn-primary px-8"
                                    >
                                        🔮 Generar Tarea
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="py-10 text-center space-y-4">
                                <span className="loading loading-infinity loading-lg text-purple-600"></span>
                                <p className="text-slate-500 animate-pulse">Consultando reglamento de evaluación...</p>
                                <p className="text-slate-500 animate-pulse delay-75">Diseñando indicadores de desempeño...</p>
                                <p className="text-slate-500 animate-pulse delay-150">Formateando documento oficial...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
                {/* Kanban Column: Pendientes */}
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span> Borradores & Ideas
                    </h3>
                    {tasks.filter(t => t.status === 'pending').map(task => (
                        <div key={task.id} className="card bg-white border border-slate-200 p-4 space-y-3 cursor-pointer hover:border-indigo-300 hover:shadow-md transition group">
                            <div className="badge badge-ghost text-xs">{task.group}</div>
                            <h4 className="font-bold text-slate-700 group-hover:text-indigo-600 transition">{task.title}</h4>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>{task.isAiGenerated ? '✨ Generado por IA' : 'Manual'}</span>
                                <button className="btn btn-xs btn-outline">Editar</button>
                            </div>
                        </div>
                    ))}
                    {tasks.filter(t => t.status === 'pending').length === 0 && (
                        <div className="text-center py-8 text-slate-300 text-sm border-2 border-dashed border-slate-100 rounded-xl">Sin borradores</div>
                    )}
                </div>

                {/* Kanban Column: Activas */}
                <div className="space-y-4">
                    <h3 className="font-bold text-indigo-500 uppercase text-xs tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Asignadas (En curso)
                    </h3>
                    {tasks.filter(t => t.status === 'active').map(task => (
                        <div key={task.id} className="card bg-white shadow-sm border-l-4 border-indigo-500 p-4 space-y-3 hover:shadow-md transition">
                            <div className="flex justify-between">
                                <div className="badge badge-primary badge-outline text-xs">{task.group}</div>
                                <span className="text-xs font-bold text-indigo-600">Vence: {task.due}</span>
                            </div>
                            <h4 className="font-bold text-slate-800">{task.title}</h4>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-500">
                                <span>Progreso de entregas: {task.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Kanban Column: Finalizadas */}
                <div className="space-y-4">
                    <h3 className="font-bold text-emerald-500 uppercase text-xs tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Calificadas
                    </h3>
                    <div className="card bg-slate-50 border border-slate-200 p-4 opacity-75 hover:opacity-100 transition">
                        <div className="flex justify-between">
                            <div className="badge badge-ghost text-xs">10-1</div>
                            <span className="text-xs font-bold text-emerald-600">Completo</span>
                        </div>
                        <h4 className="font-bold text-slate-600 strike-through">Quiz #1: Geometría</h4>
                        <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                            <span>Promedio: 85.5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
