/**
 * ZENITH LIBRARIAN V1.0 (DATABASE GUARDIAN)
 * "Retrieval First, Generation Second"
 *
 * Capabilities:
 * - Implements the "Retrieval Mandate" (Check DB before Generating).
 * - Manages the "Gap Filler Protocol" (Fallback to Generators).
 * - Enforces Error Empathy & Performance Awareness.
 */

import { CIVIC_CALENDAR, generateCivicProgram } from "./chronos-engine";
import { generateMultiverse } from "./multiverse-engine";
import { getOfficialSyllabusRequest } from "./magistrado-engine";

/**
 * THE ZENITH HANDLER
 * Main entry point for Intelligent Retrieval/Generation
 * @param {string} query - User request string
 * @param {object} context - User context (Subject, Grade, Tier)
 * @param {object} dbClient - Prisma Client instance
 */
export async function handleZenithRequest(query, context, dbClient) {
  const startTime = Date.now();
  try {
    console.log(`[ZENITH] 🔍 Searching for: "${query}"...`);

    // 1. THE RETRIEVAL MANDATE (Simulated DB Check Logic)
    // In full full-stack integration, this calls Prisma.
    // For now, we simulate the "Hit" logic based on query keywords.

    // SCENARIO A: Civic Acts (Efemérides) -> Check Chronos Store
    if (
      query.toLowerCase().includes("acto cívico") ||
      query.toLowerCase().includes("efeméride")
    ) {
      // Simulate DB Lookup in "Subject: Cultura Cívica"
      const dateKey = Object.keys(CIVIC_CALENDAR).find(
        (k) => query.includes(k) || query.includes(CIVIC_CALENDAR[k].date),
      );
      if (dateKey) {
        return {
          source: "DATABASE (LIBRARIAN)", // Simulated Hit
          type: "PLAN_CIVICO",
          content: generateCivicProgram(dateKey), // Retrieves from Chronos Const
        };
      }
    }

    // SCENARIO B: Vocational -> Check Assessment Store
    if (
      context.subjectType === "TECNICA" &&
      query.toLowerCase().includes("seguridad")
    ) {
      // Simulate finding existing Safety Checklist
      return {
        source: "DATABASE (LIBRARIAN)",
        type: "ASSESSMENT",
        title: "Lista de Cotejo de Seguridad Ocupacional (Estándar Taller)",
        content: {
          items: ["Uso de Gafas", "Botas de Seguridad", "Area Limpia"],
        },
      };
    }

    // 2. THE GAP FILLER PROTOCOL (Generation)
    console.log(
      `[ZENITH] ⚠️ Resource not found. Engaging Gap Filler (Generation).`,
    );

    const officialConfig = getOfficialSyllabusRequest(
      context.subjectType || "GENERAL",
    );

    // If it's a Plan Request, use Multiverse
    if (query.toLowerCase().includes("plan")) {
      const suite = generateMultiverse(
        { title: query, subjectType: context.subjectType },
        null, // No specific diagnostic data for generic query
        context.tier,
      );
      return {
        source: "GENERATOR (GAP FILLER)",
        meta: {
          notice: "Generated via Magistrado Protocol",
          syllabus: officialConfig.focus,
        },
        data: suite,
      };
    }

    // Default Fallback
    return {
      source: "GENERATOR (FALLBACK)",
      message: `Resource generated for ${query} using ${officialConfig.term_objective}.`,
    };
  } catch (error) {
    return handleZenithError(error);
  } finally {
    const duration = Date.now() - startTime;
    if (duration > 2000) console.warn("[ZENITH] 🐢 Response took too long.");
  }
}

/**
 * ERROR EMPATHY HANDLER
 */
function handleZenithError(error) {
  console.error("[ZENITH ERROR]", error);
  return {
    error: true,
    ui_message:
      "Estoy ajustando los engranajes del sistema. Por favor, intenta de nuevo en unos segundos ⚙️.",
    action: "RETRY_BUTTON",
  };
}
