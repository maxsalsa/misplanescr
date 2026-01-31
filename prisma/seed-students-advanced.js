const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const NAMES = ["Sofía", "Kevin", "Valentina", "Sebastián", "María José", "Alejandro", "Camila", "Gabriel", "Andrés", "Lucía", "Daniel", "Ximena", "Felipe", "Isabella", "Matías", "Valeria", "Diego", "Paula", "Samuel", "Elena"];
const SURNAMES = ["Vargas", "Jiménez", "Rojas", "Castro", "Gamboa", "Madrigal", "Araya", "Monge", "Solis", "Brenes", "Méndez", "Castillo", "Villalobos", "Quirós", "Gutiérrez"];

function getName() {
  return `${NAMES[Math.floor(Math.random()*NAMES.length)]} ${SURNAMES[Math.floor(Math.random()*SURNAMES.length)]} ${SURNAMES[Math.floor(Math.random()*SURNAMES.length)]}`;
}

// GENERADOR DE PERFILES COMPLEJOS (LÓGICA MEP)
function generateProfile() {
  const rand = Math.random();
  let profile = {};
  
  // 1. DETERMINAR TIPO DE ADECUACIÓN (DISTRIBUCIÓN 70/20/10)
  if (rand > 0.30) { 
    // 70% ACCESO (REGULAR O ALTA DOTACIÓN)
    const isHighPotential = Math.random() > 0.95; // 5% de ser Talento
    profile = {
      level: "ACCESO",
      category: isHighPotential ? "Alta Dotación / Talento" : "Regular",
      supports: isHighPotential ? ["Enriquecimiento Curricular", "Proyectos Avanzados"] : [],
      high_potential: isHighPotential
    };
  } else if (rand > 0.10) {
    // 20% NO SIGNIFICATIVA
    const types = [
      { cat: "TDAH / Déficit Atencional", sup: ["Recinto Aparte", "Tiempo Adicional", "Ubicación preferencial"] },
      { cat: "Baja Visión", sup: ["Ampliación de letra", "Uso de lupas"] },
      { cat: "Dificultad Específica Aprendizaje", sup: ["Uso de calculadora", "Lectura asistida"] }
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    profile = {
      level: "NO_SIGNIFICATIVA",
      category: type.cat,
      legal_basis: "Circular DVM-AC-003-2013",
      supports: type.sup,
      high_potential: false
    };
  } else {
    // 10% SIGNIFICATIVA
    profile = {
      level: "SIGNIFICATIVA",
      category: "Compromiso Cognitivo / Discapacidad Intelectual",
      legal_basis: "Programación Individual (PEI)",
      supports: ["Modificación de objetivos", "Pruebas diferenciadas", "Simplificación de textos"],
      high_potential: false
    };
  }

  // 2. GENERAR HISTORIAL ACADÉMICO SIMULADO
  // Si es Alta Dotación, promedio alto. Si es Significativa, variable.
  let baseAvg = 75;
  if (profile.high_potential) baseAvg = 95;
  if (profile.level === "SIGNIFICATIVA") baseAvg = 70;
  
  // Variación aleatoria +/- 15 pts
  const finalAvg = Math.min(100, Math.max(40, baseAvg + (Math.random() * 30 - 15)));
  const risk = finalAvg < 70;

  return {
    dua_profile: {
      level: profile.level,
      category: profile.category,
      legal_basis: profile.legal_basis,
      supports: profile.supports
    },
    academic_history: {
      weighted_average: parseFloat(finalAvg.toFixed(1)),
      risk_alert: risk
    },
    high_potential: profile.high_potential
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;

  // CREAR EL GRUPO 10-3 ESPECÍFICO
  const groupName = "10-3 (Técnico)";
  
  // Limpiar si ya existe para re-hacerlo bien
  const existingGroup = await prisma.group.findFirst({ where: { name: groupName } });
  if (existingGroup) {
     console.log("   ♻️ Re-generando grupo existente...");
     // (En producción no borramos así, pero para seed sí)
     await prisma.student.deleteMany({ where: { groupId: existingGroup.id } });
     await prisma.group.delete({ where: { id: existingGroup.id } });
  }

  const group = await prisma.group.create({
    data: { name: groupName, grade: "10mo", shift: "DIURNO", userId: admin.id }
  });

  console.log(`👥 INYECTANDO ESTUDIANTES EN ${groupName}...`);

  // GENERAR 25 ESTUDIANTES
  for (let i = 0; i < 25; i++) {
    const p = generateProfile();
    const name = getName();
    
    await prisma.student.create({
      data: {
        name: name,
        needs: p.dua_profile.category, // Mantenemos el resumen visual
        profile: p, // GUARDAMOS EL JSON COMPLETO "GOD TIER"
        groupId: group.id
      }
    });

    // Log para verificar la lógica en consola
    if (p.high_potential) console.log(`   🌟 TALENTO DETECTADO: ${name}`);
    else if (p.academic_history.risk_alert) console.log(`   ⚠️ ALERTA DE RIESGO: ${name} (Prom: ${p.academic_history.weighted_average})`);
    else if (p.dua_profile.level === "SIGNIFICATIVA") console.log(`   🛡️ ADECUACIÓN SIGN.: ${name}`);
  }

  console.log("✅ GRUPO 10-3 CARGADO CON LÓGICA 'HUMANITY 2.0'.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());