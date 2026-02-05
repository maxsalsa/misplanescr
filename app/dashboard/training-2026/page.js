"use client";
import { useState } from "react";
import { Award, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function Training2026Page() {
  // LISTA OFICIAL SEGÚN CIRCULAR DM-CIR-001-2026
  const officialCourses = [
    {
      id: 1,
      name: "Introducción a la IA moderna",
      provider: "CISCO / NetAcad",
    },
    {
      id: 2,
      name: "Descubriendo el Emprendimiento",
      provider: "CISCO / NetAcad",
    },
    {
      id: 3,
      name: "Conciencia sobre seguridad y protección digital",
      provider: "CISCO / NetAcad",
    },
    {
      id: 4,
      name: "Introducción a la Ciencia de Datos",
      provider: "CISCO / NetAcad",
    },
    {
      id: 5,
      name: "Introducción a Ciberseguridad",
      provider: "CISCO / NetAcad",
    },
    { id: 6, name: "Conciencia digital", provider: "CISCO / NetAcad" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Capacitación Registrada", {
      description:
        "Se ha generado el comprobante para el Anexo 1 del Director.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-20">
      {/* HEADER INFORMATIVO (EMPATÍA CON EL DOCENTE) */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex gap-4">
        <div className="bg-blue-600 text-white p-3 rounded-lg h-fit">
          <Award size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Jornada de Formación 2026
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Del <strong>9 al 20 de febrero</strong>. Registre aquí sus cursos de
            autoformación para cumplir con la circular{" "}
            <strong>DM-CIR-001-2026</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FORMULARIO DE REGISTRO */}
        <div className="card-solemn p-6">
          <h3 className="font-bold text-slate-900 mb-4">
            Registrar Curso Oficial
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-bold uppercase">
                Seleccione el Curso
              </label>
              <select className="select select-bordered bg-slate-50 w-full">
                <option value="">-- Seleccione del Catálogo Oficial --</option>
                {officialCourses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.provider})
                  </option>
                ))}
                <option value="other">Otro (Especificar)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  className="input input-bordered bg-slate-50 w-full"
                  min="2026-02-09"
                  max="2026-02-20"
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase">
                  Horas
                </label>
                <input
                  type="number"
                  className="input input-bordered bg-slate-50 w-full"
                  placeholder="Ej: 10"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold uppercase">
                Comprobante (Pantallazo/PDF)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer">
                <Upload size={20} className="mx-auto text-slate-400 mb-2" />
                <span className="text-xs text-slate-500">Subir evidencia</span>
              </div>
            </div>

            <button className="btn btn-institutional w-full">
              Registrar Avance
            </button>
          </form>
        </div>

        {/* ESTADO DE CUMPLIMIENTO */}
        <div className="space-y-4">
          <div className="card-solemn p-6 bg-slate-900 text-white border-none">
            <h3 className="font-bold text-lg mb-2">Mi Progreso</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Meta Sugerida: 40 Horas</span>
              <span className="font-bold text-emerald-400">0%</span>
            </div>
            <progress
              className="progress progress-success w-full bg-slate-700"
              value="0"
              max="40"
            ></progress>
            <p className="text-xs text-slate-400 mt-4 flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 text-yellow-500" />
              Recuerde que esta formación es obligatoria para todo el personal
              (Títulos I y II).
            </p>
          </div>

          <div className="card-solemn p-6">
            <h3 className="font-bold text-slate-900 mb-2">Enlaces Directos</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="https://matriculaidp.mep.go.cr/cursosidp/"
                  target="_blank"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  👉 Matrícula IDP
                </a>
              </li>
              <li>
                <a
                  href="https://www.netacad.com"
                  target="_blank"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  👉 CISCO NetAcad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
