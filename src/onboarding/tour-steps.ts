export interface TourStep {
  element: string
  title: string
  description: string
}

export const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    element: '[data-tour="productos"]',
    title: 'Agregá tu primer producto',
    description: 'Acá subís los productos que tus clientes van a ver. Empezá con uno — nombre, foto y precio.',
  },
  {
    element: '[data-tour="categorias"]',
    title: 'Organizá con categorías',
    description: 'Las categorías ayudan a tus clientes a encontrar más rápido lo que buscan.',
  },
  {
    element: '[data-tour="configuracion"]',
    title: 'Personalizá tu tienda',
    description: 'Cambiá colores, tipografía, secciones y el estilo general. Todo se ve al instante.',
  },
  {
    element: '[data-tour="preview"]',
    title: 'Mirá cómo se ve',
    description: 'Así ven tus clientes tu tienda. Probala antes de compartirla.',
  },
  {
    element: '[data-tour="compartir"]',
    title: 'Compartí tu link',
    description: 'Mandá el link por WhatsApp, Instagram o donde quieras. ¡Ya estás online!',
  },
]
