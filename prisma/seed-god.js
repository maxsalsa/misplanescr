const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DATA = [
  // --- PREESCOLAR ---
  { modalidad: "PREESCOLAR", subject: "Ciclo Materno", level: "Materno", unit: "Conocimiento de sí mismo", topic: "Reconocimiento del esquema corporal" },
  { modalidad: "PREESCOLAR", subject: "Ciclo Transición", level: "Transición", unit: "Interacción Social", topic: "Normas de convivencia y cortesía" },

  // --- PRIMARIA ---
  { modalidad: "ACADEMICA", subject: "Matemáticas", level: "Primero", unit: "Números", topic: "Conteo y escritura de números del 0 al 100" },
  { modalidad: "ACADEMICA", subject: "Ciencias", level: "Tercero", unit: "Cuerpo Humano", topic: "Sistemas del cuerpo humano: Digestivo y Respiratorio" },
  { modalidad: "ACADEMICA", subject: "Español", level: "Sexto", unit: "Expresión Escrita", topic: "Redacción de textos narrativos y expositivos" },

  // --- SECUNDARIA (ACADÉMICA) ---
  { modalidad: "ACADEMICA", subject: "Matemáticas", level: "Sétimo", unit: "Números Enteros", topic: "Operaciones combinadas con números enteros" },
  { modalidad: "ACADEMICA", subject: "Matemáticas", level: "Octavo", unit: "Geometría", topic: "Homotecias y transformaciones en el plano" },
  { modalidad: "ACADEMICA", subject: "Matemáticas", level: "Noveno", unit: "Álgebra", topic: "Factorización de polinomios" },
  { modalidad: "ACADEMICA", subject: "Estudios Sociales", level: "Sétimo", unit: "Geografía", topic: "Dinámica terrestre y zonas climáticas" },
  { modalidad: "ACADEMICA", subject: "Estudios Sociales", level: "Noveno", unit: "Historia", topic: "La Guerra Fría y su impacto en América Latina" },
  { modalidad: "ACADEMICA", subject: "Ciencias", level: "Octavo", unit: "Materia y Energía", topic: "Tabla Periódica y elementos químicos" },
  { modalidad: "ACADEMICA", subject: "Biología", level: "Décimo", unit: "Genética", topic: "Leyes de Mendel y herencia" },

  // --- TÉCNICA (CTP - MUESTRA) ---
  { modalidad: "TECNICA", subject: "Ejecutivo Comercial", level: "Décimo", unit: "Gestión Empresarial", topic: "Trámites de inscripción de empresas en CR" },
  { modalidad: "TECNICA", subject: "Turismo", level: "Undécimo", unit: "Patrimonio", topic: "Áreas de Conservación y Parques Nacionales" },
  { modalidad: "TECNICA", subject: "Informática Empresarial", level: "Décimo", unit: "Programación", topic: "Lógica de algoritmos y diagramas de flujo" },
  { modalidad: "TECNICA", subject: "Contabilidad", level: "Duodécimo", unit: "Costos", topic: "Estado de Costos de Producción y Ventas" },
  { modalidad: "TECNICA", subject: "Mecánica de Precisión", level: "Décimo", unit: "Metrología", topic: "Uso del Calibrador Pie de Rey y Micrómetro" }
];

async function main() {
  console.log("📚 Actualizando Biblioteca del MEP...");
  
  // Borrar anterior para evitar duplicados en dev
  await prisma.syllabus.deleteMany({});

  // Crear usuario ADMIN
  const { hash } = require("bcryptjs");
  const pass = await hash("admin", 10);
  await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: { role: "ADMIN", subscriptionStatus: "VIP" },
    create: { email: "max@aulaplan.com", name: "Lic. Max Salazar (CEO)", password: pass, role: "ADMIN", subscriptionStatus: "VIP" }
  });

  // Insertar Currículo
  await prisma.syllabus.createMany({ data: DATA });
  console.log(`✅ ${DATA.length} Temas Oficiales cargados.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });