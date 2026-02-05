"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, BookOpen } from "lucide-react";

export default function PortalLogin() {
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if(pin.length > 3) {
        // En un app real, aquí validaríamos contra la DB.
        // Por ahora, simulamos que entra directo al dashboard del estudiante.
        router.push(`/portal/dashboard?pin=${pin}`);
    } else {
        alert("Por favor ingrese un PIN válido.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
            <BookOpen className="text-white" size={32}/>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">AulaPlan Connect</h1>
        <p className="text-slate-500">Portal de Estudiantes y Familias</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Código de Acceso (PIN)</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-300" size={20}/>
                    <input 
                        type="text" 
                        placeholder="Ej: EST-8821" 
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-lg tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.toUpperCase())}
                    />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center">Solicite este código a su docente guía.</p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                Ingresar al Portal <ArrowRight size={20}/>
            </button>
        </form>
      </div>
      
      <p className="mt-8 text-xs text-slate-400">© 2026 Ministerio de Educación Pública • Plataforma Oficial</p>
    </div>
  );
}