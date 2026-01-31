const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// BANCO DE INSTITUCIONES REPRESENTATIVAS
const INSTITUTIONS = [
  { name: "CTP Don Bosco (Simulado)", type: "CTP", region: "San José Norte", sections: ["10-1 (Software)", "11-2 (Mecánica)", "12-1 (Ciber)"] },
  { name: "Liceo Rural Jakira (Talamanca)", type: "RURAL", region: "Sulá", sections: ["7-1", "8-1", "9-1"] },
  { name: "Escuela Unidocente El Roble", type: "UNIDOCENTE", region: "San Carlos", sections: ["Grupo Multinivel (1º-6º)"] },
  { name: "CINDEA La República", type: "CINDEA", region: "Alajuela", sections: ["2P-1 (Módulo 56)", "3P-2 (Módulo 78)"] },
  { name: "Centro de Enseñanza Especial", type: "ESPECIAL", region: "Heredia", sections: ["Ciclo III (Prevocacional)", "Estimulación Temprana"] },
  { name: "Liceo de Costa Rica", type: "LICEO", region: "San José Central", sections: ["7-15", "10-4", "11-1"] },
  { name: "Escuela Buenaventura Corrales", type: "ESCUELA", region: "San José Norte", sections: ["1-3", "3-2", "6-1"] }
];

// NOMBRES CONTEXTUALIZADOS
const NAMES_GENERIC = ["Valentina", "Sebastián", "Sofía", "Mateo", "Gabriel"];
const SURNAMES_GENERIC = ["Vargas", "Mora", "Rojas", "Jiménez"];

// NOMBRES ZONA INDÍGENA (Simulados respetuosamente)
const NAMES_INDIGENOUS = ["Yuliana", "Kabek", "Sibö", "Itzel", "David"];
const SURNAMES_INDIGENOUS = ["Buitrago", "Mayorga", "Salazar", "Méndez"]; 

function generateStudent(type) {
  let name = "";
  let profile = {};

  if (type === "RURAL") {
     const n = NAMES_INDIGENOUS[Math.floor(Math.random() * NAMES_INDIGENOUS.length)];
     const s = SURNAMES_INDIGENOUS[Math.floor(Math.random() * SURNAMES_INDIGENOUS.length)];
     name = `${n} ${s}`;
     // Contexto rural: Apoyos de transporte o beca
     profile = { dua: "ACCESO", context: "Beca Avancemos / Transporte Estudiantil" };
  } else if (type === "ESPECIAL") {
     const n = NAMES_GENERIC[Math.floor(Math.random() * NAMES_GENERIC.length)];
     const s = SURNAMES_GENERIC[Math.floor(Math.random() * SURNAMES_GENERIC.length)];
     name = `${n} ${s}`;
     // Perfiles de alto apoyo
     profile = { dua: "SIGNIFICATIVA", supports: ["Asistente de aula", "Silla de ruedas", "Tablero de comunicación"] };
  } else {
     const n = NAMES_GENERIC[Math.floor(Math.random() * NAMES_GENERIC.length)];
     const s = SURNAMES_GENERIC[Math.floor(Math.random() * SURNAMES_GENERIC.length)];
     name = `${n} ${s}`;
     // Perfil estándar con variabilidad
     profile = { dua: Math.random() > 0.8 ? "NO_SIGNIFICATIVA" : "ACCESO" };
  }

  return { name, profile };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;

  console.log("🇨🇷 DESPLEGANDO SISTEMA NACIONAL...");

  for (const instData of INSTITUTIONS) {
    // 1. CREAR INSTITUCIÓN
    const inst = await prisma.institution.create({
      data: {
        name: instData.name,
        type: instData.type,
        region: instData.region,
        code: "DEP-" + Math.floor(Math.random() * 9000 + 1000)
      }
    });

    console.log(`   🏛️ Institución Fundada: ${instData.name} [${instData.type}]`);

    // 2. CREAR GRUPOS PARA ESA INSTITUCIÓN
    for (const sectName of instData.sections) {
      const group = await prisma.group.create({
        data: {
          name: sectName,
          grade: "GENERIC", // Simplificado para el seed
          shift: instData.type === "CINDEA" ? "NOCTURNO" : "DIURNO",
          userId: admin.id,
          institutionId: inst.id
        }
      });

      // 3. LLENAR EL AULA (15 estudiantes por grupo para no saturar)
      for (let i = 0; i < 15; i++) {
        const studentData = generateStudent(instData.type);
        
        await prisma.student.create({
          data: {
            name: studentData.name,
            needs: studentData.profile.dua, // Legacy field
            profile: { // Advanced field
                dua_level: studentData.profile.dua,
                context_notes: studentData.profile.context || "Sin observaciones",
                supports: studentData.profile.supports || []
            },
            groupId: group.id
          }
        });
      }
    }
  }

  console.log("✅ MAPA EDUCATIVO COMPLETO. TODAS LAS MODALIDADES CUBIERTAS.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());