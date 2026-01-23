import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // Log de depuración para rastrear redirecciones fallidas
            if (isOnDashboard || nextUrl.pathname === '/login') {
                console.log(`🛡️ [AUTH] Path: ${nextUrl.pathname} | In: ${isLoggedIn} | User: ${auth?.user?.email ?? 'none'}`);
            }

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                console.log('🚫 [AUTH] Acceso denegado a dashboard. Redirigiendo a login.');
                return false; // Redirige a /login automáticamente
            } else if (isLoggedIn) {
                if (nextUrl.pathname === '/login' || nextUrl.pathname === '/register') {
                    console.log('🔄 [AUTH] Usuario ya logueado. Saltando a Dashboard Gen.');
                    return Response.redirect(new URL('/dashboard/generator', nextUrl));
                }
            }
            return true;
        },
        async session({ session, token }) {
            // console.log('👤 [SESSION-CB] Processing session for:', token?.email);
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                console.log('🎟️ [JWT-CB] Token created for User:', user.email);
                token.role = (user as any).role;
            }
            return token;
        }
    },
    providers: [], // Providers added in auth.ts to avoid lightweight edge issues
} satisfies NextAuthConfig;
