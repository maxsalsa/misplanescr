"use client";
import Link from 'next/link';
import { FileQuestion, ArrowRight, Plus } from 'lucide-react';

export default function ExamenesPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <FileQuestion className="text-indigo-600" /> Exámenes y Evaluaciones
                </h1>
                <button className="btn btn-primary gap-2">
                    <Plus size={18} /> Crear Examen
                </button>
            </div>

            <p className="text-slate-600 mb-8">
                Genera exámenes alineados al currículo MEP con IA.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-white shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title text-lg">Prueba Corta</h2>
                        <p className="text-sm text-slate-500">5-10 preguntas rápidas</p>
                    </div>
                </div>
                <div className="card bg-white shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title text-lg">Examen Parcial</h2>
                        <p className="text-sm text-slate-500">15-25 preguntas</p>
                    </div>
                </div>
                <div className="card bg-white shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title text-lg">Examen Final</h2>
                        <p className="text-sm text-slate-500">30+ preguntas</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Link href="/dashboard/quizzes" className="btn btn-outline gap-2">
                    Ver Banco de Preguntas <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
