"use client";

/**
 * @fileoverview Anti-Piracy Simulation Hook
 * Implements frontend-only deterrents to discourage data egress in Demo Mode.
 * 
 * Features:
 * - Block Right Click (ContextMenu)
 * - Block Copy/Cut/Paste Shortcuts
 * - Detect PrintScreen key and warn user
 * - Disable Text Selection via CSS injection
 * 
 * @module hooks/use-anti-piracy
 * @author Security Guild
 * @version 1.2.0
 */

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useAntiPiracy() {
    const [warningCount, setWarningCount] = useState(0);

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            // No toast on right click to avoid spam, just block it quietly or subtle hint
        };

        const handleKeyDown = (e) => {
            // Print Screen
            if (e.key === 'PrintScreen') {
                // We can't actually strict block print screen, but we can detect keyup sometimes or just warn on keydown if browser supports
                showWarning('Captura de pantalla detectada. El modo demostración incluye marcas de agua.');
            }

            // Ctrl+C, Ctrl+X, Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print)
            if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'p'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                showWarning('Esta acción está inhabilitada en el modo demostración.');
            }
        };

        const handleCopy = (e) => {
            e.preventDefault();
            showWarning('La copia de contenido está protegida.');
        };

        const showWarning = (msg) => {
            setWarningCount(prev => prev + 1);
            toast.warning(msg, {
                description: "Actualiza a PRO para habilitar todas las funciones de exportación.",
                duration: 3000,
            });
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCopy);

        // Add no-select class to body
        document.body.classList.add('select-none');

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCopy);
            document.body.classList.remove('select-none');
        };
    }, []);

    return { warningCount };
}
