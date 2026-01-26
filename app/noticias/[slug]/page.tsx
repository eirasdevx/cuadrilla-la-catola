'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { noticias } from '../../../data/noticias'

/* =======================
   ICONOS SVG POR TIPO
======================= */

function NewspaperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 7h11" />
      <path d="M6 11h11" />
      <path d="M6 15h8" />
      <path d="M5 4h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Z" />
      <path d="M4 19a2 2 0 0 0 2 2" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v3" />
      <path d="M9 21h6" />
    </svg>
  )
}

function TvIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3l4 4 4-4" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 21h8" />
    </svg>
  )
}

function TipoBadge({ tipo }: { tipo: 'prensa' | 'radio' | 'tv' }) {
  const map = {
    prensa: { label: 'Prensa', Icon: NewspaperIcon },
    radio: { label: 'Radio', Icon: MicIcon },
    tv: { label: 'Televisión', Icon: TvIcon },
  } as const

  const { label, Icon } = map[tipo]

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-dorado-500/60 px-4 py-1 text-xs font-semibold text-dorado-300 bg-catola-900/30">
      <Icon />
      {label}
    </span>
  )
}

/* =======================
   COMPONENTE
======================= */

export default function NoticiaDetallePage() {
  const { slug } = useParams()
  const noticia = noticias.find(n => n.slug === slug)

  if (!noticia) {
    return (
      <p className="text-center py-32 text-catola-50">
        Noticia no encontrada
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
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-catola-50/70 mb-10">
            <Link href="/noticias" className="hover:text-dorado-300 transition">
              ← Noticias
            </Link>
          </nav>

          {/* Badge tipo */}
          <TipoBadge tipo={noticia.tipo} />

          {/* Medio */}
          <p className="mt-6 text-sm uppercase tracking-widest text-dorado-300">
            {noticia.medio}
          </p>

          {/* Título */}
          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            {noticia.titulo}
          </h1>

          {/* EXTRACTO */}
          <p className="mt-6 text-xl leading-relaxed text-catola-50/90">
            {noticia.extracto}
          </p>

          <div className="mt-8 h-1 w-20 bg-dorado-500" />

          {/* Fecha */}
          <p className="mt-6 text-sm text-catola-50/70">
            {noticia.fecha}
          </p>
        </div>
      </section>

      {/* ================= CONTENIDO ================= */}
      <section className="max-w-3xl mx-auto px-6 pt-0 pb-32 space-y-12">
        <p className="text-xl leading-relaxed text-catola-50">
          {noticia.contenido}
        </p>

        {/* ===== PRENSA ===== */}
        {noticia.tipo === 'prensa' && noticia.enlace && (
          <a
            href={noticia.enlace}
            target="_blank"
            className="inline-flex items-center gap-2 text-dorado-300 font-semibold transition-all duration-300 hover:gap-3"
          >
            Leer noticia original →
          </a>
        )}

        {/* ===== RADIO ===== */}
        {noticia.tipo === 'radio' && noticia.audioUrl && (
          <div className="rounded-3xl bg-catola-800 p-8">
            <p className="mb-4 text-dorado-300 font-semibold">
              Escuchar entrevista
            </p>
            <audio controls className="w-full">
              <source src={noticia.audioUrl} type="audio/mpeg" />
              Tu navegador no soporta audio.
            </audio>
          </div>
        )}

        {/* ===== TV ===== */}
        {noticia.tipo === 'tv' && noticia.youtubeId && (
          <div className="aspect-video rounded-3xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${noticia.youtubeId}`}
              title={noticia.titulo}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </section>
    </motion.main>
  )
}
