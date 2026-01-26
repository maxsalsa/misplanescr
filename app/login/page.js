"use client";
import { useState } from "react";
import { ShieldCheck, Lock, User, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Credenciales Verificadas");
        window.location.href = "/dashboard";
      } else {
        toast.error(data.error || "Acceso Denegado");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Error de conexión. Revisa la consola.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* IZQUIERDA: MARCA INSTITUCIONAL */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck size={32} />
          </div>
          <span className="text-xl font-bold tracking-widest">AULAPLAN MEP</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">Gestión Curricular Industrial.</h1>
          <p className="text-slate-400 text-lg">Plataforma oficial de planeamiento y evaluación educativa. Acceso restringido a personal autorizado.</p>
        </div>

        <div className="relative z-10 text-xs text-slate-500 font-mono">
          SYSTEM STATUS: ONLINE | V4.2 STABLE
        </div>
      </div>

      {/* DERECHA: FORMULARIO */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Iniciar Sesión</h2>
            <p className="text-slate-500 text-sm mt-1">Ingrese sus credenciales institucionales.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Correo Oficial</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  name="email" 
                  type="email" 
                  defaultValue="max.salazar.sanchez@mep.go.cr"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm font-medium text-slate-900"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm font-medium text-slate-900"
                  required 
                />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "ACCEDER AHORA"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <span className="text-xs text-slate-400">¿Olvidó sus credenciales? Contacte a Soporte Técnico.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
