"use server";
import OpenAI from "openai";
import { PlanSchema } from "@/lib/schemas";
import { prisma } from "@/lib/db";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePlanAction(rawData) {
  try {
    // 1. VALIDACIÓN DE INTEGRIDAD (ZOD)
    const validated = PlanSchema.safeParse(rawData);
    if (!validated.success) {
      // Retornamos el error exacto para mostrarlo en UI
      return { success: false, error: validated.error.errors[0].message };
    }
    
    const { subject, grade, duration, topic, inclusionContext } = validated.data;
    
    // Lógica para sugerir proyectos en planes largos
    const suggestProject = duration.includes("Mensual") || duration.includes("Unidad");

    // 2. PROMPT DE INGENIERÍA (BINOMIO SAGRADO + EVALUACIÓN)
    const systemPrompt = `
      ROL: Asesor Pedagógico MEP (Costa Rica).
      TAREA: Generar Planeamiento Didáctico HTML (Tailwind CSS).
      
      ESTRUCTURA VISUAL OBLIGATORIA:
      <div class="space-y-6 font-sans text-slate-800">
        <div class="bg-slate-100 p-4 rounded-lg border-l-4 border-blue-600">
           <h2 class="font-black text-lg uppercase text-blue-900">${subject} - ${grade}</h2>
           <p class="text-sm text-slate-600">Duración: ${duration}</p>
        </div>

        <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
           <h3 class="font-bold text-slate-900 mb-4 border-b pb-2">II. Mediación Pedagógica</h3>
           <div class="space-y-4">
             <div class="bg-blue-50 p-4 rounded-lg">
               <span class="badge badge-primary badge-sm mb-2">Focalización</span>
               <p class="text-sm"><strong>El docente:</strong> Introduce... <br/><strong>El estudiante:</strong> Responde...</p>
             </div>
             <div class="bg-white border border-slate-200 p-4 rounded-lg">
               <span class="badge badge-ghost badge-sm mb-2">Exploración</span>
               <p class="text-sm"><strong>El docente:</strong> Facilita... <br/><strong>El estudiante:</strong> Analiza...</p>
             </div>
           </div>
        </div>

        <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
           <h3 class="font-bold text-slate-900 mb-4 border-b pb-2">III. Evaluación</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="alert alert-success bg-emerald-50 border-emerald-200">
                 <div>
                   <h4 class="font-bold text-emerald-800 text-xs uppercase">Trabajo Cotidiano</h4>
                   <ul class="list-disc list-inside text-xs mt-1"><li>Participación activa</li><li>Resolución de guía</li></ul>
                 </div>
              </div>
              <div class="alert alert-info bg-blue-50 border-blue-200">
                 <div>
                   <h4 class="font-bold text-blue-800 text-xs uppercase">Tarea Corta</h4>
                   <p class="text-xs mt-1">Investigación sobre ${topic}...</p>
                 </div>
              </div>
           </div>
           ${suggestProject ? `
           <div class="mt-4 alert alert-warning bg-amber-50 border-amber-200">
             <div><h4 class="font-bold text-amber-800 text-xs uppercase">Proyecto</h4><p class="text-xs">Desarrollo de maqueta/exposición.</p></div>
           </div>` : ""}
        </div>

        ${inclusionContext ? `
        <div class="bg-orange-50 p-4 rounded-xl border border-orange-200">
           <h3 class="font-bold text-orange-800 text-sm mb-2">IV. Adecuaciones (Ley 7600)</h3>
           <p class="text-xs text-orange-900">Contexto: ${inclusionContext}</p>
           <p class="text-xs mt-1">- Tiempo adicional en ejecución.<br/>- Ubicación preferencial.</p>
        </div>` : ""}
      </div>
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "gpt-4o",
      temperature: 0.7,
    });
    
    // 3. RETORNO SEGURO
    return { success: true, html: completion.choices[0].message.content };

  } catch (error) {
    console.error("Error Server Action:", error);
    return { success: false, error: "Fallo en el núcleo de IA. Intente de nuevo." };
  }
}