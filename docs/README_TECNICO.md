# manual Técnico: AulaPlan Antigravity v7.0

**Versión del Sistema**: v7.0 (Antigravity Overhaul)
**Fecha de Generación**: Enero 2026
**Arquitectura**: Next.js 14+ (App Router), Neon DB (PostgreSQL), Prisma ORM, Tailwind CSS 4 (Target).

---

## 🏗️ 1. Arquitectura del Sistema

El sistema opera bajo la arquitectura **"Industrial Grade"** diseñada para el MEP.

### 1.1 Estructura de Directorios
- **/src/app/(auth)**: Rutas de autenticación (Login/Register). Protegidas contra fuerza bruta.
- **/src/app/dashboard**: Módulo Principal.
    - **/grupos**: Gestión de Asistencia, Conducta (Botón Rojo), Evidencias.
    - **/life**: Vista de "Vida Estudiantil" del Docente Guía.
    - **/control**: Panel de Suscriptor (Notas, Pesos, Configuración).
- **/src/app/student/portal**: Interfaz Gamificada para el estudiante.
- **/src/components/security**: Componentes de blindaje.
    - `SessionTimeout.jsx`: Monitor de inactividad (20 min).
    - `ProtocolTrigger.js`: Lógica del Botón Rojo.
- **/src/lib/neon**: Conexión a Base de Datos.

### 1.2 Base de Datos (Neon DB)
Esquema Relacional (`prisma/schema.prisma`):
- **User**: Docente Suscriptor / SuperAdmin.
- **AcademicGroup**: Secciones (10-1, 11-2).
- **Student**: Vinculado a Grupo y Usuario.
- **AttendanceRecord**: Trazabilidad diaria.
- **ConductReport**: Boletas con `protocolTriggered`.
- **StudentEvidence**: Archivos multimedia vinculados a `learningOutcome`.

---

## 🔐 2. Protocolos de Seguridad (The Shield)

### 2.1 Autenticación
- **Middleware Global**: `src/middleware.ts` intercepta TODAS las rutas (`/dashboard/*`).
- **Session Timeout**: 20 minutos de inactividad activa un Modal de Advertencia y posterior Logout forzado.
- **Role-Based Access**:
    - `SUPER_ADMIN`: Acceso total.
    - `DOCENTE`: Acceso limitado a sus grupos y suscripciones.

### 2.2 Antipiratería
- **Marca de Agua Dinámica**: `SecureDocumentPreview.jsx` inyecta `Licencia: [USER_ID]` en el pie de página.
- **Identidad Forzada**: El nombre del docente en los documentos oficiales (`OfficialPrintLayout.jsx`) es de lectura única (basado en sesión).

---

## 🎨 3. UI/UX & Neuro-Inclusión

- **DUA 3.0 Nativo**: El sistema detecta perfiles de aprendizaje y ajusta contrastes.
- **Modo Oscuro Industrial**: Paleta `#035496` (Azul MEP Profundo) y `#162534` (Slate Dark) para reducir fatiga visual.

---

## 🚀 4. Guía de Despliegue

1. **Instalación de Dependencias**:
   ```bash
   npm install
   ```

2. **Sincronización de Base de Datos**:
   ```bash
   npx prisma db push
   ```

3. **Ejecución en Desarrollo**:
   ```bash
   npm run dev
   ```

4. **Producción**:
   ```bash
   npm run build
   npm start
   ```

---

*Generado automáticamente por Antigravity Engine.*
