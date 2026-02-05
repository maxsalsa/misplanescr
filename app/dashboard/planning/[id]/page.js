"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { getPlanById, updatePlan } from "@/lib/plans-service";
import { toast } from "sonner";
// DYNAMIC IMPORT REQUIRED FOR JSPDF IN NEXT.JS
import dynamic from "next/dynamic";
// Normal imports that are safe
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// jsPDF and autoTable will be imported inside the function or dynamically if needed,
// but easier is to just import them at top and ensure this component is strictly client only,
// which it is ("use client").
// However, build can still fail if node_modules are weird.
// Let's rely on standard import but verifying installed.
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

/**
 * EDITOR DE PLANEAMIENTO (DIGNITY ENGINE)
 * Permite al docente tomar control total sobre la IA.
 */
import { useParams } from "next/navigation";
// ...

export default function PlanEditorPage() {
  // Next.js 15+: useParams() is the stable way to access params in Client Components
  const params = useParams();
  // Unwrap safely
  const id = params?.id;

  const { user } = useAuth();
  const router = useRouter();

  // State
  const [plan, setPlan] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState("split"); // split, edit, preview

  // Load Plan
  // Load Plan
  useEffect(() => {
    if (!id || !user) return;

    async function loadPlanData() {
      try {
        const data = await getPlanById(id);
        if (!data) {
          toast.error("Plan no encontrado");
          router.push("/dashboard/planning");
          return;
        }
        // Security Check
        if (data.userId !== user.id && data.userId !== "demo-user") {
          toast.error("Acceso denegado");
          router.push("/dashboard/planning");
          return;
        }

        setPlan(data);
        setContent(data.rawContent || "");
      } catch (e) {
        console.error(e);
        toast.error("Error cargando el documento.");
      } finally {
        setLoading(false);
      }
    }

    loadPlanData();
  }, [id, user, router]);

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

  // PDF BLINDADO Y ESTRATÉGICO (DRM V195)
  const handleExportPDF = async () => {
    if (!plan) return;
    setSaving(true);
    try {
      const jsPDF = (await import("jspdf")).default;
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // 0. VERIFICACIÓN DE ESTATUS (DRM)
      const isPremium =
        user?.planType === "ULTRA" || user?.role === "SUPER_ADMIN";

      // 1. MARCA DE AGUA CONDICIONAL
      if (!isPremium) {
        // MODO FREE: MARCA INTRUSIVA (EL GANCHO)
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.15 }));
        doc.setFontSize(40);
        doc.setTextColor(200, 0, 0); // Rojo Tenue
        doc.text(
          "VISTA PREVIA - SIN LICENCIA",
          pageWidth / 2,
          pageHeight / 2 - 20,
          { align: "center", angle: 45 },
        );
        doc.text("ADQUIERA PLAN ULTRA", pageWidth / 2, pageHeight / 2 + 20, {
          align: "center",
          angle: 45,
        });
        doc.setFontSize(20);
        doc.text("SINPE: 6090-6359", pageWidth / 2, pageHeight / 2 + 50, {
          align: "center",
          angle: 45,
        });
        doc.restoreGraphicsState();
      } else {
        // MODO ULTRA: LIMPIO Y ELEGANTE
        // Sin marca diagonal. Solo calidad.
      }

      // 2. ENCABEZADO OFICIAL
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text(plan.title || "Planeamiento Didáctico", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 26);

      // 3. CONTENIDO
      let yPos = 35;

      // Intentar renderizar tabla si existe Data Estructurada (JSON)
      if (plan.metadata && plan.metadata.columns) {
        // Lógica para tablas dinámicas (V300)
        // Por ahora, fallback a texto si no hay estructura compleja
      }

      // Fallback a Texto Plano pero formateado
      const splitText = doc.splitTextToSize(
        content.replace(
          /---JSON_DATA_START---[\s\S]*?---JSON_DATA_END---/g,
          "",
        ),
        180,
      );
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(splitText, 14, yPos);

      // 4. PIE DE PÁGINA (SOBERANÍA)
      // Esto se mantiene para TODOS (Marca de Origen)
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.line(14, pageHeight - 15, pageWidth - 14, pageHeight - 15);

        const subscriberName = user.name ? user.name.toUpperCase() : "USUARIO";
        // Si es premium, licenciamiento oficial. Si es free, advertencia.
        const licenseText = isPremium
          ? `LICENCIA ULTRA CERTIFICADA: ${subscriberName}`
          : `DOCUMENTO NO OFICIAL - GENERADO POR AULAPLAN`;

        doc.text(licenseText, 14, pageHeight - 10);
        doc.text(
          `Página ${i} de ${pageCount}`,
          pageWidth - 30,
          pageHeight - 10,
        );
      }

      doc.save(`AULAPLAN_${isPremium ? "OFICIAL" : "PREVIEW"}_${plan.id}.pdf`);

      if (isPremium) {
        toast.success("Documento Certificado Exportado.");
      } else {
        toast("Modo Vista Previa", {
          description:
            "Suscríbase al Plan Ultra para remover la marca de agua.",
          action: {
            label: "Activar",
            onClick: () => alert("SINPE: 6090-6359"),
          },
        });
      }
    } catch (e) {
      console.error("PDF Error:", e);
      toast.error("Error al generar PDF.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // Filter out the JSON block for the Preview to avoid ugliness
  const cleanPreview = content.replace(
    /---JSON_DATA_START---[\s\S]*?---JSON_DATA_END---/g,
    "",
  );

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50">
      {/* TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="font-bold text-slate-800 text-lg truncate max-w-md">
              {plan?.title}
            </h1>
            <span className="text-xs text-slate-400 font-mono">
              Última edición:{" "}
              {new Date(plan?.updatedAt || plan?.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="join border border-slate-300 rounded-lg mr-4 hidden md:flex">
            <button
              className={`join-item btn btn-sm ${viewMode === "edit" ? "btn-neutral" : "btn-ghost"}`}
              onClick={() => setViewMode("edit")}
            >
              Editar
            </button>
            <button
              className={`join-item btn btn-sm ${viewMode === "split" ? "btn-neutral" : "btn-ghost"}`}
              onClick={() => setViewMode("split")}
            >
              Dividido
            </button>
            <button
              className={`join-item btn btn-sm ${viewMode === "preview" ? "btn-neutral" : "btn-ghost"}`}
              onClick={() => setViewMode("preview")}
            >
              Vista Previa
            </button>
          </div>

          {/* PAYWALL V300: Solo ULTRA descarga. FREE ve candado. */}
          {user?.planType === "ULTRA" || user?.role === "SUPER_ADMIN" ? (
            <button
              className="btn btn-ghost btn-sm text-slate-600"
              onClick={handleExportPDF}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              PDF
            </button>
          ) : (
            <button
              className="btn btn-sm btn-ghost text-slate-400 cursor-not-allowed gap-2"
              onClick={() =>
                toast("Función Ultra Bloqueada", {
                  description:
                    "Active su licencia al 6090-6359 para descargar.",
                  action: { label: "SINPE", onClick: () => {} },
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Descarga Bloqueada
            </button>
          )}

          <button
            onClick={handleSave}
            className="btn btn-primary btn-sm gap-2"
            disabled={saving}
          >
            {saving ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
              </svg>
            )}
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* EDITOR AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* EDITOR PANE */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div
            className={`h-full border-r border-slate-200 bg-white ${viewMode === "split" ? "w-1/2" : "w-full"}`}
          >
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
        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className={`h-full overflow-y-auto bg-white p-8 ${viewMode === "split" ? "w-1/2" : "w-full max-w-4xl mx-auto"}`}
          >
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
