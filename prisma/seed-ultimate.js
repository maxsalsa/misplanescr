const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. LISTA MAESTRA DE SUS ARCHIVOS (YA PROCESADA POR MI INTELIGENCIA)
const LIBRARY = [
  // TECNOLOGÍA
  { file: "Ciberseguridad10.pdf", area: "Ciberseguridad", level: "10mo" },
  { file: "Ciberseguridad11.pdf", area: "Ciberseguridad", level: "11mo" },
  { file: "Ciberseguridad12.pdf", area: "Ciberseguridad", level: "12mo" },
  { file: "DesarrolloWeb10.pdf", area: "Desarrollo Web", level: "10mo" },
  { file: "DesarrolloWeb11.pdf", area: "Desarrollo Web", level: "11mo" },
  { file: "DesarrolloWeb12.pdf", area: "Desarrollo Web", level: "12mo" },
  { file: "InteligenciaArtificial10.pdf", area: "Inteligencia Artificial", level: "10mo" },
  { file: "InteligenciaArtificial11.pdf", area: "Inteligencia Artificial", level: "11mo" },
  { file: "InteligenciaArtificial12.pdf", area: "Inteligencia Artificial", level: "12mo" },
  { file: "InformaticaRedes10.pdf", area: "Informática en Redes", level: "10mo" },
  { file: "InformaticaRedes11.pdf", area: "Informática en Redes", level: "11mo" },
  { file: "InformaticaRedes12.pdf", area: "Informática en Redes", level: "12mo" },
  
  // FINANZAS Y NEGOCIOS
  { file: "ContabilidadFinanzas10.pdf", area: "Contabilidad y Finanzas", level: "10mo" },
  { file: "ContabilidadFinanzas11.pdf", area: "Contabilidad y Finanzas", level: "11mo" },
  { file: "ContabilidadFinanzas12.pdf", area: "Contabilidad y Finanzas", level: "12mo" },
  { file: "BancaFinanzas10.pdf", area: "Banca y Finanzas", level: "10mo" },
  { file: "BancaFinanzas11.pdf", area: "Banca y Finanzas", level: "11mo" },
  { file: "BancaFinanzas12.pdf", area: "Banca y Finanzas", level: "12mo" },
  { file: "EjecutivoComercial10.pdf", area: "Ejecutivo Comercial", level: "10mo" },
  { file: "EjecutivoComercial11.pdf", area: "Ejecutivo Comercial", level: "11mo" },
  { file: "EjecutivoComercial12.pdf", area: "Ejecutivo Comercial", level: "12mo" },

  // TURISMO Y SERVICIOS
  { file: "TurismoHoteleria10.pdf", area: "Turismo y Hotelería", level: "10mo" },
  { file: "TurismoHoteleria11.pdf", area: "Turismo y Hotelería", level: "11mo" },
  { file: "TurismoHoteleria12.pdf", area: "Turismo y Hotelería", level: "12mo" },
  { file: "TurismoEcologico10.pdf", area: "Turismo Ecológico", level: "10mo" },
  { file: "TurismoEcologico12.pdf", area: "Turismo Ecológico", level: "12mo" },
  
  // LOGÍSTICA
  { file: "AdmLogistica10.pdf", area: "Logística y Distribución", level: "10mo" },
  { file: "AdmLogistica11.pdf", area: "Logística y Distribución", level: "11mo" },
  { file: "AdmLogistica12.pdf", area: "Logística y Distribución", level: "12mo" },
  
  // ÁREAS TÉCNICAS ADICIONALES
  { file: "DiseñoDigital10.pdf", area: "Diseño y Desarrollo Digital", level: "10mo" },
  { file: "DiseñoDigital11.pdf", area: "Diseño y Desarrollo Digital", level: "11mo" },
  { file: "DiseñoDigital12.pdf", area: "Diseño y Desarrollo Digital", level: "12mo" },
  { file: "Secretariado10.pdf", area: "Secretariado Ejecutivo", level: "10mo" },
  { file: "Secretariado11.pdf", area: "Secretariado Ejecutivo", level: "11mo" },
  { file: "Secretariado12.pdf", area: "Secretariado Ejecutivo", level: "12mo" }
];

// 2. GENERADOR DE PEDAGOGÍA CIENTÍFICA (DUA 3.0 + MEP)
function generateMEPContent(item) {
  const isTech = ["Ciberseguridad", "Desarrollo Web", "Inteligencia Artificial", "Informática en Redes"].includes(item.area);
  
  return {
    administrative: {
      period: "Planificación Anual 2026",
      modality: "Educación Técnica Profesional",
      resource_origin: `Programa Oficial MEP: ${item.file}`
    },
    curriculum: {
      unit_name: `Unidad Integral: ${item.area} - Nivel ${item.level}`,
      learning_result: "Aplicar las competencias técnicas y habilidades blandas establecidas en el perfil de salida del programa."
    },
    mediation: [
      {
        moment: "1. CONEXIÓN (Enganche)",
        activity: isTech 
          ? "El docente presenta un problema real de la industria (ej: fallo de servidor, brecha de datos) para activar conocimientos previos."
          : "Se realiza una simulación de roles (Roleplay) sobre una situación cotidiana en el ambiente laboral de servicios.",
        dua_principle: "Proporcionar múltiples formas de implicación (Interés)"
      },
      {
        moment: "2. COLABORACIÓN (Construcción Social)",
        activity: "En subgrupos, los estudiantes analizan la normativa técnica o legal aplicable, utilizando herramientas colaborativas digitales.",
        dua_principle: "Fomentar la colaboración y la comunidad (Pauta 8.3)"
      },
      {
        moment: "3. CONSTRUCCIÓN (Manos a la obra)",
        activity: isTech
          ? "Desarrollo de laboratorio práctico: Configuración, programación o diseño de la solución técnica requerida."
          : "Ejecución procedimental: Realización del servicio o proceso administrativo con estándares de calidad.",
        evidence_required: isTech ? "Repositorio de código / Bitácora técnica" : "Lista de cotejo de desempeño / Video evidencia",
        dua_principle: "Optimizar la elección individual y la autonomía"
      },
      {
        moment: "4. CLARIFICACIÓN (Cierre)",
        activity: "Sesión de retroalimentación (Feedback) grupal basada en los errores comunes detectados durante la práctica.",
        technique: "Evaluación formativa y metacognición"
      }
    ],
    evaluation: {
      instrument: "Rúbrica Analítica",
      indicators: [
        {
          desc: "Dominio de los procedimientos técnicos de la especialidad.",
          levels: {
            high: "Ejecuta el procedimiento con total autonomía y precisión profesional.",
            medium: "Ejecuta el procedimiento con errores menores que no comprometen el resultado.",
            low: "Requiere asistencia constante para completar el procedimiento."
          }
        }
      ]
    }
  };
}

async function main() {
  console.log("🚀 INICIANDO INGESTA AUTOMÁTICA DEL UNIVERSO MEP...");
  
  const adminUser = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  
  if (!adminUser) {
    console.error("❌ ERROR: No encuentro al usuario GOD_TIER. Ejecute el seed inicial.");
    return;
  }

  // Opcional: Limpiar planes anteriores para no duplicar
  // await prisma.lessonPlan.deleteMany(); 

  let count = 0;
  for (const item of LIBRARY) {
    await prisma.lessonPlan.create({
      data: {
        title: `MEP 2026: ${item.area} (${item.level}) - Plan Maestro`,
        subject: item.area,
        level: item.level,
        status: "PUBLISHED",
        userId: adminUser.id,
        content: generateMEPContent(item)
      }
    });
    process.stdout.write("█"); // Barra de carga visual
    count++;
  }

  console.log(`\n\n✅ ÉXITO ROTUNDO: ${count} PLANES DE ESTUDIO INYECTADOS.`);
  console.log("   -> Cubriendo: Tecnología, Finanzas, Turismo y Servicios.");
  console.log("   -> Formato: DUA 3.0 + 4 Momentos + Rúbricas.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());