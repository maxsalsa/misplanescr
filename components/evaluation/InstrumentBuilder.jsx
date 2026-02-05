"use client";
import { useState } from "react";
import {
  Table,
  ListChecks,
  BarChart3,
  FolderOpen,
  Plus,
  Trash2,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { INSTRUMENT_TYPES } from "@/lib/core/instruments";

export default function InstrumentBuilder({ defaultIndicators = [] }) {
  const [type, setType] = useState("RUBRICA");
  const [rows, setRows] = useState(
    defaultIndicators.map((ind) => ({
      criteria: ind,
      levels: {
        high: "Logra con excelencia...",
        mid: "Logra parcialmente...",
        low: "No logra...",
      },
      points: 5,
    })),
  );

  const activeType = Object.values(INSTRUMENT_TYPES).find((t) => t.id === type);

  const addRow = () =>
    setRows([
      ...rows,
      { criteria: "", levels: { high: "", mid: "", low: "" }, points: 5 },
    ]);
  const removeRow = (idx) => setRows(rows.filter((_, i) => i !== idx));

  // CÁLCULO DE TOTALES
  const totalPoints = rows.reduce((acc, r) => acc + parseInt(r.points || 0), 0);

  return (
    <div className="space-y-6">
      {/* 1. SELECTOR DE TIPO (MATRIZ DINÁMICA) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(INSTRUMENT_TYPES).map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              type === t.id
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div
              className={`mb-2 w-8 h-8 rounded-full flex items-center justify-center ${type === t.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              {t.id === "RUBRICA" && <Table size={16} />}
              {t.id === "LISTA_COTEJO" && <ListChecks size={16} />}
              {t.id === "ESCALA" && <BarChart3 size={16} />}
              {t.id === "PORTAFOLIO" && <FolderOpen size={16} />}
            </div>
            <div className="font-bold text-sm text-slate-900">{t.name}</div>
            <div className="text-xs text-slate-500 mt-1 leading-tight">
              {t.description}
            </div>
          </button>
        ))}
      </div>

      {/* 2. ÁREA DE DISEÑO DEL INSTRUMENTO */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" size={18} />{" "}
            {activeType.name}
          </h3>
          <div className="text-sm font-bold text-slate-600">
            Total: {totalPoints} pts
          </div>
        </div>

        <div className="p-0">
          {type === "RUBRICA" ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="p-3 text-left w-1/3">Criterio / Indicador</th>
                  <th className="p-3 text-left">Nivel 3 (Alto)</th>
                  <th className="p-3 text-left">Nivel 2 (Medio)</th>
                  <th className="p-3 text-left">Nivel 1 (Bajo)</th>
                  <th className="p-3 w-16">Pts</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50">
                    <td className="p-3">
                      <textarea
                        className="w-full text-xs font-medium border-slate-200 rounded"
                        rows={3}
                        defaultValue={row.criteria}
                      />
                    </td>
                    <td className="p-3">
                      <textarea
                        className="w-full text-xs bg-emerald-50/50 border-emerald-100 rounded"
                        rows={3}
                        defaultValue={row.levels.high}
                      />
                    </td>
                    <td className="p-3">
                      <textarea
                        className="w-full text-xs bg-amber-50/50 border-amber-100 rounded"
                        rows={3}
                        defaultValue={row.levels.mid}
                      />
                    </td>
                    <td className="p-3">
                      <textarea
                        className="w-full text-xs bg-red-50/50 border-red-100 rounded"
                        rows={3}
                        defaultValue={row.levels.low}
                      />
                    </td>
                    <td className="p-3 text-center font-bold">{row.points}</td>
                    <td className="p-3">
                      <button onClick={() => removeRow(i)}>
                        <Trash2
                          size={16}
                          className="text-slate-300 hover:text-red-500"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 space-y-2">
              {/* VISTA PARA LISTA DE COTEJO / ESCALAS */}
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase px-2 mb-2">
                <span>Indicador Observable</span>
                <span>
                  Valoración ({type === "LISTA_COTEJO" ? "Sí/No" : "Escala"})
                </span>
              </div>
              {rows.map((row, i) => (
                <div key={i} className="flex gap-4 items-center group">
                  <input
                    type="text"
                    className="flex-1 border-slate-200 rounded text-sm"
                    defaultValue={row.criteria}
                  />
                  <div className="flex gap-2">
                    {activeType.defaultScales.map((s) => (
                      <div
                        key={s}
                        className="px-3 py-2 bg-slate-100 rounded text-xs font-medium text-slate-600 border border-slate-200"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                  <input
                    type="number"
                    className="w-16 text-center border-slate-200 rounded font-bold"
                    defaultValue={row.points}
                  />
                  <button onClick={() => removeRow(i)}>
                    <Trash2
                      size={16}
                      className="text-slate-300 hover:text-red-500"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={addRow}
            className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline"
          >
            <Plus size={14} /> AGREGAR CRITERIO
          </button>
        </div>
      </div>

      {/* 3. ALERTA LEGAL */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
        <div>
          <h4 className="font-bold text-amber-800 text-sm">
            Escudo Legal Activo
          </h4>
          <p className="text-xs text-amber-700 mt-1">
            Según el Reglamento de Evaluación, no podrá asignar calificaciones a
            los estudiantes hasta que este instrumento esté guardado y validado.
          </p>
        </div>
      </div>
    </div>
  );
}
