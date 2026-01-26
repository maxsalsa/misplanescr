import { NextResponse } from 'next/server';
export const config = { matcher: ['/dashboard/:path*', '/admin/:path*'] };
export default function proxy(req) {
  const token = req.cookies.get('auth-token');
  const role = req.cookies.get('user-role')?.value;
  const isPremium = req.cookies.get('subscription')?.value === 'ACTIVE';

  if (!token) return NextResponse.redirect(new URL('/login', req.url));
  
  // Bloqueo de descargas para usuarios FREE
  if (req.nextUrl.pathname.includes('/export') && role !== 'SUPER_ADMIN' && !isPremium) {
    return NextResponse.redirect(new URL('/dashboard/billing', req.url));
  }
  
  return NextResponse.next();
}
