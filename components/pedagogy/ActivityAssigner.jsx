"use client";

import React, { useState } from "react";

export default function ActivityAssigner({ students, activity, onAssign }) {
  const [adaptations, setAdaptations] = useState({});

  // Auto-detect needs
  const accessStudents = students.filter((s) => s.inclusionNeeds === "ACCESO");
  const giftedStudents = students.filter(
    (s) => s.inclusionNeeds === "ALTA_DOTACION",
  );
  const significantStudents = students.filter(
    (s) => s.inclusionNeeds === "SIGNIFICATIVA",
  );

  const handleAssign = () => {
    // Logic to save assignments with specific instructions
    onAssign(
      students.map((s) => ({
        studentId: s.id,
        instruction: adaptations[s.id] || "Standard",
      })),
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-primary">
          <span className="icon">✨</span> Asistente de Inclusión Educativa
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          El sistema ha detectado diversidad en el aula. Revise las sugerencias
          antes de asignar.
        </p>

        {/* 1. ADECUACIÓN DE ACCESO */}
        {accessStudents.length > 0 && (
          <div className="alert alert-info shadow-sm mb-3">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                ♿ Adecuación de Acceso ({accessStudents.length})
              </h3>
              <div className="text-xs mt-1">
                Sugerencia DUA:{" "}
                {activity.duaSuggestion ||
                  "Permitir audiolibros o tipografía ampliada."}
              </div>
              <ul className="list-disc list-inside text-xs mt-2 opacity-80">
                {accessStudents.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 2. ALTA DOTACIÓN */}
        {giftedStudents.length > 0 && (
          <div className="alert alert-success shadow-sm mb-3">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                🚀 Alta Dotación ({giftedStudents.length})
              </h3>
              <div className="text-xs mt-1">
                El sistema sugiere un <strong>Reto Extra</strong> de mayor
                complejidad taxonómica.
              </div>
              <div className="mt-2">
                <button className="btn btn-xs btn-outline btn-success bg-white">
                  + Generar Reto &quot;Nivel Oro&quot;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. SIGNIFICATIVA */}
        {significantStudents.length > 0 && (
          <div className="alert alert-warning shadow-sm mb-3">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                ⚠️ Adecuación Significativa ({significantStudents.length})
              </h3>
              <div className="text-xs mt-1">
                Se requiere ajustar el nivel de logro del indicador.
              </div>
              <div className="mt-2">
                <button className="btn btn-xs btn-active btn-ghost">
                  Editar Currículo Individual
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="divider"></div>

        <div className="card-actions justify-end">
          <button className="btn btn-ghost">Cancelar</button>
          <button className="btn btn-primary" onClick={handleAssign}>
            Confirmar y Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
