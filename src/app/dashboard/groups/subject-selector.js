import React, { useState, useEffect } from 'react';
import { MEP_DATA } from '@/lib/mep-data';
import { BookOpen, Layers, Calendar } from 'lucide-react';

/**
 * SubjectSelector Component
 * Provides a "Logical and Ordered" interface to select Official MEP Curriculum.
 * follows the hierarchy: Modality -> Grade -> Period -> Subject -> (Optional: Unit)
 */
export default function SubjectSelector({ institutionType, selectedSubjectId, onSelect, grade, setGrade }) {
    // 1. Determine Modality based on Institution Type
    // Defaults to "Secundaria Académica" if not found.
    const getModality = () => {
        if (institutionType === 'Técnico') return "Secundaria Técnica Profesional";
        if (institutionType === 'Académico') return "Secundaria Académica (III Ciclo y Div.)";
        if (institutionType === 'Privado') return "Secundaria Académica (III Ciclo y Div.)"; // Assume Academic for now
        if (institutionType === 'Nocturno') return "Secundaria Nocturna";
        if (institutionType === 'Primaria') return "Educación Primaria (I y II Ciclos)";
        return "Secundaria Académica (III Ciclo y Div.)";
    };

    const currentModality = getModality();
    const availableGrades = MEP_DATA[currentModality] ? Object.keys(MEP_DATA[currentModality]) : [];

    // State for cascading selections
    // We lift 'grade' up because the parent needs it for the Group info.
    const [period, setPeriod] = useState("");

    // Reset internal states when Grade changes
    useEffect(() => {
        if (grade && MEP_DATA[currentModality] && MEP_DATA[currentModality][grade]) {
            const periods = Object.keys(MEP_DATA[currentModality][grade]);
            if (periods.length > 0) setPeriod(periods[0]); // Auto-select first period
        }
    }, [grade, currentModality]);

    // Derived Subjects
    const getSubjects = () => {
        if (!grade || !period) return [];
        try {
            const subjectsObj = MEP_DATA[currentModality][grade][period];
            return Object.keys(subjectsObj || {});
        } catch (e) {
            return [];
        }
    };

    const subjects = getSubjects();

    const handleSubjectChange = (e) => {
        const subjectName = e.target.value;
        // In a real DB, we would have unique IDs. 
        // Here we generate a pseudo-ID: [Modality]_[Grade]_[Subject]
        const pseudoId = `${currentModality}_${grade}_${subjectName}`.replace(/\s+/g, '_').toLowerCase();
        onSelect(pseudoId, subjectName);
    };

    return (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Layers size={16} className="text-indigo-500" />
                <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Malla Curricular Oficial (MEP)</h4>
            </div>

            {/* 1. Grade Selector (Driven by Modality) */}
            <div className="form-control">
                <label className="label text-xs font-medium text-slate-600">Nivel / Año</label>
                <select
                    className="select select-bordered select-sm w-full"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                >
                    <option disabled value="">-- Seleccione Nivel --</option>
                    {availableGrades.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>

            {/* 2. Period/Semester Selector (Auto-filled often) */}
            <div className="form-control">
                <label className="label text-xs font-medium text-slate-600">Periodo / Semestre</label>
                <select
                    className="select select-bordered select-sm w-full"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    disabled={!grade}
                >
                    {grade && MEP_DATA[currentModality][grade] && Object.keys(MEP_DATA[currentModality][grade]).map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            {/* 3. Subject Selector */}
            <div className="form-control">
                <label className="label text-xs font-medium text-slate-600">Asignatura / Especialidad</label>
                <select
                    className="select select-bordered select-sm w-full"
                    onChange={handleSubjectChange}
                    defaultValue=""
                    disabled={!grade || !period}
                >
                    <option value="">-- Seleccione Asignatura --</option>
                    {subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <label className="label">
                    <span className="label-text-alt text-slate-400">
                        {availableGrades.length === 0 ? "Mecánica no disponible para esta modalidad." :
                            subjects.length > 0 ? `${subjects.length} asignaturas oficiales disponibles.` : "Seleccione un nivel."}
                    </span>
                </label>
            </div>
        </div>
    );
}
