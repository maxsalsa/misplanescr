import { z } from "zod";

// VALIDACIÓN DE INTEGRIDAD PEDAGÓGICA (ZOD)
export const ActividadSchema = z.object({
  fase: z.enum(["Inicio", "Desarrollo", "Cierre"]),
  tiempo: z.number().min(5),
  accionDocente: z.string().refine(val => val.startsWith("La persona docente"), {
    message: "Error Normativo: Debe iniciar con 'La persona docente'"
  }),
  accionEstudiante: z.string().refine(val => val.startsWith("La persona estudiante"), {
    message: "Error Normativo: Debe iniciar con 'La persona estudiante'"
  }),
  estrategia: z.string().min(3)
});