"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, ShieldCheck, AlertTriangle, Save } from "lucide-react";

export default function RubricBuilder({ initialData, totalPercentage = 20 }) {
  const [rows, setRows] = useState(initialData || []);
  const [currentTotal, setCurrentTotal] = useState(0);

  // Calculate total percentage weight
  useEffect(() => {
    const total = rows.reduce(
      (acc, row) => acc + (parseFloat(row.percentage) || 0),
      0,
    );
    setCurrentTotal(total);
  }, [rows]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        indicator: "",
        level1: "Requiere apoyo para...",
        level2: "Logra parcialmente...",
        level3: "Identifica y aplica correctamente...",
        points: 1, // Default points per criterion usually implies scale logic, simplified here for weight
        percentage: 0,
      },
    ]);
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
      {/* Header: Escudo Legal */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" /> Rúbrica
            Analítica (Escudo Legal)
          </h3>
          <p className="text-xs text-slate-500">
            Defina los indicadores y niveles de desempeño obligatorios.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold uppercase text-slate-400">
              Peso Total
            </span>
            <div
              className={`text-2xl font-black ${currentTotal === totalPercentage ? "text-emerald-600" : "text-amber-500"}`}
            >
              {currentTotal}%{" "}
              <span className="text-sm text-slate-300">
                / {totalPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-xs">
            <tr>
              <th className="p-3 text-left w-1/4">Indicador de Aprendizaje</th>
              <th className="p-3 text-left w-1/5 bg-red-50 text-red-400">
                Inicial (1 pt)
              </th>
              <th className="p-3 text-left w-1/5 bg-yellow-50 text-yellow-600">
                Intermedio (2 pts)
              </th>
              <th className="p-3 text-left w-1/5 bg-green-50 text-green-600">
                Avanzado (3 pts)
              </th>
              <th className="p-3 text-center w-16">Valor %</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-2 align-top">
                  <textarea
                    className="textarea textarea-bordered textarea-ghost w-full text-xs min-h-[80px]"
                    placeholder="Describa el indicador..."
                    value={row.indicator}
                    onChange={(e) => updateRow(i, "indicator", e.target.value)}
                  />
                </td>
                <td className="p-2 align-top bg-red-50/30">
                  <textarea
                    className="textarea textarea-ghost w-full text-xs h-full"
                    value={row.level1}
                    onChange={(e) => updateRow(i, "level1", e.target.value)}
                  />
                </td>
                <td className="p-2 align-top bg-yellow-50/30">
                  <textarea
                    className="textarea textarea-ghost w-full text-xs h-full"
                    value={row.level2}
                    onChange={(e) => updateRow(i, "level2", e.target.value)}
                  />
                </td>
                <td className="p-2 align-top bg-green-50/30">
                  <textarea
                    className="textarea textarea-ghost w-full text-xs h-full"
                    value={row.level3}
                    onChange={(e) => updateRow(i, "level3", e.target.value)}
                  />
                </td>
                <td className="p-2 align-top">
                  <input
                    type="number"
                    className="w-full text-center font-bold border border-slate-200 rounded p-1"
                    value={row.percentage}
                    onChange={(e) => updateRow(i, "percentage", e.target.value)}
                  />
                </td>
                <td className="p-2 text-center align-middle">
                  <button
                    onClick={() => deleteRow(i)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 border-t border-slate-200">
            <tr>
              <td colSpan="6" className="p-3">
                <button
                  onClick={addRow}
                  className="btn btn-ghost btn-xs text-blue-600 gap-2"
                >
                  <Plus size={14} /> Agregar Criterio
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Validation Feedback */}
      {currentTotal !== totalPercentage && (
        <div className="bg-amber-50 p-2 text-center text-xs text-amber-700 font-medium border-t border-amber-100 flex items-center justify-center gap-2">
          <AlertTriangle size={14} />
          ATENCIÓN: La suma de porcentajes ({currentTotal}%) no coincide con el
          valor del instrumento ({totalPercentage}%).
        </div>
      )}
    </div>
  );
}
