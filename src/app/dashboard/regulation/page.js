"use client";
import React, { useState } from 'react';
import { useGroups } from '@/context/groups-context';
import { Save, Scale, FileText, Upload, RefreshCw, AlertTriangle } from 'lucide-react';

export default function RegulationPage() {
    const { rules, updateRules } = useGroups();

    // Local state for form editing
    const [weights, setWeights] = useState(rules.weights);
    const [conductPoints, setConductPoints] = useState(rules.conductPoints);
    const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

    const handleSave = () => {
        // Validate total 100%
        const total = Number(weights.cotidiano) + Number(weights.tareas) + Number(weights.pruebas) + Number(weights.proyecto);
        if (total !== 100) {
            alert(`Error: Los porcentajes suman ${total}%. Deben sumar 100%.`);
            return;
        }
        updateRules({ weights, conductPoints });
    };

    const handleFileUpload = () => {
        setIsSimulatingUpload(true);
        setTimeout(() => {
            setIsSimulatingUpload(false);
            // Simulate AI extraction of new rules from a PDF
            alert("IA: He analizado el Reglamento 2026. Se detectaron cambios en los porcentajes de Tareas. Aplicando cambios...");
            setWeights({ cotidiano: 40, tareas: 10, pruebas: 30, proyecto: 20 }); // Example change
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                    <Scale size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Normativa de Evaluación</h1>
                    <p className="text-slate-500">Gestione los porcentajes y reglas de conducta según el REA vigente.</p>
                </div>
            </div>

            {/* AI UPLOAD CARD */}
            <div className="card bg-slate-800 text-white shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-amber-400 flex gap-2">
                        <FileText /> Actualización Inteligente
                    </h2>
                    <p className="text-slate-300">Si el MEP publica un nuevo reglamento (PDF), súbelo aquí. Nuestra IA leerá el documento y ajustará los parámetros automáticamente.</p>

                    <div className="mt-4 border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:bg-slate-700 transition cursor-pointer" onClick={handleFileUpload}>
                        {isSimulatingUpload ? (
                            <div className="flex flex-col items-center gap-2">
                                <RefreshCw className="animate-spin text-amber-400" size={32} />
                                <span className="font-bold text-amber-400">Analizando Documento...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="text-slate-400" size={32} />
                                <span className="font-bold">Haga clic para subir Reglamento (PDF)</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* TWO COLUMNS: ACADEMIC & CONDUCT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* ACADEMIC WEIGHTS */}
                <div className="card bg-white shadow-sm border border-slate-200">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-slate-700">⚖️ Rubros de Calificación</h3>
                            <span className="badge badge-primary badge-outline">Total: {Number(weights.cotidiano) + Number(weights.tareas) + Number(weights.pruebas) + Number(weights.proyecto)}%</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="label text-xs font-bold text-slate-500">TRABAJO COTIDIANO (%)</label>
                                <input type="number" className="input input-bordered w-full" value={weights.cotidiano} onChange={e => setWeights({ ...weights, cotidiano: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label text-xs font-bold text-slate-500">TAREAS (%)</label>
                                <input type="number" className="input input-bordered w-full" value={weights.tareas} onChange={e => setWeights({ ...weights, tareas: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label text-xs font-bold text-slate-500">PRUEBAS (%)</label>
                                <input type="number" className="input input-bordered w-full" value={weights.pruebas} onChange={e => setWeights({ ...weights, pruebas: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label text-xs font-bold text-slate-500">PROYECTO (%)</label>
                                <input type="number" className="input input-bordered w-full" value={weights.proyecto} onChange={e => setWeights({ ...weights, proyecto: Number(e.target.value) })} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONDUCT POINTS */}
                <div className="card bg-white shadow-sm border border-slate-200">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-slate-700">🛡️ Puntos de Conducta</h3>
                            <div className="tooltip" data-tip="Puntos que se rebajan por cada tipo de falta">
                                <AlertTriangle size={18} className="text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="label text-xs font-bold text-slate-500 text-info">FALTA MUY LEVE (Puntos)</label>
                                <input type="number" className="input input-bordered w-full" value={conductPoints.muyLeve} onChange={e => setConductPoints({ ...conductPoints, muyLeve: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label text-xs font-bold text-slate-500 text-warning">FALTA LEVE (Puntos)</label>
                                <input type="number" className="input input-bordered w-full" value={conductPoints.leve} onChange={e => setConductPoints({ ...conductPoints, leve: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label text-xs font-bold text-slate-500 text-error">FALTA GRAVE (Puntos)</label>
                                <input type="number" className="input input-bordered w-full" value={conductPoints.grave} onChange={e => setConductPoints({ ...conductPoints, grave: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label text-xs font-black text-slate-900 bg-red-100 px-1 rounded">FALTA GRAVÍSIMA (Puntos)</label>
                                <input type="number" className="input input-bordered w-full input-error" value={conductPoints.gravisima} onChange={e => setConductPoints({ ...conductPoints, gravisima: Number(e.target.value) })} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-end">
                <button className="btn btn-primary btn-lg gap-2 shadow-xl shadow-indigo-200" onClick={handleSave}>
                    <Save /> Guardar Nueva Normativa
                </button>
            </div>
        </div>
    );
}
