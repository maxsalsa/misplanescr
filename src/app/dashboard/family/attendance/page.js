"use client";
import { useState } from "react";
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle } from "lucide-react";

// Simulated attendance data
const ATTENDANCE_DATA = [
    { date: "2026-01-13", status: "present", subject: "Matemáticas" },
    { date: "2026-01-14", status: "present", subject: "Español" },
    { date: "2026-01-15", status: "absent", subject: "Ciencias", reason: "Cita médica" },
    { date: "2026-01-16", status: "present", subject: "Estudios Sociales" },
    { date: "2026-01-17", status: "late", subject: "Inglés", reason: "Llegó 15 min tarde" },
    { date: "2026-01-20", status: "present", subject: "Educación Física" },
    { date: "2026-01-21", status: "present", subject: "Matemáticas" },
];

const STATUS_CONFIG = {
    present: { label: "Presente", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
    absent: { label: "Ausente", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    late: { label: "Tardanza", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
};

export default function FamilyAttendancePage() {
    const [selectedMonth, setSelectedMonth] = useState("2026-01");

    // Calculate stats
    const presentDays = ATTENDANCE_DATA.filter(d => d.status === "present").length;
    const absentDays = ATTENDANCE_DATA.filter(d => d.status === "absent").length;
    const lateDays = ATTENDANCE_DATA.filter(d => d.status === "late").length;
    const attendanceRate = Math.round((presentDays / ATTENDANCE_DATA.length) * 100);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">📋 Registro de Asistencia</h1>
                <p className="text-slate-500">Historial de asistencia de su hijo/a al centro educativo.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <TrendingUp className="text-indigo-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-indigo-600">{attendanceRate}%</p>
                            <p className="text-xs text-slate-500">Tasa de Asistencia</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="text-green-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{presentDays}</p>
                            <p className="text-xs text-slate-500">Días Presente</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <XCircle className="text-red-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">{absentDays}</p>
                            <p className="text-xs text-slate-500">Ausencias</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Clock className="text-amber-600" size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-600">{lateDays}</p>
                            <p className="text-xs text-slate-500">Tardanzas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning if attendance is low */}
            {attendanceRate < 80 && (
                <div className="alert alert-warning mb-6 flex items-center gap-3">
                    <AlertTriangle />
                    <span>La tasa de asistencia está por debajo del 80%. Por favor contacte al docente.</span>
                </div>
            )}

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">📅 Detalle del Mes</h2>
                    <input
                        type="month"
                        className="input input-bordered input-sm"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </div>
                <table className="table w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th>Fecha</th>
                            <th>Asignatura</th>
                            <th>Estado</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ATTENDANCE_DATA.map((record, idx) => {
                            const config = STATUS_CONFIG[record.status];
                            const Icon = config.icon;
                            return (
                                <tr key={idx} className={`${config.bg} border-b border-slate-100`}>
                                    <td className="font-medium text-slate-700">{record.date}</td>
                                    <td className="text-slate-600">{record.subject}</td>
                                    <td>
                                        <span className={`flex items-center gap-2 ${config.color}`}>
                                            <Icon size={16} /> {config.label}
                                        </span>
                                    </td>
                                    <td className="text-slate-500 text-sm">{record.reason || "-"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
