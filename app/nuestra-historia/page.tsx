'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function QuienesSomosPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-catola-900 text-white"
    >
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-dorado-300">
            Nuestra historia
          </p>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight">
            Cuadrilla
            <br />
            <span className="text-dorado-300">La Catola</span>
          </h1>

          <div className="mx-auto mt-10 h-1 w-24 bg-dorado-500" />

          <p className="mt-10 text-xl text-catola-50 max-w-3xl mx-auto">
            No somos solo una cuadrilla.
            <br />
            Somos amistad, tradición y una forma de vivir la fiesta.
          </p>
        </div>
      </section>

      {/* ================= HISTORIA ================= */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid gap-16 md:grid-cols-2 items-start">
          {/* TEXTO */}
          <div>
            <h2 className="text-4xl font-extrabold text-dorado-300">
              Nuestra historia
            </h2>

            <div className="mt-6 h-1 w-16 bg-dorado-500" />

            <p className="mt-8 text-lg text-catola-50 leading-relaxed">
              La <strong>Cuadrilla La Catola</strong> nace de la amistad
              y se fortalece con los años. No somos solo un grupo que se reúne
              para salir de fiesta, somos personas que comparten momentos,
              celebraciones y recuerdos que se quedan para siempre.
            </p>

            <p className="mt-6 text-lg text-catola-50 leading-relaxed">
              Participamos activamente en las fiestas, cuidamos las tradiciones
              y creemos que la mejor forma de celebrar es hacerlo juntos,
              con respeto, unión y buen ambiente.
            </p>
          </div>

          {/* CIFRAS INTEGRADAS */}
          <div className="rounded-3xl bg-catola-800 p-12">
            <div className="grid gap-10">
              {[
                ['+60', 'Personas'],
                ['1', 'Año juntos'],
                ['∞', 'Recuerdos'],
              ].map(([numero, texto]) => (
                <div key={texto}>
                  <p className="text-6xl font-extrabold text-dorado-500">
                    {numero}
                  </p>
                  <p className="mt-2 text-catola-50">
                    {texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALORES ================= */}
      <section className="bg-catola-800 py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-dorado-300 text-center">
            Lo que nos define
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 bg-dorado-500" />

          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {[
              [
                'Amistad',
                'La base de la cuadrilla. Sin amistad, no hay Catola.',
              ],
              [
                'Tradición',
                'Formamos parte de las fiestas y costumbres que nos representan.',
              ],
              [
                'Fiesta',
                'Disfrutamos cada evento con intensidad y responsabilidad.',
              ],
            ].map(([titulo, texto]) => (
              <div
                key={titulo}
                className="
                  rounded-3xl bg-catola-700 p-10
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-catola-600
                "
              >
                <h3 className="text-2xl font-bold text-dorado-300">
                  {titulo}
                </h3>

                <div className="mt-4 h-1 w-12 bg-dorado-500" />

                <p className="mt-6 text-catola-50 leading-relaxed">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CIERRE ================= */}
      <section className="py-36 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-dorado-300">
            La Catola no se explica,
            <br />
            <span className="text-white">se vive</span>
          </h2>

          <div className="mx-auto mt-8 h-1 w-24 bg-dorado-500" />

          <p className="mt-10 text-xl text-catola-50">
            Descubre nuestros eventos y forma parte
            de los próximos capítulos de la cuadrilla.
          </p>

          <Link
            href="/eventos"
            className="
              mt-12 inline-flex items-center justify-center
              rounded-xl bg-dorado-500 px-12 py-4
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
