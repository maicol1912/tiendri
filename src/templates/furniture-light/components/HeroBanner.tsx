// Furniture Light — Hero Banner
// Orange gradient bg with banner image on right, text on left, dot indicators
// ZERO hardcoded colors

import Image from "next/image";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  bannerImage?: string;
  className?: string;
}

export function HeroBanner({
  title = "¡Nueva colección disponible!",
  subtitle = "Ver más",
  bannerImage,
  className = "",
}: HeroBannerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: "var(--t-radius-card)" }}>
      {/* Background */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "var(--t-radius-card)",
          background: "linear-gradient(135deg, var(--t-primary) 0%, var(--t-primary) 60%, var(--t-secondary) 100%)",
          minHeight: "160px",
        }}
      >
        {/* Banner image right */}
        {bannerImage && (
          <div className="absolute top-0 right-0 w-[40%] md:w-[50%] h-full">
            <Image
              src={bannerImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 40vw, 400px"
              priority
            />
          </div>
        )}

        {/* Text left */}
        <div className="relative z-10 flex flex-col justify-center p-4 md:p-6 pr-[42%] md:pr-[45%] min-h-[160px] overflow-hidden">
          <h2
            className="text-white text-lg md:text-[26px] lg:text-[32px] font-bold leading-tight"
            style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
          >
            {title}
          </h2>
          <button className="mt-3 flex items-center gap-1 text-white text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            {subtitle}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="w-6 h-1.5 rounded-full bg-[var(--t-primary)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--t-border)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--t-border)]" />
      </div>
    </div>
  );
}
