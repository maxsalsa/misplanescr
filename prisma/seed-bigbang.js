const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. DEFINICIÓN DE NIVELES POR MODALIDAD
const NIVELES = {
  PREESCOLAR: ["Materno Infantil", "Transición"],
  PRIMARIA: ["1er Grado", "2do Grado", "3er Grado", "4to Grado", "5to Grado", "6to Grado"],
  SECUNDARIA: ["7mo Año", "8vo Año", "9no Año", "10mo Año", "11mo Año", "12mo Año"],
  NOCTURNA: ["I Nivel (7-8-9)", "II Nivel (10-11)", "III Nivel (12)"], // CINDEA
};

// 2. LA BIBLIOTECA DE ALEJANDRÍA (CATÁLOGO TOTAL)
const SUBJECTS_DB = [
  // --- PREESCOLAR ---
  { name: "Desarrollo Personal y Social", family: "ACADEMIC", levels: NIVELES.PREESCOLAR, topics: ["Identidad", "Convivencia", "Autonomía"] },
  { name: "Expresión Artística", family: "INDUSTRIAL_ARTS", levels: NIVELES.PREESCOLAR, topics: ["Plástica", "Musical", "Corporal"] },
  
  // --- PRIMARIA (BÁSICAS) ---
  { name: "Matemáticas Primaria", family: "ACADEMIC", levels: NIVELES.PRIMARIA, topics: ["Números Naturales", "Geometría Básica", "Medidas", "Estadística"] },
  { name: "Español Primaria", family: "ACADEMIC", levels: NIVELES.PRIMARIA, topics: ["Lectoescritura", "Comprensión Lectora", "Expresión Oral", "Ortografía"] },
  { name: "Ciencias Primaria", family: "SCIENCE", levels: NIVELES.PRIMARIA, topics: ["Seres Vivos", "Cuerpo Humano", "Materia", "Energía"] },
  { name: "Estudios Sociales Primaria", family: "ACADEMIC", levels: NIVELES.PRIMARIA, topics: ["Mi Cantón", "Geografía de CR", "Historia Antigua", "Símbolos Nacionales"] },
  
  // --- SECUNDARIA ACADÉMICA ---
  { name: "Matemáticas", family: "ACADEMIC", levels: NIVELES.SECUNDARIA, topics: ["Funciones", "Trigonometría", "Probabilidad", "Geometría Analítica"] },
  { name: "Español", family: "ACADEMIC", levels: NIVELES.SECUNDARIA, topics: ["Movimientos Literarios", "Análisis de Novela", "Gramática Avanzada", "Ensayo"] },
  { name: "Ciencias (Biología)", family: "SCIENCE", levels: ["10mo Año", "11mo Año"], topics: ["Genética", "Evolución", "Ecología", "Bioquímica"] },
  { name: "Ciencias (Química)", family: "SCIENCE", levels: ["10mo Año", "11mo Año"], topics: ["Tabla Periódica", "Enlaces Químicos", "Estequiometría", "Gases"] },
  { name: "Ciencias (Física)", family: "SCIENCE", levels: ["10mo Año", "11mo Año"], topics: ["Cinemática", "Dinámica", "Termodinámica", "Electromagnetismo"] },
  { name: "Psicología", family: "ACADEMIC", levels: ["10mo Año", "11mo Año"], topics: ["Adolescencia", "Personalidad", "Salud Mental", "Proyecto de Vida"] },
  { name: "Filosofía", family: "ACADEMIC", levels: ["10mo Año", "11mo Año"], topics: ["Lógica", "Ética", "Epistemología", "Estética"] },
  
  // --- IDIOMAS ---
  { name: "Inglés Académico", family: "ACADEMIC", levels: [...NIVELES.PRIMARIA, ...NIVELES.SECUNDARIA], topics: ["Environment", "Technology", "Culture", "Health"] },
  { name: "Francés", family: "ACADEMIC", levels: ["7mo Año", "8vo Año", "9no Año", "10mo Año"], topics: ["La Francophonie", "La Vie Quotidienne", "Gastronomie", "Voyages"] },
  
  // --- COMPLEMENTARIAS / ARTÍSTICAS ---
  { name: "Educación Física", family: "INDUSTRIAL_ARTS", levels: [...NIVELES.PRIMARIA, ...NIVELES.SECUNDARIA], topics: ["Resistencia", "Baloncesto", "Voleibol", "Atletismo", "Fútbol Sala"] },
  { name: "Educación Religiosa", family: "ACADEMIC", levels: [...NIVELES.PRIMARIA, ...NIVELES.SECUNDARIA], topics: ["Valores Humanos", "Historia de las Religiones", "Ética", "Trascendencia"] },
  { name: "Artes Plásticas", family: "INDUSTRIAL_ARTS", levels: NIVELES.SECUNDARIA, topics: ["Dibujo Técnico", "Pintura", "Escultura", "Historia del Arte"] },
  { name: "Educación Musical", family: "INDUSTRIAL_ARTS", levels: NIVELES.SECUNDARIA, topics: ["Solfeo", "Flauta Dulce", "Apreciación Musical", "Folclore"] },
  { name: "Artes Industriales", family: "INDUSTRIAL_ARTS", levels: ["7mo Año", "8vo Año", "9no Año"], topics: ["Maderas", "Metales", "Electricidad Básica", "Dibujo"] },
  { name: "Educación para el Hogar", family: "INDUSTRIAL_ARTS", levels: ["7mo Año", "8vo Año", "9no Año"], topics: ["Nutrición", "Presupuesto", "Textiles", "Etiqueta"] },
  
  // --- TÉCNICAS (HARD TECH & INDUSTRIAL) ---
  { name: "Ciberseguridad", family: "HARD_TECH", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Ethical Hacking", "Forense", "Redes", "Linux"] },
  { name: "Desarrollo de Software", family: "HARD_TECH", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Java", "Web Development", "Mobile Apps", "Bases de Datos"] },
  { name: "Inteligencia Artificial", family: "HARD_TECH", levels: ["11mo Año", "12mo Año"], topics: ["Machine Learning", "Python", "Computer Vision", "NLP"] },
  { name: "Diseño Publicitario", family: "HARD_TECH", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Illustrator", "Photoshop", "Fotografía", "Branding"] },
  { name: "Dibujo Arquitectónico", family: "INDUSTRIAL_ARTS", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Planos Constructivos", "AutoCAD", "Revit", "Maquetas"] },
  { name: "Mecánica Automotriz", family: "INDUSTRIAL_ARTS", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Motores", "Inyección Electrónica", "Frenos", "Transmisión"] },
  { name: "Mecánica de Precisión", family: "INDUSTRIAL_ARTS", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Torno", "Fresadora", "CNC", "Metrología"] },
  { name: "Electrotecnia", family: "INDUSTRIAL_ARTS", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Circuitos", "PLC", "Instalaciones Residenciales", "Motores Eléctricos"] },
  { name: "Refrigeración y A/C", family: "INDUSTRIAL_ARTS", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Termodinámica", "Compresores", "Gases Refrigerantes", "Mantenimiento"] },
  { name: "Agropecuaria", family: "INDUSTRIAL_ARTS", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Cultivos", "Zootecnia", "Agroindustria", "Riego"] },

  // --- SERVICIOS ---
  { name: "Contabilidad", family: "SERVICE", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Ciclo Contable", "Costos", "Tributación", "Auditoría"] },
  { name: "Banca y Finanzas", family: "SERVICE", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Cajas", "Crédito", "Riesgo", "Atención al Cliente"] },
  { name: "Turismo (Alimentos)", family: "SERVICE", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Manipulación", "Gastronomía Nacional", "Bebidas", "Servicio Mesa"] },
  { name: "Turismo (Ecológico)", family: "SERVICE", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Biodiversidad", "Guidado", "Historia Natural", "Geografía Turística"] },
  { name: "Secretariado Ejecutivo", family: "SERVICE", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Gestión Documental", "Protocolo", "Digitación", "Organización Eventos"] },
  { name: "Ejecutivo Bilingüe", family: "SERVICE", levels: ["10mo Año", "11mo Año", "12mo Año"], topics: ["Business English", "Customer Service", "Office Management", "Translation"] }
];

// 3. GENERADOR DE CONTENIDO INTELIGENTE
function generateContent(sub, level, topic, family) {
  // Lógica de modalidad
  const modality = level.includes("Nivel") ? "Nocturna (CINDEA)" : 
                   level.includes("Grado") ? "Primaria" : 
                   level.includes("Materno") ? "Preescolar" : "Secundaria";

  return {
    status: "success",
    meta: { specialty: sub, family: family, legal_check: "Passed" },
    administrative: { period: "2026", modality: modality, group_id: "GENERIC" },
    planning_module: {
      learning_outcome: `Competencia oficial: ${topic}`,
      mediation: [
        { moment: "1. CONEXIÓN", activity: `Actividad introductoria sobre ${topic}.`, dua_variant: { visual: "Video", auditivo: "Podcast", kinestesico: "Objeto real" } },
        { moment: "2. COLABORACIÓN", activity: "Trabajo en subgrupos.", resource: "Guía de trabajo" },
        { moment: "3. CONSTRUCCIÓN", activity: `Práctica de ${topic}.`, evidence_type: family === "HARD_TECH" ? "Código" : "Producto", ui_render_hint: family === "HARD_TECH" ? "CodeBlock" : "Checklist" },
        { moment: "4. CLARIFICACIÓN", activity: "Cierre y conclusiones.", technique: "Semáforo de aprendizaje" }
      ],
      evaluation_instrument: {
        type: "Rúbrica Global",
        total_points: 20,
        criteria: [{ indicator: `Dominio de ${topic}`, levels: { "3_Advanced": "Excelente", "2_Intermediate": "Regular", "1_Initial": "Debe mejorar" } }]
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta Admin."); return; }

  console.log("🌌 DETONANDO BIG BANG CURRICULAR...");
  let total = 0;

  // RECORRER CADA MATERIA
  for (const subject of SUBJECTS_DB) {
    // RECORRER CADA NIVEL VÁLIDO PARA ESA MATERIA
    for (const level of subject.levels) {
      // SELECCIONAR UN TEMA ALEATORIO (O PODRÍAMOS HACERLOS TODOS, PERO SERÍAN MILES)
      // Generamos 1 plan por nivel para garantizar cobertura
      const topic = subject.topics[Math.floor(Math.random() * subject.topics.length)];
      
      const title = `MEP 2026: ${subject.name} - ${topic} (${level})`;
      
      // UPSERT RÁPIDO
      const exists = await prisma.lessonPlan.findFirst({ where: { title } });
      if (!exists) {
        await prisma.lessonPlan.create({
          data: {
            title: title,
            subject: subject.name,
            level: level,
            status: "PUBLISHED",
            userId: admin.id,
            content: generateContent(subject.name, level, topic, subject.family)
          }
        });
        total++;
        if (total % 10 === 0) process.stdout.write("."); // Feedback visual
      }
    }
  }

  // AGREGAR ALGUNOS DE NOCTURNA (CINDEA) EXTRA PARA ASEGURAR
  const cindeaSubjects = ["Matemáticas", "Español", "Inglés", "Estudios Sociales"];
  for (const sub of cindeaSubjects) {
      for (const lev of NIVELES.NOCTURNA) {
          const title = `CINDEA 2026: ${sub} - Módulo Intensivo (${lev})`;
          const exists = await prisma.lessonPlan.findFirst({ where: { title } });
          if (!exists) {
              await prisma.lessonPlan.create({
                  data: {
                      title, subject: sub, level: lev, status: "PUBLISHED", userId: admin.id,
                      content: generateContent(sub, lev, "Repaso General", "ACADEMIC")
                  }
              });
              total++;
          }
      }
  }

  console.log(`\n✅ UNIVERSO EXPANDIDO. ${total} NUEVOS PLANES CREADOS.`);
  console.log("   -> Preescolar, Primaria, Secundaria, Técnica, Nocturna.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());