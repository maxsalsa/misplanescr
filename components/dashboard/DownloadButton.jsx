"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MepPlanDocument } from "@/components/reports/MepPlanDocument";
import { Download, Loader2 } from "lucide-react";

export default function DownloadButton({ plan, teacherName }) {
  return (
    <PDFDownloadLink
      document={<MepPlanDocument plan={plan} teacherName={teacherName} />}
      fileName={`Planeamiento_${plan.subject}_${plan.level}.pdf`}
      className="w-full"
    >
      {({ loading }) => (
        <button
          disabled={loading}
          className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {loading ? "GENERANDO..." : "DESCARGAR PDF OFICIAL"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
