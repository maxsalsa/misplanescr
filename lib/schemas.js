import { z } from "zod";

// REGLAS DE INTEGRIDAD (SCHEMA)
export const PlanSchema = z.object({
  subject: z.string().min(1, "Debe seleccionar una asignatura"),
  grade: z.string().min(1, "El grupo es requerido"),
  duration: z.string(),
  // Validamos que el tema tenga carnita pedagógica (mínimo 10 letras)
  topic: z.string().min(10, "El tema debe ser descriptivo (mín. 10 caracteres)"),
  inclusionContext: z.string().optional()
});