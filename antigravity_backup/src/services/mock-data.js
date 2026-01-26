
/**
 * @fileoverview Mock Data Service Layer
 * Provides realistic, interconnected data sets for simulating a Technical High School environment.
 * Used to populate dashboards without a backend dependency.
 * 
 * Data Models Coverage:
 * - Teacher Profile & Stats
 * - Student Grades & Assignments
 * - Parent Notifications
 * - Group Management (Secciones)
 * 
 * @module services/mock-data
 * @version 1.0.0
 */

export const MOCK_DATA = {
    teacher: {
        name: "Prof. Alejandro Mora",
        role: "Docente Coordinador",
        institution: "CTP de San Pedro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alejandro",
        stats: {
            students: 124,
            groups: 4,
            classesToday: 3,
            pendingReports: 2
        }
    },
    student: {
        name: "Valentina Castillo",
        role: "Estudiante",
        grade: "10-2",
        specialty: "Informática Empresarial",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
        average: 92
    },
    parent: {
        name: "Sra. Carmen Rodríguez",
        role: "Padre de Familia",
        children: ["Valentina Castillo"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen"
    },
    groups: [
        { id: "10-1", name: "10-1", specialty: "Contabilidad", students: 28 },
        { id: "10-2", name: "10-2", specialty: "Informática", students: 30 },
        { id: "11-1", name: "11-1", specialty: "Contabilidad", students: 25 },
        { id: "12-1", name: "12-1", specialty: "Informática", students: 22 }
    ],
    subjects: [
        { id: "math", name: "Matemáticas", schedule: "Lun 7:00 - 9:40" },
        { id: "tech", name: "Tecnologías de Info", schedule: "Mar 10:00 - 12:40" }
    ],
    recentActivity: [
        { id: 1, type: "grade", student: "Carlos Alvarado", detail: "Examen I Parcial", score: 85, time: "Hace 2 horas" },
        { id: 2, type: "attendance", group: "10-2", detail: "Asistencia registrada", time: "Hace 10 horas" },
        { id: 3, type: "plan", detail: "Planeamiento Mensual Marzo", status: "Borrador", time: "Ayer" }
    ]
};

export const getMockData = (role) => {
    return MOCK_DATA[role] || MOCK_DATA.teacher;
};
