import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CatGallery",
  description: "Galería de gatos construida con Next.js",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-zinc-50 text-zinc-900 antialiased flex flex-col min-h-screen">
        {/* Barra de Navegación Global */}
        <nav className="bg-zinc-900 text-white p-4 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <Link 
              href="/" 
              className="text-2xl font-black hover:text-blue-400 transition-colors tracking-tighter"
            >
              🐈 CatGallery
            </Link>
            <p className="text-sm text-zinc-400 hidden sm:block">Next.js 15 App Router</p>
          </div>
        </nav>

        {/* Inyección de todas las paginas */}
        <div className="flex-grow">
          {children}
          {modal}
        </div>

        {/* Footer Global */}
        <footer className="bg-zinc-100 py-6 text-center text-zinc-500 text-sm border-t border-zinc-200">
          <p>© {new Date().getFullYear()} CatGallery</p>
        </footer>
      </body>
    </html>
  );
}