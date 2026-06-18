"use client";

// _core/sections/BestSellersSection.tsx
// Sección "Más Vendidos" — tarjetas horizontales con fondo var(--t-primary).
// Diseño original decor-warm: texto a la izquierda, imagen a la derecha.

import React, { memo } from "react";
import Image from "next/image";

export interface BestSellerItem {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string | null;
  badge?: string;
  description?: string;
}

interface BestSellersSectionProps {
  bestSellers: BestSellerItem[];
  currencySymbol?: string;
}

/** Renderiza 5 estrellas SVG coloreadas con var(--t-on-primary). */
function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    const id = `star-grad-${i}`;

    return (
      <svg
        key={i}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {partial && (
          <defs>
            <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
              <stop offset={`${(rating - Math.floor(rating)) * 100}%`} stopColor="var(--t-on-primary)" />
              <stop offset={`${(rating - Math.floor(rating)) * 100}%`} stopColor="var(--t-on-primary)" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        )}
        <path
          d="M12 2l2.9 8.9H23l-7.5 5.5 2.9 8.9L12 20l-6.4 5.3 2.9-8.9L1 11l8.1-.1L12 2z"
          fill={
            filled
              ? "var(--t-on-primary)"
              : partial
              ? `url(#${id})`
              : "var(--t-on-primary)"
          }
          fillOpacity={filled || partial ? 1 : 0.25}
        />
      </svg>
    );
  });

  return (
    <span
      aria-label={`${rating} de 5 estrellas`}
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        width: "fit-content",
        alignItems: "center",
        gap: "1px",
        padding: "2px 8px",
        borderRadius: "99px",
        background: "color-mix(in srgb, var(--t-on-primary) 20%, transparent)",
      }}
    >
      {stars}
    </span>
  );
}

export const BestSellersSection = memo(function BestSellersSection({
  bestSellers,
  currencySymbol = "$",
}: BestSellersSectionProps) {
  if (bestSellers.length === 0) return null;

  return (
    <section
      aria-labelledby="best-sellers-heading"
      className="max-w-[92%] lg:max-w-[65%] mx-auto"
      style={{
        paddingTop: "var(--t-space-section, 3rem)",
        paddingBottom: "var(--t-space-section, 3rem)",
      }}
    >
      {/* Encabezado */}
      <h2
        id="best-sellers-heading"
        className="mb-4"
        style={{
          color: "var(--t-foreground)",
          fontWeight: "var(--t-type-heading-weight, 500)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--t-type-heading-size, 1.5rem)",
          letterSpacing: "var(--t-type-heading-tracking, 0.24px)",
          textTransform: "var(--t-type-heading-transform, none)" as React.CSSProperties["textTransform"],
        }}
      >
        Más Vendidos
      </h2>

      {/* Tarjetas en grid — 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {bestSellers.slice(0, 2).map((item) => (
          <article
            key={item.productId}
            className="flex overflow-hidden"
            style={{
              backgroundColor: "var(--t-primary)",
              borderRadius: "var(--t-radius-card, 14px)",
              minHeight: "140px",
            }}
          >
            {/* Lado izquierdo — contenido textual (flex-[6]) */}
            <div
              className="flex flex-col justify-between gap-2 p-4 md:p-5"
              style={{ flex: "6" }}
            >
              <div className="flex flex-col gap-1.5">
                <h3
                  className="text-base font-semibold leading-snug md:text-lg"
                  style={{ color: "var(--t-on-primary)" }}
                >
                  {item.name}
                </h3>

                {/* Precio */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--t-on-primary)" }}
                  >
                    {currencySymbol}{item.price.toLocaleString("es-CO")}
                  </span>
                  {item.originalPrice !== undefined && item.originalPrice > item.price && (
                    <span
                      className="text-xs line-through"
                      style={{ color: "var(--t-on-primary)", opacity: 0.6 }}
                    >
                      {currencySymbol}{item.originalPrice.toLocaleString("es-CO")}
                    </span>
                  )}
                </div>

                {/* Rating en pill */}
                <StarRating rating={item.rating} />
              </div>

              {/* Botón Ver Ahora — invertido respecto al fondo de la tarjeta */}
              <button
                type="button"
                className="self-start font-semibold"
                style={{
                  backgroundColor: "var(--t-on-primary)",
                  color: "var(--t-primary)",
                  padding: "6px 16px",
                  fontSize: "0.75rem",
                  borderRadius: "var(--t-radius-button, 8px)",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Ver Ahora
              </button>
            </div>

            {/* Lado derecho — imagen del producto (flex-[4]) */}
            <div
              className="relative md:min-h-[200px]"
              style={{
                flex: "4",
                background: "color-mix(in srgb, var(--t-on-primary) 5%, transparent)",
              }}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 37vw, 26vw"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});
