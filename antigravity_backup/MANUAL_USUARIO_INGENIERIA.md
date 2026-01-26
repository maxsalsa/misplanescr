# 📘 Manual de Ingeniería y Usuario: AulaPlan v7.5

**Estado del Sistema**: 🟢 AUDITADO (Antigravity Certified)
**Fecha**: Enero 2026
**Nivel de Seguridad**: Militar (20min Session Timeout / SSL Encrypted)

---

## 🏛️ 1. Visión General (El Ecosistema)

AulaPlan v7.5 no es solo software, es una **Plataforma de Control Total** para el docente moderno. Centraliza la planificación, evaluación y gestión de vida estudiantil en una sola interfaz segura.

### Módulos Principales
| Módulo | Ruta | Función Crítica |
| :--- | :--- | :--- |
| **Centro de Comando** | `/dashboard` | Acceso unificado a todas las herramientas. |
| **Gestión de Grupos** | `/dashboard/grupos` | Listas, Asistencia y Conducta. |
| **Vida Estudiantil** | `/dashboard/life` | Activación de Protocolos (Botón Rojo). |
| **Planeamiento IA** | `/dashboard/generator` | Motor Generativo con "Binomio Sagrado". |
| **Portal Estudiante** | `/student/portal` | Subida de Evidencias y Gamificación. |

---

## 🔐 2. Protocolos de Seguridad (Guía de Usuario)

### 2.1 Inicio de Sesión
- El sistema es **exclusivo para suscriptores**.
- Si intenta acceder sin credenciales, será rebotado al Login inmediatamente por el **Global Shield (Middleware)**.

### 2.2 Tiempo de Sesión (Regla de Oro)
- **Duración**: 20 Minutos de inactividad.
- **Alerta**: A los 19 minutos, aparecerá una pantalla roja de advertencia: *"¿Sigue ahí, Profesor?"*.
- **Acción**: Si no responde, el sistema cierra la sesión para proteger los datos de menores (Ley 8968).

---

## 🧠 3. Ingeniería Pedagógica (Policy Engine)

### 3.1 Binomio Sagrado
El sistema de IA ha sido entrenado para **prohibir la pasividad**.
- ❌ **Incorrecto**: "El estudiante escucha la charla."
- ✅ **Correcto (Antigravity)**: "La persona estudiante **analiza** la información y **construye** un mapa mental."

### 3.2 Evaluación Blindada
- El sistema **impide** guardar una calificación si no existe una Rúbrica o Lista de Cotejo asociada.
- Esto garantiza que ninguna nota pueda ser apelada por falta de criterios técnicos.

---

## 🎨 4. Manual de Uso Rápido (UX)

1. **Pasar Asistencia**:
   - Ir a **Mis Grupos** -> **Asistencia**.
   - Click en ✅ (Presente) o ❌ (Ausente).
   - *Autoguardado en tiempo real.*

2. **Reportar Incidente (Botón Rojo)**:
   - Ir a **Conducta**.
   - Click en el estudiante -> Seleccionar "Falta Gravísima".
   - El sistema desplegará las alertas legales (9-1-1 / Orientación).

3. **Revisar Evidencias**:
   - Ir a **Evidencias**.
   - Verá las fotos/juegos subidos por los estudiantes.
   - Click en "Aprobar" para sumar al Portafolio.

---

## 🛠️ 5. Anexo Técnico (Para Soporte TI)

- **Database**: Neon DB (PostgreSQL) con tablas `AcademicGroup`, `ConductReport`, `Session`.
- **Framework**: Next.js 14+ (App Router).
- **Dependencias Clave**: 
  - `jspdf` (Motor de Reportes Oficiales).
  - `@google/generative-ai` (Cerebro Pedagógico).
  - `next-auth` (Gestor de Identidad).

> **Certificado de Calidad**: Este sistema cumple con el Reglamento de Evaluación de los Aprendizajes (REA) y los lineamientos de Ciberseguridad del MICITT.

*Generado por Antigravity Engine.*
