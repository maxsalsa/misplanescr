import { AlertTriangle, HardHat, ShieldAlert } from "lucide-react";

export default function SafetyAlert({ meta }) {
  if (!meta || meta.risk_level !== "ALTO") return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-600 p-4 my-4 rounded-r-lg shadow-sm animate-in slide-in-from-left-5">
      <div className="flex items-start gap-3">
        <div className="bg-red-100 p-2 rounded-full">
            <ShieldAlert className="text-red-600" size={24} />
        </div>
        <div>
            <h3 className="font-black text-red-800 text-sm uppercase flex items-center gap-2">
                Protocolo de Seguridad Activado
                <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">OBLIGATORIO</span>
            </h3>
            <p className="text-red-700 text-sm mt-1 font-medium">
                Esta actividad implica riesgos físicos o químicos. Se requiere uso estricto de EPP.
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs text-red-800 bg-white p-2 rounded border border-red-100">
                    <HardHat size={14}/> Gafas ANSI Z87 / Careta
                </div>
                <div className="flex items-center gap-2 text-xs text-red-800 bg-white p-2 rounded border border-red-100">
                    <AlertTriangle size={14}/> Ropa Ajustada / Sin Joyas
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}