'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/galeria', label: 'Galería' },
  { href: '/nuestra-historia', label: 'Nuestra historia' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-catola-900/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">

        {/* LOGO + NOMBRE */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/escudo-catola.png"
            alt="Escudo La Catola"
            width={44}
            height={44}
            className="transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="text-xl font-extrabold tracking-wide text-dorado-300 group-hover:text-dorado-200 transition">
            La Catola
          </span>
        </Link>

        {/* NAVEGACIÓN */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative transition
                  ${
                    isActive
                      ? 'text-dorado-300 after:w-full'
                      : 'text-catola-50 hover:text-dorado-300 after:w-0'
                  }
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:bg-dorado-300 after:transition-all after:duration-300
                `}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
