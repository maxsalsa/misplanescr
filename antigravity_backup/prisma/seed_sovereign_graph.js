
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// 🔱 KAIZEN 42.0: THE OMNI-INJECTION
// Reads the Official Catalog and constructs the entire MEP Skeleton in Neon.

const CATALOGO_PATH = path.join(process.cwd(), 'public', 'catalogo_mep.json');

function createHash(data) {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

function cleanName(filename) {
    // Removes .pdf, dates, digits at end if generic
    return filename.replace('.pdf', '').replace(/[\d\-_]+$/, '').replace(/_/g, ' ').replace(/\(.*\)/, '').trim();
}

async function main() {
    console.log('🌌 INICIANDO OMNI-DATA INJECTION (KAIZEN 42)...');

    // 1. Load Catalog (FIXED: BOM REMOVAL)
    const rawData = fs.readFileSync(CATALOGO_PATH, 'utf-8').replace(/^\uFEFF/, '');
    const catalogo = JSON.parse(rawData);

    const modalities = catalogo.modalidades;

    // 2. Iterate Modalities
    for (const [modKey, levels] of Object.entries(modalities)) {
        let modName = modKey;
        if (modKey === "ACADEMICO") modName = "Secundaria Académica";
        if (modKey === "TECNICO_CTP") modName = "Educación Técnica (CTP)";
        if (modKey === "I_CICLO") modName = "I Ciclo"; // Usually nested, but let's handle top roots
        if (modKey === "II_CICLO") modName = "II Ciclo";
        if (modKey === "III_CICLO") modName = "III Ciclo";

        const modalidadDB = await prisma.modalidad.upsert({
            where: { name: modName },
            update: {},
            create: { name: modName }
        });
        console.log(`🏛️  Modalidad: ${modName}`);

        // 3. Iterate Levels
        for (const [lvlKey, subjects] of Object.entries(levels)) {
            // Flatten nested keys if any (like "ESPECIAL")
            if (typeof subjects !== 'object') continue;

            let lvlName = lvlKey;
            if (lvlKey === "I_CICLO") lvlName = "I Ciclo";
            if (lvlKey === "II_CICLO") lvlName = "II Ciclo";
            if (lvlKey === "III_CICLO") lvlName = "III Ciclo";
            if (lvlKey === "10") lvlName = "Décimo Año";
            if (lvlKey === "11") lvlName = "Undécimo Año";
            if (lvlKey === "12") lvlName = "Duodécimo Año";

            if (lvlName === "OTROS") continue; // Skip generic container for now if desired

            const nivelDB = await prisma.nivel.findFirst({
                where: { name: lvlName, modalidadId: modalidadDB.id }
            }) || await prisma.nivel.create({
                data: { name: lvlName, order: 1, modalidadId: modalidadDB.id }
            });

            // 4. Iterate Subjects (Files)
            let count = 0;
            for (const [subjectKey, fileData] of Object.entries(subjects)) {
                if (subjectKey === "ESPECIAL") continue; // Skip recursive key if it is not a subject
                const cleanedSubject = cleanName(subjectKey);

                const subjectDB = await prisma.asignatura.findFirst({
                    where: { name: cleanedSubject, nivelId: nivelDB.id }
                }) || await prisma.asignatura.create({
                    data: { name: cleanedSubject, nivelId: nivelDB.id }
                });

                // 5. Inject Placeholder Unit (The Skeleton)
                const hash = createHash({ s: cleanedSubject, l: lvlName, v: "skeleton" });

                await prisma.unidadEstudio.upsert({
                    where: { pedagogicalHash: hash },
                    update: { isActive: true },
                    create: {
                        title: `Unidad General: ${cleanedSubject}`,
                        asignaturaId: subjectDB.id,
                        pedagogicalHash: hash,
                        // Generic JSONB - The User can edit this in /superadmin
                        curriculumBody: {
                            outcomes: [
                                { description: "Aprendizaje Fundamental del Programa Oficial.", indicators: ["Indicador General 1", "Indicador General 2"], bloom_level: 3 }
                            ],
                            duration: "Anual / Semestral"
                        },
                        apoyosSugeridos: { dua: true },
                        version: "2026.SKELETON"
                    }
                });

                count++;
            }
            process.stdout.write(`   └─ ${lvlName}: ${count} subjects injected.\n`);
        }
    }

    // 3. DEMO ENVIRONMENT (DOCENTE + STUDENTS) RE-INJECTION
    console.log('🧪 Refreshing Demo Environment...');
    const institution = await prisma.institution.findFirst() || await prisma.institution.create({
        data: { name: "CTP de Prueba", regional: "San José Norte" }
    });

    const group = await prisma.group.findFirst({ where: { section: "4-1" } }) || await prisma.group.create({
        data: {
            name: "Sección 4-1 (Demo)",
            section: "4-1",
            level: "Cuarto",
            institutionId: institution.id,
            year: 2026
        }
    });

    console.log('✨ OMNI-INJECTION COMPLETE. TOTAL SOVEREIGNTY.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
