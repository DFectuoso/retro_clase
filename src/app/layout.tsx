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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
          <div className="container mx-auto">
            RetroFeedback © {new Date().getFullYear()}
          </div>
        </footer>
      </body>
    </html>
  );
}
