"use client";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Smile, Battery, Brain, Clock } from "lucide-react";

export default function InclusionPage() {
    const [activeTab, setActiveTab] = useState("pausas");

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Hub de Inclusión y DUA</h2>
                <p className="text-slate-500 text-lg">Herramientas especializadas para apoyar la diversidad en el aula.</p>
            </div>

            <div className="tabs tabs-boxed bg-slate-100 p-1">
                <a className={`tab tab-lg ${activeTab === 'pausas' ? 'tab-active bg-emerald-500 text-white !rounded-lg' : ''}`} onClick={() => setActiveTab('pausas')}>Pausas Activas</a>
                <a className={`tab tab-lg ${activeTab === 'tea' ? 'tab-active bg-indigo-500 text-white !rounded-lg' : ''}`} onClick={() => setActiveTab('tea')}>Apoyo TEA/Asperger</a>
                <a className={`tab tab-lg ${activeTab === 'altadotacion' ? 'tab-active bg-amber-500 text-white !rounded-lg' : ''}`} onClick={() => setActiveTab('altadotacion')}>Alta Dotación</a>
            </div>

            <div className="mt-6">
                {activeTab === 'pausas' && <ActiveBreaksModule />}
                {activeTab === 'tea' && <TEAModule />}
                {activeTab === 'altadotacion' && <HighPotentialModule />}
            </div>
        </div>
    );
}

function ActiveBreaksModule() {
    const [timer, setTimer] = useState(300); // 5 minutes
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="card glass-card p-8 text-center space-y-6">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2 text-slate-700">
                    <Clock size={24} /> Temporizador de Pausa
                </h3>
                <div className="text-7xl font-black text-slate-800 font-mono tracking-tighter">
                    {formatTime(timer)}
                </div>
                <div className="flex justify-center gap-4">
                    <button className="btn btn-circle btn-lg btn-primary" onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                    <button className="btn btn-circle btn-ghost" onClick={() => { setIsRunning(false); setTimer(300); }}>
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <div className="card bg-white shadow-lg border border-slate-100 p-6">
                <h3 className="font-bold text-lg mb-4 text-emerald-600 flex items-center gap-2">
                    <Battery size={20} /> Sugerencias de Actividad
                </h3>
                <div className="carousel w-full gap-4">
                    <div className="carousel-item w-full flex-col bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <span className="badge badge-success mb-2">Física</span>
                        <h4 className="font-bold text-lg">Estiramiento de Gato</h4>
                        <p className="text-slate-600 mt-2">Pide a los estudiantes que se levanten, entrelacen los dedos y estiren los brazos hacia arriba mientras respiran profundo por 5 segundos.</p>
                    </div>
                    <div className="carousel-item w-full flex-col bg-sky-50 p-6 rounded-xl border border-sky-100">
                        <span className="badge badge-info mb-2">Mental</span>
                        <h4 className="font-bold text-lg">Veo Veo (Colores)</h4>
                        <p className="text-slate-600 mt-2">Busca 3 objetos de color ROJO en el aula y nómbralos en silencio. Ayuda a re-enfocar la atención visual.</p>
                    </div>
                </div>
                <div className="flex justify-center w-full py-2 gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
}

function TEAModule() {
    const steps = [
        { icon: "🎒", text: "Entrada y Saludo", time: "7:00 AM" },
        { icon: "📖", text: "Lección de Mate", time: "7:15 AM" },
        { icon: "🍎", text: "Recreo", time: "8:35 AM" },
        { icon: "🎨", text: "Trabajo en Grupo", time: "9:00 AM" },
    ];

    return (
        <div className="space-y-6">
            <div className="alert bg-indigo-50 border-indigo-100 text-indigo-900">
                <Smile size={24} />
                <div>
                    <h3 className="font-bold">Modo Anticipación</h3>
                    <div className="text-sm">Las agendas visuales reducen la ansiedad al proporcionar estructura clara y predecible.</div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <h3 className="card-title mb-4">Agenda Visual del Día (Imprimible)</h3>
                    <div className="flex flex-wrap gap-4">
                        {steps.map((s, i) => (
                            <div key={i} className="flex flex-col items-center bg-white border-2 border-slate-200 rounded-xl p-4 w-32 hover:border-indigo-400 hover:scale-105 transition cursor-pointer shadow-sm">
                                <div className="text-4xl mb-2">{s.icon}</div>
                                <div className="font-bold text-center leading-tight text-slate-800">{s.text}</div>
                                <div className="text-xs text-slate-400 mt-2 font-mono bg-slate-100 px-2 py-0.5 rounded">{s.time}</div>
                            </div>
                        ))}
                        <button className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-4 w-32 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition">
                            <div className="text-2xl mb-1">+</div>
                            <div className="text-xs font-bold">Agregar</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HighPotentialModule() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-amber-50 border border-amber-100 p-6">
                <h3 className="font-bold text-amber-900 text-lg flex items-center gap-2">
                    <Brain size={20} /> Banco de Retos (Enriquecimiento)
                </h3>
                <p className="text-amber-800/80 mt-2 mb-4">Actividades de mayor complejidad para estudiantes que terminan rápido o requieren mayor desafío.</p>

                <div className="space-y-3">
                    <div className="collapse collapse-plus bg-white rounded-lg border border-amber-200/50">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium text-amber-900">Reto Matemático: La Conjetura</div>
                        <div className="collapse-content text-sm text-slate-600">
                            <p>Investiga qué es la conjetura de Goldbach y verifica si se cumple para los números pares entre 50 y 100.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-white rounded-lg border border-amber-200/50">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium text-amber-900">Proyecto: Diseño Sostenible</div>
                        <div className="collapse-content text-sm text-slate-600">
                            <p>Diseña un sistema de recolección de lluvia para el colegio, calculando el volumen potencial basado en el área del techo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
