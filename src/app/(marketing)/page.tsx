/**
 * Landing page — Tiendri
 * Design system: Ember Core (dark tech)
 * Approved by CTO — Option A.
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

import { Navbar } from "./_components/landing/Navbar";
import { HeroSection } from "./_components/landing/HeroSection";
import { HowItWorksSection } from "./_components/landing/HowItWorksSection";
import { ShowcaseSection } from "./_components/landing/ShowcaseSection";
import { PricingSection } from "./_components/landing/PricingSection";
import { CtaSection } from "./_components/landing/CtaSection";
import { Footer } from "./_components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ShowcaseSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
