'use client';

/**
 * LandingPageClient — Tiendri Landing (Ember Core)
 * Design system: Ember Core (dark tech)
 *
 * Client wrapper for the landing page sections.
 * Preserves the approved V2 design — Option A.
 *
 * Visual design: Valentina (UI/UX Designer)
 * Interactivity, animations, 3D: Camilo (Frontend Senior)
 *
 * Section rhythm (all dark, no bg flipping):
 *   Navbar    → fixed, transparent → glass on scroll
 *   Hero      → bg-deep (#0B0A0D) — deepest entry
 *   HowItWorks→ bg-base (#100F14) — slight lift, vertical timeline
 *   Showcase  → bg-elevated (#16141B) — premium cards moment
 *   Pricing   → bg-base (#100F14) — dark comparison table
 *   CTA       → bg-deep (#0B0A0D) — red glow moment
 *   Footer    → bg-deep (#0B0A0D) — closes the frame
 */

import { useRef } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ShowcaseSection } from './ShowcaseSection';
import { PricingSection } from './PricingSection';
import { ReviewsSection } from './ReviewsSection';
import { CtaSection } from './CtaSection';
import { Footer } from './Footer';

export function LandingPageClient() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection sectionRef={heroRef} />
        <HowItWorksSection heroRef={heroRef} />
        <ShowcaseSection />
        <PricingSection />
        <ReviewsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
