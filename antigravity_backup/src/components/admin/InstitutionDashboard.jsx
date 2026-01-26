"use client";
import { useState } from 'react';
import { Users, UserMinus, ShieldCheck, BarChart3, Download } from 'lucide-react';

/**
 * 👨‍💼 INSTITUTION DASHBOARD
 * Exclusive view for Directors/Coordinators to manage their 50+ licenses.
 */

export default function InstitutionAdminDashboard({ institutionName, totalSlots, usedSlots, staffList }) {
    // Mock Data if not provided
    const name = institutionName || "CTP de Inteligencia Artificial";
    const max = totalSlots || 50;
    const current = usedSlots || 12;
    const [users, setUsers] = useState(staffList || [
        { id: 1, name: "Lic. Max Salazar", email: "max@mep.go.cr", active: true, plansGenerated: 145 },
        { id: 2, name: "Profa. Maria", email: "maria@mep.go.cr", active: true, plansGenerated: 89 },
        { id: 3, name: "Prof. Pedro", email: "pedro@mep.go.cr", active: true, plansGenerated: 12 },
    ]);

    const handleRevoke = (id) => {
        if (!confirm("¿Seguro que desea desvincular a este docente? Se liberará 1 licencia.")) return;
        setUsers(users.filter(u => u.id !== id));
        // Call API revokeLicense...
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-end mb-8 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-black text-[#003366] mb-1">{name}</h1>
                    <p className="text-slate-500 font-bold flex gap-2 items-center">
                        <ShieldCheck size={18} className="text-success" /> Panel de Control de Licencias (B2B)
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-slate-400 uppercase">Estado del Paquete</div>
                    <div className="text-4xl font-black text-primary">{current} <span className="text-lg text-slate-400 font-normal">/ {max}</span></div>
                    <div className="text-xs text-slate-500">Licencias Activas</div>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="stat bg-white shadow-sm border rounded-xl">
                    <div className="stat-figure text-primary"><Users size={32} /></div>
                    <div className="stat-title">Docentes Activos</div>
                    <div className="stat-value">{users.length}</div>
                    <div className="stat-desc">Planilla Total</div>
                </div>
                <div className="stat bg-white shadow-sm border rounded-xl">
                    <div className="stat-figure text-secondary"><BarChart3 size={32} /></div>
                    <div className="stat-title">Planes Generados</div>
                    <div className="stat-value text-secondary">2,450</div>
                    <div className="stat-desc">Total acumulado</div>
                </div>
                <div className="stat bg-white shadow-sm border rounded-xl">
                    <div className="stat-figure text-accent"><ShieldCheck size={32} /></div>
                    <div className="stat-title">Cumplimiento</div>
                    <div className="stat-value text-accent">92%</div>
                    <div className="stat-desc">Docentes con Plan al día</div>
                    <progress className="progress progress-accent w-20" value="92" max="100"></progress>
                </div>
                <div className="stat bg-white shadow-sm border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="stat-figure text-info"><Download size={32} /></div>
                    <div className="stat-title">Auditoría</div>
                    <div className="stat-value text-info text-lg">Reporte.xlsx</div>
                    <div className="stat-desc">Descargar datos por Nivel</div>
                </div>
            </div>

            {/* ROSTER TABLE */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-100 font-bold border-b flex justify-between items-center">
                    <span>Nómina Docente</span>
                    <span className="badge badge-warning">Token Maestro: CTP-IA-2026</span>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Docente</th>
                            <th>Email Institucional</th>
                            <th>Uso (Planes)</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50">
                                <td className="font-bold">{u.name}</td>
                                <td className="text-slate-500">{u.email}</td>
                                <td>{u.plansGenerated}</td>
                                <td><span className="badge badge-success badge-sm">Activo</span></td>
                                <td>
                                    <button onClick={() => handleRevoke(u.id)} className="btn btn-xs btn-error btn-outline gap-1">
                                        <UserMinus size={12} /> Revocar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
