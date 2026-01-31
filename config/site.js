import { LayoutDashboard, Users, BookOpen, Calendar, Award, Settings, HelpCircle } from "lucide-react";

export const siteConfig = {
  name: "AulaPlan CR",
  description: "Plataforma de Gestión Pedagógica MEP",
  nav: [
    {
      title: "Principal",
      items: [
        { title: "Centro de Comando", href: "/dashboard", icon: LayoutDashboard },
        { title: "Mis Grupos", href: "/dashboard/students", icon: Users },
        { title: "Planeamiento", href: "/dashboard/create", icon: BookOpen },
      ]
    },
    {
      title: "Gestión",
      items: [
        { title: "RRHH / Permisos", href: "/dashboard/hr", icon: Calendar },
        { title: "Formación 2026", href: "/dashboard/training", icon: Award }, // Circular 001-2026
      ]
    },
    {
      title: "Sistema",
      items: [
        { title: "Configuración", href: "/dashboard/settings", icon: Settings },
        { title: "Ayuda / Soporte", href: "/dashboard/help", icon: HelpCircle },
      ]
    }
  ]
};