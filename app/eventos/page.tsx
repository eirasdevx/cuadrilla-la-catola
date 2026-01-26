'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { eventos } from '../../data/eventos'

/* =======================
   UTILIDAD FECHA
======================= */

function parseFecha(fecha: string): Date {
  const [d, m, y] = fecha.split('/').map(Number)
  return new Date(y, m - 1, d)
}

/* =======================
   ANIMACIONES
======================= */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

/* =======================
   COMPONENTE
======================= */

export default function EventosPage() {
  // 🔒 Orden fijo: más reciente → más antiguo
  const eventosOrdenados = [...eventos].sort((a, b) => {
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
            Eventos
          </p>

          <h1 className="mt-6 text-6xl font-extrabold">
            Próximos
            <br />
            <span className="text-dorado-300">encuentros</span>
          </h1>

          <div className="mx-auto mt-10 h-1 w-24 bg-dorado-500" />
        </div>
      </section>

      {/* ================= LISTADO ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-32 space-y-10">
        {eventosOrdenados.map((evento) => (
          <motion.div key={evento.slug} variants={itemVariants}>
            <Link
              href={`/eventos/${evento.slug}`}
              className="
                block rounded-3xl bg-catola-700 p-12
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-catola-600
                hover:shadow-2xl hover:shadow-black/30
              "
            >
              <h2 className="text-3xl font-extrabold text-dorado-300">
                {evento.titulo}
              </h2>

              <p className="mt-4 text-catola-50">
                {evento.fecha} · {evento.lugar}
              </p>

              <p className="mt-6 text-lg text-catola-50 leading-relaxed">
                {evento.descripcion}
              </p>

              <span className="inline-flex mt-8 text-sm font-semibold text-dorado-300">
                Ver detalle →
              </span>
            </Link>
          </motion.div>
        ))}
      </section>
    </motion.main>
  )
}
