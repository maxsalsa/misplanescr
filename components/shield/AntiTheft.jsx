"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AntiTheft() {
    useEffect(() => {
        // 1. BLOQUEO DE CLIC DERECHO
        const handleContextMenu = (e) => {
            e.preventDefault();
            // Optional: Toast warning
            // toast.error("Función restringida por seguridad."); 
        };

        // 2. BLOQUEO DE TECLAS DE INSPECTOR (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S)
        const handleKeyDown = (e) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }
            // Ctrl+Shift+I (Inspector)
            if (e.ctrlKey && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }
            // Ctrl+Shift+C (Inspector Element)
            if (e.ctrlKey && e.shiftKey && e.key === "C") {
                e.preventDefault();
            }
            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === "u") {
                e.preventDefault();
            }
            // Ctrl+S (Save Page)
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null; // Componente invisible
}
