"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Calculator,
  Save,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function SpecTableEditor({ initialData, title }) {
  const [rows, setRows] = useState(initialData || []);
  const [totals, setTotals] = useState({ points: 0, time: 0 });
  const [target, setTarget] = useState(55); // Meta estandar MEP

  useEffect(() => {
    const p = rows.reduce((acc, r) => acc + (parseInt(r.points) || 0), 0);
    const t = rows.reduce((acc, r) => acc + (parseInt(r.time) || 0), 0);
    setTotals({ points: p, time: t });
  }, [rows]);

  const update = (i, field, val) => {
    const newRows = [...rows];
    newRows[i][field] = val;
    setRows(newRows);
  };

  const add = () =>
    setRows([
      ...rows,
      { obj: "", cognitive: "Conocimiento", type: "RC", time: 0, points: 0 },
    ]);
  const del = (i) => setRows(rows.filter((_, idx) => idx !== i));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* HEADER DE CONTROL */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calculator size={18} className="text-blue-600" /> {title}
          </h3>
          <p className="text-xs text-slate-500">
            Ajuste los valores para balancear la prueba.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold uppercase text-slate-400">
              Total Puntos
            </span>
            <div
              className={`text-2xl font-black ${totals.points === target ? "text-emerald-600" : "text-amber-500"}`}
            >
              {totals.points}{" "}
              <span className="text-sm text-slate-300">/ {target}</span>
            </div>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors">
            <Save size={16} /> Guardar
          </button>
        </div>
      </div>

      {/* TABLA EDITABLE */}
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-xs">
          <tr>
            <th className="p-3 text-left">Aprendizaje Esperado / Objetivo</th>
            <th className="p-3 text-left w-32">Nivel Cognitivo</th>
            <th className="p-3 text-left w-24">Tipo Item</th>
            <th className="p-3 text-center w-20">Min.</th>
            <th className="p-3 text-center w-20">Pts.</th>
            <th className="p-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
              <td className="p-2">
                <input
                  className="w-full bg-transparent border-none focus:ring-0 font-medium text-slate-700"
                  value={row.obj}
                  onChange={(e) => update(i, "obj", e.target.value)}
                  placeholder="Descripción..."
                />
              </td>
              <td className="p-2">
                <select
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs"
                  value={row.cognitive}
                  onChange={(e) => update(i, "cognitive", e.target.value)}
                >
                  <option>Conocimiento</option>
                  <option>Comprensión</option>
                  <option>Aplicación</option>
                  <option>Análisis</option>
                </select>
              </td>
              <td className="p-2">
                <select
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs"
                  value={row.type}
                  onChange={(e) => update(i, "type", e.target.value)}
                >
                  <option>Sel. Única</option>
                  <option>Resp. Corta</option>
                  <option>Pareo</option>
                  <option>Desarrollo</option>
                </select>
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-full text-center bg-slate-50 border border-transparent rounded focus:bg-white transition-all font-mono text-slate-500"
                  value={row.time}
                  onChange={(e) => update(i, "time", e.target.value)}
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-full text-center bg-slate-50 border border-transparent rounded focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all font-bold text-slate-800"
                  value={row.points}
                  onChange={(e) => update(i, "points", e.target.value)}
                />
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => del(i)}
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
            <td colSpan="3" className="p-3">
              <button
                onClick={add}
                className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> AGREGAR FILA
              </button>
            </td>
            <td className="p-3 text-center text-xs font-mono text-slate-500">
              {totals.time} min
            </td>
            <td className="p-3 text-center font-bold text-slate-800">
              {totals.points} pts
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      {/* FEEDBACK */}
      {totals.points !== target && (
        <div className="bg-amber-50 text-amber-700 text-xs p-2 text-center border-t border-amber-100 flex justify-center items-center gap-2">
          <AlertTriangle size={14} /> La tabla está desbalanceada. Ajuste los
          puntos hasta llegar a {target}.
        </div>
      )}
      {totals.points === target && (
        <div className="bg-emerald-50 text-emerald-700 text-xs p-2 text-center border-t border-emerald-100 flex justify-center items-center gap-2">
          <CheckCircle2 size={14} /> ¡Balance Perfecto! Tabla lista para
          impresión oficial.
        </div>
      )}
    </div>
  );
}
