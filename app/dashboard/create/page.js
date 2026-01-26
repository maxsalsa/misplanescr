"use client";
import { useState, useEffect } from "react";
import { Sparkles, AlertTriangle, FileText, Download, Save, Trash2, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { generatePlanAction } from "@/app/actions/generate";
import { getTeacherGroups } from "@/app/actions/planning";
import { MEP_DATA } from "@/lib/mep-data";

export default function GeneradorPage() {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  // ESTADO DEL FORMULARIO - CURRICULAR LOGIC V17
  const [formState, setFormState] = useState({
    selectedGroup: "", // Nombre del grupo
    modality: "",      // "Secundaria Académica", etc.
    level: "",         // "7", "10", etc.
    period: "I Periodo", // Default
    subject: "",       // "Matemáticas"
    unit: "",          // "Unidad 1..." (Optional)
    learningItem: "",  // ID or Text of selected outcome
    topic: ""          // User custom detail
  });

  // OPCIONES DINÁMICAS (Calculadas al vuelo)
  const modalities = Object.keys(MEP_DATA);
  const levels = formState.modality ? Object.keys(MEP_DATA[formState.modality] || {}) : [];
  const periods = (formState.modality && formState.level) ? Object.keys(MEP_DATA[formState.modality][formState.level] || {}) : [];
  const subjects = (formState.modality && formState.level && formState.period) ? Object.keys(MEP_DATA[formState.modality][formState.level][formState.period] || {}) : [];

  // Drill down to content (Array of objects or empty)
  const curricularContent = (formState.modality && formState.level && formState.period && formState.subject)
    ? MEP_DATA[formState.modality][formState.level][formState.period][formState.subject]
    : [];

  // Helper: Is curricularContent structured with Units? (Check if it's an object with keys or array)
  // Based on MEP_DATA structure, sometimes it's an array of items directly, sometimes it's an object with specialtys.
  // Inspection of MEP_DATA: Primary/Academic is Array. Technical is Object (Specialty -> Units).
  // This needs robust handling.

  const [generatedPlan, setGeneratedPlan] = useState(null);

  // 1. CARGA INICIAL
  useEffect(() => {
    getTeacherGroups().then(setGroups);
    const savedDraft = localStorage.getItem("aulaplan_draft_v2");
    if (savedDraft) {
      try {
        setFormState(JSON.parse(savedDraft));
        toast("Borrador Recuperado", { description: "Datos curriculares restaurados.", icon: <Save size={14} /> });
      } catch (e) { }
    }
  }, []);

  // 2. AUTO-GUARDADO
  useEffect(() => {
    if (formState.topic || formState.subject) {
      const timer = setTimeout(() => {
        localStorage.setItem("aulaplan_draft_v2", JSON.stringify(formState));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formState]);

  // MANEJADORES DE CAMBIO (CASCADA)
  const handleModalityChange = (e) => {
    setFormState({ ...formState, modality: e.target.value, level: "", period: "I Periodo", subject: "", unit: "", learningItem: "" });
  };

  const handleLevelChange = (e) => {
    setFormState({ ...formState, level: e.target.value, period: "I Periodo", subject: "", unit: "", learningItem: "" });
  };

  const handlePeriodChange = (e) => {
    setFormState({ ...formState, period: e.target.value, subject: "", unit: "", learningItem: "" });
  };

  const handleSubjectChange = (e) => {
    setFormState({ ...formState, subject: e.target.value, unit: "", learningItem: "" });
  };

  const handleTopicChange = (e) => {
    setFormState({ ...formState, topic: e.target.value });
  };

  const handleGroupChange = (e) => {
    setFormState({ ...formState, selectedGroup: e.target.value });
    const g = groups.find(x => x.name === e.target.value);
    if (g?.has7600) toast("Alerta de Inclusión", { description: "Grupo con adecuaciones activas.", icon: <AlertTriangle className="text-orange-500" /> });
  };

  const handleContentSelect = (item) => {
    // Auto-fill topic with learning outcome
    setFormState({
      ...formState,
      learningItem: item.id,
      unit: item.unit || "",
      topic: item.aprendizaje + ". " + (item.saberes?.join(", ") || "")
    });
    toast.success("Contenido Vinculado", { description: "Objetivo y Saberes cargados al tema." });
  };

  const handleLimpiar = () => {
    if (confirm("¿Reiniciar generador?")) {
      setFormState({ selectedGroup: "", modality: "", level: "", period: "I Periodo", subject: "", unit: "", learningItem: "", topic: "" });
      localStorage.removeItem("aulaplan_draft_v2");
      setGeneratedPlan(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedPlan(null);

    const groupObj = groups.find(g => g.name === formState.selectedGroup);

    // Preparar Contexto de Inclusión
    const inclusionData = groupObj ?
      `${groupObj.has7600 ? "Ley 7600. " : ""}${groupObj.isGifted ? "Alta Dotación." : ""}`
      : "";

    // Construir un "Tema Rico" para la IA
    const richTopic = `
        [Contexto Curricular]
        Modalidad: ${formState.modality}
        Nivel: ${formState.level}
        Unidad: ${formState.unit || "N/A"}
        Aprendizaje Esperado: ${formState.learningItem ? formState.topic : "Definido por usuario"}
        
        [Detalle del Docente]
        ${formState.topic}
    `.trim();

    const payload = {
      subject: formState.subject,
      grade: formState.level || formState.selectedGroup, // Fallback to group name if level empty
      duration: "Semanal", // Default for now
      topic: richTopic,
      nivel: formState.level, // Clean level for DB search
      materia: formState.subject, // Clean subject
      inclusionContext: inclusionData
    };

    try {
      const result = await generatePlanAction(payload);
      if (result.success) {
        setGeneratedPlan(result.html);
        toast.success("Planeamiento Generado", { description: "Normativa MEP aplicada correctamente." });
      } else {
        toast.error("Error de Generación", { description: result.error });
      }
    } catch (err) {
      toast.error("Error Crítico", { description: "No se pudo conectar con el motor IA." });
    }
    setLoading(false);
  };

  // RENDER HELPERS
  const renderCurricularList = () => {
    // If it's an array (Standard Subjects)
    if (Array.isArray(curricularContent)) {
      if (curricularContent.length === 0) return <p className="text-xs text-slate-400 italic p-2">Seleccione una asignatura...</p>;
      return (
        <div className="space-y-2 max-h-60 overflow-y-auto border border-slate-100 rounded p-2 bg-slate-50/50">
          {curricularContent.map((item) => (
            <div kery={item.id} onClick={() => handleContentSelect(item)} className="p-2 bg-white border border-slate-200 rounded hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group">
              <p className="text-xs font-bold text-slate-700 group-hover:text-blue-700">{item.aprendizaje}</p>
              <p className="text-[10px] text-slate-500 truncate">{item.saberes?.join(", ")}</p>
            </div>
          ))}
        </div>
      );
    }
    // If it's an object (Technical Specialties like "Desarrollo Web")
    else if (typeof curricularContent === 'object') {
      // We need to drill down deeper or show subunits.
      // For simplicity in V17, we flatten the object keys (Modules/Units) to list
      const subAreas = Object.keys(curricularContent);
      return (
        <div className="space-y-4">
          {subAreas.map(sub => {
            const units = curricularContent[sub]; // Array
            return (
              <div key={sub} className="border border-slate-200 rounded-lg p-3 bg-white">
                <h4 className="text-xs font-black uppercase text-slate-400 mb-2">{sub}</h4>
                <div className="space-y-2">
                  {Array.isArray(units) && units.map(u => (
                    <div key={u.id} onClick={() => handleContentSelect(u)} className="p-2 bg-slate-50 hover:bg-blue-50 border border-slate-100 rounded cursor-pointer">
                      <span className="badge badge-xs badge-neutral mb-1">{u.unit || "Unidad"}</span>
                      <p className="text-xs font-medium text-slate-700">{u.aprendizaje}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 fade-in animate-in">

      {/* HEADER V17 */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BookOpen className="text-blue-700" size={32} />
            Generador Curricular
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Motor Pedagógico Oficial • MEP Costa Rica</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleLimpiar} className="btn btn-ghost btn-sm text-slate-400 gap-2 hover:bg-red-50 hover:text-red-600">
            <Trash2 size={16} /> Reiniciar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* PANEL IZQUIERDO: CONFIGURACIÓN (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="card bg-white shadow-xl shadow-slate-200/40 border border-slate-200 sticky top-24">
            <div className="card-body p-6 space-y-4">

              {/* 1. GRUPO & INCLUSIÓN */}
              <div className="form-control">
                <label className="label text-xs font-bold text-slate-500 uppercase">1. Seleccionar Grupo</label>
                <select
                  className="select select-bordered w-full bg-slate-50 font-medium"
                  value={formState.selectedGroup}
                  onChange={handleGroupChange}
                  required
                >
                  <option value="">-- Mis Grupos --</option>
                  {groups.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                </select>
              </div>

              <div className="divider my-0"></div>

              {/* 2. LOGICA CURRICULAR (CASCADING) */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">2. Estructura MEP</span>

                <div className="grid grid-cols-2 gap-3">
                  <select className="select select-bordered select-sm w-full" value={formState.modality} onChange={handleModalityChange} required>
                    <option value="">Modalidad...</option>
                    {modalities.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>

                  <select className="select select-bordered select-sm w-full" value={formState.level} onChange={handleLevelChange} disabled={!formState.modality} required>
                    <option value="">Nivel...</option>
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <select className="select select-bordered select-sm w-full" value={formState.period} onChange={handlePeriodChange} disabled={!formState.level} required>
                  {periods.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <select className="select select-bordered w-full font-medium" value={formState.subject} onChange={handleSubjectChange} disabled={!formState.period} required>
                  <option value="">-- Asignatura / Especialidad --</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* 3. SELECTOR DE CONTENIDOS (NUEVO) */}
              {formState.subject && (
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 animate-in fade-in">
                  <label className="label text-xs font-bold text-slate-400 uppercase pb-2">3. Contenidos Oficiales (Click para usar)</label>
                  {renderCurricularList()}
                </div>
              )}

              {/* 4. DETALLE TÉCNICO */}
              <div className="form-control">
                <label className="label text-xs font-bold text-slate-500 uppercase">
                  4. Tema / Contexto Específico
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 text-sm leading-relaxed"
                  placeholder="Describa actividades específicas, recursos disponibles o enfoque de la clase..."
                  value={formState.topic}
                  onChange={handleTopicChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading || !formState.selectedGroup}
                className="btn btn-primary w-full shadow-lg shadow-blue-900/20"
              >
                {loading ? <span className="loading loading-dots"></span> : <>Generar Planeamiento <Sparkles size={16} /></>}
              </button>
            </div>
          </form>
        </div>

        {/* PANEL DERECHO: VISTA PREVIA (7 cols) */}
        <div className="lg:col-span-7">
          {generatedPlan ? (
            <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in slide-in-from-right-2">
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="font-bold text-slate-700">Documento Generado</span>
                </div>
                <button className="btn btn-sm btn-outline gap-2" onClick={() => window.print()}>
                  <Download size={14} /> PDF
                </button>
              </div>
              <div className="p-10 prose max-w-none prose-headings:text-blue-900 prose-p:text-slate-600">
                <div dangerouslySetInnerHTML={{ __html: generatedPlan }} />
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center border-4 border-dashed border-slate-200/60 rounded-xl bg-slate-50/20 text-slate-300">
              <BookOpen size={64} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">Esperando configuración curricular...</p>
              <p className="text-sm">Seleccione Modalidad, Nivel y Asignatura para comenzar.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}