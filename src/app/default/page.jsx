import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Settings } from 'lucide-react';

export default function DefaultHub() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-8">

                {/* Header Harmonizado */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                            Antigravity
                        </span> Hub
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Interfaz de Mando Unificada. Acceso directo a los módulos de inteligencia curricular y gestión administrativa.
                    </p>
                </div>

                {/* Grid de Accesos "Glass Card" */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Link href="/addPlaneamiento" className="group relative block h-full">
                        <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl border border-white/50 bg-white/60">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                <Sparkles className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Nuevo Planeamiento</h3>
                            <p className="text-slate-500 mb-4 text-sm">Crear unidad didáctica con IA generativa compatible con MEP 2026.</p>
                            <span className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                Iniciar Motor <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard" className="group relative block h-full">
                        <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl border border-white/50 bg-white/60">
                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-600 transition-colors">
                                <BookOpen className="w-6 h-6 text-sky-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Mi Biblioteca</h3>
                            <p className="text-slate-500 mb-4 text-sm">Consultar historial de planes, recursos y expedientes de estudiantes.</p>
                            <span className="flex items-center text-sky-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                Ver Archivos <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </div>
                    </Link>

                    <Link href="/dashboard/control" className="group relative block h-full">
                        <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl border border-white/50 bg-white/60">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                                <Settings className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Panel de Control</h3>
                            <p className="text-slate-500 mb-4 text-sm">Configuración avanzada, sincronización SINPE y auditoría de sistema.</p>
                            <span className="flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                Ajustes <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </div>
                    </Link>

                </div>

                <div className="text-center">
                    <p className="text-xs text-slate-400 font-mono">Antigravity Core v8.0 | Harmony UI Enabled</p>
                </div>
            </div>
        </div>
    );
}
