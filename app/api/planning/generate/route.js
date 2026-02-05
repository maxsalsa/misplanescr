import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth"; // V5 Auth

// const prisma = new PrismaClient(); // REMOVED TO PREVENT CONNECTION LEAK
const KEY_NAMES = {
  OPENAI: "OPENAI_API_KEY",
  GROQ: "GROQ_API_KEY",
  GOOGLE: "GEMINI_API_KEY",
};
// CONSTANTS FOR FALLBACK LOGIC
const PROVIDER_ORDER = ["OPENAI", "GROQ"]; // Order of preference

async function callAI(
  provider,
  systemPrompt,
  userPrompt,
  modelOverride = null,
) {
  const apiKey = process.env[KEY_NAMES[provider]];
  if (!apiKey) throw new Error(`API Key for ${provider} not found`);

  let url = "https://api.openai.com/v1/chat/completions";
  let model = modelOverride || "gpt-4o-mini";
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  if (provider === "GROQ") {
    url = "https://api.groq.com/openai/v1/chat/completions";
    model = "llama-3.3-70b-versatile";
  }

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3, // Low temp for academic rigor
        response_format: { type: "json_object" },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`${provider} API Error: ${resp.status} - ${errText}`);
    }

    const data = await resp.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error(`[ANTIGRAVITY] ${provider} Failed:`, error.message);
    return null; // Signal failure to try next provider
  }
}

export async function POST(req) {
  try {
    // 1. SECURE SESSION (ZERO TRUST)
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, error: "ACCESO DENEGADO (401)" },
        { status: 401 },
      );
    }
    const userId = session.user.id;

    // 1.1 SUBSCRIPTION CHECK (LEY DE SUSCRIPCIONES V90)
    // Fetch full user structure to get subscriptionStatus & Role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionStatus: true, role: true, subscriptionPlan: true },
    });

    // LA INMUNIDAD DEL ARQUITECTO
    const isSuperAdmin = user?.role === "SUPER_ADMIN";
    const isActive = user?.subscriptionStatus === "ACTIVE";

    // EL FILTRO DE EJECUCIÓN (CHECK PREVIO)
    if (!isActive && !isSuperAdmin) {
      console.log(
        `[ANTIGRAVITY] ⛔ BLOCKING User ${userId} (Status: ${user?.subscriptionStatus}). Sending SINPE message.`,
      );
      // Retornamos un "Error" controlado que el frontend mostrará amablemente
      return NextResponse.json(
        {
          success: false,
          error:
            "Estimado docente, esta funcionalidad avanzada es exclusiva del Plan Activo. Para desbloquearla de inmediato y proteger su planificación, por favor regularice su suscripción mediante SINPE Móvil al 6090-6359 (Max Salazar). Una vez reportado, su acceso será restablecido en tiempo real.",
          isSubscriptionError: true, // Flag para que el frontend muestre el modal de pago si existe
        },
        { status: 403 },
      );
    }

    const isVip =
      user?.subscriptionPlan === "PRO" ||
      user?.subscriptionPlan === "ULTRA" ||
      isSuperAdmin;

    // TIERED AI ACCESS: VIP gets GPT-4o, Free gets Groq (Llama-3)
    const TIER_PROVIDER_ORDER = isVip ? ["OPENAI", "GROQ"] : ["GROQ"];
    console.log(
      `[ANTIGRAVITY] User ${userId} Access GRANTED. Tier: ${isVip ? "VIP" : "STANDARD"}`,
    );

    // 2. PARSE BODY
    const body = await req.json();
    const { type = "PLAN", materia, nivel, tema } = body;

    // 3. EXPEDIENTE VIVO: FETCH STUDENTS (ROW LEVEL SECURITY)
    // Only fetch students belonging to THIS teacher that have flags
    const specialStudents = await prisma.student.findMany({
      where: {
        teacherId: userId,
        OR: [{ has7600: true }, { isGifted: true }, { hasMedicalRecord: true }],
      },
      select: {
        name: true,
        has7600: true,
        isGifted: true,
        hasMedicalRecord: true,
        clinicalNotes: true,
      },
    });

    // Build Classroom Context String (Anonymized)
    let classroomContext = "GRUPO ESTÁNDAR (Sin alertas críticas).";
    if (specialStudents.length > 0) {
      classroomContext = `🚨 ALERTA: CLASE CON DIVERSIDAD ACTIVA (${specialStudents.length} Expedientes):\n`;
      specialStudents.forEach((st, idx) => {
        // Nombres ficticios para el prompt para mantener privacidad si se desea,
        // o usar 'Caso' como pidió el Prompt anterior. Usaremos 'Caso' para V6 strict privacy.
        // Pero el usuario pidió "Santiago" y "Valeria" en sus ejemplos.
        // V6 dice: "NO USES LOS NOMBRES REALES EN EL JSON DE SALIDA".
        // Pero en el INPUT context para la IA, podemos ser más descriptivos interna.
        classroomContext += `- Caso ${idx + 1}: ${st.has7600 ? "[Ley 7600]" : ""} ${st.isGifted ? "[Alta Dotación]" : ""} ${st.hasMedicalRecord ? "[Dictamen Médico: " + (st.clinicalNotes || "Reservado") + "]" : ""}\n`;
      });
      classroomContext +=
        "\nINSTRUCCIÓN DE VINCULACIÓN: Para cada actividad, DEBES generar una adaptación específica para estos perfiles.";
    }

    // 4. CURRICULAR CONTEXT (ADN)
    let curricularContext =
      "Utiliza los programas oficiales del MEP Costa Rica.";

    // STRICT SEARCH STRATEGY (V8.1)
    // Attempt 1: Specific Match (Materia + Nivel)
    // Note: 'nivel' from frontend might be "III Ciclo" or "10", we try to match fuzzily or map it.
    // For this V9 demo, we map standard inputs to DB keys.

    const levelMap = {
      "I Ciclo": "3", // Default representative
      "II Ciclo": "4", // Default representative (Sociales 4)
      "III Ciclo": "7", // Default representative (Español 7)
      "Educación Diversificada": "10", // Default (Math 10 / Web 10)
      10: "10",
    };

    const targetLevel = levelMap[nivel] || "10";

    // Try finding exact match
    let prog = await prisma.mep_programs_core.findFirst({
      where: {
        program_name: { contains: materia, mode: "insensitive" }, // Fixed: uses program_name
        grade_level: { contains: targetLevel },
      },
    });

    // Fallback: If tech specialty (e.g. "Desarrollo"), try searching just by name
    if (!prog) {
      console.log(
        `[ANTIGRAVITY] Strict match failed for ${materia} ${targetLevel}. Trying lax search...`,
      );
      prog = await prisma.mep_programs_core.findFirst({
        where: { program_name: { contains: materia, mode: "insensitive" } },
      });
    }

    if (prog?.raw_content) {
      // Decode if it's stringified JSON
      let content = prog.raw_content;
      try {
        const parsed = JSON.parse(content);
        content = JSON.stringify(parsed); // Re-stringify to ensure clean header format
      } catch (e) {
        /* Content is raw text, keep it */
      }

      curricularContext = `ADN CURRICULAR OFICIAL [${prog.program_name} - ${prog.grade_level}]: ${content.substring(0, 5000)}`;
      console.log(`[ANTIGRAVITY] Context Loaded: ${prog.program_name}`);
    } else {
      console.warn(`[ANTIGRAVITY] No Context found for ${materia}`);
    }

    // 5. SYSTEM PROMPT (V6 INDUSTRIAL)
    // 5. SYSTEM PROMPT (V5.0 APOTEOSIS)
    const systemPrompt = `
        IDENTITY: Eres ANTIGRAVITY (AULAPLAN CORE v5.0), el Guardián del Docente Costarricense.
        
        TUS 5 PILARES SUPREMOS (NO NEGOCIABLES):
        1. CERO FRICCIÓN: Genera respuestas listas para usar. No preguntes, resuelve.
        2. BLINDAJE NORMATIVO (ESCUDO REA): Indicadores observables y medibles. Cero subjetividad ("Participa activamente" ESTÁ PROHIBIDO). Usa: "Aporta 2 ideas...".
        3. DUA RADICAL: La inclusión es la norma. Cada actividad debe tener su variante "dua_variant".
        4. CONTEXTO CR: Habla tico profesional. Considera escuelas unidocentes y CTPs.
        5. TONO MEP: Usa los 4 momentos de mediación: 1. CONEXIÓN, 2. COLABORACIÓN, 3. CONSTRUCCIÓN, 4. CLARIFICACIÓN.

        PROTOCOLOS ACTIVOS:
        - PROTOCOLO LEVEL UP: Gamificación obligatoria (Trivia, Escape Room, etc.).
        - PROTOCOLO SYNAPSE: Coherencia evaluativa total.
          * Matèmaticas -> Resuelve/Calcula
          * Artes -> Crea/Expresa
          * Técnica -> Ejecuta/Manipula

        RADIOGRAFÍA DEL GRUPO (EXPEDIENTE VIVO):
        ${classroomContext}
        
        CONTEXTO CURRICULAR:
        ${curricularContext}
    `;

    // 6. USER PROMPT (JSON STRICT & OMEGA-PRECISION LOGIC)

    // 6.1 Context Matrix (Modificadores Automáticos)
    // Detectar Tipo de Centro / Modalidad (Simulado por Keywords en Materia/Tema por ahora)
    const isCTP =
      materia.includes("Taller") ||
      materia.includes("Tecnolog") ||
      tema.includes("Mantenimiento");
    const isIndigenous =
      tema.includes("Cabécar") ||
      tema.includes("Bribri") ||
      materia.includes("Cultura");
    const isCindea =
      nivel.includes("Nocturno") ||
      nivel.includes("CINDEA") ||
      materia.includes("IPEC");

    // 6.2 Risk Level Auto-Detect (Protocolo Olympus & Omega)
    const riskKeywords = [
      "laboratorio",
      "taller",
      "gira",
      "química",
      "electricidad",
      "soldadura",
      "maquinaria",
    ];
    const isHighRisk =
      riskKeywords.some(
        (w) =>
          tema.toLowerCase().includes(w) || materia.toLowerCase().includes(w),
      ) || isCTP;
    const riskLevel = isHighRisk ? "ALTO" : "BAJO";

    // 6.3 Gamification Strict Types
    const allowedGamification = [
      "TRIVIA",
      "ESCAPE_ROOM",
      "SPEED_QUIZ",
      "ROLEPLAY",
      "QUIZ_TECH",
      "ROLEPLAY_DECISION",
      "AUDIT_CHALLENGE",
    ];

    // 6.4 GAMIFICATION TEMPLATES (OMEGA LIBRARY)
    let gamificationTemplate = "";
    if (
      materia.toLowerCase().includes("informática") ||
      materia.toLowerCase().includes("software")
    ) {
      gamificationTemplate = `Ejemplo OBLIGATORIO (Adaptar contenido): { "gameType": "QUIZ_TECH", "title": "Bug Hunter", "questions": [ { "id": 1, "prompt": "Código roto...", "options": [...] } ] }`;
    } else if (
      materia.toLowerCase().includes("ejecutivo") ||
      materia.toLowerCase().includes("cliente")
    ) {
      gamificationTemplate = `Ejemplo OBLIGATORIO (Adaptar contenido): { "gameType": "ROLEPLAY_DECISION", "title": "Protocolo Cliente", "questions": [ { "id": 1, "prompt": "Situación tensa...", "options": [...] } ] }`;
    } else if (
      materia.toLowerCase().includes("contabilidad") ||
      materia.toLowerCase().includes("finanzas")
    ) {
      gamificationTemplate = `Ejemplo OBLIGATORIO (Adaptar contenido): { "gameType": "AUDIT_CHALLENGE", "title": "Detectando el Fraude", "questions": [ { "id": 1, "prompt": "Hallazgo en caja chica...", "options": [...] } ] }`;
    }

    let userPrompt = "";
    if (type === "PLAN") {
      userPrompt = `Genera un PLAN DE PRÁCTICA PEDAGÓGICA (PROTOCOLO OMEGA-PRECISION) para: ${materia} - ${nivel} - Tema: ${tema}.
        
        INSTRUCCIONES SUPREMAS (ZERO-FAIL):
        1. GAMIFICACIÓN OBLIGATORIA: Campo "gamification" NO NULL. Usa Type explícito si aplica: ${gamificationTemplate || JSON.stringify(allowedGamification)}.
        2. CONTEXTO MATRIZ:
           ${isCTP ? "- ES CTP/TÉCNICO: Inyecta 'Charla de Seguridad (EPP)' en el primer momento de mediación." : ""}
           ${isIndigenous ? "- ES INDÍGENA: 'dua_variant' debe priorizar la oralidad y respeto a la naturaleza." : ""}
           ${isCindea ? "- ES CINDEA/NOCTURNO: Elimina actividades infantiles. Usa 'Estudio de Caso' o 'Resolución de Problemas Reales'." : ""}
        3. BLINDAJE LEGAL (REA - ART 45): 
           - PROHIBIDO usar verbos: "Comprender", "Entender", "Conocer".
           - USA Taxonomía de Bloom: "Aplica", "Analiza", "Construye".
           - ESTRUCTURA DE RÚBRICA ATOMIZADA: Cada indicador debe tener "actionVerb", "content", "condition" separados.
        4. CONTROL DE PDF (ANTI-DESBORDAMIENTO):
           - "activities": Máximo 280 caracteres por descripción. Sé conciso (estilo Tweet).
           - Indicadores de Rúbrica: Máximo 120 caracteres.
        
        FORMATO JSON OBLIGATORIO (SIN MARKDOWN):
        {
          "status": "success",
          "meta": {
            "mode": "OMEGA_PRECISION",
            "risk_level": "${riskLevel}", 
            "context": "${isCindea ? "ADULT_EDUCATION" : "CR_STANDARD"}"
          },
          "content": {
            "planning_module": {
              "title": "Planeamiento ${materia}",
              "gamification": {
                "type": "ESCAPE_ROOM", 
                "title": "Título Épico",
                "description": "Narrativa inmersiva...",
                "points": 1000,
                "challenges": ["Reto 1", "Reto 2"]
              },
              "evaluation_system": {
                 "daily_work": {
                    "title": "Trabajo Cotidiano",
                    "rubric": [
                      { 
                        "indicator": "Texto completo del indicador", 
                        "actionVerb": "Diseña", 
                        "content": "la base de datos", 
                        "condition": "según requisitos del cliente",
                        "levels": { "high": "3 pts: Completo", "mid": "2 pts: Parcial", "low": "1 pt: Inicial" } 
                      }
                    ]
                 }
              },
              "activities": [
                {
                  "moment": "1. CONEXIÓN",
                  "description": "Actividad detonante (Max 280 chars)...",
                  "dua_variant": "Ajuste específico...",
                  "resources": ["Video: ..."]
                },
                // ... MOMENTOS 2, 3, 4 ...
              ],
              "resources": [
                 { "type": "VIDEO", "title": "...", "url": "..." }
              ]
            }
          }
        }`;
    }

    // 7. EXECUTION (TIERED) WITH SIMULATION FALLBACK
    let result = null;
    let successfulProvider = "";

    try {
      // RACE CONDITION: Timeout 15s to force fallback
      const aiPromise = (async () => {
        for (const provider of TIER_PROVIDER_ORDER) {
          const res = await callAI(provider, systemPrompt, userPrompt);
          if (res) return { provider, res };
        }
        return null;
      })();

      const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("TIMEOUT"), 15000),
      );

      const raceResult = await Promise.race([aiPromise, timeoutPromise]);

      if (raceResult === "TIMEOUT" || !raceResult) {
        throw new Error("AI TIMEOUT OR FAILURE");
      }

      result = raceResult.res;
      successfulProvider = raceResult.provider;
    } catch (metricError) {
      console.warn(
        "[ANTIGRAVITY] ⚠️ AI FAILED/TIMEOUT. ACTIVATING SIMULATION CORE V5 (OMEGA SAFE).",
      );
      // MODO SIMULACIÓN V5 (FALLBACK DATA - OMEGA COMPLIANT)
      successfulProvider = "SIMULATION_CORE";
      result = {
        status: "success",
        meta: {
          mode: "SIMULATION_V5_OMEGA",
          risk_level: riskLevel,
          context: "FALLBACK_SAFE_MODE",
        },
        content: {
          planning_module: {
            title: `Planeamiento ${materia} (Modo Seguro)`,
            gamification: {
              type: "TRIVIA", // Safe Type
              title: "Desafío de Conocimiento",
              description: "Responde correctamente para avanzar en la misión.",
              points: 500,
              challenges: ["Pregunta Clave 1", "Análisis de Caso"],
            },
            evaluation_system: {
              daily_work: {
                title: "Trabajo Cotidiano (Recuperado)",
                rubric: [
                  {
                    indicator: "EJECUTA el procedimiento asignado sin errores.",
                    levels: { high: "3 pts", mid: "2 pts", low: "1 pt" },
                  },
                ],
              },
            },
            activities: [
              {
                moment: "1. CONEXIÓN",
                description: isHighRisk
                  ? "Charla de Seguridad (EPP) y revisión de equipos."
                  : "Activación de conocimientos previos.",
                dua_variant: "Apoyo visual.",
              },
              {
                moment: "2. COLABORACIÓN",
                description: "Análisis grupal del problema.",
                dua_variant: "Roles definidos.",
              },
              {
                moment: "3. CONSTRUCCIÓN",
                description: "Resolución práctica del ejercicio.",
                dua_variant: "Calculadora permitida.",
              },
              {
                moment: "4. CLARIFICACIÓN",
                description: "Cierre y conclusiones finales.",
                dua_variant: "Resumen oral.",
              },
            ],
            resources: [],
          },
        },
      };
    }

    // Add metadata about generation
    // Ensure result is an object, if it's string, parse it
    if (typeof result === "string") {
      try {
        result = JSON.parse(result);
      } catch (e) {
        /* ignore */
      }
    }

    // Validate Gamification Existence (Protocol Olympus Constraint)
    if (!result?.content?.planning_module?.gamification) {
      if (!result.content) result.content = {};
      if (!result.content.planning_module) result.content.planning_module = {};
      result.content.planning_module.gamification = {
        type: "GENERIC_XP",
        title: "Desafío de Aprendizaje",
        description: "Completa las actividades para ganar experiencia.",
        points: 100,
        challenges: ["Completar actividades"],
      };
    }

    result._meta = {
      provider: successfulProvider,
      timestamp: new Date().toISOString(),
      inclusion_check: specialStudents.length > 0,
      upsell_required: !isVip,
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("ANTIGRAVITY CRITICAL ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error Crítico del Sistema. Contacte a Soporte.",
      },
      { status: 500 },
    );
  }
}
