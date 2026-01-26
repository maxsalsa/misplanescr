# 📡 GUÍA DE CONEXIÓN: Hostinger -> Vercel

Esta es la configuración exacta que debes aplicar en tu panel de Hostinger para conectar `misplanescr.com` con tu proyecto en Vercel.

## 1️⃣ En Vercel (Tu Proyecto)
1. Ve a **Settings (Configuración)** > **Domains (Dominios)**.
2. Escribe `misplanescr.com` y haz clic en **Add**.
3. Vercel te recomendará agregar también `www.misplanescr.com`. **Acepta**.
4. Verás un error en rojo ("Invalid Configuration"). **Es normal**. Vercel te dará unos valores (IP y CNAME). Ignóralos por un momento y usa los siguientes valores estándar.

## 2️⃣ En Hostinger (Panel DNS)
Entra a: [Panel DNS Hostinger](https://hpanel.hostinger.com/domain/misplanescr.com/dns?tab=dns_records)

### 🛑 PASO 1: Eliminar Conflictos
Busca cualquier registro existente de tipo **A** que tenga el nombre `@` y apunte a una IP de Hostinger (suelen empezar con números aleatorios).
**BORRALO**.
*(Si no lo borras, tu dominio seguirá apuntando a la página de "Parking" de Hostinger)*.

### ✅ PASO 2: Registro Principal (Raíz)
Agrega este registro nuevo:
- **Tipo**: `A`
- **Nombre/Host**: `@`
- **Apunta a / Valor**: `76.76.21.21`
- **TTL**: `3600` (o Default)

> *Esto conecta `misplanescr.com` directamento a los servidores de Vercel.*

### ✅ PASO 3: Registro WWW
Agrega este registro nuevo (o edita el existente si ya hay un CNAME www):
- **Tipo**: `CNAME`
- **Nombre/Host**: `www`
- **Apunta a / Valor**: `cname.vercel-dns.com`
- **TTL**: `3600`

## 3️⃣ Verificación
1. Vuelve a Vercel > Domains.
2. Espera unos segundos/minutos. Los círculos rojos deberían cambiar a **Verdes**.
3. Vercel generará automáticamente dos certificados SSL (candadito seguro) para tu sitio.

**⏳ Tiempo de Propagación:**
Aunque suele ser inmediato, los cambios de DNS pueden tardar hasta 1-24 horas en reflejarse mundialmente. Si no funciona al instante, ten paciencia.

---
**Soporte Antigravity**
Si Vercel te pide valores distintos (raro), usa los que Vercel te indique específicamente en su panel. Pero `76.76.21.21` y `cname.vercel-dns.com` son los estándares universales.
