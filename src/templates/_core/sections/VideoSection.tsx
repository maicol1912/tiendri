"use client";

import React, { memo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { SectionRendererProps } from "./types";

export const VideoSection = memo(function VideoSection({
  config,
}: SectionRendererProps) {
  const [playing, setPlaying] = useState(false);

  const content = config as unknown as {
    content?: {
      videoPosterImage?: string;
      videoUrl?: string;
      videoTitle?: string;
    };
  };

  const posterImage = content.content?.videoPosterImage;
  const videoUrl = content.content?.videoUrl;
  const title = content.content?.videoTitle;

  if (!videoUrl && !posterImage) return null;

  return (
    <section className="px-4 md:px-5 py-8 md:py-12" aria-label="Video de la tienda">
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "var(--t-radius-card)",
          aspectRatio: "16/9",
          backgroundColor: "var(--t-border)",
        }}
      >
        {!playing ? (
          <>
            {/* Poster image */}
            {posterImage && (
              <Image
                src={posterImage}
                alt={title ?? "Video de la tienda"}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            )}

            {/* Dark overlay — opacity-based, zero hardcoded colors */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "var(--t-overlay, rgba(0,0,0,0.45))" }}
            />

            {/* Title + play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {title && (
                <p
                  className="text-center px-4 text-base md:text-xl"
                  style={{
                    color: "var(--t-foreground)",
                    fontWeight: 600,
                    letterSpacing: "-0.3px",
                    textShadow: "0 1px 4px var(--t-shadow, rgba(0,0,0,0.5))",
                  }}
                >
                  {title}
                </p>
              )}

              {videoUrl && (
                <button
                  type="button"
                  className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-transform active:scale-95 hover:scale-105"
                  style={{
                    backgroundColor: "var(--t-play-btn-bg, rgba(255,255,255,0.18))",
                    backdropFilter: "blur(4px)",
                  }}
                  onClick={() => setPlaying(true)}
                  aria-label="Reproducir video"
                >
                  <Play
                    size={26}
                    strokeWidth={0}
                    fill="var(--t-foreground)"
                    style={{ marginLeft: 3 }}
                  />
                </button>
              )}
            </div>
          </>
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={videoUrl}
            autoPlay
            controls
            playsInline
          />
        )}
      </div>
    </section>
  );
});
