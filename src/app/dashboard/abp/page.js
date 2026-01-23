"use client";
import { Lightbulb, Target, Users, Clock } from 'lucide-react';

export default function ABPPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Lightbulb className="text-amber-500" /> Aprendizaje Basado en Proyectos
            </h1>
            <p className="text-slate-600 mb-8">
                Genera proyectos interdisciplinarios alineados al MEP.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-white shadow-md">
                    <div className="card-body">
                        <Target className="text-indigo-600 w-10 h-10 mb-2" />
                        <h2 className="card-title">Objetivos Claros</h2>
                        <p>Define los resultados de aprendizaje esperados.</p>
                    </div>
                </div>
                <div className="card bg-white shadow-md">
                    <div className="card-body">
                        <Users className="text-green-600 w-10 h-10 mb-2" />
                        <h2 className="card-title">Trabajo Colaborativo</h2>
                        <p>Fomenta el trabajo en equipo entre estudiantes.</p>
                    </div>
                </div>
                <div className="card bg-white shadow-md">
                    <div className="card-body">
                        <Clock className="text-blue-600 w-10 h-10 mb-2" />
                        <h2 className="card-title">Cronograma</h2>
                        <p>Planifica las fases del proyecto.</p>
                    </div>
                </div>
                <div className="card bg-white shadow-md">
                    <div className="card-body">
                        <Lightbulb className="text-amber-500 w-10 h-10 mb-2" />
                        <h2 className="card-title">Innovación</h2>
                        <p>Integra metodologías activas.</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button className="btn btn-primary btn-lg w-full">
                    Crear Nuevo Proyecto ABP
                </button>
            </div>
        </div>
    );
}
