"use client";
import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("max.salazar@mep.go.cr");

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock Auth Delay
        setTimeout(() => {
            setIsLoading(false);
            if (email.includes('@mep.go.cr')) {
                toast.success("Autenticación Segura Exitosa. Bienvenido, Principal Architect.");
                window.location.href = '/dashboard';
            } else {
                toast.error("Dominio no autorizado. Solo personal MEP.");
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>

            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4 text-primary border border-primary/30">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">AulaPlan<span className="text-primary">.ai</span></h1>
                    <p className="text-slate-400 text-sm mt-2">Acceso Blindado para Docentes MEP</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Credenciales Oficiales</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-slate-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-3 text-white placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-r-none outline-none"
                            />
                            <div className="absolute right-4 top-3.5 text-xs font-mono text-slate-600">@mep.go.cr</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
                            <input
                                type="password"
                                value="password123"
                                disabled
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-3 text-white opacity-50 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                Iniciar Sesión Segura
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                        Powered by Antigravity Engine v11.5
                    </p>
                </div>
            </div>
        </div>
    );
}
