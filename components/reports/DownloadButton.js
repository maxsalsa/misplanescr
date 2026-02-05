"use client";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { PdfFactory } from "./PdfFactory";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DownloadButton({
  data,
  content,
  userRole,
  subscriptionStatus,
}) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      // 1. Validar Permisos (Super Admin Bypass)
      if (subscriptionStatus !== "ULTRA" && subscriptionStatus !== "PRO") {
        toast.error("Función Premium", {
          description: "Actualice su plan para descargar PDFs oficiales.",
        });
        setGenerating(false);
        return;
      }

      // 2. Detectar Modalidad para elegir plantilla
      // (Aquí asumimos una lógica simple, en prod viene de data.modality)
      let modality = "ACADEMICA";
      if (
        data.subject.includes("Taller") ||
        data.subject.includes("Desarrollo")
      )
        modality = "TECNICA";
      if (data.level.includes("Materno")) modality = "PREESCOLAR";

      // 3. Generar Blob
      const doc = (
        <PdfFactory modality={modality} data={data} content={content} />
      );
      const asPdf = pdf([]); // Instance
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();

      // 4. Guardar
      saveAs(blob, `Planeamiento_${data.subject}_${data.level}.pdf`);
      toast.success("Descarga Exitosa", {
        description: "El documento oficial se ha generado.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error al generar PDF");
    }
    setGenerating(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform"
    >
      {generating ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Download size={18} />
      )}
      {generating ? "Redactando Oficial..." : "Descargar PDF Oficial"}
    </button>
  );
}
