// Electronics Classic — Testimonial Section
// 3-column grid, initial-circle avatars, stars → text → author order.
// All colors via var(--t-*). ZERO hardcoded hex.

import type { Testimonial } from "../types";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  title?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-[var(--t-rating-star,#FBBF24)] text-[var(--t-rating-star,#FBBF24)]"
              : "fill-[var(--t-border-mid)] text-[var(--t-border-mid)]"
          }`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialSection({
  testimonials,
  title = "what's everyone says",
}: TestimonialSectionProps) {
  return (
    <section className="py-8 md:py-12" aria-labelledby="testimonials-heading">
      <h2
        id="testimonials-heading"
        className="text-xl md:text-2xl italic font-serif text-[var(--t-text-primary)] text-left mb-8"
      >
        {title}
      </h2>

      {/* Testimonials — 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="border border-[var(--t-border-light)] rounded-[var(--t-radius-card)] p-6"
            style={{ backgroundColor: "var(--t-card-bg)" }}
            aria-label={`Testimonio de ${testimonial.name}`}
          >
            {/* Stars */}
            <div className="mb-4">
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Testimonial text */}
            <p className="text-sm text-[var(--t-text-primary)] leading-relaxed mb-6">
              {testimonial.text}
            </p>

            {/* Author — initial circle + name + verified label */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm text-[var(--t-button-text,#ffffff)]"
                style={{ backgroundColor: "var(--t-primary)" }}
                aria-hidden="true"
              >
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--t-text-primary)]">
                  {testimonial.name}
                </p>
                <p className="text-xs text-[var(--t-text-muted)]">
                  Comprador verificado
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
