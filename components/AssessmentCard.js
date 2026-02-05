import { FileText, Calculator, CheckCircle } from "lucide-react";

export default function AssessmentCard({ item }) {
  // UX MEJORADA: Distinción visual por tipo de instrumento
  const getIcon = () => {
    if (item.type === "EXAMEN") return <Calculator className="text-red-500" />;
    if (item.type === "TAREA") return <FileText className="text-blue-500" />;
    return <CheckCircle className="text-green-500" />;
  };

  const getColor = () => {
    if (item.type === "EXAMEN")
      return "border-red-100 bg-red-50 hover:border-red-300";
    if (item.type === "TAREA")
      return "border-blue-100 bg-blue-50 hover:border-blue-300";
    return "border-green-100 bg-green-50 hover:border-green-300";
  };

  return (
    <div
      className={`p-5 rounded-xl border ${getColor()} transition-all shadow-sm hover:shadow-md cursor-pointer group`}
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-white rounded-lg shadow-sm">{getIcon()}</div>
        {item.specsTable && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-1 rounded text-slate-600 border border-slate-200">
            Tabla Specs Incluida
          </span>
        )}
      </div>

      <h3 className="mt-4 font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
        {item.title}
      </h3>

      <div className="mt-4 pt-4 border-t border-slate-200/50 flex justify-between text-xs text-slate-500">
        <span>Creado: {new Date(item.createdAt).toLocaleDateString()}</span>
        <span className="font-semibold">Ver Detalles →</span>
      </div>
    </div>
  );
}
