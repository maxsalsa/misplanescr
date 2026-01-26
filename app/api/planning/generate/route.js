import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const KEY_NAMES = { OPENAI: "OPENAI_API_KEY", GROQ: "GROQ_API_KEY", GOOGLE: "GEMINI_API_KEY" };

export async function POST(req) {
  try {
    const body = await req.json();
    const { type = "PLAN", materia, nivel, tema, userId, provider = "OPENAI" } = body;

    // 1. SECURITY CHECK: VERIFICAR SUSCRIPCIÓN
    // Si no hay userId (demo) o el usuario no paga, bloqueamos.
    // NOTA: Para este script asumimos que el frontend manda el userId o email.
    // En producción real, esto se saca de la sesión (auth()).
    if (userId) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.role !== "SUPER_ADMIN" && user?.subscriptionStatus !== "ACTIVE") {
            return NextResponse.json({ success: false, error: "SUSCRIPCIÓN INACTIVA. Actualice su plan." }, { status: 403 });
        }
    }

    // 2. CONTEXTO CURRICULAR (ADN)
    let curricularContext = "Utiliza los programas oficiales del MEP Costa Rica.";
    const prog = await prisma.mep_programs_core.findFirst({
        where: { filename: { contains: materia || "General", mode: "insensitive" } }
    });
    if (prog?.structure_json) {
        curricularContext = `ADN CURRICULAR OFICIAL (NO INVENTAR): ${JSON.stringify(prog.structure_json).substring(0, 5000)}`;
    }

    // 3. EL PROMPT SAGRADO (INGENIERÍA PEDAGÓGICA)
    let systemPrompt = `
    ROL: Eres Antigravity, el Arquitecto Pedagógico Senior del MEP Costa Rica.
    
    REGLA DE ORO (EL BINOMIO SAGRADO):
    Toda estrategia de mediación debe redactarse explícitamente así:
    "La persona docente [verbo mediación]... mientras que la persona estudiante [verbo construcción/acción]..."
    PROHIBIDO usar voz pasiva o redacción impersonal.
    
    FILOSOFÍA:
    - Cronopedagogía: Las actividades deben ser realistas para bloques de 40/80 mins.
    - Evidencias: CADA actividad debe generar una evidencia tangible (Cuadro, Maqueta, Resumen, Debate).
    - Rúbricas: Escala estricta 1 (Inicial), 2 (Intermedio), 3 (Avanzado).
    
    CONTEXTO CURRICULAR:
    ${curricularContext}
    `;

    // 4. INSTRUCCIONES ESPECÍFICAS POR TIPO
    let userPrompt = "";

    if (type === "PLAN") {
        userPrompt = `Genera un PLAN DE PRÁCTICA PEDAGÓGICA para: ${materia} - ${nivel} - Tema: ${tema}.
        
        ESTRUCTURA JSON REQUERIDA (STRICT):
        {
          "encabezado": { "materia": "${materia}", "administrativo": "Dirección Regional...", "tiempo_estimado": "X Lecciones" },
          "secciones": [
            {
              "aprendizaje_esperado": "Texto exacto del programa",
              "indicador_aprendizaje": "Texto exacto del programa",
              "fases": {
                 "focalizacion": { "actividad": "Binomio Sagrado...", "tiempo": "X min", "evidencia": "..." },
                 "exploracion": { "actividad": "Binomio Sagrado...", "tiempo": "X min", "evidencia": "..." },
                 "contrastacion": { "actividad": "Binomio Sagrado...", "tiempo": "X min", "evidencia": "..." },
                 "aplicacion": { "actividad": "Binomio Sagrado...", "tiempo": "X min", "evidencia": "..." }
              },
              "instrumentos_evaluacion": ["Rúbrica", "Lista de Cotejo"]
            }
          ]
        }`;
    } 
    else if (type === "RUBRICA") {
        userPrompt = `Genera una RÚBRICA ANALÍTICA (1-3) para evaluar: ${tema} en ${materia}.
        
        ESTRUCTURA JSON REQUERIDA:
        {
          "titulo": "Rúbrica de Evaluación",
          "criterios": [
            {
              "indicador": "Indicador del programa",
              "niveles": {
                "inicial": "1 pto: Describe de forma limitada...",
                "intermedio": "2 pts: Describe parcialmente...",
                "avanzado": "3 pts: Describe detalladamente..."
              }
            }
          ]
        }`;
    }
    else if (type === "COTIDIANO") {
        userPrompt = `Diseña una ACTIVIDAD DE TRABAJO COTIDIANO para ${tema}.
        Debe incluir: Instrucciones para el estudiante, Materiales y Tabla de Calificación.
        Usa el Binomio Sagrado en las instrucciones.`;
    }

    // 5. EJECUCIÓN (OPENAI PREFERRED FOR COMPLEXITY)
    const apiKey = process.env[KEY_NAMES[provider]];
    
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: "gpt-4o-mini", // Mini es suficiente si el prompt es perfecto
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
            temperature: 0.3, // Baja temperatura para mayor rigor académico
            response_format: { type: "json_object" }
        })
    });

    if (!resp.ok) throw new Error("Error en IA Generativa");
    const data = await resp.json();
    const result = JSON.parse(data.choices[0].message.content);

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("ANTIGRAVITY ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
