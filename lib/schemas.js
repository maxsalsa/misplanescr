import { z } from "zod";

export const PlanSchema = z.object({
  modality: z.string().min(1, "Seleccione la modalidad"),
  subject: z.string().min(2, "Escriba la Asignatura o Subárea"),
  grade: z.string().min(1, "El nivel/grupo es requerido"),
  unit: z.string().min(1, "Indique la Unidad de Estudio"),
  duration: z.string(),
  topic: z.string().min(10, "Detalle los indicadores o habilidades"),
  inclusionContext: z.string().optional(),
  includeProject: z.boolean().optional(),
  includeTest: z.boolean().optional()
});

// ESQUEMAS DE VALIDACIÓN (SHIELD OF ZOD)

// A. Esquema de Criterio Individual (Evaluación)
export const criterionSchema = z.object({
  text: z.string().min(5, "El nombre del criterio debe ser descriptivo (min 5 letras)"),
  points: z.number()
    .min(1, "Los puntos no pueden ser negativos ni cero")
    .max(100, "Un solo criterio no puede valer más de 100")
});

// B. Esquema de Prueba Escrita Completa (Matemática Legal)
export const writtenTestSchema = z.object({
  criteria: z.array(criterionSchema).min(1, "Debe agregar al menos un criterio"),
  totalPoints: z.number().max(100, "La suma total no puede exceder el 100%").refine(val => val > 0, {
    message: "El instrumento debe tener puntaje"
  })
});

// C. Esquema de RRHH (Legalidad Administrativa)
export const hrRequestSchema = z.object({
  type: z.enum(["LATE", "EARLY", "ABSENCE", "LICENSE"], {
    errorMap: () => ({ message: "Seleccione un tipo de trámite válido" })
  }),
  date: z.string().date("Fecha inválida"),
  minutes: z.number().optional(), // Para llegadas tardías
  justification: z.string().min(10, "La justificación debe ser detallada (min 10 chars)"),
  evidenceUrl: z.string().optional()
}).refine(data => {
  // Si es enfermedad (ABSENCE) o Licencia, evidenceUrl es obligatorio
  if ((data.type === "ABSENCE" || data.type === "LICENSE") && !data.evidenceUrl) {
    return false;
  }
  return true;
}, {
  message: "Para Ausencias o Licencias, el comprobante digital es OBLIGATORIO.",
  path: ["evidenceUrl"]
});