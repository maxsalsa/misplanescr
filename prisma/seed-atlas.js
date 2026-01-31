const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. EL CATÁLOGO MAESTRO DEL MEP (LA VERDAD ABSOLUTA)
const CATALOG = [
  // --- ACADÉMICAS BÁSICAS ---
  { name: "Matemáticas", family: "ACADEMIC", topics: ["Geometría", "Álgebra", "Estadística", "Funciones"] },
  { name: "Español", family: "ACADEMIC", topics: ["Literatura Costarricense", "Gramática", "Producción Textual", "Análisis Literario"] },
  { name: "Ciencias", family: "SCIENCE", topics: ["Materia y Energía", "Ecosistemas", "Cuerpo Humano", "Universo"] },
  { name: "Estudios Sociales", family: "ACADEMIC", topics: ["Geografía de CR", "Historia Mundial", "Climatología", "Civismo"] },
  { name: "Educación Cívica", family: "ACADEMIC", topics: ["Sistema Político", "Derechos Humanos", "Participación Joven", "Identidad"] },
  { name: "Inglés", family: "ACADEMIC", topics: ["Daily Routine", "Environment", "Technology", "Future Plans"] },
  { name: "Francés", family: "ACADEMIC", topics: ["Salutations", "La Famille", "La Ville", "Les Loisirs"] },
  
  // --- MATERIAS COMPLEMENTARIAS (LA COLA LARGA) ---
  { name: "Educación Religiosa", family: "ACADEMIC", topics: ["Valores", "Historia Sagrada", "Ética Social", "Espiritualidad"] },
  { name: "Educación Musical", family: "INDUSTRIAL_ARTS", topics: ["Lectura Rítmica", "Apreciación", "Ejecución Instrumental", "Himnos Patrios"] },
  { name: "Artes Plásticas", family: "INDUSTRIAL_ARTS", topics: ["Teoría del Color", "Dibujo", "Escultura", "Historia del Arte"] },
  { name: "Educación Física", family: "INDUSTRIAL_ARTS", topics: ["Condición Física", "Deportes Colectivos", "Atletismo", "Vida Saludable"] },
  { name: "Educación para el Hogar", family: "INDUSTRIAL_ARTS", topics: ["Nutrición", "Textiles", "Presupuesto Familiar", "Etiqueta"] },
  { name: "Psicología", family: "ACADEMIC", topics: ["Adolescencia", "Personalidad", "Proyecto de Vida", "Salud Mental"] },
  { name: "Lógica", family: "ACADEMIC", topics: ["Falacias", "Argumentación", "Lógica Simbólica", "Pensamiento Crítico"] },
  
  // --- EDUCACIÓN TÉCNICA (ESPECIALIDADES) ---
  { name: "Ciberseguridad", family: "HARD_TECH", topics: ["Hacking Ético", "Redes Seguras", "Criptografía", "Forense Digital"] },
  { name: "Desarrollo de Software", family: "HARD_TECH", topics: ["POO", "Bases de Datos", "Web APIs", "Mobile Apps"] },
  { name: "Inteligencia Artificial", family: "HARD_TECH", topics: ["Machine Learning", "Python", "Redes Neuronales", "Ética de IA"] },
  { name: "Contabilidad", family: "SERVICE", topics: ["Ciclo Contable", "Costos", "Auditoría", "NIIF"] },
  { name: "Banca y Finanzas", family: "SERVICE", topics: ["Sistema Financiero", "Crédito", "Riesgo", "Atención al Cliente"] },
  { name: "Turismo", family: "SERVICE", topics: ["Guía Local", "Ecología", "Hotelería", "Gastronomía"] },
  { name: "Secretariado Ejecutivo", family: "SERVICE", topics: ["Gestión Documental", "Protocolo", "Digitación", "Eventos"] },
  { name: "Agropecuaria", family: "INDUSTRIAL_ARTS", topics: ["Cultivos Hidropónicos", "Suelos", "Zootecnia", "Riego"] },
  { name: "Mecánica de Precisión", family: "INDUSTRIAL_ARTS", topics: ["Torno", "Fresadora", "CNC", "Metrología"] },
  { name: "Electrotecnia", family: "INDUSTRIAL_ARTS", topics: ["Circuitos DC/AC", "Motores", "Instalaciones", "PLC"] },
  { name: "Dibujo Arquitectónico", family: "INDUSTRIAL_ARTS", topics: ["Planos", "AutoCAD", "Perspectiva", "Maquetas"] }
];

const LEVELS = ["7mo", "8vo", "9no", "10mo", "11mo", "12mo"];

// 2. GENERADOR DE INSTRUMENTOS PRECISOS
function generateEvaluationSystem(subject, topic, family) {
  const isTech = family === "HARD_TECH" || family === "INDUSTRIAL_ARTS";
  
  return {
    // A. TRABAJO COTIDIANO (RUBRICA)
    daily_work: {
      title: `Rubrica de Trabajo Cotidiano: ${topic}`,
      percent: "20%",
      rubric: [
        { 
          indicator: isTech ? "Aplica normas de seguridad y uso de equipo." : "Participa activamente en la construcción del conocimiento.",
          levels: { high: "Siempre (3)", mid: "A veces (2)", low: "Nunca (1)" }
        },
        {
          indicator: `Dominio del contenido: ${topic}`,
          levels: { high: "Excelente", mid: "Regular", low: "Deficiente" }
        }
      ]
    },
    // B. TAREA CORTA (CHECKLIST)
    short_task: {
      title: `Tarea Corta: Investigación sobre ${topic}`,
      value: "10%",
      type: "Lista de Cotejo",
      items: ["Portada Completa", "Bibliografía APA 7", "Contenido Relevante", "Entrega Puntual"]
    },
    // C. PRUEBA ESCRITA (TABLA DE ESPECIFICACIONES)
    written_test: {
      title: "I Prueba Parcial",
      value: "20%",
      spec_table: [
        { obj: "Identificar conceptos", cognitive: "Conocimiento", type: "Selección", points: 10, time: 20 },
        { obj: `Aplicar principios de ${topic}`, cognitive: "Aplicación", type: "Práctica", points: 20, time: 40 },
        { obj: "Resolver caso problema", cognitive: "Análisis", type: "Desarrollo", points: 15, time: 30 }
      ]
    },
    // D. PROYECTO (FASES)
    project: {
      title: `Proyecto Semestral: ${topic} Aplicado`,
      value: "30%",
      phases: [
        { name: "Fase 1: Propuesta", deliverable: "Documento PDF" },
        { name: "Fase 2: Avance", deliverable: isTech ? "Prototipo / Código" : "Borrador" },
        { name: "Fase 3: Entrega Final", deliverable: "Defensa Oral" }
      ]
    }
  };
}

// 3. GENERADOR DE MEDIACIÓN (4 MOMENTOS)
function generateMediation(family, topic) {
  const acts = {
    ACADEMIC: { m1: "Pregunta Generadora", m2: "Lectura Grupal", m3: "Ensayo/Mapa Mental", m4: "Plenaria" },
    HARD_TECH: { m1: "Análisis de Fallo", m2: "Diseño Arquitectura", m3: "Laboratorio Código", m4: "Debugging" },
    SCIENCE: { m1: "Fenómeno Discrepante", m2: "Recolección Datos", m3: "Experimento", m4: "Conclusión" },
    SERVICE: { m1: "Video Caso", m2: "Guion", m3: "Roleplay", m4: "Feedback" },
    INDUSTRIAL_ARTS: { m1: "Charla Seguridad", m2: "Demostración", m3: "Práctica Taller", m4: "Limpieza" }
  };
  
  const selected = acts[family] || acts.ACADEMIC;
  
  return [
    { moment: "1. CONEXIÓN", activity: `${selected.m1} sobre ${topic}.`, dua: "Interés" },
    { moment: "2. COLABORACIÓN", activity: `${selected.m2} en equipos.`, dua: "Social" },
    { moment: "3. CONSTRUCCIÓN", activity: `${selected.m3}`, evidence: "Producto", dua: "Acción" },
    { moment: "4. CLARIFICACIÓN", activity: `${selected.m4}`, technique: "Metacognición" }
  ];
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta Admin."); return; }

  console.log(`🚀 INICIANDO PROTOCOLO ATLAS...`);
  console.log(`   -> Catálogo: ${CATALOG.length} Asignaturas`);
  console.log(`   -> Niveles: ${LEVELS.length}`);
  console.log(`   -> Combinaciones posibles: ${CATALOG.length * LEVELS.length * 4}`); // 4 temas por materia

  let count = 0;

  // BUCLE MASIVO: MATERIA -> NIVEL -> TEMA
  for (const subject of CATALOG) {
    for (const level of LEVELS) {
      // Solo generamos 1 o 2 temas por nivel para no explotar la BD, pero con variedad
      const topic = subject.topics[Math.floor(Math.random() * subject.topics.length)];
      
      const title = `MEP 2026: ${subject.name} - ${topic} (${level})`;
      const exists = await prisma.lessonPlan.findFirst({ where: { title } });

      if (!exists) {
        // GENERAMOS TODO EL PAQUETE
        const evaluation = generateEvaluationSystem(subject.name, topic, subject.family);
        const mediation = generateMediation(subject.family, topic);

        // CREAR GRUPO ASOCIADO (Para que el profe tenga lista)
        const groupName = `${level.replace("mo","")}-1 ${subject.name.substring(0,4)}`;
        let group = await prisma.group.findFirst({ where: { name: groupName } });
        if (!group) {
             group = await prisma.group.create({
                data: { name: groupName, grade: level, shift: "DIURNO", userId: admin.id }
            });
        }

        await prisma.lessonPlan.create({
          data: {
            title: title,
            subject: subject.name,
            level: level,
            status: "PUBLISHED",
            userId: admin.id,
            content: {
              administrative: { period: "2026", origin: "Protocolo Atlas", group: groupName },
              meta: { family: subject.family, specialty: subject.name },
              curriculum: { unit: topic, outcome: "Competencia del Programa Oficial" },
              mediation: mediation,
              evaluation_system: evaluation // AQUÍ VA TODO LO QUE PIDIÓ
            }
          }
        });
        
        process.stdout.write("."); // Barra de progreso
        count++;
      }
    }
  }

  console.log(`\n✅ ATLAS COMPLETADO. ${count} NUEVOS PLANES INYECTADOS.`);
  console.log("   -> Incluye: Cotidianos, Tareas, Pruebas y Proyectos para todo.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());