import { auth } from "@/auth"; // Asumiendo NextAuth V5
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

/**
 * 1. OBTENER USUARIO SEGURO
 * Lanza error si no hay sesión. Útil para Server Actions.
 */
export async function getSessionUser() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("⛔ ACCESO DENEGADO: No se detecta sesión activa.");
  }
  return session.user;
}

/**
 * 2. VERIFICAR PROPIEDAD (ZERO TRUST)
 * Verifica si un recurso (Plan, Estudiante) pertenece al usuario actual.
 * @param {string} resourceTable - Nombre de la tabla (ej: 'student')
 * @param {string} resourceId - ID del registro
 * @param {string} userId - ID del usuario actual
 */
export async function verifyOwnership(resourceTable, resourceId, userId) {
  // Nota: Esto es un helper genérico. En producción se ajusta según la tabla.
  // Aquí prevenimos que un SuperAdmin "vea por error" datos ajenos.
  
  if (!userId) throw new Error("ID de usuario inválido");

  // Consulta dinámica segura
  const record = await prisma[resourceTable].findUnique({
    where: { id: resourceId },
    select: { teacherId: true, userId: true } // Buscamos quién es el dueño
  });

  if (!record) throw new Error("Recurso no encontrado.");

  // Normalizamos el campo de dueño (algunas tablas usan teacherId, otras userId)
  const ownerId = record.teacherId || record.userId;

  if (ownerId !== userId) {
    console.error(`🚨 ALERTA DE SEGURIDAD: Usuario ${userId} intentó acceder a recurso ${resourceId} de ${ownerId}`);
    throw new Error("⛔ VIOLACIÓN DE PRIVACIDAD: Este recurso no te pertenece.");
  }

  return true; // Acceso concedido
}