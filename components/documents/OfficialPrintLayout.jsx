"use client";
import React, { useRef } from "react";
import { Download, Printer } from "lucide-react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ExportController from "@/components/features/generator/ExportController";
import { toast } from "sonner";

export default function OfficialPrintLayout({
  children,
  teacherName,
  schoolName = "Ministerio de Educación Pública",
  subject,
  level,
  year = "2026",
  indicators = [],
}) {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) return;

    toast.info("Generando Documento Oficial...");
    try {
      // High-Resolution Canvas
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Planeamiento_Oficial_${subject}_${year}.pdf`);
      toast.success("Descarga Exitosa 🚀");
    } catch (e) {
      console.error("PDF Export Error", e);
      toast.error(
        "Error al generar PDF. Intente Imprimir -> Guardar como PDF.",
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      {/* Toolbar (No Print) */}
      <div className="flex justify-between items-center mb-6 no-print bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          Vista Previa Oficial
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handlePrint}
            className="btn btn-outline btn-sm gap-2"
          >
            <Printer size={16} /> Imprimir
          </button>
          {/* INTEGRATED EXPORT CONTROLLER */}
          <ExportController
            onExport={handleDownload}
            documentName="Planeamiento"
          />
        </div>
      </div>

      {/* DOCUMENT CANVAS */}
      <div
        ref={printRef}
        className="bg-white text-black p-12 shadow-2xl min-h-[297mm] print:shadow-none print:w-full print:m-0"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* 1. OFFICIAL HEADER */}
        <header className="border-b-2 border-black pb-4 mb-8 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center border border-black text-xs text-center font-bold">
              LOGO MEP
            </div>
            <div>
              <h1 className="font-bold text-lg uppercase tracking-wider">
                Ministerio de Educación Pública
              </h1>
              <h2 className="font-bold text-md uppercase">{schoolName}</h2>
              <p className="text-sm">Departamento de Asesoría Pedagógica</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p>
              <strong>Curso Lectivo:</strong> {year}
            </p>
            <p>
              <strong>Docente:</strong> {teacherName || "_____________________"}
            </p>
            <p>
              <strong>Asignatura:</strong> {subject || "_____________________"}
            </p>
            <p>
              <strong>Nivel:</strong> {level || "_______"}
            </p>
          </div>
        </header>

        {/* 2. MAIN CONTENT BODY */}
        <main className="mb-8 min-h-[100mm]">{children}</main>

        {/* 3. MANDATORY EVALUATION FOOTER */}
        <footer className="border-t-2 border-black pt-4 mt-auto">
          <div className="mb-4">
            <h3 className="font-bold text-sm uppercase mb-2 bg-gray-100 p-1 inline-block">
              Matriz de Evaluación (Indicadores de Aprendizaje)
            </h3>
            {indicators.length === 0 ? (
              <p className="text-sm italic text-gray-500 border border-dashed border-gray-300 p-2">
                [Espacio reservado para indicadores. Deben ser observables y
                medibles.]
              </p>
            ) : (
              <table className="w-full text-sm border-collapse border border-black">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-black p-1">Indicador</th>
                    <th className="border border-black p-1">
                      Nivel de Desempeño
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {indicators.map((ind, i) => (
                    <tr key={i}>
                      <td className="border border-black p-1">
                        {ind.indicator || ind}
                      </td>
                      <td className="border border-black p-1 italic text-gray-600">
                        (Logrado / En Proceso / No Logrado)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* SIGNATURE BLOCK */}
          <div className="flex justify-between items-end mt-12 pt-8">
            <div className="text-center">
              <div className="border-t border-black w-64 mb-1"></div>
              <p className="text-xs font-bold uppercase">
                Nombre y Firma de la Persona Docente
              </p>
            </div>
            <div className="text-center">
              <div className="border-t border-black w-64 mb-1"></div>
              <p className="text-xs font-bold uppercase">
                Sello de la Institución
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
