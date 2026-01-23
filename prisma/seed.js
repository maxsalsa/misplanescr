import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const NAMES = ["Sofía", "Valentina", "Isabella", "Camila", "Valeria", "Mariana", "Gabriela", "Sara", "Victoria", "Daniela", "Mateo", "Santiago", "Sebastián", "Leonardo", "Matías", "Emiliano", "Diego", "Daniel", "Samuel", "Alejandro"];
const SURNAMES = ["Rodríguez", "González", "Hernández", "López", "Ramírez", "Pérez", "Jiménez", "Sánchez", "Vargas", "Mora", "Rojas", "Araya", "Quesada", "Castro", "Cordero"];

function getRandomName() {
    return `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${SURNAMES[Math.floor(Math.random() * SURNAMES.length)]} ${SURNAMES[Math.floor(Math.random() * SURNAMES.length)]}`;
}

async function main() {
    console.log('🚀 INYECCIÓN MASIVA: PROTOCOLO SUIZO (200 PAX)');

    // 1. INSTITUCIONES DE LITE A PRO
    // Usamos upsert para evitar errores de duplicidad si se corre X veces
    const ctp = await prisma.institution.upsert({
        where: { code: 'CTP-HER-01' },
        update: {},
        create: {
            name: 'CTP de Heredia (Técnico)',
            code: 'CTP-HER-01',
            modality: 'TÉCNICA',
            masterToken: 'TOKEN-CTP-26',
            regionalDirection: 'Heredia',
            subscriptionPlan: 'ENTERPRISE',
            licenseSlots: 50
        }
    });

    const escuela = await prisma.institution.upsert({
        where: { code: 'ESC-RUR-02' },
        update: {},
        create: {
            name: 'Escuela Unidocente La Fortuna',
            code: 'ESC-RUR-02',
            modality: 'RURAL',
            masterToken: 'TOKEN-RUR-26',
            regionalDirection: 'San Carlos',
            subscriptionPlan: 'FREE'
        }
    });

    const nocturno = await prisma.institution.upsert({
        where: { code: 'LIC-NOC-03' },
        update: {},
        create: {
            name: 'Liceo Nocturno de Cartago',
            code: 'LIC-NOC-03',
            modality: 'NOCTURNA',
            masterToken: 'TOKEN-NOC-26',
            regionalDirection: 'Cartago',
            subscriptionPlan: 'PREMIUM',
            licenseSlots: 100
        }
    });

    // 2. DOCENTES (Guias y Materia)
    const password = await hash('123456', 10);

    // Super Admin
    await prisma.user.upsert({
        where: { email: 'admin@aulaplanea.com' },
        update: {},
        create: { email: 'admin@aulaplanea.com', name: 'Lic. Max Salazar', role: 'SUPER_ADMIN', passwordHash: password }
    });

    const teacherData = [
        { name: 'Profe. Carlos (Guía 10-1)', email: 'carlos@mep.go.cr', inst: ctp.id, role: 'DOCENTE', spec: 'Informática' },
        { name: 'Profe. Maria (Rural)', email: 'maria@mep.go.cr', inst: escuela.id, role: 'DOCENTE', spec: 'General' },
        { name: 'Profe. Jorge (Noct)', email: 'jorge@mep.go.cr', inst: nocturno.id, role: 'DOCENTE', spec: 'Mate' }
    ];

    const teachers = [];
    for (const t of teacherData) {
        const user = await prisma.user.upsert({
            where: { email: t.email },
            update: {},
            create: {
                email: t.email, name: t.name, role: t.role,
                institutionId: t.inst, specialty: t.spec,
                professionalId: `ID-${Math.floor(Math.random() * 9000) + 1000}`,
                passwordHash: password
            }
        });
        teachers.push(user);
    }

    // 3. ESTRUCTURA ACADÉMICA (Grupos y Estudiantes)
    const groupConfigs = [
        { name: '10-1', inst: ctp.id, spec: 'Desarrollo Software', count: 30, teacher: teachers[0] }, // CTP Large
        { name: '10-2', inst: ctp.id, spec: 'Electrónica', count: 25, teacher: teachers[0] },
        { name: '11-1', inst: ctp.id, spec: 'Ejecutivo', count: 25, teacher: teachers[0] },
        { name: 'G-UNICO', inst: escuela.id, spec: 'Primaria', count: 15, teacher: teachers[1] },
        { name: '7-NOC', inst: nocturno.id, spec: 'Académico', count: 40, teacher: teachers[2] },
        { name: '8-NOC', inst: nocturno.id, spec: 'Académico', count: 35, teacher: teachers[2] }
    ];

    console.log("🏫 Creando Arquitectura Escolar...");

    for (const gc of groupConfigs) {
        const group = await prisma.group.create({
            data: {
                name: gc.name, section: gc.name, specialty: gc.spec,
                level: 'Nivel X', institutionId: gc.inst
            }
        });

        // Gradebook for this group
        const gradebook = await prisma.gradeBook.create({
            data: {
                teacherId: gc.teacher.id,
                groupId: group.id,
                subject: gc.spec,
                period: 'I PERIODO',
                weights: { daily: 45, exams: 30, assignments: 25 }
            }
        });

        console.log(`  -> Grupo ${gc.name} (${gc.count} est)`);

        // Students Injection
        for (let i = 0; i < gc.count; i++) {
            const sName = getRandomName();
            const sEmail = `est.${gc.name}.${i}@mep.local`;

            const student = await prisma.user.create({
                data: {
                    name: sName,
                    email: sEmail,
                    role: 'ESTUDIANTE',
                    institutionId: gc.inst,
                    groups: { connect: { id: group.id } }
                }
            });

            // 4. MÓDULO CONDUCTA & GUÍA (Randomly assigned issues)
            // 20% Chance of Conduct Issue
            if (Math.random() < 0.2) {
                const severity = Math.random() > 0.7 ? 'GRAVE' : 'LEVE';
                const points = severity === 'GRAVE' ? -10 : -5;

                await prisma.conductReport.create({
                    data: {
                        studentId: student.id,
                        teacherId: gc.teacher.id,
                        type: severity,
                        points: points,
                        description: severity === 'GRAVE' ? 'Falta de respeto a la autoridad.' : 'Uso de celular en clase.'
                    }
                });

                // Guide Follow-up Log
                if (severity === 'GRAVE') {
                    await prisma.guideLog.create({
                        data: {
                            studentId: student.id,
                            teacherId: gc.teacher.id,
                            type: 'PARENT_INTERVIEW',
                            content: `Se cita al encargado legal por falta grave.`,
                            agreements: 'Se firma carta de compromiso conductual.'
                        }
                    });
                }
            }

            // 5. EVALUACIÓN (Grades)
            await prisma.gradeEntry.create({
                data: {
                    gradebookId: gradebook.id,
                    studentId: student.id,
                    category: 'TRABAJO_COTIDIANO',
                    score: Math.floor(Math.random() * (100 - 60) + 60) // 60-100 random
                }
            });

            await prisma.gradeEntry.create({
                data: {
                    gradebookId: gradebook.id,
                    studentId: student.id,
                    category: 'EXAMEN_1',
                    score: Math.floor(Math.random() * (100 - 50) + 50)
                }
            });

        }
    }

    console.log('🏁 INYECCIÓN FINALIZADA (STRESS TEST REALSED)');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
