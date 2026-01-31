"use client";
import { signIn } from "next-auth/react";
import { Command, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* FONDO DECORATIVO */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                        <Command className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">AULAPLAN <span className="text-blue-600">MEP</span></h1>
                    <p className="text-slate-500 text-sm mt-2">Plataforma de Inteligencia Curricular</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard/library" })}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700 shadow-sm"
                    >
                        <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google" />
                        Continuar con Google
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">O acceso administrativo</span></div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); signIn("credentials", { email: "max@misplanescr.com", password: "123", callbackUrl: "/dashboard/library" }); }} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Institucional</label>
                            <div className="relative">
                                <input type="email" defaultValue="max@misplanescr.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none pl-10" />
                                <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                            INGRESAR AL SISTEMA <ArrowRight size={16} />
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-slate-300 mt-8 font-medium">
                    Powered by Antigravity Engine v2.0
                </p>
            </div>
        </div>
    );
}