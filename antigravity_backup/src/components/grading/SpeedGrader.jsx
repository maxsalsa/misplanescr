"use client";

import React from "react";

// Mock Input Type


[];
}

export default function SpeedGrader({ students, criteria }) {
    return (
        <div className="w-full overflow-x-auto bg-base-100 rounded-box shadow">
            <table className="table table-zebra table-compact w-full">
                <thead>
                    <tr>
                        <th className="bg-base-200">Estudiante</th>
                        {criteria.map((c) => (
                            <th key={c.id} className="text-center min-w-[120px] bg-base-200">
                                {c.name}
                            </th>
                        ))}
                        <th className="text-right bg-base-200">Nota Final</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className={student.finalGrade < 70 ? "bg-error/10" : ""}>
                            <td className="font-bold">
                                {student.name}
                                {student.finalGrade < 70 && (
                                    <span className="badge badge-error badge-xs ml-2">Alerta</span>
                                )}
                            </td>
                            {criteria.map((c) => {
                                const val = student.scores[c.id] || 0;
                                return (
                                    <td key={c.id} className="text-center p-1">
                                        <div className="btn-group btn-group-horizontal">
                                            <button
                                                className={`btn btn-xs ${val === 1 ? 'btn-error text-white' : 'btn-ghost text-gray-300'}`}
                                            >1</button>
                                            <button
                                                className={`btn btn-xs ${val === 2 ? 'btn-warning text-white' : 'btn-ghost text-gray-300'}`}
                                            >2</button>
                                            <button
                                                className={`btn btn-xs ${val === 3 ? 'btn-success text-white' : 'btn-ghost text-gray-300'}`}
                                            >3</button>
                                        </div>
                                    </td>
                                );
                            })}
                            <td className={`text-right font-mono font-bold ${student.finalGrade < 70 ? 'text-error' : 'text-success'}`}>
                                {student.finalGrade}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
