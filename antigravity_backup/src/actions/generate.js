'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

import { auth } from "@/auth";

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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // 2. EL PROMPT MAESTRO (Automatización Total)
    const prompt = `
      ROL: Eres el Senior Innovation Lead de AulaPlan. Tu misión es transformar los programas del MEP en experiencias disruptivas (Política Educativa 2017).
      
      TAREA: Generar un Planeamiento Didáctico con ADN de Innovación.
      
      DATOS DE ENTRADA:
      - Modalidad: ${data.modalidad}
      - Asignatura: ${data.asignatura}
      - Nivel: ${data.nivel}
      - Tema: "${data.tema}"
      - Estudiantes DUA: Juan (TDAH), Ana (Visual).

      PROTOCOLO DE CREATIVIDAD (Decreto 41984-MEP):
      - BINOMIO SAGRADO 2.0: "La persona DOCENTE [Provoca/Reta/Facilita] mediante [Estrategia] -> La persona ESTUDIANTE [Construye/Diseña/Prototipa] el [Resultado]".
      - PROHIBIDO: Verbos pasivos (Escucha, Observa).
      - EJEMPLO PERFECTO: "La persona docente reta al grupo con un ataque simulado; la persona estudiante configura un firewall en tiempo real."
      - VARIEDAD DUA: Alternar estrategias (Visual, Auditivo, Kinestésico). No repetir la misma técnica más de 2 veces.
      - CRONO-PEDAGOGÍA: Calcular actividades para bloques de 40 u 80 minutos.

      INSTRUCCIONES DE GENERACIÓN:
      1. Genera el Encabezado Administrativo y la Habilidad/Aprendizaje Esperado (deducido si falta).
      2. **MATRIZ DE MEDIACIÓN INNOVADORA (El Alma del Planeamiento):**
         Genera una tabla con las columnas: [Momento | La Persona Docente | La Persona Estudiante | Herramienta de Innovación].
         - FOCALIZACIÓN: Pregunta creativa + Lluvias de ideas.
         - EXPLORACIÓN: Investigación + Prototipado.
         - CONTRASTACIÓN: Círculos de punto de vista + Visual Thinking.
         - APLICACIÓN: Resolución de problemas + Exposición.
      3. Integra las adecuaciones de Juan y Ana en las actividades (en negrita).
      4. Agrega una sección de "Evaluación e Indicadores" al final.

      FORMATO DE SALIDA (MARKDOWN):
      # PLANEAMIENTO INNOVADOR - ${data.asignatura.toUpperCase()}
      
      ## I. ADMINISTRATIVO
      | Regional | Centro | Modalidad |
      | :--- | :--- | :--- |
      | ${data.regional} | ${data.centro} | ${data.modalidad} |

      ## II. TÉCNICA
      **Habilidad:** (Deducir)
      **Aprendizaje Esperado:** ${data.tema}

      ### 🚀 MEDIACIÓN PEDAGÓGICA (DINÁMICA AULAPLAN)
      | Momento | La Persona Docente (Mediación) | La Persona Estudiante (Construcción) | Herramienta Innovación |
      | :--- | :--- | :--- | :--- |
      | **FOCALIZACIÓN** | (Acción docente...) | (Acción estudiante...) | ... |
      | **EXPLORACIÓN** | ... | ... | ... |
      | **CONTRASTACIÓN** | ... | ... | ... |
      | **APLICACIÓN** | ... | ... | ... |

      ### � EVALUACIÓN
      | Indicador | Nivel Inicial | Nivel Intermedio | Nivel Avanzado |
      | :--- | :--- | :--- | :--- |
      | ... | ... | ... | ... |
      
      ---
      *Diseñado por el Senior Innovation Lead de AulaPlan*
    `;

    const result = await model.generateContent(prompt);
    return { success: true, plan: result.response.text() };

  } catch (error) {
    return { success: false, error: "La IA está saturada. Intente de nuevo." };
  }
}
