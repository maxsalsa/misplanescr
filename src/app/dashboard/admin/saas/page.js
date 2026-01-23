"use client";
import { useState } from "react";
import { CreditCard, TrendingUp, Users, DollarSign, Calendar, ChevronDown, RefreshCw } from "lucide-react";

// Simulated SaaS Metrics (In production, fetch from Stripe/PayPal API)
const METRICS = {
    mrr: 125000, // Monthly Recurring Revenue in Colones
    activeUsers: 47,
    trialUsers: 12,
    churnRate: 2.3,
};

const SUBSCRIPTIONS = [
    { id: 1, name: "Prof. María Jiménez", email: "maria.jimenez@mep.go.cr", plan: "Anual", status: "active", amount: 45000, nextBilling: "2027-01-15" },
    { id: 2, name: "Lic. Carlos Mora", email: "carlos.mora@ctp.cr", plan: "Mensual", status: "active", amount: 5000, nextBilling: "2026-02-01" },
    { id: 3, name: "Dra. Ana Rojas", email: "ana.rojas@mep.go.cr", plan: "Anual", status: "active", amount: 45000, nextBilling: "2026-08-20" },
    { id: 4, name: "Prof. Luis Vargas", email: "luis.vargas@gmail.com", plan: "Demo", status: "trial", amount: 0, nextBilling: "-" },
    { id: 5, name: "Msc. Patricia Solano", email: "patricia.s@colegio.cr", plan: "Mensual", status: "cancelled", amount: 5000, nextBilling: "-" },
];

const STATUS_BADGES = {
    active: { label: "Activo", color: "badge-success" },
    trial: { label: "Demo", color: "badge-warning" },
    cancelled: { label: "Cancelado", color: "badge-error" },
};

export default function AdminSaaSPage() {
    const [filter, setFilter] = useState("all");

    const filteredSubs = SUBSCRIPTIONS.filter(sub => filter === "all" || sub.status === filter);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">💳 Panel de Suscripciones (SaaS)</h1>
                    <p className="text-slate-500">Métricas de ingresos y gestión de clientes.</p>
                </div>
                <button className="btn btn-outline gap-2">
                    <RefreshCw size={16} /> Sincronizar con SINPE
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-indigo-100 text-sm">Ingresos Mensuales (MRR)</p>
                            <p className="text-3xl font-black mt-2">₡ {METRICS.mrr.toLocaleString()}</p>
                        </div>
                        <DollarSign className="opacity-50" size={32} />
                    </div>
                    <p className="text-xs mt-4 text-indigo-200 flex items-center gap-1">
                        <TrendingUp size={14} /> +12% vs mes anterior
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm">Usuarios Activos</p>
                            <p className="text-3xl font-black text-slate-800 mt-2">{METRICS.activeUsers}</p>
                        </div>
                        <Users className="text-green-500" size={28} />
                    </div>
                    <p className="text-xs mt-4 text-green-600">Suscriptores pagando</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm">En Periodo Demo</p>
                            <p className="text-3xl font-black text-amber-600 mt-2">{METRICS.trialUsers}</p>
                        </div>
                        <Calendar className="text-amber-500" size={28} />
                    </div>
                    <p className="text-xs mt-4 text-amber-600">7 días restantes promedio</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm">Tasa de Abandono</p>
                            <p className="text-3xl font-black text-red-500 mt-2">{METRICS.churnRate}%</p>
                        </div>
                        <TrendingUp className="text-red-400 rotate-180" size={28} />
                    </div>
                    <p className="text-xs mt-4 text-slate-400">Meta: &lt; 5%</p>
                </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">📋 Historial de Suscripciones</h2>
                    <select
                        className="select select-bordered select-sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="trial">Demo</option>
                        <option value="cancelled">Cancelados</option>
                    </select>
                </div>
                <table className="table w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th>Cliente</th>
                            <th>Plan</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Próximo Cobro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubs.map(sub => (
                            <tr key={sub.id} className="hover:bg-slate-50">
                                <td>
                                    <div>
                                        <p className="font-medium text-slate-800">{sub.name}</p>
                                        <p className="text-xs text-slate-400">{sub.email}</p>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${sub.plan === "Anual" ? "badge-primary" : sub.plan === "Mensual" ? "badge-secondary" : "badge-ghost"}`}>
                                        {sub.plan}
                                    </span>
                                </td>
                                <td className="font-mono text-slate-700">₡ {sub.amount.toLocaleString()}</td>
                                <td>
                                    <span className={`badge ${STATUS_BADGES[sub.status].color}`}>
                                        {STATUS_BADGES[sub.status].label}
                                    </span>
                                </td>
                                <td className="text-slate-500 text-sm">{sub.nextBilling}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
