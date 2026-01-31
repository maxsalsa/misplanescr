"use server";
import OpenAI from "openai";
import { PlanSchema } from "@/lib/schemas";
import { ANTIGRAVITY_KERNEL } from "@/lib/kernel"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePlanAction(rawData) {
  try {
    const validated = PlanSchema.safeParse(rawData);
    if (!validated.success) return { success: false, error: validated.error.errors[0].message };
    
    const { modality, subject, grade, unit, duration, topic, inclusionContext, includeProject, includeTest } = validated.data;
    
    const userRequest = `
      SOLICITUD DOCENTE:
      - Modalidad: ${modality}
      - Nivel: ${grade}
      - Asignatura: ${subject}
      - Unidad: ${unit}
      - Duración: ${duration}
      - Tema/Indicadores: ${topic}
      - Contexto de Inclusión: ${inclusionContext || "Ninguno reportado."}
      - Requerimientos Extra: ${includeProject ? "Incluir Proyecto." : ""} ${includeTest ? "Incluir Prueba Escrita." : ""}
      
      EJECUTA SEGÚN TU KERNEL MEP-OS v4.0.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: ANTIGRAVITY_KERNEL },
        { role: "user", content: userRequest }
      ],
      model: "gpt-4o",
      temperature: 0.5,
    });
    
    return { success: true, html: completion.choices[0].message.content };

  } catch (error) {
    console.error("Fallo en Núcleo Antigravity:", error);
    return { success: false, error: "Error crítico. Verifique logs." };
  }
}