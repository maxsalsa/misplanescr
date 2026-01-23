"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useGroups } from '@/context/groups-context';
import { getPlans, deletePlan } from '@/lib/plans-service';
import { toast } from 'sonner';

/**
 * Dashboard de Planeamientos (Cloud Portfolio)
 * ESTÁNDAR DE CALIDAD: Steve Jobs / Clean UI
 */
export default function PlanningPage() {
    const { user } = useAuth();
    const { activeInstitution } = useGroups();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, draft, published

    // Load Plans on Mount
    useEffect(() => {
        loadPlans();
    }, [activeInstitution, user]);

    async function loadPlans() {
        setLoading(true);
        try {
            // Fetch plans for current context
            const data = await getPlans(user?.id || 'demo-user', activeInstitution?.id);
            setPlans(data);
        } catch (e) {
            console.error(e);
            toast.error("No se pudo cargar el portafolio.");
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de eliminar este planeamiento?")) {
            await deletePlan(id);
            toast.success("Plan eliminado.");
            loadPlans();
        }
    };

    const filteredPlans = filter === 'all' ? plans : plans.filter(p => p.status === filter);

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* HERITAGE HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="badge badge-primary badge-outline text-xs font-bold uppercase tracking-widest">
                            {activeInstitution?.name || "Sin Institución"}
                        </span>
                        <span className="text-xs text-slate-400">| Portafolio Digital</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Mis Planeamientos</h1>
                    <p className="text-slate-500">Gestiona, edita y exporta tus documentos académicos.</p>
                </div>
                <Link href="/dashboard/generator" className="btn btn-primary btn-lg shadow-xl shadow-indigo-500/20 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Nuevo Planeamiento
                </Link>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    className={`btn btn-sm ${filter === 'all' ? 'btn-active btn-neutral' : 'btn-ghost'}`}
                    onClick={() => setFilter('all')}
                >
                    Todos ({plans.length})
                </button>
                <button
                    className={`btn btn-sm ${filter === 'draft' ? 'btn-active btn-neutral' : 'btn-ghost'}`}
                    onClick={() => setFilter('draft')}
                >
                    Borradores
                </button>
                <button
                    className={`btn btn-sm ${filter === 'published' ? 'btn-active btn-neutral' : 'btn-ghost'}`}
                    onClick={() => setFilter('published')}
                >
                    Finalizados
                </button>
            </div>

            {/* EMPTY STATE */}
            {!loading && plans.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                    <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Tu portafolio está vacío</h3>
                    <p className="text-slate-500 max-w-md mx-auto mt-2 mb-6">
                        Aún no has creado ningún planeamiento para {activeInstitution?.name}.
                        Usa nuestra IA para generar uno en segundos.
                    </p>
                    <Link href="/dashboard/generator" className="btn btn-outline btn-primary">
                        Comenzar Ahora
                    </Link>
                </div>
            )}

            {/* GRID OF CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map(plan => (
                    <div key={plan.id} className="card bg-white shadow-sm hover:shadow-md transition-shadow border border-slate-200 group">
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start mb-2">
                                <div className="badge badge-ghost text-xs font-mono">{new Date(plan.createdAt).toLocaleDateString()}</div>
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost btn-xs btn-circle text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                    </button>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                        <li><a className="text-xs">Duplicar</a></li>
                                        <li><a className="text-xs text-red-500" onClick={() => handleDelete(plan.id)}>Eliminar</a></li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="card-title text-lg font-bold text-slate-800 line-clamp-2" title={plan.title}>
                                {plan.title}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                                {plan.description || "Sin descripción"}
                            </p>

                            <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-slate-100">
                                <div className="flex -space-x-2">
                                    {/* Fake Avatars for "Shared" look feature later */}
                                </div>
                                <Link href={`/dashboard/planning/${plan.id}`} className="btn btn-sm btn-primary btn-outline group-hover:btn-active transition-colors">
                                    Ver / Editar
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* QUALITY STATEMENT */}
            <div className="text-center mt-12 text-xs text-slate-300 font-mono uppercase tracking-widest">
                Sistema Oficial AutoPlanea-MEP • v2.0 • Security Compliant
            </div>
        </div>
    );
}
