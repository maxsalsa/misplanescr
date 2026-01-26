"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSovereignKnowledge() {
    try {
        // ADAPTED KnowledgeKernel missing in schema. Returning mock data.
        const assets[] = [];

        if (assets.length === 0) {
            // Fallback Mock Data
            return [
                { id: 'k1', title: 'Estrategia DUA Activa', instructional_logic: { inicio: 'Lluvia de ideas', desarrollo: 'Lectura grupal', cierre: 'Resumen' }, inclusion: { tea: 'Uso de pictogramas', tdah: 'Pausas activas' } },
                { id: 'k2', title: 'Proyecto Científica', instructional_logic: { inicio: 'Pregunta reto', desarrollo: 'Experimentación', cierre: 'Presentación' }, inclusion: { tea: 'Apoyo visual', tdah: 'Roles dinámicos' } }
            ];
        }

        // 2. Transform for Frontend usage (Unreachable with empty assets but kept structure)
        return assets.map(asset => ({})); // Simplified

    } catch (error) {
        console.error("❌ Failed to fetch Sovereign Knowledge:", error);
        return [];
    }
}

export async function getCurriculumStructure(modality) {
    // Simulate fetching structures for Dropdowns based on Kaizen logic
    // In a real scenario, this would query CurriculumMaster or similar
    if (modality.includes("Técnica")) {
        return ["Desarrollo Software", "Contabilidad", "Soporte TI", "Ejecutivo"];
    }
    return ["Matemáticas", "Español", "Ciencias", "Estudios Sociales"];
}
