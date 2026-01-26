"use server";
import OpenAI from "openai";
import { PlanSchema, getSecureSession, logAction } from "@/lib/security";
import { prisma } from "@/lib/db";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePlanAction(formData) {
  try {
    // 1. AUTENTICACIÓN (ZERO TRUST)
    const user = await getSecureSession();

    // 2. VALIDACIÓN DE DATOS (ZOD)
    // Si el usuario intenta inyectar código malicioso, esto explota aquí.
    const rawData = {
      subject: formData.subject,
      grade: formData.grade,
      duration: formData.duration,
      topic: formData.topic,
      inclusionContext: formData.inclusionContext
    };
    
    const validatedData = PlanSchema.parse(rawData);

    // 3. REGISTRO DE AUDITORÍA (LOG)
    await logAction(user.id, "GENERATE_ATTEMPT", `Tema: ${validatedData.topic}`);

    // 4. LÓGICA DE NEGOCIO (IA)
    const suggestProject = validatedData.duration.includes("Mensual");
    const systemPrompt = `ACTÚA COMO: Experto MEP. TEMA: ${validatedData.topic}. 
    ESTRUCTURA: HTML Tailwind. INCLUYE: 
    - II. Mediación (Binomio Sagrado).
    - III. Evaluación (Cotidiano: Verde, Tarea: Azul${suggestProject ? ", Proyecto: Ámbar" : ""}).
    ${validatedData.inclusionContext ? "- IV. Adecuaciones (Naranja) para: " + validatedData.inclusionContext : ""}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "gpt-4o",
      temperature: 0.7,
    });
    
    const htmlContent = completion.choices[0].message.content;

    // 5. GUARDADO AUTOMÁTICO (PERSISTENCIA)
    await prisma.pedagogicalPlan.create({
      data: {
        title: validatedData.topic,
        subject: validatedData.subject,
        gradeLevel: validatedData.grade,
        content: htmlContent,
        userId: user.id
      }
    });

    await logAction(user.id, "GENERATE_SUCCESS", "Plan creado y guardado en DB");

    return { success: true, html: htmlContent };

  } catch (error) {
    console.error("Error de Seguridad/IA:", error);
    return { success: false, error: error.issues ? "Datos inválidos (Zod)" : "Error interno del servidor." };
  }
}