// RUTA: src/lib/antigravity_engine.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ANTIGRAVITY_KERNEL } from './prompts/kernel';

dotenv.config();

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });



export async function generateClassPlan(request) {
  console.log(`🚀 ANTIGRAVITY generación de plan (${request.planType})...`);

  // 1. OBTENER DATOS DE LA BASE DE DATOS
  // A. El Curso y los Estudiantes
  const course = await prisma.course.findUnique({
    where: { id: request.courseId },
    include: {
      students: { include: { student: true } } // Traemos los perfiles de los alumnos
    }
  });

  if (!course) throw new Error("Curso no encontrado");

  // B. Los Indicadores del MEP (Lo que minamos antes)
  const indicators = await prisma.indicator.findMany({
    where: { id: { in: request.indicatorIds } },
    include: { suggestedActivities: true, outcome: true } // Traemos contexto
  });

  if (indicators.length === 0) throw new Error("No se encontraron indicadores válidos");

  // 2. PREPARAR EL CONTEXTO PARA LA IA
  // Resumimos los perfiles de los estudiantes (Anonimizados para el prompt)
  const studentProfiles = course.students.map(e =>
    `- ${e.student.name}: ${e.student.learningProfile || "Sin requerimientos específicos"}`
  ).join("\n");

  const mepContext = indicators.map(i =>
    `INDICADOR: "${i.description}" (Resultado: ${i.outcome.description})`
  ).join("\n\n");

  // 3. EL PROMPT MAESTRO
  // 3. EL PROMPT MAESTRO (KERNEL V4.0 INJECTED)
  const prompt = `
    ${ANTIGRAVITY_KERNEL}

    CONTEXTO DE EJECUCIÓN:
    OBJETIVO: Diseñar un plan de "${request.planType}" realista y detallado.

    DATOS DEL CURSO:
    - Nombre: ${course.name}
    - Cantidad de estudiantes: ${course.students.length}
    
    PERFILES DE ESTUDIANTES (IMPORTANTE - DUA) Diseño Universal para el Aprendizaje considerando estos perfiles reales:
    ${studentProfiles}

    CONTENIDO CURRICULAR (MEP):
    ${mepContext}

    INSTRUCCIONES DE GENERACIÓN:
    1. ESTRATEGIA DE MEDIACIÓN:
       - Diseña una secuencia didáctica (Inicio, Desarrollo, Cierre).
       - IMPORTANTE explícitamente cómo apoyarás a los estudiantes con perfiles específicos mencionados arriba durante la actividad.
    
    2. RÚBRICA DE EVALUACIÓN (Escala 1-3):
       - Crea una tabla para evaluar los indicadores seleccionados.
       - Nivel 1 (Inicial) apoyo significativo.
       - Nivel 2 (Intermedio) proceso, con apoyos ocasionales.
       - Nivel 3 (Avanzado) el indicador autónomamente.

    FORMATO DE SALIDA (JSON Puro):
    {
      "title": "Título Creativo de la Lección",
      "content_markdown": "Aquí va todo el desarrollo de la clase en formato Markdown bonito...",
      "rubric": [
        { "criterio": "...", "nivel_1": "...", "nivel_2": "...", "nivel_3": "..." }
      ]
    }
  `;

  // 4. GENERAR CON GEMINI
  console.log("🧠 Consultando a Gemini...");
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  });

  const responseText = result.response.text();
  const jsonResponse = JSON.parse(responseText);

  // 5. GUARDAR EL PLAN GENERADO EN LA BASE DE DATOS
  const savedPlan = await prisma.pedagogicalPlan.create({
    data: {
      courseId: course.id,
      title: jsonResponse.title,
      type: request.planType,
      content: jsonResponse.content_markdown,
      rubric: JSON.stringify(jsonResponse.rubric)
    }
  });

  console.log("✅ ¡Plan Generado y Guardado!");
  return savedPlan;
}