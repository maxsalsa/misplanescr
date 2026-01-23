"use client";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowLeft, Save, Wand2 } from 'lucide-react';
import { savePlanToNeon } from '@/app/actions/save-plan';
import { useState } from 'react';

export default function AddPlaneamientoPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        setIsProcessing(true);
        try {
            // Adapt form data to schema expected by server action
            const payload = {
                modalidad: "Educación Técnica (ETP)", // Default for quick add
                nivel: data.nivel,
                asignatura: data.materia,
                unidad: data.unidad,
                dua_active: true,
                aprendizajes: [] // Empty for quick draft
            };

            const result = await savePlanToNeon(payload);
            if (result.success) {
                toast.success("Borrador creado. Redirigiendo al editor...");
                // In real app, router.push(`/dashboard/edit/${result.id}`)
            } else {
                toast.error("Error al iniciar el borrador.");
            }
        } catch (e) {
            toast.error("Error de conexión.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

                {/* Header Premium */}
                <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                        <Link href="/default" className="inline-flex items-center text-indigo-100 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Hub
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">Nuevo Planeamiento</h1>
                        <p className="text-indigo-100 opacity-90 mt-1">Asistente de creación rápida con Inteligencia Artificial.</p>
                    </div>
                </div>

                {/* Formulario Clean */}
                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-bold text-slate-700">Materia / Taller</label>
                                <input {...register("materia")} type="text" placeholder="Ej: Contabilidad" className="input input-bordered w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-bold text-slate-700">Nivel</label>
                                <select {...register("nivel")} className="select select-bordered w-full focus:border-indigo-500 transition-all">
                                    <option>Décimo</option>
                                    <option>Undécimo</option>
                                    <option>Duodécimo</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label font-bold text-slate-700">Nombre de la Unidad</label>
                            <input {...register("unidad")} type="text" placeholder="Ej: Ciclo Contable de Servicios" className="input input-bordered w-full focus:border-indigo-500 transition-all" required />
                        </div>

                        <div className="alert bg-indigo-50 border-indigo-100 text-indigo-900 text-sm rounded-xl">
                            <Wand2 className="w-5 h-5 text-indigo-600" />
                            <span>La IA completará las estrategias de mediación automáticamente basándose en la normativa 2026.</span>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full h-14 text-lg btn-tactile ${isProcessing ? 'loading' : ''}`}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Generando Estructura...' : '✨ Crear Planeamiento Mágico'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
