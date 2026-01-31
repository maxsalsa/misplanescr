const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- LÓGICA DE CURADURÍA DIGITAL ---

function getDigitalPack(materia) {
    const m = materia.toLowerCase();
    
    // 1. PACK CIENCIAS (BIOLOGÍA/QUÍMICA/FÍSICA)
    if (m.includes("ciencias") || m.includes("bio") || m.includes("quím")) {
        return {
            ppt: {
                titulo: "Presentación: Procesos Vitales",
                slides: [
                    { t: "Introducción", b: ["Definición", "Importancia"] },
                    { t: "Fases del Proceso", b: ["Fase 1: Entrada", "Fase 2: Reacción", "Fase 3: Producto"] },
                    { t: "Conclusiones", b: ["Impacto en la vida diaria", "Ejemplos reales"] }
                ]
            },
            video: { tema: "Experimento Virtual", query: "Laboratorio Virtual MEP Ciencias" },
            imagen: "Diagrama de Flujo de Energía",
            repaso: "Trivia de Conceptos Científicos"
        };
    }

    // 2. PACK MATEMÁTICAS
    if (m.includes("mate")) {
        return {
            ppt: {
                titulo: "Presentación: Estrategias de Resolución",
                slides: [
                    { t: "El Problema", b: ["Datos", "Incógnita"] },
                    { t: "El Modelo", b: ["Fórmula", "Planteo"] },
                    { t: "La Solución", b: ["Cálculo", "Verificación"] }
                ]
            },
            video: { tema: "Tutorial Paso a Paso", query: "Profe Alex Matematicas MEP" }, // Referencia popular confiable
            imagen: "Mapa Mental de Fórmulas",
            repaso: "Reto de Cálculo Mental"
        };
    }

    // 3. PACK SOCIALES/CÍVICA
    if (m.includes("sociales") || m.includes("cívica") || m.includes("historia")) {
        return {
            ppt: {
                titulo: "Presentación: Contexto Histórico",
                slides: [
                    { t: "Antecedentes", b: ["Causas políticas", "Causas económicas"] },
                    { t: "El Evento", b: ["Fechas clave", "Personajes"] },
                    { t: "Consecuencias", b: ["Impacto actual", "Reflexión"] }
                ]
            },
            video: { tema: "Documental Corto", query: "Historia de Costa Rica Animada" },
            imagen: "Línea de Tiempo Interactiva",
            repaso: "Quiz de Hechos Históricos"
        };
    }

    // 4. PACK TÉCNICO
    if (m.includes("técnica") || m.includes("taller")) {
        return {
            ppt: {
                titulo: "Presentación: Procedimiento Técnico",
                slides: [
                    { t: "Seguridad", b: ["EPP necesario", "Normas"] },
                    { t: "Herramientas", b: ["Lista de equipo", "Calibración"] },
                    { t: "Paso a Paso", b: ["Ejecución", "Acabado"] }
                ]
            },
            video: { tema: "Demostración Práctica", query: "Tutorial Técnico Industrial" },
            imagen: "Esquema de Despiece (Exploded View)",
            repaso: "Simulación de Fallas"
        };
    }

    // 5. PACK GENÉRICO (OTROS)
    return {
        ppt: {
            titulo: "Presentación: Conceptos Clave",
            slides: [{ t: "Idea Principal", b: ["Detalle A", "Detalle B"] }]
        },
        video: { tema: "Video Explicativo", query: "Video Educativo MEP" },
        imagen: "Infografía Resumen",
        repaso: "Juego de Preguntas"
    };
}

async function main() {
    console.log("🔥 PROMETHEUS: INYECTANDO INTELIGENCIA AUDIOVISUAL...");

    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!admin) { console.log("⚠️ Sin Admin."); return; }

    const subjects = await prisma.subject.findMany();
    console.log(`   -> Digitalizando ${subjects.length} Asignaturas...`);

    let count = 0;

    for (const sub of subjects) {
        const pack = getDigitalPack(sub.name);

        // A. PRESENTACIÓN (PPT) ESTRUCTURADA
        // Simulamos un archivo PPT que el frontend renderizaría como carrusel
        await prisma.assessment.create({
            data: {
                title: `Recurso Visual: ${pack.ppt.titulo}`,
                type: "OTRO", // Frontend: Render as Slide Deck
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    tipo_recurso: "PRESENTACION",
                    slides: pack.ppt.slides,
                    formato: "Visor Interactivo / PDF Descargable"
                }
            }
        });

        // B. VIDEO TUTORIAL (CURADURÍA)
        // Generamos un link de búsqueda inteligente para garantizar resultados
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(pack.video.query + " " + sub.name)}`;
        
        await prisma.assessment.create({
            data: {
                title: `Video Tutorial: ${pack.video.tema}`,
                type: "OTRO", // Frontend: Render as Video Card
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    tipo_recurso: "VIDEO",
                    url_referencia: searchUrl,
                    guia_observacion: ["¿Cuál es la idea central?", "¿Qué pasos menciona?", "Anote 3 palabras clave"],
                    duracion_estimada: "5-10 min"
                }
            }
        });

        // C. REPASO GAMIFICADO (AUTO-APRENDIZAJE)
        await prisma.assessment.create({
            data: {
                title: `Auto-Repaso: ${pack.repaso}`,
                type: "DIAGNOSTICO",
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    modo: "Juego (Gamified)",
                    preguntas: 10,
                    feedback_inmediato: true,
                    instruccion: "Estudiante: Realice este repaso las veces que necesite."
                }
            }
        });

        // D. RECURSO GRÁFICO (IMAGEN/INFOGRAFÍA)
        await prisma.assessment.create({
            data: {
                title: `Gráfico de Apoyo: ${pack.imagen}`,
                type: "OTRO",
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    tipo_recurso: "IMAGEN",
                    descripcion: "Material de apoyo visual para proyectar.",
                    resolucion: "Alta Calidad"
                }
            }
        });

        count += 4;
        if (count % 25 === 0) process.stdout.write("🎥");
    }

    console.log(`\n\n✅ PROTOCOLO PROMETHEUS FINALIZADO.`);
    console.log(`   🌟 Se inyectaron ${count} Recursos Digitales.`);
    console.log(`   🌟 Incluye: Estructuras de PPT, Links de Video Inteligentes e Imágenes.`);
    console.log(`   🌟 Enfoque: Aula Invertida (El estudiante puede repasar solo).`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());