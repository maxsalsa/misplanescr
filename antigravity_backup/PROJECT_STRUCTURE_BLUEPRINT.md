# 🏛️ PROJECT STRUCTURE BLUEPRINT: misplanescr.com

**Arquitecto:** Max Salazar Sánchez
**Fecha:** 2026-01-23
**Core Stack:** Next.js 15 + Neon DB + Drizzle ORM

---

## 🚀 1. STACK TECNOLÓGICO SELECCIONADO

| Módulo | Tecnología | Justificación Crítica |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Renderizado híbrido (SSR/CSR) para SEO imbatible y dashboards rápidos. |
| **Database** | **Neon DB (PostgreSQL)** | Serverless, escalable y perfecta para datos relacionales complejos. |
| **ORM** | **Drizzle ORM** | Type-safe SQL, ligero y ultra-rápido (vs Prisma). |
| **Auth** | **Lucia Auth** | Gestión de sesiones segura y flexible (Own your data). |
| **UI/UX** | **Tailwind + Shadcn** | Componentes accesibles, bonitos y consistentes. |
| **Gamification**| **Framer Motion** | Animaciones fluidas para medallas y feedback visual. |

---

## 📂 2. ESTRUCTURA DE DIRECTORIOS (SEMÁNTICA)

```plaintext
src/
├── app/
│   ├── (auth)/                # Grupo de rutas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/           # Layout protegido (Sidebar + Header)
│   │   ├── docente/
│   │   │   ├── grupos/        # Gestión de 10-1, Noc, etc.
│   │   │   ├── planes/        # Generador Singularity (6 rutas)
│   │   │   └── upre/          # Monitor de Alertas
│   │   └── admin/             # Panel SaaS (Suscripciones)
│   ├── api/                   # Endpoints tRPC / REST
│   │   ├── webhooks/          # Pagos, Sync
│   │   └── cron/              # Tareas programadas (Alertas UPRE)
│   ├── layout.tsx             # Root Layout (Fuentes, Metadata)
│   └── page.tsx               # Landing Page (SEO Optimizada)
├── components/
│   ├── ui/                    # Primitivos Shadcn (Button, Card, Input)
│   ├── gamification/          # Badge, Confetti, XpBar
│   ├── forms/                 # React Hook Form + Zod
│   └── shared/                # Navbar, Sidebar, UserNav
├── lib/
│   ├── db/                    # Configuración Drizzle + Schema
│   ├── auth/                  # Configuración Lucia
│   └── utils.ts               # Helpers (cn, formatDate)
├── public/                    # Assets estáticos (Images, Fonts)
└── styles/                    # Global CSS
```

---

## 📱 3. ESTRATEGIA UX: DUALIDAD PC-MÓVIL

### **Desktop Experience (PC)**
*   **Data Density**: Tablas Shadcn (`<DataTable />`) para visualizar matrices de indicadores completas.
*   **Multitasking**: Uso de *Sheet* (Paneles laterales) para editar planes sin perder contexto.

### **Mobile Control (Celular)**
*   **Thumb Zone**: Navegación inferior (`<BottomNav />`) para acciones comunes.
*   **Swipe Actions**: Deslizar en listas de estudiantes para marcar asistencia o conducta.
*   **Focused View**: Tarjetas individuales para revisión de tareas.

---

## 🛡️ 4. SEGURIDAD Y SEO

*   **Integridad de Datos**: Middleware que verifica la firma HMAC en cada mutación de notas.
*   **SEO Técnico**: Metadatos dinámicos (`generateMetadata`) para cada plan, inyectando JSON-LD para Google.
*   **Protección**: Rutas de Protocolos (Armas, etc.) requieren re-autenticación (Sudo Mode).

---

**ESTADO DEL BLUEPRINT:** `APROBADO PARA PRODUCCIÓN`
