const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Limpieza
  await prisma.syllabus.deleteMany();
  await prisma.user.deleteMany();

  // 1. Crear Usuario Admin
  const pass = await hash("admin", 10);
  await prisma.user.create({
    data: { 
        email: "max@aulaplan.com", 
        name: "Lic. Max Salazar", 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP" 
    }
  });

  // 2. Crear Materias (Datos Reales)
  const datos = [
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Tecnologías", t: "RA1: Hardware" },
    { m: "TECNICA", l: "Décimo", s: "Contabilidad", u: "Gestión", t: "RA1: Cuentas" },
    { m: "TECNICA", l: "Décimo", s: "Turismo", u: "Geografía", t: "RA1: Zonas" },
    { m: "ACADEMICA", l: "Décimo", s: "Matemáticas", u: "Geometría", t: "AE1: Círculo" }
  ];

  await prisma.syllabus.createMany({
    data: datos.map(d => ({
        modalidad: d.m,
        level: d.l,
        subject: d.s,
        unit: d.u,
        topic: d.t,
        period: "I Periodo"
    }))
  });

  console.log("   ✅ Datos inyectados correctamente.");
}
main()
  .catch(e => console.error("Error en Seed:", e))
  .finally(() => prisma.$disconnect());