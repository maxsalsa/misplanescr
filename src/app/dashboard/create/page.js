"use client";
import { useState } from "react";
import DashboardShell from "../../../components/DashboardShell";
import { Sparkles, Loader2, CheckCircle, FileJson, LayoutTemplate } from "lucide-react";
import { toast } from "sonner"; // Notificaciones

/**
 * PÁGINA: GENERADOR DE PLANES
 * Interfaz principal para invocar al Motor Híbrido (OpenAI/Groq).
 */
export default function CreatePlanPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [activeTab, setActiveTab] = useState("preview"); // "preview" | "json"

    // Estado del formulario
    const [formData, setFormData] = useState({
        materia: "",
        nivel: "",
        tema: ""
    });

    // Manejo del envío
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Notificación de inicio
        const toastId = toast.loading("Conectando con Antigravity (Motor Híbrido)...");

        try {
            const res = await fetch("/api/planning/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    materia: formData.materia,
                    nivel: formData.nivel,
                    tema: formData.tema,
                    provider: "OPENAI" // Prioridad Platinum
                }),
            });

            const data = await res.json();

            if (!data.success) throw new Error(data.error);

            setResult(data.data);
            toast.success("¡Plan generado con éxito!", { id: toastId });

            // Aquí podríamos llamar a un log del lado del cliente si tuviéramos API de logs pública
            // Por ahora el backend ya lo registró.

        } catch (error) {
            console.error(error);
            toast.error(`Error: ${error.message}`, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* SECCIÓN IZQUIERDA: CONTROLES (4 COLUMNAS) */}
                <div className="lg:col-span-4 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <Sparkles size={24} /> Generador MEP
                        </h1>
                        <p className="text-sm opacity-70">Define los parámetros curriculares.</p>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <form onSubmit={handleSubmit} className="card-body gap-4 p-6">

                            {/* CAMPO: MATERIA */}
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase tracking-wide">Asignatura</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ej: Matemáticas, Ciencias..."
                                    className="input input-bordered input-sm w-full focus:input-primary"
                                    value={formData.materia}
                                    onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                                />
                            </div>

                            {/* CAMPO: NIVEL */}
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase tracking-wide">Nivel</label>
                                <select
                                    className="select select-bordered select-sm w-full focus:select-primary"
                                    value={formData.nivel}
                                    onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                                >
                                    <option disabled value="">Selecciona...</option>
                                    <option>Primer Ciclo</option>
                                    <option>Segundo Ciclo</option>
                                    <option>Tercer Ciclo</option>
                                    <option>Educación Diversificada</option>
                                </select>
                            </div>

                            {/* CAMPO: TEMA */}
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase tracking-wide">Tema / Eje</label>
                                <textarea
                                    required
                                    placeholder="Describe el contenido..."
                                    className="textarea textarea-bordered h-24 text-sm focus:textarea-primary"
                                    value={formData.tema}
                                    onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="card-actions mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary btn-sm w-full shadow-lg shadow-primary/20"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : "Iniciar Secuencia"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* SECCIÓN DERECHA: VISUALIZACIÓN (8 COLUMNAS) */}
                <div className="lg:col-span-8 h-full min-h-[500px]">
                    {/* PESTAÑAS DE CONTROL */}
                    <div role="tablist" className="tabs tabs-boxed mb-4 bg-base-100 border border-base-200 w-fit">
                        <a role="tab" className={`tab gap-2 ${activeTab === "preview" ? "tab-active" : ""}`} onClick={() => setActiveTab("preview")}>
                            <LayoutTemplate size={14} /> Vista Previa
                        </a>
                        <a role="tab" className={`tab gap-2 ${activeTab === "json" ? "tab-active" : ""}`} onClick={() => setActiveTab("json")}>
                            <FileJson size={14} /> Código Fuente
                        </a>
                    </div>

                    {/* ESTADO VACÍO */}
                    {!result && !loading && (
                        <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-box text-base-content/30">
                            <Sparkles size={48} className="mb-4 opacity-50" />
                            <p className="font-medium">Esperando parámetros...</p>
                        </div>
                    )}

                    {/* ESTADO CARGANDO */}
                    {loading && (
                        <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
                            <span className="loading loading-ring loading-lg text-primary"></span>
                            <div className="text-center space-y-1">
                                <p className="font-bold text-lg">Procesando ADN Curricular</p>
                                <p className="text-xs opacity-60">Consultando Neon DB & OpenAI...</p>
                            </div>
                        </div>
                    )}

                    {/* RESULTADOS */}
                    {result && (
                        <div className="card bg-base-100 shadow-xl border border-success/20 animate-in fade-in slide-in-from-bottom-2 h-full">
                            <div className="card-body p-0 overflow-hidden">

                                {/* VISTA PREVIA (RENDERIZADA) */}
                                {activeTab === "preview" && (
                                    <div className="p-6 space-y-4 overflow-y-auto max-h-[600px]">
                                        <div className="flex items-center gap-2 text-success font-bold text-sm uppercase tracking-widest border-b pb-2">
                                            <CheckCircle size={16} /> Plan Generado
                                        </div>

                                        {/* Aquí renderizamos el JSON de forma bonita */}
                                        <div className="prose prose-sm max-w-none">
                                            <h3>{result.encabezado?.materia}</h3>
                                            <ul>
                                                {(result.secciones || []).map((sec, i) => (
                                                    <li key={i}>
                                                        <strong>{sec.aprendizaje_esperado || "Aprendizaje"}</strong>
                                                        <ul>
                                                            {(sec.estrategias_mediacion || []).map((est, j) => (
                                                                <li key={j}>{est}</li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* VISTA CÓDIGO (JSON) */}
                                {activeTab === "json" && (
                                    <div className="mockup-code rounded-none h-full max-h-[600px]">
                                        <pre data-prefix="$"><code>JSON_STATUS: VALID</code></pre>
                                        <pre className="text-warning"><code>{JSON.stringify(result, null, 2)}</code></pre>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </DashboardShell>
    );
}
