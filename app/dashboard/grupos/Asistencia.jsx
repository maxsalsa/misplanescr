"use client";
import React from "react";
import { Check, X, Clock } from "lucide-react";

export default function Asistencia() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="font-bold">Martes, 3 de Marzo</h2>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-success text-white">
            Marcar Todos Presentes
          </button>
          <button className="btn btn-sm btn-outline">Guardar</button>
        </div>
      </div>
      <table className="table w-full bg-slate-800 rounded-lg">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Estado</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-bold">Salazar Sanchez, Max</td>
            <td className="flex gap-2">
              <button className="btn btn-xs btn-square btn-success text-white">
                <Check size={12} />
              </button>
              <button className="btn btn-xs btn-square btn-outline border-slate-600">
                <X size={12} />
              </button>
              <button className="btn btn-xs btn-square btn-outline border-slate-600">
                <Clock size={12} />
              </button>
            </td>
            <td>
              <input
                type="text"
                className="input input-xs bg-slate-900 border-none"
                placeholder="Comentario..."
              />
            </td>
          </tr>
          <tr>
            <td className="font-bold">Vargas Monge, Sofia</td>
            <td className="flex gap-2">
              <button className="btn btn-xs btn-square btn-success text-white">
                <Check size={12} />
              </button>
              <button className="btn btn-xs btn-square btn-outline border-slate-600">
                <X size={12} />
              </button>
              <button className="btn btn-xs btn-square btn-outline border-slate-600">
                <Clock size={12} />
              </button>
            </td>
            <td>
              <input
                type="text"
                className="input input-xs bg-slate-900 border-none"
                placeholder="Comentario..."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
