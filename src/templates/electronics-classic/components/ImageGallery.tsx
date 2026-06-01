"use client";

// Electronics Classic — Image Gallery
// Main image + prev/next arrow buttons + dot indicators + thumbnail strip.
// All colors via var(--t-*). ZERO hardcoded hex.

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  sort_order: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  productName: string;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function ImageGallery({
  images,
  productName,
  activeIndex: externalIndex,
  onIndexChange,
}: ImageGalleryProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = externalIndex ?? internalIndex;

  const setIndex = useCallback(
    (i: number) => {
      setInternalIndex(i);
      onIndexChange?.(i);
    },
    [onIndexChange]
  );

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const total = sorted.length;

  const goPrev = () => setIndex((activeIndex - 1 + total) % total);
  const goNext = () => setIndex((activeIndex + 1) % total);

  if (total === 0) return null;

  const current = sorted[activeIndex] ?? sorted[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative w-full aspect-square overflow-hidden rounded-[var(--t-radius-card)]"
        style={{ backgroundColor: "var(--t-image-bg, var(--t-surface))" }}
      >
        <Image
          src={current.url}
          alt={`${productName} — imagen ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />

        {/* Arrows (only when multiple images) */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity border"
              style={{
                backgroundColor: "var(--t-card-bg)",
                borderColor: "var(--t-surface)",
              }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: "var(--t-text-primary)" }} aria-hidden="true" />
            </button>
            <button
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity border"
              style={{
                backgroundColor: "var(--t-card-bg)",
                borderColor: "var(--t-surface)",
              }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: "var(--t-text-primary)" }} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex justify-center gap-2" role="tablist" aria-label="Imágenes del producto">
          {sorted.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Imagen ${i + 1}`}
              onClick={() => setIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor:
                  i === activeIndex
                    ? "var(--t-primary)"
                    : "var(--t-surface)",
              }}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative shrink-0 w-16 h-16 overflow-hidden rounded transition-all duration-200 border-2 ${
                i === activeIndex
                  ? "border-[var(--t-primary)]"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: "var(--t-surface)" }}
            >
              <Image
                src={img.url}
                alt={`Miniatura ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
