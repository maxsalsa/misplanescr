import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AulaPlan | Gestión MEP",
  description: "Sistema Integral Docente",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}