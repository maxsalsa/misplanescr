import {
    LayoutDashboard,
    BookOpen,
    PlusCircle,
    Scale,
    CalendarCheck,
    CheckSquare,
    BrainCircuit,
    HeartPulse,
    GraduationCap,
    Gamepad2,
    LibraryBig,
    LineChart,
    UserCheck,
    MessageCircle
} from 'lucide-react';

export const NAV_CONFIG = {
    teacher: [
        {
            title: "Resumen", items: [
                { label: "Panel Principal", href: "/dashboard", icon: LayoutDashboard }
            ]
        },
        {
            title: "Planeamiento", items: [
                { label: "Generar Plan", href: "/dashboard/generator", icon: PlusCircle },
                { label: "Normativa & Docs", href: "/dashboard/normativa", icon: Scale, color: "text-amber-500" }
            ]
        },
        {
            title: "Gestión Aula", items: [
                { label: "Asistencia", href: "/dashboard/attendance", icon: CalendarCheck, color: "text-indigo-500" },
                { label: "Tareas", href: "/dashboard/tasks", icon: CheckSquare },
                { label: "Quizzes", href: "/dashboard/quizzes", icon: BrainCircuit },
                { label: "Inclusión", href: "/dashboard/inclusion", icon: HeartPulse, color: "text-emerald-500" }
            ]
        }
    ],
    student: [
        {
            title: "Mi Aprendizaje", items: [
                { label: "Mi Aula", href: "/dashboard/student", icon: GraduationCap },
                { label: "Juegos & Quizzes", href: "/dashboard/student/games", icon: Gamepad2, color: "text-purple-500" },
                { label: "Biblioteca de Repaso", href: "/dashboard/student/library", icon: LibraryBig, color: "text-cyan-500" }
            ]
        },
        {
            title: "Mis Deberes", items: [
                { label: "Tareas Pendientes", href: "/dashboard/tasks", icon: CheckSquare }
            ]
        }
    ],
    family: [
        {
            title: "Monitoreo", items: [
                { label: "Resumen del Estudiante", href: "/dashboard/family", icon: LineChart },
                { label: "Asistencia", href: "/dashboard/family/attendance", icon: UserCheck, color: "text-blue-500" }
            ]
        },
        {
            title: "Comunicación", items: [
                { label: "Mensajes Docente", href: "/dashboard/family/messages", icon: MessageCircle }
            ]
        }
    ]
};

export const ROLE_LABELS = {
    teacher: "Docente",
    student: "Estudiante",
    family: "Familia"
};
