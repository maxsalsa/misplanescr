"use client";
import { useState } from 'react';
import { Lock, Download, Printer, CreditCard, EyeOff } from 'lucide-react';

/**
 * 🔒 SECURE DOCUMENT PREVIEW (PAYWALL)
 * Renders the RAG content in a protected container.
 * - Disables Right Click
 * - Disables Selection
 * - Overlays Aggressive Watermark if !subscribed
 */

import { reportSuspiciousActivity } from '@/core/security/intrusion-detection';

export default function SecureDocumentPreview({ content, userSubscription = 'FREE', userId = 'USR-000', userName = 'DOCENTE', profileType = 'ESTANDAR' }) {
    const isSubscribed = userSubscription === 'PREMIUM' || userSubscription === 'ENTERPRISE';

    // 🎨 HIERARCHY COLORS
    const isAD = profileType === 'ALTA_DOTACION';
    const isTEA = profileType === 'TEA' || profileType === 'TDAH';

    const borderColor = isAD ? 'border-yellow-500' : isTEA ? 'border-blue-400' : 'border-slate-200';
    const glow = isAD ? 'shadow-yellow-500/20' : isTEA ? 'shadow-blue-400/20' : 'shadow-slate-200/50';

    const [showPaywallModal, setShowPaywallModal] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [suspiciousCount, setSuspiciousCount] = useState(0);

    // 🛡️ ESCUDO ACTIVO: Detección de Intrusiones
    useEffect(() => {
        if (isLocked) return;

        const triggerAlerta = (tipo) => {
            const nuevosIntentos = suspiciousCount + 1;
            setSuspiciousCount(nuevosIntentos);
            reportSuspiciousActivity(userId, tipo);

            if (nuevosIntentos >= 3) {
                setIsLocked(true);
                alert("⛔ ACTIVIDAD SOSPECHOSA DETECTADA.\nSu cuenta ha sido bloqueada temporalmente por seguridad.\nReporte enviado a administración.");
            } else {
                alert(`⚠️ ADVERTENCIA DE SEGURIDAD (${nuevosIntentos}/3): La captura de contenidos está prohibida.`);
            }
        };

        const preventTheft = (e) => {
            // F12, Ctrl+Shift+I, PrtSc (algunos browsers)
            if (e.key === 'F12' || e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
                triggerAlerta("DEV_TOOLS_OR_SCREENSHOT");
            }
            // Ctrl+P
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                triggerAlerta("PRINT_ATTEMPT");
            }
            // Ctrl+C / Ctrl+V / Ctrl+S
            if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 's')) {
                e.preventDefault();
                triggerAlerta("COPY_SAVE_ATTEMPT");
            }
        };

        // Ofuscación Activa (Anti-Snipping Tools)
        const handleFocusLost = () => setIsBlurred(true);
        const handleFocusGained = () => setIsBlurred(false);

        window.addEventListener('keydown', preventTheft);
        window.addEventListener('contextmenu', (e) => { e.preventDefault(); triggerAlerta("RIGHT_CLICK"); });
        window.addEventListener('blur', handleFocusLost); // Cuando abre Snipping Tool, pierde foco
        window.addEventListener('focus', handleFocusGained);

        return () => {
            window.removeEventListener('keydown', preventTheft);
            window.removeEventListener('contextmenu', (e) => e.preventDefault());
            window.removeEventListener('blur', handleFocusLost);
            window.removeEventListener('focus', handleFocusGained);
        };
    }, [suspiciousCount, isLocked, userId]);

    if (isLocked) {
        return (
            <div className="h-96 flex flex-col items-center justify-center bg-red-50 text-red-800 border-2 border-red-500 rounded-xl p-8 text-center">
                <Lock size={64} className="mb-4" />
                <h2 className="text-3xl font-black">ACCESO DENEGADO</h2>
                <p className="font-bold">Protocolo de Seguridad Activado</p>
                <p className="text-sm mt-2">Se han detectado múltiples intentos de violación de derechos de autor.</p>
                <button disabled className="btn btn-error mt-6">Contactar Soporte</button>
            </div>
        );
    }

    const handleDownloadAttempt = () => {
        if (!userName) { alert("❌ Error: Perfil incompleto. configure su nombre."); return; }
        if (!isSubscribed) {
            setShowPaywallModal(true);
        } else {
            // Lógica de descarga real (Backend Call)
            alert("⬇️ Iniciando descarga segura desde Neon/S3...");
        }
    };

    return (
        <div className={`flex flex-col gap-4 max-w-4xl mx-auto select-none print:hidden ${isBlurred ? 'blur-xl opacity-20 transition-all duration-75' : ''}`}>

            {/* INVISIBLE GRID WATERMARK */}
            <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden flex flex-wrap opacity-[0.03]" style={{ backgroundSize: '200px 200px' }}>
                {[...Array(100)].map((_, i) => (
                    <div key={i} className="w-32 h-32 flex items-center justify-center -rotate-45 text-[10px] font-black">
                        {userId}
                    </div>
                ))}
            </div>

            {/* TOOLBAR */}
            <div className="flex justify-between items-center bg-slate-800 text-white p-3 rounded-t-lg shadow-md">
                <div className="flex gap-2 items-center">
                    <span className="badge badge-success badge-xs"></span>
                    <span className="font-bold text-sm">Vista Previa Generada (RAG)</span>
                </div>
                <div className="flex gap-3">
                    <button className="btn btn-sm btn-ghost text-slate-300 gap-2 cursor-not-allowed opacity-50">
                        <Printer size={16} /> Imprimir
                    </button>
                    {isSubscribed ? (
                        <button onClick={handleDownloadAttempt} className="btn btn-sm btn-primary gap-2">
                            <Download size={16} /> Descargar PDF
                        </button>
                    ) : (
                        <button onClick={() => setShowPaywallModal(true)} className="btn btn-sm btn-warning gap-2 animate-pulse font-bold text-black border-2 border-yellow-400">
                            <Lock size={16} /> Desbloquear Descarga
                        </button>
                    )}
                </div>
            </div>

            {/* DOCUMENT CANVAS (PROTECTED) */}
            <div
                className={`relative bg-white min-h-[800px] shadow-2xl p-12 border-2 ${borderColor} ${glow} select-none transition-all duration-500`}
                onContextMenu={(e) => e.preventDefault()} // Block Right Click
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }} // Block Selection
            >
                {/* AGGRESSIVE WATERMARK OVERLAY */}
                {!isSubscribed && (
                    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none flex flex-col justify-between p-10 opacity-20">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="text-4xl font-black text-slate-400 -rotate-12 whitespace-nowrap">
                                VISTA PREVIA - SUSCRÍBASE - VISTA PREVIA - SUSCRÍBASE
                            </div>
                        ))}
                    </div>
                )}

                {/* CONTENT SIMULATION */}
                <div className="prose max-w-none text-justify z-0 relative">
                    <header className="flex justify-between border-b-2 border-black pb-4 mb-8 grayscale opacity-80">
                        <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                        <div className="text-center">
                            <h1 className="text-lg font-bold">MINISTERIO DE EDUCACIÓN PÚBLICA</h1>
                            <p className="font-bold">Dirección Regional [BLOQUEADO]</p>
                            <p className="font-bold">[INSTITUCIÓN BLOQUEADA]</p>
                        </div>
                        <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                    </header>

                    <div className="blur-[0.5px]">
                        <h2 className="text-2xl font-bold mb-4 text-[#003366]">{content?.title || "Plan de Práctica Pedagógica"}</h2>
                        <p className="mb-4">
                            {content?.body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                        </p>
                        <div className="grid grid-cols-2 gap-4 my-8">
                            <div className="border p-4 bg-slate-50">
                                <h3 className="font-bold text-sm">Estrategias de Mediación</h3>
                                <ul className="list-disc pl-4 mt-2 text-sm">
                                    <li>Focalización: [TEXTO PROTEGIDO]</li>
                                    <li>Exploración: [TEXTO PROTEGIDO]</li>
                                    <li>Reflexión: [TEXTO PROTEGIDO]</li>
                                </ul>
                            </div>
                            <div className="border p-4 bg-slate-50">
                                <h3 className="font-bold text-sm">Indicadores</h3>
                                <p className="text-sm mt-2">Logra identificar [TEXTO PROTEGIDO] en contextos cotidianos.</p>
                            </div>
                        </div>
                    </div>

                    {!isSubscribed && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] z-20">
                            <div className="bg-slate-900/90 text-white p-8 rounded-2xl shadow-2xl text-center max-w-md border border-slate-700">
                                <EyeOff size={48} className="mx-auto mb-4 text-warning" />
                                <h3 className="text-2xl font-bold mb-2">Vista Previa Limitada</h3>
                                <p className="text-slate-300 mb-6">
                                    El documento completo incluye <strong>Encabezados Oficiales, Logos en Alta Resolución y Firmas Digitales</strong>.
                                </p>
                                <button className="btn btn-warning w-full gap-2 font-bold mb-2">
                                    <CreditCard size={18} /> Activar Licencia Docente
                                </button>
                                <p className="text-xs text-slate-500 mt-4">Suscripción deducible de renta</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* PAYWALL MODAL */}
            {showPaywallModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative animate-pop-in">
                        <button
                            onClick={() => setShowPaywallModal(false)}
                            className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost"
                        >✕</button>

                        <div className="text-center">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#003366]">
                                    <Lock size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-[#003366] mb-2">Suscripción Soberana</h2>
                                <p className="text-slate-500 mb-6 text-sm">
                                    Acceso ilimitado a la Malla MEP + Inclusión (TEA/AD).
                                </p>

                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-left mb-6 relative overflow-hidden">
                                    {/* SINPE BRANDING */}
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <div className="text-4xl font-black text-red-600 italic">SINPE</div>
                                    </div>

                                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        🚀 Activación Inmediata
                                    </h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                            <span className="text-slate-500">Método Oficial</span>
                                            <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">SINPE Móvil</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                            <span className="text-slate-500">Móvil (Max S.)</span>
                                            <span className="font-mono font-black text-lg select-all">6090-6359</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Banco</span>
                                            <span className="font-bold text-[#FF6B00]">Banco Popular</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-sm">Plan Anual 2026</span>
                                            <span className="text-xl font-black text-[#003366]">₡20,000</span>
                                        </div>
                                        <p className="text-xs text-slate-400 text-right">Deducible de renta</p>
                                    </div>
                                </div>

                                <a
                                    href="https://wa.me/50660906359?text=Hola%20Lic.%20Max,%20adjunto%20comprobante%20SINPE%20para%20activar%20mi%20Plan%20Anual."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-success w-full text-white shadow-lg shadow-green-500/30 gap-2 rounded-full"
                                >
                                    WhatsApp: Enviar Comprobante
                                </a>
                                <p className="text-xs text-slate-400 mt-4">Respuesta en {'<'} 5 minutos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
