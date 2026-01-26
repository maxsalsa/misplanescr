# 🗳️ REPORTE DE HALLAZGOS: FISCALIZACIÓN TÉCNICA (360°)
> **Auditor:** Antigravity (SRE/SecOps) | **Fecha:** 21/01/2026 | **Estado:** 🟠 REQUIERE CORRECCIONES

## 1. Fiscalización de Esquema (Neon/Prisma)
| Componente | Estado | Hallazgo Técnico |
| :--- | :--- | :--- |
| **Atributos de Usuario** | ✅ OK | `User` tiene `professionalId`, `specialty`, `role` e `institutionId`. |
| **Multi-Tenancy** | ✅ OK | Relación `User` -> `Institution` correctamente definida (FK). |
| **Log de Seguridad** | ❌ **CRÍTICO** | **Falta la tabla `SecurityLog`.** No hay dónde guardar IPs ni alertas de screenshots. |

## 2. Rigor de Roles (RBAC)
| Control | Estado | Hallazgo Técnico |
| :--- | :--- | :--- |
| **Middleware** | ⚠️ PARCIAL | Protege rutas `/dashboard`, pero el control de permisos (DEMO vs PRO) está en el Frontend (`SecureDocumentPreview.jsx`). Si un usuario hace `curl` a la API, podría saltárselo. |
| **Descargas** | ⚠️ PARCIAL | La lógica de "Solo PRO descarga" no es estricta en el Backend (`exportador_profesional.py` no verifica rol por sí mismo). |

## 3. Flujo de Identidad (Entrega Final)
| Requisito | Estado | Hallazgo Técnico |
| :--- | :--- | :--- |
| **Inyección de Identidad** | ❌ **NO PERSISTENTE** | `ProfileWizard.jsx` guarda en `localStorage` (Cliente). Si el usuario borra caché, pierde su identidad. **Debe guardar en Postgres**. |
| **Nombre en PDF** | ⚠️ RIESGO | El script de PDF lee metadatos, pero si el Wizard no guardó en DB, saldrá "UNK" (Unknown). |

## 4. Auditoría de Rutas y Assets
| Recurso | Ruta Inspeccionada | Resultado |
| :--- | :--- | :--- |
| **Logos Oficiales** | `public/assets/` | ❌ **VACÍA**. El script `exportador_profesional.py` fallará al buscar `escudo_cr.png`. |
| **RAG Core** | `mep-docs` | ✅ OPERATIVO. Scripts e índices existen. |

---

## 🛠️ PLAN DE CORRECCIÓN INMEDIATA (SIGUIENTE SPRINT)
Para certificar el sistema como "Ready for Production", Antigravity ejecutará:

1.  **Migration Patch:** Crear modelo `SecurityLog` en `schema.prisma` y ejecutar `db push`.
2.  **Assets Recovery:** Generar/Descargar placeholders para `escudo_cr.png` y evitar crash del PDF.
3.  **Backend Enforcement:** Actualizar `ProfileWizard` para que escriba en `User` (DB) mediante Server Action.

**Conclusión:** El sistema es funcional lógicamente, pero **inseguro a nivel de persistencia y activos**. No se puede desplegar sin estas 3 correcciones.
