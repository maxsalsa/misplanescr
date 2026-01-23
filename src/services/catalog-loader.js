import fs from 'fs';
import path from 'path';

/**
 * Loads the MEP Catalog and returns a formatted string of available official programs.
 * This ensures the AI knows exactly which "Truth Sources" are available.
 */
export function getOfficialCatalogSummary() {
    try {
        const catalogPath = path.join(process.cwd(), 'public', 'mep-docs', 'catalogo_mep.json');
        if (!fs.existsSync(catalogPath)) return "Catálogo oficial no detectado.";

        const raw = fs.readFileSync(catalogPath, 'utf-8');
        const data = JSON.parse(raw);

        // Flatten the structure for the AI
        let summary = "LISTADO OFICIAL DE PROGRAMAS DE ESTUDIO DISPONIBLES (FUENTE DE VERDAD):\n";

        // Modalidades
        Object.keys(data.modalidades || {}).forEach(mod => {
            const nivCats = data.modalidades[mod];
            Object.keys(nivCats).forEach(level => {
                const programs = nivCats[level];
                Object.keys(programs).forEach(progKey => {
                    const file = programs[progKey].archivo;
                    summary += `- [${mod}][${level}] ${progKey} (Archivo: ${file})\n`;
                });
            });
        });

        return summary;
    } catch (error) {
        console.error("Error loading catalog summary:", error);
        return "Error cargando índice de programas.";
    }
}
