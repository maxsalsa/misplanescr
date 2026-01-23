# 🏛️ ANTIGRAVITY TECHNICAL ARCHITECTURE (V15.0)

**Autor:** Max Salazar Sánchez
**Fecha:** 2026-01-23
**Stack:** Next.js 15+ / Neon DB / Python Core

---

## 🚀 1. STACK TECNOLÓGICO SELECCIONADO

| Capa | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15+ (App Router)** | SSR para velocidad inicial y SEO. Server Actions para mutaciones seguras. |
| **Estilos** | **Tailwind + Shadcn/UI** | Sistema de diseño atómico, accesible y dark-mode ready. |
| **Estado** | **TanStack Query** | Manejo de caché, revalidación automática y optimismo UI. |
| **Seguridad** | **Jose / Crypto-js** | Implementación de HMAC-SHA256 en el cliente y servidor. |
| **Documentos** | **React-PDF** | Generación de Actas Oficiales vectoriales en el navegador. |

---

## ⚡ 2. ESTRUCTURA DE RUTAS (O(1) ACCESS)

La arquitectura de rutas está diseñada para acceso semántico y protegido:

### 🔒 Zona Privada (Auth Required)
*   `/dashboard`: Vista principal (KPIs UPRE, Resumen).
*   `/grupos/[id]/asistencia`: Grid de asistencia rápida (Mobile First).
*   `/grupos/[id]/notas`: Matriz de evaluación (Desktop First).
*   `/protocolos/ejecutar/[tipo]`: Wizard paso a paso para emergencias (Armas/Bullying).

### 🌐 Zona Pública (Verificación)
*   `/verify/[hash]`: Endpoint para validación de QRs impresos.

---

## 📱 3. ESTRATEGIA HÍBRIDA (UX/UI)

### **Desktop Power (PC)**
*   **Grid Denso**: Tablas de datos complejas (Indicadores 1-3) visibles en una sola pantalla.
*   **Multitasking**: Paneles laterales colapsables para consultar planes mientras se califica.

### **Mobile Control (Celular)**
*   **Touch Targets**: Botones de 44px+ para pasar lista con el dedo.
*   **Panic Button**: Acceso directo al FAB (Floating Action Button) para Protocolos de Riesgo.
*   **Scanner**: Integración con cámara para leer QRs de estudiantes/documentos.

---

## 🛡️ 4. ESTRATEGIA DE CIBERSEGURIDAD

1.  **SSL/TLS 1.3**: Comunicación encriptada obligatoria con Neon DB.
2.  **HMAC Signing**:
    *   *Request*: El cliente firma el payload con una llave efímera.
    *   *Response*: El servidor verifica la firma antes de procesar (Zero Trust).
3.  **Audit Logs**: Cada acción crítica (Cambio de Nota, Protocolo) genera un log inmutable.

---

**CONCLUSIÓN:**
Esta arquitectura garantiza que Antigravity sea **Rápida** (Next.js), **Bonita** (Tailwind) y **Segura** (Crypto). Es una fortaleza digital moderna.
