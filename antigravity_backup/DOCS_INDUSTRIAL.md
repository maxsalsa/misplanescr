# 🏭 DOCS INDUSTRIAL AULAPLAN v11.5

**Plataforma de Gestión Educativa - Arquitectura Antigravity**
**Estándar**: JavaScript Puro (.jsx) | **Seguridad**: Zero-Trust | **UI**: Premium (DaisyUI)

---

## 1. 🗺️ Mapa de Rutas (App Router)

| Ruta | Archivo Maestro | Función Crítica |
| :--- | :--- | :--- |
| `/login` | `src/app/login/page.jsx` | Puerta de enlace obligatoria (OAuth/Credenciales). |
| `/dashboard` | `src/app/dashboard/layout.js` | Shell de la Aplicación (Sidebar + Navbar). |
| `/dashboard/control` | `src/app/dashboard/control/page.jsx` | Centro de Mando del Suscriptor. |
| `/dashboard/gen` | `src/app/dashboard/generator/page.jsx` | Motor de IA (Binomio Sagrado). |
| `/student/portal` | `src/app/dashboard/student/page.jsx` | Interfaz Gamificada para Estudiantes. |

---

## 2. 🛢️ Esquema de Datos (Neon DB)

El sistema opera sobre PostgreSQL Serverless con indexación aditiva.

### Tablas Core
- **User**: Credenciales y Roles (SuperAdmin vs Docente).
- **Session**: Control de Token (Expiración estricta 20 min).

### Tablas Antigravity
- **AcademicGroup**: Secciones (10-1, 11-2).
- **ConductReport**: Boletas Digitales con *Trigger Protocol*.
- **StudentEvidence**: Repositorio Multimedia vinculado a LO_ID (Learning Outcome).

---

## 3. 🎨 Guía de Estilos (DaisyUI + Tailwind 4)

**Temas Activos**:
1. **Deep Dark** (`#01080E`): Prioridad en contraste para reducir fatiga visual. Cajas con bordes sutiles (`border-white/5`).
2. **Silk Light** (`#F8FAFC`): Claridad clínica para proyecciones en aula.

**Componentes Clave**:
- `AppShell`: Contenedor responsivo con barra de progreso de sesión.
- `OfficialPrintLayout`: Generador de PDF con cabecera MEP y pie de página de evaluación.

---

## 4. 🛡️ Protocolos de Seguridad

- **Middleware**: Intercepta 100% de peticiones. Si no hay token -> Redirect `/login`.
- **Zero-Zombie**: Política de eliminación inmediata de archivos duplicados (.tsx vs .jsx).
- **Antipiratería**: Inyección de "Identity Watermark" en exportaciones.

---
*Generado automáticamente por Antigravity Engine.*
