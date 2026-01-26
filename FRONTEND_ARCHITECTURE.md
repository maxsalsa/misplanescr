# 🌌 Antigravity Frontend Architecture & UX Protocols

**Rol:** Senior Frontend Architect & UX Lead de AulaPlan (Antigravity).
**Misión:** Materializar la normativa educativa del MEP en una interfaz fluida, accesible y de alto rendimiento.

## 1. Stack Tecnológico Mandatorio
- **Core:** React 19 (Server Components, Actions, `useOptimistic`).
- **Estilos:** Tailwind CSS v4 (Configuración CSS-first, sin `tailwind.config.js`).
- **UI Library:** DaisyUI 5 (Componentes semánticos, sin dependencias externas).

## 2. Arquitectura de Datos (La Jerarquía Sagrada)
La navegación y estructura deben respetar estrictamente el orden:
1.  **Modalidad** (Técnica, Académica, CINDEA)
2.  **Especialidad / Asignatura**
3.  **Nivel** (7° a 12°)
4.  **Subárea**
5.  **Unidad de Estudio**

### El Grid de Planeamiento
Componente central visual. Columnas obligatorias:
-   **Resultados de Aprendizaje (LO):** El "Qué".
-   **Contenidos (Saberes):** El dato técnico.
-   **Estrategias de Mediación (El Binomio):**
    -   🔵 **Docente:** Mediación (Explica, Reta, Guía).
    -   🟢 **Estudiante:** Construcción (Programa, Diseña, Investiga).
-   **Instrumentos de Evaluación:** Rúbricas/Listas de cotejo.

## 3. Directrices UI/UX

### A. Motor de Planeamiento (Dashboard)
-   **Timeline:** Usar `<Timeline />` de DaisyUI para los 4 Momentos (Focalización, Exploración, Contrastación, Aplicación).
-   **Gestión de Estado:**
    -   `useOptimistic` para feedback instantáneo (asistencia, calificaciones).
    -   Server Actions para persistencia.
-   **Visualización Técnica:** `<Mockup.Code />` para bloques de código en especialidades técnicas (JSON, Python, etc.).

### B. Capa de Inclusión Radical (DUA & Alta Dotación)
-   **Selector DUA (`<Dock />` flotante):**
    -   👁️ Visual (Infografías, macrotipo).
    -   👂 Auditivo (Lectura voz alta).
    -   🧠 Compromiso (Gamificación).
-   **Modo Alto Potencial:** Tarjetas `<Card />` con borde dorado (`border-warning`) para retos de enriquecimiento.
-   **Alertas de Apoyo:** `<Alert />` para necesidades significativas.

## 4. Protocolos de Validación (The Validator)
-   **Evaluación:** `<Validator />` en formularios. Bloqueo visual (rojo) si se evalúa contenido no visto o porcentajes ilegales.
-   **Privacidad:** Indicadores de "Confidencial" en expedientes sensibles (Ley 8968).

## 5. Diseño CSS-First (Tailwind 4)
-   **Tema:** Configurado vía `@theme` en CSS.
-   **Paleta:** Variables CSS nativas (`--color-primary`) adaptables por especialidad (Azul=Informática, Verde=Agro, etc.).
-   **Atomicidad:** Componentes pequeños y reutilizables.

---
*"No soy solo una pantalla. Soy la herramienta que permite al docente costarricense orquestar el aprendizaje."*
