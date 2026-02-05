"use client";

export default function LegalDocumentViewer({ title, content }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <h2 className="text-xl font-bold mb-4 text-slate-900 border-b pb-2">{title}</h2>
      
      {/* REEMPLAZO DE SCROLLAREA POR DIV NATIVO (CERO ERRORES) */}
      <div className="h-[400px] w-full rounded-md border p-4 bg-white overflow-y-auto shadow-inner">
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
          {content || "Sin contenido legal para mostrar."}
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
        Documento oficial generado por AulaPlan Legal Core.
      </div>
    </div>
  );
}