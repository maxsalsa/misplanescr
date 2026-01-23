"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <Link href="/" className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Volver al Inicio
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900">Bienvenido</h1>
          <p className="text-slate-500 mt-2">Ingresa a tu cuenta AutoPlanea</p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo MEP</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input type="email" placeholder="profesor@mep.go.cr" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
            </div>
          </div>
          <Link href="/dashboard" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg text-center transition shadow-lg shadow-indigo-500/30">
            ENTRAR AL SISTEMA
          </Link>
        </form>
      </div>
    </div>
  );
}
