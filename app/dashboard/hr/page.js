"use client";
import React, { useState } from "react";
import { Clock, AlertTriangle, FileText, CheckCircle } from "lucide-react";

export default function HRPage() {
  const [incidents, setIncidents] = useState([
    { id: 1, type: "Ausencia Injustificada", date: "10/02/2026", status: "PROCESADO", reason: "Cita médica no comprobada" },
    { id: 2, type: "Llegada Tardía", date: "12/02/2026", status: "PENDIENTE", reason: "Presa en Ruta 32" }
  ]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Justificación enviada (Simulación)");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Gestión de Recursos Humanos</h1>
      
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Clock size={24} /></div>
          <div><h3 className="font-bold text-2xl">2</h3><p className="text-xs text-slate-500">Llegadas Tardías</p></div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold bg-slate-50">Historial de Incidencias</div>
        {incidents.map((inc) => (
          <div key={inc.id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-slate-400" />
              <div>
                <p className="font-bold text-slate-700 text-sm">{inc.type}</p>
                <p className="text-xs text-slate-400">{inc.date}</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">{inc.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}