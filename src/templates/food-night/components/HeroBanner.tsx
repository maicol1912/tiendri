"use client";

// Food Night — Hero Promotional Banner
// Dark full-width banner with bold primary-accent headline and CTA.
// Gradient overlay on optional image for text readability.
// ZERO hardcoded colors — all via var(--t-*).

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  imageUrl?: string;
  onCtaClick?: () => void;
}

export function HeroBanner({
  title = "El sabor que te mereces",
  subtitle = "Los mejores platos, listos para tu mesa o tu puerta.",
  ctaText = "Ver menú",
  imageUrl,
  onCtaClick,
}: HeroBannerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: "var(--t-radius-card)",
        minHeight: "clamp(160px, 22vw, 240px)",
        backgroundColor: "var(--t-card)",
        display: "flex",
        alignItems: "flex-end",
      }}
      role="banner"
      aria-label="Banner promocional"
    >
      {/* Background image (optional) */}
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark gradient overlay — always present for text readability */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: imageUrl
            ? "linear-gradient(to top, rgba(14,6,0,0.92) 0%, rgba(14,6,0,0.55) 55%, rgba(14,6,0,0.2) 100%)"
            : "linear-gradient(135deg, rgba(41,37,38,0.98) 0%, rgba(18,12,8,0.85) 100%)",
        }}
      />

      {/* Decorative warm glow blob — top right */}
      {!imageUrl && (
        <div
          className="absolute top-0 right-0 pointer-events-none"
          aria-hidden="true"
          style={{
            width: "50%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(241,54,88,0.18) 0%, transparent 65%)",
          }}
        />
      )}

      {/* Content */}
      <div
        className="relative z-10 flex flex-col gap-2 md:gap-3"
        style={{
          padding: "clamp(18px, 3vw, 32px)",
          width: "100%",
          maxWidth: "540px",
        }}
      >
        {/* Primary accent label */}
        <p
          className="m-0 font-bold uppercase tracking-widest"
          style={{
            color: "var(--t-primary)",
            fontSize: "11px",
            letterSpacing: "0.12em",
          }}
        >
          ¡Especial del día!
        </p>

        <h2
          className="m-0 font-extrabold leading-tight"
          style={{
            color: "var(--t-foreground)",
            fontSize: "clamp(18px, 3.5vw, 30px)",
            fontFamily: "var(--font-heading, var(--font-sans))",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="m-0 leading-relaxed"
            style={{
              color: "var(--t-muted)",
              fontSize: "clamp(12px, 1.6vw, 14px)",
            }}
          >
            {subtitle}
          </p>
        )}

        <button
          type="button"
          className="self-start border-0 cursor-pointer"
          style={{
            fontFamily: "var(--font-heading, var(--font-sans))",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--t-button-text)",
            backgroundColor: "var(--t-button-bg)",
            borderRadius: "var(--t-radius-button)",
            padding: "8px 22px",
            height: "38px",
            whiteSpace: "nowrap",
            marginTop: "4px",
          }}
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
