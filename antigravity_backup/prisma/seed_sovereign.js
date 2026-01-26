import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🦅 INITIATING SOVEREIGN SEED PROTOCOL (KAIZEN 12.0)...');

    // 1. INSTITUTION (CENTER OF EXCELLENCE)
    const inst = await prisma.institution.upsert({
        where: { code: 'REP-SOBERANA-01' },
        update: {},
        create: {
            name: 'Liceo de Excelencia Soberana',
            code: 'REP-SOBERANA-01',
            modality: 'ACADÉMICA',
            masterToken: 'TOKEN-SOBERANO',
            regionalDirection: 'San José Norte',
            subscriptionPlan: 'ENTERPRISE'
        }
    });

    // 2. TEACHER (THE GOVERNOR USER)
    const password = await hash('admin123', 10);
    const teacher = await prisma.user.upsert({
        where: { email: 'gobernador@aulaplanea.com' },
        update: {},
        create: {
            email: 'gobernador@aulaplanea.com',
            name: 'Profe. Soberano',
            role: 'DOCENTE',
            institutionId: inst.id,
            specialty: 'Multidisciplinar',
            passwordHash: password
        }
    });

    // 3. MASTER PROFILES (NEURO-SPECTRUM)

    // A. ALEJANDRO (Alta Dotación)
    const alejandro = await prisma.user.create({
        data: {
            name: "Alejandro M.",
            email: "alejandro.ad@mep.local",
            role: "ESTUDIANTE",
            institutionId: inst.id,
            neuroProfile: {
                create: {
                    hasDiagnosis: true,
                    conditions: ["ALTA_DOTACION"],
                    talents: ["Robótica", "Pensamiento Lógico-Matemático"],
                    notes: "Requiere Reto Dijkstra. Se aburre con repetición."
                }
            }
        }
    });
    console.log("✅ Profile Inception: Alejandro (Alta Dotación)");

    // B. VALENTINA (TEA Nivel 1)
    const valentina = await prisma.user.create({
        data: {
            name: "Valentina R.",
            email: "valentina.tea@mep.local",
            role: "ESTUDIANTE",
            institutionId: inst.id,
            neuroProfile: {
                create: {
                    hasDiagnosis: true,
                    conditions: ["TEA"],
                    needsAccess: true, // Apoyo Visual
                    notes: "Sensibilidad al ruido visual. Requiere formato Atkinson."
                }
            }
        }
    });
    console.log("✅ Profile Inception: Valentina (TEA - Acceso)");

    // C. SEBASTIÁN (TDAH / Ansiedad)
    const sebastian = await prisma.user.create({
        data: {
            name: "Sebastián G.",
            email: "sebastian.tdah@mep.local",
            role: "ESTUDIANTE",
            institutionId: inst.id,
            neuroProfile: {
                create: {
                    hasDiagnosis: true,
                    conditions: ["TDAH", "ANSIEDAD"],
                    needsNonSignif: true, // Tiempo / Estructura
                    notes: "Requiere andamiaje emocional y validación temprana."
                }
            }
        }
    });
    console.log("✅ Profile Inception: Sebastián (TDAH - Andamiaje)");

    // D. LUCÍA (Estándar - Control)
    const lucia = await prisma.user.create({
        data: {
            name: "Lucía B.",
            email: "lucia.std@mep.local",
            role: "ESTUDIANTE",
            institutionId: inst.id
            // No NeuroProfile implies Standard
        }
    });
    console.log("✅ Profile Inception: Lucía (Control)");

    console.log('🏁 SOVEREIGN SEED COMPLETE. NEURO-SPECTRUM ACTIVE.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
