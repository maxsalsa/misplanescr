"use client";
import { useState } from 'react';
import { ShieldAlert, CheckCircle, FileSignature } from 'lucide-react';

/**
 * ⚖️ LEGAL TERMS MODAL (MURO LEGAL)
 * Forces user to accept strict anti-piracy clauses before using the platform.
 */

export default function LegalTermsModal({ onAccept }) {
    const [scrolled, setScrolled] = useState(false);
    const [accepted, setAccepted] = useState(false);

    // Function to handle scroll reach bottom (simulation for interaction)
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) setScrolled(true);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-300 flex flex-col max-h-[90vh]">

                {/* HEADER */}
                <div className="p-6 border-b bg-slate-50 rounded-t-xl flex items-center gap-3">
                    <ShieldAlert className="text-[#003366] w-8 h-8" />
                    <div>
                        <h2 className="text-xl font-black text-[#003366] uppercase">Términos de Uso Blindados</h2>
                        <p className="text-xs text-slate-500">Lectura y Aceptación Obligatoria para Acceder</p>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 overflow-y-auto flex-1 text-sm text-justify leading-relaxed text-slate-700 bg-white" onScroll={handleScroll}>
                    <p className="mb-4 font-bold">Bienvenido a MisPlanesCR. El uso de esta plataforma implica la aceptación incondicional de las siguientes cláusulas de seguridad y propiedad intelectual:</p>

                    <div className="space-y-4">
                        <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                            <h3 className="font-bold text-red-800">1. PROPIEDAD INTELECTUAL Y LICENCIA</h3>
                            <p>El usuario reconoce que MisPlanesCR y sus algoritmos RAG son propiedad exclusiva del Lic. Max Salazar Sánchez. Se otorga una licencia personal, <span className="font-extrabold">intransferible</span> y revocable, vinculada estrictamente a su nombre real.</p>
                        </div>

                        <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                            <h3 className="font-bold text-red-800">2. PROHIBICIÓN DE INGENIERÍA INVERSA</h3>
                            <p>Queda terminantemente prohibido:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>Realizar capturas de pantalla (screenshots) o grabaciones.</li>
                                <li>Usar software OCR para extraer texto de las vistas previas.</li>
                                <li>Compartir credenciales para generar documentos con otro nombre.</li>
                            </ul>
                        </div>

                        <div className="p-3 bg-slate-100 border-l-4 border-slate-500 rounded-r">
                            <h3 className="font-bold text-slate-800">3. VIGILANCIA Y TRAZABILIDAD (FORENSE)</h3>
                            <p>Usted acepta que la plataforma inyecta <span className="font-bold">marcas de agua invisibles y metadatos cifrados</span> en cada documento. Si un archivo generado por su cuenta aparece en redes sociales, su suscripción será cancelada inmediatamente sin reembolso y se iniciarán acciones legales bajo la Ley de Derechos de Autor de Costa Rica.</p>
                        </div>

                        <div className="p-3 bg-slate-100 border-l-4 border-slate-500 rounded-r">
                            <h3 className="font-bold text-slate-800">4. VERSIÓN DEMO LIMITADA</h3>
                            <p>La versión gratuita es solo para visualización. Cualquier intento de vulnerar las protecciones técnicas será registrado como actividad maliciosa y reportado.</p>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-6 border-t bg-slate-50 rounded-b-xl">
                    <label className="flex items-start gap-3 cursor-pointer mb-4 select-none">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary mt-1"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                        />
                        <span className="text-sm font-bold text-slate-800">
                            He leído y acepto que MisPlanesCR protege su contenido contra copias y que mis datos (Nombre y Cédula) se inyectarán de forma inalterable en los documentos generados.
                        </span>
                    </label>

                    <button
                        onClick={onAccept}
                        disabled={!accepted}
                        className={`btn btn-lg w-full gap-2 font-bold uppercase transition-all ${accepted ? 'btn-primary shadow-lg shadow-blue-500/40' : 'btn-disabled opacity-50'}`}
                    >
                        <FileSignature /> Firmar Digitalmente y Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}
