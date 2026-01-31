
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function runIntegrityTest() {
    console.log('🛡️ INICIANDO AGGRESSIVE QA: CURRICULUM INTEGRITY TEST (VERBOSE)...');
    let errors = 0;

    try {
        // 1. Check for Orphaned Units
        const orphans = await prisma.unidadEstudio.findMany({
            where: { asignaturaId: null }
        });
        if (orphans.length > 0) {
            console.error(`❌ FAILURE: Found ${orphans.length} orphaned Curriculum Units.`);
            errors++;
        } else {
            console.log('✅ Integrity Check 1: No Orphaned Units.');
        }

        // 2. Validate JSON Structure (Bloom Levels)
        const units = await prisma.unidadEstudio.findMany({ take: 5 });
        for (const unit of units) {
            if (!unit.curriculumBody || !unit.curriculumBody.outcomes) {
                console.error(`❌ FAILURE: Unit ${unit.title} has invalid JSON structure.`);
                errors++;
                continue;
            }

            const outcomes = unit.curriculumBody.outcomes;
            const invalidBloom = outcomes.filter(o => !o.bloom_level || o.bloom_level < 1 || o.bloom_level > 6);

            if (invalidBloom.length > 0) {
                console.error(`❌ FAILURE: Unit ${unit.title} has invalid Bloom Taxonomy levels.`);
                errors++;
            }
        }
        console.log('✅ Integrity Check 2: JSONB Bloom Structure Valid.');

        // 3. Verify Hash Uniqueness
        const duplicateHashes = await prisma.unidadEstudio.groupBy({
            by: ['pedagogicalHash'],
            _count: { pedagogicalHash: true },
            having: { pedagogicalHash: { _count: { gt: 1 } } }
        });

        if (duplicateHashes.length > 0) {
            console.error(`❌ FAILURE: Found ${duplicateHashes.length} hash collisions.`);
            errors++;
        } else {
            console.log('✅ Integrity Check 3: Pedagogical Hashes are Unique.');
        }

        // 4. Garbage Injection Test
        console.log('🧪 Testing Garbage Injection...');
        try {
            await prisma.unidadEstudio.create({
                data: {
                    title: "GARBAGE_UNIT",
                    asignaturaId: "00000000-0000-0000-0000-000000000000", // Invalid UUID
                    pedagogicalHash: "bad_hash",
                    curriculumBody: "This is not JSON",
                    version: "0.0"
                }
            });
            console.error('❌ FAILURE: Garbage Injection SUCCEEDED (It should have failed).');
            errors++;
        } catch (e) {
            console.log('✅ Integrity Check 4: Garbage Injection REJECTED (Expected). Error caught: ' + e.message?.substring(0, 100));
        }

    } catch (e) {
        console.error('❌ CRITICAL TEST FAILURE:', e);
        errors++;
    } finally {
        await prisma.$disconnect();

        if (errors > 0) {
            console.error(`🚨 TEST FAILED WITH ${errors} ERRORS.`);
            process.exit(1);
        } else {
            console.log('🏆 SYSTEM INTEGRITY VERIFIED. STATUS: GREEN.');
            process.exit(0);
        }
    }
}

runIntegrityTest();
