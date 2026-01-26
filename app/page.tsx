'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { eventos } from '../data/eventos'

/* =========================
   ICONOS SVG
========================= */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-7H8v-2.88h2.44V9.41c0-2.42 1.44-3.76 3.64-3.76 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.2 0-1.57.74-1.57 1.5v1.8H16.9L16.4 14.88h-2.96v7C18.34 21.13 22 17 22 12Z" />
    </svg>
  )
}

/* =========================
   UTILIDAD: PRÓXIMO EVENTO
========================= */
function getProximoEvento() {
  const hoy = new Date()

  return eventos
    .map((evento) => {
      const [d, m, y] = evento.fecha.split('/').map(Number)
      return { ...evento, fechaDate: new Date(y, m - 1, d) }
    })
    .filter((e) => e.fechaDate >= hoy)
    .sort((a, b) => a.fechaDate.getTime() - b.fechaDate.getTime())[0]
}

/* =========================
   COMPONENTE
========================= */
export default function HomePage() {
  const proximoEvento = getProximoEvento()
  if (!proximoEvento) return null

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-catola-900 text-white space-y-32"
    >
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

        <div className="relative max-w-6xl mx-auto px-6 grid gap-16 md:grid-cols-2 items-center">
          {/* TEXTO */}
          <div>
            <h1 className="text-6xl font-extrabold leading-tight">
              Cuadrilla
              <br />
              La Catola
            </h1>

            <div className="mt-6 h-1 w-20 bg-dorado-500" />

            <p className="mt-8 text-xl text-catola-50">
              Amistad, tradición y fiesta.
              <br />
              Vivimos cada evento juntos.
            </p>

            <div className="mt-10">
              <Link
                href="/nuestra-historia"
                className="
                  inline-block rounded-xl
                  bg-dorado-500 px-8 py-4
                  font-semibold text-catola-900
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30
                "
              >
                Quiénes somos
              </Link>
            </div>
          </div>

          {/* ESCUDO + REDES */}
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/escudo-catola.png"
              alt="Escudo Cuadrilla La Catola"
              width={220}
              height={220}
              priority
            />

            <div className="flex gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-full border border-dorado-500
                  text-dorado-300
                  transition-all duration-300
                  hover:bg-dorado-500 hover:text-catola-900
                  hover:-translate-y-0.5
                "
              >
                <InstagramIcon />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-full border border-dorado-500
                  text-dorado-300
                  transition-all duration-300
                  hover:bg-dorado-500 hover:text-catola-900
                  hover:-translate-y-0.5
                "
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IDENTIDAD ================= */}
      <section className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        {[
          ['Tradición', 'Nuestra historia se construye alrededor de las fiestas y costumbres.'],
          ['Amistad', 'Años compartidos, experiencias vividas y una cuadrilla unida.'],
          ['Fiesta', 'Disfrutamos cada evento con intensidad y respeto.'],
        ].map(([titulo, texto]) => (
          <div
            key={titulo}
            className="rounded-3xl bg-catola-700 p-10 transition hover:bg-catola-600"
          >
            <h3 className="text-2xl font-bold text-dorado-300">{titulo}</h3>
            <div className="mt-4 h-1 w-12 bg-dorado-500" />
            <p className="mt-6 text-catola-50 leading-relaxed">{texto}</p>
          </div>
        ))}
      </section>

      {/* ================= CONTADOR ================= */}
      <section className="bg-catola-800 py-24">
        <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-3 text-center">
          {[
            ['+60', 'Personas'],
            ['1', 'Año juntos'],
            ['∞', 'Momentos'],
          ].map(([numero, label]) => (
            <div key={label}>
              <p className="text-6xl font-extrabold text-dorado-500">{numero}</p>
              <p className="mt-4 text-catola-50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRÓXIMO EVENTO ================= */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href={`/eventos/${proximoEvento.slug}`}
          className="
            group block rounded-3xl overflow-hidden bg-white
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30
          "
        >
          <div className="grid md:grid-cols-2">
            <div className="p-12 text-gray-900">
              <p className="text-sm uppercase tracking-widest text-dorado-500">
                El siguiente plan
              </p>

              <h2 className="mt-6 text-4xl font-extrabold text-catola-700">
                {proximoEvento.titulo}
              </h2>

              <p className="mt-4 text-gray-600">
                {proximoEvento.fecha} · {proximoEvento.lugar}
              </p>

              <p className="mt-8 text-lg text-gray-700 leading-relaxed">
                {proximoEvento.descripcion}
              </p>

              <span
                className="
                  inline-flex mt-10 rounded-xl
                  bg-catola-500 px-8 py-4
                  text-white font-medium
                  transition-all duration-300
                  group-hover:bg-catola-700
                "
              >
                Me apunto →
              </span>
            </div>

            <div className="bg-catola-700 p-12 flex flex-col justify-center">
              <p className="text-lg text-dorado-300">📅 {proximoEvento.fecha}</p>
              <p className="mt-4 text-lg text-dorado-300">📍 {proximoEvento.lugar}</p>
              <div className="mt-10 h-1 w-16 bg-dorado-500" />
              <p className="mt-8 text-catola-50">
                Un evento destacado en el calendario de la
                <strong> Cuadrilla La Catola</strong>.
              </p>
            </div>
          </div>
        </Link>
      </motion.section>

      {/* ================= CTA FINAL ================= */}
      <section className="bg-catola-900 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-dorado-300">
            ¿Te vienes al próximo?
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 bg-dorado-500" />

          <p className="mt-6 text-catola-50">
            Consulta todos los eventos y vive la Catola desde dentro.
          </p>

          <Link
            href="/eventos"
            className="
              mt-10 inline-flex rounded-xl
              bg-dorado-500 px-10 py-4
              font-semibold text-catola-900
              transition hover:opacity-90
            "
          >
            Ver eventos
          </Link>
        </div>
      </section>
    </motion.main>
  )
}
