const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- LA MALLA CURRICULAR TÉCNICA (SIMULACIÓN DE PDFs REALES) ---
const SECTORES = [
    {
        sector: "TIC (Informática)",
        especialidades: [
            { nombre: "Desarrollo de Software", modulos: ["Lógica y Algoritmos", "Programación Web", "Bases de Datos", "Desarrollo Móvil", "Tecnologías en la Nube"] },
            { nombre: "Ciberseguridad", modulos: ["Hacking Ético", "Forense Digital", "Seguridad en Redes", "Normativa ISO 27001"] },
            { nombre: "Redes y Telemática", modulos: ["Enrutamiento y Conmutación", "Cableado Estructurado", "Sistemas Operativos de Red", "IoT"] },
            { nombre: "Inteligencia Artificial", modulos: ["Machine Learning", "Python para Datos", "Visión por Computador"] }
        ]
    },
    {
        sector: "Comercial y Servicios",
        especialidades: [
            { nombre: "Contabilidad", modulos: ["Contabilidad de Costos", "Legislación Tributaria", "Auditoría", "Gestión Financiera"] },
            { nombre: "Banca y Finanzas", modulos: ["Operaciones Bancarias", "Servicio al Cliente", "Riesgo Financiero", "Mercado de Valores"] },
            { nombre: "Ejecutivo para Centros de Servicio", modulos: ["English for Business", "Customer Service", "Tecnología de Oficina", "Protocolo Empresarial"] },
            { nombre: "Secretariado Ejecutivo", modulos: ["Gestión de Documentos", "Redacción Comercial", "Relaciones Humanas"] }
        ]
    },
    {
        sector: "Turismo",
        especialidades: [
            { nombre: "Turismo Ecológico", modulos: ["Historia Natural", "Geografía Turística", "Diseño de Senderos", "Guianza de Grupos"] },
            { nombre: "Alimentos y Bebidas", modulos: ["Manipulación de Alimentos", "Gastronomía Costarricense", "Coctelería", "Montaje de Eventos"] },
            { nombre: "Gestión de Empresas de Hospedaje", modulos: ["Recepción Hotelera", "Ama de Llaves", "Reservas", "Marketing Turístico"] }
        ]
    },
    {
        sector: "Industrial",
        especialidades: [
            { nombre: "Electrónica Industrial", modulos: ["Circuitos DC/AC", "Electrónica Digital", "PLCs y Automatización", "Robótica Industrial"] },
            { nombre: "Electrotecnia", modulos: ["Instalaciones Eléctricas", "Motores y Transformadores", "Seguridad Eléctrica", "Energías Renovables"] },
            { nombre: "Mecánica de Precisión", modulos: ["Torno y Fresado", "CNC", "Metrología", "Diseño CAD/CAM"] },
            { nombre: "Mecánica Automotriz", modulos: ["Motores de Combustión", "Sistemas de Inyección", "Frenos y Suspensión", "Autotrónica"] },
            { nombre: "Dibujo Arquitectónico", modulos: ["Dibujo Técnico", "AutoCAD 2D/3D", "Maquetismo", "Presupuestos de Obra"] }
        ]
    },
    {
        sector: "Salud y Agro",
        especialidades: [
            { nombre: "Agroindustria", modulos: ["Procesamiento de Lácteos", "Cárnicos", "Control de Calidad", "Inocuidad Alimentaria"] },
            { nombre: "Agrojardinería", modulos: ["Manejo de Suelos", "Viveros", "Diseño de Jardines", "Sistemas de Riego"] },
            { nombre: "Salud Ocupacional", modulos: ["Seguridad Industrial", "Ergonomía", "Legislación Laboral", "Planes de Emergencia"] }
        ]
    }
];

async function main() {
    console.log("🏭 MEGATRÓN ACTIVADO: IMPORTANDO MALLA TÉCNICA NACIONAL...");
    
    const admin = await prisma.user.findFirst();
    let totalModulos = 0;

    for (const sec of SECTORES) {
        console.log(`   🏗️ Procesando Sector: ${sec.sector}`);
        
        for (const esp of sec.especialidades) {
            
            for (const modulo of esp.modulos) {
                // NOMBRE REAL: Ej: "TÉCNICA: Desarrollo de Software - Programación Web"
                // Esto permite que el docente busque por especialidad o por módulo
                const nombreMateria = `${esp.nombre}: ${modulo}`;
                
                // 1. CREAR EL MÓDULO (ASIGNATURA)
                const subject = await prisma.subject.upsert({
                    where: { name_educationLevel_modalityType: { name: nombreMateria, educationLevel: "TECNICA", modalityType: "TECNICA" }},
                    update: {},
                    create: { name: nombreMateria, code: modulo.substring(0,3).toUpperCase(), educationLevel: "TECNICA", modalityType: "TECNICA" }
                });

                // 2. CREAR PLAN DE PRÁCTICA (ENFOQUE POR COMPETENCIAS)
                await prisma.lessonPlan.create({
                    data: {
                        title: `Plan de Taller: ${modulo}`,
                        userId: admin.id,
                        status: "PUBLISHED",
                        content: {
                            unidad: "Resultado de Aprendizaje 1 (RA1)",
                            enfoque: "Formación Basada en Competencias",
                            saber_hacer: [`Ejecutar procedimientos de ${modulo}`, "Aplicar normas de seguridad"],
                            saber_ser: ["Trabajo en equipo", "Orden y limpieza"],
                            estrategias: {
                                inicio: "Charla de seguridad y demostración docente.",
                                desarrollo: "Práctica guiada en taller/laboratorio.",
                                cierre: "Evaluación del producto terminado."
                            },
                            evidencias: ["Lista de Cotejo de Seguridad", "Producto Terminado"]
                        }
                    }
                });

                // 3. CREAR INSTRUMENTO TÉCNICO (LISTA DE COTEJO)
                // En técnica se usa mucho lista de cotejo para evaluar procesos
                await prisma.assessment.create({
                    data: {
                        title: `Lista de Cotejo: Práctica de ${modulo}`,
                        type: "LISTA_COTEJO",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: {
                            competencia: `Aplica conocimientos de ${esp.nombre}`,
                            criterios: [
                                "Utiliza el equipo de protección personal (EPP)",
                                "Selecciona las herramientas correctas",
                                "Sigue el procedimiento técnico",
                                "Deja el área limpia"
                            ],
                            escala: "Cumple / No Cumple"
                        }
                    }
                });

                // 4. CREAR RECURSO DE SEGURIDAD (VITAL EN TÉCNICA)
                await prisma.assessment.create({
                    data: {
                        title: `Protocolo de Seguridad: ${modulo}`,
                        type: "OTRO",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: {
                            tipo: "NORMATIVA",
                            descripcion: "Normas INTECO / OSHA aplicables al taller.",
                            archivo: "PDF de Normas (Simulado)"
                        }
                    }
                });

                totalModulos++;
            }
        }
    }

    console.log(`\n\n✅ PROTOCOLO MEGATRÓN FINALIZADO.`);
    console.log(`   🏭 Se inyectaron ${totalModulos} Módulos Técnicos Específicos.`);
    console.log(`   🏭 Sectores: TIC, Industrial, Comercio, Turismo, Agro.`);
    console.log(`   🏭 Cada módulo tiene: Plan de Taller, Lista de Cotejo y Protocolo de Seguridad.`);
    console.log(`   🏭 Cobertura de Especialidades: MASIVA.`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());