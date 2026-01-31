"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Hammer,
    School,
    GraduationCap,
    Rocket,
    Sparkles,
    History,
    Edit,
    Lock,
    ShieldCheck,
    BookOpen
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// -----------------------------------------------------------------------------
// TYPES (Defining the Shape of the Data)
// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function PlanRenderer({ plan, currentVersion, versions = [], onUpdate, readOnly = false }) {
    if (!plan) return <div className="p-12 text-center text-slate-300">Cargando Estructura Curricular...</div>;

    // Data Resolution strategy (V33 Inmutable)
    const activeData = currentVersion || plan;
    const { encabezado, columnas, mediacion, versionNumber, source, createdAt } = activeData;

    // Visual Mode Logic
    const isTecnico = plan.modalidad === 'TECNICO_CTP' || plan.especialidad;
    const ModeIcon = isTecnico ? Hammer : School;
    const themeColor = isTecnico ? "amber" : "indigo";

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-sans">

            {/* 0. DEFENSE BAR (Versioning) */}
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 px-2">
                    <Badge variant="outline" className="bg-white gap-1.5 py-1 px-3 shadow-sm border-slate-200 text-slate-600">
                        <History className="w-3.5 h-3.5" />
                        <span className="font-mono font-medium">V{versionNumber || '1.0'}</span>
                    </Badge>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fuente de Verdad</span>
                        <span className="text-xs font-medium text-slate-700">{source || 'SYSTEM_CORE'}</span>
                    </div>
                </div>
                {versions.length > 0 && (
                    <Select disabled={readOnly}>
                        <SelectTrigger className="w-[200px] h-9 text-xs border-slate-200 bg-white shadow-sm">
                            <SelectValue placeholder="Historial Inmutable" />
                        </SelectTrigger>
                        <SelectContent>
                            {versions.map((v) => (
                                <SelectItem key={v.id} value={v.id}>
                                    <div className="flex flex-col text-xs">
                                        <span className="font-bold">Versión {v.versionNumber}</span>
                                        <span className="text-slate-400 text-[10px]">{new Date(v.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* 1. HEADER "OFFICIAL LOOK" */}
            <div className={`
        relative overflow-hidden rounded-2xl border bg-white shadow-lg
        border-${themeColor}-100
      `}>
                {/* Decorative Top Bar */}
                <div className={`h-2 w-full bg-gradient-to-r from-${themeColor}-500 via-${themeColor}-400 to-${themeColor}-300`} />

                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-lg bg-${themeColor}-50 text-${themeColor}-600`}>
                                <ModeIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold text-slate-900 tracking-tight`}>
                                    {plan.asignatura}
                                </h1>
                                <p className="text-slate-500 font-medium flex items-center gap-2">
                                    <span className="uppercase tracking-wide text-xs">Nivel:</span>
                                    {plan.nivel}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end max-w-md">
                        {/* Logic for Values */}
                        {encabezado?.valores?.map((val, i) => (
                            <Badge key={i} variant="secondary" className="bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200">
                                <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                                {val}
                            </Badge>
                        ))}
                        {isTecnico && (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200">
                                <Hammer className="w-3 h-3 mr-1" /> Especialidad Técnica
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. THE GRID LAYOUT (Core Requirement) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* COL 1 & 2 MATRIX (Span 5/12) */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="h-full border-slate-200 shadow-md">
                        <CardHeader className="bg-slate-50 border-b pb-3">
                            <CardTitle className="text-sm font-bold uppercase text-slate-700 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Matriz Curricular
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {(!columnas || columnas.length === 0) ? (
                                <div className="p-6 text-center text-slate-400 italic text-sm">Sin datos curriculares.</div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {columnas.map((col, idx) => (
                                        <div key={idx} className="grid grid-cols-1 gap-0">
                                            {/* Aprendizaje / Indicador (Gray BG) */}
                                            <div className="bg-slate-50/80 p-5 border-b border-white">
                                                <div className="mb-2">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Resultado / Indicador</span>
                                                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                                                        {col.indicador || col.aprendizaje || "Sin indicador"}
                                                    </p>
                                                </div>
                                                {/* Criteria if exists */}
                                                {col.criterio && (
                                                    <Badge variant="outline" className="mt-2 text-[10px] border-slate-300 text-slate-500">
                                                        {col.criterio}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Saberes (White BG, Bulleted) */}
                                            <div className="p-5 bg-white">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Saberes Esenciales</span>
                                                <ul className="space-y-2">
                                                    {/* Parse Saberes if array or string */}
                                                    {Array.isArray(col.saberes)
                                                        ? col.saberes.map((s, i) => <SaberItem key={i} text={s} color={themeColor} />)
                                                        : col.saber ? <SaberItem text={col.saber} color={themeColor} /> : <span className="text-xs text-gray-300">--</span>
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* COL 3 STRATEGIES (Span 7/12 - "La más ancha") */}
                <div className="lg:col-span-7 space-y-4">
                    {!mediacion ? (
                        <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                            Esperando generación de estrategias...
                        </div>
                    ) : (
                        mediacion.map((fase, idx) => (
                            <MediationCard
                                key={idx}
                                fase={fase}
                                idx={idx}
                                themeColor={themeColor}
                                readOnly={readOnly}
                            />
                        ))
                    )}
                </div>

            </div>

            <div className="text-center pt-8 pb-4">
                <p className="text-xs text-slate-300 uppercase tracking-widest flex items-center justify-center gap-2 opacity-70">
                    <ShieldCheck className="w-4 h-4" /> Estructura Validada por AulaPlan
                </p>
            </div>

        </div>
    );
}

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------

function SaberItem({ text, color }) {
    return (
        <li className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${color}-400 flex-shrink-0`} />
            <span>{text}</span>
        </li>
    );
}

function MediationCard({ fase, idx, themeColor, readOnly }) {
    // Parsing phases for nice titles
    const title = fase.fase || `Fase ${idx + 1}`;
    const isCierre = title.toLowerCase().includes('cierre');
    const borderColor = isCierre ? 'border-l-emerald-500' : `border-l-${themeColor}-500`;

    return (
        <Card className={`overflow-hidden transition-all hover:shadow-md border-l-4 ${borderColor}`}>
            <div className="bg-white p-1 flex justify-between items-center pr-4">
                <div className="px-4 py-2">
                    <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wide">{title}</h3>
                </div>
                <button className="text-xs flex items-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors">
                    <Edit className="w-3 h-3" /> Editar
                </button>
            </div>

            {/* THE PING PONG LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-t border-slate-100">

                {/* DOCTOR / TEACHER ZONE */}
                <div className="p-5 bg-blue-50/20 space-y-3 relative group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-blue-700 uppercase">Docente</span>
                    </div>

                    <IronLawGuard content={fase.acciones?.docente} />
                </div>

                {/* STUDENT ZONE */}
                <div className="p-5 bg-emerald-50/20 space-y-3 relative group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md">
                            <Rocket className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-emerald-700 uppercase">Estudiante</span>
                    </div>

                    <div className="text-sm text-slate-600 leading-relaxed font-normal">
                        {fase.acciones?.estudiante || "Actividad del estudiante..."}
                    </div>
                </div>

            </div>

            {/* Strategy Footer if exists */}
            {fase.estrategia && (
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mt-0.5">Estrategia:</span>
                    <span className="text-xs text-slate-600 italic">{fase.estrategia}</span>
                </div>
            )}
        </Card>
    );
}

function IronLawGuard({ content }) {
    if (!content) return <span className="text-gray-300 italic text-xs">Sin asignar.</span>;
    const hasIronPrefix = content.includes("La persona docente");

    return (
        <div className={`
      relative text-sm leading-relaxed rounded-md
      ${hasIronPrefix ? "" : ""} 
    `}>
            <p className="text-slate-700">{content}</p>

            {hasIronPrefix && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-50 text-[10px] font-bold text-red-400 border border-red-100 select-none">
                    <Lock className="w-3 h-3" /> ZONA PROTEGIDA
                </div>
            )}
        </div>
    )
}
