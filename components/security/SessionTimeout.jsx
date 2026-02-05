"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Assuming next-auth/react client usage or custom

const TIMEOUT_MS = 20 * 60 * 1000; // 20 Minutes

export default function SessionTimeout() {
  const router = useRouter();
  const [lastActivity, setLastActivity] = useState(Date.now());

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Events to track activity
    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    const resetTimer = () => {
      setLastActivity(Date.now());
      if (showModal) setShowModal(false); // Dismiss if user comes back
    };

    // Attach listeners
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Check interval
    const interval = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      const timeLeft = TIMEOUT_MS - inactiveTime;

      // Warn at 15 minutes (5 minutes left)
      if (timeLeft <= 5 * 60 * 1000 && timeLeft > 0) {
        setShowModal(true);
      }

      // Logout at 20 minutes
      if (timeLeft <= 0) {
        console.warn("[SECURITY] Session Timeout. Logging out...");
        router.push("/login?expired=true");
      }
    }, 30000); // Check every 30s

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearInterval(interval);
    };
  }, [lastActivity, router, showModal]);

  return (
    <>
      {/* Subtle Security Badge */}
      <div
        className="fixed bottom-4 left-4 z-50 text-[10px] text-slate-500 font-mono opacity-50 hover:opacity-100 transition-opacity select-none cursor-help"
        title="Sesión Protegida por Antigravity"
      >
        🛡️ SECURE_SESSION_ACTIVE
      </div>

      {/* Warning Modal (15 min mark) */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0f172a] text-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl border-2 border-yellow-500 relative overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute top-0 right-0 p-10 bg-yellow-500/10 blur-[50px] rounded-full"></div>

            <h2 className="text-2xl font-black text-yellow-500 mb-2">
              ⏳ Inactividad Detectada
            </h2>
            <p className="mb-6 font-medium text-slate-400">
              Han pasado 15 minutos sin actividad. Por seguridad, la sesión se
              cerrará pronto.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setLastActivity(Date.now());
                  setShowModal(false);
                }}
                className="btn btn-primary w-full font-bold"
              >
                Seguir Trabajando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
