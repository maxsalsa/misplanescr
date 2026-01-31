const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GROUP_ID = "10-3_CTP_2025";

const STUDENTS = [
    {
        "id": "ST_01",
        "full_name": "Sofía Vargas Rodríguez",
        "dua_profile": {
            "level": "ACCESO",
            "category": "Regular",
            "supports": []
        },
        "academic_history": {
            "weighted_average": 88.5,
            "risk_alert": false
        },
        "high_potential": false
    },
    {
        "id": "ST_02",
        "full_name": "Kevin Jiménez Mora",
        "dua_profile": {
            "level": "SIGNIFICATIVA",
            "category": "Discapacidad Intelectual Leve",
            "legal_basis": "Programación Individual (PEI)",
            "supports": ["Modificación de objetivos", "Pruebas diferenciadas", "Simplificación de textos"]
        },
        "academic_history": {
            "weighted_average": 72.0,
            "risk_alert": true
        },
        "high_potential": false
    },
    {
        "id": "ST_03",
        "full_name": "Valentina Rojas Brenes",
        "dua_profile": {
            "level": "NO_SIGNIFICATIVA",
            "category": "TDAH / Déficit Atencional",
            "legal_basis": "Circular DVM-AC-003-2013",
            "supports": ["Recinto Aparte", "Tiempo Adicional (un tercio)", "Ubicación preferencial"]
        },
        "academic_history": {
            "weighted_average": 79.4,
            "risk_alert": false
        },
        "high_potential": false
    },
    {
        "id": "ST_04",
        "full_name": "Sebastián Castro Méndez",
        "dua_profile": {
            "level": "ACCESO",
            "category": "Alta Dotación / Talento",
            "supports": ["Enriquecimiento Curricular", "Proyectos de Investigación Avanzada"]
        },
        "academic_history": {
            "weighted_average": 98.2,
            "risk_alert": false
        },
        "high_potential": true
    },
    {
        "id": "ST_05",
        "full_name": "María José Gamboa Castillo",
        "dua_profile": {
            "level": "NO_SIGNIFICATIVA",
            "category": "Baja Visión",
            "supports": ["Ampliación de letra (Arial 14+)", "Uso de lupas/tecnología asistiva"]
        },
        "academic_history": {
            "weighted_average": 85.0,
            "risk_alert": false
        },
        "high_potential": false
    },
    {
        "id": "ST_06",
        "full_name": "Alejandro Madrigal Solís",
        "dua_profile": { "level": "ACCESO", "category": "Regular", "supports": [] },
        "academic_history": { "weighted_average": 68.5, "risk_alert": true },
        "high_potential": false
    },
    {
        "id": "ST_07",
        "full_name": "Camila Araya Villalobos",
        "dua_profile": { "level": "ACCESO", "category": "Regular", "supports": [] },
        "academic_history": { "weighted_average": 91.0, "risk_alert": false },
        "high_potential": false
    },
    {
        "id": "ST_08",
        "full_name": "Gabriel Monge Quirós",
        "dua_profile": {
            "level": "SIGNIFICATIVA",
            "category": "Compromiso Cognitivo",
            "supports": ["Ajuste en nivel de dificultad", "Evaluación oral"]
        },
        "academic_history": { "weighted_average": 70.5, "risk_alert": false },
        "high_potential": false
    }
];

async function main() {
    console.log('🌱 Starting Seed... Target: Group 10-3 (CTP Model)');

    // 1. Ensure User exists (Teacher)
    // In real app we would link to active session, here we hardcode a demo teacher or use first found
    let teacher = await prisma.user.findFirst();
    if (!teacher) {
        teacher = await prisma.user.create({
            data: {
                email: "profesor@antigravity.cr",
                name: "Profesor Demo",
                password: "hashed_password",
                role: "DOCENTE"
            }
        });
    }

    // 2. Upsert Group
    const group = await prisma.group.upsert({
        where: { id: GROUP_ID },
        update: {},
        create: {
            id: GROUP_ID,
            name: "10-3",
            grade: "Décimo",
            shift: "Diurno",
            userId: teacher.id
        }
    });
    console.log(`✅ Group 10-3 Ready: ${group.id}`);

    // 3. Upsert Students
    for (const st of STUDENTS) {
        // Generate summarized needs string for quick view
        const needsSummary = st.dua_profile.level === "SIGNIFICATIVA"
            ? `${st.dua_profile.category} (Adecuación Significativa)`
            : st.dua_profile.level === "NO_SIGNIFICATIVA"
                ? `${st.dua_profile.category} (Adecuación No Sig.)`
                : st.high_potential
                    ? "Alta Dotación (Talento)"
                    : "Regular";

        const student = await prisma.student.upsert({
            where: { id: st.id }, // Using manual string ID for consistency with prompt
            update: {
                name: st.full_name,
                needs: needsSummary,
                profile: {
                    dua_profile: st.dua_profile,
                    academic_history: st.academic_history,
                    high_potential: st.high_potential
                },
                groupId: group.id
            },
            create: {
                id: st.id,
                name: st.full_name,
                needs: needsSummary,
                profile: {
                    dua_profile: st.dua_profile,
                    academic_history: st.academic_history,
                    high_potential: st.high_potential
                },
                groupId: group.id
            }
        });
        console.log(`   - Injected Student: ${student.name} [${needsSummary}]`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
