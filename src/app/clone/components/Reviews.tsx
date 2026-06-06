'use client';

// Reviews Section — "Trusted by people"
// Hover card spread animation: container mouseEnter/Leave triggers transform swap on each card.

import { useState } from 'react';
import { REVIEW_RESTING, REVIEW_HOVER, type ReviewPosition } from '../lib/animations';

interface ReviewCardProps {
  text: string;
  author: string;
  authorSrc: string;
  variant: 'black' | 'violet' | 'default' | 'green';
  position: ReviewPosition;
  stars?: boolean;
  starsVariant?: 'white' | 'black' | 'default';
  restingTransform: string;
  hoverTransform: string;
  isContainerHovered: boolean;
}

function StarRating({ variant }: { variant?: "white" | "black" | "default" }) {
  const color = variant === "white" ? "#fff" : variant === "black" ? "#000" : "#CDE06A";
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={color}>
          <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3 4.3 12.4l.7-4.1L2 5.4l4.2-.8z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ text, author, variant, stars, starsVariant, restingTransform, hoverTransform, isContainerHovered }: ReviewCardProps) {
  const bgColors: Record<string, string> = {
    black: "bg-black",
    violet: "bg-[#8D8AFF]",
    default: "bg-white",
    green: "bg-[#CDE06A]",
  };
  const textColors: Record<string, string> = {
    black: "text-white",
    violet: "text-white",
    default: "text-neutral-700",
    green: "text-black",
  };
  const authorColors: Record<string, string> = {
    black: "text-white",
    violet: "text-white",
    default: "text-neutral-700",
    green: "text-black",
  };

  return (
    <div
      className={`absolute ${bgColors[variant]} rounded-[20px] overflow-hidden`}
      style={{
        width: 250,
        minHeight: 280,
        padding: 30,
        boxShadow: variant === 'default'
          ? '0px 0px 12px 0px rgba(0,0,0,0.03)'
          : '0px 8.52px 31.95px 0px rgba(0,0,0,0.10)',
        transform: isContainerHovered ? hoverTransform : restingTransform,
        transition: 'transform 0.5s ease',
      }}
    >
      {stars && <StarRating variant={starsVariant} />}
      <p className={`text-sm leading-relaxed ${textColors[variant]}`}>{text}</p>
      <div className="mt-4">
        <p className={`text-sm font-semibold ${authorColors[variant]}`}>{author}</p>
      </div>
    </div>
  );
}

export function Reviews() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-white py-24 px-6" aria-labelledby="reviews-heading">
      <div className="max-w-[1280px] mx-auto">

        {/* Heading */}
        <div className="mb-20">
          <p className="text-neutral-500 text-sm font-medium mb-4">Rating &amp; Reviews</p>
          <h2
            id="reviews-heading"
            className="font-black text-black leading-tight"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Trusted by people
          </h2>
        </div>

        {/* Cards cluster — 1100×600 container. Hover fans cards out. */}
        <div
          className="relative mx-auto"
          style={{ width: 1100, height: 600 }}
          role="list"
          aria-label="Customer reviews"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card 1 — Black */}
          <ReviewCard
            text="Within minutes the friendly sales assistant had secured me a spectacular rate of £150 at The Pullman Hotel which was right slap bang next to the M&S Bank Arena literally a 30 second walk !!!"
            author="Stephen A."
            authorSrc="/clone-assets/review-author-1.avif"
            variant="black"
            position={1}
            stars
            restingTransform={REVIEW_RESTING[1]}
            hoverTransform={REVIEW_HOVER[1]}
            isContainerHovered={isHovered}
          />
          {/* Card 2 — Violet */}
          <ReviewCard
            text="Super professional, organised and great to work with. These guys were invaluable on our last major project. Can't recommend enough."
            author="Matt."
            authorSrc="/clone-assets/review-author-2.avif"
            variant="violet"
            position={2}
            stars
            starsVariant="white"
            restingTransform={REVIEW_RESTING[2]}
            hoverTransform={REVIEW_HOVER[2]}
            isContainerHovered={isHovered}
          />
          {/* Card 3 — Default */}
          <ReviewCard
            text="I recently used these guys for our company conference. They were so good and super professional. Will definitely use again."
            author="Emma H."
            authorSrc="/clone-assets/review-author-1.avif"
            variant="default"
            position={3}
            stars
            restingTransform={REVIEW_RESTING[3]}
            hoverTransform={REVIEW_HOVER[3]}
            isContainerHovered={isHovered}
          />
          {/* Card 4 — Default */}
          <ReviewCard
            text="Really useful system. We got an amazing service for our company hotel bookings for our up and coming events."
            author="Barry W."
            authorSrc="/clone-assets/review-author-1.avif"
            variant="default"
            position={4}
            restingTransform={REVIEW_RESTING[4]}
            hoverTransform={REVIEW_HOVER[4]}
            isContainerHovered={isHovered}
          />
          {/* Card 5 — Green */}
          <ReviewCard
            text="Sorted accommodation in Scotland for me and were very timely and professional. Excellent rates and more discounted than anywhere else :)"
            author="Simon F."
            authorSrc="/clone-assets/review-author-3.avif"
            variant="green"
            position={5}
            stars
            starsVariant="black"
            restingTransform={REVIEW_RESTING[5]}
            hoverTransform={REVIEW_HOVER[5]}
            isContainerHovered={isHovered}
          />
        </div>
      </div>
    </section>
  );
}
