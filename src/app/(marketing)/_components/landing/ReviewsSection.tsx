'use client';

import { useState } from 'react';
import { REVIEW_RESTING, REVIEW_HOVER, type ReviewPosition } from '../../_lib/animations';

/**
 * ReviewsSection — Tiendri Landing (Light / Clone style)
 *
 * Visual structure: clone Reviews (5 scattered cards, hover to spread).
 * Content: Tiendri merchant testimonials in Colombian Spanish.
 *
 * Desktop: 1100×600 absolute-positioned cluster. Hover fans cards out.
 * Mobile: vertically stacked cards.
 */

interface ReviewCardProps {
  text: string;
  author: string;
  role: string;
  variant: 'black' | 'violet' | 'default' | 'green';
  position: ReviewPosition;
  stars?: boolean;
  starsVariant?: 'white' | 'black' | 'default';
  restingTransform: string;
  hoverTransform: string;
  isContainerHovered: boolean;
}

interface MobileReviewCardProps {
  text: string;
  author: string;
  role: string;
  variant: 'black' | 'violet' | 'default' | 'green';
  stars?: boolean;
  starsVariant?: 'white' | 'black' | 'default';
}

function StarRating({ variant }: { variant?: 'white' | 'black' | 'default' }) {
  const color = variant === 'white' ? '#fff' : variant === 'black' ? '#000' : '#CDE06A';
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={color}>
          <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3 4.3 12.4l.7-4.1L2 5.4l4.2-.8z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ text, author, role, variant, stars, starsVariant, restingTransform, hoverTransform, isContainerHovered }: ReviewCardProps) {
  const bgColors: Record<string, string> = {
    black: 'bg-black',
    violet: 'bg-[#8D8AFF]',
    default: 'bg-[#f2f3f3]',
    green: 'bg-[#CDE06A]',
  };
  const textColors: Record<string, string> = {
    black: 'text-white',
    violet: 'text-white',
    default: 'text-neutral-700',
    green: 'text-black',
  };
  const authorColors: Record<string, string> = {
    black: 'text-white opacity-70',
    violet: 'text-white opacity-70',
    default: 'text-neutral-500',
    green: 'text-black opacity-70',
  };

  return (
    <div
      className={`absolute ${bgColors[variant]} rounded-[20px] overflow-hidden`}
      style={{
        width: 300,
        minHeight: 336,
        padding: 36,
        left: '50%',
        top: '50%',
        marginLeft: -150,
        marginTop: -168,
        boxShadow: variant === 'default'
          ? '0px 0px 12px 0px rgba(0,0,0,0.04)'
          : '0px 8.52px 31.95px 0px rgba(0,0,0,0.12)',
        transform: isContainerHovered ? hoverTransform : restingTransform,
        transition: 'transform 0.5s ease',
      }}
    >
      {stars && <StarRating variant={starsVariant} />}
      <p className={`text-sm leading-relaxed ${textColors[variant]}`} style={{ fontFamily: "'Aeonik', sans-serif" }}>{text}</p>
      <div className="mt-4">
        <p className={`text-sm font-semibold ${textColors[variant]}`} style={{ fontFamily: "'Aeonik', sans-serif" }}>{author}</p>
        <p className={`text-xs mt-0.5 ${authorColors[variant]}`} style={{ fontFamily: "'Aeonik', sans-serif" }}>{role}</p>
      </div>
    </div>
  );
}

function MobileReviewCard({ text, author, role, variant, stars, starsVariant }: MobileReviewCardProps) {
  const bgColors: Record<string, string> = {
    black: 'bg-black',
    violet: 'bg-[#8D8AFF]',
    default: 'bg-[#f2f3f3]',
    green: 'bg-[#CDE06A]',
  };
  const textColors: Record<string, string> = {
    black: 'text-white',
    violet: 'text-white',
    default: 'text-neutral-700',
    green: 'text-black',
  };

  return (
    <div
      className={`${bgColors[variant]} rounded-[20px] w-full`}
      style={{ padding: 28, boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.07)' }}
    >
      {stars && <StarRating variant={starsVariant} />}
      <p className={`text-sm leading-relaxed ${textColors[variant]}`} style={{ fontFamily: "'Aeonik', sans-serif" }}>{text}</p>
      <div className="mt-4">
        <p className={`text-sm font-semibold ${textColors[variant]}`} style={{ fontFamily: "'Aeonik', sans-serif" }}>{author}</p>
        <p className={`text-xs mt-0.5 opacity-60 ${textColors[variant]}`} style={{ fontFamily: "'Aeonik', sans-serif" }}>{role}</p>
      </div>
    </div>
  );
}

const REVIEWS = [
  {
    text: 'Antes me llegaban mensajes de WhatsApp preguntando precio, talla, color... ahora los pedidos llegan con todo. Ahorro una hora al día fácil.',
    author: 'Marcela V.',
    role: 'Modas Luna, Medellín',
    variant: 'black' as const,
    stars: true,
    starsVariant: undefined,
  },
  {
    text: 'En 20 minutos tenía mi catálogo listo y compartido en mis estados. El mismo día recibí los primeros pedidos. No lo podía creer.',
    author: 'Carlos R.',
    role: 'Ferretería Don Carlos, Bogotá',
    variant: 'violet' as const,
    stars: true,
    starsVariant: 'white' as const,
  },
  {
    text: 'Mis clientes piden desde el celular sin necesidad de registrarse ni descargar nada. Eso es lo que más valoro.',
    author: 'Sandra M.',
    role: 'Dulce Canela, Cali',
    variant: 'default' as const,
    stars: true,
    starsVariant: undefined,
  },
  {
    text: 'Pago una tarifa fija y no me cobran nada por cada pedido. Eso se nota mucho en el bolsillo al final del mes.',
    author: 'Diego F.',
    role: 'Tech Zone, Barranquilla',
    variant: 'default' as const,
    stars: false,
    starsVariant: undefined,
  },
  {
    text: 'Lo que más me gustó fue poder ponerle mis colores, mi logo y el nombre de mi negocio. Parece una tienda de verdad.',
    author: 'Luisa T.',
    role: 'Artesanías Luisa, Cartagena',
    variant: 'green' as const,
    stars: true,
    starsVariant: 'black' as const,
  },
];

export function ReviewsSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-white flex flex-col items-center justify-center"
      style={{ padding: '60px 20px' }}
      aria-labelledby="reviews-heading"
    >
      <div className="text-center mb-16">
        <p className="text-neutral-500 text-sm font-medium mb-4" style={{ fontFamily: "'Aeonik', sans-serif" }}>Reseñas de comerciantes</p>
        <h2
          id="reviews-heading"
          className="font-black text-black leading-tight"
          style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontFamily: "'Aeonik', sans-serif" }}
        >
          Lo que dicen los que ya venden
        </h2>
      </div>

      {/* Desktop: scattered card cluster */}
      <div
        className="relative hidden lg:block"
        style={{ width: 1100, height: 600 }}
        role="list"
        aria-label="Testimonios de comerciantes"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {REVIEWS.map((review, i) => (
          <ReviewCard
            key={i}
            text={review.text}
            author={review.author}
            role={review.role}
            variant={review.variant}
            position={(i + 1) as ReviewPosition}
            stars={review.stars}
            starsVariant={review.starsVariant}
            restingTransform={REVIEW_RESTING[(i + 1) as ReviewPosition]}
            hoverTransform={REVIEW_HOVER[(i + 1) as ReviewPosition]}
            isContainerHovered={isHovered}
          />
        ))}
      </div>

      {/* Mobile: vertically stacked */}
      <div
        className="flex lg:hidden flex-col gap-4 w-full"
        style={{ maxWidth: 480 }}
        role="list"
        aria-label="Testimonios de comerciantes"
      >
        {REVIEWS.map((review, i) => (
          <MobileReviewCard
            key={i}
            text={review.text}
            author={review.author}
            role={review.role}
            variant={review.variant}
            stars={review.stars}
            starsVariant={review.starsVariant}
          />
        ))}
      </div>
    </section>
  );
}
