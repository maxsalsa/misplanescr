const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

// 1. LA SALA DE PROFESORES (PERFILES)
const TEACHERS = [
  { name: "Usuario Prueba", email: "prueba@aulaplan.cr", role: "TESTER", context: "GOD_MODE" },
  { name: "Carlos Mecánica", email: "carlos@ctp.cr", role: "DOCENTE", context: "CTP", specialty: "Mecánica de Precisión" },
  { name: "Ana Matemáticas", email: "ana@liceo.cr", role: "DOCENTE", context: "LICEO", specialty: "Matemáticas" },
  { name: "Niña María", email: "maria@escuela.cr", role: "DOCENTE", context: "PRIMARIA", specialty: "General Básica" },
  { name: "Profe Nocturno", email: "noc@cindea.cr", role: "DOCENTE", context: "CINDEA", specialty: "Estudios Sociales" },
  { name: "Teacher Helen", email: "helen@bilingue.cr", role: "DOCENTE", context: "LICEO", specialty: "Inglés" },
  { name: "Mario Agro", email: "mario@agro.cr", role: "DOCENTE", context: "CTP", specialty: "Agroecología" },
  { name: "Luisa Artes", email: "luisa@artes.cr", role: "DOCENTE", context: "LICEO", specialty: "Artes Plásticas" },
  { name: "Pedro Ciber", email: "pedro@tech.cr", role: "DOCENTE", context: "CTP", specialty: "Ciberseguridad" },
  { name: "Sofia Hogar", email: "sofia@vida.cr", role: "DOCENTE", context: "LICEO", specialty: "Educación para el Hogar" }
];

// 2. MENÚ DE TAREAS FRESCAS (VARIEDAD SOLICITADA)
const TASK_MENU = [
  { type: "Digital", title: "Video-Minuto (Tik Tok Educativo)", desc: "Explicar el concepto clave en 60 segundos." },
  { type: "Investigación", title: "Caza de Mitos", desc: "Buscar 3 mitos sobre el tema y desmentirlos con teoría." },
  { type: "Práctica", title: "Resolución de Error", desc: "Se entrega un ejercicio mal resuelto; el estudiante debe corregirlo." },
  { type: "Oral", title: "Podcast Express", desc: "Grabar un audio de 2 minutos entrevistando a un compañero sobre el tema." }
];

const PROJECT_MENU = [
  { title: "Feria de Soluciones", phases: ["Empatizar", "Idear", "Prototipar"] },
  { title: "Revista Digital", phases: ["Consejo Editorial", "Redacción", "Diagramación"] },
  { title: "Campaña de Impacto", phases: ["Diagnóstico", "Propuesta", "Ejecución"] }
];

async function main() {
  const passwordHash = await bcrypt.hash("123", 10); // Clave genérica para todos: 123
  
  console.log("🏫 INICIANDO CONTRATACIÓN MASIVA...");

  for (const t of TEACHERS) {
    // A. CREAR USUARIO
    const user = await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        email: t.email,
        name: t.name,
        password: passwordHash,
        role: t.context === "GOD_MODE" ? "GOD_TIER" : "DOCENTE"
      }
    });

    // B. ASIGNAR INSTITUCIÓN (SEGÚN PERFIL)
    let instType = t.context === "PRIMARIA" ? "ESCUELA" : t.context;
    if (t.context === "GOD_MODE") instType = "LICEO"; // Default

    const institution = await prisma.institution.findFirst({ where: { type: instType } });
    if (institution) {
        await prisma.user.update({ where: { id: user.id }, data: { institutionId: institution.id } });
    }

    // C. CREAR GRUPOS (CARGA LABORAL)
    // Primaria tiene 1 grupo. Liceo/CTP tienen 4-5 grupos.
    const groupCount = t.context === "PRIMARIA" ? 1 : 4;
    
    for (let i = 1; i <= groupCount; i++) {
        const level = t.context === "PRIMARIA" ? "4to Grado" : (t.context === "CINDEA" ? "II Nivel" : (9 + Math.floor(i/2)) + "mo");
        const section = t.context === "PRIMARIA" ? "4-1" : `${level.replace("mo","")}-${i}`;
        
        const group = await prisma.group.create({
            data: {
                name: `Sección ${section} (${t.specialty})`,
                grade: level,
                shift: t.context === "CINDEA" ? "NOCTURNO" : "DIURNO",
                userId: user.id,
                institutionId: institution?.id
            }
        });

        // D. LLENAR EL GRUPO (MATRÍCULA)
        // Inyectamos 20 estudiantes por grupo
        for(let s=0; s<20; s++) {
            await prisma.student.create({
                data: {
                    name: `Estudiante ${s+1} de ${t.name}`,
                    groupId: group.id,
                    needs: Math.random() > 0.8 ? "Adecuación No Significativa" : null
                }
            });
        }
    }

    // E. CREAR PLANEAMIENTOS (ESPECÍFICOS PARA SU MATERIA)
    // Inyectamos 5 planes por profesor para que no entren en blanco
    for (let p = 1; p <= 5; p++) {
        const task = TASK_MENU[Math.floor(Math.random() * TASK_MENU.length)];
        const project = PROJECT_MENU[Math.floor(Math.random() * PROJECT_MENU.length)];
        
        await prisma.lessonPlan.create({
            data: {
                title: `Plan ${t.specialty}: Unidad ${p}`,
                subject: t.specialty,
                level: t.context === "PRIMARIA" ? "4to Grado" : "10mo",
                status: "PUBLISHED",
                userId: user.id,
                content: {
                    status: "success",
                    meta: { generated_for: t.email, context: t.context },
                    administrative: { docente: t.name, asignatura: t.specialty },
                    planning_module: {
                        learning_outcome: `Dominio de contenidos de la Unidad ${p} en ${t.specialty}.`,
                        mediation: [
                            { moment: "1. CONEXIÓN", activity: "Actividad rompehielo relacionada al tema.", dua_variant: "Visual" },
                            { moment: "2. COLABORACIÓN", activity: "Trabajo en equipos base.", technique: "Cooperative Learning" },
                            { moment: "3. CONSTRUCCIÓN", activity: `Desarrollo de ${task.title}.`, evidence_type: task.type, ui_render_hint: "Checklist" },
                            { moment: "4. CLARIFICACIÓN", activity: "Cierre cognitivo.", technique: "Sondeo" }
                        ],
                        evaluation_system: {
                            short_task: { title: task.title, description: task.desc, value: "10%" },
                            project: { title: project.title, phases: project.phases, value: "30%" },
                            daily_work: { 
                                title: "Trabajo Cotidiano", 
                                rubric: [{ indicator: `Desempeño en ${t.specialty}`, levels: { high: "3", mid: "2", low: "1" } }] 
                            }
                        }
                    }
                }
            }
        });
    }
    console.log(`   ✅ Contratado: ${t.name} (${t.context}) -> ${groupCount} Grupos, 5 Planes.`);
  }

  console.log("\n👥 STAFFING COMPLETADO. TODOS LOS PROFESORES TIENEN CARGA ASIGNADA.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());