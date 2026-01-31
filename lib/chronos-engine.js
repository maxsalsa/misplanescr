/**
 * CHRONOS ENGINE V1.0 (ADMIN & EVENTS)
 * "The Bureaucracy Slayer"
 * 
 * Capabilities:
 * - Generates Civic Acts (Efemérides) compliant with Protocolo MEP.
 * - Generates Admin Templates (Referrals, Minutes, IEPs).
 * - Manages Innovation Workshops (STEAM) logic.
 */

export const CIVIC_CALENDAR = {
    "04-11": {
        date: "11 de Abril",
        event: "Batalla de Rivas / Juan Santamaría",
        protocol: [
            "Ingreso del Pabellón Nacional",
            "Canto del Himno Nacional",
            "Juramento a la Bandera",
            "Motivación: 'El Héroe que llevamos dentro'",
            "Acto Cultural: Dramatización 'La Quema del Mesón'",
            "Retiro del Pabellón"
        ]
    },
    "07-25": {
        date: "25 de Julio",
        event: "Anexión del Partido de Nicoya",
        protocol: [
            "Ingreso del Pabellón Nacional y Bandera de Guanacaste",
            "Himno Nacional y Himno a la Anexión",
            "Bomba Folclórica (Estudiantes)",
            "Danza Típica: 'El Punto Guanacasteco'",
            "Retiro de Pabellones"
        ]
    },
    "09-15": {
        date: "15 de Setiembre",
        event: "Independencia de Costa Rica",
        protocol: [
            "Acto Cívico Solemne (Todo el colegio)",
            "Lectura del Acta de Independencia (6:00 PM - 14 Sept tradi)",
            "Canto del Himno Nacional (14 Sept - 6:00 PM)",
            "Desfile de Faroles (14 Sept)",
            "Desfile de Bandas (15 Sept)"
        ]
    }
};

export const ADMIN_ TEMPLATES = {
    REFERENCIA: {
        title: "Boleta de Referencia - Gabinete Psicopedagógico",
        fields: ["Nombre Estudiante", "Sección", "Motivo (Conductual/Académico)", "Acciones Previas Docente", "Observaciones"],
        footer: "Firma Docente / Firma Recibido"
    },
    ACTA_REUNION: {
        title: "Minuta de Reunión de Padres/Encargados",
        fields: ["Fecha", "Hora Inicio/Fin", "Agenda", "Acuerdos Tomados", "Próxima Cita"],
        footer: "Firmas de Asistencia"
    },
    ADECUACION: {
        title: "Plan Educativo Individualizado (PEI) - Adecuación Significativa",
        fields: ["Diagnóstico", "Fonctionamiento Actual", "Metas Anuales", "Apoyos Específicos", "Criterios de Evaluación Modificados"],
        footer: "Comité de Apoyo Educativo"
    }
};

/**
 * GENERATE CIVIC ACT PROGRAM
 * @param {string} dateKey - "MM-DD" format.
 */
export function generateCivicProgram(dateKey) {
    const event = CIVIC_CALENDAR[dateKey];
    if (!event) return { title: "Acto Cívico Regular", protocol: ["Himno Nacional", "Mensaje del Director"] };

    return {
        title: `Programa Oficial: ${event.event}`,
        date: event.date,
        sequence: event.protocol.map((step, index) => `${index + 1}. ${step}`)
    };
}

/**
 * STEAM WORKSHOP GENERATOR
 * @param {string} topic - The STEAM topic
 */
export function generateSteamWorkshop(topic) {
    return {
        title: `Taller de Innovación STEAM: ${topic}`,
        methodology: "Aprendizaje Basado en Proyectos (ABP)",
        evaluation: "100% Práctica (Producto + Proceso)",
        rubric_criteria: ["Creatividad", "Resolución de Problemas", "Trabajo Colaborativo", "Uso de Tecnología"],
        phases: {
            empatizar: "Entender el problema usuario.",
            definir: "Delimitar el reto.",
            idear: "Lluvia de ideas.",
            prototipar: "Construir modelo físico/digital.",
            testear: "Prueba de campo."
        }
    };
}
