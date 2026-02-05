"use client";
import React, { useState } from "react";
import { Table, Wand2 } from "lucide-react";

export default function RubricaGenerator({ onGenerate }) {
  const [criterios, setCriterios] = useState([]);

  const generarCriteriosIA = () => {
    // Simulation of AI generation based on MEP rules
    const nuevos = [
      {
        aspecto: "Dominio de Contenido",
        l3: "Domina totalmente...",
        l2: "Domina parcialmente...",
        l1: "Requiere apoyo...",
      },
      {
        aspecto: "Aplicación Práctica",
        l3: "Aplica sin errores...",
        l2: "Aplica con errores menores...",
        l1: "No logra aplicar...",
      },
    ];
    setCriterios(nuevos);
    if (onGenerate) onGenerate(nuevos);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h3 className="flex items-center gap-2 font-bold uppercase mb-4 text-[#003366]">
        <Table size={20} /> Generador de Rúbricas (MEP)
      </h3>
      <button
        onClick={generarCriteriosIA}
        className="btn btn-sm btn-primary mb-4 gap-2"
      >
        <Wand2 size={14} /> Generar Automáticamente
      </button>

      {criterios.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-xs table-bordered w-full">
            <thead>
              <tr>
                <th>Aspecto</th>
                <th className="bg-green-50">Logrado (L3)</th>
                <th className="bg-yellow-50">En Proceso (L2)</th>
                <th className="bg-red-50">Inicio (L1)</th>
              </tr>
            </thead>
            <tbody>
              {criterios.map((c, i) => (
                <tr key={i}>
                  <td className="font-bold">{c.aspecto}</td>
                  <td>{c.l3}</td>
                  <td>{c.l2}</td>
                  <td>{c.l1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
