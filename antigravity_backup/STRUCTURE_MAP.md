# 🧭 MAPA DE ESTRUCTURA ACTUAL (AUDITORÍA 360°)
> **Estado:** 🟡 PRECAUCIÓN (Requiere ajustes menores) | **Fecha:** 21/01/2026

## 1. Auditoría de Rutas y Assets (El Mapa)
| Recurso | Ruta Real | Estado | Observación |
| :--- | :--- | :--- | :--- |
| **Cerebro RAG** | `public/mep-docs/cerebro_mep` | ✅ OK | Vectorstore generado por `entrena.py`. |
| **Fuentes MEP** | `public/mep-docs/MEP_ORDENADO` | ✅ OK | 208 Documentos PDF detectados. |
| **Assets (Logos)** | `public/assets/` | 🟡 ALERTA | Carpeta existe, verificar `escudo_cr.png` solicitado por exportador. |
| **Salida PDF** | `python_core/temp` | 🟡 PENDIENTE | El script usa rutas relativas, asegurar carpeta temporal. |

## 2. Integridad del Login (El Acceso)
| Componente | Archivo | Estado | Hallazgo |
| :--- | :--- | :--- | :--- |
| **NextAuth** | `src/auth.ts` | ✅ OK | Configurado con `Credentials` y `bcrypt`. |
| **Session** | `src/auth.config.ts` | 🟡 REVISAR | Se necesita garantizar que `institutionId` pase al JWT. |
| **Roles** | `prisma/schema.prisma` | ✅ OK | Enum `UserRole` incluye `DIRECTOR` y `DOCENTE`. |

## 3. Core RAG (La Lógica)
| Script | Propósito | Estado | Coherencia |
| :--- | :--- | :--- | :--- |
| `experto.py` | Consulta Manual | ✅ OK | Tiene Filtro de Fidelidad y Metadata. |
| `autoexperto.py` | **Motor Automático** | ❌ DESACTUALIZADO | No tiene el Filtro de Fidelidad ni Failover de `experto.py`. |
| `entrena.py` | Ingesta | ✅ OK | Actualizado con `dotenv` y metadatos. |

## 4. Blindaje de Salida (La Bóveda)
| Mecanismo | Archivo | Estado | Protección |
| :--- | :--- | :--- | :--- |
| **PDF Seguro** | `exportador_profesional.py` | ✅ OK | Encriptación, Watermark visible y QR. |
| **Visor Web** | `SecureDocumentPreview.jsx` | ✅ OK | Anti-ClickDerecho, Blur, y Anti-Screenshot JS. |

---

## 🚨 ACCIONES CRÍTICAS REQUERIDAS (NO PROGRAMAR AÚN)
1.  **Sincronizar Cerebros:** Copiar la lógica robusta (Failover + Filtro) de `experto.py` a `autoexperto.py` (que es el que usará el usuario final).
2.  **Assets Faltantes:** Confirmar existencia de `escudo_cr.png` en `public/assets` o actualizar el script para usar `placeholder`.
3.  **Sesión Extendida:** Asegurar que `auth.config.ts` exponga `institutionId` y `name` en la sesión del cliente para el Watermarking.

*Reporte generado por Antigravity (Senior Architect).*
