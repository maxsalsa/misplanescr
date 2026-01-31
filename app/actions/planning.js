"use server";
import { prisma } from "@/lib/db";

// Acción para obtener los grupos del docente
export async function getTeacherGroups() {
  try {
    // Buscamos al usuario maestro (Max Salazar)
    // En producción esto usará la sesión real del usuario logueado
    const user = await prisma.user.findUnique({
      where: { email: "max.salazar@mep.go.cr" },
      include: { 
        students: true // Traemos estudiantes para inferir grupos
      }
    });

    if (!user) return [];

    // Lógica para extraer grupos únicos de la lista de estudiantes
    // Ej: Si hay 5 estudiantes de la 10-1, solo devolvemos "10-1" una vez.
    const uniqueSections = [...new Set(user.students.map(s => s.section))];
    
    // Mapeamos a objetos con banderas de inclusión
    const groups = uniqueSections.map(section => {
      const studentsInGroup = user.students.filter(s => s.section === section);
      return {
        name: section,
        has7600: studentsInGroup.some(s => s.has7600),
        isGifted: studentsInGroup.some(s => s.isGifted)
      };
    });

    return groups;

  } catch (error) {
    console.error("Error obteniendo grupos:", error);
    return []; // Retornamos array vacío para no romper la UI
  }
}