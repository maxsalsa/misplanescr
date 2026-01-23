# Plan de Implementación: Upgrade SaaS Multitenencia y Roles

## 1. Actualización de Kernel (Roles y Prompts)

### A. Definición de Roles (RBAC)
Implementar una capa de abstracción de roles en el código.
- **Archivo:** `src/constants/roles.js`
- **Definición:** Enum con `SUPER_ADMIN`, `DOCENTE`, `ESTUDIANTE`, `FAMILIA` y sus permisos.

### B. Inyección de Prompts Maestros
Actualizar el servicio de IA (`src/services/ai-service.js`) para incluir el nuevo "Prompt de Arquitectura de Roles" y "Lógica Multimateria".
- Inyectar el prompt en función del rol del usuario que hace la llamada.

## 2. Renovación de UI/UX (Calidad Visual)

### A. Componentes Base
Establecer un patrón de componentes en `src/components/ui` que cumpla con las reglas:
- **Modales:** Con persistencia de estado (`localStorage`) para prevenir pérdida de datos.
- **Toasts:** Sistema no intrusivo para notificaciones.
- **Colores:** Asignación de paleta oficial MEP por materia.

### B. Skeleton Loaders
Implementar estados de carga en las vistas principales (`dashboard/abp/page.js`, etc.) para mejorar la percepción de velocidad.

## 3. Lógica Backend (Python Scripts)

### A. `entrena.py` (Refactorización)
- Eliminar API Keys hardcodeadas (usar `.env`).
- Mejorar el chunking para respetar la estructura de programas de estudio.
- Añadir metadatos de "Nivel" y "Modalidad" al vectorstore para permitir filtrado.

### B. `experto.py` (Refactorización) -> Integración en `ai-service.js`
- Actualizar para aceptar parámetros de contexto (Día vs Noche).
- Usar el filtro de metadatos al consultar ChromaDB.

## 4. Dashboard de Super Admin

### A. Vista de Control
Crear `src/app/dashboard/admin/page.js` para visualizar:
- Estado de la Memoria (Vectores, Fecha última actualización).
- Usuarios Activos.
- Logs de Auditoría.

## 5. Automatización de Entregables

### A. Pipeline de Generación
Modificar `generateMEPPlan` para que, tras una generación exitosa, dispare prompts secundarios (Quiz, Family Report) si la opción de "Generación Masiva" está activa.

---

**Nota:** Procederemos primero con la actualización de los scripts de Python para limpiar la deuda técnica y soportar el filtrado por roles. luego pasaremos a la capa de aplicación JS.
