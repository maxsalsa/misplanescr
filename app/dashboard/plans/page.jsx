"use client";
import React, { useEffect, useState } from 'react';
import { FileText, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getPlans } from '@/app/actions/plan-actions';

// HUB: MIS PLANEAMIENTOS (V500 PROD)
export default function PlansHub() {
    // Estado local para manejo rápido de UI
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    // TODO: Obtener userId real de la sesión (ej. 'user_demo_id' temporal o desde contexto)
    const userId = "max_salazar_id"; // ID Temporal para simulación GOD-MODE

    useEffect(() => {
        const loadData = async () => {
            try {
                // Simulamos carga para UX premium
                const res = await getPlans({ page: 1, limit: 12, userId });
                if (res.success) {
                    setPlans(res.data);
                }
            } catch (err) {
                // Silencioso en producción
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="p-8 min-h-screen bg-slate-50/50">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <FileText className="text-blue-600" />
                        Mis Planeamientos
                    </h1>
                    <p className="text-slate-500">Gestión centralizada de recursos didácticos.</p>
                </div>
                <Link href="/dashboard/generator" className="btn btn-institutional gap-2 shadow-lg shadow-blue-500/20">
                    <PlusCircle size={20} /> Nuevo Planeamiento
                </Link>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                </div>
            ) : plans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className="card-solemn p-6 hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden bg-white">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 group-hover:bg-blue-100/50"></div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2 relative z-10">{plan.title}</h3>
                            <div className="flex gap-2 mb-4">
                                <span className="badge badge-sm">{plan.subject}</span>
                                <span className="badge badge-sm badge-outline">{plan.level}</span>
                            </div>
                            <p className="text-xs text-slate-400">Creado el {new Date(plan.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                    <FileText size={48} className="mb-4 opacity-50" />
                    <p>No hay planeamientos activos. Inicie el Motor.</p>
                </div>
            )}
        </div>
    );
}
