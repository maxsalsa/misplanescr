import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { logger } from "@/lib/logger";

const prisma = new PrismaClient();

// MAPA DE LLAVES
const KEY_NAMES = { OPENAI: "OPENAI_API_KEY", GROQ: "GROQ_API_KEY", GOOGLE: "GEMINI_API_KEY" };

/**
 * ⚡ JUGGERNAUT ENGINE: Failover System (Hybrid AI)
 * Intenta OpenAI -> Si falla, Groq -> Si falla, Gemini.
 */
async function callAI(provider, model, messages, jsonMode = true) {
    const apiKey = process.env[KEY_NAMES[provider]];
    if (!apiKey) throw new Error(`API Key faltante para ${provider}`);

    let url = "https://api.openai.com/v1/chat/completions";
    let headers = { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` };
    let body = {
        model: model,
        messages: messages,
        temperature: 0.4
    };

    if (jsonMode) body.response_format = { type: "json_object" };

    // AJUSTES ESPECÍFICOS POR PROVEEDOR
    if (provider === "GROQ") {
        url = "https://api.groq.com/openai/v1/chat/completions";
        // Groq usa formato compatible OpenAI
    } else if (provider === "GOOGLE") {
        // NOTA: Gemini requiere biblioteca diferente o adaptador. 
        // Para simplificar Juggernaut, usaremos la URL base compatible si existe, 
        // o lanzamos error para que el sistema use el siguiente.
        // Google AI Studio a veces ofrece endpoint compatible.
        // Si no, asumimos falla y retornamos error.
        // TODO: Implementar Google Generative AI SDK real si falla OpenAI+Groq.
        throw new Error("Gemini Adapter Pending Implementation - Skipping to Error");
    }

    const resp = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });

    if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`Error ${provider} (${resp.status}): ${errorText}`);
    }

    const data = await resp.json();
    return JSON.parse(data.choices[0].message.content);
}

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            type = "PLAN", // PLAN, RUBRICA, EXAMEN, CONDUCTA
            materia,
            nivel,
            tema,
            studentInfo, // Para reportes de conducta
            provider = "OPENAI" // Preferencia inicial
        } = body;

        // 1. CONTEXTO DEL REGLAMENTO (Si es necesario)
        let reglamentoContext = "";
        if (type === "CONDUCTA" || type === "RUBRICA" || type === "EXAMEN") {
            const setting = await prisma.systemSetting.findUnique({ where: { key: "REGLAMENTO_EVALUACION" } });
            if (setting) reglamentoContext = `BASADO EN EL REGLAMENTO VIGENTE: ${setting.value.substring(0, 5000)}...`;
        }

        // 2. CONTEXTO CURRICULAR (ADN)
        let curricularContext = "";
        if (materia) {
            const prog = await prisma.mep_programs_core.findFirst({
                where: { filename: { contains: materia, mode: "insensitive" } }
            });
            if (prog?.structure_json) curricularContext = `PROGRAMA OFICIAL MEP: ${JSON.stringify(prog.structure_json).substring(0, 8000)}`;
        }

        // 3. CONSTRUCCIÓN DEL PROMPT SEGÚN TIPO
        let systemPrompt = `Eres Antigravity, el asistente pedagógico oficial del MEP. `;

        if (type === "PLAN") {
            systemPrompt += `Genera un PLAN DE PRÁCTICA PEDAGÓGICA completo.
        ${curricularContext}
        Estructura JSON: { "encabezado": {}, "secciones": [{"aprendizaje": "...", "estrategias": ["Focalización...", "Exploración...", "Contrastación...", "Aplicación..."], "indicadores": []}] }`;
        }
        else if (type === "RUBRICA") {
            systemPrompt += `Genera una RÚBRICA DE EVALUACIÓN para ${tema}.
        ${reglamentoContext}
        Usa escalas: Inicial, Intermedio, Avanzado.
        Estructura JSON: { "criterios": [{ "indicador": "...", "niveles": { "inicial": "...", "intermedio": "...", "avanzado": "..." }, "puntos": 5 }] }`;
        }
        else if (type === "EXAMEN") {
            systemPrompt += `Genera una PRUEBA ESCRITA sobre ${tema}.
        ${curricularContext}
        Incluye selección única, respuesta corta y desarrollo.
        Estructura JSON: { "instrucciones": "...", "items": [{ "tipo": "Selección", "pregunta": "...", "opciones": [], "respuesta_correcta": "..." }] }`;
        }
        else if (type === "CONDUCTA") {
            systemPrompt += `Redacta una BOLETA DE CONDUCTA y recomienda sanción.
        Estudiante: ${studentInfo?.name}. Falta: ${studentInfo?.falta}.
        ${reglamentoContext}
        Estructura JSON: { "clasificacion_falta": "Leve/Grave/Muy Grave", "articulo_aplicable": "...", "descripcion_tecnica": "...", "accion_recomendada": "..." }`;
        }

        const userPrompt = `Generar ${type} para ${materia || "Caso Estudiante"}`;
        const messages = [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }];

        // 4. EJECUCIÓN CON JUGGERNAUT (FAILOVER)
        let result = null;
        try {
            // INTENTO 1: PRIMARY (OPENAI)
            logger.info("IA_GENERATION", `Intentando con OPENAI (gpt-4o-mini)...`);
            result = await callAI("OPENAI", "gpt-4o-mini", messages);
            logger.info("IA_SUCCESS", `Generación exitosa con OPENAI.`);
        } catch (errOpenAI) {
            logger.warn("IA_FAILOVER", `Fallo OpenAI: ${errOpenAI.message}. Activando Respaldo GROQ...`);
            try {
                // INTENTO 2: FALLLBACK (GROQ)
                result = await callAI("GROQ", "llama3-8b-8192", messages);
                logger.info("IA_SUCCESS", `Generación exitosa con GROQ.`);
            } catch (errGroq) {
                logger.error("IA_CRITICAL", `Fallo Groq: ${errGroq.message}. Sistema crítico.`);
                throw new Error("Juggernaut Failure: Todos los proveedores de IA caídos.");
            }
        }

        return NextResponse.json({ success: true, data: result });

    } catch (error) {
        logger.error("SYSTEM_ERROR", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
