"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, BookOpen } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Credenciales incorrectas. Verifique su correo y contraseña.");
        setLoading(false);
      } else {
        // Redirección exitosa al Dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 bg-[url('/grid-pattern.svg')]">
      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-base-100 shadow-2xl rounded-2xl overflow-hidden animate-fade-in border border-base-300">
        
        {/* COLUMNA IZQUIERDA: VISUAL INSTITUCIONAL */}
        <div className="relative hidden md:flex flex-col justify-center items-center bg-primary text-white p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900 opacity-90"></div>
          <div className="relative z-10 space-y-6">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
              <BookOpen className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">AulaPlan CR</h2>
            <p className="text-blue-100 text-lg max-w-sm mx-auto">
              Plataforma de Inteligencia Artificial para la Planificación Educativa (Normativa MEP 2026).
            </p>
            <div className="flex gap-2 justify-center mt-8">
               <div className="badge badge-accent badge-outline gap-1 p-3">
                 <ShieldCheck className="w-4 h-4" /> Certificado
               </div>
               <div className="badge badge-white badge-outline gap-1 p-3 text-white">
                 IA Híbrida
               </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO DE ACCESO */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h3>
            <p className="text-gray-500">Ingrese sus credenciales para acceder al sistema.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="alert alert-error shadow-sm rounded-lg text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Correo Electrónico</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="docente@mep.go.cr" 
                  className="input input-bordered w-full pl-10 focus:input-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Contraseña</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input input-bordered w-full pl-10 focus:input-primary" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label className="label">
                <span className="label-text-alt link link-hover text-primary">¿Olvidó su contraseña?</span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary w-full text-lg normal-case shadow-lg shadow-blue-500/30 ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Ingresar al Sistema"}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            ¿No tiene cuenta? <span className="text-primary font-bold cursor-pointer">Solicite acceso administrativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}