const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Carpetas a ignorar para no leer basura
const IGNORE_DIRS = ["node_modules", ".next", ".git", "prisma", "public"];

// Función para recorrer carpetas recursivamente
function findJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        findJsonFiles(filePath, fileList);
      }
    } else {
      // Buscamos archivos JSON que NO sean de configuración (package.json, etc)
      if (file.endsWith(".json") && !file.startsWith("package") && !file.startsWith("tsconfig")) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

async function main() {
  console.log("   🔍 Escaneando directorios en busca de 'oros' curriculares...");
  
  const rootDir = process.cwd(); // Carpeta actual
  const jsonFiles = findJsonFiles(rootDir);
  
  console.log(`   📂 Se encontraron ${jsonFiles.length} archivos JSON potenciales.`);

  if (jsonFiles.length === 0) {
    console.log("   ⚠️ No se encontraron archivos de datos. Asegúrese de que la carpeta 'MEP_ORDENADO' esté dentro del proyecto.");
    return;
  }

  // Limpiamos base de datos para evitar duplicados (Opcional, si quiere agregar, comente esto)
  // await prisma.syllabus.deleteMany(); 

  let count = 0;

  for (const file of jsonFiles) {
    try {
        const content = fs.readFileSync(file, "utf-8");
        const data = JSON.parse(content);
        
        // Verificamos si es un array o un objeto
        const items = Array.isArray(data) ? data : [data];
        
        for (const item of items) {
            // DETECTOR DE CONTENIDO VALIOSO
            // Buscamos campos comunes que usen sus scripts anteriores
            const asignatura = item.asignatura || item.subject || item.materia || item.specialty;
            const nivel = item.nivel || item.level || "Sin Nivel";
            const unidad = item.unidad || item.unit || item.bloque || "General";
            
            // TRIVIAS Y JUEGOS: Si el JSON tiene estos campos, los metemos en la descripción
            let topic = item.ra || item.topic || item.resultado || item.contenido || "Contenido General";
            
            const extras = [];
            if (item.trivias) extras.push(`🎲 Trivias: ${JSON.stringify(item.trivias)}`);
            if (item.juegos) extras.push(`🎮 Juegos: ${JSON.stringify(item.juegos)}`);
            if (item.dinamicas) extras.push(`🔥 Dinámicas: ${JSON.stringify(item.dinamicas)}`);
            if (item.activities) extras.push(`📝 Actividades: ${JSON.stringify(item.activities)}`);
            
            // Si encontramos extras, los pegamos al tópico para que el profesor (y la IA) los vean.
            if (extras.length > 0) {
                topic += ` || RECURSOS EXTRA: ${extras.join(" | ")}`;
            }

            if (asignatura) {
                await prisma.syllabus.create({
                    data: {
                        modalidad: item.modalidad || "TECNICA", // Asumimos técnica si no dice
                        level: String(nivel),
                        subject: String(asignatura),
                        unit: String(unidad),
                        topic: String(topic), // Aquí va la carnita (RA + Trivias + Juegos)
                        period: "I Periodo"
                    }
                });
                count++;
            }
        }
        console.log(`   ✅ Procesado: ${path.basename(file)}`);
        
    } catch (err) {
        // Ignoramos errores de JSON mal formados
        // console.error(`   ❌ Error leyendo ${path.basename(file)}: ${err.message}`);
    }
  }

  console.log(`   🏆 IMPORTACIÓN FINALIZADA: ${count} registros nuevos cargados.`);
  console.log("      (Incluyendo trivias, juegos y actividades si estaban en los archivos)");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());