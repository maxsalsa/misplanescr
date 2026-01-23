"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getPlanById, updatePlan } from '@/lib/plans-service';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * EDITOR DE PLANEAMIENTO (DIGNITY ENGINE)
 * Permite al docente tomar control total sobre la IA.
 */
export default function PlanEditorPage({ params }) {
    // Unwrap params for Next.js 13+ / 14 behavior if needed, generally params are avail directly in page props
    // but in newer Next versions they might be promises. Assuming standard behavior for now.
    // Safe approach for params.id access
    const { id } = params;

    const { user } = useAuth();
    const router = useRouter();

    // State
    const [plan, setPlan] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [viewMode, setViewMode] = useState('split'); // split, edit, preview

    // Load Plan
    useEffect(() => {
        if (!id || !user) return;
        loadPlanData();
    }, [id, user]);

    async function loadPlanData() {
        try {
            const data = await getPlanById(id);
            if (!data) {
                toast.error("Plan no encontrado");
                router.push('/dashboard/planning');
                return;
            }
            // Security Check
            if (data.userId !== user.id && data.userId !== 'demo-user') {
                toast.error("Acceso denegado");
                router.push('/dashboard/planning');
                return;
            }

            setPlan(data);
            // Prefer rawContent if available (hybrid output), else fallback
            setContent(data.rawContent || "");
        } catch (e) {
            console.error(e);
            toast.error("Error cargando el documento.");
        } finally {
            setLoading(false);
        }
    }

    // Save Function
    const handleSave = async () => {
        if (!plan) return;
        setSaving(true);
        try {
            // Update only content for now. 
            // In a real app we might re-parse JSON here, but for "Human Control" we prioritize text.
            await updatePlan(plan.id, {
                rawContent: content,
                // Optionally update status to saved/published logic here
            });
            toast.success("Cambios guardados exitosamente.");
        } catch (e) {
            console.error(e);
            toast.error("Error al guardar.");
        } finally {
            setSaving(false);
        }
    };

    // PDF Export (Simplified Logic reusing the text)
    // NOTE: For best results, we should reuse the sophisticated PDF logic from Generator, 
    // but here we will implement a quick Markdown->PDF export or text dump.
    // For now, let's keep it simple: Download as .MD or standardized PDF.
    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text(plan.title || "Planeamiento Didáctico", 14, 20);

        doc.setFontSize(11);
        doc.text("Generado por AutoPlanea-MEP", 14, 28);

        // Simple text dump for now (Markdown is hard to parse to PDF perfectly on client without library)
        // A better approach is to rely on the JSON data if we have it.
        // Let's try to print the JSON tables if they exist in plan.data

        let yPos = 40;

        if (plan.data && plan.data.secciones) {
            // We have structured data!
            try {
                const headers = [["Indicador", "Estrategias", "Evaluación"]];
                const rows = plan.data.secciones.map(s => [
                    s.indicador_aprendizaje || "-",
                    `${s.estrategias_mediacion?.inicio}\n\n${s.estrategias_mediacion?.desarrollo}\n\n${s.estrategias_mediacion?.cierre}`,
                    `${s.evaluacion?.tecnica} - ${s.evaluacion?.instrumento}`
                ]);

                autoTable(doc, {
                    startY: yPos,
                    head: headers,
                    body: rows,
                    theme: 'grid',
                    styles: { fontSize: 9, cellPadding: 3 },
                });
                doc.save(`Planeamiento_MEP_${plan.id}.pdf`);
                return;
            } catch (e) {
                console.warn("Could not generate from JSON, falling back to text", e);
            }
        }

        // Fallback
        const splitText = doc.splitTextToSize(content.replace(/---JSON_DATA_START---[\s\S]*---JSON_DATA_END---/, ''), 180);
        doc.text(splitText, 14, yPos);
        doc.save(`Plan_Texto_${plan.id}.pdf`);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    // Filter out the JSON block for the Preview to avoid ugliness
    const cleanPreview = content.replace(/---JSON_DATA_START---[\s\S]*?---JSON_DATA_END---/g, '');

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50">
            {/* TOOLBAR */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="btn btn-circle btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h1 className="font-bold text-slate-800 text-lg truncate max-w-md">{plan?.title}</h1>
                        <span className="text-xs text-slate-400 font-mono">Última edición: {new Date(plan?.updatedAt || plan?.createdAt).toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="join border border-slate-300 rounded-lg mr-4 hidden md:flex">
                        <button className={`join-item btn btn-sm ${viewMode === 'edit' ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setViewMode('edit')}>Editar</button>
                        <button className={`join-item btn btn-sm ${viewMode === 'split' ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setViewMode('split')}>Dividido</button>
                        <button className={`join-item btn btn-sm ${viewMode === 'preview' ? 'btn-neutral' : 'btn-ghost'}`} onClick={() => setViewMode('preview')}>Vista Previa</button>
                    </div>

                    <button className="btn btn-ghost btn-sm text-slate-600" onClick={handleExportPDF}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        PDF
                    </button>

                    <button
                        onClick={handleSave}
                        className="btn btn-primary btn-sm gap-2"
                        disabled={saving}
                    >
                        {saving ? <span className="loading loading-spinner loading-xs"></span> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" /></svg>}
                        Guardar Cambios
                    </button>
                </div>
            </div>

            {/* EDITOR AREA */}
            <div className="flex-1 flex overflow-hidden">
                {/* EDITOR PANE */}
                {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={`h-full border-r border-slate-200 bg-white ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
                        <textarea
                            className="w-full h-full p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed text-slate-700 bg-slate-50"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="# Escribe aquí tu planeamiento..."
                            spellCheck={false}
                        />
                    </div>
                )}

                {/* PREVIEW PANE */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div className={`h-full overflow-y-auto bg-white p-8 ${viewMode === 'split' ? 'w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
                        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-a:text-blue-600 prose-table:border-collapse prose-th:bg-slate-100 prose-td:border prose-td:border-slate-200 prose-th:border prose-th:border-slate-300 prose-td:p-3 prose-th:p-3">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {cleanPreview}
                            </ReactMarkdown>
                        </article>
                    </div>
                )}
            </div>
        </div>
    );
}
