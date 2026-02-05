"use client";

import { Printer, Loader2 } from "lucide-react";
import { useState } from "react";
import { PdfGenerator } from "@/services/pdf-service";

export default function DownloadPdfBtn({ plan, user, schoolName }) {
    const [generating, setGenerating] = useState(false);

    const handleDownload = async () => {
        try {
            setGenerating(true);

            // Simular retardo para feedback visual
            await new Promise(r => setTimeout(r, 800));

            const context = {
                teacherName: user?.name || "Docente MEP",
                schoolName: schoolName || "Ministerio de Educación Pública",
                period: "Curso Lectivo 2026",
                // CONTEXTO DE SEGURIDAD (Inmutable)
                userId: user?.id || "GUEST_ID",
                subscriptionStatus: user?.subscriptionStatus || "FREE"
            };

            // El contenido ya viene parseado o es string? 
            // En el page.js se parsea. Pasemos data limpia.

            // Instanciar Motor Gutenberg
            const pdfEngine = new PdfGenerator(plan, context);
            const doc = pdfEngine.generate();

            doc.save(`Planeamiento_${plan.subject}_${plan.level}.pdf`);

        } catch (error) {
            console.error("PDF Error:", error);
            alert("Error generando el documento oficial.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <button onClick={handleDownload} disabled={generating} className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
            {generating ? "Generando..." : "Descargar PDF Oficial"}
        </button>
    );
}
