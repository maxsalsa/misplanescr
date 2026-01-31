const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

// --- MOTOR DE PEDAGOGÍA CIENTÍFICA ---
function detectAcademicType(filename) {
  const n = filename.toLowerCase();
  
  // 1. CIENCIAS EXACTAS (INDAGACIÓN)
  if (n.includes("ciencias") || n.includes("biologia") || n.includes("fisica") || n.includes("quimica")) {
    return {
      type: "SCIENCE",
      cognitive: "Pensamiento Científico",
      strategies: [
        { m: "1. FOCALIZACIÓN", a: "Pregunta investigable: El docente plantea un problema del entorno natural (ej: contaminación local).", dua: "Activar conocimientos previos" },
        { m: "2. EXPLORACIÓN", a: "Trabajo de Campo/Lab: Los estudiantes recolectan datos cualitativos o cuantitativos.", dua: "Manipulación de objetos reales" },
        { m: "3. CONTRASTACIÓN", a: "Análisis: Comparan sus hallazgos con la teoría científica oficial y fuentes bibliográficas.", dua: "Múltiples formas de representación" },
        { m: "4. APLICACIÓN", a: "Resolución: Proponen una solución o medida correctiva basada en la evidencia.", dua: "Transferencia del conocimiento" }
      ],
      evidence: "Reporte de Laboratorio / V de Gowin",
      rubric: { high: "Formula hipótesis validables y concluye basado en evidencia.", low: "Conclusiones sin sustento en los datos." }
    };
  }
  
  // 2. HUMANIDADES (ESPAÑOL / SOCIALES)
  if (n.includes("espanol") || n.includes("sociales") || n.includes("civica") || n.includes("hogar")) {
    return {
      type: "HUMANITIES",
      cognitive: "Pensamiento Crítico",
      strategies: [
        { m: "1. CONEXIÓN", a: "Lectura crítica de un texto actual o noticia polémica.", dua: "Opciones de percepción (Audio/Texto)" },
        { m: "2. COLABORACIÓN", a: "Debate socrático o mesa redonda sobre las tesis del autor.", dua: "Expresión y comunicación" },
        { m: "3. CONSTRUCCIÓN", a: "Producción Textual: Ensayo argumentativo o Mapa Mental Conceptual.", dua: "Herramientas de construcción" },
        { m: "4. CLARIFICACIÓN", a: "Publicación del producto en el mural del aula o blog digital.", dua: "Funciones ejecutivas" }
      ],
      evidence: "Ensayo / Portafolio de Lectura",
      rubric: { high: "Argumentación cohesiva con uso correcto de la normativa gramatical.", low: "Ideas dispersas sin hilo conductor." }
    };
  }

  return null; // Si no es académico, lo ignora (ya lo cubrió el script anterior)
}

async function academicScan(dir, adminId) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
        await academicScan(fullPath, adminId);
    } else if (file.toLowerCase().endsWith(".pdf")) {
        
        // SOLO PROCESAR LO ACADÉMICO QUE FALTABA
        const pedagogy = detectAcademicType(file);
        
        if (pedagogy) {
            const subject = path.basename(dir);
            const cleanName = file.replace(".pdf","").replace(/_/g," ");
            // Detectar Ciclo (I, II, III o Diversificada)
            let level = "General";
            if (cleanName.match(/10|11|12/)) level = cleanName.match(/10|11|12/)[0] + "mo";
            else if (cleanName.includes("3ciclo")) level = "III Ciclo (7-8-9)";
            else if (cleanName.includes("1y2ciclo") || cleanName.includes("primaria")) level = "Primaria (I/II Ciclo)";

            console.log(`   🧪 SINTETIZANDO: ${cleanName} [Modo: ${pedagogy.type}]`);

            // CREAR GRUPO GENÉRICO ACADÉMICO (Ej: 7-1 Ciencias)
            const groupCode = level.includes("III") ? "7-1" : level.includes("Primaria") ? "1-1" : "10-1";
            const groupName = `${groupCode} ${subject.substring(0,8)}`;
            
            await prisma.lessonPlan.create({
                data: {
                    title: `MEP ACADÉMICO: ${subject} - ${cleanName}`,
                    subject: subject,
                    level: level,
                    status: "PUBLISHED",
                    userId: adminId,
                    content: {
                        administrative: { period: "2026", origin: file, type: "ACADEMICO" },
                        curriculum: { unit_name: `Eje Temático: ${cleanName}`, outcome: "Habilidad del Programa Oficial." },
                        // INYECCIÓN DE TABLA DE ESPECIFICACIONES ACADÉMICA
                        evaluation_system: {
                            written_test: {
                                title: "Prueba Escrita (Enfoque Sumativo)",
                                rows: [
                                    { obj: "Reconocimiento de conceptos", cognitive: "Conocimiento", type: "Selección", time: 15, points: 10 },
                                    { obj: "Aplicación de contenidos", cognitive: "Aplicación", type: "Respuesta Corta", time: 25, points: 15 },
                                    { obj: pedagogy.type === "SCIENCE" ? "Resolución de problemas científicos" : "Producción textual / Análisis", cognitive: "Análisis", type: "Desarrollo", time: 40, points: 20 }
                                ]
                            }
                        },
                        // MEDIACIÓN PEDAGÓGICA ESPECÍFICA (INDAGACIÓN O CRÍTICA)
                        mediation: pedagogy.strategies.map(s => ({
                            moment: s.m,
                            activity: s.a,
                            dua_principle: s.dua
                        })),
                        evaluation: {
                            criteria: [{ indicator: "Dominio del contenido curricular", levels: pedagogy.rubric }]
                        },
                        evidence_required: pedagogy.evidence
                    }
                }
            });
        }
    }
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;
  console.log("🚀 EJECUTANDO PROTOCOLO DARWIN (CIENCIAS & LETRAS)...");
  await academicScan(BASE_PATH, admin.id); 
  console.log("✅ NÚCLEO ACADÉMICO INSTALADO.");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());