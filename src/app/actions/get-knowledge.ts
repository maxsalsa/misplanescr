"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSovereignKnowledge() {
    try {
        // 1. Fetch Premium Assets from Knowledge Kernel
        const assets = await prisma.knowledgeKernel.findMany({
            where: {
                isPremium: true,
                isVerified: true
            },
            select: {
                id: true,
                jsonbData: true,
                classificationTags: true,
                mepMetadata: true
            },
            take: 20, // Limit for demo
            orderBy: {
                updatedAt: 'desc'
            }
        });

        // 2. Transform for Frontend usage
        return assets.map(asset => {
            // Safe casting of JSONB fields
            const data = asset.jsonbData as any;
            const meta = asset.mepMetadata as any;
            const tags = asset.classificationTags as any;

            // ADAPTER: Transform New Kaizen 2000 Structure (Arrays) to Frontend (Flat)
            let inclusion = data.variantes_inclusion || {};
            let logic = data.logica_instruccional || {};

            // If data is in new LO structure, extract from first outcome
            if (data.learning_outcomes && data.learning_outcomes.length > 0) {
                const ra = data.learning_outcomes[0];

                // 1. Map DUA
                if (ra.dua_strategies) {
                    inclusion = {
                        ...inclusion,
                        tea: ra.dua_strategies.find((s: any) => s.population.includes("TEA"))?.teacher_role || "Ver estrategia detallada",
                        tdah: ra.dua_strategies.find((s: any) => s.population.includes("TDAH"))?.teacher_role || "Ver estrategia detallada",
                        baja_vision: ra.dua_strategies.find((s: any) => s.population.includes("Visión"))?.teacher_role || "Ver estrategia detallada"
                    };
                }

                // 2. Map Mediation
                if (ra.mediation_strategies) {
                    logic = {
                        inicio: ra.mediation_strategies.find((s: any) => s.phase === "Focalización" || s.phase === "Inicio")?.teacher_role || "Ver detalle",
                        desarrollo: ra.mediation_strategies.find((s: any) => s.phase === "Desarrollo")?.teacher_role || "Ver detalle",
                        cierre: ra.mediation_strategies.find((s: any) => s.phase === "Cierre" || s.phase === "Aplicación")?.teacher_role || "Ver detalle"
                    };
                }
            }

            return {
                id: asset.id,
                title: data.unit || data.title || "Recurso Pedagógico Premium",
                instructional_logic: logic,
                curricular_map: data.mapeo_curricular || {},
                inclusion: inclusion,
                source: meta.source || "MisPlanesCR",
                kw: tags.keywords || []
            };
        });

    } catch (error) {
        console.error("❌ Failed to fetch Sovereign Knowledge:", error);
        return [];
    }
}

export async function getCurriculumStructure(modality: string) {
    // Simulate fetching structures for Dropdowns based on Kaizen logic
    // In a real scenario, this would query CurriculumMaster or similar
    if (modality.includes("Técnica")) {
        return ["Desarrollo Software", "Contabilidad", "Soporte TI", "Ejecutivo"];
    }
    return ["Matemáticas", "Español", "Ciencias", "Estudios Sociales"];
}
