"use client";
import { useState, useEffect } from "react";
import { GraduationCap, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getRandomQuote } from "@/lib/quotes";

export default function LoginPage() {
  // Estado para la frase (Inicia vacía para evitar error de hidratación)
  const [quote, setQuote] = useState(null);

  // Al montar el componente, elegimos una frase al azar
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50 animate-in fade-in duration-700">
      
      {/* LADO IZQUIERDO: EL ALMA (Dinámica) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#475569 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="mb-8 p-3 bg-white/10 w-fit rounded-xl backdrop-blur-sm border border-white/20 shadow-lg shadow-blue-900/50">
            <GraduationCap size={40} />
          </div>
          
          {/* FRASE DINÁMICA */}
          {quote ? (
            <div className="animate-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-3xl font-black tracking-tight mb-6 leading-tight">
                "{quote.text}"
              </h2>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-200 font-bold text-lg">{quote.author}</p>
                <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">{quote.role}</p>
              </div>
            </div>
          ) : (
            // Skeleton Loader mientras carga la inspiración
            <div className="space-y-4 animate-pulse">
              <div className="h-8 bg-slate-700 rounded w-3/4"></div>
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
              <div className="h-4 bg-slate-800 rounded w-1/4 mt-4"></div>
            </div>
          )}

          <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
             <ShieldCheck size={16} /> Plataforma Oficial AulaPlan CR
          </div>
        </div>
      </div>

      {/* LADO DERECHO: FORMULARIO */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900">Bienvenido a AulaPlan</h1>
            <p className="text-slate-500 mt-2">Su comando central pedagógico está listo.</p>
          </div>

          <form className="space-y-6 mt-8">
            <div>
              <label className="label text-xs font-bold text-slate-700 uppercase">Correo Institucional</label>
              <input type="email" placeholder="docente@mep.go.cr" className="input input-bordered w-full bg-white" />
            </div>
            <div>
              <label className="label text-xs font-bold text-slate-700 uppercase">Contraseña</label>
              <input type="password" placeholder="••••••••" className="input input-bordered w-full bg-white" />
            </div>

            <Link href="/dashboard" className="btn btn-institutional w-full shadow-lg shadow-blue-900/20 group">
              Iniciar Sesión <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </form>

          <div className="divider text-xs text-slate-400">MEMBRESÍA PROFESIONAL</div>
          <div className="text-center text-xs text-slate-400">
            <Link href="/dashboard/subscription" className="text-blue-700 font-bold hover:underline">
              Ver Planes (8k / 15k)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}