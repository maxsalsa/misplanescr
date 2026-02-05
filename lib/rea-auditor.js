import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AUDITOR_PROMPT = `
ROL: Eres el Auditor Oficial de Calidad Educativa del MEP (Costa Rica).
CONTEXTO: Tienes acceso al Reglamento de Evaluación de los Aprendizajes (REA), la Política Curricular y los lineamientos de Planeamiento Didáctico.
TAREA: Analiza el siguiente bloque JSON correspondiente a una actividad o indicador de AulaPlan.

CRITERIOS DE AUDITORÍA (ARTÍCULO 45 REA):
1. Verbo Observable: ¿El indicador usa un verbo de acción en tercera persona del singular? (Ej: Describe, Aplica, Resuelve). Rechaza verbos internos como Entiende, Conoce, Aprende o Reflexiona.
2. Congruencia: ¿El indicador corresponde realmente al Resultado de Aprendizaje?.
3. Elementos Constitutivos: ¿Tiene Acción (qué hace), Contenido (con qué lo hace) y Condición (cómo/dónde/con qué calidad lo hace)?.
4. Escala: ¿Permite graduar el desempeño en niveles (Inicial, Intermedio, Avanzado)?.

SALIDA REQUERIDA (JSON ESTRICTO):
{
  "verdict": "APROBADO" | "RECHAZADO",
  "error": "Explicación de la violación normativa (si aplica)",
  "correction": "Versión corregida del indicador (si fue rechazado, sino null)"
}
`;

export async function auditIndicator(indicatorText, context = "General") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: AUDITOR_PROMPT },
        {
          role: "user",
          content: `CONTEXTO: ${context}\nINDICADOR: "${indicatorText}"`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("REA Audit Failed:", error);
    return { verdict: "ERROR", error: "Fallo en auditoría automática" };
  }
}
