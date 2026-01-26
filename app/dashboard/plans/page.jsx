"use client";
import React from 'react';
import { FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// HUB: MIS PLANEAMIENTOS
export default function PlansHub() {
    return (
        <div className="p-8 min-h-screen bg-slate-50/50">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <FileText className="text-primary" />
                        Mis Planeamientos
                    </h1>
                    <p className="text-slate-500">Gestión centralizada de recursos didácticos.</p>
                </div>
                <Link href="/dashboard/generator" className="btn btn-primary gap-2 text-white shadow-lg shadow-blue-500/30">
                    <PlusCircle size={20} /> Nuevo Planeamiento
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Empty State / Mock */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-400">
                    <FileText size={48} className="mb-4 opacity-50" />
                    <p>No hay planeamientos activos este mes.</p>
                </div>
            </div>
        </div>
    );
}
