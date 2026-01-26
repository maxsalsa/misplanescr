
"use client";

import React, { useState } from 'react';
import { AlertTriangle, Gavel, FileSignature, Save } from 'lucide-react';
import { toast } from 'sonner';

const REA_ARTICLES = {
    leve: [
        { art: "Art. 132", desc: "Uso incorrecto del uniforme", points: 5 },
        { art: "Art. 133", desc: "Llegada tardía injustificada", points: 3 },
    ],
    grave: [
        { art: "Art. 145", desc: "Falta de respeto a compañeros", points: 15 },
        { art: "Art. 148", desc: "Uso de celular en clase", points: 10 },
    ],
    gravisima: [
        { art: "Art. 155", desc: "Agresión física", points: 35 },
        { art: "Art. 158", desc: "Daño a la propiedad institucional", points: 40 },
    ]
};

export default function ConductManager({ students }) {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [severity, setSeverity] = useState("leve");
    const [selectedFault, setSelectedFault] = useState(null);
    const [details, setDetails] = useState("");

    const handleCreateReport = () => {
        if (!selectedStudent || !selectedFault) {
            toast.error("Complete todos los campos de la boleta");
            return;
        }

        // Logic to simulate API call
        toast.success(`Boleta creada para ${selectedStudent}. Puntos rebajados: ${selectedFault.points}`);

        // Reset
        setSelectedFault(null);
        setDetails("");
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold">Control de Disciplina (REA)</h3>
                </div>
                <span className="text-xs text-slate-400">Reglamento de Evaluación</span>
            </div>

            <div className="p-6 space-y-6">
                {/* Student Selector */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estudiante</label>
                    <select
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Seleccione un estudiante...</option>
                        {students.map(s => (
                            <option key={s.id} value={s.name}>{s.name} ({s.id})</option>
                        ))}
                    </select>
                </div>

                {/* Severity Tabs */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de falta</label>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        {['leve', 'grave', 'gravisima'].map((type) => (
                            <button
                                key={type}
                                onClick={() => { setSeverity(type); setSelectedFault(null); }}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all
                                    ${severity === type
                                        ? 'bg-white shadow text-slate-900'
                                        : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fault Selector (Dynamic based on REA) */}
                <div className="space-y-2">
                    {REA_ARTICLES[severity].map((fault, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedFault(fault)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center
                                ${selectedFault === fault
                                    ? 'border-red-500 bg-red-50 ring-1 ring-red-500'
                                    : 'border-slate-200 hover:border-slate-300'}`}
                        >
                            <div>
                                <span className="font-bold text-slate-800 text-sm block">{fault.art}</span>
                                <span className="text-sm text-slate-600">{fault.desc}</span>
                            </div>
                            <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded border border-red-100">
                                -{fault.points} pts
                            </span>
                        </div>
                    ))}
                </div>

                {/* Details */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Detalle de los hechos</label>
                    <textarea
                        className="w-full p-2 border border-slate-300 rounded-lg h-24 text-sm"
                        placeholder="Describa lo sucedido..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-50 rounded-lg border border-slate-200">
                        <FileSignature className="w-4 h-4" />
                        Vista Previa Boleta
                    </button>
                    <button
                        onClick={handleCreateReport}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
                    >
                        <Save className="w-4 h-4" />
                        Registrar Rebajo
                    </button>
                </div>
            </div>
        </div>
    );
}
