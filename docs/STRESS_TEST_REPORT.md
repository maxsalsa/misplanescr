# REPORTE DE ESTRÉS Y ESCALABILIDAD (SRE DIAGNOSTIC)
**Proyecto:** MisPlanesCR 2026
**Fecha:** 21/01/2026
**Especialista:** Antigravity (SRE Lead)

## 1. ESCENARIO DE SIMULACIÓN (THE "SUNDAY NIGHT" SCENARIO)
**Condición:** 50 Docentes generando un "Paquete Completo" (Plan + GTA + Quiz) simultáneamente.
**Carga Estimada:** 
- 50 Peticiones HTTP concurrentes.
- ~100,000 Tokens consumidos en 60 segundos (2k tokens por plan).
- 50 Consultas Vectoriales a ChromaDB.
- 50 Transacciones de Escritura en Postgres (Prisma).

## 2. ANÁLISIS DE PUNTOS DE QUIEBRE (BREAKPOINTS)

### A. Base de Datos Relacional (Prisma + Postgres)
- **Estado Actual:** Riesgo Medio.
- **Diagnóstico:** Si usamos `new PrismaClient()` en cada petición serverless (Next.js), abriremos 50 conexiones instantáneas. Postgres (Plan Gratuito/Básico en Neon/Supabase) suele tener un límite de 60-100 conexiones.
- **Riesgo:** `Error: Too many clients already`.
- **Mitigación:** Implementación obligatoria del **Patrón Singleton** (Fase 3 del Plan).

### B. Motor de IA (OpenAI API)
- **Estado Actual:** CRÍTICO 🔴.
- **Diagnóstico:** 
    - Tier 1 OpenAI: Límite de 30,000 TPM (Tokens Por Minuto) o 500 RPM.
    - Demanda: 50 usuarios * 2,000 tokens = 100,000 Tokens.
- **Resultado:** 35 de los 50 docentes recibirán un error `429 Too Many Requests`.
- **Mitigación:** **Semáforo de Conexiones (Queue Manager)**. Limitar a 5 peticiones concurrentes. Los otros 45 ven un mensaje: "Estás en la fila, posición X".

### C. Memoria Vectorial (ChromaDB Local)
- **Estado Actual:** Riesgo Alto (Ram).
- **Diagnóstico:** Chroma carga los índices en memoria. Si la colección crece a 1GB y tenemos 50 workers de Next.js intentando leerla, el servidor explotará por OOM (Out Of Memory).
- **Mitigación:** Usar Chroma en modo Servidor (Docker) o persistente, no embebido en cada función lambda.

## 3. PROPUESTA DE SOLUCIÓN: "EL SEMÁFORO"

### Arquitectura de Cola (Token Bucket)
Implementaremos un `QueueManager` en memoria (para deploy VPS/Docker) o Redis (para Vercel Serverless).

**Lógica del Semáforo:**
1. Usuario clickea "Generar".
2. Sistema revisa `ActiveJobs`.
    - Si `ActiveJobs < 5`: Pasa directo a OpenAI.
    - Si `ActiveJobs >= 5`: Entra a `PendingQueue`.
3. Frontend hace polling cada 3s: "¿Ya es mi turno?".
4. Usuario ve: *"🚦 Tráfico alto de domingo. Tu plan se está cocinando. Turno: 4/12".*

## 4. IMPACTO FINANCIERO (FINOPS)
Sin caché, 50 usuarios pidiendo "El Ciclo del Agua" cuestan:
- 50 * $0.03 = $1.50 USD en un minuto.
- Con **Semantic Cache**: El primero cuesta $0.03, los otros 49 cuestan $0.00.
- **Ahorro Potencial:** 98%.

## 5. CONCLUSIÓN SRE
El sistema actual **NO aguantará** la carga de 50 usuarios concurrentes sin las siguientes intervenciones inmediatas:
1. Patrón Singleton (Prisma).
2. Queue Manager (Semáforo IA).
3. Semantic Cache.

**Aprobación para Proceder:** Se requiere autorización para instalar el Semáforo y la Caché.
