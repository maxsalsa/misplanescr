"use client";
import React from 'react';
import Link from 'next/link';
import { Gamepad2, LibraryBig, GraduationCap, CheckSquare } from 'lucide-react';

export default function StudentDashboard() {
    return (
        <div className="p-8 max-w-6xl mx-auto animate-fade-in">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-[#003366] mb-2 flex items-center gap-3">
                    <GraduationCap size={40} className="text-indigo-600" />
                    Mi Aula Virtual
                </h1>
                <p className="text-slate-500 text-lg">¡Bienvenido! ¿Qué quieres aprender hoy?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* JUEGOS */}
                <Link href="/dashboard/student/games" className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-8 text-center">
                        <div className="bg-purple-100 text-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Gamepad2 size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Juegos & Quizzes</h2>
                        <p className="text-slate-500">Gana XP y sube de nivel mientras repasas.</p>
                    </div>
                </Link>

                {/* BIBLIOTECA */}
                <Link href="/dashboard/student/library" className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-8 text-center">
                        <div className="bg-cyan-100 text-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <LibraryBig size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Biblioteca</h2>
                        <p className="text-slate-500">Videos, guías y recursos de repaso.</p>
                    </div>
                </Link>

                {/* TAREAS */}
                <Link href="/dashboard/tasks" className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-8 text-center">
                        <div className="bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <CheckSquare size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Mis Tareas</h2>
                        <p className="text-slate-500">Revisa pendientes y sube evidencias.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
