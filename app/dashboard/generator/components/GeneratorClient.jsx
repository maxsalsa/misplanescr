"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Clock,
  CheckCircle,
  Search,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GeneratorClient({ officialTemplates = [] }) {
  const searchParams = useSearchParams();
  const preSelectedId = searchParams.get("templateId");

  // Step 0 if no preSelectedId, else Step 1 (Config)
  const [step, setStep] = useState(preSelectedId ? 1 : 0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (preSelectedId) {
      const tpl = officialTemplates.find((t) => t.id === preSelectedId);
      if (tpl) setSelectedTemplate(tpl);
    }
  }, [preSelectedId, officialTemplates]);

  const handleTemplateSelect = (tpl) => {
    setSelectedTemplate(tpl);
    setStep(1); // Proceed to config
  };

  const handleGenerate = () => {
    setLoading(true);
    // Simulation
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const filteredTemplates = officialTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subject?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <Sparkles className="text-purple-600" /> Generador Automático
          (Antigravity)
        </h1>
        <p className="text-slate-500">
          {step === 0
            ? "Paso 1: Seleccione una Plantilla Oficial MEP"
            : step === 1
              ? "Paso 2: Personalice su Planeamiento"
              : "Resultado"}
        </p>
      </div>

      {step === 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Search */}
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar especialidad (ej. Ciberseguridad)..."
              className="input input-bordered w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Create from Scratch Card */}
            <div
              onClick={() => setStep(1)}
              className="card bg-slate-50 border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-all group items-center justify-center p-8 text-center"
            >
              <Sparkles
                size={48}
                className="text-slate-300 group-hover:text-purple-500 mb-4 transition-colors"
              />
              <h3 className="font-bold text-slate-700 group-hover:text-purple-700">
                Crear desde Cero
              </h3>
              <p className="text-xs text-slate-500 mt-2">Solo para expertos</p>
            </div>

            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleTemplateSelect(tpl)}
                className="card bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 cursor-pointer transition-all"
              >
                <div className="card-body p-6">
                  <div className="badge badge-sm badge-secondary mb-2 opacity-80">
                    Oficial MEP
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight">
                    {tpl.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                    <BookOpen size={12} /> {tpl.subject}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
          {/* CONFIG PANEL */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold flex items-center gap-2">
                {selectedTemplate ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Sparkles size={16} />
                )}
                {selectedTemplate
                  ? "Plantilla Seleccionada"
                  : "Configuración Manual"}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {selectedTemplate ? (
                <div className="alert bg-blue-50 border-blue-200 text-blue-800 text-sm">
                  <BookOpen size={16} /> Usando:{" "}
                  <strong>{selectedTemplate.title}</strong>
                  <div className="mt-1 text-xs opacity-80">
                    Incluye estrategias DUA y Rúbricas analíticas precargadas.
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Materia / Especialidad
                  </label>
                  <select className="w-full p-2 border rounded-lg bg-slate-50">
                    <option>Seleccione una opción...</option>
                    <option>Matemáticas</option>
                    <option>Español</option>
                  </select>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Clock className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                {loading ? "Generando Planeamiento..." : "Generar con IA"}
              </button>

              <button
                onClick={() => setStep(0)}
                className="btn btn-ghost btn-sm w-full text-slate-500"
              >
                Volver a Biblioteca
              </button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 p-12 text-center">
            <p>La previsualización aparecerá aquí...</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center p-12 bg-white rounded-xl shadow-xl border border-green-100">
          <div className="inline-flex p-4 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">
            ¡Planeamiento Generado!
          </h2>
          <p className="text-slate-500 max-w-md mx-auto mt-2">
            El binomio sagrado (Docente-Estudiante) ha sido aplicado
            correctamente.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="btn btn-primary">Ver Plan PDF</button>
            <button onClick={() => setStep(0)} className="btn btn-outline">
              Crear Otro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
