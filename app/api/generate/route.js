import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Sesión expirada. Ingrese nuevamente." }, { status: 401 });

    const { subject, level, unit, modality, officialOutcomes } = await req.json();
    
    // 1. AUDITORÍA DE PERMISOS
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { licenses: true } });

    // REGLA: Si NO es admin, verificamos todo.
    if (user.role !== "ADMIN") {
        const hasLicense = user.licenses.some(l => l.subject === subject && l.isActive);
        if (!hasLicense) return NextResponse.json({ error: `⛔ ACCESO DENEGADO: No tiene licencia activa para ${subject}.` }, { status: 403 });
        
        if (user.subscriptionStatus === "SEMESTRAL" && user.planGenerationCount >= 50) {
             return NextResponse.json({ error: "⛔ LÍMITE MENSUAL ALCANZADO (50/50). Actualice a Plan Anual." }, { status: 403 });
        }
    }

    // 2. GENERACIÓN IA
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      Rol: Asesor Pedagógico del MEP Costa Rica.
      Tarea: Planeamiento Didáctico Oficial (Formato PDF).
      
      CONTEXTO:
      - Asignatura: ${subject} (${level})
      - Unidad: ${unit}
      
      INSTRUCCIÓN ESTRICTA:
      Genera estrategias de mediación (Focalización, Exploración, Contrastación) EXCLUSIVAMENTE para estos Resultados de Aprendizaje Oficiales:
      ${JSON.stringify(officialOutcomes)}
      
      FORMATO JSON REQUERIDO:
      {
        "encabezado": { "asignatura": "${subject}", "nivel": "${level}", "unidad": "${unit}", "institucion": "CTP" },
        "desarrollo_pedagogico": [
           {
              "resultado_aprendizaje_oficial": "Texto exacto del RA...",
              "estrategias_mediacion": [
                  { "fase": "Focalización", "actividad": "Actividad detallada y participativa..." },
                  { "fase": "Exploración", "actividad": "Actividad de desarrollo conceptual y práctico..." },
                  { "fase": "Contrastación", "actividad": "Actividad de cierre y evaluación." }
              ],
              "indicadores_evaluacion": ["Lista de Cotejo", "Escala de Desempeño"]
           }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    // 3. REGISTRO DE CONSUMO
    if (user.role !== "ADMIN") {
        await prisma.user.update({ where: { id: user.id }, data: { planGenerationCount: { increment: 1 } } });
    }

    return NextResponse.json(JSON.parse(text));

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Error en el motor IA. Intente de nuevo." }, { status: 500 });
  }
}