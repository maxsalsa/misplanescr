"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const OfflineContext = createContext({
  isOffline: false,
  isSyncing: false,
});

export function useOffline() {
  return useContext(OfflineContext);
}

export function OfflineProvider({ children }) {
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Hydration check
    setIsOffline(!navigator.onLine);

    // 💓 HEARTBEAT PROTOCOL (ACTIVE PING)
    const checkConnection = async () => {
      try {
        // Timeout critical: if > 2s, assume congestion/offline
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch("/api/health", {
          method: "HEAD",
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timeoutId);

        if (res.ok && isOffline) {
          handleOnline();
        } else if (!res.ok && !isOffline) {
          handleOffline();
        }
      } catch (e) {
        if (!isOffline) handleOffline();
      }
    };

    const handleOnline = () => {
      setIsOffline(false);
      toast.success("Conexión Restaurada. Sincronizando...", {
        icon: "🟢",
        duration: 3000,
      });
      setIsSyncing(true);
      // Trigger Sync Engine via Custom Event or direct import if moved to context
      // For now, visual feedback
      setTimeout(() => setIsSyncing(false), 2000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast.warning("Modo Resiliente Activado (Offline)", {
        icon: "🟡",
        description: "Sus cambios se guardarán localmente.",
        duration: Infinity,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Poll every 10s normally, or 5s if offline to recover fast
    const intervalMs = isOffline ? 5000 : 10000;
    const interval = setInterval(checkConnection, intervalMs);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, [isOffline]);

  return (
    <OfflineContext.Provider value={{ isOffline, isSyncing }}>
      {children}
      {isOffline && (
        <div className="fixed bottom-0 left-0 w-full bg-yellow-400 text-black text-center text-xs font-bold p-1 z-[9999] animate-pulse">
          ⚠️ MODO RESILIENTE: Los cambios se guardarán localmente.
        </div>
      )}
    </OfflineContext.Provider>
  );
}
