"use client";

// Decor Warm Template — Best Seller Featured Card
// Peach background card. Text left: name, description, star rating, "Ver Ahora" button.
// Image right: product floats on peach bg.

import Image from "next/image";
import type { DecorWarmBestSeller } from "../types";

interface BestSellerCardProps {
  item: DecorWarmBestSeller;
  currencySymbol?: string;
  onClick?: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill={rating >= star ? "var(--t-on-primary)" : "color-mix(in srgb, var(--t-on-primary) 30%, transparent)"}
          aria-hidden="true"
        >
          <path d="M6 1l1.24 2.51 2.76.4-2 1.95.47 2.75L6 7.25 3.53 8.61l.47-2.75-2-1.95 2.76-.4L6 1z" />
        </svg>
      ))}
    </div>
  );
}

export function BestSellerCard({
  item,
  onClick,
}: BestSellerCardProps) {
  return (
    <div
      className="w-full cursor-pointer"
      style={{
        backgroundColor: "var(--t-primary)",
        borderRadius: "var(--t-radius-card)",
        overflow: "hidden",
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); }
          : undefined
      }
      aria-label={onClick ? `Ver ${item.name}` : undefined}
    >
      <div className="flex items-stretch min-h-[140px] md:min-h-[200px]">

        {/* Left: Text content */}
        <div className="flex flex-col justify-center gap-2 px-5 py-4 flex-[6]">
          <h3
            style={{
              color: "var(--t-on-primary)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {item.name}
          </h3>

          <p
            className="line-clamp-2"
            style={{
              color: "color-mix(in srgb, var(--t-on-primary) 80%, transparent)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {item.description}
          </p>

          {/* Rating badge */}
          <div
            className="flex items-center gap-1.5 self-start px-2 py-1"
            style={{
              backgroundColor: "color-mix(in srgb, var(--t-on-primary) 20%, transparent)",
              borderRadius: 9999,
            }}
          >
            <StarRating rating={Math.round(item.rating)} />
            <span
              style={{
                color: "var(--t-on-primary)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {item.rating.toFixed(1)}
            </span>
          </div>

          {/* Ver Ahora CTA */}
          <button
            type="button"
            style={{
              alignSelf: "flex-start",
              backgroundColor: "var(--t-on-primary)",
              color: "var(--t-primary)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              borderRadius: "var(--t-radius-button)",
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 6,
              paddingBottom: 6,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Ver Ahora
          </button>
        </div>

        {/* Right: Product image */}
        <div
          className="relative flex-[4] flex items-end justify-center"
          style={{ minHeight: 140 }}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 767px) 40vw, (max-width: 1023px) 35vw, 30vw"
              className="object-contain object-bottom"
              style={{ padding: "8px 8px 0 0" }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "color-mix(in srgb, var(--t-on-primary) 20%, transparent)",
                }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
