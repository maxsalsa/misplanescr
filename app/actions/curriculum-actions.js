"use server";
import { PrismaClient } from "@prisma/client";

// Ensure a single instance in Dev (Singleton Pattern)
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * PHOENIX ACTION: GET SUBJECTS
 * Retrieves available subjects based on the user's context.
 */
export async function getSubjects() {
  try {
    // In a real scenario, we might filter by the User's Active School ID
    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        educationLevel: true, // "7mo", "10mo", etc.
        modalityType: true, // "ACADEMICA", "TECNICA"
      },
    });
    return { success: true, data: subjects };
  } catch (error) {
    console.error("[PHOENIX ERROR] getSubjects:", error);
    return { success: false, error: "Error de conexión con el Núcleo." };
  }
}

/**
 * PHOENIX ACTION: GET UNITS
 * Retrieves the Official Program Units for a Subject.
 */
export async function getUnitsBySubject(subjectId) {
  try {
    const units = await prisma.studyUnit.findMany({
      where: { subjectId: subjectId },
      include: {
        outcomes: true, // We need the "Resultados de Aprendizaje"
      },
      orderBy: { semester: "asc" },
    });

    // Transform for UI consumption (Flattening)
    const cleanUnits = units.map((u) => ({
      id: u.id,
      title: u.title,
      grade: u.grade,
      semester: u.semester, // "I Periodo", "II Periodo"
      outcomes: u.outcomes.map((o) => ({
        id: o.id,
        description: o.description,
        // Future: indicator mapping
      })),
    }));

    return { success: true, data: cleanUnits };
  } catch (error) {
    console.error("[PHOENIX ERROR] getUnitsBySubject:", error);
    return {
      success: false,
      error: "No se pudieron cargar las unidades oficiales.",
    };
  }
}

/**
 * PHOENIX ACTION: SMART SUGGESTIONS
 * Simulated AI retrieval of pedagogical strategies.
 */
export async function getSuggestedStrategies(category = "GENERAL") {
  // Mock response for high-speed demos, or DB call if table exists.
  // We'll simulate a DB call failure fallback to "Antigravity Brain".
  try {
    const strategies = await prisma.pedagogicalStrategy.findMany({
      where: { category: category },
      take: 3,
    });
    return { success: true, data: strategies };
  } catch (e) {
    return { success: false, data: [] };
  }
}
