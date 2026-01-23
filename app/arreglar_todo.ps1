# --- CONFIGURACIÓN ANTIGRAVITY ---
$ErrorActionPreference = "Stop"
Write-Host "🤖 INICIANDO REPARACIÓN DEL SISTEMA..." -ForegroundColor Cyan

# 1. INSTALAR ICONOS (Vital para el diseño nuevo)
Write-Host "📦 Instalando iconos..." -ForegroundColor Yellow
cmd /c "npm install lucide-react --legacy-peer-deps"

# 2. DETECTAR LA CARPETA CORRECTA (El Buscador)
$ruta = ""
if (Test-Path "src/app") {
    $ruta = "src/app/page.tsx"
    Write-Host "📍 Encontrada estructura: SRC/APP" -ForegroundColor Green
} elseif (Test-Path "app") {
    $ruta = "app/page.tsx"
    Write-Host "📍 Encontrada estructura: APP (Raíz)" -ForegroundColor Green
} else {
    New-Item -ItemType Directory -Force -Path "app"
    $ruta = "app/page.tsx"
    Write-Host "⚠️ Creando carpeta APP nueva..." -ForegroundColor Yellow
}

# 3. EL CÓDIGO DE LA LANDING PAGE (Diseño Profesional)
$codigo = @'
"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle, Smartphone, ShieldCheck } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Navbar */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2 rounded-lg">
                            <BookOpen size={24} />
                        </div>
                        <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700">
                            AutoPlanea MEP
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
                            Iniciar Sesión
                        </Link>
                        <Link href="/register" className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-indigo-500/20">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Actualizado Normativa 2026
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                        Planeamiento Didáctico <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
                            con Inteligencia Artificial
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
                        La plataforma #1 de Costa Rica. Genera planes oficiales, rúbricas y exámenes en segundos.
                        Cumplimiento total con la normativa MEP vigente.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/login" className="btn btn-primary btn-lg rounded-xl shadow-xl shadow-indigo-500/30 w-full sm:w-auto px-8 h-14 text-lg">
                            <BookOpen className="mr-2" />
                            Probar Demo Gratis
                        </Link>
                        <Link href="/pricing" className="btn btn-outline btn-lg rounded-xl w-full sm:w-auto px-8 h-14 text-lg bg-white hover:bg-slate-50 border-slate-300 text-slate-700">
                            Ver Planes Premium
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
                        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">100% Oficial</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Alineado estrictamente a los programas de estudio y plantillas oficiales del MEP.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <Smartphone size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">Ahorro de Tiempo</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Reduce horas de trabajo administrativo a minutos. Recupera tus fines de semana.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">Seguridad Total</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Tus datos y planeamientos están encriptados y protegidos. Nadie más los ve.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
                    <p>© 2026 AutoPlanea MEP. Hecho con ❤️ en Costa Rica.</p>
                </div>
            </footer>
        </div>
    );
}
'@

Set-Content -Path $ruta -Value $codigo -Encoding UTF8
Write-Host "✅ Archivo page.tsx actualizado." -ForegroundColor Green

# 4. SUBIR A VERCEL
Write-Host "🚀 Enviando cambios a la nube..." -ForegroundColor Cyan
git add .
git commit -m "UPDATE: Diseño final profesional"
git push

Write-Host "🎉 ¡LISTO! Revisa misplanescr.com en 2 minutos." -ForegroundColor Green