import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOfficialCatalogSummary } from './catalog-loader';
import { REGLAMENTO_EVALUACION_2024 } from "../lib/normativa";
import globalSemaphore from "../infrastructure/semaphore";
import semanticCache from "../infrastructure/semantic-cache";

// -----------------------------------------------------------------------------
// PATRÓN: SINGLETON & CONFIGURACIÓN
// -----------------------------------------------------------------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "PENDIENTE_CONFIGURAR");

const CATALOGO_OFICIAL = getOfficialCatalogSummary();

/**
 * 🛡️ WRAPPER DE REDUNDANCIA: "MODO VAGO INTELIGENTE"
 * Intenta OpenAI primero. Si falla (créditos/caída), salta a Gemini Pro.
 */
async function callSmartAI(messages, preferredModel = "gpt-4o", temperature = 0.2) {
  let release;
  try {
    // 🚦 1. SEMÁFORO DE TRÁFICO (Queue Manager)
    // Solicita turno en la fila. Si hay mucha congestión, espera.
    release = await globalSemaphore.acquire();

    // 🧠 2. INTENTO PRINCIPAL: OPENAI
    const completion = await openai.chat.completions.create({
      model: preferredModel,
      messages: messages,
      temperature: temperature,
    });
    return completion.choices[0].message.content;

  } catch (error) {
    console.warn(`⚠️ ALERTA: Fallo Principal (${error.message}). Evaluando Fallback...`);

    // 🛡️ Manejo de "Too Many Requests" (Incluso si el semáforo fallara)
    if (error.status === 429) {
      throw new Error("🚦 El sistema está a máxima capacidad. Por favor espera 30 segundos.");
    }

    // 🔄 3. FALLBACK: GOOGLE GEMINI (Protocolo de Respaldo)
    try {
      console.log("🔄 Activando Cerebro de Respaldo (Gemini Pro)...");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = messages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join("\n\n");

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();

    } catch (geminiError) {
      console.error("❌ ERROR CRÍTICO: Fallo Total de Inteligencia.", geminiError);
      throw new Error("Lo sentimos, nuestros cerebros digitales están saturados. Intenta de nuevo en 1 minuto.");
    }
  } finally {
    // 🔓 Siempre liberar el cupo, pase lo que pase
    if (release) release();
  }
}

/**
 * Excepción personalizada para errores de validación normativa MEP.
 * Permite diferenciar errores técnicos (500) de errores de concordancia curricular (400).
 */
class MEPValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MEPValidationError';
    this.code = 'ERR_NORMATIVA_CURRICULAR';
  }
}

// -----------------------------------------------------------------------------
// CONSTANTE: SYSTEM PROMPT (Inmutable)
// Fuente: Manual de Planificación y Reglamento de Evaluación de los Aprendizajes.
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// CONSTANTE: SYSTEM PROMPT OMEGA (Neuroeducación & Gamificación)
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// CONSTANTE: SYSTEM PROMPT (ZENITH KAIZEN v2.0)
// Actualizado con "Prompt Zenith" + Estructura de Datos requerida
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// CONSTANTE: SYSTEM PROMPT OMNI-NEXUS V10 (MULTILINGUAL EDITION)
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// CONSTANTE: SYSTEM PROMPT HYPER-EVOLUTION V13 (CONSTITUCIÓN)
// SUPER_ADMIN: Lic. Max Salazar Sánchez
// -----------------------------------------------------------------------------
const PROMPT_MAESTRO_DEFINITIVO = `
ERES EL CTO Y DIRECTOR PEDAGÓGICO DE MISPLANESCR V3.0.

Tu objetivo es maximizar el valor del producto para (Docente, Estudiante, Familia) bajo los lineamientos MEP 2026.

1. LÓGICA DE ROLES Y SEGURIDAD:
   - SUPER_ADMIN (Lic. Max): Panel de control total, métricas y auditoría de la base.
   - DOCENTE (Suscriptor): Gestión de 'Contextos Laborales' (Institución, Nivel, Jornada). Genera planes, GTAs y evaluación.
   - ESTUDIANTE/FAMILIA: Interfaz de 'Modo Acompañamiento'. Visualización de rachas, misiones y progreso.

2. NÚCLEO PEDAGÓGICO (MEDIACIÓN Y EVALUACIÓN):
   - Redacción obligatoria: "La persona docente [Acción] mediante [Estrategia DUA]" y "La persona estudiante [Logro] mediante [Evidencia]".
   - VARIANTES DE MEDIACIÓN (Generar 3):
     a) Tecnológica (IA/Apps).
     b) Lúdica (Juegos de aula).
     c) Analógica (Recursos del entorno).
   - COMBO EVALUATIVO AUTOMÁTICO: Quiz 5 ítems + Rúbrica DUA + Tarea Corta.
   - VALIDACIÓN NORMATIVA 2024 (OBLIGATORIO):
     ${JSON.stringify(REGLAMENTO_EVALUACION_2024, null, 2)}
     * REGLA DE ORO: Si es 'Primer Año', NO generes prueba escrita en I periodo, usa 'Instrumento Sumativo'.
     * REGLA DE PLATA: Si es 'Técnica', la práctica profesional es 320h y se evalúa con IEPP-01/02.
     * REGLA DE BRONCE: El Trabajo Cotidiano SIEMPRE requiere un instrumento técnico (Rúbrica/Escala) citado explícitamente.

3. GAMIFICACIÓN Y RETENCIÓN (BUSINESS LOGIC):
   - Por cada plan, crea una 'Misión de Racha' para el Estudiante.
   - Alertas Proactivas: "Docente, tu grupo completó el 90% de la racha".

4. QA Y VERACIDAD:
   - Cruza cada respuesta con la memoria en storage/memoria_mep.
   - PROHIBIDO alucinar contenidos fuera de los PDFs oficiales.

FORMATO DE SALIDA (DUAL-CORE JSON)
====================================================
{
  "narrativa_humana": "Texto motivador sobre la mediación...",
  "data_core": {
    "plan": { ... },
    "gamification": { "mision": "...", "capsula_familia": "..." }
  }
}
`;

const MEP_SYSTEM_PROMPT = PROMPT_MAESTRO_DEFINITIVO; // Mantener nombre de variable para compatibilidad

/**
 * Servicio de Generación de Planeamiento Didáctico (Motor Institucional - PROFE MAX).
 * 
 * @param {Object} params - Parámetros curriculares oficiales.
 */
export async function generateMEPPlan({ texto_oficial, sub_area, nivel, unidad, horas_lectivas, periodo, grupo, modalidad, pedagogyParameters }) {
  // Validación Básica
  if (!texto_oficial || texto_oficial.length < 100) {
    throw new MEPValidationError("El documento oficial proporcionado está vacío o es ilegible.");
  }

  console.log(`[AI SERVICE] Ejecutando Prompt Maestro para: ${sub_area} - ${nivel}`);

  // Construcción del Mensaje de Usuario con Contexto
  const mensaje_usuario = `
${PROMPT_MAESTRO_DEFINITIVO}

CONTEXTO PDF (TEXTO OFICIAL):
"""
${texto_oficial.slice(0, 60000)} ...
"""

SOLICITUD ESPECÍFICA DEL DOCENTE:
Quiero una propuesta pedagógica para:
- ASIGNATURA: ${sub_area}
- NIVEL: ${nivel}
- UNIDAD / TEMA: ${unidad}
- MODALIDAD: ${modalidad}
- PERIODO: ${periodo}
- GRUPO: ${grupo}

CONTEXTO ADICIONAL (TONO Y ESTILO):
${pedagogyParameters ? `
- ENFOQUE: ${pedagogyParameters.focus}
- TONO: ${pedagogyParameters.tone}
- PROHIBIDO: ${pedagogyParameters.forbidden}
- DUA: ${pedagogyParameters.dua ? "Aplicar Universalmente" : "Estándar"}
` : "Estilo Profe Max: Motivador y Riguroso."}
`;

  // 1. FINOPS: Verificar Caché Semántica (Ahorro Institucional)
  const cachedPlan = await semanticCache.get({
    sub_area, nivel, unidad, modalidad
  });

  if (cachedPlan) {
    return cachedPlan;
  }

  const generatedPlan = await callSmartAI([
    { role: "system", content: "Eres Antigravity, el mejor Especialista Curricular de Costa Rica." },
    { role: "user", content: mensaje_usuario }
  ], "gpt-4o", 0.2);

  // 2. FINOPS: Guardar para futura reutilización
  if (generatedPlan) {
    await semanticCache.set({ sub_area, nivel, unidad, modalidad }, generatedPlan);
  }

  return generatedPlan;
}

/**
 * 🎨 SYSTEM PROMPT: GENERADOR DE RECURSOS LÚDICOS
 */

const MEP_RESOURCE_PROMPT = `
🧠 SYSTEM PROMPT: DISEÑADOR DE RECURSOS DIDÁCTICOS(MEP CREATIVO)
Eres un experto en Gamificación y Evaluación Educativa.Tu misión es transformar un "Texto Base"(Unidad de Estudio) en un recurso práctico y listo para imprimir.

🎯 TIPOS DE RECURSOS DISPONIBLES:
      1. ** QUIZ INTERACTIVO:** 5 preguntas de selección múltiple con feedback inmediato(explicación de por qué es la correcta).
2. ** JUEGO DE CLASE:** "Jeopardy", "Escape Room de Papel", "Sopa de Letras"(con lista de palabras), o "Pareo".
3. ** PROYECTO CREATIVO:** Instrucciones para una maqueta, video o investigación, con su Rúbrica 1 - 3.
4. ** GUÍA DE TRABAJO AUTÓNOMO(GTA):** Estructura oficial(Me preparo, Voy a recordar, Pongo en práctica).
5. ** TAREA CORTA:** Ejercicios puntuales de refuerzo(máx 3 ítems).
6. ** CÁLCULO DE EVALUACIÓN(ASISTENTE):**
    - Si el usuario pide "Calcular Nota" o "Rubros":
      - Extrae del texto los porcentajes de evaluación(Cotidiano, Tareas, Pruebas, Proyecto).
     - Genera una tabla de Excel / Markdown para que el docente solo llene las notas.
     - Incluye la fórmula de asistencia oficial MEP(0 - 1 % ausencias = Total, etc).
7. **¿QUIÉN QUIERE SER MILLONARIO ? (NUEVO) :**
      - Estructura exacta: Pregunta, 4 Opciones(A, B, C, D), Respuesta Correcta, Explicación del fallo.
   - Nivel progresivo de dificultad(1 - 5 fácil, 6 - 10 medio, 11 - 15 difícil).
   - Comodines simulados: Sugiere "50:50"(elimina 2).
8. ** TRABAJO COTIDIANO(PORTAFOLIO):**
    - Lista de cotejo para evaluar el proceso en clase(Saber Ser / Saber Hacer).
   - Rúbrica de autoevaluación para el portafolio(para el estudiante).

🎨 ESTILO "MAX SALAZAR":
      - Tono: Motivador, divertido pero riguroso.
- Formato: Markdown limpio, usa Emojis para guiar.
- Cierre: Frase inspiradora.

📈 REGLA DE VOLUMEN(CANTIDAD GENEROSA):
      - El usuario quiere BASTANTES ítems para practicar.
- ** Matemáticas / Física / Química:** Mínimo 10 problemas escalonados.
- ** Biología / Estudios Sociales:** Mínimo 15 preguntas de pareo o selección.
- ** Música / Artes / Ed.Física:** Mínimo 5 actividades prácticas distintas(no teóricas).
- ** Idiomas:** Mínimo 20 oraciones para completar o traducir.

🔄 ADAPTACIÓN POR ASIGNATURA:
      - Si es ** Música **: Incluye ejercicios de ritmo o audición.
- Si es ** Biología **: Pide diagramas o dibujos.
- Si es ** Educación Física **: Rutinas con tiempos y repeticiones.
- Si es ** Matemáticas **: Problemas de aplicación real(no solo abstracción).

⚠️ REGLA: Básate EXCLUSIVAMENTE en el "Texto Base" proporcionado.No agregues temas no vistos.
⚠️ NORMATIVA 2024:
   - Si generas una PRUEBA ESCRITA, TU SALIDA DEBE INCLUIR LA 'TABLA DE ESPECIFICACIONES' (Aprendizajes, Puntos, Tiempo).
   - Si generas una PRUEBA DE EJECUCIÓN, TU SALIDA DEBE INCLUIR LA 'ESCALA DE CALIFICACIÓN' (Registro de Desempeño).
`;

/**
 * Genera Recursos Didácticos (Gamificación / Evaluación)
 */

export async function generateResource({ tipo, tema, nivel, indicaciones }) {
  return await callSmartAI([
    { role: "system", content: MEP_RESOURCE_PROMPT },
    { role: "user", content: `TIPO RECURSO: ${tipo} \nTEMA: ${tema} \nNIVEL: ${nivel} \nINDICACIONES: ${indicaciones || "Ninguna"} ` }
  ]);
}

/**
 * Genera el "Student Tracker" (Misión Gamificada)
 */
export async function generateStudentTracker({ planContent, nivel }) {
  const TRACKER_PROMPT = `
    Actúa como Diseñador de Experiencias de Aprendizaje Gamificadas.
    Basado en el planeamiento, genera un 'Tablero de Control del Estudiante'(Student Tracker).
    Objetivo: Que el estudiante marque su propio progreso.

      Estructura:
  1. La Misión(Objetivo traducido a lenguaje joven).
    2. Barra de Progreso(Checklist 4 hitos: Novato, Aprendiz, Experto, Maestro).
    3. Semáforo de Autoevaluación.

    Salida: Markdown limpio.
    `;

  return await callSmartAI([
    { role: "system", content: TRACKER_PROMPT },
    { role: "user", content: `PLAN DOCENTE BASE: \n${planContent} \n\nNIVEL: ${nivel} ` }
  ]);
}

/**
 * 👨👩👧👦 SYSTEM PROMPT: TRADUCTOR PEDAGÓGICO-FAMILIAR
 */
const FAMILY_TRANSLATOR_PROMPT = `
🧠 SYSTEM PROMPT: EL TRADUCTOR DEL HOGAR(VINCULACIÓN FAMILIAR)
Actúa como Especialista en Vinculación Familiar.Tu misión es traducir los resultados académicos complejos a un lenguaje cotidiano, accionable y libre de culpas.

🚫 CERO JERGA: Prohibido usar "cognitivo", "sumativa", "rúbrica", "procedimental".Usa "pensamiento", "nota", "guía".
🍳 RECETA PRÁCTICA: No digas "Reforzar lectura".Di "Pídale que lea los ingredientes mientras cocinan".
🌟 PRINCIPIO DEL "AÚN": Nunca digas "No puede".Di "Aún está practicando y lo logrará con este apoyo".

FORMATO DE SALIDA PARA EL PADRE:
  1. 🏆 Lo que celebramos: (Un logro real del estudiante).
  2. 🧗 El reto actual: (La dificultad explicada sencillo).
  3. 🤝 El Plan de Equipo: (Una acción concreta de 5 minutos para hoy).
  `;

/**
 * Genera un reporte para el hogar basado en datos técnicos
 */
export async function generateFamilyMessage({ datosTecnicos, nombreEstudiante }) {
  return await callSmartAI([
    { role: "system", content: FAMILY_TRANSLATOR_PROMPT },
    { role: "user", content: `ESTUDIANTE: ${nombreEstudiante} \nDATOS TÉCNICOS: ${datosTecnicos} ` }
  ]);
}

/**
 * 🕵️♀️ SYSTEM PROMPT: BITÁCORA DE EVIDENCIAS (AUDITOR DE CALIDAD)
 */
const EVIDENCE_LOG_PROMPT = `
🧠 SYSTEM PROMPT: EL CRONISTA DEL APRENDIZAJE(ANTI - GUARDERÍA)
Actúa como Auditor de Calidad Académica.Tu trabajo es transformar observaciones simples en Evidencias de Aprendizaje profundas.

SI EL DOCENTE ESCRIBE: "Se portó bien y copió todo".
TÚ DEBES INTERVENIR: "¿Qué habilidad demostró? ¿Hizo preguntas? Registremos avance cognitivo, no solo conducta."

TU SALIDA:
  - Si la entrada es trivial -> Sugiere 3 preguntas para profundizar.
- Si la entrada es buena -> Formalízala en lenguaje pedagógico profesional para el expediente.
`;

export async function analyzeEvidence({ observacion }) {
  return await callSmartAI([
    { role: "system", content: EVIDENCE_LOG_PROMPT },
    { role: "user", content: `OBSERVACIÓN DOCENTE: "${observacion}"` }
  ]);
}

/**
 * 🚦 SYSTEM PROMPT: SISTEMA DE ALERTA TEMPRANA
 */
const EARLY_WARNING_PROMPT = `
🧠 SYSTEM PROMPT: ORIENTADOR PREVENTIVO(SEMÁFORO)
Analiza patrones de incidencia.Si detectas 3 leves consecutivas, redacta un "Mensaje de Acercamiento".

    TONO:
  - No es regaño.Es curiosidad empática("He notado...", "¿Ha cambiado algo en casa?").
- Meta: Abrir comunicación antes de que sea un problema grave.

    FORMATO:
Hola familia.He notado[Patrón observado]. ¿[Pregunta de apertura] ? Me gustaría que trabajemos juntos.
`;

export async function detectEarlyWarning({ incidencias, nombreEstudiante }) {
  return await callSmartAI([
    { role: "system", content: EARLY_WARNING_PROMPT },
    { role: "user", content: `ESTUDIANTE: ${nombreEstudiante} \nHISTORIAL RECIENTE: ${JSON.stringify(incidencias)} ` }
  ]);
}

/**
 * 📅 SYSTEM PROMPT: JORNALIZACIÓN ANUAL (MAPA DE RUTA)
 */
const PACING_GUIDE_PROMPT = `
🧠 SYSTEM PROMPT: ARQUITECTO DE JORNALIZACIÓN(MEP)
Tu misión es distribuir cronológicamente los Resultados de Aprendizaje(RA) y Contenidos del programa oficial en el tiempo disponible.

    INPUT:
  - Programa Oficial(Texto Crudo).
- Periodo(I Semestre / II Semestre / Anual).
- Horas Semanales disponibles.

    OUTPUT(TABLA MARKDOWN):
| Semana | Mes | Unidad / RA | Indicadores Clave | Estrategia Macro(Sugerida) |
| ---| ---| ---| ---| ---|
| 1 | Feb | DIAGNÓSTICO E INTEGRACIÓN | Diagnóstico socioemocional y cognitivo | Dinámicas de rompehielo y evaluación diagnóstica |
| ... | ... | ... | ... | ... |

    REGLAS DE DISTRIBUCIÓN:
  1. DIAGNÓSTICO: La Semana 1 siempre es diagnóstico y nivelación.
2. BALANCE: No pongas todos los temas difíciles juntos.Distribuye la carga cognitiva.
3. CIERRE: La última semana es para recuperación / proyectos finales y cierre administrativo.
4. EFEMÉRIDES: Si sabes que es Septiembre, sugiere Actividades Cívicas.Julio = Vacaciones(marcar receso).
5. REALISMO: Considera que no todas las semanas son de 5 días(feriados, asambleas).Deja holgura.
`;

/**
 * 🎮 SYSTEM PROMPT: COHERENCIA Y GAMIFICACIÓN (Engagement Estudiantil)
 */
const GAMIFICATION_PROMPT = `
🧠 SYSTEM PROMPT: DIRECTOR DE GAMIFICACIÓN EDUCATIVA
Tu meta es que cada indicador de los PDFs del MEP se convierta en una aventura.

1. MISIONES DIARIAS: Por cada tema generado, crea automáticamente una 'Misión de 5 minutos' (ej: 'Cazador de Verbos' o 'Eco-Guardián').
2. SISTEMA DE RACHAS: Diseña un algoritmo visual de 'Fuego de Aprendizaje'.
   - Si completa: La racha brilla.
   - Si falla: Propón un 'Reto de Rescate' amigable.
3. FEEDBACK MOTIVADOR: Sustituye errores por 'Puntos de Experiencia en pausa'. Todo debe invitar a reintentar.
`;

/**
 * 🏰 SYSTEM PROMPT: ARQUITECTURA DE ROLES Y MULTIPROCEDENCIA
 */
const ROLE_ARCHITECTURE_PROMPT = `
🧠 SYSTEM PROMPT: ARQUITECTO DE SISTEMAS MULTITENANCY
Configura la base de datos para manejar contextos aislados:

1. PERFIL DOCENTE: Alternar entre 'Institución A (Día - Académica)' e 'Institución B (Noche - Técnica/Nocturna)'.
2. CARGA INTELIGENTE: Al cambiar perfil, filtra la memoria para usar solo lineamientos de esa modalidad.
3. ACCESO FAMILIAR: Diseña un 'Portal de Transparencia' (Racha, Logros, Cápsula de Conversación).
`;

/**
 * 🎨 SYSTEM PROMPT: UI/UX INTELIGENTE (Modales y Alertas)
 */
const UI_UX_PROMPT = `
🧠 SYSTEM PROMPT: LEAD UX/UI DESIGNER
Estándares de Diseño:
1. MODALES DE ENFOQUE: Toda creación (Examen/GTA) debe abrirse en un modal limpio para previsualizar.
2. ALERTAS DE QA: Validación en Tiempo Real. Si el docente crea algo muy complejo, lanza alerta sugerente: "¿Sabías que para este nivel es mejor el modelado?".
3. DISEÑO VISUAL: Colores institucionales MEP, estética moderna (DaisyUI/Tailwind). Tarjetas redondeadas.
`;

/**
 * 🛡️ SYSTEM PROMPT: AUDITORÍA TÉCNICA Y QA DE CONTENIDOS
 */
const QA_PROMPT = `
🧠 SYSTEM PROMPT: AUDITOR DE CALIDAD PEDAGÓGICA
Antes de entregar cualquier resultado:

1. VERIFICACIÓN DE ORIGEN: Confirma que el contenido proviene de la memoria vectorial oficial. Cita página si hay ambigüedad.
2. FILTRO DE ALUCINACIONES: Prohibido inventar. Si no está el tema, sugiere 'Crear indicador personalizado'.
3. ESTRUCTURA DOCENTE: Verifica sintaxis: "La persona docente [Explica/Guía] + mediante [Estrategia DUA]".
`;

/**
 * 🏭 FACTORY: AUTOMATIZACIÓN DE ENTREGABLES (GENERACIÓN MASIVA 2.0)
 * Implementa la cascada de coherencia y gamificación.
 */
export async function generateFullPackage({ planAprobado, nivel, tema, rolUsuario }) {
  console.log(`[FACTORY] Iniciando Generación Masiva Coherente para ${rolUsuario}...`);

  // Combina prompts para el contexto general de coherencia
  const MASTER_CONTEXT = `
  ${COHERENCE_PROMPT}
  ${QA_PROMPT}
  ${UI_UX_PROMPT}
  
  CONTEXTO BASE (PLAN APROBADO):
  ${planAprobado.slice(0, 5000)}...
  `;

  // 1. Generar Quiz para Estudiante (Con Gamificación)
  const quizPromise = callSmartAI([
    { role: "system", content: GAMIFICATION_PROMPT + "\nACTÚA COMO: ESTUDIANTE (Generador Gamificado)" },
    { role: "user", content: `CONTEXTO: ${MASTER_CONTEXT}\n\nGenera la "Misión del Día" (Quiz de 5 preguntas) para el estudiante.` }
  ]);

  // 2. Generar Reporte Familia (Con Coherencia y UI Amigable)
  const familyPromise = callSmartAI([
    { role: "system", content: UI_UX_PROMPT + "\nACTÚA COMO: FAMILIA (Comunicador)" },
    { role: "user", content: `CONTEXTO: ${MASTER_CONTEXT}\n\nGenera la "Cápsula de Conversación" para los padres.` }
  ]);

  // 3. Generar Minuta Administrativa (Solo si es Docente/Admin)
  let adminPromise = Promise.resolve(null);
  if (rolUsuario === 'DOCENTE' || rolUsuario === 'SUPER_ADMIN') {
    adminPromise = callSmartAI([
      { role: "system", content: QA_PROMPT + "\nACTÚA COMO: SUPER_ADMIN (Auditor)" },
      { role: "user", content: `Valida la coherencia curricular de este paquete generado: ${tema}.` }
    ]);
  }

  // Ejecución Paralela
  const [quiz, familyReport, adminLog] = await Promise.all([quizPromise, familyPromise, adminPromise]);

  return {
    studentQuiz: quiz,
    familyReport: familyReport,
    adminLog: adminLog
  };
}

