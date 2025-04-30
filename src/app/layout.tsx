import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RetroFeedback - Recolecta feedback de tus eventos",
  description: "Herramienta para obtener retroalimentación después de clases, cursos o cualquier actividad mediante Net Promoter Score (NPS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#F2ECDF]/30`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-[#0F2642] py-8 text-center text-[#F2ECDF]/80 text-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="font-bold text-xl text-[#F2ECDF]">RetroFeedback</span> © {new Date().getFullYear()}
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-[#F2B544] transition-colors duration-300">Términos</a>
                <a href="#" className="hover:text-[#F2B544] transition-colors duration-300">Privacidad</a>
                <a href="#" className="hover:text-[#F2B544] transition-colors duration-300">Contacto</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
