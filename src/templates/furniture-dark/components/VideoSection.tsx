"use client";

// Furniture Dark — VideoSection
// Full-width dark card, dark overlay, centered play button circle
// ALL colors via var(--t-*)

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoData } from "../types";

interface VideoSectionProps {
  video: VideoData;
}

export function VideoSection({ video }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="px-5" aria-label="Video de la tienda">
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "var(--t-radius-card)",
          aspectRatio: "16/9",
          backgroundColor: "var(--t-border-light)",
        }}
      >
        {!playing ? (
          <>
            {/* Poster image */}
            {video.posterImage && (
              <Image
                src={video.posterImage}
                alt={video.title ?? "Video de la tienda"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            )}

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.45)" }}
            />

            {/* Title + play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {video.title && (
                <p
                  className="text-[var(--t-text-primary)] text-center px-4"
                  style={{
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                    fontSize: "20px",
                    fontWeight: 600,
                    letterSpacing: "-0.6px",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {video.title}
                </p>
              )}

              <button
                type="button"
                className="flex items-center justify-center w-16 h-16 rounded-full transition-transform active:scale-95 hover:scale-105"
                style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}
                onClick={() => setPlaying(true)}
                aria-label="Reproducir video"
              >
                <Play
                  size={28}
                  strokeWidth={0}
                  fill="var(--t-text-primary)"
                  style={{ marginLeft: 3 }}
                />
              </button>
            </div>
          </>
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={video.videoUrl}
            autoPlay
            controls
            playsInline
          />
        )}
      </div>
    </section>
  );
}
