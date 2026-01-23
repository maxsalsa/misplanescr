"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context.jsx';
import { useGroups } from '@/context/groups-context';
import { getStudents, seedStudentsIfEmpty } from '@/lib/students-service';
import { toast } from 'sonner';

/**
 * AULA DIGITAL (DIGNITY CLASSROOM)
 * Gestión de estudiantes con herramientas "Anti-Guardería".
 */
export default function StudentsPage() {
    const { activeInstitution } = useGroups();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalMode, setModalMode] = useState(null); // 'translator', 'evidence', 'warning'

    // Inputs
    const [inputText, setInputText] = useState("");
    const [aiResult, setAiResult] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        seedStudentsIfEmpty();
        loadStudents();
    }, [activeInstitution]);

    async function loadStudents() {
        const data = await getStudents(activeInstitution?.id);
        setStudents(data);
    }

    const openTool = (student, mode) => {
        setSelectedStudent(student);
        setModalMode(mode);
        setInputText("");
        setAiResult("");
        // Pre-fill for Warning
        if (mode === 'warning') {
            setInputText("3 Tareas incompletas seguidas, distraído en clase, no trae materiales.");
        }
    };

    const runAI = async () => {
        if (!inputText) return toast.error("Por favor describe la situación o datos.");
        setLoadingAI(true);
        setAiResult("");

        try {
            let action = '';
            let params = {};

            if (modalMode === 'translator') {
                action = 'translate_report';
                params = { datosTecnicos: inputText, nombreEstudiante: selectedStudent.name };
            } else if (modalMode === 'evidence') {
                action = 'analyze_evidence';
                params = { observacion: inputText };
            } else if (modalMode === 'warning') {
                action = 'detect_warning';
                params = { incidencias: inputText, nombreEstudiante: selectedStudent.name };
            }

            const res = await fetch('/api/family', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, ...params })
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);
            setAiResult(data.result);

        } catch (e) {
            console.error(e);
            toast.error("Error consultando a Antigravity.");
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* HERITAGE HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Mi Aula: {activeInstitution?.name || "General"}</h1>
                <p className="text-slate-500">Herramientas de gestión humana y vinculación familiar.</p>
            </div>

            {/* STUDENTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map(s => (
                    <div key={s.id} className="card bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div className="avatar placeholder">
                                    <div className="bg-indigo-100 text-indigo-700 rounded-full w-12">
                                        <span className="text-xl font-bold">{s.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <span className={`badge ${s.needs === 'Ninguna' ? 'badge-ghost' : 'badge-warning'}`}>
                                    {s.needs}
                                </span>
                            </div>

                            <h2 className="card-title mt-4">{s.name}</h2>
                            <p className="text-sm text-slate-400">Nivel: {s.grade}</p>

                            <div className="divider my-2"></div>

                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => openTool(s, 'translator')}
                                    className="btn btn-xs btn-outline btn-info flex flex-col h-auto py-2 gap-1"
                                    title="Traducir reporte técnico a lenguaje familiar"
                                >
                                    💬 <span className="text-[9px]">Reporte</span>
                                </button>
                                <button
                                    onClick={() => openTool(s, 'evidence')}
                                    className="btn btn-xs btn-outline btn-success flex flex-col h-auto py-2 gap-1"
                                    title="Registrar evidencia de aprendizaje real"
                                >
                                    📝 <span className="text-[9px]">Bitácora</span>
                                </button>
                                <button
                                    title="Generar alerta preventiva"
                                >
                                    ⚠️ <span className="text-[9px]">Alerta</span>
                                </button>
                                <button
                                    onClick={() => openTool(s, 'edit_profile')}
                                    className="col-span-3 btn btn-xs btn-ghost text-slate-400 hover:text-slate-600"
                                >
                                    ⚙️ Editar Neuro-Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI MODAL */}
            {modalMode && selectedStudent && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* HEADER */}
                        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                {modalMode === 'translator' && "👨👩👧👦 Traductor Pedagógico-Familiar"}
                                {modalMode === 'evidence' && "🕵️♀️ Bitácora de Evidencias"}
                                {modalMode === 'warning' && "🚦 Sistema de Alerta Temprana"}
                                {modalMode === 'edit_profile' && "🧬 Edición de Neuro-Perfil S.H.I.E.L.D."}
                            </h3>
                            <button onClick={() => setModalMode(null)} className="btn btn-circle btn-ghost btn-sm text-white">✕</button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-4">
                            <p className="text-slate-500 text-sm">
                                {modalMode === 'translator' && `Antigravity traducirá tus datos técnicos de ${selectedStudent.name} a un mensaje empático (Técnica Sándwich).`}
                                {modalMode === 'evidence' && `Transforma una observación simple de ${selectedStudent.name} en una evidencia de aprendizaje sólida.`}
                                {modalMode === 'warning' && `Detecta patrones de riesgo en ${selectedStudent.name} y redacta un acercamiento preventivo.`}
                            </p>

                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            ></textarea>

                        <button
                            onClick={runAI}
                            disabled={loadingAI}
                            className="btn btn-primary w-full shadow-lg shadow-indigo-500/30"
                        >
                            {loadingAI ? <span className="loading loading-dots"></span> : "✨ Generar con Antigravity"}
                        </button>

                        {/* COLLAPSIBLE NEURO-PROFILE (Z-PATTERN) */}
                        {modalMode === 'edit_profile' && (
                            <div className="space-y-2 mt-4 animate-fade-in-up">
                                <h4 className="font-bold text-slate-700 mb-2">🧬 Neuro-Perfil (Datos Sensibles)</h4>

                                <details className="group border border-slate-200 rounded-lg open:shadow-md transition-all">
                                    <summary className="flex justify-between items-center cursor-pointer p-3 font-semibold text-slate-600 hover:bg-slate-50">
                                        <span>🧠 Ansiedad & Estrés</span>
                                        <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="p-3 border-t bg-slate-50 text-sm space-y-2">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input type="checkbox" className="checkbox checkbox-xs" />
                                            <span>Requiere "Rampa de Éxito" (Dopamina Temprana)</span>
                                        </label>
                                        <input type="text" placeholder="Detonantes específicos..." className="input input-sm input-bordered w-full" />
                                    </div>
                                </details>

                                <details className="group border border-slate-200 rounded-lg open:shadow-md transition-all">
                                    <summary className="flex justify-between items-center cursor-pointer p-3 font-semibold text-slate-600 hover:bg-slate-50">
                                        <span>💊 Medicación & Salud</span>
                                        <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="p-3 border-t bg-slate-50 text-sm">
                                        <textarea className="textarea textarea-bordered w-full h-20" placeholder="Horarios y dosis (Cifrado en reposo)"></textarea>
                                    </div>
                                </details>

                                <details className="group border border-slate-200 rounded-lg open:shadow-md transition-all">
                                    <summary className="flex justify-between items-center cursor-pointer p-3 font-semibold text-slate-600 hover:bg-slate-50">
                                        <span>👁️ Accesibilidad Visual</span>
                                        <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="p-3 border-t bg-slate-50 text-sm">
                                        <select className="select select-bordered select-sm w-full">
                                            <option>Estándar</option>
                                            <option>Alto Contraste</option>
                                            <option>Fuente Atkinson Hyperlegible</option>
                                        </select>
                                    </div>
                                </details>
                            </div>
                        )}

                        {/* RESULT */}
                        {aiResult && (
                            <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Respuesta Generada:</h4>
                                <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line">
                                    {aiResult}
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button className="btn btn-xs" onClick={() => { navigator.clipboard.writeText(aiResult); toast.success("Copiado"); }}>Copiar</button>
                                    <button className="btn btn-xs btn-outline">Guardar en Historial</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
