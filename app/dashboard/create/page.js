"use client";
import { useState, useEffect } from "react";
import { BookOpen, CheckSquare, BarChart3, AlertCircle, Settings, FileText, BrainCircuit, Wand2 } from "lucide-react";
import { toast } from "sonner";
import StrategySelector from "@/components/features/StrategySelector"; // Assuming this exists or we need to check it
import { getSubjects, getUnitsBySubject } from "@/app/actions/curriculum-actions";

// --- DUA OPTIONS (Protocol VIGÍA V2) ---
const DUA_OPTIONS = [
    { id: "VISUAL", label: "Apoyo Visual", icon: "👁️" },
    { id: "AUDITIVO", label: "Apoyo Auditivo", icon: "👂" },
    { id: "KINESTESICO", label: "Maker/Kinestésico", icon: "✋" },
    { id: "TDAH", label: "Tiempos Flexibles", icon: "⏳" },
];

export default function CreatePlanPage() {
    // --- STATE: HYDRATION ---
    const [subjects, setSubjects] = useState([]);
    const [units, setUnits] = useState([]);

    // --- STATE: SELECTION MAPPING ---
    const [modality, setModality] = useState("ACADEMICA");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");

    // --- STATE: WORKSPACE ---
    const [planContent, setPlanContent] = useState([]); // The Rows
    const [activeDUA, setActiveDUA] = useState([]);     // The Toggles

    // --- LIFECYCLE: BOOTSTRAP ---
    useEffect(() => {
        async function boot() {
            const res = await getSubjects();
            if (res.success) setSubjects(res.data);
            else toast.error("Error conectando con el Núcleo.");
        }
        boot();
    }, []);

    // --- ACTION: SELECT SUBJECT ---
    const handleSubjectChange = async (e) => {
        const subId = e.target.value;
        setSelectedSubject(subId);
        setSelectedUnit("");
        setPlanContent([]); // Clear workspace

        if (!subId) return;

        const toastId = toast.loading("Cargando Programa Oficial...");
        const res = await getUnitsBySubject(subId);

        if (res.success) {
            setUnits(res.data);
            toast.dismiss(toastId);
            toast.success("Programa Oficial Sincronizado.");
        } else {
            toast.dismiss(toastId);
            toast.error(res.error);
        }
    };

    // --- ACTION: SELECT UNIT (THE DOWNLOAD) ---
    const handleUnitSelect = (unitId) => {
        const unit = units.find(u => u.id === unitId);
        setSelectedUnit(unitId);

        // TRANSFORMATION: UNIT -> EDITOR ROWS
        const initialRows = unit.outcomes.map(o => ({
            outcome: o.description,
            indicator: o.description, // Initial mapping (1:1)
            mediation: "",            // Empty for teacher input
            rubric: null,             // Empty until generated
            strategies: []            // Array for multi-strategy
        }));

        setPlanContent(initialRows);
        toast.info(`Unidad Cargada: ${unit.title}`, {
            description: `${unit.outcomes.length} Indicadores listos para mediación.`
        });
    };

    // --- ACTION: UPDATE ROW ---
    const updateRow = (index, field, value) => {
        const newRows = [...planContent];
        newRows[index][field] = value;
        setPlanContent(newRows);
    };

    // --- ACTION: INJECT STRATEGY ---
    const handleInjectStrategy = (index, strategy) => {
        const newRows = [...planContent];
        newRows[index].mediation = strategy.content || strategy.description;

        // If strategy has a rubric, parse it
        if (strategy.rubricModel) {
            try {
                newRows[index].rubric = typeof strategy.rubricModel === 'string'
                    ? JSON.parse(strategy.rubricModel)
                    : strategy.rubricModel;
            } catch (e) { console.warn("Rubric parse failed", e); }
        }
        setPlanContent(newRows);
        toast.success("Estrategia Inyectada (Antigravity Link)");
    };

    // --- ACTION: GENERATE PDF (GUTENBERG) ---
    const handleGenerate = async () => {
        if (!selectedUnit) return toast.error("Seleccione una unidad primero.");

        const payload = {
            regional: "San José Norte", // Should come from User Context
            school: "CTP Mercedes Norte",
            teacher: { name: "Lic. Max Salazar" },
            subject: subjects.find(s => s.id === selectedSubject)?.name,
            level: "Sección 10-1",
            period: "I Semestre 2026",
            modality: modality,
            unitTitle: units.find(u => u.id === selectedUnit)?.title,

            // RAW DATA FOR FACTORY
            rubrica: planContent.map(row => ({
                aprendizaje: row.outcome,
                indicador: row.indicator,
                estrategias: { desarrollo: row.mediation }, // Simplified mapping
                rubric: row.rubric
            })),
            adecuaciones: {
                acceso: activeDUA.includes("VISUAL") ? ["Material Visual"] : ["General"]
            }
        };

        try {
            toast.loading("Generando Documento Oficial...");
            const { generatePDF } = await import("@/lib/pdf-factory"); // Dynamic Import for Performance
            const blob = generatePDF(payload);

            // Download Trigger
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Planeamiento_${payload.subject}_2026.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.dismiss();
            toast.success("PDF Generado Exitosamente.");
        } catch (e) {
            console.error(e);
            toast.dismiss();
            toast.error("Error en el Motor de PDF (Gutenberg).");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">

            {/* --- 1. HUD HEADER --- */}
            <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <BrainCircuit className="text-blue-600" /> Editor Omni-Plan
                    </h1>
                    <div className="flex gap-2 mt-2">
                        <select className="select select-sm select-bordered" value={modality} onChange={(e) => setModality(e.target.value)}>
                            <option value="ACADEMICA">Académica DO</option>
                            <option value="TECNICA">Técnica (CTP)</option>
                            <option value="NOCTURNA">Nocturna / CINDEA</option>
                        </select>
                        <select className="select select-sm select-bordered w-48" value={selectedSubject} onChange={handleSubjectChange}>
                            <option value="">-- Asignatura --</option>
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.educationLevel})</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex gap-1 bg-slate-50 p-1 rounded-lg">
                    {DUA_OPTIONS.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setActiveDUA(prev => prev.includes(opt.id) ? prev.filter(p => p !== opt.id) : [...prev, opt.id])}
                            className={`btn btn-xs ${activeDUA.includes(opt.id) ? "btn-neutral" : "btn-ghost text-slate-400"}`}
                            title={opt.label}
                        >
                            {opt.icon} {opt.id}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* --- 2. SIDEBAR (UNITS) --- */}
                <aside className="lg:col-span-3 space-y-4">
                    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${!selectedSubject && "opacity-50 pointer-events-none"}`}>
                        <div className="bg-slate-900 text-white p-3 font-bold text-sm flex justify-between">
                            <span>Programa Oficial</span>
                            <BookOpen size={16} />
                        </div>
                        <div className="max-h-[500px] overflow-y-auto p-2 space-y-1">
                            {units.length > 0 ? units.map(u => (
                                <button
                                    key={u.id}
                                    onClick={() => handleUnitSelect(u.id)}
                                    className={`w-full text-left p-3 rounded-lg text-xs leading-relaxed transition-colors ${selectedUnit === u.id ? "bg-blue-50 text-blue-800 border-blue-200 border font-bold" : "hover:bg-slate-50 text-slate-600"}`}
                                >
                                    {u.title}
                                </button>
                            )) : (
                                <div className="p-8 text-center text-slate-400 text-xs">
                                    Seleccione una asignatura para cargar el programa.
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* --- 3. WORKSPACE (EDITOR) --- */}
                <main className="lg:col-span-9 space-y-6">
                    {planContent.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                                <h2 className="font-bold text-lg text-slate-800">Diseño de Mediación</h2>
                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">V3000.OMEGA</span>
                            </div>

                            <div className="space-y-8">
                                {planContent.map((row, idx) => (
                                    <div key={idx} className="group relative pl-4 border-l-4 border-slate-200 hover:border-blue-500 transition-colors">
                                        <div className="mb-2">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Resultado de Aprendizaje</h4>
                                            <p className="text-sm font-medium text-slate-700 bg-slate-50 p-2 rounded">{row.outcome}</p>
                                        </div>

                                        <div className="relative">
                                            <div className="flex justify-between mb-1">
                                                <label className="text-xs font-bold text-blue-600 uppercase">Estrategia (Binomio)</label>
                                                {/* Strategy Selector Would Go Here - Mocking a button for now */}
                                                <button
                                                    onClick={() => handleInjectStrategy(idx, { content: "Estrategia Demo: Aprendizaje Basado en Proyectos (ABP).", rubricModel: null })}
                                                    className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Wand2 size={10} /> Sugerir IA
                                                </button>
                                            </div>
                                            <textarea
                                                value={row.mediation}
                                                onChange={(e) => updateRow(idx, "mediation", e.target.value)}
                                                className="textarea textarea-bordered w-full text-sm h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Describa la mediación pedagógica..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-6 border-t border-slate-100">
                                <button onClick={handleGenerate} className="btn btn-primary w-full shadow-xl shadow-blue-500/20 text-white font-bold">
                                    <FileText className="mr-2" /> Generar PDF Oficial
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                            <BarChart3 size={48} className="opacity-20 mb-4" />
                            <p>El lienzo está vacío.</p>
                            <p className="text-sm">Seleccione una Unidad del menú lateral.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}