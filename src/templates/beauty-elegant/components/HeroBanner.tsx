// Beauty Elegant Template — Hero Promotional Banner
// Full-width banner with gradient overlay text + glassmorphic CTA.
// Left column: brand welcome + promo text + CTA button.
// Right column: decorative image fill.
// ZERO hardcoded colors — all via var(--t-*).

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  imageUrl?: string;
  storeName?: string;
  onCtaClick?: () => void;
}

export function HeroBanner({
  title = "Descubre tu belleza con productos premium",
  subtitle = "Cosméticos, maquillaje y cuidado personal de alta calidad.",
  ctaText = "Ver catálogo",
  imageUrl,
  storeName,
  onCtaClick,
}: HeroBannerProps) {
  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        borderRadius: "var(--t-radius-card)",
        background: "linear-gradient(135deg, var(--t-card) 0%, var(--t-card) 100%)",
        minHeight: "clamp(140px, 18vw, 200px)",
        display: "flex",
        alignItems: "stretch",
      }}
      role="banner"
      aria-label="Banner promocional"
    >
      {/* Decorative purple glow blob — top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: "55%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--t-primary) 18%, transparent) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Left text block — 55% width */}
      <div
        className="relative z-10 flex flex-col justify-center gap-2 md:gap-3"
        style={{
          width: "55%",
          padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)",
        }}
      >
        {storeName && (
          <p
            className="m-0 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--t-primary)", letterSpacing: "0.1em" }}
          >
            {storeName}
          </p>
        )}

        <h2
          className="m-0 font-extrabold leading-tight"
          style={{
            color: "var(--t-foreground)",
            fontSize: "clamp(14px, 2.2vw, 22px)",
            fontFamily: "var(--font-heading, var(--font-sans))",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="m-0 text-sm leading-snug"
            style={{
              color: "var(--t-muted)",
              fontSize: "clamp(11px, 1.4vw, 13px)",
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
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--t-on-primary)",
            backgroundColor: "var(--t-primary)",
            borderRadius: "var(--t-radius-button)",
            padding: "6px 18px",
            height: "32px",
            whiteSpace: "nowrap",
            marginTop: "4px",
          }}
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>

      {/* Right image — 45% width */}
      <div
        className="relative flex-1 overflow-hidden"
        aria-hidden="true"
        style={{ minHeight: "140px" }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          /* Placeholder gradient when no image provided */
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, color-mix(in srgb, var(--t-accent) 25%, transparent) 0%, color-mix(in srgb, var(--t-primary) 8%, transparent) 50%, transparent 100%)",
            }}
          >
            {/* Decorative blurred circles */}
            <div
              className="absolute"
              style={{
                top: "10%",
                right: "15%",
                width: "clamp(60px, 8vw, 90px)",
                height: "clamp(60px, 8vw, 90px)",
                borderRadius: "50%",
                backgroundColor: "color-mix(in srgb, var(--t-primary) 15%, transparent)",
                filter: "blur(16px)",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: "15%",
                right: "30%",
                width: "clamp(40px, 5vw, 60px)",
                height: "clamp(40px, 5vw, 60px)",
                borderRadius: "50%",
                backgroundColor: "color-mix(in srgb, var(--t-accent) 20%, transparent)",
                filter: "blur(10px)",
              }}
            />
            {/* Sparkle icons — decorative */}
            <svg
              className="absolute"
              style={{ top: "20%", right: "20%", opacity: 0.35 }}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="var(--t-primary)"
              aria-hidden="true"
            >
              <path d="M12 2l1.5 6.5L20 12l-6.5 1.5L12 22l-1.5-6.5L4 12l6.5-1.5L12 2z" />
            </svg>
            <svg
              className="absolute"
              style={{ bottom: "25%", right: "12%", opacity: 0.25 }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="var(--t-primary)"
              aria-hidden="true"
            >
              <path d="M12 2l1.5 6.5L20 12l-6.5 1.5L12 22l-1.5-6.5L4 12l6.5-1.5L12 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Glassmorphic inner border overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          borderRadius: "var(--t-radius-card)",
          border: "1px solid var(--t-border-light, var(--t-border))",
        }}
      />
    </div>
  );
}
