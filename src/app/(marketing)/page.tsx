'use client';

/**
 * Landing page — Tiendri
 * Design system: Light / Clone style (EventBeds-inspired scroll animations)
 * Approved by CTO — visual rebrand from Ember Core to light/clean aesthetic.
 *
 * Visual design: Valentina (UI/UX Designer)
 * Interactivity, animations: Camilo (Frontend Senior) — TODO: review after handoff
 *
 * Section rhythm:
 *   Navbar          → light pill, hide on scroll-down / show on scroll-up
 *   HeroSection     → city parallax layers, phone drop on scroll
 *   HowItWorksSection → phone convergence scroll animation (like Deals)
 *   ShowcaseSection → 400vh scroll-pinned 3-phone templates (like Discover)
 *   PricingSection  → scroll-driven reveal (like Hotel)
 *   CtaSection      → Benefits: IntersectionObserver fade-up
 *   PartnersSection → channel cards + vertical brand sliders
 *   ReviewsSection  → 5 scattered cards, hover fans out
 *   FinalCtaSection → ticker belt + metrics
 *   Footer          → sticky reveal from below
 */

import { useRef } from 'react';
import { useSmoothScroll } from './_hooks/useScrollAnimation';
import { Navbar } from './_components/landing/Navbar';
import { HeroSection } from './_components/landing/HeroSection';
import { HowItWorksSection } from './_components/landing/HowItWorksSection';
import { ShowcaseSection } from './_components/landing/ShowcaseSection';
import { PricingSection } from './_components/landing/PricingSection';
import { CtaSection } from './_components/landing/CtaSection';
import { PartnersSection } from './_components/landing/PartnersSection';
import { ReviewsSection } from './_components/landing/ReviewsSection';
import { FinalCtaSection } from './_components/landing/FinalCtaSection';
import { Footer } from './_components/landing/Footer';

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  useSmoothScroll();

  return (
    <>
      <style>{`
        body { overflow-x: hidden !important; }
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <Navbar />
      <main id="main-content">
        <HeroSection sectionRef={heroRef} />
        <HowItWorksSection heroRef={heroRef} />
        <ShowcaseSection />
        <PricingSection />
        <CtaSection />
        <PartnersSection />
        <ReviewsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
