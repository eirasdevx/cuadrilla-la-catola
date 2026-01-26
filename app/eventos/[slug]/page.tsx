'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { eventos } from '../../../data/eventos'
import { motion } from 'framer-motion'

export default function EventoPage() {
  const { slug } = useParams()
  const evento = eventos.find(e => e.slug === slug)

  if (!evento) {
    return (
      <p className="text-center text-catola-50 py-32">
        Evento no encontrado
      </p>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-catola-900 text-white"
    >
      {/* ================= HERO EVENTO ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-catola-50/70 mb-10">
            <Link href="/" className="hover:text-dorado-300 transition">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/eventos" className="hover:text-dorado-300 transition">
              Eventos
            </Link>
          </nav>

          <h1 className="text-6xl font-extrabold leading-tight">
            {evento.titulo}
          </h1>

          <div className="mt-8 h-1 w-24 bg-dorado-500" />

          <div className="mt-10 flex flex-wrap gap-6 text-catola-50">
            <span className="inline-flex items-center gap-2">
              📅 <strong>{evento.fecha}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              📍 <strong>{evento.lugar}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ================= CONTENIDO ================= */}
      <section className="max-w-3xl mx-auto px-6 pt-6 pb-32 space-y-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-catola-50 leading-relaxed"
        >
          {evento.descripcion}
        </motion.p>

        <div className="rounded-3xl bg-catola-800 p-10">
          <p className="text-catola-50 leading-relaxed">
            La <strong>Cuadrilla La Catola</strong> participa activamente en este evento,
            promoviendo la convivencia, la tradición y el buen ambiente.
            Cada encuentro es una oportunidad para seguir creando recuerdos juntos.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-catola-800 py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <Link
            href="/eventos"
            className="
              rounded-xl bg-dorado-500 px-10 py-4
              font-semibold text-catola-900
              transition hover:opacity-90
            "
          >
            Volver a eventos
          </Link>
        </div>
      </section>
    </motion.main>
  )
}
