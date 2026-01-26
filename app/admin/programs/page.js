"use client";
import { useState, useEffect } from "react";
import DashboardShell from "../../../components/DashboardShell";
import { Upload, FileText, RefreshCw, CheckCircle, Database } from "lucide-react";

export default function ProgramManager() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // 1. CARGAR LISTA ACTUAL DE NEON DB
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      // Necesitaremos crear este endpoint de lectura simple
      const res = await fetch("/api/programs/list"); 
      const data = await res.json();
      if(data.success) setPrograms(data.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  // 2. RE-ESCANEAR UN PROGRAMA ESPECÍFICO
  const handleReScan = async (filename, rawText) => {
    const originalText = document.getElementById(`btn-${filename}`).innerText;
    document.getElementById(`btn-${filename}`).innerText = "⏳";
    
    try {
      const res = await fetch("/api/programs/ingest", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, texto: rawText || "", provider: "OPENAI" })
      });
      const data = await res.json();
      if(data.success) {
        alert("✅ Programa actualizado con éxito en Neon DB");
        fetchPrograms(); // Recargar lista
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (e) { alert("Error de red"); }
    
    document.getElementById(`btn-${filename}`).innerText = originalText;
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Database className="text-primary" /> Gestión Curricular (MEP)
            </h1>
            <p className="text-base-content/60">Base de Datos Maestra: Neon DB</p>
          </div>
          <button className="btn btn-primary" onClick={() => alert("Función de subida de PDF en desarrollo (Fase 2)")}>
            <Upload size={18} /> Subir Nuevo PDF
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Archivo / Asignatura</th>
                  <th>Estructura (ADN)</th>
                  <th>Último Escaneo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-10">Cargando Bóveda...</td></tr>
                ) : programs.map((prog) => (
                  <tr key={prog.id}>
                    <td className="font-mono text-xs opacity-50">#{prog.id}</td>
                    <td>
                      <div className="font-bold">{prog.subject || prog.filename}</div>
                      <div className="text-xs opacity-70">{prog.filename}</div>
                    </td>
                    <td>
                      {prog.structure_json ? (
                        <div className="badge badge-success gap-1">
                           <CheckCircle size={12} /> Detectado
                        </div>
                      ) : (
                        <div className="badge badge-warning">Pendiente</div>
                      )}
                    </td>
                    <td className="text-xs">
                      {prog.last_deep_scan ? new Date(prog.last_deep_scan).toLocaleDateString() : "Nunca"}
                    </td>
                    <td>
                      <button 
                        id={`btn-${prog.filename}`}
                        onClick={() => handleReScan(prog.filename, prog.raw_text)}
                        className="btn btn-ghost btn-xs text-primary tooltip" data-tip="Re-Analizar con IA">
                        <RefreshCw size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
