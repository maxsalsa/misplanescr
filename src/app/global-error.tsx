"use client";

import { useEffect } from "react";
import Link from 'next/link';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to auditing service
        console.error("🔥 GLOBAL FATAL ERROR:", error);
    }, [error]);

    return (
        <html>
            <body className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
                <div className="card bg-white shadow-2xl max-w-lg w-full p-8 border border-red-100 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Interrupción del Sistema</h2>
                    <p className="text-slate-500 mb-6">
                        Antigravity ha detectado una anomalía crítica. Nuestros sistemas de auto-recuperación han sido notificados.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => reset()}
                            className="btn btn-primary w-full shadow-lg shadow-indigo-500/30"
                        >
                            🔄 Reintentar Conexión
                        </button>
                        <Link href="/" className="btn btn-ghost w-full">
                            Volver al Inicio
                        </Link>
                    </div>

                    <div className="mt-8 text-xs text-slate-400 border-t pt-4">
                        Código de Error: {error.digest || 'UNKNOWN_FATAL'}
                    </div>
                </div>
            </body>
        </html>
    );
}
