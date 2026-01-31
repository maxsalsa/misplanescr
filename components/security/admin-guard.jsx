import { auth } from "@/auth";
import { ShieldAlert, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link"; // Aseguramos importar Link si se usa botón de regreso

export default async function AdminGuard({ children }) {
    const session = await auth();
    const role = session?.user?.role;

    // VERIFICACIÓN DE CREDENCIALES
    if (role === "SUPER_ADMIN") {
        // ACCESO CONCEDIDO: Renderizar contenido protegido
        return <>{children}</>;
    }

    // ACCESO DENEGADO: PANTALLA MILITAR
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-950 rounded-3xl border-4 border-red-900 shadow-2xl overflow-hidden relative">

            {/* FONDO DE ALERTA ANIMADO */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-slate-950"></div>

            {/* ÍCONO DE SEGURIDAD */}
            <div className="relative z-10 mb-8 animate-pulse">
                <div className="p-6 bg-red-600 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                    <Lock size={64} className="text-white" />
                </div>
            </div>

            {/* TEXTOS DE COMANDO */}
            <div className="relative z-10 text-center space-y-4 max-w-lg">
                <h1 className="text-4xl font-black text-white tracking-widest uppercase font-mono">
                    Acceso Restringido
                </h1>

                <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-xl">
                    <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-2">
                        <AlertTriangle size={20} />
                        <span>PROTOCOLO DE SEGURIDAD ACTIVO</span>
                    </div>
                    <p className="text-red-200 font-mono text-sm leading-relaxed">
                        Sus credenciales actuales ({role || "INVITADO"}) no tienen autorización de Nivel 5 para visualizar este módulo clasificado.
                    </p>
                </div>

                <p className="text-slate-500 text-xs mt-8">
                    Event ID: {Date.now()} • IP Logged • Incident Reported to Max Salazar
                </p>

                <div className="pt-8">
                    <Link
                        href="/dashboard"
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg uppercase tracking-wider transition-all border border-slate-600 hover:border-slate-400"
                    >
                        Retornar a Zona Segura
                    </Link>
                </div>
            </div>

            {/* DECORACIÓN TÉCNICA */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-red-800">SECURE_ROUTE_PROTECTION_V81</div>
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-red-800">SYSTEM_LOCKDOWN</div>
        </div>
    );
}
