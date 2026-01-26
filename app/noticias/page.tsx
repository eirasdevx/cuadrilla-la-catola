'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { noticias } from '../../data/noticias'

/* =======================
   UTILIDAD FECHA
======================= */

function parseFecha(fecha: string): Date {
  const [d, m, y] = fecha.split('/').map(Number)
  return new Date(y, m - 1, d)
}

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
    <span
      className="
        inline-flex items-center gap-2
        rounded-full border border-dorado-500/60
        px-3 py-1
        text-xs font-semibold text-dorado-300
        bg-catola-900/20
      "
    >
      <Icon />
      {label}
    </span>
  )
}

/* =======================
   ANIMACIONES
======================= */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

/* =======================
   COMPONENTE
======================= */

export default function NoticiasPage() {
  // 🔒 Orden fijo: más reciente → más antigua
  const noticiasOrdenadas = [...noticias].sort((a, b) => {
    const fa = parseFecha(a.fecha).getTime()
    const fb = parseFecha(b.fecha).getTime()
    return fb - fa
  })

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-catola-900 text-white"
    >
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-dorado-300">
            En los medios
          </p>

          <h1 className="mt-6 text-6xl font-extrabold">
            La Catola
            <br />
            <span className="text-dorado-300">en prensa, radio y TV</span>
          </h1>

          <div className="mx-auto mt-10 h-1 w-24 bg-dorado-500" />

          <p className="mt-10 text-xl text-catola-50 max-w-3xl mx-auto">
            Apariciones en medios relacionadas con la{' '}
            <strong>Cuadrilla La Catola</strong>.
          </p>
        </div>
      </section>

      {/* ================= LISTADO ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-32 space-y-10">
        {noticiasOrdenadas.map((noticia) => (
          <motion.div key={noticia.slug} variants={itemVariants}>
            <Link
              href={`/noticias/${noticia.slug}`}
              className="
                group block rounded-3xl overflow-hidden
                bg-catola-700 p-12
                transition-all duration-300
                hover:-translate-y-1 hover:bg-catola-600
                hover:shadow-2xl hover:shadow-black/30
              "
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-catola-50/70">
                  {noticia.fecha} · {noticia.medio}
                </p>

                <TipoBadge tipo={noticia.tipo} />
              </div>

              <h2
                className="
                  mt-4 text-3xl font-extrabold text-dorado-300
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              >
                {noticia.titulo}
              </h2>

              <div className="mt-4 h-1 w-14 bg-dorado-500" />

              <p className="mt-6 text-lg text-catola-50 leading-relaxed max-w-4xl">
                {noticia.extracto}
              </p>

              <span
                className="
                  inline-flex mt-8 text-sm font-semibold text-dorado-300
                  transition-all duration-300
                  group-hover:gap-3
                "
              >
                Ver detalle →
              </span>
            </Link>
          </motion.div>
        ))}
      </section>
    </motion.main>
  )
}
