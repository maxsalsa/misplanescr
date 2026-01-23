"use client";
import React, { useState } from 'react';
import { useGroups } from '@/context/groups-context';
import { CalendarCheck, ChevronLeft, ChevronRight, UserCheck, XCircle, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AttendancePage() {
    const { groups, markAttendance } = useGroups();
    const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || '');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const activeGroup = groups.find(g => g.id === selectedGroupId);

    // Agile Toggle Logic: Present -> Absent -> Late -> Present
    const nextStatus = (current) => {
        if (!current || current === 'P') return 'A';
        if (current === 'A') return 'T';
        if (current === 'T') return 'J'; // Justified
        return 'P';
    };

    const handleToggle = (studentId, currentStatus) => {
        const next = nextStatus(currentStatus);
        markAttendance(selectedGroupId, studentId, selectedDate, next);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'P': return <CheckCircle className="text-emerald-500" size={24} />;
            case 'A': return <XCircle className="text-red-500" size={24} />;
            case 'T': return <Clock className="text-amber-500" size={24} />;
            case 'J': return <UserCheck className="text-blue-500" size={24} />;
            default: return <div className="w-6 h-6 rounded-full border-2 border-slate-300" />;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'P': return 'Presente';
            case 'A': return 'Ausente';
            case 'T': return 'Tardía';
            case 'J': return 'Justificada';
            default: return 'Sin Registro';
        }
    };

    const getRowColor = (status) => {
        switch (status) {
            case 'P': return 'bg-emerald-50 border-emerald-100';
            case 'A': return 'bg-red-50 border-red-100';
            case 'T': return 'bg-amber-50 border-amber-100';
            case 'J': return 'bg-blue-50 border-blue-100';
            default: return 'bg-white border-slate-100';
        }
    };

    if (groups.length === 0) return <div className="p-8 text-center text-slate-500">Primero crea un grupo en la sección "Mis Grupos".</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <CalendarCheck className="text-indigo-600" /> Control de Asistencia
                </h1>
                <p className="text-sm text-slate-500">Toque el estado para cambiarlo rápidamente.</p>
            </div>

            {/* Controls */}
            <div className="card bg-white shadow-sm p-4 flex flex-col gap-4">
                <select
                    className="select select-bordered w-full font-bold text-lg"
                    value={selectedGroupId}
                    onChange={e => setSelectedGroupId(e.target.value)}
                >
                    {groups.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>

                <div className="flex justify-between items-center bg-slate-100 rounded-lg p-2">
                    <button className="btn btn-circle btn-ghost btn-sm" onClick={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() - 1);
                        setSelectedDate(d.toISOString().split('T')[0]);
                    }}>
                        <ChevronLeft />
                    </button>
                    <span className="font-mono font-bold text-slate-600">
                        {format(new Date(selectedDate), "EEEE d 'de' MMMM", { locale: es })}
                    </span>
                    <button className="btn btn-circle btn-ghost btn-sm" onClick={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() + 1);
                        setSelectedDate(d.toISOString().split('T')[0]);
                    }}>
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {activeGroup?.students.map(student => {
                    const status = student.attendance?.[selectedDate];
                    return (
                        <div
                            key={student.id}
                            onClick={() => handleToggle(student.id, status)}
                            className={`flex items-center justify-between p-4 rounded-xl border-l-4 shadow-sm cursor-pointer transition-all active:scale-95 select-none ${getRowColor(status)}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="avatar placeholder">
                                    <div className="bg-slate-200 text-slate-500 rounded-full w-10">
                                        <span className="text-xs font-bold">{student.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-700">{student.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono transition-colors">
                                        {status ? getStatusLabel(status) : 'Toque para marcar'}
                                    </p>
                                </div>
                            </div>
                            <div className="opacity-80">
                                {getStatusIcon(status)}
                            </div>
                        </div>
                    );
                })}
                {activeGroup?.students.length === 0 && (
                    <div className="text-center py-10 text-slate-400 italic">Este grupo no tiene estudiantes.</div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 justify-center mt-8">
                <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => activeGroup.students.forEach(s => markAttendance(selectedGroupId, s.id, selectedDate, 'P'))}
                >
                    Todos Presentes
                </button>
            </div>
        </div>
    );
}
