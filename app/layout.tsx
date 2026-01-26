import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Cuadrilla La Catola',
  description: 'Web oficial de la Cuadrilla La Catola',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-catola-700 text-white antialiased">
        
        {/* ================= HEADER ================= */}
        <Header />

        {/* ================= CONTENIDO ================= */}
        {/* pt-24 compensa el header fijo */}
        <main className="pt-0">
          {children}
        </main>

        {/* ================= FOOTER (BASE) ================= */}
        <Footer />
      </body>
    </html>
  )
}
