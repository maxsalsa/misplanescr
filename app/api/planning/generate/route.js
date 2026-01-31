import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth"; // V5 Auth

// const prisma = new PrismaClient(); // REMOVED TO PREVENT CONNECTION LEAK
const KEY_NAMES = { OPENAI: "OPENAI_API_KEY", GROQ: "GROQ_API_KEY", GOOGLE: "GEMINI_API_KEY" };
// CONSTANTS FOR FALLBACK LOGIC
const PROVIDER_ORDER = ["OPENAI", "GROQ"]; // Order of preference

async function callAI(provider, systemPrompt, userPrompt, modelOverride = null) {
  const apiKey = process.env[KEY_NAMES[provider]];
  if (!apiKey) throw new Error(`API Key for ${provider} not found`);

  let url = "https://api.openai.com/v1/chat/completions";
  let model = modelOverride || "gpt-4o-mini";
  let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
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
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
        temperature: 0.3, // Low temp for academic rigor
        response_format: { type: "json_object" }
      })
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
      return NextResponse.json({ success: false, error: "ACCESO DENEGADO (401)" }, { status: 401 });
    }
    const userId = session.user.id;

    // 1.1 SUBSCRIPTION CHECK (LEY DE SUSCRIPCIONES V90)
    // Fetch full user structure to get subscriptionStatus & Role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionStatus: true, role: true, subscriptionPlan: true }
    });

    // LA INMUNIDAD DEL ARQUITECTO
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';
    const isActive = user?.subscriptionStatus === 'ACTIVE';

    // EL FILTRO DE EJECUCIÓN (CHECK PREVIO)
    if (!isActive && !isSuperAdmin) {
      console.log(`[ANTIGRAVITY] ⛔ BLOCKING User ${userId} (Status: ${user?.subscriptionStatus}). Sending SINPE message.`);
      // Retornamos un "Error" controlado que el frontend mostrará amablemente
      return NextResponse.json({
        success: false,
        error: "Estimado docente, esta funcionalidad avanzada es exclusiva del Plan Activo. Para desbloquearla de inmediato y proteger su planificación, por favor regularice su suscripción mediante SINPE Móvil al 6090-6359 (Max Salazar). Una vez reportado, su acceso será restablecido en tiempo real.",
        isSubscriptionError: true // Flag para que el frontend muestre el modal de pago si existe
      }, { status: 403 });
    }

    const isVip = user?.subscriptionPlan === 'PRO' || user?.subscriptionPlan === 'ULTRA' || isSuperAdmin;

    // TIERED AI ACCESS: VIP gets GPT-4o, Free gets Groq (Llama-3)
    const TIER_PROVIDER_ORDER = isVip ? ["OPENAI", "GROQ"] : ["GROQ"];
    console.log(`[ANTIGRAVITY] User ${userId} Access GRANTED. Tier: ${isVip ? 'VIP' : 'STANDARD'}`);

    // 2. PARSE BODY
    const body = await req.json();
    const { type = "PLAN", materia, nivel, tema } = body;

    // 3. EXPEDIENTE VIVO: FETCH STUDENTS (ROW LEVEL SECURITY)
    // Only fetch students belonging to THIS teacher that have flags
    const specialStudents = await prisma.student.findMany({
      where: {
        teacherId: userId,
        OR: [{ has7600: true }, { isGifted: true }, { hasMedicalRecord: true }]
      },
      select: { name: true, has7600: true, isGifted: true, hasMedicalRecord: true, clinicalNotes: true }
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
      classroomContext += "\nINSTRUCCIÓN DE VINCULACIÓN: Para cada actividad, DEBES generar una adaptación específica para estos perfiles.";
    }

    // 4. CURRICULAR CONTEXT (ADN)
    let curricularContext = "Utiliza los programas oficiales del MEP Costa Rica.";

    // STRICT SEARCH STRATEGY (V8.1)
    // Attempt 1: Specific Match (Materia + Nivel)
    // Note: 'nivel' from frontend might be "III Ciclo" or "10", we try to match fuzzily or map it.
    // For this V9 demo, we map standard inputs to DB keys.

    const levelMap = {
      "I Ciclo": "3", // Default representative
      "II Ciclo": "4", // Default representative (Sociales 4)
      "III Ciclo": "7", // Default representative (Español 7)
      "Educación Diversificada": "10", // Default (Math 10 / Web 10)
      "10": "10"
    };

    const targetLevel = levelMap[nivel] || "10";

    // Try finding exact match
    let prog = await prisma.mep_programs_core.findFirst({
      where: {
        program_name: { contains: materia, mode: "insensitive" }, // Fixed: uses program_name
        grade_level: { contains: targetLevel }
      }
    });

    // Fallback: If tech specialty (e.g. "Desarrollo"), try searching just by name
    if (!prog) {
      console.log(`[ANTIGRAVITY] Strict match failed for ${materia} ${targetLevel}. Trying lax search...`);
      prog = await prisma.mep_programs_core.findFirst({
        where: { program_name: { contains: materia, mode: "insensitive" } }
      });
    }

    if (prog?.raw_content) {
      // Decode if it's stringified JSON
      let content = prog.raw_content;
      try {
        const parsed = JSON.parse(content);
        content = JSON.stringify(parsed); // Re-stringify to ensure clean header format
      } catch (e) { /* Content is raw text, keep it */ }

      curricularContext = `ADN CURRICULAR OFICIAL [${prog.program_name} - ${prog.grade_level}]: ${content.substring(0, 5000)}`;
      console.log(`[ANTIGRAVITY] Context Loaded: ${prog.program_name}`);
    } else {
      console.warn(`[ANTIGRAVITY] No Context found for ${materia}`);
    }

    // 5. SYSTEM PROMPT (V6 INDUSTRIAL)
    const systemPrompt = `
        ROL: Eres Antigravity, el Arquitecto Pedagógico Senior del MEP Costa Rica.
        
        REGLA DE ORO (EL BINOMIO SAGRADO):
        "La persona docente [verbo mediación]... mientras que la persona estudiante [verbo construcción/acción]..."
        
        📍 RADIOGRAFÍA DEL GRUPO (LECTURA DE EXPEDIENTES):
        ${classroomContext}

        OJO IA - MANDATO DE INCLUSIÓN (V6):
        Si la lista de arriba no está vacía, TU GENERACIÓN DEBE REACCIONAR A ELLA.
        - Si hay "Alta Dotación": Agrega retos complejos.
        - Si hay "Hipoacusia/TDAH": Agrega apoyos visuales y micro-learning.
        - SALIDA: Genera la sección "atencion_diversidad" y los ANEXOS con ajustes puntuales.
        - PRIVACIDAD: En el JSON de salida, NO USES LOS NOMBRES REALES. Usa "Caso A", "Caso B" o "Estudiante con [Condición]".
        
        CONTEXTO CURRICULAR:
        ${curricularContext}
    `;

    // 6. USER PROMPT
    let userPrompt = "";
    if (type === "PLAN") {
      userPrompt = `Genera un PLAN DE PRÁCTICA PEDAGÓGICA para: ${materia} - ${nivel} - Tema: ${tema}.
        ESTRUCTURA JSON REQUERIDA (STRICT):
        {
            "encabezado": { "materia": "${materia}", "administrativo": "Dirección Regional...", "tiempo_estimado": "X Lecciones" },
            "secciones": [
            {
                "aprendizaje_esperado": "...",
                "fases": {
                    "focalizacion": { "actividad": "...", "tiempo": "...", "evidencia": "..." },
                    "exploracion": { "actividad": "...", "tiempo": "...", "evidencia": "..." },
                    "contrastacion": { "actividad": "...", "tiempo": "...", "evidencia": "..." },
                    "aplicacion": { "actividad": "...", "tiempo": "...", "evidencia": "..." }
                },
                "atencion_diversidad": {
                    "alta_dotacion": "...",
                    "neurodiversidad": "...",
                    "adecuacion_acceso": "..."
                },
                "instrumentos_evaluacion": ["..."],
                "anexos": [
                    { "titulo": "Ajustes Razonables (Expediente Vivo)", "contenido": "Detalle de estrategias para los casos identificados..." }
                ]
            }
            ]
        }`;
    }

    // 7. EXECUTION (TIERED)
    let result = null;
    let successfulProvider = "";

    for (const provider of TIER_PROVIDER_ORDER) {
      result = await callAI(provider, systemPrompt, userPrompt);
      if (result) {
        successfulProvider = provider;
        break;
      }
    }

    if (!result) throw new Error("TODOS LOS MOTORES DE IA FALLARON (OPENAI & GROQ). SISTEMA NO DISPONIBLE.");

    // Add metadata about generation
    result._meta = {
      provider: successfulProvider,
      timestamp: new Date().toISOString(),
      inclusion_check: specialStudents.length > 0,
      upsell_required: !isVip
    };

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("ANTIGRAVITY ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
