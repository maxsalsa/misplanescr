# 📘 MisPlanesCR - Plataforma Enterprise
**Versión:** 1.0.0 (Golden Master)
**Estado:** Producción Ready

## 🌟 Descripción
Sistema de automatización de planeamiento didáctico para el MEP (Costa Rica) potenciado por IA Generativa. Diseñado con arquitectura Server-First para máxima seguridad y rendimiento.

## 🏗️ Arquitectura Técnica
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS.
- **Backend Logic:** Server Actions (src/actions).
- **IA Engine:** Google Gemini Pro 1.5 vía SDK oficial.
- **Base de Datos:** Prisma ORM + PostgreSQL (Neon).
- **UI Kit:** Componentes modulares en `src/components/ui`.

## 🛡️ Seguridad
- Las API Keys nunca se exponen al cliente (`use server`).
- Validación de datos `FormData` antes de enviar a la IA.
- Manejo de errores try/catch global.

## 🚀 Despliegue (Deploy)
1. Configure las variables de entorno (`GEMINI_API_KEY`, `DATABASE_URL`) en su proveedor (Vercel/Netlify).
2. Conecte el repositorio Git.
3. El sistema detectará automáticamente `next.config.mjs` y desplegará.

---
Hecho con excelencia técnica.
