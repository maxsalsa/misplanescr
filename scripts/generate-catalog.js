import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURACIÓN OFICIAL
const ROOT_DIR = path.join(process.cwd(), 'public', 'mep-docs', 'MEP_ORDENADO');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'catalogo-mep.json');

// Estructura Base del Catálogo
const catalog = {
    meta: {
        fecha_generacion: new Date().toISOString(),
        fuente: "MEP_ORDENADO",
        total_archivos: 0,
        version: "1.0.0"
    },
    modalidades: {}
};

/**
 * Función principal de escaneo
 */
function generateCatalog() {
    console.log("🚀 Iniciando Arquitecto de Datos MEP (ESM Mode)...");
    console.log(`📂 Escaneando: ${ROOT_DIR}`);

    if (!fs.existsSync(ROOT_DIR)) {
        console.error("❌ ERROR CRÍTICO: No se encuentra la carpeta MEP_ORDENADO.");
        return;
    }

    // 1. Leer Modalidades (Carpetas de primer nivel)
    const modalidadesDirs = getDirectories(ROOT_DIR);

    modalidadesDirs.forEach(modalidad => {
        console.log(`   📍 Procesando Modalidad: ${modalidad}`);
        catalog.modalidades[modalidad] = {};

        const modPath = path.join(ROOT_DIR, modalidad);
        const nivelesDirs = getDirectories(modPath);

        // 2. Leer Niveles (Carpetas de segundo nivel)
        nivelesDirs.forEach(nivel => {
            catalog.modalidades[modalidad][nivel] = { programas: {} };

            const nivelPath = path.join(modPath, nivel);
            const files = fs.readdirSync(nivelPath).filter(f => f.toLowerCase().endsWith('.pdf'));

            files.forEach(file => {
                // Filtro de Duplicados: Ignorar archivos con (1), (2) o "copia"
                if (file.includes(' (1).') || file.includes(' (2).') || file.includes(' - copia')) {
                    console.log(`      ⚠️ Ignorando duplicado: ${file}`);
                    return;
                }

                // Generar ID limpio
                const rawName = path.basename(file, '.pdf');
                const cleanId = cleanString(rawName) + '_' + cleanString(nivel);

                // Validar existencia real (redundante pero parte del protocolo)
                const fullPath = path.join(nivelPath, file);

                if (fs.existsSync(fullPath)) {
                    // 3. Estructurar Objeto Programa
                    catalog.modalidades[modalidad][nivel].programas[cleanId] = {
                        id: cleanId,
                        nombre: rawName.replace(/_/g, ' '),
                        archivo: file,
                        path_relativo: `/mep-docs/MEP_ORDENADO/${modalidad}/${nivel}/${file}`,
                        area: inferArea(rawName),
                        tipo: inferType(modalidad),
                        modalidad: modalidad,
                        nivel: nivel,
                        last_modified: fs.statSync(fullPath).mtime
                    };
                    catalog.meta.total_archivos++;
                }
            });
        });
    });

    // 4. Guardar JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));
    console.log("✅ Catálogo Generado Exitosamente.");
    console.log(`📄 Archivo guardado en: ${OUTPUT_FILE}`);
    console.log(`📊 Total de documentos indexados: ${catalog.meta.total_archivos}`);
}

// -------------------------------------------------------------
// UTILIDADES (Helpers)
// -------------------------------------------------------------

function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

function cleanString(str) {
    return str.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes
        .replace(/[^a-z0-9]/g, "_") // Reemplazar no alfanuméricos con _
        .replace(/_+/g, "_"); // Evitar ___
}

function inferArea(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('matem')) return 'Matemáticas';
    if (lower.includes('español')) return 'Español';
    if (lower.includes('ingles') || lower.includes('english')) return 'Inglés';
    if (lower.includes('sociales')) return 'Estudios Sociales';
    if (lower.includes('civica')) return 'Educación Cívica';
    if (lower.includes('ciencias') || lower.includes('fisica') || lower.includes('quimica') || lower.includes('biologia')) return 'Ciencias';
    if (lower.includes('informatica') || lower.includes('computo') || lower.includes('redes') || lower.includes('software')) return 'Tecnologia';
    return 'General'; // Default
}

function inferType(modalidad) {
    if (modalidad === 'TECNICO_CTP') return 'Técnica';
    if (modalidad === 'ACADEMICO') return 'Académica';
    return 'Complementaria';
}

// Ejecutar
generateCatalog();
