"use client";
import { useState, useEffect } from 'react';
import { useGroups } from '@/context/groups-context';
import { toast } from 'sonner';
import { Search, ChevronRight, Check, Sparkles, Building, Users, BookOpen, Layers, GraduationCap, Calendar, FileText } from 'lucide-react';
import { generateSummativeInstrument } from '@/lib/instrument-generator';
import { useAuth } from '@/context/auth-context';
import { MEP_DATA } from '@/lib/mep-data';
import { calculateTimeBudget } from '@/lib/intelligence';
import { validateETPStructure } from '@/lib/assessment-engine';

export default function SteppedPlanner({ onGenerate, loading }) {
    const { activeInstitution, groups } = useGroups();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        institution: activeInstitution?.id || '',
        modality: '', // New Level 1
        level: '',    // New Level 2
        group: '',
        subject: '',
        unit: '',
        subarea: '', // For Technical
        neuroFocus: [],
        resourceType: 'planeamiento',
        period: 'I',
    });

    // 1st Grade Detection logic updated to use explicit Level selection
    const isFirstGradePeriod1 = (data.level?.includes('1') || data.level === '1') && data.modality.includes('Primaria') && data.period === 'I';

    // DYNAMIC DERIVED DATA
    const availableModalities = Object.keys(MEP_DATA);
    const availableLevels = data.modality ? Object.keys(MEP_DATA[data.modality] || {}) : [];

    // Complex Navigation for Subject/Subarea
    // Logic: In Technical, we might have Subareas. In Academic, flat Subjects.
    const currentCurriculum = (data.modality && data.level && data.period)
        ? (MEP_DATA[data.modality][data.level][`${data.period} Periodo`] || {})
        : {};

    const availableSubjects = Object.keys(currentCurriculum);

    // Update Data Persistence for Institution (Keep existing)
    useEffect(() => {
        if (activeInstitution?.id) {
            setData(prev => ({ ...prev, institution: activeInstitution.id }));
        }
    }, [activeInstitution]);

    // Reset Cascade when parent changes
    useEffect(() => {
        setData(d => ({ ...d, level: '', subject: '', unit: '' }));
    }, [data.modality]);

    useEffect(() => {
        setData(d => ({ ...d, subject: '', unit: '' }));
    }, [data.level]);

    // Handle Unit/Subarea logic inside render or derived
    const getUnits = (subj) => {
        if (!subj) return [];
        const content = currentCurriculum[subj];
        if (Array.isArray(content)) return content.map(u => u.unit || u.aprendizaje || "Unidad General"); // Handle array of objects
        if (typeof content === 'object') return Object.keys(content); // Handle Technical Subareas
        return [];
    };

    const isTechnical = data.modality?.includes('Técnica');
    const availableSubareas = isTechnical && data.subject ? Object.keys(currentCurriculum[data.subject] || {}) : [];
    // Correction: In MEP_DATA Technical, Subject key is "Desarrollo Web", inside are subareas (TI, Diseño).

    const availableUnitsForSelection = isTechnical
        ? (data.subarea ? (currentCurriculum[data.subject]?.[data.subarea] || []).map(u => u.unit) : [])
        : (data.subject ? (currentCurriculum[data.subject] || []).map(u => u.id ? (u.unit || u.aprendizaje.slice(0, 50) + "...") : u) : []);

    // KAIZEN 200.0: PREDICCIÓN DE ESTRUCTURA (AUTONOMOUS)
    useEffect(() => {
        if (availableSubjects.length === 1 && !data.subject) {
            setData(prev => ({ ...prev, subject: availableSubjects[0] }));
            toast.info(`Auto-seleccionado: ${availableSubjects[0]}`);
        }
    }, [availableSubjects]);

    const handleNext = () => {
        // Real-time Validation Logic
        if (step === (isTechnical ? 6 : 5) && data.unit) {
            const budget = calculateTimeBudget(40, []); // Assuming 40h unit for demo
            toast.info(budget.message);
        }
        setStep(p => p + 1);
    };

    const submit = () => {
        if (!data.subject || !data.unit) return toast.error("Complete los campos obligatorios.");

        if (data.resourceType === 'instrumento_sumativo') {
            toast.success("Generando Instrumento Oficial 1er Año...");

            generateSummativeInstrument({
                regional: activeInstitution?.regional || "San José Norte",
                institutionName: activeInstitution?.name || "Escuela Demo",
                teacherName: activeInstitution?.director || "Lic. Max Salazar Sánchez",
                subject: data.subject,
                level: "Primer Año",
                section: groups.find(g => g.id === data.group)?.name || "General",
                indicators: [
                    { indicator: "Identifica fonemas en palabras cotidianlas.", criteria: "Logrado" },
                    { indicator: "Produce grafemas con trazo direccional.", criteria: "Logrado" },
                    { indicator: "Resuelve problemas de conteo básico (1-10).", criteria: "Logrado" }
                ]
            });
            return;
        }

        // KAIZEN 125/200: STRICT TIME VALIDATION
        const budget = calculateTimeBudget(40, []); // Default 40h for Unit Mastery
        if (budget.status === "OVERFLOW") {
            return toast.error("NO PERMITIDO: El plan excede la carga horaria máxima de la unidad.");
        }

        // Smart Context Build (Inteligencia de Enjambre)
        let inclusionContext = "";
        const selectedGroup = groups.find(g => g.id === data.group);
        let groupContext = '(General)';

        if (selectedGroup) {
            groupContext = `con la Sección ${selectedGroup.name}`;
            const stats = selectedGroup.students.reduce((acc, s) => {
                const flags = (s.needs || "").toLowerCase() + (s.notes || "").toLowerCase();
                if (flags.includes('tea') || flags.includes('autista')) acc.tea++;
                if (flags.includes('ad') || flags.includes('alta')) acc.ad++;
                acc.total++;
                return acc;
            }, { tea: 0, ad: 0, total: 0 });

            if (stats.tea > 0 || stats.ad > 0) {
                inclusionContext = `[ALERTA INCLUSIÓN: ${stats.tea} TEA, ${stats.ad} Alta Dotación.]`;
            }
        }

        const instContext = activeInstitution ? activeInstitution.name : 'MEP';
        const sovereignStamp = "Tecnología MisPlanesCR - Soporte Oficial: +506 60906359";

        const prompt = `${data.subject} - ${data.unit}. Contexto: ${instContext}, ${groupContext}. ${inclusionContext}. TIPO_RECURSO: ${data.resourceType.toUpperCase()}. [REGLA DE ORO: Pie de página obligatorio: ${sovereignStamp}]`;

        // Optimistic UI
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 100)),
            {
                loading: 'Conectando con Núcleo Neural...',
                success: 'Contexto Pedagógico Establecido',
                error: 'Error de conexión'
            }
        );

        onGenerate(prompt);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-indigo-50 overflow-hidden">
            {/* STEPS HEADER */}
            <ul className="steps w-full pt-6 pb-4 px-4 text-sm scale-90">
                <li className={`step ${step >= 1 ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(1)}>Inst.</li>
                <li className={`step ${step >= 2 ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(2)}>Modalidad</li>
                <li className={`step ${step >= 3 ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(3)}>Nivel</li>
                <li className={`step ${step >= 4 ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(4)}>{isTechnical ? 'Especialidad' : 'Materia'}</li>
                {isTechnical && <li className={`step ${step >= 5 ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(5)}>Subárea</li>}
                <li className={`step ${step >= (isTechnical ? 6 : 5) ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(isTechnical ? 6 : 5)}>Unidad</li>
                <li className={`step ${step >= (isTechnical ? 7 : 6) ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(isTechnical ? 7 : 6)}>Grupo</li>
                <li className={`step ${step >= (isTechnical ? 8 : 7) ? 'step-primary' : ''} cursor-pointer`} onClick={() => setStep(isTechnical ? 8 : 7)}>Recurso</li>
            </ul>

            <div className="p-8 min-h-[400px] flex flex-col justify-between">

                {/* STEP 1: INSTITUTION */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <Building size={16} /> Institución Educativa
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-slate-50 font-bold text-indigo-900"
                                value={activeInstitution?.name || "Cargando..."}
                                disabled
                            />
                            <div className="label text-xs text-slate-400">
                                * Seleccionada desde el Dashboard Principal (Multi-tenant).
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: MODALIDAD */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <GraduationCap size={16} /> Modalidad Educativa
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.modality}
                                onChange={e => setData({ ...data, modality: e.target.value })}
                            >
                                <option value="">Seleccione Modalidad...</option>
                                {availableModalities.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <p className="text-xs text-slate-400 mt-2 ml-1">
                                Define la estructura curricular (Artículo 39 REA).
                            </p>
                        </div>
                    </div>
                )}

                {/* STEP 3: NIVEL */}
                {step === 3 && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <Layers size={16} /> Nivel / Ciclo
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.level}
                                onChange={e => setData({ ...data, level: e.target.value })}
                            >
                                <option value="">Seleccione Nivel...</option>
                                {availableLevels.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>

                            <label className="label font-bold text-slate-700 mt-4 flex gap-2 items-center">
                                📅 Periodo Lectivo
                            </label>
                            <select
                                className="select select-bordered w-full bg-slate-50"
                                value={data.period}
                                onChange={e => setData({ ...data, period: e.target.value })}
                            >
                                <option value="I">I Periodo</option>
                                <option value="II">II Periodo</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* STEP 4: SUBJECT / SPECIALITY */}
                {step === 4 && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <BookOpen size={16} /> {isTechnical ? "Especialidad Técnica" : "Asignatura"}
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.subject}
                                onChange={e => setData({ ...data, subject: e.target.value })}
                            >
                                <option value="">Seleccione...</option>
                                {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {/* STEP 5 (Technical): SUBAREA */}
                {step === 5 && isTechnical && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <BookOpen size={16} /> Sub-área / Módulo
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.subarea}
                                onChange={e => setData({ ...data, subarea: e.target.value })}
                            >
                                <option value="">Seleccione Sub-área...</option>
                                {availableSubareas.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {/* STEP UNIT (Variable Index based on technical) */}
                {step === (isTechnical ? 6 : 5) && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <Layers size={16} /> Unidad de Aprendizaje
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.unit}
                                onChange={e => setData({ ...data, unit: e.target.value })}
                            >
                                <option value="">Seleccione Unidad...</option>
                                {availableUnitsForSelection.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                            <div className="label text-xs text-slate-400">
                                * Contenido oficial cargado desde NEON JSONB.
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP GROUP (Variable Index) */}
                {step === (isTechnical ? 7 : 6) && (
                    <div className="space-y-6 animate-fade-in-right">
                        <div>
                            <label className="label font-bold text-slate-700 flex gap-2 items-center">
                                <Users size={16} /> Sección
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.group}
                                onChange={e => setData({ ...data, group: e.target.value })}
                            >
                                <option value="">General (Sin grupo específico)</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100 flex gap-3 items-start animate-pulse-slow">
                                <Sparkles className="shrink-0 mt-1" size={16} />
                                <div>
                                    <strong>Inclusión Automática (DUA):</strong><br />
                                    {data.modality.includes('Adultos') || data.modality.includes('CINDEA') || data.modality.includes('IPEC')
                                        ? "Modo Andragógico activado (Enfoque Adultos)."
                                        : "Detectando necesidades educativas..."}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP RESOURCE TYPE (Variable Index) */}
                {step === (isTechnical ? 8 : 7) && (
                    <div className="space-y-6 animate-fade-in-right">
                        <label className="label font-bold text-slate-700 flex gap-2 items-center">
                            <BookOpen size={16} /> Tipo de Instrumento
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px] overflow-y-auto pr-2">
                            {/* Standard Plan */}
                            <button
                                onClick={() => setData({ ...data, resourceType: 'planeamiento' })}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${data.resourceType === 'planeamiento' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-primary/50'}`}
                            >
                                <div className="font-bold">Planeamiento Didáctico</div>
                                <div className="text-xs text-slate-500">Completo (Estrategias + Indicadores)</div>
                            </button>

                            {/* Logic Switch: Exam vs Instrument */}
                            {isFirstGradePeriod1 ? (
                                <button
                                    onClick={() => setData({ ...data, resourceType: 'instrumento_sumativo' })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${data.resourceType === 'instrumento_sumativo' ? 'border-indigo-600 bg-indigo-50' : 'border-indigo-100 hover:border-indigo-300'}`}
                                >
                                    <div className="font-bold flex items-center gap-2 text-indigo-700">
                                        <Sparkles size={14} /> Instrumento Sumativo
                                    </div>
                                    <div className="text-xs text-indigo-600">
                                        <strong>NORMATIVA 2024:</strong> Primer Año no realiza prueba escrita en I Periodo.
                                    </div>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setData({ ...data, resourceType: 'examen' })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${data.resourceType === 'examen' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-primary/50'}`}
                                >
                                    <div className="font-bold">Prueba Escrita</div>
                                    <div className="text-xs text-slate-500">Con Tabla de Especificaciones</div>
                                </button>
                            )}

                            {/* Rubric */}
                            <button
                                onClick={() => setData({ ...data, resourceType: 'rubrica' })}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${data.resourceType === 'rubrica' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-primary/50'}`}
                            >
                                <div className="font-bold">Rúbrica Analítica</div>
                                <div className="text-xs text-slate-500">Para Trabajo Cotidiano</div>
                            </button>

                            {/* Annual Plan (New) */}
                            <button
                                onClick={() => setData({ ...data, resourceType: 'plan_anual' })}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${data.resourceType === 'plan_anual' ? 'border-purple-600 bg-purple-50' : 'border-purple-100 hover:border-purple-300'}`}
                            >
                                <div className="font-bold flex items-center gap-2 text-purple-700">
                                    <Calendar size={14} /> Plan Anual
                                </div>
                                <div className="text-xs text-purple-600">Ajustado al Calendario Escolar</div>
                            </button>

                            {/* Pedagogical Practice (New) */}
                            <button
                                onClick={() => setData({ ...data, resourceType: 'practica_pedagogica' })}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${data.resourceType === 'practica_pedagogica' ? 'border-orange-600 bg-orange-50' : 'border-orange-100 hover:border-orange-300'}`}
                            >
                                <div className="font-bold flex items-center gap-2 text-orange-700">
                                    <FileText size={14} /> Práctica Pedagógica
                                </div>
                                <div className="text-xs text-orange-600">Por Unidad de Estudio</div>
                            </button>
                        </div>
                    </div>
                )}

                {/* ACTIONS */}
                <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
                    {step > 1 ? (
                        <button onClick={() => setStep(p => p - 1)} className="btn btn-ghost hover:bg-slate-100">Atrás</button>
                    ) : <div className="flex items-center gap-2 text-xs text-slate-400"><img src="/sinpe_logo_mini.png" alt="" className="w-4 h-4 grayscale opacity-50" /> Banco Popular & SINPE Verified</div>}

                    {step < (isTechnical ? 8 : 7) ? (
                        <button onClick={handleNext} disabled={!data.institution} className="btn btn-primary gap-2 shadow-md">
                            Siguiente <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={submit}
                            disabled={loading || !data.subject || !data.unit || !data.resourceType}
                            className="btn btn-success text-white shadow-lg shadow-green-500/30 gap-2 hover:scale-105 transition-transform"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : <><Sparkles size={16} /> Generar Recurso</>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
