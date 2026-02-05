const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. EL GRAN CATÁLOGO MEP (ESPECIALIDADES TÉCNICAS Y ACADÉMICAS)
const TECH_SPECIALTIES = [
  "Administración y Operación Aduanera", "Agroecología", "Agroindustria Alimentaria", 
  "Banca y Finanzas", "Contabilidad", "Ciberseguridad", "Desarrollo de Software", 
  "Dibujo Arquitectónico", "Dibujo Técnico", "Diseño de Modas", "Diseño Publicitario", 
  "Electrónica Industrial", "Electrotecnia", "Horticultura", "Ingeniería en Producción", 
  "Inteligencia Artificial", "Joyería", "Logística y Distribución", "Mecánica Automotriz", 
  "Mecánica de Precisión", "Mecánica Naval", "Mercadeo", "Náutica Pesquera", 
  "Productividad y Calidad", "Refrigeración y Aire Acondicionado", "Redes de Computadoras", 
  "Secretariado Ejecutivo", "Turismo Ecológico", "Turismo en Alimentos y Bebidas", "Turismo en Hotelería"
];

const ACADEMIC_SUBJECTS = [
  "Matemáticas", "Español", "Ciencias", "Estudios Sociales", "Educación Cívica", 
  "Inglés", "Francés", "Biología", "Física", "Química", "Psicología", "Filosofía",
  "Educación Musical", "Artes Plásticas", "Educación Física", "Educación Religiosa",
  "Artes Industriales", "Educación para el Hogar", "Afectividad y Sexualidad"
];

const MODALITIES = [
  { type: "CTP", levels: ["10mo", "11mo", "12mo"] },
  { type: "LICEO", levels: ["7mo", "8vo", "9no", "10mo", "11mo"] },
  { type: "CINDEA", levels: ["I Nivel", "II Nivel", "III Nivel"] }, // Nocturno
  { type: "IPEC", levels: ["Módulo I", "Módulo II", "Módulo III"] } // Institutos
];

// 2. BANCO DE VERBOS Y ESTRATEGIAS (PARA VARIABILIDAD INFINITA)
const STRATEGIES = [
  { name: "Aprendizaje Basado en Proyectos (ABP)", evidence: "Prototipo / Maqueta" },
  { name: "Estudio de Casos", evidence: "Informe Técnico" },
  { name: "Aula Invertida (Flipped Classroom)", evidence: "Mapa Mental Colaborativo" },
  { name: "Gamificación", evidence: "Ranking / Insignias" },
  { name: "Design Thinking", evidence: "Boceto / Mockup" },
  { name: "Indagación Científica", evidence: "V de Gowin" },
  { name: "Simulación / Roleplay", evidence: "Video o Guion" }
];

const VERBS = ["Analizar", "Aplicar", "Construir", "Diseñar", "Evaluar", "Diagnosticar", "Gestionar", "Operar", "Programar", "Resolver"];

// 3. GENERADOR DE ENCABEZADOS (FORMATO OFICIAL MEP)
function generateHeader(modality, subject, level) {
  const base = {
    institucion: "Sistema Educativo Nacional",
    curso_lectivo: "2026",
    docente: "[Nombre del Docente]",
    periodicidad: "Mensual"
  };

  if (modality === "CTP") {
    return { ...base, educacion_tecnica: "Sí", especialidad: subject, sub_area: "Taller Exploratorio / Especialidad", nivel: level };
  } else if (modality === "CINDEA" || modality === "IPEC") {
    return { ...base, modalidad: "Jóvenes y Adultos", modulo: subject, creditos: "Variable", nivel: level };
  } else {
    return { ...base, asignatura: subject, nivel: level, periodo: "I Periodo" };
  }
}

// 4. GENERADOR DE CONTENIDO PROCEDURAL
function generateProceduralPlan(subject, level, modalityType) {
  // Seleccionar aleatoriamente una estrategia
  const strategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
  const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
  const unitNumber = Math.floor(Math.random() * 5) + 1;
  
  const topic = `${verb} fundamentos de ${subject} - Unidad ${unitNumber}`;

  return {
    status: "success",
    meta: { mode: "COSMOS_GENERATOR", modality: modalityType, strategy: strategy.name },
    administrative: generateHeader(modalityType, subject, level),
    planning_module: {
      learning_outcome: `Resultado de Aprendizaje: ${topic}`,
      // 4 MOMENTOS VARIADOS
      mediation: [
        { moment: "1. CONEXIÓN", activity: `Actividad focal introductoria sobre ${subject}.`, dua_variant: "Visual / Auditivo" },
        { moment: "2. COLABORACIÓN", activity: `Trabajo grupal utilizando la técnica: ${strategy.name}.`, technique: "Trabajo Cooperativo" },
        { moment: "3. CONSTRUCCIÓN", activity: `Práctica guiada: ${verb} procesos de ${subject}.`, evidence_type: strategy.evidence, ui_render_hint: "Checklist" },
        { moment: "4. CLARIFICACIÓN", activity: "Cierre metacognitivo y validación de saberes.", technique: "Sondeo" }
      ],
      // EVALUACIÓN VARIADA
      evaluation_system: {
        short_task: { 
            title: "Actividad Corta", 
            description: `Ejercicio práctico relacionado con ${strategy.evidence}.`, 
            value: "5%" 
        },
        project: {
            title: "Proyecto de Unidad",
            phases: ["Planificación", "Desarrollo", "Entrega Final"],
            value: "25%"
        },
        daily_work: {
            title: "Trabajo Cotidiano",
            rubric: [
                { indicator: `Participación en ${strategy.name}`, levels: { high: "3", mid: "2", low: "1" } },
                { indicator: `Dominio técnico de ${subject}`, levels: { high: "3", mid: "2", low: "1" } }
            ]
        }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  console.log("🌌 DETONANDO PROTOCOLO COSMOS (COBERTURA TOTAL)...");
  
  let total = 0;
  const BATCH_SIZE = 50; // Para no saturar la memoria, hacemos lotes (aunque aquí es secuencial)

  // 1. RECORRER MODALIDADES
  for (const mod of MODALITIES) {
    // 2. SELECCIONAR LISTA DE MATERIAS SEGÚN MODALIDAD
    const subjects = mod.type === "CTP" ? TECH_SPECIALTIES : ACADEMIC_SUBJECTS;

    // 3. RECORRER MATERIAS
    for (const sub of subjects) {
        // 4. RECORRER NIVEL
        // Para optimizar, solo generamos 1 o 2 niveles por materia en este seed masivo, 
        // pero cubriendo todo el espectro.
        const levels = mod.levels; // Todos los niveles
        
        for (const lvl of levels) {
             // GENERAMOS 2 VARIANTES POR CADA COMBINACIÓN (A y B)
             for (let i = 1; i <= 2; i++) {
                const title = `COSMOS: ${sub} - ${lvl} (${mod.type}) [v${i}]`;
                
                // Check rápido
                const exists = await prisma.lessonPlan.findFirst({ where: { title } });
                
                if (!exists) {
                    await prisma.lessonPlan.create({
                        data: {
                            title,
                            subject: sub,
                            level: lvl,
                            status: "PUBLISHED",
                            userId: admin.id,
                            content: generateProceduralPlan(sub, lvl, mod.type)
                        }
                    });
                    total++;
                    if (total % 20 === 0) process.stdout.write("."); // Feedback visual
                }
             }
        }
    }
  }

  console.log(`\n✅ COSMOS FINALIZADO. ${total} PLANES GENERADOS.`);
  console.log("   -> Cubre: CTP (30+ Especialidades), CINDEA, IPEC, Liceo.");
  console.log("   -> Variedad: ABP, Gamificación, Flipped Classroom, Casos.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());