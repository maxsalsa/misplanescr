/**
 * 🌪️ PEDAGOGICAL STRESS TEST (AULA SOBERANA)
 * Injects 30 Students to test the Spectrum Engine's limits.
 * Distribution: 5 AD, 3 TEA, 2 Anxiety, 2 Vision, 18 Standard.
 */
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("🌪️ INITIATING STRESS TEST: AULA SOBERANA...");

    // 1. Setup Environment (School & Teacher)
    const school = await prisma.institution.upsert({
        where: { code: "STRESS-TEST-001" },
        update: {},
        create: {
            name: "Liceo Experimental Soberano",
            code: "STRESS-TEST-001",
            modality: "ACADEMICA",
            educationalLevel: "SECUNDARIA",
            subscriptionPlan: "ENTERPRISE"
        }
    });

    const pwd = await hash("123456", 10);
    const teacher = await prisma.user.upsert({
        where: { email: "profe.stress@mep.go.cr" },
        update: {},
        create: {
            email: "profe.stress@mep.go.cr",
            password: pwd,
            name: "Profesor Auditor",
            role: "DOCENTE",
            institutionId: school.id
        }
    });

    // 2. Define Cohorts
    const cohorts = [
        { type: 'ALTA_DOTACION', count: 5, specs: { conditions: ['ALTA_DOTACION'], talents: ['Robótica', 'Debate'], notes: "Requiere Mentoría Nivel 4" } },
        { type: 'TEA', count: 3, specs: { conditions: ['TEA'], needsAccess: true, notes: "Requiere Minimalismo Cognitivo" } },
        { type: 'ANSIEDAD', count: 2, specs: { conditions: ['ANSIEDAD'], anxietyLevel: 'HIGH', notes: "Requiere Rampa de Éxito" } },
        { type: 'BAJA_VISION', count: 2, specs: { conditions: ['BAJA_VISION'], visionNeeds: 'HIGH_CONTRAST', notes: "Requiere Formato Accesible" } },
        { type: 'ESTANDAR', count: 18, specs: { conditions: [], notes: "Perfil Base MEP" } }
    ];

    // 3. Inject Students
    let totalInjected = 0;

    for (const cohort of cohorts) {
        for (let i = 0; i < cohort.count; i++) {
            const studentEmail = `student.${cohort.type.toLowerCase()}.${i + 1}@mep.go.cr`;

            const student = await prisma.user.upsert({
                where: { email: studentEmail },
                update: {},
                create: {
                    email: studentEmail,
                    password: pwd,
                    name: `Estudiante ${cohort.type} ${i + 1}`,
                    role: "ESTUDIANTE",
                    institutionId: school.id
                }
            });

            // Create NeuroProfile
            await prisma.neuroProfile.upsert({
                where: { userId: student.id },
                update: { ...cohort.specs },
                create: {
                    userId: student.id,
                    ...cohort.specs
                }
            });
            totalInjected++;
        }
    }

    console.log(`✅ AULA SOBERANA POPULATED: ${totalInjected} Students.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
