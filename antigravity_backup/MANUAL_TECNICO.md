# 📘 Manual Técnico: Sistema Antigravity v1.4 (Auditado)

**Fecha de Auditoría:** 21 de Enero del 2026
**Responsable Técnico:** Antigravity (IA Agentic Core)
**Estado del Sistema:** Operativo con Redundancia Activa

---

## 🚀 1. Resumen Ejecutivo (Lo que se arregló)

Tras el incidente de "Agotamiento de Créditos" del 20/01/2026, se ha implementado una arquitectura de **"Cerebro Redundante"**.

1.  **Redundancia de IA:** El sistema ahora intenta usar `OpenAI (GPT-4o)` primero. Si falla (por créditos o caída), cambia automáticamente a `Google Gemini Pro` en milisegundos.
2.  **Seguridad de Credenciales:** Se eliminaron todas las claves API hardcodeadas en `antifinal.py`. Ahora el sistema lee estrictamente del archivo `.env`.
3.  **Identidad Pedagógica:** Se inyectaron los 3 Prompts de Sistema Oficiales (Identidad, Auditoría, Presentables) en el núcleo de la aplicación (`ai-service.js`).

---

## 🛠️ 2. Arquitectura de Redundancia

### Flujo de Decisión (Smart AI Wrapper)
El archivo `src/services/ai-service.js` ahora utiliza un "Wrapper Inteligente":

```mermaid
graph TD
    A[Solicitud del Docente] --> B{¿OpenAI Disponible?}
    B -- SÍ --> C[GPT-4o (Motor Principal)]
    B -- NO/ERROR --> D[⚠️ Alerta de Sistema]
    D --> E[Gemini Pro (Motor de Respaldo)]
    E --> F[Respuesta Exitosa]
    C --> F
```

### Configuración Requerida
Para que la redundancia funcione, debe actualizar su archivo `.env`:

```bash
OPENAI_API_KEY="sk-..."       # Su llave habitual
GOOGLE_API_KEY="AIza..."      # Nueva llave de Google AI Studio (Gratis/Tier disponible)
```

---

## 🧠 3. Estándares Pedagógicos (Prompts Inyectados)

Se han configurado 3 "Personalidades" estrictas en el código:

### A. El Arquitecto Curricular (Prompt Maestro)
*Ubicación: `PROMPT_MAESTRO_DEFINITIVO`*
*   **Regla:** Obliga a usar "La persona docente", verbos taxonómicos y estrategias DUA.
*   **Efecto:** Garantiza que el planeamiento pase auditoría del MEP.

### B. El Diseñador de Recursos (Prompt Recursos)
*Ubicación: `MEP_RESOURCE_PROMPT`*
*   **Regla:** Genera GTAs con las 4 fases y rúbricas analíticas.
*   **Efecto:** Crea material listo para imprimir.

### C. El Auditor de Código (Antifinal.py)
*Ubicación: `antifinal.py`*
*   **Regla:** Comentarios en español, manejo de errores `try/except` y logging.
*   **Efecto:** Facilita la depuración y mantenimiento futuro.

---

## 📋 4. Instrucciones de Uso

### Para la Plataforma Web
1.  Asegúrese de ejecutar `npm install` (ya realizado por el sistema).
2.  Actualice su `.env`.
3.  Reinicie el servidor con `npm run dev`.

### Para el Script de Mantenimiento (Antigravity CLI)
Ahora se ejecuta de forma segura:

```bash
# Ingesta (Modo API)
python antifinal.py --ingest

# Modo Chat (Profe Max)
python antifinal.py
```

---

> **Nota Final:** El sistema ha sido auditado para cumplir con los lineamientos de "Transformación Curricular MEP 2026". Cualquier modificación futura debe respetar estos prompts base.
