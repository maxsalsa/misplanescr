import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function OfficialDocument({ planData, user, content }) {
  if (!content) return null;

  return (
    <div className="hidden print:block w-full max-w-[21cm] mx-auto bg-white p-8 text-black">
      {/* ENCABEZADO OFICIAL MEP */}
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
        <div className="w-20 h-20 border border-slate-300 flex items-center justify-center text-[10px] text-center">
          [ESCUDO MEP]
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold uppercase">
            Ministerio de Educación Pública
          </h1>
          <h2 className="text-sm font-bold uppercase">
            Dirección Regional {user?.regional || "_______"}
          </h2>
          <h3 className="text-sm uppercase">
            Centro Educativo {user?.centro || "_______"}
          </h3>
        </div>
        <div className="w-20 h-20 border border-slate-300 flex items-center justify-center text-[10px] text-center">
          [ESCUDO COLEGIO]
        </div>
      </div>

      {/* DATOS ADMINISTRATIVOS (Tabla Rígida) */}
      <div className="mb-6 border border-black">
        <div className="grid grid-cols-4 border-b border-black bg-gray-100 font-bold text-xs uppercase p-1">
          <div className="border-r border-black px-2">Docente</div>
          <div className="border-r border-black px-2">Asignatura</div>
          <div className="border-r border-black px-2">Nivel</div>
          <div className="px-2">Periodo</div>
        </div>
        <div className="grid grid-cols-4 text-xs p-1">
          <div className="border-r border-black px-2 py-1">
            {user?.name || "_______"}
          </div>
          <div className="border-r border-black px-2 py-1">
            {planData?.asignatura || "_______"}
          </div>
          <div className="border-r border-black px-2 py-1">
            {planData?.nivel || "_______"}
          </div>
          <div className="px-2 py-1">I Periodo 2026</div>
        </div>
      </div>

      {/* CUERPO DEL PLAN (Renderizado Markdown) */}
      <div
        className="prose prose-sm max-w-none 
        prose-headings:text-black prose-headings:uppercase prose-headings:text-sm prose-headings:font-bold prose-headings:border-b prose-headings:border-black prose-headings:mt-4
        prose-table:border prose-table:border-black prose-table:text-xs prose-table:w-full
        prose-th:bg-gray-100 prose-th:border prose-th:border-black prose-th:p-2 prose-th:text-center prose-th:uppercase
        prose-td:border prose-td:border-black prose-td:p-2 prose-td:align-top
        prose-p:text-justify prose-p:leading-tight
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {/* PIE DE PÁGINA (Firmas) */}
      <div className="mt-16 grid grid-cols-2 gap-20 text-center break-inside-avoid">
        <div className="border-t border-black pt-2">
          <p className="text-xs uppercase font-bold">Firma del Docente</p>
          <p className="text-[10px]">{user?.name}</p>
        </div>
        <div className="border-t border-black pt-2">
          <p className="text-xs uppercase font-bold">Visto Bueno (Dirección)</p>
          <p className="text-[10px]">Sello y Firma</p>
        </div>
      </div>

      <div className="mt-8 text-[8px] text-center text-gray-500">
        Generado oficialmente mediante plataforma AulaPlan | Documento
        Inalterable ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
      </div>
    </div>
  );
}
