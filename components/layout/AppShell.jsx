"use client";
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Sun, Moon, LogOut } from 'lucide-react';
import SessionTimeout from '@/components/security/SessionTimeout'; // Reusing logic but visual is separate here if needed, or integrated.

// Session Progress Bar Component
function SessionProgressBar({ timeoutSeconds = 1200 }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = Date.now();
        const duration = timeoutSeconds * 1000;

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);

            // Reset logic would be needed if activity resets logic. 
            // For now, this visualizes the *absolute* max time typically, 
            // but SessionTimeout handles the actualreset. 
            // Ideally we subscribe to SessionTimeout state. 
            // For this UI demo, we simulate a steady bar.
        }, 1000);

        return () => clearInterval(interval);
    }, [timeoutSeconds]);

    return (
        <div className="w-full bg-slate-800/50 h-1">
            <div
                className={`h-full transition-all duration-1000 ${progress > 90 ? 'bg-red-500' : 'bg-[var(--color-primary)]'}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

export default function AppShell({ children }) {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    };

    return (
        <div className="min-h-screen transition-colors duration-500 bg-canvas text-base-content font-sans flex flex-col">
            {/* INVISIBLE SECURITY LOGIC */}
            <SessionTimeout />

            {/* Barra de Progreso de Sesión (Seguridad 20min) */}
            <div className="fixed top-0 left-0 right-0 z-[100]">
                <SessionProgressBar timeout={1200} />
            </div>

            <nav className="navbar sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-white/5 px-8 h-16 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tighter text-[var(--color-primary)]">AULAPLAN</span>
                    <span className="badge badge-xs badge-primary font-mono opacity-50">v8.0</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="btn btn-circle btn-ghost btn-sm">
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <div className="avatar placeholder cursor-pointer">
                        <div className="bg-[var(--color-primary)] text-white rounded-full w-9 h-9 flex items-center justify-center">
                            <span className="text-xs font-bold">MS</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="p-8 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1">
                {children}
            </main>

            {/* Botón Rojo Institucional siempre accesible */}
            <button
                className="fixed bottom-8 right-8 btn btn-circle btn-error shadow-2xl hover:scale-110 transition-transform z-50 text-white"
                onClick={() => document.location.href = '/dashboard/life'}
                title="Protocolo de Seguridad (Botón Rojo)"
            >
                <ShieldAlert size={24} />
            </button>
        </div>
    );
}
