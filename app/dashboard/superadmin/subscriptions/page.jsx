"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function SubscriptionManager() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Docente Ejemplo', email: 'profe@mep.go.cr', status: 'PENDING', sinpe: '60906359' },
        { id: 2, name: 'Max Salazar', email: 'admin@misplanescr.com', status: 'SUPER_ADMIN', sinpe: 'N/A' }
    ]);

    const handleActivate = (id) => {
        // Lógica de Antigravity: Inyección directa a Neon DB (Simulada)
        // REGLA DE NEGOCIO: Solo activar tras verificar comprobante SINPE (60906359)
        const confirmed = window.confirm("¿Ha verificado el comprobante SINPE por ₡3,500?");
        if (!confirmed) return;

        setUsers(users.map(u => u.id === id ? { ...u, status: 'ACTIVE' } : u));
        toast.success(`Usuario activado. Acceso Premium concedido.`);
    };

    return (
        <div className="p-6 bg-base-100 rounded-2xl shadow-xl border border-primary/20">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                👑 Panel de Control SINPE (SuperAdmin)
            </h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th>Docente</th>
                            <th>Estado</th>
                            <th>SINPE</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-xs opacity-50">{user.email}</div>
                                </td>
                                <td>
                                    <span className={`badge ${user.status === 'ACTIVE' || user.status === 'SUPER_ADMIN' ? 'badge-success text-white' : 'badge-warning text-white'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="font-mono">{user.sinpe}</td>
                                <td>
                                    {user.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleActivate(user.id)}
                                            className="btn btn-sm btn-primary text-white shadow-md shadow-blue-500/20"
                                        >
                                            Validar Pago
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
