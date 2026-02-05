"use client";
import { useState } from "react";
import { Gavel, Save, AlertTriangle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateActivityPage() {
  const [type, setType] = useState("TAREA");
  const [criteria, setCriteria] = useState([]);

  const [newCriterion, setNewCriterion] = useState({
    indicator: "",
    initial: "",
    intermediate: "",
    advanced: "",
  });

  const addCriterion = () => {
    if (
      !newCriterion.indicator ||
      !newCriterion.initial ||
      !newCriterion.advanced
    ) {
      toast.error("Rigor Faltante", {
        description: "Debe definir el indicador y los 3 niveles de desempeño.",
      });
      return;
    }
    setCriteria([...criteria, { ...newCriterion, id: Date.now() }]);
    setNewCriterion({
      indicator: "",
      initial: "",
      intermediate: "",
      advanced: "",
    });
    toast.success("Criterio Agregado");
  };

  const handleSave = () => {
    if (criteria.length === 0) {
      toast.error("Evaluación Inválida", {
        description: "IMPOSIBLE GUARDAR: Falta la Rúbrica Analítica.",
      });
      return;
    }
    toast.success("Actividad Blindada Guardada", {
      description: `Registrada con éxito bajo normativa V140.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 p-6 animate-in fade-in">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Gavel size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Alta de Actividad Evaluativa
          </h1>
          <p className="text-slate-500 text-sm">
            Protocolo de Rigor V140: Rúbricas Obligatorias.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* COLUMNA 1: DATOS GENERALES */}
        <div className="card-solemn p-6 h-fit">
          <label className="label text-xs font-bold uppercase text-slate-500">
            Tipo de Instrumento
          </label>
          <select
            className="select select-bordered w-full mb-4 font-bold text-slate-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="COTIDIANO">Trabajo Cotidiano</option>
            <option value="TAREA">Tarea Corta</option>
            <option value="PROYECTO">Proyecto</option>
            <option value="PORTAFOLIO">Portafolio de Evidencias</option>
          </select>
          <div className="alert bg-orange-50 text-orange-800 text-[10px] flex items-start gap-2">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>
              Sin Rúbrica, no hay actividad válida (Reglamento de Evaluación).
            </span>
          </div>
        </div>

        {/* COLUMNA 2: CONSTRUCTOR DE RÚBRICA */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
              <Plus size={16} className="text-emerald-500" /> Agregar Nuevo
              Criterio
            </h3>

            <input
              className="input input-bordered w-full mb-3 text-sm"
              placeholder="Indicador (Ej: Trabajo en Equipo)"
              value={newCriterion.indicator}
              onChange={(e) =>
                setNewCriterion({ ...newCriterion, indicator: e.target.value })
              }
            />

            <div className="grid grid-cols-3 gap-2 mb-4">
              <textarea
                className="textarea textarea-bordered h-20 text-[10px]"
                placeholder="Nivel Inicial (1 pt)"
                value={newCriterion.initial}
                onChange={(e) =>
                  setNewCriterion({ ...newCriterion, initial: e.target.value })
                }
              ></textarea>
              <textarea
                className="textarea textarea-bordered h-20 text-[10px]"
                placeholder="Nivel Intermedio (2 pts)"
                value={newCriterion.intermediate}
                onChange={(e) =>
                  setNewCriterion({
                    ...newCriterion,
                    intermediate: e.target.value,
                  })
                }
              ></textarea>
              <textarea
                className="textarea textarea-bordered h-20 text-[10px]"
                placeholder="Nivel Avanzado (3 pts)"
                value={newCriterion.advanced}
                onChange={(e) =>
                  setNewCriterion({ ...newCriterion, advanced: e.target.value })
                }
              ></textarea>
            </div>
            <button
              onClick={addCriterion}
              className="btn btn-sm btn-outline w-full hover:bg-slate-50"
            >
              Agregar a la Tabla
            </button>
          </div>

          {/* PREVISUALIZACIÓN */}
          {criteria.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <table className="table table-xs w-full bg-white">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th>Indicador</th>
                    <th>Nivel Inicial</th>
                    <th>Nivel Avanzado</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((c) => (
                    <tr key={c.id}>
                      <td className="font-bold text-slate-700">
                        {c.indicator}
                      </td>
                      <td className="text-slate-500 max-w-[100px] truncate">
                        {c.initial}
                      </td>
                      <td className="text-slate-500 max-w-[100px] truncate">
                        {c.advanced}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={handleSave}
            className={`btn w-full shadow-xl ${criteria.length > 0 ? "btn-institutional" : "btn-disabled bg-slate-200 text-slate-400"}`}
          >
            <Save size={18} /> Guardar Actividad Blindada
          </button>
        </div>
      </div>
    </div>
  );
}
