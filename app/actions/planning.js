"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth"; // Ajustar según tu config de Auth

export async function getTeacherGroups() {
  // En producción usaríamos: const session = await auth();
  // Por ahora simulamos al usuario maestro para que funcione la demo
  const user = await prisma.user.findUnique({
    where: { email: "max.salazar@mep.go.cr" },
    include: { students: true }
  });

  if (!user) return [];

  // Extraer secciones únicas y detectar banderas
  const groups = {};
  user.students.forEach(s => {
    if (!groups[s.section]) {
      groups[s.section] = { name: s.section, count: 0, has7600: false, isGifted: false };
    }
    groups[s.section].count++;
    if (s.has7600) groups[s.section].has7600 = true;
    if (s.isGifted) groups[s.section].isGifted = true;
  });

  return Object.values(groups);
}