# ✅ QA CHECKLIST: VALIDACIÓN DE RELEASE

## 1. INTEGRIDAD DE RUTAS (SMOKE TEST)
- [ ] La carpeta `python_core` existe y contiene `entrena.py`, `experto.py`.
- [ ] La carpeta `storage/memoria_mep` no está vacía (tiene archivos .bin/.pkl).
- [ ] El archivo `.env` tiene las 3 llaves críticas (OpenAI, Google, DB).

## 2. BASE DE DATOS & ORM
- [ ] `npx prisma studio` abre sin errores.
- [ ] Se puede crear un `Institution` de prueba ("Colegio QA").
- [ ] Se puede crear un `User` docente asociado a esa institución.

## 3. MOTOR PEDAGÓGICO (GENERACIÓN)
- **Prueba:** Generar "Plan de Práctica - Matemáticas 7mo".
- **Verificación:**
    - [ ] No da timeout (responde en < 45s).
    - [ ] El contenido incluye "Habilidades Específicas" reales del MEP.
    - [ ] El JSON de respuesta se guarda en `PedagogicalResource`.

## 4. RESILIENCIA (CHAOS ENGINEERING)
- **Simulación:** Desconectar Internet por 2 segundos durante generación.
- **Resultado:** El sistema debe reintentar o mostrar "Error de red, reintentando..." (No crash).
- **Simulación:** Invalidar `OPENAI_API_KEY` temporalmente.
- **Resultado:** El sistema debe usar Gemini (Logs: "Switching to Backup Brain").

## 5. UX/UI DOCENTE
- [ ] Dashboard carga en < 2 segundos.
- [ ] Botón "Generar" muestra spinner/loader.
- [ ] Al terminar, muestra notificación "Toast" verde.
- [ ] El PDF generado se puede descargar.

## 6. GAMIFICACIÓN ESTUDIANTE
- [ ] El estudiante ve su nivel y XP.
- [ ] Al hacer click en "Quiz", se dispara `quiz-generator.js`.
- [ ] Las preguntas tienen sentido con la materia (validación humana rápida).
