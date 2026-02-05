import { z } from "zod";

// 🛡️ ESQUEMA MAESTRO: CERO DATOS CORRUPTOS
// Este archivo define qué es un "Plan Perfecto". Si algo no cumple, se rechaza.

export const LessonPlanSchema = z.object({
  title: z.string().min(5, "El título debe ser descriptivo (min 5 letras)"),
  subject: z.enum(
    [
      "Matemáticas",
      "Español",
      "Ciencias",
      "Estudios Sociales",
      "Inglés",
      "Ciberseguridad",
      "Turismo",
      "Contabilidad",
      "Ejecutivo",
      "Agropecuaria",
      "Artes Industriales",
      "Educación Física",
      "Religión",
      "Hogar",
      "Música",
      "Artes Plásticas",
      "Informática Educativa",
      "Orientación",
    ],
    { required_error: "Debe seleccionar una materia oficial del MEP" },
  ),

  level: z
    .string()
    .regex(/^(7mo|8vo|9no|10mo|11mo|12mo|Primaria)$/, "Nivel inválido"),

  content: z.object({
    curriculum: z.object({
      unit: z.string().min(1, "La unidad es obligatoria"),
      outcome: z
        .string()
        .min(10, "El resultado de aprendizaje debe ser detallado"),
    }),
    mediation: z
      .array(
        z.object({
          moment: z.enum([
            "1. CONEXIÓN",
            "2. COLABORACIÓN",
            "3. CONSTRUCCIÓN",
            "4. CLARIFICACIÓN",
          ]),
          activity: z.string().min(10, "La actividad debe ser sustancial"),
          dua_principle: z.string().optional(),
        }),
      )
      .min(4, "Debe incluir los 4 momentos de la Educación Combinada"),

    evaluation_system: z
      .object({
        written_test: z
          .object({
            total_points: z
              .number()
              .min(1, "La prueba no puede valer 0 puntos"),
            spec_table: z
              .array(
                z.object({
                  obj: z.string(),
                  points: z.number(),
                }),
              )
              .refine(
                (items) => {
                  // VALIDACIÓN DE COHERENCIA MATEMÁTICA
                  const total = items.reduce(
                    (acc, curr) => acc + curr.points,
                    0,
                  );
                  return total > 0;
                },
                {
                  message:
                    "La tabla de especificaciones debe sumar puntos positivos",
                },
              ),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const GroupSchema = z.object({
  name: z.string().min(3, "Nombre de grupo muy corto (Ej: 10-1)"),
  grade: z.string(),
  shift: z.enum(["DIURNO", "NOCTURNO", "MIXTO"]),
});
