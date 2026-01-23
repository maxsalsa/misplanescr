"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/lib/validators/mep-schema';
import { ComplianceIndicator } from '@/components/compliance-indicator';
import { toast } from 'sonner';
import { getSovereignKnowledge, getCurriculumStructure } from '@/app/actions/get-knowledge';
import { savePlanToNeon } from '@/app/actions/save-plan';

export default function ControlDashboard() {
    const [activeModality, setActiveModality] = useState('Educación Técnica (ETP)');
    const [subjects, setSubjects] = useState<string[]>([]);
    const [sovereignAssets, setSovereignAssets] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // Load Real Data on Mount / Change
    useEffect(() => {
        async function loadData() {
            // 1. Load Structure
            const subjs = await getCurriculumStructure(activeModality);
            setSubjects(subjs);

            // 2. Load Knowledge Kernel
            const assets = await getSovereignKnowledge();
            setSovereignAssets(assets);
        }
        loadData();
    }, [activeModality]);

    const { register, control, handleSubmit, watch, setValue } = useForm({
        resolver: zodResolver(PlanSchema),
        defaultValues: {
            modalidad: activeModality,
            nivel: 'Décimo',
            asignatura: 'Desarrollo Web',
            unidad: 'Introducción a Tecnologías TI',
            dua_active: true,
            aprendizajes: [
                {
                    resultado: 'Analizar la arquitectura cliente-servidor.',
                    indicadores: ['Identifica protocolos HTTP', 'Describe el ciclo de vida'],
                    estrategias: '1. FOCALIZACIÓN: Lluvia de ideas sobre cómo funciona Internet...'
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "aprendizajes"
    });

    const watchedData = watch();

    // "Soberanía" Auto-Fill from Kernel
    const injectStrategy = (asset: any, index: number) => {
        const strategyText = `
1. INICIO: ${asset.instructional_logic.inicio}
2. DESARROLLO: ${asset.instructional_logic.desarrollo}
3. CIERRE: ${asset.instructional_logic.cierre}

-- VARIANTES INCLUSIÓN --
TEA: ${asset.inclusion.tea}
TDAH: ${asset.inclusion.tdah}
`;
        setValue(`aprendizajes.${index}.estrategias`, strategyText);
        toast.success("Estrategia Soberana Inyectada");
    };

    // Link to Server Action replaced above

    const onSubmit = async (data: any) => {
        setIsSaving(true);

        try {
            const result = await savePlanToNeon(data);

            if (result.success) {
                toast.success(result.message);
                // Optional: Redirect or Clear
            } else {
                toast.error(result.message);
                console.error(result.errors);
            }
        } catch (e) {
            toast.error("Error de comunicación con el servidor.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            {/* 1. TOP HEADER: UX FIDELITY */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Centro de Mando Curricular</h1>
                    <p className="text-slate-500 text-sm">Gestión total de unidades, indicadores y mediación (Soberanía del Dato).</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* WhatsApp Support Widget */}
                    <a
                        href="https://wa.me/50660906359"
                        target="_blank"
                        className="btn btn-emerald text-white gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                        Soporte VIP
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2. LEFT SIDE: MULTIMODAL SELECTORS & CONFIG */}
                <div className="space-y-6">
                    <div className="card bg-white shadow-xl border border-slate-200">
                        <div className="card-body p-6">
                            <h3 className="card-title text-slate-800 text-lg mb-4">⚙️ Configuración Estructural</h3>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">Modalidad</span></label>
                                <select
                                    className="select select-bordered w-full"
                                    value={activeModality}
                                    onChange={(e) => { setActiveModality(e.target.value); setValue('modalidad', e.target.value); }}
                                >
                                    <option>Educación Técnica (ETP)</option>
                                    <option>Secundaria Académica</option>
                                    <option>Primaria (I y II Ciclo)</option>
                                </select>
                            </div>

                            {activeModality.includes("Técnica") && (
                                <div className="alert alert-info shadow-sm mt-2 text-xs">
                                    ℹ️ Modo ETP: Formato de planeamiento bloqueado a EBNC (Comité Técnico).
                                </div>
                            )}

                            <div className="form-control w-full mt-4">
                                <label className="label"><span className="label-text font-bold">Asignatura / Especialidad</span></label>
                                <select className="select select-bordered w-full" {...register('asignatura')}>
                                    {subjects.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="form-control w-full mt-4">
                                <label className="label"><span className="label-text font-bold">Unidad de Estudio</span></label>
                                <select className="select select-bordered w-full" {...register('unidad')}>
                                    <option>Unidad 1: Fundamentos</option>
                                    <option>Unidad 2: Aplicación Práctica</option>
                                    <option>Unidad 3: Proyecto Final</option>
                                </select>
                            </div>

                            <div className="divider"></div>

                            {/* 3. COMPLIANCE INDICATOR */}
                            <ComplianceIndicator planData={watchedData} normativa={{ hours: 40 }} />
                        </div>

                        <div className="card-body p-6 pt-0">
                            <h4 className="font-bold text-slate-700 text-sm mb-2">💎 Inteligencia Soberana (Disponible)</h4>
                            <div className="h-40 overflow-y-auto space-y-2">
                                {sovereignAssets.map(asset => (
                                    <button
                                        key={asset.id}
                                        onClick={() => injectStrategy(asset, 0)} // Injects into first field for demo
                                        className="btn btn-ghost btn-xs w-full justify-start text-left truncate border border-slate-100"
                                    >
                                        ✨ {asset.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. RIGHT SIDE: TOTAL UNIT EDITOR */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {fields.map((field, index) => (
                            <div key={field.id} className="card bg-white shadow-xl border border-slate-200 animate-slide-up">
                                <div className="card-body p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="badge badge-primary badge-lg gap-2">
                                            Resultado #{index + 1}
                                        </div>
                                        <button type="button" onClick={() => remove(index)} className="btn btn-ghost btn-sm text-red-500">Eliminar</button>
                                    </div>

                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Resultado de Aprendizaje (RA)</span></label>
                                        <input {...register(`aprendizajes.${index}.resultado`)} className="input input-bordered font-bold text-slate-700" placeholder="Ej: Analizar la estructura..." />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-bold">Estrategias de Mediación</span></label>
                                            <textarea {...register(`aprendizajes.${index}.estrategias`)} className="textarea textarea-bordered h-40 font-mono text-xs" placeholder="1. FOCALIZACIÓN..."></textarea>
                                        </div>
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-bold">Indicadores (Uno por línea)</span></label>
                                            <textarea
                                                className="textarea textarea-bordered h-40"
                                                placeholder="Analiza..."
                                                {...register(`aprendizajes.${index}.indicadores`)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky bottom-4 z-10">
                            <button type="button" onClick={() => append({ resultado: '', estrategias: '', indicadores: [] })} className="btn btn-outline gap-2">
                                + Agregar RA
                            </button>
                            <button type="submit" className={`btn btn-primary btn-wide ${isSaving ? 'loading' : ''}`}>
                                {isSaving ? 'Guardando en Neon...' : '💾 Guardar Cambios'}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
