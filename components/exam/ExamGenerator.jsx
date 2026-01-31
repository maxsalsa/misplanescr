"use client";

import React, { useState, useEffect } from "react";
import { calculateTableSpecs, ExamObjective, ExamSpecRow } from "@/lib/mep-math";



export default function ExamGenerator({ indicators, onSave }) {
    const [totalPoints, setTotalPoints] = useState(30);
    const [grid, setGrid] = useState([]);
    const [viewMath, setViewMath] = useState(false);

    // Auto-Calculate on Input Change
    useEffect(() => {
        if (totalPoints > 0 && indicators.length > 0) {
            try {
                const { distribution } = calculateTableSpecs(totalPoints, indicators);
                setGrid(distribution);
            } catch (e) {
                console.error(e);
            }
        }
    }, [totalPoints, indicators]);

    return (
        <div className="card w-full bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6">
                <h2 className="card-title text-2xl font-bold flex justify-between items-center">
                    Generador de Tabla de Especificaciones (MEP)
                    <div className="badge badge-primary badge-outline text-sm">Oficial</div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Puntuación Total de la Prueba</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered w-full font-mono text-lg"
                            value={totalPoints}
                            onChange={(e) => setTotalPoints(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="flex items-end pb-2">
                        <div className="stats shadow">
                            <div className="stat place-items-center">
                                <div className="stat-title">Constante (K)</div>
                                <div className="stat-value text-secondary text-2xl">
                                    {grid.length > 0 ? grid[0].constantK.toFixed(2) : "0.00"}
                                </div>
                                <div className="stat-desc">Pts / Lección</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto mt-4">
                    <table className="table table-zebra w-full table-compact">
                        <thead>
                            <tr>
                                <th className="w-1/2">Indicador / Aprendizaje</th>
                                <th className="text-center">Lecciones</th>
                                <th className="text-center">Cálculo (L x K)</th>
                                <th className="text-center font-bold bg-base-200">Puntos Finales</th>
                                <th className="text-center">Tipos de Ítem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grid.map((row) => (
                                <tr key={row.id}>
                                    <td className="whitespace-normal">
                                        <p className="text-sm font-medium">{row.description}</p>
                                    </td>
                                    <td className="text-center font-mono">{row.lessons}</td>
                                    <td className="text-center font-mono text-gray-400">
                                        {row.rawPoints.toFixed(2)}
                                    </td>
                                    <td className="text-center font-bold bg-base-200 text-lg">
                                        {row.finalPoints}
                                    </td>
                                    <td>
                                        {/* Item Distribution Placeholder - Phase 2 */}
                                        <div className="flex gap-1 justify-center">
                                            <input type="text" placeholder="Sel" className="input input-xs input-bordered w-12 text-center" />
                                            <input type="text" placeholder="RC" className="input input-xs input-bordered w-12 text-center" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="text-right">TOTALES</th>
                                <th className="text-center">{indicators.reduce((a, b) => a + b.lessons, 0)}</th>
                                <th></th>
                                <th className="text-center text-xl text-primary font-black">
                                    {grid.reduce((a, b) => a + b.finalPoints, 0)}
                                </th>
                                <th className="text-center text-xs text-gray-500">
                                    Debe coincidir con {totalPoints}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="card-actions justify-end mt-6">
                    <button className="btn btn-ghost text-xs" onClick={() => setViewMath(!viewMath)}>
                        Ver Fórmula Matemática
                    </button>
                    <button className="btn btn-primary gap-2" onClick={() => onSave(grid)}>
                        Generar Examen PDF
                    </button>
                </div>

                {viewMath && (
                    <div className="alert alert-info mt-4 text-xs font-mono">
                        <span className="font-bold">Fórmula MEP:</span> Puntos = Lecciones * (TotalPuntos / TotalLecciones).
                        Redondeo &ge; 0.50 suben.
                    </div>
                )}
            </div>
        </div>
    );
}
