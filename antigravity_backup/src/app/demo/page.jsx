"use client";
import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { ShieldCheck, Zap, Heart, Brain, Lock } from 'lucide-react';

export default function DemoPage() {
    return (
        <AppShell>
            <div className="max-w-5xl mx-auto text-center space-y-12">
                {/* HERO */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <span className="badge badge-primary badge-lg text-lg px-6 py-4 font-bold rounded-full shadow-xl">
                        AULAPLAN INDUSTRIAL GRADE v8.5
                    </span>
                    <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-[var(--color-primary)] to-cyan-400 bg-clip-text text-transparent">
                        El Sistema Educativo del Futuro
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                        Más que un planeador. Una infraestructura de misión crítica para el docente costarricense.
                    </p>
                </div>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card bg-card border border-white/5 p-8 rounded-[40px] hover:scale-105 transition-transform shadow-2xl group">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors">
                            <Lock size={32} className="text-blue-500 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Seguridad Bancaria</h3>
                        <p className="text-sm text-slate-500">Sesiones de 20 minutos, cifrado Neon DB y Middleware de bloqueo absoluto.</p>
                    </div>

                    <div className="card bg-card border border-white/5 p-8 rounded-[40px] hover:scale-105 transition-transform shadow-2xl group">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500 transition-colors">
                            <Brain size={32} className="text-purple-500 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-2">IA Pedagógica</h3>
                        <p className="text-sm text-slate-500">Binomio Sagrado garantizado. La IA separa Mediación de Construcción automáticamente.</p>
                    </div>

                    <div className="card bg-card border border-white/5 p-8 rounded-[40px] hover:scale-105 transition-transform shadow-2xl group">
                        <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-500 transition-colors">
                            <Heart size={32} className="text-pink-500 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Neuro-Inclusión</h3>
                        <p className="text-sm text-slate-500">Interfaz DUA 3.0 que se adapta a perfiles TEA, TDAH y Alta Dotación.</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="p-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[50px] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-[var(--color-primary)] opacity-10 blur-[100px] rounded-full"></div>
                    <h2 className="text-3xl font-bold mb-6 text-white relative z-10">¿Listo para retomar el control?</h2>
                    <button className="btn btn-primary btn-lg rounded-full px-12 font-black text-white hover:scale-110 transition-transform relative z-10">
                        Iniciar Sesión Segura
                    </button>
                    <p className="mt-4 text-xs opacity-50 font-mono">POWERED BY ANTIGRAVITY ENGINE</p>
                </div>
            </div>
        </AppShell>
    );
}
