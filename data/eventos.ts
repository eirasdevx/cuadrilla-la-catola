export interface Evento {
  slug: string
  titulo: string
  fecha: string
  lugar: string
  descripcion: string
}

export const eventos: Evento[] = [
  {
    slug: 'fiestas-san-antolin-2025',
    titulo: 'San Antonio 2026',
    fecha: '03/09/2025',
    lugar: 'Plaza Mayor',
    descripcion:
      'Participación de la Cuadrilla La Catola en las fiestas patronales con comidas, charanga y actividades.',
  },
  {
    slug: 'fiestas-san-antonio-2026',
    titulo: 'San Antonio 2026',
    fecha: '13/06/2026',
    lugar: 'Plaza Mayor',
    descripcion:
      'Participación de la Cuadrilla La Catola en las fiestas patronales con comidas, charanga y actividades.',
  },
]
