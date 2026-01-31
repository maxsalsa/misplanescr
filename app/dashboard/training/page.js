"use client";
import { useState } from "react";
import { Award, BookOpen, Upload, CheckCircle } from "lucide-react";

export default function TrainingPage() {
  // Cursos oficiales citados en Circular DM-CIR-001-2026
  const officialCourses = [
    "Introducción a la IA moderna (NetAcad)",
    "Descubriendo el Emprendimiento",
    "Conciencia sobre seguridad digital",
    "Introducción a la Ciencia de Datos",
    "Introducción a Ciberseguridad"
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-lg"><Award size={32} className="text-yellow-400" /></div>
          <div>
            <h1 className="text-3xl font-black">Formación Permanente 2026</h1>
            <p className="text-blue-200 mt-2 max-w-2xl">
              Registre aquí su participación en las jornadas de febrero (DM-CIR-001-2026).
              Esta evidencia digital respalda su expediente ante la Dirección.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORMULARIO DE REGISTRO */}
        <div className="lg:col-span-2 card-solemn p-8">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" /> Inclusión de Actividad Formativa
          </h3>
          <form className="space-y-6">
            <div className="form-control">
              <label className="label text-xs font-bold uppercase">Denominación de la Actividad</label>
              <input list="courses" className="input input-bordered bg-slate-50 w-full" placeholder="Seleccione o escriba..." />
              <datalist id="courses">
                {officialCourses.map(c => <option key={c} value={c} />)}
              </datalist>
              <span className="text-[10px] text-slate-400 mt-1">Oferta académica validada IDP/CISCO 2026</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase">Periodo (09/02 - 20/02)</label>
                <input type="date" className="input input-bordered bg-slate-50 w-full" />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase">Carga Horaria Acreditada</label>
                <input type="number" className="input input-bordered bg-slate-50 w-full" placeholder="Ej: 40" />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold uppercase">Evidencia Documental</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">Click para subir archivo</span>
              </div>
            </div>

            <button className="btn btn-institutional w-full">Consignar en Expediente Digital</button>
          </form>
        </div>

        {/* RESUMEN DE AVANCE */}
        <div className="space-y-6">
          <div className="card-solemn p-6 bg-blue-50 border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Indicador de Avance Mensual</h4>
            <div className="flex justify-between text-sm mb-1">
              <span>Progreso</span>
              <span className="font-bold">40%</span>
            </div>
            <progress className="progress progress-primary w-full" value="40" max="100"></progress>
            <p className="text-xs text-blue-700 mt-2">Recuerde completar los cursos de autoformación si tiene lecciones libres.</p>
          </div>

          <div className="card-solemn p-6">
            <h4 className="font-bold text-slate-900 mb-4">Historial de Formación</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle size={16} className="text-emerald-500 mt-1" />
                <div>
                  <p className="text-sm font-bold text-slate-700">Conciencia Digital</p>
                  <p className="text-xs text-slate-400">CISCO • 10 Horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}