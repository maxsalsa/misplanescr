import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from 'sonner';

export const metadata = { title: 'MisPlanesCR', description: 'Plataforma Docente' };

import { AuthProvider } from '@/context/auth-context';
import SessionTimeout from '@/components/security/SessionTimeout';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50/50">
        <AuthProvider>
          <SessionTimeout />
          <Toaster position="top-center" richColors />
          {/* Navbar moved to Dashboard Layout for cleaner Login page */}
          <main className="flex-1 w-full animate-in fade-in duration-500">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
