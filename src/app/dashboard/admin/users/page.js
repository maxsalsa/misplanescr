"use client";
import { useState } from "react";
import { useAuth } from '@/context/auth-context';
import { Users, Shield, GraduationCap, Home, Search, Plus, MoreVertical, Mail, Trash2 } from "lucide-react";

const ROLE_CONFIG = {
    admin: { label: "Administrador", icon: Shield, color: "badge-error" },
    teacher: { label: "Docente", icon: Users, color: "badge-primary" },
    estudiante: { label: "Estudiante", icon: GraduationCap, color: "badge-success" },
    padre: { label: "Familia", icon: Home, color: "badge-warning" },
};

export default function AdminUsersPage() {
    const { users, fetchUsers } = useAuth(); // Assuming fetchUsers is exposed or we need to reload
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    const toggleStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        const confirmMsg = newStatus === 'SUSPENDED'
            ? "⚠️ ¿ADVERTENCIA: Vas a BLOQUEAR a este usuario?\nSi es docente, sus estudiantes también perderán acceso inmediatamente."
            : "¿Reactivar usuario?";

        if (!confirm(confirmMsg)) return;

        try {
            const res = await fetch('/api/admin/users/status', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, status: newStatus })
            });

            if (res.ok) {
                // toast.success(`Usuario ${newStatus === 'ACTIVE' ? 'REACTIVADO' : 'SUSPENDIDO'}`);
                window.location.reload(); // Simple reload to refresh data for MVP
            } else {
                alert("Error al actualizar estado");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "all" || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">👥 Gestión de Usuarios</h1>
                    <p className="text-slate-500">Administra cuentas de docentes, estudiantes y familias.</p>
                </div>
                <button className="btn btn-primary gap-2">
                    <Plus size={18} /> Crear Usuario
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="select select-bordered w-full md:w-48"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                >
                    <option value="all">Todos los Roles</option>
                    <option value="admin">Administradores</option>
                    <option value="teacher">Docentes</option>
                    <option value="estudiante">Estudiantes</option>
                    <option value="padre">Familias</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(ROLE_CONFIG).map(([role, config]) => {
                    const count = users.filter(u => u.role === role).length;
                    const Icon = config.icon;
                    return (
                        <div key={role} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${config.color.replace('badge-', 'bg-').replace('primary', 'indigo-100').replace('success', 'green-100').replace('warning', 'amber-100').replace('error', 'red-100')}`}>
                                    <Icon size={20} className="text-slate-700" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-800">{count}</p>
                                    <p className="text-xs text-slate-500">{config.label}s</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map(user => {
                            const roleConfig = ROLE_CONFIG[user.role] || ROLE_CONFIG.teacher;
                            return (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-indigo-100 text-indigo-700 rounded-full w-10">
                                                    <span className="text-sm font-bold">{user.name?.charAt(0) || "?"}</span>
                                                </div>
                                            </div>
                                            <span className="font-medium text-slate-800">{user.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">{user.role}</span>
                                    </td>
                                    <td>
                                        {user.status === 'ACTIVE' ? (
                                            <span className="badge badge-success gap-2 text-white">Activo</span>
                                        ) : (
                                            <span className="badge badge-error gap-2 text-white animate-pulse">SUSPENDIDO</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleStatus(user.id, user.status)}
                                            className={`btn btn-xs ${user.status === 'ACTIVE' ? 'btn-error' : 'btn-success'} text-white`}
                                        >
                                            {user.status === 'ACTIVE' ? 'BLOQUEAR' : 'REACTIVAR'}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-sm">
                                                <MoreVertical size={16} />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-40 z-50">
                                                <li><a className="flex gap-2"><Mail size={14} /> Enviar Correo</a></li>
                                                <li><a className="flex gap-2 text-red-500"><Trash2 size={14} /> Eliminar</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-slate-400">
                                    No se encontraron usuarios con esos criterios.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
