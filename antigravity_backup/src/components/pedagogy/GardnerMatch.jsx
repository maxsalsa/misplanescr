"use client";

import React from "react";

// Mock Types






export default function GardnerMatch({ activityTitle, variants, students, onAssignToGroups }) {

    // Group students by Intelligence
    const groups = {
        LINGUISTICA: students.filter(s => s.dominantIntelligence === 'LINGUISTICA'),
        LOGICO_MATEMATICA: students.filter(s => s.dominantIntelligence === 'LOGICO_MATEMATICA'),
        VISUAL_ESPACIAL: students.filter(s => s.dominantIntelligence === 'VISUAL_ESPACIAL'),
        CINESTESICA: students.filter(s => s.dominantIntelligence === 'CINESTESICA'),
        MUSICAL: students.filter(s => s.dominantIntelligence === 'MUSICAL'),
    };

    return (
        <div className="card w-full bg-base-100 shadow-xl border border-primary/20">
            <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                    <span className="text-2xl">🌈</span>
                    <span>Motor de Inteligencias Múltiples</span>
                </h2>
                <p className="text-secondary font-semibold">Actividad Base: {activityTitle}</p>

                <div className="divider">Opciones Personalizadas</div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {variants.map((v) => {
                        const matchedStudents = groups[v.type] || [];
                        if (matchedStudents.length === 0) return null; // Hide if no matches?

                        let icon = "🧠";
                        if (v.type === 'VISUAL_ESPACIAL') icon = "🎨";
                        if (v.type === 'MUSICAL') icon = "🎵";
                        if (v.type === 'CINESTESICA') icon = "🏃";
                        if (v.type === 'LOGICO_MATEMATICA') icon = "🔢";
                        if (v.type === 'LINGUISTICA') icon = "📝";

                        return (
                            <div key={v.id} className="card bg-base-200 hover:shadow-lg transition-shadow">
                                <div className="card-body p-4">
                                    <h3 className="card-title text-sm uppercase text-gray-500 flex items-center gap-2">
                                        {icon} {v.type.replace('_', ' ')}
                                    </h3>
                                    <div className="font-bold text-lg">{v.title}</div>
                                    <p className="text-sm italic opacity-75 line-clamp-3">"{v.instruction}"</p>

                                    <div className="mt-4">
                                        <div className="badge badge-primary">{matchedStudents.length} Estudiantes</div>
                                        <div className="avatar-group -space-x-4 mt-2">
                                            {matchedStudents.slice(0, 4).map(s => (
                                                <div key={s.id} className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                        <span className="text-xs">{s.name.substring(0, 2)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {matchedStudents.length > 4 && (
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                        <span className="text-xs">+{matchedStudents.length - 4}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button className="btn btn-sm btn-outline btn-primary mt-2 w-full">
                                        Asignar a este Grupo
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
