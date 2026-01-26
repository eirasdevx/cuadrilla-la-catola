'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants, useMotionValue } from 'framer-motion'
import { imagenesDestacadas, albumes } from '../../data/galeria'
import type { GaleriaAlbum } from '../../data/galeria'

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

export default function GaleriaPage() {
  const [indiceActivo, setIndiceActivo] = useState<number | null>(null)
  const [zoom, setZoom] = useState<number>(1)

  // Posición para drag (mejor que useState para que vaya fino)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const imagenActiva = useMemo(() => {
    if (indiceActivo === null) return null
    return imagenesDestacadas[indiceActivo] ?? null
  }, [indiceActivo])

  // Helpers
  const resetView = () => {
    x.set(0)
    y.set(0)
  }

  const cerrar = () => {
    setIndiceActivo(null)
    setZoom(1)
    resetView()
  }

  const siguiente = () => {
    setIndiceActivo((i) => {
      if (i === null) return i
      const next = Math.min(imagenesDestacadas.length - 1, i + 1)
      return next
    })
    setZoom(1)
    resetView()
  }

  const anterior = () => {
    setIndiceActivo((i) => {
      if (i === null) return i
      const prev = Math.max(0, i - 1)
      return prev
    })
    setZoom(1)
    resetView()
  }

  const abrir = (i: number) => {
    setIndiceActivo(i)
    setZoom(1)
    resetView()
  }

  // Teclado (ya no falla porque las funciones están declaradas antes)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowRight') siguiente()
      if (e.key === 'ArrowLeft') anterior()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indiceActivo])

  // Si baja el zoom a 1, resetea posición para que no se quede “perdida”
  useEffect(() => {
    if (zoom <= 1) resetView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom])

  return (
    <>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-catola-900 text-white"
      >
        {/* ================= HERO ================= */}
        <section className="relative py-32 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <p className="text-sm uppercase tracking-widest text-dorado-300">
              Galería
            </p>

            <h1 className="mt-6 text-6xl font-extrabold">
              Momentos que
              <br />
              <span className="text-dorado-300">se quedan</span>
            </h1>

            <div className="mx-auto mt-10 h-1 w-24 bg-dorado-500" />

            <p className="mt-10 text-xl text-catola-50 max-w-3xl mx-auto">
              Recuerdos de eventos y encuentros de la{' '}
              <strong>Cuadrilla La Catola</strong>.
            </p>
          </div>
        </section>

        {/* ================= DESTACADAS ================= */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-24 pb-32">
          <div className="grid gap-6 md:grid-cols-3">
            {imagenesDestacadas.map((src: string, i: number) => (
              <motion.button
                key={i}
                variants={itemVariants}
                type="button"
                aria-label="Abrir imagen"
                onClick={() => abrir(i)}
                className="
                  relative aspect-[4/5]
                  rounded-3xl overflow-hidden
                  bg-catola-700
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-2xl hover:shadow-black/30
                  focus:outline-none
                "
              >
                <Image
                  src={src}
                  alt="Imagen destacada de la cuadrilla"
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </section>

        {/* ================= ÁLBUMES ================= */}
        <section className="max-w-6xl mx-auto px-6 pb-32 space-y-16">
          {albumes.map((album: GaleriaAlbum) => (
            <motion.div key={album.slug} variants={itemVariants}>
              <Link
                href={`/galeria/${album.slug}`}
                className="
                  group block rounded-3xl
                  bg-catola-700 p-10
                  transition-all duration-300
                  hover:bg-catola-600
                  hover:-translate-y-1
                  hover:shadow-2xl hover:shadow-black/30
                "
              >
                <p className="text-sm text-catola-50/70">{album.fecha}</p>

                <h2 className="mt-2 text-3xl font-extrabold text-dorado-300">
                  {album.titulo}
                </h2>

                <p className="mt-4 text-catola-50 max-w-xl">
                  {album.descripcion}
                </p>

                <span className="inline-flex mt-6 text-sm font-semibold text-dorado-300 transition-all group-hover:gap-3">
                  Ver álbum →
                </span>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-catola-800 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold text-dorado-300">
              Cada evento deja huella
            </h2>

            <div className="mx-auto mt-6 h-1 w-20 bg-dorado-500" />

            <p className="mt-8 text-catola-50 text-lg">
              Muy pronto podrás revivir cada momento imagen a imagen.
            </p>
          </div>
        </section>
      </motion.main>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {imagenActiva && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrar}
          >
            <motion.div
              className="relative w-full h-full max-w-6xl flex items-center justify-center"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Click lateral para navegar */}
              <button
                type="button"
                onClick={anterior}
                className="absolute left-0 top-0 h-full w-1/5 z-10 cursor-w-resize"
                aria-label="Anterior"
              />
              <button
                type="button"
                onClick={siguiente}
                className="absolute right-0 top-0 h-full w-1/5 z-10 cursor-e-resize"
                aria-label="Siguiente"
              />

              {/* Botones visibles (mejor UX) */}
              <button
                type="button"
                onClick={anterior}
                disabled={indiceActivo === 0}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 px-4 py-3 text-white hover:bg-black/60 disabled:opacity-30"
              >
                ←
              </button>

              <button
                type="button"
                onClick={siguiente}
                disabled={indiceActivo === imagenesDestacadas.length - 1}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 px-4 py-3 text-white hover:bg-black/60 disabled:opacity-30"
              >
                →
              </button>

              {/* Imagen arrastrable */}
              <div className="w-full flex items-center justify-center overflow-hidden">
                <motion.div
                  drag={zoom > 1}
                  dragMomentum={false}
                  style={{ x, y }}
                  animate={{ scale: zoom }}
                  transition={{ duration: 0.15 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={imagenActiva}
                    alt="Imagen ampliada"
                    width={1800}
                    height={1200}
                    className="max-h-[85vh] w-auto object-contain pointer-events-none select-none"
                    priority
                  />
                </motion.div>
              </div>

              {/* Controles */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.max(1, +(z - 0.2).toFixed(1)))
                  }
                  className="rounded-full bg-dorado-500 px-4 py-2 font-extrabold text-catola-900"
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.min(3, +(z + 0.2).toFixed(1)))
                  }
                  className="rounded-full bg-dorado-500 px-4 py-2 font-extrabold text-catola-900"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setZoom(1)
                    resetView()
                  }}
                  className="rounded-full border border-dorado-500/60 px-4 py-2 font-semibold text-dorado-200 hover:bg-dorado-500 hover:text-catola-900 transition"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={cerrar}
                  className="rounded-full border border-dorado-500/60 px-4 py-2 font-semibold text-dorado-200 hover:bg-dorado-500 hover:text-catola-900 transition"
                >
                  Cerrar (Esc)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
