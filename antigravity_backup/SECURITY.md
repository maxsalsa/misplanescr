# 🛡️ SECURITY.MD - PROTOCOLO BÓVEDA SUIZA v3.0

> **Clasificación:** CONFIDENCIAL | **Versión:** 3.0 Enterprise

## 1. Modelo de Amenazas (Threat Model)

| Amenaza | Nivel de Riesgo | Contramedida Implementada ("Bóveda Suiza") |
| :--- | :--- | :--- |
| **Extracción Masiva (Scraping)** | CRÍTICO | • Rate-Limiting por IP y UserID.<br>• Signed URLs con expiración (5 min).<br>• Bloqueo de IPs fuera de Costa Rica (Geo-Fence). |
| **Piratería (Compartir PDFs)** | ALTO | • **Watermark Visible:** Nombre del Docente en diagonal.<br>• **Micro-Texto Esteganográfico:** Grid de IDs invisible en fondo.<br>• **QR Forense:** Trazabilidad única por documento. |
| **Captura de Pantalla (Screenshots)** | MEDIO | • **Active Shield (Frontend):** Blur al perder foco.<br>• **Canvas Rendering:** Texto no seleccionable en Preview.<br>• **Detección de Teclas:** Bloqueo de `PrtSc`, `F12`. |
| **Suplantación de Identidad** | ALTO | • **Identity Lock:** El nombre en el PDF se inyecta desde DB (inmutable tras pago).<br>• **Sesión Única:** Invalida tokens anteriores al detectar nuevo login. |

## 2. Protocolo de Sanciones (IDS)

El sistema de **Detección de Intrusiones (IDS)** monitorea eventos anómalos.

### Niveles de Alerta:
1.  **Advertencia (Amarilla):** 3 intentos de captura/clic derecho en 1 minuto.
    *   *Acción:* Mensaje "Actividad sospechosa".
2.  **Bloqueo Temporal (Naranja):** Reincidencia en < 10 mins.
    *   *Acción:* Logout forzado + Ban por 15 minutos.
3.  **Suspensión Definitiva (Roja):** Detección de PDF filtrado (QR scan) o ataque de fuerza bruta.
    *   *Acción:* Revocación de Licencia B2B + Reporte Legal.

## 3. Política de Datos (Privacidad)
- **RAG Sanctum:** Los fragmentos del MEP son de solo lectura.
- **Datos Personales:** Se almacenan en Neon (Postgres) con cifrado en reposo.
- **Logs:** Se retienen por 90 días para auditoría forense.

---
**CONTACTO DE SEGURIDAD:**
Lic. Max Salazar Sánchez - *max@misplanescr.com*
**DevOps Lead:** Antigravity Cluster
