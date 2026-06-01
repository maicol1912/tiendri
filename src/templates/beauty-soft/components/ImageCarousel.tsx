"use client";

// Beauty Soft Template — Image Carousel
// Framer Motion drag="x" with direction variants. Dot indicators clickable.
// ZERO hardcoded colors — all via var(--t-*).

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImage {
  url: string;
  sort_order: number;
}

interface ImageCarouselProps {
  images: ProductImage[];
  productName: string;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  onBackClick?: () => void;
  onCartClick?: () => void;
  showTopBar?: boolean;
}

export function ImageCarousel({
  images,
  productName,
  activeIndex: controlledIndex,
  onIndexChange,
  onBackClick,
  onCartClick,
  showTopBar = true,
}: ImageCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  const visibleImages = images.slice(0, 5);
  const hasImages = visibleImages.length > 0;
  const activeIndex = controlledIndex ?? internalIndex;

  const setIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(visibleImages.length - 1, idx));
      setInternalIndex(clamped);
      onIndexChange?.(clamped);
    },
    [visibleImages.length, onIndexChange]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      const threshold = 50;
      if (info.offset.x < -threshold) {
        setDragDirection(1);
        setIndex(activeIndex + 1);
      } else if (info.offset.x > threshold) {
        setDragDirection(-1);
        setIndex(activeIndex - 1);
      }
    },
    [activeIndex, setIndex]
  );

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const currentImage = visibleImages[activeIndex] ?? visibleImages[0];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "345 / 279",
        backgroundColor: "var(--t-card-bg)",
        borderRadius: "var(--t-radius-card)",
        maxHeight: "420px",
      }}
    >
      {hasImages && currentImage ? (
        <AnimatePresence initial={false} custom={dragDirection}>
          <motion.div
            key={activeIndex}
            custom={dragDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
            style={{ touchAction: "pan-y" }}
          >
            <Image
              src={currentImage.url}
              alt={`${productName} — imagen ${activeIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
              style={{ borderRadius: "var(--t-radius-card)" }}
              priority={activeIndex === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <rect width="56" height="56" rx="12" fill="var(--t-card-bg)" />
            <path
              d="M12 40l11-11 7 7 10-13 16 17"
              stroke="var(--t-border-mid)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="19" cy="22" r="4" fill="var(--t-border-mid)" />
          </svg>
        </div>
      )}

      {/* Top bar: back + title + cart */}
      {showTopBar && (
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <motion.button
            type="button"
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "50%",
              backgroundColor: "var(--t-section-bg)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            aria-label="Volver"
            onClick={onBackClick}
            whileTap={{ scale: 0.92 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                stroke="var(--t-text-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <span
            className="text-[20px] font-medium text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Detalles
          </span>

          <motion.button
            type="button"
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{
              width: "47px",
              height: "47px",
              borderRadius: "50%",
              backgroundColor: "var(--t-section-bg)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            aria-label="Carrito"
            onClick={onCartClick}
            whileTap={{ scale: 0.92 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                stroke="var(--t-text-primary)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-text-primary)" strokeWidth="1.75" />
              <path
                d="M16 10a4 4 0 0 1-8 0"
                stroke="var(--t-text-primary)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      )}

      {/* Dot indicators */}
      {visibleImages.length > 1 && (
        <div
          className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-[3px]"
          aria-hidden="true"
        >
          {visibleImages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Imagen ${index + 1}`}
              onClick={() => {
                setDragDirection(index > activeIndex ? 1 : -1);
                setIndex(index);
              }}
              className="border-0 p-0 cursor-pointer"
              style={{
                width: index === activeIndex ? "27px" : "7px",
                height: "7px",
                borderRadius: "14px",
                backgroundColor:
                  index === activeIndex
                    ? "var(--t-text-primary)"
                    : "rgba(0,0,0,0.37)",
                transition: "width 0.25s ease, background-color 0.2s ease",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
