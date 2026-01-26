'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function generatePlanAction(formData) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "No autorizado. Inicie sesión." };

  // 🛡️ PREMIUM CHECK (Free users cannot generate)
  // Max Salazar (admin) bypasses this.
  const isPremium = session.user.isPremium || session.user.role === 'admin';
  if (!isPremium) return { success: false, error: "Función Premium. Suscríbase para generar IA." };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { success: false, error: "Falta API Key de IA." };

  // 1. Recolección Inteligente
  const data = {
    modalidad: formData.get('modalidad'),
    asignatura: formData.get('asignatura'),
    nivel: formData.get('nivel'),
    tema: formData.get('topic'),
    regional: formData.get('regional'),
    centro: formData.get('centro')
  };

  try {
    // 🧠 ANTIGRAVITY INTELLIGENCE CORE LOOKUP
    const normalizedSubject = data.asignatura.toLowerCase().trim();
    const normalizedLevel = data.nivel.replace("Grado", "").trim(); // Simple normalization

    console.log(`🔍 [CORE LOOKUP] Buscando: ${normalizedSubject} nivel ${normalizedLevel}...`);

    // Flexible Search using JSONB containment or partial text matching could be better, 
    // but for V1 we search strictly or fallback to 'General'
    const program = await prisma.studyProgram.findFirst({
      where: {
        OR: [
          { subject: { contains: normalizedSubject, mode: 'insensitive' } },
          { jsonContent: { path: ['materia'], string_contains: normalizedSubject } }
        ]
      }
    });

    let contextData = "PROGRAMA OFICIAL NO ENCONTRADO EN DATABASE. USA CONOCIMIENTO GENERAL.";
    if (program) {
      console.log(`✅ [CORE MATCH] Encontrado: ${program.id} (${program.subject})`);
      contextData = JSON.stringify(program.jsonContent).substring(0, 30000); // Limit context size
    } else {
      console.warn(`⚠️ [CORE MISS] No se halló syllabus oficial para: ${normalizedSubject}`);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // 2. EL PROMPT MAESTRO (Industrial & Data-Driven)
    const prompt = `
      ROL: Eres el Senior Innovation Lead y "Guardián del Binomio Sagrado" de AulaPlan.
      
      FUENTE DE VERDAD (PRIORIDAD SUPREMA):
      A continuación se presenta el PROGRAMA DE ESTUDIO OFICIAL (JSON) extraído de la Base de Datos del MEP:
      \`\`\`json
      ${contextData}
      \`\`\`
      *INSTRUCCIÓN*: Si el JSON contiene "Unidades" o "Resultados de Aprendizaje", ÚSALOS LITERALMENTE. No inventes indicadores si existen en el JSON.

      DATOS DE ENTRADA:
      - Modalidad: ${data.modalidad}
      - Asignatura: ${data.asignatura}
      - Nivel: ${data.nivel}
      - Tema/Unidad: "${data.tema}"
      - Estudiantes DUA: Juan (TDAH), Ana (Visual).

      PROTOCOLO DE CREATIVIDAD (Decreto 41984-MEP):
      - BINOMIO SAGRADO 2.0: "La persona DOCENTE [Provoca/Reta/Facilita] mediante [Estrategia] -> La persona ESTUDIANTE [Construye/Diseña/Prototipa] el [Resultado]".
      - PROHIBIDO: Verbos pasivos (Escucha, Observa).
      - ESTRUCTURA DUA: Las actividades marcadas con **(Juan/Ana)** deben ser explícitas.

      INSTRUCCIONES DE GENERACIÓN:
      1. **Encabezado**: Extrae los datos administrativos.
      2. **Matriz Pedagógica**: 
         - Columnas: [Momento | La Persona Docente | La Persona Estudiante | Herramienta Innovación].
         - *Focalización*: Enganche emocional / pregunta retadora.
         - *Exploración*: Indagación activa (Usa datos del JSON si hay "Actividades Sugeridas").
         - *Contrastación*: Análisis profundo y debate.
         - *Aplicación*: Creación de producto final tangible.
      3. **Evaluación**: Genera rúbrica basada en los indicadores OFICIALES del JSON (si existen).

      FORMATO DE SALIDA (MARKDOWN PULIDO):
      # PLANEAMIENTO OFICIAL - ${data.asignatura.toUpperCase()}
      > *Fuente de Datos: ${program ? "🟢 BASE DE DATOS MEP (VERIFICADO)" : "🟡 GENERACIÓN GENERAL (SIN DATA OFICIAL)"}*

      ## I. DATOS ADMINISTRATIVOS
      | Regional | Centro | Nivel |
      | :--- | :--- | :--- |
      | ${data.regional} | ${data.centro} | ${data.nivel} |

      ## II. HABILIDADES Y APRENDIZAJES
      **Aprendizaje Esperado:** ${data.tema} (O el correspondiente del JSON)

      ### 🚀 MEDIACIÓN PEDAGÓGICA (BINOMIO SAGRADO)
      | Momento | La Persona Docente | La Persona Estudiante | Recursos |
      | :--- | :--- | :--- | :--- |
      | **FOCALIZACIÓN** | ... | ... | ... |
      | **EXPLORACIÓN** | ... | ... | ... |
      | **CONTRASTACIÓN** | ... | ... | ... |
      | **APLICACIÓN** | ... | ... | ... |

      ---
      *Generado por Antigravity v5.6 (DeepMind)*
    `;

    const result = await model.generateContent(prompt);
    return { success: true, plan: result.response.text() };

  } catch (error) {
    console.error("GEN ERROR:", error);
    return { success: false, error: "Error en el Núcleo de IA. Intente de nuevo." };
  }
}
