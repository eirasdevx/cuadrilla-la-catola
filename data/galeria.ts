export interface GaleriaAlbum {
  slug: string
  titulo: string
  descripcion: string
  fecha: string
  imagenes: string[]
}

export const imagenesDestacadas: string[] = [
  '/galeria/destacada-1.jpeg',
  '/galeria/destacada-2.jpg',
  '/galeria/destacada-3.jpg',
]

export const albumes: GaleriaAlbum[] = [
  {
    slug: 'fiestas-patronales',
    titulo: 'Fiestas Patronales',
    descripcion: 'Momentos vividos durante las fiestas del pueblo.',
    fecha: '15/08/2025',
    imagenes: [
      '/galeria/fiestas/1.jpg',
      '/galeria/fiestas/2.jpg',
      '/galeria/fiestas/3.jpg',
      '/galeria/fiestas/4.jpg',
    ],
  },
  {
    slug: 'cena-cuadrilla',
    titulo: 'Cena de la Cuadrilla',
    descripcion: 'Una noche para recordar entre amigos.',
    fecha: '02/12/2025',
    imagenes: [
      '/galeria/cena/1.jpg',
      '/galeria/cena/2.jpg',
      '/galeria/cena/3.jpg',
    ],
  },
]
