"use client";
import Link from 'next/link';
import { GraduationCap, ArrowRight, Users } from 'lucide-react';

export default function EstudiantesPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <GraduationCap className="text-indigo-600" /> Mis Estudiantes
            </h1>
            <p className="text-slate-600 mb-6">
                Gestiona tus grupos y estudiantes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/dashboard/groups" className="card bg-white shadow-md hover:shadow-lg transition-shadow">
                    <div className="card-body">
                        <Users className="text-blue-600 w-12 h-12 mb-2" />
                        <h2 className="card-title">Mis Grupos</h2>
                        <p>Administra tus secciones y grupos de clase.</p>
                        <div className="card-actions justify-end">
                            <span className="btn btn-sm btn-ghost gap-1">
                                Ir <ArrowRight size={16} />
                            </span>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/students" className="card bg-white shadow-md hover:shadow-lg transition-shadow">
                    <div className="card-body">
                        <GraduationCap className="text-green-600 w-12 h-12 mb-2" />
                        <h2 className="card-title">Lista de Estudiantes</h2>
                        <p>Consulta y gestiona datos de tus estudiantes.</p>
                        <div className="card-actions justify-end">
                            <span className="btn btn-sm btn-ghost gap-1">
                                Ir <ArrowRight size={16} />
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
