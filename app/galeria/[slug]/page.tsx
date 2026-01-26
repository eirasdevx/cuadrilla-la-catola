'use client'

import { useEffect, useMemo, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { albumes } from '../../../data/galeria'
import type { GaleriaAlbum } from '../../../data/galeria'

export default function GaleriaAlbumPage() {
  const params = useParams()
  const slug = params.slug as string

  const album: GaleriaAlbum | undefined = albumes.find(
    (a) => a.slug === slug
  )

  if (!album) notFound()

  const [indiceActivo, setIndiceActivo] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const imagenActiva = useMemo(() => {
    if (indiceActivo === null) return null
    return album.imagenes[indiceActivo] ?? null
  }, [indiceActivo, album.imagenes])

  /* =======================
     HELPERS
  ======================= */

  const resetView = () => {
    x.set(0)
    y.set(0)
  }

  const abrir = (i: number) => {
    setIndiceActivo(i)
    setZoom(1)
    resetView()
  }

  const cerrar = () => {
    setIndiceActivo(null)
    setZoom(1)
    resetView()
  }

  const siguiente = () => {
    setIndiceActivo((i) => {
      if (i === null) return i
      return Math.min(album.imagenes.length - 1, i + 1)
    })
    setZoom(1)
    resetView()
  }

  const anterior = () => {
    setIndiceActivo((i) => {
      if (i === null) return i
      return Math.max(0, i - 1)
    })
    setZoom(1)
    resetView()
  }

  /* =======================
     TECLADO
  ======================= */

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

  useEffect(() => {
    if (zoom <= 1) resetView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom])

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-catola-900 text-white"
      >
        {/* ================= CABECERA ================= */}
        <section className="relative py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-catola-700 to-catola-900 opacity-95" />

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-widest text-dorado-300">
              Galería
            </p>

            <h1 className="mt-6 text-5xl font-extrabold">
              {album.titulo}
            </h1>

            <div className="mx-auto mt-8 h-1 w-20 bg-dorado-500" />

            <p className="mt-6 text-catola-50 max-w-3xl mx-auto">
              {album.descripcion}
            </p>

            <p className="mt-4 text-sm text-catola-50/70">
              {album.fecha}
            </p>
          </div>
        </section>

        {/* ================= GRID ================= */}
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {album.imagenes.map((src: string, i: number) => (
              <motion.button
                key={i}
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                onClick={() => abrir(i)}
                className="
                  relative aspect-square
                  rounded-3xl overflow-hidden
                  bg-catola-700
                  hover:-translate-y-1
                  hover:shadow-2xl hover:shadow-black/30
                  transition-all
                  focus:outline-none
                "
              >
                <Image
                  src={src}
                  alt={`${album.titulo} imagen ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </section>

        {/* ================= VOLVER ================= */}
        <section className="pb-24 text-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 text-dorado-300 font-semibold hover:gap-3 transition-all"
          >
            ← Volver a la galería
          </Link>
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
              {/* ZONAS CLICK */}
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

              {/* BOTONES */}
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
                disabled={indiceActivo === album.imagenes.length - 1}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 px-4 py-3 text-white hover:bg-black/60 disabled:opacity-30"
              >
                →
              </button>

              {/* IMAGEN */}
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

              {/* CONTROLES */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                <button
                  onClick={() =>
                    setZoom((z) => Math.max(1, +(z - 0.2).toFixed(1)))
                  }
                  className="rounded-full bg-dorado-500 px-4 py-2 font-extrabold text-catola-900"
                >
                  −
                </button>

                <button
                  onClick={() =>
                    setZoom((z) => Math.min(3, +(z + 0.2).toFixed(1)))
                  }
                  className="rounded-full bg-dorado-500 px-4 py-2 font-extrabold text-catola-900"
                >
                  +
                </button>

                <button
                  onClick={() => {
                    setZoom(1)
                    resetView()
                  }}
                  className="rounded-full border border-dorado-500/60 px-4 py-2 font-semibold text-dorado-200 hover:bg-dorado-500 hover:text-catola-900 transition"
                >
                  Reset
                </button>

                <button
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
