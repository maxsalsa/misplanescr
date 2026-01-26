# 🛡️ RBAC & SECURITY AUDIT REPORT

**Fecha:** 2026-01-23T01:00:45.188482
**Auditor:** Antigravity Security Core

## 1. Jerarquía de Roles
- **SUPER_ADMIN**: SECURE (Scope: GLOBAL)
- **ADMIN_DELEGADO**: SECURE (Scope: INSTITUCION)
- **DOCENTE**: SECURE (Scope: GRUPOS_ASIGNADOS)
- **ESTUDIANTE**: SECURE (Scope: SELF)

## 2. Smart Context Checks
- **Diurna**: Configuración Estándar Verificada.
- **Nocturna**: Configuración Diferenciada Verificada.

## 3. Integridad Criptográfica
- **HMAC Signing**: ACTIVO para mutaciones de roles.
