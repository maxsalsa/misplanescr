
"use client";

import React from 'react';
import { useSaaS } from '@/context/saas-context';
import { Lock, Crown } from 'lucide-react';
import { toast } from 'sonner';

/**
 * FeatureGate Component
 * Wraps sensitive features and blocks them for "Free" users.
 * 
 * @param {React.ReactNode} children - The protected feature UI
 * @param {string} fallbackMessage - Message to show on lock screen
 * @param {boolean} showBlur - Whether to show blurred content or completely hide
 */
export function FeatureGate({ children, fallbackMessage = "Esta función es exclusiva para usuarios PRO.", showBlur = true }) {
    const { isFree, isAdmin, upgradePlan } = useSaaS();

    // Admin and Pro users bypass the gate
    if (!isFree || isAdmin) {
        return <>{children}</>;
    }

    const handleUpgrade = () => {
        // In a real app, this redirects to Stripe.
        // Here, upgrade mock.
        upgradePlan('monthly');
        toast.success("¡Plan Actualizado! Disfruta las funciones PRO.");
    };

    return (
        <div className="relative group overflow-hidden rounded-xl border border-slate-200">
            {/* Blurry Content */}
            <div className={`transition-all duration-500 ${showBlur ? 'blur-md opacity-50 grayscale pointer-events-none select-none' : 'hidden'}`}>
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-6 text-center">
                <div className="bg-amber-100 p-4 rounded-full mb-4 shadow-lg animate-bounce">
                    <Crown className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Función Premium</h3>
                <p className="text-slate-600 mb-6 max-w-sm">
                    {fallbackMessage}
                </p>
                <button
                    onClick={handleUpgrade}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                >
                    <Lock className="w-4 h-4" />
                    Desbloquear con PRO
                </button>
                <p className="text-xs text-slate-400 mt-4">
                    Desde ₡5,000 / mes. Cancela cuando quieras.
                </p>
            </div>
        </div>
    );
}
