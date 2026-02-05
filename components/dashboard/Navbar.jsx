"use client";
import { useSession } from "next-auth/react";
import { Cloud, Check } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    // Simulamos la sincronización con el servicio de lib/syncService.js
    setTimeout(() => {
        setSyncing(false);
        setSynced(true);
        setTimeout(() => setSynced(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          Hola, {session?.user?.name || "Docente"}
        </h2>
        <p className="text-xs text-slate-500">
          {session?.user?.role === "ADMIN" ? "Licencia Vitalicia (Admin)" : "Plan Básico"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* BOTÓN DE REDUNDANCIA */}
        <button 
            onClick={handleSync}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${synced ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
        >
            {synced ? <Check size={14} /> : <Cloud size={14} />}
            {syncing ? "Sincronizando..." : synced ? "Nube Segura" : "Respaldar"}
        </button>
        
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
           {session?.user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </div>
  );
}