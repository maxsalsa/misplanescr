"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle, Search, CreditCard, Shield } from "lucide-react";
import { toast } from "sonner";

// MOCK PENDING USERS
const INITIAL_REQUESTS = [
  {
    id: "req-1",
    name: "Laura Chaves",
    email: "laura.chaves@mep.go.cr",
    plan: "ANUAL_VIP",
    sinpe: "8888-0000",
    status: "PENDING",
  },
  {
    id: "req-2",
    name: "Roberto Solís",
    email: "roberto.solis@gmail.com",
    plan: "MENSUAL",
    sinpe: "7777-1111",
    status: "PENDING",
  },
];

export default function AdminLicensesPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const handleApprove = (id) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "ACTIVE" } : r)),
    );
    toast.success("Usuario activado y notificado vía Email.");
    // DATA SYNC: In real app, this calls /api/admin/approve
  };

  const handleReject = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    toast.error("Solicitud rechazada.");
  };

  return (
    <div className="p-8 min-h-screen bg-slate-900 text-slate-100">
      <div className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Shield className="text-emerald-500" />
            Centro de Comando (SuperAdmin)
          </h1>
          <p className="text-slate-500 mt-2">
            Validación de Licencias y Pagos SINPE
          </p>
        </div>
        <div className="flex gap-4">
          <div className="stat bg-slate-800 rounded-xl p-4 w-40">
            <div className="stat-title text-slate-500 text-xs uppercase font-bold">
              Ingresos Mes
            </div>
            <div className="stat-value text-emerald-400 text-2xl">₡ 85,000</div>
          </div>
        </div>
      </div>

      <div className="search-bar mb-6 relative w-full max-w-md">
        <Search className="absolute left-3 top-3 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Buscar por SINPE o Correo..."
          className="input input-bordered w-full pl-10 bg-slate-800 border-slate-700"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="table w-full">
          <thead className="bg-slate-800 text-slate-400">
            <tr>
              <th>Usuario</th>
              <th>Plan</th>
              <th>Ref. SINPE</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-slate-800/50 transition-colors"
              >
                <td>
                  <div className="font-bold text-white">{req.name}</div>
                  <div className="text-xs text-slate-500">{req.email}</div>
                </td>
                <td>
                  <span className="badge badge-info gap-2 bg-blue-500/10 text-blue-400 border-0 font-bold">
                    <CreditCard size={12} /> {req.plan}
                  </span>
                </td>
                <td className="font-mono text-slate-300">{req.sinpe}</td>
                <td>
                  {req.status === "PENDING" ? (
                    <span className="badge badge-warning text-yellow-600 bg-yellow-500/10 border-0 font-bold animate-pulse">
                      PENDIENTE
                    </span>
                  ) : (
                    <span className="badge badge-success text-emerald-500 bg-emerald-500/10 border-0 font-bold">
                      ACTIVO
                    </span>
                  )}
                </td>
                <td>
                  {req.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="btn btn-sm btn-circle btn-success text-white shadow-lg shadow-emerald-500/20"
                        title="Aprobar"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="btn btn-sm btn-circle btn-ghost text-red-400 hover:bg-red-500/10"
                        title="Rechazar"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-slate-500 italics"
                >
                  No hay solicitudes pendientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
