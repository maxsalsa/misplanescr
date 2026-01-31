const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CONFIG
const STAGING_DIR = path.join(__dirname, '../data_staging');
// Para demo, usaremos un archivo si existe, o crearemos uno dummy en memoria
const TARGET_FILE = 'biologia.json';

async function ingestProgram() {
    console.log(`🚀 ANTIGRAVITY PRIME INGEST: ADN MEP (mep_programs_core)`);

    try {
        let json;
        const filePath = path.join(STAGING_DIR, TARGET_FILE);

        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, 'utf-8');
            json = JSON.parse(rawData);
        } else {
            console.log("ℹ️  No source file found. Creating DUMMY DNA for validation.");
            json = {
                subject: "Ciencias",
                level: "10",
                units: [
                    {
                        name: "Unidad 1: La Célula",
                        outcomes: [
                            { description: "Analizar la estructura celular", indicators: [{ description: "Identifica partes de la célula" }] }
                        ]
                    }
                ]
            };
        }

        const { subject, level } = json;
        const filename = `${subject}_${level}_OFICIAL.json`.toUpperCase();

        if (!subject) throw new Error("CORRUPT JSON: Missing Vital Fields");

        // 1. INYECCIÓN EN NÚCLEO (mep_programs_core)
        // Usamos el modelo V4 real: mep_programs_core
        const record = await prisma.mep_programs_core.upsert({
            where: {
                id: 0, // Hack para findFirst logic si no hay unique key clara, pero mejor buscamos por filename
            },
            update: {}, // Placeholder
            create: {
                filename: filename,
                subject: subject,
                structure_json: json,
                raw_text: JSON.stringify(json), // Backup raw
                status: "ACTIVE",
                last_deep_scan: new Date()
            }
        });

        // CORRECCIÓN: Como no hay unique constraint en filename, usamos deleteMany + create para evitar duples O findFirst
        const existing = await prisma.mep_programs_core.findFirst({
            where: { filename: filename }
        });

        if (existing) {
            await prisma.mep_programs_core.update({
                where: { id: existing.id },
                data: {
                    structure_json: json,
                    last_deep_scan: new Date()
                }
            });
            console.log(`   ✅ ADN Actualizado: ${filename} (ID: ${existing.id})`);
        } else {
            const newRecord = await prisma.mep_programs_core.create({
                data: {
                    filename: filename,
                    subject: subject,
                    structure_json: json,
                    raw_text: JSON.stringify(json),
                    status: "ACTIVE",
                    last_deep_scan: new Date()
                }
            });
            console.log(`   ✅ ADN Inyectado: ${filename} (ID: ${newRecord.id})`);
        }

        console.log("   🛡️  PROTOCOL COMPLETE. DNA SECURED.");

    } catch (e) {
        console.error("   ❌ CRITICAL FAILURE:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

ingestProgram();
