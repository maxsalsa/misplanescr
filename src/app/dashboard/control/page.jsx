"use client";
import React from 'react';
import { Users, GraduationCap } from 'lucide-react';
import { useGroups } from '@/context/groups-context';

export default function GroupConsole() {
    const { groups } = useGroups();

    return (
        <div className="p-8 min-h-screen bg-slate-50/50">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Users className="text-primary" />
                    Consola de Grupos
                </h1>
                <p className="text-slate-500">Gestión de Estudiantes y Conducta.</p>
            </div>

            <div className="grid gap-4">
                {groups.map(group => (
                    <div key={group.id} className="card bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="card-body flex-row justify-between items-center">
                            <div>
                                <h2 className="card-title text-slate-800">{group.name}</h2>
                                <p className="text-slate-500 text-sm">{group.grade} • {group.students.length} Estudiantes</p>
                            </div>
                            <button className="btn btn-ghost btn-sm">Gestionar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
