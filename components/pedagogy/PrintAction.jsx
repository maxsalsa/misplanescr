"use client";
import { Printer, Download } from "lucide-react";

export default function PrintAction() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2 no-print">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-700 transition-all shadow-lg"
      >
        <Printer size={16} /> Imprimir / PDF
      </button>
      <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">
        <Download size={16} /> Descargar JSON
      </button>
    </div>
  );
}
