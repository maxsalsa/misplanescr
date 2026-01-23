import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

/**
 * Middleware de Protección de Rutas
 * Intercepta todas las peticiones (excepto estáticas y API pública)
 * para verificar la sesión del usuario usando NextAuth.
 */
// export default NextAuth(authConfig).auth; // Removed to avoid duplicate default export

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// 🛡️ FORTRESS RATE LIMITER (Kaizen 35.0)
// Simple in-memory counter (per instance). For clustered env, use Redis (Neon).
const RATE_LIMIT_MAP = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;

function checkRateLimit(req) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    // Whitelist SuperAdmin IP if known? For now, we apply to all.

    if (!RATE_LIMIT_MAP.has(ip)) {
        RATE_LIMIT_MAP.set(ip, { count: 1, start: Date.now() });
        return true;
    }

    const record = RATE_LIMIT_MAP.get(ip);
    if (Date.now() - record.start > WINDOW_MS) {
        // Reset window
        RATE_LIMIT_MAP.set(ip, { count: 1, start: Date.now() });
        return true;
    }

    if (record.count >= MAX_REQUESTS) {
        console.warn(`⛔ RATE LIMIT EXCEEDED: ${ip}`);
        return false;
    }

    record.count++;
    return true;
}

// Middleware function
async function middleware(req) {
    if (!checkRateLimit(req)) {
        return new Response("⛔ Demasiadas solicitudes. Resiliencia Activada.", { status: 429 });
    }
    // Call the auth middleware
    return await NextAuth(authConfig).auth(req);
}

export default middleware;
