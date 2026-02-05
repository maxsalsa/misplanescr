import { prisma } from "@/lib/prisma"; // Standard singleton import
import { MMepRespaldo } from "@prisma/client";

// Types removed for JS

/**
 * Service to bridge Next.js with Antigravity Industrial Memory (Neon DB)
 */
export const AntigravityService = {
  /**
   * Fetch a Diamond/Industrial Plan by ID
   */
  getPlan: async (id) => {
    try {
      const raw = await prisma.mMepRespaldo.findUnique({
        where: { idPrograma: id },
      });

      if (!raw) return null;

      return AntigravityService._transformToFrontend(raw);
    } catch (error) {
      console.error("Antigravity Bridge Error:", error);
      return null;
    }
  },

  /**
   * Transform Prisma Raw Data to Omni-Frontend Structure
   */
  _transformToFrontend: (raw) => {
    const content = raw.contenidoJson;
    const inclusionLayer = AntigravityService._extractInclusion(content);

    return {
      id: raw.idPrograma,
      title: raw.programaNombre,
      version: raw.versionKaizen,
      visualConfig: {
        primaryColor: "#0047AB",
        iconMap: {
          ludica: "gamepad",
          steam: "cpu",
          cientifica: "microscope",
        },
      },
      content: content,
      inclusionLayer: inclusionLayer,
      printReady: true,
    };
  },

  _extractInclusion: (content) => {
    const layer = {
      universal: "DIAMANTE-V10 Inclusion Standard Applied",
      especificos: [],
    };

    // Deep extraction logic similar to Python Omni-Integrator
    const root = content.memoria_oficial || content;

    // Strategy for 'mediacion_ultra' or 'cuerpo' list
    if (root.ingesta_data?.mediacion_ultra?.ajustes_inclusion) {
      layer.especificos.push(
        root.ingesta_data.mediacion_ultra.ajustes_inclusion,
      );
    }

    if (Array.isArray(root.cuerpo)) {
      root.cuerpo.forEach((item) => {
        if (item.mediacion_ultra?.ajustes_inclusion) {
          layer.especificos.push(item.mediacion_ultra.ajustes_inclusion);
        }
      });
    }

    return layer;
  },
};
