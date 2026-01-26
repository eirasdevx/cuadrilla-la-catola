import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-catola-900 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4 text-sm">

        {/* BLOQUE MARCA */}
        <div>
          <p className="text-lg font-extrabold tracking-tight text-dorado-300">
            La Catola
          </p>

          <p className="mt-4 text-catola-50 leading-relaxed">
            Cuadrilla formada por amistad, tradición y ganas de
            disfrutar juntos cada evento.
          </p>
        </div>

        {/* BLOQUE NAVEGACIÓN */}
        <div>
          <p className="font-semibold text-dorado-300">
            Navegación
          </p>

          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="text-catola-50 hover:text-dorado-300 transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/eventos" className="text-catola-50 hover:text-dorado-300 transition">
                Eventos
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="text-catola-50 hover:text-dorado-300 transition">
                Noticias
              </Link>
            </li>
            <li>
              <Link href="/galeria" className="text-catola-50 hover:text-dorado-300 transition">
                Galería
              </Link>
            </li>
          </ul>
        </div>

        {/* BLOQUE REDES */}
        <div>
          <p className="font-semibold text-dorado-300">
            Redes sociales
          </p>

          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-catola-50 hover:text-dorado-300 transition"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-catola-50 hover:text-dorado-300 transition"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* BLOQUE LEGAL / INFO */}
        <div>
          <p className="font-semibold text-dorado-300">
            Información
          </p>

          <p className="mt-4 text-catola-50">
            © {new Date().getFullYear()}  
            <br />
            Cuadrilla La Catola
          </p>

          <p className="mt-2 text-catola-50">
            Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  )
}
