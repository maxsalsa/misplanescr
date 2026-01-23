"use client";
import Link from 'next/link';
import { Brain, ArrowRight } from 'lucide-react';

export default function GeneradorPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Brain className="text-indigo-600" /> Generador de Planes
            </h1>
            <p className="text-slate-600 mb-6">
                Accede al generador inteligente de planeamientos MEP.
            </p>
            <Link href="/dashboard/generator" className="btn btn-primary gap-2">
                Ir al Generador IA <ArrowRight size={18} />
            </Link>
        </div>
    );
}
