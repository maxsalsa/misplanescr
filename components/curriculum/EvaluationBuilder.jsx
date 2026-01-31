"use client";
import React from 'react';
import CodeMockup from '@/components/ui/CodeMockup';
import RoleplayCard from './RoleplayCard';
import LabSimulation from './LabSimulation';
import DataGraph from './DataGraph';
import { Code, Users, Calculator, Brain, CheckCircle, AlertTriangle, Upload, Github } from 'lucide-react';

export default function EvaluationBuilder({ curriculumModule }) {
    if (!curriculumModule) return null;

    const { uiRenderer, specialty, level, learningOutcomes } = curriculumModule;
    // learningOutcomes is stored as JSON in DB, Prisma returns it as object/array directly.

    const renderHeader = () => {
        let icon = <Brain className="text-slate-500" />;
        let color = "bg-slate-100 text-slate-700";

        if (uiRenderer === "HARD_TECH") {
            icon = <Code className="text-emerald-400" />;
            color = "bg-slate-900 text-emerald-400 border-emerald-900";
        } else if (uiRenderer === "SOFT_SKILLS") {
            icon = <Users className="text-pink-500" />;
            color = "bg-pink-50 text-pink-700 border-pink-200";
        } else if (uiRenderer === "FINANCE_GRID") {
            icon = <Calculator className="text-blue-500" />;
            color = "bg-blue-50 text-blue-700 border-blue-200";
        }

        return (
            <div className={`p-4 rounded-t-xl border-b ${color} flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    {icon}
                    <div>
                        <h3 className="font-bold text-lg">{specialty} <span className="text-sm opacity-70">({level})</span></h3>
                        <div className="text-xs uppercase tracking-widest font-mono opacity-60">
                            Metadatos: {uiRenderer}
                        </div>
                    </div>
                </div>
                <div className="badge badge-outline bg-white/10 font-mono text-xs">
                    ADN Verificado
                </div>
            </div>
        );
    };

    const renderDynamicEvaluation = (lo) => {
        // Render different sub-components based on family
        if (uiRenderer === "HARD_TECH") {
            const codeTemplate = `-- Script de Evidencia para: ${lo.lo_text}\n-- Estudiante: [Nombre]\n\nCREATE DATABASE secure_app;\nUSE secure_app;\n\n-- TODO: Implementar tablas con 3FN (Normalización)\n-- Recuerda usar constraints de integridad\n\n`;

            return (
                <div className="mt-4 space-y-3">
                    <div className="relative">
                        <div className="absolute top-0 right-0 z-10 p-2">
                            <span className="badge badge-accent badge-outline text-[10px] font-mono">LABORATORIO 3.0</span>
                        </div>
                        <CodeMockup
                            title="Entorno SQL Seguro"
                            language="sql"
                            code={codeTemplate}
                        />
                    </div>

                    {/* Evidence Upload Area */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                                <Code size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-700 text-sm">Entrega de Código Fuente</h5>
                                <p className="text-xs text-slate-500">{lo.evaluation_component?.evidence_description || "Script ejecutable o Repositorio"}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-sm btn-ghost gap-2 border-slate-200 bg-white">
                                <Github size={14} /> Link GitHub
                            </button>
                            <button className="btn btn-sm btn-primary gap-2 shadow-sm">
                                <Upload size={14} /> Subir .sql
                            </button>
                        </div>
                    </div>

                    <div className="px-4 py-2 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-100 flex items-start gap-2">
                        <AlertTriangle size={14} className="mt-0.5" />
                        <span>
                            <b>Firewall Normativo:</b> Se detectó contenido de &quot;Ciberseguridad&quot;.
                            No cargue credenciales reales en el código.
                        </span>
                    </div>
                </div>
            );
        }


        if (uiRenderer === "SOFT_SKILLS") {
            return (
                <div className="mt-4">
                    <RoleplayCard
                        scenario={lo.evaluation_component?.description || lo.dua_strategy || "Realizar simulación de la situación planteada."}
                        characterA="Cliente/Usuario"
                        characterB="Estudiante"
                    />

                    <div className="mt-4 bg-white p-4 rounded-lg border border-slate-200">
                        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-500" /> Criterios de Evaluación (Lista de Cotejo)
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {lo.indicators?.map((ind, i) => (
                                <li key={i} className="flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-xs checkbox-secondary" disabled />
                                    <span>{ind}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }


        // Default / Academic
        if (uiRenderer === "ACADEMIC" || !uiRenderer) {
            return (
                <div className="mt-4 p-4 rounded-lg bg-indigo-50 text-indigo-900 text-sm border border-indigo-100">
                    <p className="mb-4"><b>Resultado de Aprendizaje:</b> {lo.lo_text}</p>
                    {/* Mock Logic for Academic */}
                    {lo.lo_text?.includes("Exo") || lo.lo_text?.includes("Quím") || lo.specialty?.includes("Cienc") ? (
                        <LabSimulation title="Reacción Química Virtual" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Análisis de Datos</h5>
                                <DataGraph />
                            </div>
                            <div className="bg-white p-4 rounded shadow-sm flex flex-col justify-center">
                                <h5 className="font-bold text-slate-700 mb-2">Informe Científico</h5>
                                <p className="text-xs text-slate-500 mb-3">Se requiere estructura IMRyD (Introducción, Métodos, Resultados y Discusión).</p>
                                <button className="btn btn-xs btn-outline">Ver Rúbrica de Informe</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="card bg-white shadow-xl border border-slate-200 overflow-hidden mb-6 animate-in slide-in-from-bottom duration-500">
            {renderHeader()}
            <div className="p-6">
                <h4 className="text-xl font-black text-slate-800 mb-1">{curriculumModule.unit_title}</h4>
                <div className="divider my-2"></div>

                {learningOutcomes && Array.isArray(learningOutcomes) ? (
                    learningOutcomes.map((lo, idx) => (
                        <div key={idx} className="mb-8 last:mb-0">
                            <div className="flex items-start gap-4">
                                <div className="bg-slate-100 text-slate-500 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                                    {idx + 1}
                                </div>
                                <div className="w-full">
                                    <p className="font-semibold text-slate-700">{lo.lo_text}</p>
                                    {renderDynamicEvaluation(lo)}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-warning">
                        <AlertTriangle size={16} /> JSON de Aprendizaje no válido.
                    </div>
                )}
            </div>
        </div>
    );
}
