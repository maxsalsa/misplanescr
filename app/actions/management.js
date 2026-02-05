"use server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// --- SCHEMAS (ZERO TRUST) ---

const SectionSchema = z.object({
  name: z.string().min(1, "El nombre de la sección es requerido (Ej: 10-1)"),
  level: z.string().min(1, "El nivel es requerido"),
  year: z.number().default(2026),
});

const StudentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  cedula: z.string().optional(),
  sectionId: z.string(),
  has7600: z.boolean().default(false),
  isGifted: z.boolean().default(false),
  medicalNotes: z.string().optional(),
});

const RequestSchema = z.object({
  type: z.string().min(1, "Seleccione un tipo"),
  description: z.string().min(5, "Justifique la solicitud"),
  dateStart: z.string().transform((str) => new Date(str)),
  dateEnd: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : null)),
});

// --- ACTIONS: SECTIONS ---

export async function createSection(prevState, formData) {
  try {
    const session = await auth();
    if (!session) return { error: "No autorizado" };

    const data = {
      name: formData.get("name"),
      level: formData.get("level"),
      year: parseInt(formData.get("year") || "2026"),
    };

    const validated = SectionSchema.parse(data);

    await prisma.section.create({
      data: {
        ...validated,
        teacherId: session.user.id,
      },
    });

    revalidatePath("/dashboard/groups");
    return { success: true, message: "Sección creada exitosamente." };
  } catch (e) {
    if (e instanceof z.ZodError) return { error: e.errors[0].message };
    if (e.code === "P2002")
      return { error: "Ya existe una sección con ese nombre." };
    return { error: "Error al crear sección." };
  }
}

export async function deleteSection(id) {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  // Verificar propiedad
  const section = await prisma.section.findUnique({ where: { id } });
  if (section.teacherId !== session.user.id)
    return { error: "Acceso denegado" };

  await prisma.section.delete({ where: { id } });
  revalidatePath("/dashboard/groups");
  return { success: true };
}

// --- ACTIONS: STUDENTS ---

export async function addStudent(prevState, formData) {
  try {
    const session = await auth();
    if (!session) return { error: "No autorizado" };

    const data = {
      name: formData.get("name"),
      cedula: formData.get("cedula"),
      sectionId: formData.get("sectionId"),
      has7600: formData.get("has7600") === "on",
      isGifted: formData.get("isGifted") === "on",
      medicalNotes: formData.get("medicalNotes"),
    };

    const validated = StudentSchema.parse(data);

    await prisma.student.create({ data: validated });
    revalidatePath(`/dashboard/groups/${data.sectionId}`);
    return { success: true, message: "Estudiante matriculado." };
  } catch (e) {
    console.error(e);
    return { error: "Error al matricular estudiante." };
  }
}

export async function toggleStudentFlag(studentId, field, value) {
  try {
    const session = await auth();
    if (!session) return { error: "User not found" };

    await prisma.student.update({
      where: { id: studentId },
      data: { [field]: value },
    });

    // Soft Revalidate via action return is handled by client or implicit
    revalidatePath("/dashboard/groups/[id]");
    return { success: true };
  } catch (e) {
    return { error: "Error updating flag" };
  }
}

export async function deleteStudent(studentId, sectionId) {
  try {
    await prisma.student.delete({ where: { id: studentId } });
    revalidatePath(`/dashboard/groups/${sectionId}`);
    return { success: true };
  } catch (e) {
    return { error: "Error deleting" };
  }
}

// --- ACTIONS: HR ---

export async function createHRRequest(prevState, formData) {
  try {
    const session = await auth();
    if (!session) return { error: "No autorizado" };

    const data = {
      type: formData.get("type"),
      description: formData.get("description"),
      dateStart: formData.get("dateStart"),
      dateEnd: formData.get("dateEnd"),
    };

    const validated = RequestSchema.parse(data);

    await prisma.administrativeRequest.create({
      data: {
        ...validated,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard/hr");
    return { success: true, message: "Solicitud enviada a Dirección." };
  } catch (e) {
    return { error: "Error al procesar solicitud." };
  }
}
