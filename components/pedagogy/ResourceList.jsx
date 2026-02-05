import { Link2, FileText, Video, Box } from "lucide-react";

export default function ResourceList({ resources }) {
  // Generamos recursos simulados si no vienen en la DB para demostración
  const list = resources || [
    { type: "PDF", title: "Guía de Trabajo Autónomo.pdf" },
    { type: "Video", title: "Explicación del Tema (YouTube)" },
    { type: "Link", title: "Simulador Interactivo" },
  ];

  const getIcon = (type) => {
    if (type === "Video") return <Video size={14} className="text-red-500" />;
    if (type === "PDF")
      return <FileText size={14} className="text-orange-500" />;
    return <Link2 size={14} className="text-blue-500" />;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-6 break-inside-avoid">
      <h3 className="text-slate-800 font-bold flex items-center gap-2 mb-4 uppercase text-sm">
        <Box className="text-purple-600" /> Recursos Didácticos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {list.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-white p-3 rounded border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
          >
            {getIcon(r.type)}
            <span className="text-xs font-bold text-slate-700">{r.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
