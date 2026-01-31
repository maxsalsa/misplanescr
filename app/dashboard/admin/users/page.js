"use client";
import { useState } from "react";
import { Search, UserCheck, UserX, Shield, DollarSign, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function UserManagementPage() {
  // SIMULACIÓN DE DATOS (ESTO VENDRÍA DE NEON DB)
  const [users, setUsers] = useState([
    { id: 1, name: "Ana Gomez", email: "ana@mep.go.cr", status: "ACTIVE", plan: "PRO", end: "2026-03-23" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@gmail.com", status: "INACTIVE", plan: "FREE", end: "2026-01-20" },
  ]);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const action = newStatus === "ACTIVE" ? "Activado" : "Suspendido";
    
    // AQUÍ IRÍA LA LLAMADA A LA API PARA GUARDAR EN NEON DB
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    
    if(newStatus === "ACTIVE") {
      toast.success(`Usuario ${action}`, { description: "Acceso concedido por 30 días (Pago SINPE Verificado)." });
    } else {
      toast.warning(`Usuario ${action}`, { description: "El acceso ha sido revocado inmediatamente." });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      
      <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
        <div>
           <h1 className="text-3xl font-black flex items-center gap-2">
             <Shield className="text-emerald-400"/> Control Maestro de Usuarios
           </h1>
           <p className="text-slate-400 text-sm">Gestión de Suscripciones y Accesos (SINPE Móvil).</p>
        </div>
        <div className="stats bg-slate-800 text-white border-none">
          <div className="stat">
            <div className="stat-title text-slate-400">Ingresos Activos</div>
            <div className="stat-value text-emerald-400">₡ 450.000</div>
          </div>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="flex gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-slate-400" size={20}/>
          <input type="text" placeholder="Buscar por correo o nombre..." className="input input-bordered w-full pl-10 bg-white" />
        </div>
        <button className="btn btn-institutional">Filtrar Morosos</button>
      </div>

      {/* TABLA DE CONTROL */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-600 uppercase text-xs">
              <th>Usuario</th>
              <th>Plan / Vencimiento</th>
              <th>Estado Financiero</th>
              <th>Acción Maestra</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-10">
                        <span className="font-bold">{user.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="badge badge-sm badge-ghost font-bold">{user.plan}</span>
                    <span className="text-[10px] flex items-center gap-1 text-slate-400">
                      <Calendar size={10}/> Vence: {user.end}
                    </span>
                  </div>
                </td>
                <td>
                  {user.status === "ACTIVE" ? (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                      <DollarSign size={14}/> AL DÍA
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-lg w-fit">
                      <UserX size={14}/> SUSPENDIDO
                    </div>
                  )}
                </td>
                <td>
                  <button 
                    onClick={() => toggleStatus(user.id, user.status)}
                    className={`btn btn-sm w-32 border-none text-white ${user.status === "ACTIVE" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
                  >
                    {user.status === "ACTIVE" ? "REVOCAR" : "ACTIVAR"}
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