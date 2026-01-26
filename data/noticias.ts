export type TipoNoticia = 'prensa' | 'radio' | 'tv'

export interface Noticia {
  slug: string
  tipo: TipoNoticia
  titulo: string
  medio: string
  fecha: string
  extracto: string
  contenido: string

  // opcionales según tipo
  enlace?: string        // prensa
  audioUrl?: string      // radio
  youtubeId?: string     // tv
}

export const noticias: Noticia[] = [
  {
    slug: 'catola-en-radio-local',
    tipo: 'radio',
    titulo: 'La Cuadrilla La Catola en Radio Comarcal',
    medio: 'Radio Comarcal FM',
    fecha: '15/08/2025',
    extracto:
      'Entrevista en la que se destaca la implicación de la cuadrilla en las fiestas.',
    contenido:
      'Durante la entrevista se habló del origen de la cuadrilla, su papel en las fiestas y el ambiente que generan en cada evento.',
    audioUrl: '/audio/entrevista-catola.mp3',
  },
  {
    slug: 'catola-en-diario-regional',
    tipo: 'prensa',
    titulo: 'Un evento que une tradición y juventud',
    medio: 'Diario Regional',
    fecha: '02/06/2025',
    extracto:
      'El Diario Regional recoge el último evento organizado por la Cuadrilla La Catola.',
    contenido:
      'El medio regional destacó la capacidad de la cuadrilla para unir generaciones y mantener vivas las tradiciones.',
    enlace: 'https://www.lavozdemedinadigital.com/wordpress/2025/08/la-catola-la-gran-cuadrilla-que-quiere-unir-a-medina-del-campo-en-san-antolin/',
  },
  {
    slug: 'catola-en-television',
    tipo: 'tv',
    titulo: 'Después de varios años vuelve a Medina del Campo',
    medio: 'TV local',
    fecha: '12/12/2025',
    extracto:
      'Entrevista sobre el anuncio de la vuelta de los autos locos a Medina del Campo con nuestros amigos del Grupo Scouts San Juan de la Cruz.',
    contenido:
      'El reportaje muestra la entrevista del anuncio con Telemedina.',
    youtubeId: 'vA9ngfzvMK0',
  },
]
