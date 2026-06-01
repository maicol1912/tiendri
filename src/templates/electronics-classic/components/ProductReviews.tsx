"use client";

// Electronics Classic — Product Reviews
// Review list + star-selector review form.
// All colors via var(--t-*). ZERO hardcoded hex.

import { useState } from "react";
import type { ProductReview } from "../types";

interface StarSelectorProps {
  value: number;
  onChange: (v: number) => void;
}

function StarSelector({ value, onChange }: StarSelectorProps) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex gap-1" role="group" aria-label="Seleccionar calificación">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} estrellas`}
            aria-pressed={value === star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-colors"
          >
            <svg
              className={`w-6 h-6 ${star <= display ? "text-yellow-400" : "text-[var(--t-surface)]"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article
      className="flex flex-col gap-2 py-5 border-b last:border-b-0"
      style={{ borderColor: "var(--t-surface)" }}
      aria-label={`Reseña de ${review.name}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: "var(--t-primary)" }}
            aria-hidden="true"
          >
            {review.name.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold text-[var(--t-text-primary)] text-sm">{review.name}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex" aria-label={`${review.rating} estrellas`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-[var(--t-surface)]"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[var(--t-text-muted)] text-xs">{review.date}</span>
        </div>
      </div>
      <p className="text-[var(--t-text-secondary)] text-sm leading-relaxed pl-10">
        {review.comment}
      </p>
    </article>
  );
}

interface ProductReviewsProps {
  reviews: ProductReview[];
  productName: string;
  onSubmitReview?: (review: Omit<ProductReview, "id" | "date">) => void;
}

export function ProductReviews({ reviews, productName, onSubmitReview }: ProductReviewsProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) return;
    onSubmitReview?.({ name, rating, comment });
    setSubmitted(true);
    setName("");
    setRating(0);
    setComment("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="flex flex-col gap-8" aria-labelledby="reviews-heading">
      <h2
        id="reviews-heading"
        className="text-lg md:text-xl font-bold text-[var(--t-text-primary)]"
      >
        Reseñas de {productName}
      </h2>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-[var(--t-text-muted)] text-sm">
          Aún no hay reseñas. ¡Sé el primero en dejar la tuya!
        </p>
      ) : (
        <div>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Review form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[var(--t-radius-card)] p-5 md:p-6 flex flex-col gap-4 border"
        style={{
          backgroundColor: "var(--t-card-bg)",
          borderColor: "var(--t-surface)",
        }}
        aria-label="Formulario de reseña"
      >
        <h3 className="font-semibold text-[var(--t-text-primary)] text-sm">
          Escribe tu reseña
        </h3>

        {submitted && (
          <p
            className="text-sm font-medium px-3 py-2 rounded"
            style={{
              backgroundColor: "var(--t-primary)",
              color: "var(--t-button-text)",
            }}
            role="status"
          >
            ¡Gracias por tu reseña!
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-[var(--t-text-secondary)] text-xs" htmlFor="review-name">
            Tu nombre
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Carlos Pérez"
            required
            className="w-full px-3 py-2 text-sm border rounded-[var(--t-radius-button)] outline-none focus:ring-2"
            style={{
              borderColor: "var(--t-surface)",
              backgroundColor: "var(--t-search-bg)",
              color: "var(--t-text-primary)",
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[var(--t-text-secondary)] text-xs">Calificación</span>
          <StarSelector value={rating} onChange={setRating} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[var(--t-text-secondary)] text-xs" htmlFor="review-comment">
            Tu comentario
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuéntanos tu experiencia con el producto..."
            required
            rows={3}
            className="w-full px-3 py-2 text-sm border rounded-[var(--t-radius-button)] outline-none resize-none focus:ring-2"
            style={{
              borderColor: "var(--t-surface)",
              backgroundColor: "var(--t-search-bg)",
              color: "var(--t-text-primary)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || !comment.trim() || rating === 0}
          className="self-start px-6 py-2.5 text-sm font-semibold rounded-[var(--t-radius-button)] transition-opacity disabled:opacity-50"
          style={{
            backgroundColor: "var(--t-button-bg)",
            color: "var(--t-button-text)",
          }}
        >
          Enviar reseña
        </button>
      </form>
    </section>
  );
}
