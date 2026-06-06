export interface HeroStaticProps {
  mode: 'static'
  subtitle?: string
  titleLight?: string
  titleBold?: string
  description?: string
  ctaText?: string
  image?: string
  bgColor?: string
  onCtaClick?: () => void
}

export interface HeroCarouselProps {
  mode: 'carousel'
  cards: readonly {
    id: string
    title: string
    image: string
    tag?: string
    ctaLabel?: string
    bgColor?: string
  }[]
  onCardClick?: (cardId: string) => void
}

export type HeroProps = HeroStaticProps | HeroCarouselProps
