'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/galeria', label: 'Galería' },
  { href: '/nuestra-historia', label: 'Nuestra historia' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-catola-900/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/escudo-catola.png"
            alt="Escudo La Catola"
            width={44}
            height={44}
            priority
          />
          <span className="text-xl font-extrabold tracking-wide text-dorado-300">
            La Catola
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative transition
                ${
                  isActive(item.href)
                    ? 'text-dorado-300 after:w-full'
                    : 'text-catola-50 hover:text-dorado-300 after:w-0'
                }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:bg-dorado-300 after:transition-all
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* BOTÓN MÓVIL */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-dorado-300"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {open && (
        <div className="md:hidden bg-catola-900/95 backdrop-blur border-t border-white/10">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  text-lg font-medium transition
                  ${
                    isActive(item.href)
                      ? 'text-dorado-300'
                      : 'text-catola-50 hover:text-dorado-300'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
