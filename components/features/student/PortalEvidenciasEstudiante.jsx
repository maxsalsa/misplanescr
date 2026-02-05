"use client";
import React, { useState } from "react";
import {
  UploadCloud,
  Gamepad2,
  FileText,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import Swal from "sweetalert2";

// This component represents the Student Facing View
export default function PortalEvidenciasEstudiante({
  unitTitle = "Unidad 2: Ciberseguridad Aplicada",
}) {
  const [status, setStatus] = useState("Pendiente");
  const [uploads, setUploads] = useState([]);

  const handleFileUpload = (tipo) => {
    // Registro de evidencia vinculada al Resultado de Aprendizaje (LO)
    // Here we would trigger the upload logic (e.g. UploadThing)

    // Simulating Success
    Swal.fire({
      title: `Evidencia Recibida: ${tipo}`,
      text: "¡Excelente! Tu trabajo ha sido vinculado a tu Portafolio Digital.",
      icon: "success",
      confirmButtonColor: "var(--color-primary)",
      timer: 2000,
    });

    setStatus("Entregado");
    setUploads([
      ...uploads,
      { type: tipo, date: new Date().toLocaleTimeString() },
    ]);
  };

  return (
    <div className="bg-[#162534] p-8 rounded-[42px] border border-white/5 shadow-2xl max-w-2xl mx-auto font-sans text-white">
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">
            Mis Evidencias
          </h2>
          <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest text-[var(--color-primary-300)]">
            {unitTitle}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`badge ${status === "Entregado" ? "badge-success" : "badge-warning"} p-3 font-bold`}
          >
            {status}
          </span>
          {status === "Entregado" && (
            <span className="text-[10px] text-green-400 flex items-center gap-1">
              <Trophy size={10} /> XP Ganado
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Botones de Acción para el Estudiante */}
        <button
          onClick={() => handleFileUpload("Juego Didáctico")}
          className="btn h-28 bg-[#233344] border-2 border-transparent hover:border-[var(--color-primary)] hover:bg-[#2d3d4d] rounded-3xl flex flex-col gap-2 transition-all group"
        >
          <div className="p-2 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-purple-400" size={28} />
          </div>
          <span className="text-[10px] font-black uppercase text-slate-300 group-hover:text-white">
            Resultado de Juego
          </span>
        </button>

        <button
          onClick={() => handleFileUpload("Práctica Técnica")}
          className="btn h-28 bg-[#233344] border-2 border-transparent hover:border-[var(--color-success)] hover:bg-[#2d3d4d] rounded-3xl flex flex-col gap-2 transition-all group"
        >
          <div className="p-2 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform">
            <FileText className="text-green-400" size={28} />
          </div>
          <span className="text-[10px] font-black uppercase text-slate-300 group-hover:text-white">
            Subir Práctica
          </span>
        </button>
      </div>

      <div
        className="mt-8 p-8 bg-[var(--color-primary-900)] rounded-3xl border-2 border-white/10 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[var(--color-primary-800)] hover:border-[var(--color-primary)] transition-all group"
        onClick={() => handleFileUpload("Archivo General")}
      >
        <UploadCloud
          size={32}
          className="opacity-40 group-hover:opacity-100 group-hover:text-[var(--color-primary-300)] transition-opacity"
        />
        <span className="text-xs font-bold opacity-60 italic text-center max-w-[200px] group-hover:opacity-100">
          Arrastra aquí fotos de tus ejercicios o capturas de tus dinámicas...
        </span>
      </div>

      {/* Upload History / Log */}
      {uploads.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/5">
          <h3 className="text-[10px] uppercase font-bold opacity-50 mb-2">
            Historial de Entrega
          </h3>
          <ul className="space-y-2">
            {uploads.map((u, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-2 rounded-lg"
              >
                <CheckCircle2 size={12} className="text-green-500" />
                <span>Enviado: {u.type}</span>
                <span className="ml-auto opacity-50">{u.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
