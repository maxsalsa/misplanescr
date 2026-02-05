const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // 1. Docente Admin
  const pass = await hash("admin", 10);
  const user = await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: {},
    create: { email: "max@aulaplan.com", name: "Lic. Max Salazar", password: pass, role: "ADMIN" }
  });

  // 2. Crear un Grupo Típico (11-2)
  // Borramos primero para no duplicar en pruebas
  await prisma.incidencia.deleteMany({});
  await prisma.estudiante.deleteMany({});
  await prisma.grupo.deleteMany({});

  const grupo = await prisma.grupo.create({
    data: {
      nombre: "11-2 (Técnico)",
      nivel: "Undécimo",
      docenteId: user.id,
      estudiantes: {
        create: [
          { nombre: "Sebastián", apellidos: "Mora Rojas", tipoAdecuacion: "NINGUNA" },
          { nombre: "Valentina", apellidos: "Calvo Solís", tipoAdecuacion: "NS", condicion: "TDAH", notasImportantes: "Requiere tiempo adicional en pruebas." },
          { nombre: "Andrés", apellidos: "Gómez Ruiz", tipoAdecuacion: "ACCESO", condicion: "Baja Visión", notasImportantes: "Material en letra 14pts o superior." },
          { nombre: "Lucía", apellidos: "Vargas Mena", tipoAdecuacion: "NINGUNA", condicion: "Alta Dotación", notasImportantes: "Requiere retos extra (Ampliación curricular)." },
          { nombre: "Diego", apellidos: "Sánchez P.", tipoAdecuacion: "SIG", condicion: "Cognitiva", notasImportantes: "Objetivos de 8vo año en Matemáticas." }
        ]
      }
    }
  });

  // 3. Crear una Boleta de ejemplo
  const estudiante = await prisma.estudiante.findFirst({ where: { nombre: "Sebastián" } });
  await prisma.incidencia.create({
    data: {
      tipoFalta: "LEVE",
      articuloREA: "Uso no autorizado de celular",
      descripcion: "Utiliza dispositivo móvil durante explicación magistral.",
      accionTomada: "Amonestación Verbal y nota en cuaderno.",
      estudianteId: estudiante.id,
      reportadoPorId: user.id
    }
  });

  console.log("✅ Datos de prueba MEP cargados (Grupo 11-2 con Inclusión).");
}
main().finally(() => prisma.$disconnect());