// Furniture Light — Room Styles Section
// TOP: Featured hero card — dark navy bg left half + text, room image right half (split, rounded card)
// BELOW: 3 style cards in grid-cols-3, each with image (4:3 ratio) + style name below + orange circle arrow button
// Matches original KASA modern-furniture design exactly. ZERO hardcoded colors.

import Image from "next/image";
import type { StyleCard } from "../types";

interface RoomStylesSectionProps {
  title?: string;
  featuredCard?: {
    title: string;
    subtitle: string;
    image: string;
  };
  styleCards: StyleCard[];
  onStyleClick?: (id: string) => void;
  onSeeAll?: () => void;
}

export function RoomStylesSection({
  title = "Estilos para tu hogar",
  featuredCard,
  styleCards,
  onStyleClick,
  onSeeAll,
}: RoomStylesSectionProps) {
  return (
    <section className="px-4 md:px-6 lg:px-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-base font-bold text-[var(--t-foreground)]"
          style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
        >
          {title}
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-[var(--t-primary)]"
          onClick={onSeeAll}
        >
          Ver todos
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* ── Featured hero card ──────────────────────────────────────────── */}
      {featuredCard && (
        <div
          className="relative w-full overflow-hidden mb-4 cursor-pointer"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg, var(--t-secondary) 0%, #2C3E50 100%)",
            minHeight: "140px",
          }}
          onClick={() => onStyleClick?.("featured")}
        >
          {/* Left — text content, padded away from right image */}
          <div className="relative z-10 p-4 pr-[48%]">
            <p className="text-white/80 text-xs font-medium mb-1">
              {featuredCard.subtitle}
            </p>
            <p className="text-white text-sm font-semibold leading-snug">
              {featuredCard.title}
            </p>
          </div>

          {/* Right — room preview image, partially transparent */}
          <div className="absolute top-0 right-0 w-[45%] h-full opacity-60">
            <Image
              src={featuredCard.image}
              alt={featuredCard.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 45vw, 250px"
            />
          </div>
        </div>
      )}

      {/* ── 3 style cards row ───────────────────────────────────────────── */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:grid md:grid-cols-3 lg:grid-cols-3">
        {styleCards.slice(0, 3).map((card, idx) => (
          <div
            key={card.id ?? idx}
            className="shrink-0 min-w-[140px] md:min-w-0 cursor-pointer"
            onClick={() => onStyleClick?.(card.id ?? card.name)}
          >
            {/* Image card — 4:3 aspect ratio */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: "var(--t-radius-card)",
                backgroundColor: "var(--t-card)",
                aspectRatio: "4 / 3",
              }}
            >
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 140px, 200px"
              />

              {/* Orange circle arrow button — bottom right */}
              <button
                aria-label={`Explorar ${card.name}`}
                className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-[var(--t-primary)]"
                onClick={(e) => {
                  e.stopPropagation();
                  onStyleClick?.(card.id ?? card.name);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--t-on-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Style name below card */}
            <p className="mt-2 text-xs font-semibold text-[var(--t-foreground)]">
              {card.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
