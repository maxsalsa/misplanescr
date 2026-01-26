// Centralized Mock Data for Testing & Performance
// Simulates a real database response for instant UI rendering

export const MOCK_USER = {
    id: "usr_123",
    name: "Prof. Alejandro Mora",
    role: "teacher",
    planId: "pro", // 'demo', 'monthly', 'annual'
    email: "alejandro.mora@mep.go.cr",
    avatar: "AM",
    stats: {
        plansCreated: 142,
        resourcesUsed: 89,
        studentsTracked: 135,
        averageRating: 4.8
    }
};

export const MOCK_STUDENT_USER = {
    id: "std_456",
    name: "Sofía Rodríguez",
    role: "student",
    section: "10-A",
    level: 10,
    email: "sofia.rodriguez@est.mep.go.cr",
    stats: {
        xp: 2450,
        level: 5,
        assignmentsPending: 2,
        averageGrade: 94
    }
};

export const MOCK_FAMILY_USER = {
    id: "fam_789",
    name: "Familia Rodríguez",
    role: "family",
    studentsLinked: ["std_456"],
    email: "padres.ann@gmail.com"
};

export const DASHBOARD_STATS = {
    teacher: {
        totalStudents: 135,
        activeGroups: 5,
        pendingReports: 3,
        systemHealth: "Óptimo",
        alerts: [
            { id: 1, type: "warning", message: "Grupo 7-B bajo rendimiento en Matemáticas", action: "Ver Detalles" },
            { id: 2, type: "info", message: "Reunión de personal programada para el viernes", action: "Agendar" },
            { id: 3, type: "success", message: "Planeamiento de Informática aprobado", action: "Descargar" }
        ],
        performanceByGroup: [
            { name: "10-A (Informática)", value: 92, color: "primary" },
            { name: "7-B (Matemáticas)", value: 76, color: "warning" },
            { name: "11-C (Proyecto)", value: 88, color: "success" },
            { name: "9-A (Cívica)", value: 82, color: "info" }
        ]
    },
    student: {
        recentGrades: [
            { subject: "Matemáticas", grade: 98, date: "15 Ene" },
            { subject: "Español", grade: 85, date: "12 Ene" },
            { subject: "Ciencias", grade: 92, date: "10 Ene" }
        ],
        todoList: [
            { id: 1, title: "Resolver Práctica de Álgebra", subject: "Matemáticas", deadline: "Mañana", status: "urgent" },
            { id: 2, title: "Ensayo sobre 'Cocorí'", subject: "Español", deadline: "Viernes", status: "pending" }
        ]
    }
};

export const APPOINTMENTS_MOCK = [
    { id: 1, student: "Juan Pérez", grade: "10-A", date: "2025-02-15", time: "10:00 AM", reason: "Consulta sobre notas", status: "pending" },
    { id: 2, student: "María González", grade: "11-B", date: "2025-02-16", time: "02:00 PM", reason: "justificación de ausencia", status: "approved" },
];
