// UBICACIÓN: scripts/db_seed.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
// Ruta donde están los JSONs generados
const DATA_DIR = path.join(__dirname, '../prisma/seeds/data');

async function main() {
  console.log("🏭 INICIANDO CARGA A LA NUBE (NEON DB)...");
  
  // Verificación de seguridad
  if (!fs.existsSync(DATA_DIR)) {
    console.error("❌ ERROR: No existe la carpeta de datos. ¿Ejecutó el script de Python?");
    return;
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  console.log(`📦 Encontré ${files.length} archivos de planeamiento listos para subir.`);

  if (files.length === 0) {
    console.log("⚠️ LA CARPETA ESTÁ VACÍA. Revise si el script de Python generó algo.");
    return;
  }

  for (const file of files) {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
    
    try {
      const jsonContent = JSON.parse(raw);
      // Adaptador inteligente para leer cualquier formato
      const data = jsonContent.data || jsonContent; 
      const asignatura = jsonContent.meta_asignatura || data.asignatura || "General";
      const nivel = jsonContent.meta_nivel || data.nivel || "General";

      console.log(`🔹 Procesando: ${asignatura} - ${nivel}`);

      // 1. Crear Familia (Asignatura)
      const family = await prisma.curriculumFamily.upsert({
        where: { name: asignatura },
        update: {},
        create: { name: asignatura }
      });

      // 2. Crear Nivel
      const levelRec = await prisma.curriculumLevel.create({
        data: { name: nivel, familyId: family.id }
      });

      // 3. Crear Unidades e Indicadores
      if (data.units) {
        for (const u of data.units) {
          const unit = await prisma.curriculumUnit.create({
            data: { title: u.title || "Unidad Sin Título", levelId: levelRec.id }
          });

          if (u.outcomes) {
            for (const o of u.outcomes) {
              const outcome = await prisma.learningOutcome.create({
                data: { description: o.desc || "Resultado", unitId: unit.id }
              });

              if (o.indicators) {
                for (const i of o.indicators) {
                  const ind = await prisma.indicator.create({
                    data: { description: i.desc || "Indicador", outcomeId: outcome.id }
                  });

                  if (i.activity) {
                    await prisma.activityTemplate.create({
                      data: {
                        indicatorId: ind.id,
                        title: i.activity.title || "Actividad Sugerida",
                        type: i.activity.type || 'COTIDIANO',
                        dualStrategyTDAH: i.activity.dua_strategy || "Adaptación General",
                        rubricL3: i.activity.rubric_high,
                        rubricL1: i.activity.rubric_low
                      }
                    });
                  }
                }
              }
            }
          }
        }
      }
      console.log(`✅ EXITO: ${file} subido a la nube.`);
    } catch (e) {
      console.error(`❌ Error en archivo ${file}:`, e.message);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());