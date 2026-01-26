"use client";
import React from 'react';
import { Lock, Crown } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { isPremium } from '@/lib/auth-roles'; // centralized logic

export default function DownloadGuard({ children, onBlock }) {
    const { user } = useAuth();
    const premium = isPremium(user);

    const handleClick = (e) => {
        if (!premium) {
            e.preventDefault();
            e.stopPropagation();
            // Trigger Modal or Callback
            if (onBlock) onBlock();

            // Native Modal Logic (DaisyUI)
            document.getElementById('subscription_modal').showModal();
        }
    };

    return (
        <>
            <div onClickCapture={handleClick} className={!premium ? "cursor-not-allowed opacity-80" : ""}>
                {children}
            </div>

            {/* SUBSCRIPTION MODAL (DaisyUI 5) */}
            <dialog id="subscription_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-slate-900 border border-slate-700 text-white">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                            <Crown size={32} className="text-white" />
                        </div>
                        <h3 className="font-black text-2xl mb-2">Desbloquea el Poder Premium</h3>
                        <p className="py-4 text-slate-400 text-sm">
                            La descarga de PDFs Oficiales, Rúbricas Automatizadas e Instrumentos Sumativos es exclusiva para suscriptores <strong>AulaPlan PRO</strong>.
                        </p>

                        <div className="stats bg-slate-800 my-4 w-full">
                            <div className="stat place-items-center">
                                <div className="stat-title text-slate-500">Inversión Mensual</div>
                                <div className="stat-value text-yellow-400 text-3xl">₡ 3,500</div>
                                <div className="stat-desc text-slate-400">Cancelable en cualquier momento</div>
                            </div>
                        </div>

                        <div className="modal-action flex-col gap-2">
                            <button className="btn btn-primary w-full gap-2 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                <Crown size={18} /> Activar Membresía Ahora
                            </button>
                            <form method="dialog">
                                <button className="btn btn-ghost w-full">Quizás luego</button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
