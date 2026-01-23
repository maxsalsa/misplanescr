import "./globals.css";
import { Inter } from 'next/font/google';
import { GlobalProviders } from '@/components/providers/GlobalProviders';
import { auth } from '@/auth';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://misplanescr.com'),
    title: {
        default: 'Aulaplan | Gestión Inteligente para Docentes MEP',
        template: '%s | Aulaplan CR'
    },
    description: 'Plataforma oficial para docentes técnicos en Costa Rica. Planeamientos, evaluación y gestión educativa con estándares Antigravity.',
    keywords: ['MEP', 'Planeamiento Didáctico', 'Soporte TI', 'Docentes Costa Rica', 'Aulaplan', 'Antigravity'],
    authors: [{ name: 'Prof. Max Salazar Sánchez', url: 'https://misplanescr.com' }],
    creator: 'Antigravity Core',

    // Open Graph
    openGraph: {
        type: 'website',
        locale: 'es_CR',
        url: 'https://misplanescr.com',
        siteName: 'Aulaplan - Mis Planes CR',
        images: [
            {
                url: '/og-aulaplan-share.png',
                width: 1200,
                height: 630,
                alt: 'Aulaplan Dashboard',
            },
        ],
    },

    // Robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function RootLayout({ children }) {
    const session = await auth();

    return (
        <html lang="es" data-theme="light">
            <body className={inter.className} suppressHydrationWarning>
                <GlobalProviders session={session}>
                    {children}
                    <WhatsAppFloat />
                </GlobalProviders>
            </body>
        </html>
    );
}
