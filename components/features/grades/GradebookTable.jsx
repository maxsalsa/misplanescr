"use client";

import { useState } from "react";
import { toast } from "sonner";
import { submitGrade } from "@/lib/actions/grade-actions";
import { Save, AlertCircle } from "lucide-react";

export default function GradebookTable({ students, plans, initialGrades }) {
    // Transform array to map for fast lookup: grades[studentId][planId] = gradeObj
    const [gradeMap, setGradeMap] = useState(() => {
        const map = {};
        initialGrades.forEach(g => {
            if (!map[g.studentId]) map[g.studentId] = {};
            map[g.studentId][g.planId] = g;
        });
        return map;
    });

    const [loading, setLoading] = useState(false);

    const getGradeColor = (score) => {
        if (!score && score !== 0) return "bg-slate-50 border-slate-200 text-slate-400"; // Empty
        if (score < 65) return "bg-red-50 border-red-200 text-red-700 font-bold";
        if (score < 80) return "bg-yellow-50 border-yellow-200 text-yellow-700 font-bold";
        return "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold";
    };

    const handleGradeChange = async (studentId, planId, value) => {
        // Optimistic UI Update is risky for inputs, so we wait for blur or Enter usually.
        // But here we'll just handle the submission on Blur to avoid spamming the server action.
    };

    const handleBlur = async (studentId, planId, e) => {
        const val = e.target.value;
        if (val === "") return; // Ignore empty

        const score = parseFloat(val);
        if (isNaN(score) || score < 0 || score > 100) {
            toast.error("Nota inválida (0-100)");
            return;
        }

        const toastId = toast.loading("Guardando...");

        const res = await submitGrade({ studentId, planId, score });

        if (res.success) {
            toast.dismiss(toastId);
            toast.success("Nota registrada", { duration: 1000 });

            // Update local state
            setGradeMap(prev => ({
                ...prev,
                [studentId]: {
                    ...prev[studentId],
                    [planId]: res.data
                }
            }));
        } else {
            toast.dismiss(toastId);
            toast.error(res.error);
        }
    };

    return (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
            <table className="table bg-white w-full">
                {/* HEAD */}
                <thead className="bg-slate-50 text-slate-700">
                    <tr>
                        <th className="sticky left-0 bg-slate-50 z-10 w-48 shadow-sm">Estudiante</th>
                        {plans.map(plan => (
                            <th key={plan.id} className="min-w-[150px] text-center font-medium">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs uppercase text-slate-400 font-bold">{plan.subject}</span>
                                    <span
                                        className="truncate max-w-[140px] text-xs leading-tight"
                                        title={plan.title}
                                    >
                                        {plan.title.replace("MEP 2026:", "").replace("MEP OFICIAL:", "")}
                                    </span>
                                </div>
                            </th>
                        ))}
                        <th className="text-center w-24">Promedio</th>
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {students.map((student) => {
                        // Calculate Average
                        let total = 0;
                        let count = 0;
                        plans.forEach(p => {
                            const g = gradeMap[student.id]?.[p.id];
                            if (g) {
                                total += g.score;
                                count++;
                            }
                        });
                        const average = count > 0 ? (total / count).toFixed(0) : "-";

                        return (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="sticky left-0 bg-white font-medium text-slate-700 text-xs md:text-sm z-10 border-r border-slate-100 shadow-sm">
                                    {student.name}
                                    <div className="text-[10px] text-slate-400 font-normal">
                                        ID: {student.id.slice(-4)}
                                    </div>
                                </td>
                                {plans.map(plan => {
                                    const currentGrade = gradeMap[student.id]?.[plan.id];
                                    const scoreValue = currentGrade ? currentGrade.score : "";
                                    const colorClass = getGradeColor(currentGrade ? currentGrade.score : null);

                                    return (
                                        <td key={plan.id} className="text-center p-2">
                                            <input
                                                type="number"
                                                placeholder="-"
                                                defaultValue={scoreValue}
                                                onBlur={(e) => handleBlur(student.id, plan.id, e)}
                                                className={`input input-sm w-16 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${colorClass}`}
                                            />
                                        </td>
                                    );
                                })}
                                <td className="text-center font-bold">
                                    <span className={`px-3 py-1 rounded-full text-xs ${getGradeColor(average === "-" ? null : parseFloat(average))}`}>
                                        {average}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {students.length === 0 && (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                    <AlertCircle size={32} className="mb-2" />
                    <p>No hay estudiantes registrados en este grupo.</p>
                </div>
            )}
        </div>
    );
}
