import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Página no encontrada</h2>
        <p className="text-slate-500 mb-8">
            Lo sentimos, la ruta que buscas no existe en el sistema AulaPlan o ha sido movida.
        </p>
        <Link 
            href="/dashboard" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
        >
            <Home size={20} />
            Volver al Centro de Comando
        </Link>
      </div>
      <p className="mt-8 text-xs text-slate-400 font-mono">AulaPlan System v1.0 Gold</p>
    </div>
  );
}