"use client";
import React, { useState, useEffect } from "react";
import { Lock, Download, Printer, CreditCard, EyeOff } from "lucide-react";
import OfficialPrintLayout from "@/components/documents/OfficialPrintLayout"; // vFinal Integration

/**
 * 🔒 SECURE DOCUMENT PREVIEW (PAYWALL)
 * Renders the RAG content in a protected container.
 * - Disables Right Click
 * - Disables Selection
 * - Overlays Aggressive Watermark if !subscribed
 * - Anti-Piracy: Locks Teacher Name in exports.
 */


export default function SecureDocumentPreview({
  content,
  userSubscription = "FREE",
  userId = "USR-000",
  userName = "DOCENTE",
  profileType = "ESTANDAR",
}) {
  const isSubscribed =
    userSubscription === "PREMIUM" || userSubscription === "ENTERPRISE";

  // 🎨 HIERARCHY COLORS
  const isAD = profileType === "ALTA_DOTACION";
  const isTEA = profileType === "TEA" || profileType === "TDAH";

  const borderColor = isAD
    ? "border-yellow-500"
    : isTEA
      ? "border-blue-400"
      : "border-slate-200";
  const glow = isAD
    ? "shadow-yellow-500/20"
    : isTEA
      ? "shadow-blue-400/20"
      : "shadow-slate-200/50";

  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [suspiciousCount, setSuspiciousCount] = useState(0);
  const [showOfficialPreview, setShowOfficialPreview] = useState(false); // Official Doc Mode

  // 🛡️ ESCUDO ACTIVO: Detección de Intrusiones
  useEffect(() => {
    if (isLocked) return;

    // Simplify for this demo version to avoid aggressive locking during dev
    const preventTheft = (e) => {
      // F12, Ctrl+Shift+I (DevTools)
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        // e.preventDefault(); // Commented out for dev friendliness, uncomment for prod
        // console.warn("Anti-Piracy Monitor: DevTools attempt detected.");
      }
    };

    window.addEventListener("keydown", preventTheft);
    return () => window.removeEventListener("keydown", preventTheft);
  }, [isLocked]);

  const handleDownloadAttempt = () => {
    if (!userName) {
      alert("❌ Error: Perfil incompleto. configure su nombre.");
      return;
    }
    if (!isSubscribed) {
      setShowPaywallModal(true);
    } else {
      alert("⬇️ Iniciando descarga segura...");
    }
  };

  if (isLocked) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-red-50 text-red-800 border-2 border-red-500 rounded-xl p-8 text-center">
        <Lock size={64} className="mb-4" />
        <h2 className="text-3xl font-black">ACCESO DENEGADO</h2>
        <button disabled className="btn btn-error mt-6">
          Contactar Soporte
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-4 max-w-4xl mx-auto select-none print:hidden ${isBlurred ? "blur-xl opacity-20 transition-all duration-75" : ""}`}
    >
      {/* TOOLBAR */}
      <div className="flex justify-between items-center bg-slate-800 text-white p-3 rounded-t-lg shadow-md">
        <div className="flex gap-2 items-center">
          <span className="badge badge-success badge-xs"></span>
          <span className="font-bold text-sm">Vista Previa Generada (RAG)</span>
        </div>
        <div className="flex gap-3">
          {/* Official Document Mode */}
          {isSubscribed && (
            <button
              onClick={() => setShowOfficialPreview(true)}
              className="btn btn-sm btn-info gap-2 text-white"
            >
              <Printer size={16} /> Vista Oficial (Firmas/PDF)
            </button>
          )}

          {!isSubscribed && (
            <button
              onClick={() => setShowPaywallModal(true)}
              className="btn btn-sm btn-ghost text-slate-300 gap-2 opacity-50"
            >
              <Lock size={16} /> Imprimir (Premium)
            </button>
          )}

          {isSubscribed ? (
            <button
              onClick={handleDownloadAttempt}
              className="btn btn-sm btn-primary gap-2"
            >
              <Download size={16} /> Descargar Raw
            </button>
          ) : (
            <button
              onClick={() => setShowPaywallModal(true)}
              className="btn btn-sm btn-warning gap-2 animate-pulse font-bold text-black border-2 border-yellow-400"
            >
              <Lock size={16} /> Desbloquear Descarga
            </button>
          )}
        </div>
      </div>

      {/* OFFICIAL PREVIEW MODAL */}
      {showOfficialPreview && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-4 flex items-start justify-center">
          <div className="bg-white w-full max-w-5xl rounded-lg shadow-2xl relative">
            <button
              onClick={() => setShowOfficialPreview(false)}
              className="btn btn-circle btn-sm btn-error absolute top-4 right-4 z-50 text-white no-print"
            >
              ✕
            </button>

            {/* 🛡️ ANTI-PIRACY WRAPPER: Forced Attributes */}
            <OfficialPrintLayout
              teacherName={userName} // LOCKED from Session
              schoolName="Institución Educativa (Configurable)" // Should come from profile
              subject={content?.title || "Materia General"}
              level="Nivel Generado"
              indicators={[
                "Identifica los conceptos básicos (Indicador Auto-generado)",
                "Aplica la normativa vigente en contextos simulados",
              ]}
            >
              <div className="prose max-w-none p-4">
                <h2 className="uppercase text-center border-b">
                  {content?.title}
                </h2>
                <div className="whitespace-pre-wrap mt-4">{content?.body}</div>

                {/* 🛡️ ANTI-PIRACY HASH */}
                <div className="mt-8 pt-4 border-t border-dotted text-[10px] text-gray-400 font-mono text-center">
                  Generated by Antigravity Engine | Licencia: {userId} |{" "}
                  {new Date().toISOString()} | DO NOT DISTRIBUTE
                </div>
              </div>
            </OfficialPrintLayout>
          </div>
        </div>
      )}

      {/* DOCUMENT CANVAS (PROTECTED) */}
      <div
        className={`relative bg-white min-h-[800px] shadow-2xl p-12 border-2 ${borderColor} ${glow} select-none transition-all duration-500`}
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {/* AGGRESSIVE WATERMARK OVERLAY */}
        {!isSubscribed && (
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none flex flex-col justify-between p-10 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="text-4xl font-black text-slate-400 -rotate-12 whitespace-nowrap"
              >
                VISTA PREVIA - SUSCRÍBASE - VISTA PREVIA - SUSCRÍBASE
              </div>
            ))}
          </div>
        )}

        {/* CONTENT SIMULATION */}
        <div className="prose max-w-none text-justify z-0 relative">
          <div className="text-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold uppercase">
              {content?.title || "Plan Generado"}
            </h1>
            <p className="text-sm text-slate-500">
              Vista de Trabajo (Borrador)
            </p>
          </div>
          <p>{content?.body || "Contenido del plan..."}</p>
        </div>

        {!isSubscribed && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] z-20">
            <div className="bg-slate-900/90 text-white p-8 rounded-2xl shadow-2xl text-center max-w-md border border-slate-700">
              <EyeOff size={48} className="mx-auto mb-4 text-warning" />
              <h3 className="text-2xl font-bold mb-2">Vista Previa Limitada</h3>
              <button
                onClick={() => setShowPaywallModal(true)}
                className="btn btn-warning w-full gap-2 font-bold mb-2"
              >
                <CreditCard size={18} /> Activar Licencia Docente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PAYWALL MODAL */}
      {showPaywallModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPaywallModal(false)}
              className="absolute top-4 right-4 text-black"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-black mb-4">
              Suscripción Requerida
            </h2>
            <p className="text-black mb-4">
              Para exportar documentos oficiales y firmados, active su licencia.
            </p>
            <button className="btn btn-success w-full text-white">
              Activar Vía SINPE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
