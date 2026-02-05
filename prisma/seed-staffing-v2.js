const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const TEACHERS = [
  { name: "Usuario Prueba", email: "prueba@aulaplan.cr", role: "TESTER", context: "GOD_MODE", specialty: "Gestión Administrativa" }, // CORREGIDO
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

const TASK_MENU = [
  { type: "Digital", title: "Video-Minuto", desc: "Explicar concepto en 60s." },
  { type: "Investigación", title: "Caza de Mitos", desc: "Desmentir 3 mitos del tema." },
  { type: "Práctica", title: "Resolución de Error", desc: "Corregir ejercicio mal resuelto." }
];

const PROJECT_MENU = [
  { title: "Feria de Soluciones", phases: ["Empatizar", "Idear", "Prototipar"] },
  { title: "Revista Digital", phases: ["Editorial", "Redacción", "Diseño"] }
];

async function main() {
  const passwordHash = await bcrypt.hash("123", 10);
  console.log("🏫 INICIANDO CONTRATACIÓN MASIVA (V2)...");

  for (const t of TEACHERS) {
    // 1. GARANTIZAR MATERIA (EL FIX)
    const subjectToUse = t.specialty || "General";

    // A. CREAR USUARIO
    const user = await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        email: t.email, name: t.name, password: passwordHash,
        role: t.context === "GOD_MODE" ? "GOD_TIER" : "DOCENTE"
      }
    });

    // B. ASIGNAR INSTITUCIÓN
    let instType = t.context === "PRIMARIA" ? "ESCUELA" : t.context;
    if (t.context === "GOD_MODE") instType = "LICEO";
    const institution = await prisma.institution.findFirst({ where: { type: instType } });
    if (institution) await prisma.user.update({ where: { id: user.id }, data: { institutionId: institution.id } });

    // C. CREAR GRUPOS
    const groupCount = t.context === "PRIMARIA" ? 1 : 4;
    for (let i = 1; i <= groupCount; i++) {
        const level = t.context === "PRIMARIA" ? "4to Grado" : (t.context === "CINDEA" ? "II Nivel" : "10mo");
        const groupName = `Sección ${i} (${subjectToUse})`;
        
        // Upsert grupo para no duplicar si se corre 2 veces
        const group = await prisma.group.create({
            data: {
                name: groupName, grade: level, shift: "DIURNO",
                userId: user.id, institutionId: institution?.id
            }
        });

        // D. LLENAR GRUPO (MATRÍCULA)
        // Solo si está vacío
        const studentCount = await prisma.student.count({ where: { groupId: group.id }});
        if (studentCount === 0) {
            for(let s=0; s<15; s++) {
                await prisma.student.create({
                    data: { name: `Estudiante ${s+1} de ${t.name}`, groupId: group.id }
                });
            }
        }
    }

    // E. CREAR PLANES
    for (let p = 1; p <= 3; p++) {
        const task = TASK_MENU[Math.floor(Math.random() * TASK_MENU.length)];
        const project = PROJECT_MENU[Math.floor(Math.random() * PROJECT_MENU.length)];
        const title = `Plan ${subjectToUse}: Unidad ${p} (Staff)`;

        const exists = await prisma.lessonPlan.findFirst({ where: { title, userId: user.id } });
        if (!exists) {
            await prisma.lessonPlan.create({
                data: {
                    title, subject: subjectToUse, level: "10mo", status: "PUBLISHED", userId: user.id,
                    content: {
                        status: "success",
                        meta: { context: t.context },
                        administrative: { docente: t.name, asignatura: subjectToUse },
                        planning_module: {
                            learning_outcome: `Dominio de ${subjectToUse}.`,
                            mediation: [{ moment: "1. CONEXIÓN", activity: "Actividad inicial.", dua_variant: "Visual" }],
                            evaluation_system: {
                                short_task: { title: task.title, description: task.desc, value: "10%" },
                                project: { title: project.title, phases: project.phases, value: "30%" },
                                daily_work: { title: "Cotidiano", rubric: [{ indicator: "Participación", levels: { high: "3", mid: "2", low: "1" } }] }
                            }
                        }
                    }
                }
            });
        }
    }
    console.log(`   ✅ Contratado: ${t.name} -> ${subjectToUse}`);
  }
  console.log("\n👥 STAFFING V2 COMPLETADO CON ÉXITO.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());