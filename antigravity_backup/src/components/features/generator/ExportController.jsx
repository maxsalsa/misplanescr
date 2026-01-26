"use client"
import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';

export default function ExportController({ onExport, documentName }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Lógica de Poder de Antigravity
    // Checks if user is SuperAdmin or has Active Subscription.
    const canDownload = user?.role === 'admin' || user?.isPremium || user?.subscriptionStatus === 'ACTIVE';

    const handleAction = async () => {
        if (!canDownload) {
            // UI de grado industrial para venta inmediata
            document.getElementById('subscription_modal').showModal();
            return;
        }
        setLoading(true);
        try {
            await onExport();
        } catch (error) {
            console.error("Export failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={handleAction}
                className={`btn ${canDownload ? 'btn-primary' : 'btn-outline btn-warning'} gap-2 shadow-lg w-full md:w-auto`}
                disabled={loading}
            >
                {loading && <span className="loading loading-spinner"></span>}
                {canDownload ? '🚀 Descargar Planeamiento MEP' : '⭐ Desbloquear Premium'}
            </button>

            {/* Modal de Pago - Estilo Antigravity */}
            <dialog id="subscription_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-2 border-primary bg-slate-900 text-white">
                    <h3 className="font-black text-2xl text-primary flex items-center gap-2">
                        <span>💎</span> ¡Lleva tu docencia al siguiente nivel!
                    </h3>
                    <p className="py-4 text-lg text-slate-300">
                        Estás a un paso de descargar planeamientos, rúbricas e indicadores de grado industrial.
                        <strong> AulaPlan Premium</strong> desbloquea todas las especialidades.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-xl mb-4 border border-dashed border-slate-700">
                        <p className="text-sm opacity-70 text-slate-400">Pago Único mediante SINPE Móvil:</p>
                        <p className="text-xl font-mono font-bold tracking-widest text-emerald-400">6090-6359</p>
                        <p className="text-xs mt-1 text-slate-500 font-bold">A nombre de: Max Salazar Sánchez</p>
                        <p className="text-xs mt-2 text-yellow-500/80">Envíe comprobante al WhatsApp del mismo número.</p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost hover:bg-slate-800">Cerrar</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
