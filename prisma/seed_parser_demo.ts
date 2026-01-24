
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🟠 INICIANDO PARSER CURRICULAR (DEMO)...')

    /**
     * EJEMPLO DEL PROMPT 3:
     * "Unidad: La Célula. Tiempo: 4 Lecciones. Indicador: Identifica las partes de la célula."
     */

    console.log('📥 Procesando: Unidad "La Célula"...')

    // 1. Crear/Buscar la Unidad (CurriculumMap)
    const unidad = await prisma.curriculumMap.upsert({
        where: { mncCode: 'CN-BIO-CELULA' }, // Code inventado para demo
        update: {},
        create: {
            mncCode: 'CN-BIO-CELULA',
            subject: 'Ciencias',
            level: 'General',
            unitTitle: 'La Célula',
        }
    })

    // 2. Crear el Resultado de Aprendizaje (LearningOutcome)
    // (El prompt simplifica directo a indicador, pero nuestra arquitectura Titanium exige coherencia)
    const outcome = await prisma.learningOutcome.create({
        data: {
            curriculumId: unidad.id,
            description: 'Comprender la estructura celular básica.',
        }
    })

    // 3. Crear el Indicador con Tiempo (Indicator)
    const indicador = await prisma.indicator.create({
        data: {
            outcomeId: outcome.id,
            description: 'Identifica las partes de la célula',
            estimatedLessons: 4, // <--- EL DATO CRÍTICO DEL PROMPT
        }
    })

    console.log(`✅ Indicador creado: "${indicador.description}" (${indicador.estimatedLessons} lecciones)`)

    // 4. Generar Actividad Sugerida (EvaluationActivity)
    // "Estrategia de Mediación" -> Cotidiano
    // Necesitamos un grupo dummy para atarlo, o dejarlo como "Template" (Future implementat: Templates)
    // Para este seed, lo atamos a una Institución Demo de Curriculum

    // (Skipping Activity creation here as it requires a specific Group context in current Schema, 
    //  but the DB is ready to accept it when a teacher selects this Indicator)

    console.log('🟠 PARSEADO EXITOSO. SISTEMA LISTO PARA TEXTO MASIVO.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
