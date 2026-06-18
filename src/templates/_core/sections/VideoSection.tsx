"use client";

import React, { memo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";

interface VideoSectionProps {
  config: ResolvedStoreConfig;
}

export const VideoSection = memo(function VideoSection({
  config,
}: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  const posterImage = config.content?.videoPosterImage;
  const title = config.content?.videoTitle;

  if (!posterImage) return null;

  return (
    <section className="px-4 md:px-5 py-8 md:py-12" aria-label="Video de la tienda">
      {/* Heading above the player */}
      {title && (
        <h2
          className="text-center mb-5 md:mb-7 text-xl md:text-2xl lg:text-3xl"
          style={{
            color: "var(--t-foreground)",
            fontWeight: 700,
            letterSpacing: "-0.4px",
            fontFamily: "var(--t-font-heading, inherit)",
          }}
        >
          {title}
        </h2>
      )}

      {/* Player container — constrained width, centered */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{
          maxWidth: "min(92%, 900px)",
          borderRadius: "var(--t-radius-card, 14px)",
          aspectRatio: "16/9",
          backgroundColor: "var(--t-border)",
        }}
      >
        {/* Poster image */}
        <Image
          src={posterImage}
          alt={title ?? "Video de la tienda"}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 65vw, 900px"
          className="object-cover"
        />

        {/* Dark scrim — softens the poster so the play button reads clearly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Play button overlay */}
        {!playing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="flex items-center justify-center w-16 h-16 md:w-[72px] md:h-[72px] rounded-full transition-all duration-200 active:scale-95 hover:scale-110 hover:brightness-125"
              style={{
                backgroundColor: "rgba(0,0,0,0.50)",
                border: "2px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
              onClick={() => setPlaying(true)}
              aria-label="Reproducir video"
            >
              <Play
                size={28}
                strokeWidth={0}
                fill="white"
                style={{ marginLeft: 4 }}
              />
            </button>
          </div>
        ) : (
          /* Mock "playing" state — no real video needed */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          >
            <p
              className="text-sm md:text-base px-4 text-center"
              style={{
                color: "var(--t-foreground)",
                opacity: 0.85,
                fontFamily: "var(--t-font-body, inherit)",
              }}
            >
              Reproduciendo…
            </p>
          </div>
        )}
      </div>
    </section>
  );
});
