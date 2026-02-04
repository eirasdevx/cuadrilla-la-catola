export interface Evento {
  slug: string
  titulo: string
  fecha: string
  lugar: string
  descripcion: string
}

export const eventos: Evento[] = [
  {
    slug: 'fiestas-san-antolin-2026',
    titulo: 'San Antonio 2026',
    fecha: '03/09/2026',
    lugar: 'Plaza Mayor',
    descripcion:
      'Participación de la Cuadrilla La Catola en las fiestas patronales con comidas, charanga y actividades.',
  },
]
