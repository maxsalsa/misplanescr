"use client";
import React from 'react';

;
    normativa; // Could be typed stricter
}

export function ComplianceIndicator({ planData, normativa }) {
    // Logic to calculate score
    let score = 0;
    let total = 100;

    // 1. Basic Structure (20 pts)
    if (planData.asignatura && planData.unidad) score += 20;

    // 2. Content Density (40 pts)
    const learningCount = planData.aprendizajes?.length || 0;
    if (learningCount >= 1) score += 20;
    if (learningCount >= 3) score += 20;

    // 3. DUA Inclusion (20 pts)
    if (planData.dua_active) score += 20;

    // 4. Strategy Depth (20 pts) - Heuristic
    const hasDepth = planData.aprendizajes?.some(a => a.estrategias?.length > 100);
    if (hasDepth) score += 20;

    const getColor = (s) => {
        if (s < 50) return 'bg-red-500';
        if (s < 80) return 'bg-yellow-500';
        return 'bg-emerald-500'; // MEP Green
    };

    return (
        <div className="w-full bg-slate-100 rounded-xl p-4 border border-slate-200 shadow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                    🛡️ Auditoría Normativa MEP
                    <span className="badge badge-sm badge-neutral">v2026</span>
                </h4>
                <span className={`font-mono font-bold text-lg ${score >= 80 ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {score}%
                </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
                <div
                    className={`h-2.5 rounded-full transition-all duration-1000 ${getColor(score)}`}
                    style={{ width: `${score}%` }}
                ></div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between">
                <span>Estándar: {normativa?.hours || '40'} min/lección</span>
                <span>{score < 100 ? '⚠️ Requiere Revisión' : '✅ Listo para descargar'}</span>
            </div>
        </div>
    );
}
