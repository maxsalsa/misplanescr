"use client";

import React, { useState, useEffect } from "react";
import { Check, MessageSquare, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Types (In production, import from Prisma/Types)
type Student = { id: string; name: string };
type Criterion = { id: string; description: string; maxPoints: number };
type GradeDetail = { criterionId: string; level: number; feedback?: string };
type GradeRow = { student: Student; details: GradeDetail[]; finalGrade: number };

interface GradeGridProps {
    activityTitle: string;
    students: Student[];
    taxonomies: Criterion[]; // The Rubric Columns
    initialGrades: GradeRow[]; // Existing data
    onSave: (studentId: string, criterionId: string, level: number, feedback?: string) => Promise<void>;
}

export default function GradeGrid({ activityTitle, students, taxonomies, initialGrades, onSave }: GradeGridProps) {
    const [gridData, setGridData] = useState<GradeRow[]>(initialGrades);
    const [loading, setLoading] = useState(false);

    // Helper to calculate row grade
    const calculateRowGrade = (details: GradeDetail[]) => {
        // MEP Logic: (Sum of levels / Max possible) * 100 (or weight)
        // Simplified for demo: Sum of points
        const total = details.reduce((acc, curr) => acc + curr.level, 0);
        // Assuming max level is 3 per criterion
        const maxPossible = taxonomies.length * 3;
        return (total / maxPossible) * 100;
    };

    const handleLevelClick = async (studentId: string, criterionId: string, level: number) => {
        // 1. Optimistic Update
        setGridData((prev) =>
            prev.map((row) => {
                if (row.student.id !== studentId) return row;

                const newDetails = [...row.details];
                const existingIdx = newDetails.findIndex((d) => d.criterionId === criterionId);

                if (existingIdx >= 0) {
                    newDetails[existingIdx] = { ...newDetails[existingIdx], level };
                } else {
                    newDetails.push({ criterionId, level });
                }

                return {
                    ...row,
                    details: newDetails,
                    finalGrade: calculateRowGrade(newDetails),
                };
            })
        );

        // 2. Server Save
        try {
            await onSave(studentId, criterionId, level);
        } catch (error) {
            console.error("Save failed", error);
            // Revert logic would go here
        }
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Speed Grader: {activityTitle}</h2>
                    <p className="text-sm text-slate-500">Haz clic en los niveles para calificar.</p>
                </div>
                <div className="flex gap-2 text-xs font-medium">
                    <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-md">🔴 Inicial (1)</span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">🟡 Intermedio (2)</span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-md">🟢 Avanzado (3)</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700 w-64 sticky left-0 bg-slate-50 z-10">Estudiante</th>
                            {taxonomies.map((tax) => (
                                <th key={tax.id} className="px-4 py-4 text-center min-w-[140px] border-l border-slate-200">
                                    <div className="line-clamp-2" title={tax.description}>
                                        {tax.description}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-4 text-right font-bold text-slate-700 w-32 bg-slate-50 sticky right-0 z-10 border-l border-slate-200">Nota Final</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {gridData.map((row) => (
                            <tr key={row.student.id} className="hover:bg-slate-50 transition-colors group">
                                {/* Student Name */}
                                <td className="px-6 py-4 font-medium text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 z-10">
                                    {row.student.name}
                                </td>

                                {/* Rubric Columns */}
                                {taxonomies.map((tax) => {
                                    const detail = row.details.find((d) => d.criterionId === tax.id);
                                    const currentLevel = detail?.level || 0;

                                    return (
                                        <td key={tax.id} className="px-4 py-4 text-center border-l border-slate-100">
                                            <div className="flex justify-center gap-1">
                                                {[1, 2, 3].map((lvl) => (
                                                    <button
                                                        key={lvl}
                                                        onClick={() => handleLevelClick(row.student.id, tax.id, lvl)}
                                                        className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all scale-95 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500",
                                                            lvl === 1 && currentLevel === 1 ? "bg-red-500 text-white shadow-md shadow-red-200" : "bg-slate-100 text-slate-300 hover:bg-red-100 hover:text-red-400",
                                                            lvl === 2 && currentLevel === 2 ? "bg-yellow-500 text-white shadow-md shadow-yellow-200" : "bg-slate-100 text-slate-300 hover:bg-yellow-100 hover:text-yellow-400",
                                                            lvl === 3 && currentLevel === 3 ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "bg-slate-100 text-slate-300 hover:bg-emerald-100 hover:text-emerald-400"
                                                        )}
                                                    >
                                                        {lvl}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Quick Comment Button */}
                                            <button className="mt-2 text-xs text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MessageSquare size={12} />
                                                {detail?.feedback ? "Editar obs." : "Observación"}
                                            </button>
                                        </td>
                                    );
                                })}

                                {/* Final Grade Calculation */}
                                <td className="px-6 py-4 text-right sticky right-0 bg-white group-hover:bg-slate-50 z-10 border-l border-slate-100">
                                    <div className="flex items-center justify-end gap-2">
                                        <span
                                            className={cn(
                                                "text-lg font-black",
                                                row.finalGrade < 65 ? "text-red-500" : "text-slate-800"
                                            )}
                                        >
                                            {row.finalGrade.toFixed(1)}
                                        </span>
                                        {row.finalGrade < 65 && (
                                            <AlertTriangle size={16} className="text-red-500 animate-pulse" title="Alerta Temprana Detectada" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
