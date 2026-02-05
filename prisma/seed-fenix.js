const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // 1. USUARIO ADMIN
  const pass = await hash("admin", 10);
  await prisma.user.create({
    data: { email: "max@aulaplan.com", name: "Lic. Max Salazar", password: pass, role: "ADMIN", subscriptionStatus: "VIP" }
  });

  // 2. DATOS ESTRUCTURADOS (SOLUCIÓN AL PROBLEMA DE SUBÁREAS)
  // En Prisma usamos "Subject" como el contenedor mayor (Especialidad) 
  // y "Unit" como la Subárea o Unidad real, dependiendo del contexto.
  
  const datos = [
    // --- ACADÉMICA (Simple: Materia -> Unidad) ---
    { m: "ACADEMICA", l: "Undécimo", s: "Español", u: "Literatura Costarricense", t: "Análisis de 'Mamita Yunai'" },
    { m: "ACADEMICA", l: "Undécimo", s: "Matemáticas", u: "Estadística", t: "Medidas de posición" },
    
    // --- TÉCNICA (Compleja: Especialidad -> Subárea -> Unidad) ---
    // Aquí el truco: En el campo SUBJECT guardamos "Especialidad - Subárea" para que el filtro funcione fácil
    
    // DESARROLLO DE SOFTWARE (12)
    { m: "TECNICA", l: "Duodécimo", s: "Software - Programación", u: "Apps Móviles", t: "Desarrollo en React Native" },
    { m: "TECNICA", l: "Duodécimo", s: "Software - Gestión BD", u: "NoSQL", t: "MongoDB y Firebase" },
    { m: "TECNICA", l: "Duodécimo", s: "Software - Emprendimiento", u: "Plan de Negocios", t: "Modelo Canvas" },

    // CIBERSEGURIDAD (11)
    { m: "TECNICA", l: "Undécimo", s: "Ciberseguridad - Hacking", u: "Pentesting", t: "Uso de Kali Linux" },
    { m: "TECNICA", l: "Undécimo", s: "Ciberseguridad - Forense", u: "Análisis Digital", t: "Recuperación de datos" },
    
    // --- PREESCOLAR ---
    { m: "PREESCOLAR", l: "Materno", s: "Socio-Afectiva", u: "Identidad", t: "Yo soy único" },
    { m: "PREESCOLAR", l: "Transición", s: "Lectoescritura", u: "Conciencia Fonológica", t: "Sonidos iniciales" }
  ];

  await prisma.syllabus.createMany({
    data: datos.map(d => ({
        modalidad: d.m,
        level: d.l,
        subject: d.s, // Ahora contiene la Subárea explícita en Técnicas
        unit: d.u,
        topic: d.t,
        period: "I Periodo"
    }))
  });
  
  console.log("   ✅ Jerarquía MEP reconstruida.");
}
main().finally(() => prisma.$disconnect());