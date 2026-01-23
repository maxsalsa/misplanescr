"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { getMockData } from '@/services/mock-data';
import { LogOut, BookOpen, GraduationCap, Clock, Award, ChevronRight, User, Sparkles, AlertCircle, Shield, Target, Activity, Zap, CheckCircle, Video, Trophy, AlertTriangle } from 'lucide-react';
import { VisualExplainer } from '@/components/visual/VisualExplainer';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function StudentDashboard() {
    const { user, login } = useAuth();
    const router = useRouter();

    // Student Interaction State
    const [activeTab, setActiveTab] = useState('grades'); // Default to grades to show off new data
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        if (user) {
            import('@/services/mock-data').then(mod => {
                // Guardian Protocol: Defensive loading to prevent crash if mock data is malformed
                const list = mod?.MOCK_DATA?.students_list || [];
                // Use generic search or fallback
                const fullStudent = list.find(s => s.nombre === user.name) || list[0] || null;

                if (fullStudent) {
                    setStudentData(fullStudent);
                } else {
                    console.error("Critical: Student data missing in mock source");
                }
            }).catch(err => console.error("Failed to load student data module:", err));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="card w-full max-w-sm bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold text-indigo-700">🎓 Portal Estudiante</h2>
                        <p className="text-center text-slate-500 mb-4">Ingresa tu código de clase para acceder.</p>
                        <input type="text" placeholder="Código (ej. MEP-2025)" className="input input-bordered w-full mb-2" defaultValue="MEP-DEMO" />
                        <button
                            onClick={() => login('estudiante@mep.go.cr', 'Valentina Castillo', 'student')}
                            className="btn btn-primary w-full"
                        >
                            Entrar al Aula (Demo)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!studentData) return <div className="p-8 text-center">Cargando expediente...</div>;

    const { rendimiento, notas, conducta } = studentData;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
            {/* PRIVACY BADGE */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="text-indigo-600" /> Mi Espacio de Aprendizaje
                </h1>
                <span className="badge badge-ghost gap-2 text-xs text-slate-400">
                    <Shield size={12} /> Datos Privados & Seguros
                </span>
            </div>

            {/* HERO SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile & Overall Stats */}
                <div className="col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative w-32 h-32 flex-shrink-0">
                        <div className="radial-progress text-indigo-600 font-bold text-2xl" style={{ "--value": rendimiento.promedio_actual, "--size": "8rem", "--thickness": "0.5rem" }}>
                            {rendimiento.promedio_actual}%
                        </div>
                        <div className="text-center text-xs mt-2 text-slate-400 font-bold">PROMEDIO GLOBAL</div>
                    </div>

                    <div className="flex-1 z-10 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-slate-700">Hola, {studentData.nombre.split(' ')[0]}</h2>
                        <p className="text-slate-500 mb-4">{studentData.especialidad} - Sección {studentData.seccion}</p>

                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            <div className="badge badge-lg gap-2 p-4 bg-emerald-50 text-emerald-700 border-none">
                                <CheckCircle size={16} /> Asistencia: {rendimiento.asistencia}%
                            </div>
                            <div className={`badge badge-lg gap-2 p-4 border-none ${rendimiento.conducta < 80 ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                                <Shield size={16} /> Conducta: {rendimiento.conducta} pts
                            </div>
                        </div>
                    </div>
                </div>

                {/* ALERTS / NEXT CLASS */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-slate-400 text-sm uppercase mb-2">Próxima Clase</h3>
                        <div className="text-2xl font-bold mb-1">Desarrollo Web (TI)</div>
                        <div className="text-slate-300 text-sm flex items-center gap-2"><Clock size={14} /> 8:00 AM - Lab 2</div>
                    </div>

                    {conducta.length > 0 && (
                        <div className="mt-4 bg-white/10 p-3 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2 text-warning font-bold text-sm mb-1">
                                <AlertTriangle size={14} /> Atención: Boletas Recientes
                            </div>
                            <p className="text-xs text-slate-300">Tienes {conducta.length} reporte(s) de conducta visibles en tu expediente.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="tabs tabs-boxed bg-white shadow-sm p-1 overflow-x-auto justify-start md:justify-center">
                <a className={`tab tab-lg ${activeTab === 'grades' ? 'tab-active bg-indigo-100 text-indigo-700 font-bold' : ''}`} onClick={() => setActiveTab('grades')}>📊 Notas y Desglose</a>
                <a className={`tab tab-lg ${activeTab === 'conduct' ? 'tab-active bg-red-100 text-red-700 font-bold' : ''}`} onClick={() => setActiveTab('conduct')}>⚖️ Conducta</a>
                <a className={`tab tab-lg ${activeTab === 'resources' ? 'tab-active bg-emerald-100 text-emerald-700 font-bold' : ''}`} onClick={() => setActiveTab('resources')}>📚 Recursos</a>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">

                {/* ---------- GRADES TAB ---------- */}
                {activeTab === 'grades' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Breakdown Cards */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <Activity className="text-indigo-500" /> Trabajo Cotidiano
                            </h3>
                            <div className="space-y-4">
                                {notas.cotidiano.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <div>
                                            <div className="font-medium text-slate-700">{item.rubro}</div>
                                            <div className="text-xs text-slate-400">{item.obs || "Sin observaciones"}</div>
                                        </div>
                                        <div className={`font-bold ${item.nota < 70 ? 'text-red-500' : 'text-emerald-600'}`}>
                                            {item.nota}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <BookOpen className="text-blue-500" /> Tareas
                            </h3>
                            <div className="space-y-4">
                                {notas.tareas.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <div>
                                            <div className="font-medium text-slate-700">{item.rubro}</div>
                                            <div className={`text-xs ${item.obs?.includes("Faltó") ? 'text-red-400' : 'text-slate-400'}`}>{item.obs || "Entregado a tiempo"}</div>
                                        </div>
                                        <div className={`font-bold ${item.nota < 70 ? 'text-red-500' : 'text-emerald-600'}`}>
                                            {item.nota}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <Target className="text-purple-500" /> Pruebas
                            </h3>
                            <div className="space-y-4">
                                {notas.pruebas.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <div>
                                            <div className="font-medium text-slate-700">{item.rubro}</div>
                                            <div className="text-xs text-slate-400">{item.obs}</div>
                                        </div>
                                        <div className="font-bold text-slate-700">{item.nota}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <Trophy className="text-amber-500" /> Proyectos
                            </h3>
                            <div className="space-y-4">
                                {notas.proyecto.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                                        <div>
                                            <div className="font-medium text-slate-700">{item.rubro}</div>
                                            <div className="text-xs text-slate-400">{item.obs}</div>
                                        </div>
                                        <div className="font-bold text-emerald-600">{item.nota}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------- CONDUCT TAB ---------- */}
                {activeTab === 'conduct' && (
                    <div className="space-y-4">
                        {conducta.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-2xl border border-slate-100">
                                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-700">¡Excelente Conducta!</h3>
                                <p className="text-slate-500">No tienes rebajos de puntos en tu expediente.</p>
                            </div>
                        ) : (
                            conducta.map((bol) => (
                                <div key={bol.id} className="bg-white p-6 rounded-xl border-l-4 border-l-red-500 shadow-sm flex flex-col md:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="badge badge-error text-white font-bold">{bol.tipo}</span>
                                            <span className="text-xs text-slate-400 font-mono">{bol.fecha}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1">{bol.codigo}: {bol.descripcion}</h3>
                                        <p className="text-sm text-slate-500">Estado: <span className="font-semibold">{bol.estado}</span></p>
                                    </div>
                                    <div className="text-center min-w-[100px] bg-red-50 rounded-lg p-2 flex flex-col justify-center">
                                        <span className="text-3xl font-bold text-red-600">-{bol.puntos_rebajados}</span>
                                        <span className="text-xs font-bold text-red-400 uppercase">Puntos</span>
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="alert alert-info shadow-sm mt-8">
                            <Shield className="stroke-current shrink-0 h-6 w-6" />
                            <div>
                                <h3 className="font-bold">Reglamento de Evaluación</h3>
                                <div className="text-xs">Recuerda que la nota de conducta inicia en 100. Las faltas leves restan de 1 a 5 puntos, y las graves de 10 a 15 puntos.</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------- VISUAL LEARNING TAB (NETACAD-KILLER) ---------- */}
                {activeTab === 'resources' && (
                    <div className="space-y-8">
                        {/* FEATURED: Visual Practice */}
                        <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="badge badge-accent mb-4 font-bold">NUEVO: MOTOR VISUAL</div>
                                    <h2 className="text-3xl font-bold mb-4">Práctica Visual Dinámica</h2>
                                    <p className="text-indigo-200 mb-6">
                                        Entrena tu mente con diagramas generados por IA. Analiza circuitos, células y algoritmos en tiempo real.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => toast.promise(
                                                import('@/services/assessment-service').then(mod => mod.AssessmentService.generarQuiz({ tema: 'Célula Animal', dificultad: 'intermedio' })),
                                                {
                                                    loading: 'Generando evaluación visual...',
                                                    success: (data) => {
                                                        console.log("Quiz Generado:", data);
                                                        return "¡Evaluación Lista! (Ver consola por ahora)";
                                                    },
                                                    error: 'Error al generar'
                                                }
                                            )}
                                            className="btn btn-primary border-none bg-indigo-500 hover:bg-indigo-400 text-white"
                                        >
                                            <Zap size={18} /> Iniciar Demo Biología
                                        </button>
                                        <button className="btn btn-outline text-white hover:bg-white/10">
                                            <Video size={18} /> Ver Tutorial
                                        </button>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    {/* Placeholder for Dynamic Image - In real implementation, this would be the VisualExplainer component */}
                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                                        <div className="aspect-video bg-indigo-950/50 rounded-lg flex items-center justify-center border border-indigo-500/30">
                                            <span className="text-indigo-400 text-sm font-mono">Vista Previa: Diagrama Interactivo</span>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="h-2 bg-white/20 rounded w-3/4"></div>
                                            <div className="h-2 bg-white/10 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Domain Categories */}
                        <h3 className="font-bold text-slate-700 text-lg">Explorar por Área</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Anatomía', 'Electrónica', 'Informática', 'Matemática'].map((area) => (
                                <div key={area} className="card bg-white hover:shadow-lg transition-all cursor-pointer border border-slate-100 group">
                                    <div className="card-body p-6 flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <BookOpen size={20} />
                                        </div>
                                        <span className="font-bold text-slate-600 group-hover:text-indigo-700">{area}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
