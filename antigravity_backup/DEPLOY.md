# 🚀 Despliegue de AutoPlanea MEP (MisPlanesCR)

Este proyecto ha sido reingenierizado con la arquitectura **Titanium MEP**. Aquí tienes la guía para conectar tu repositorio GitHub con Vercel/Hostinger.

## 1. Stack Tecnológico (Instalado)
- **Framework**: Next.js 14 (App Router)
- **Base de Datos**: Neon Postgres (Schema Titanium)
- **ORM**: Prisma
- **UI**: Shadcn + Tailwind + Lucide
- **Estado**: Zustand
- **Storage**: Uploadthing

## 2. Configuración en Vercel (Recomendado)
Para que `www.misplanescr.com` funcione:

1.  Entra a [Vercel Dashboard](https://vercel.com).
2.  Importa el repositorio `maxsalsa/misplanescr`.
3.  En **Environment Variables**, agrega:
    - `DATABASE_URL`: (Tu conexión a Neon)
    - `DIRECT_URL`: (Tu conexión a Neon Directa)
    - `UPLOADTHING_SECRET`: (Tu llave de Uploadthing)
    - `UPLOADTHING_APP_ID`: (Tu ID de Uploadthing)
4.  En **Settings > Domains**, agrega `www.misplanescr.com`.

## 3. Comandos de Producción
El `package.json` ya incluye los scripts de post-install para Prisma.

```json
"scripts": {
  "build": "prisma generate && next build",
  ...
}
```

## 4. Auditoría de Datos (Seeds)
Recuerda que para "darle vida" a la base de datos de producción, debes correr el seed desde tu máquina local apuntando a la BD de producción, o habilitar el seed en el build (avanzado).

Para producción local:
`npm run db:seed:marketing`
