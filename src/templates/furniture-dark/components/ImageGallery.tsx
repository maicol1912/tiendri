"use client";

// Furniture Dark — ImageGallery
// Mobile: main image + dot indicators
// Desktop: main image + thumbnail strip on left
// Card bg: var(--t-card-bg) = #F5F5F4 (white-ish), object-contain
// ALL colors via var(--t-*)

import Image from "next/image";
import type { StorefrontProductImage } from "../types";

interface ImageGalleryProps {
  images: StorefrontProductImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ImageGallery({ images, activeIndex, onSelect }: ImageGalleryProps) {
  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[activeIndex] : null;

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-3">
      {/* Main image */}
      <div
        className="relative flex-1 rounded-[var(--t-radius-card)] overflow-hidden aspect-square"
        style={{ backgroundColor: "var(--t-card-bg)" }}
      >
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? "Imagen del producto"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-4"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[var(--t-text-muted)]"
              style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)", fontSize: "14px" }}
            >
              Sin imagen
            </span>
          </div>
        )}
      </div>

      {/* Mobile: dot indicators */}
      {images.length > 1 && (
        <div className="flex lg:hidden justify-center gap-2 pt-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className="rounded-full transition-all"
              style={{
                width: idx === activeIndex ? "20px" : "6px",
                height: "6px",
                backgroundColor:
                  idx === activeIndex ? "var(--t-primary)" : "var(--t-secondary)",
              }}
              onClick={() => onSelect(idx)}
              aria-label={`Imagen ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Desktop: thumbnail strip (left side due to flex-row-reverse) */}
      {images.length > 1 && (
        <div className="hidden lg:flex flex-col gap-2 w-20 flex-shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-opacity"
              style={{
                backgroundColor: "var(--t-card-bg)",
                opacity: idx === activeIndex ? 1 : 0.6,
                outline:
                  idx === activeIndex
                    ? "2px solid var(--t-primary)"
                    : "2px solid transparent",
                outlineOffset: "2px",
              }}
              onClick={() => onSelect(idx)}
              aria-label={`Imagen ${idx + 1}`}
              aria-pressed={idx === activeIndex}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `Imagen ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
