'use client';

import { useRef } from 'react';
import { useSmoothScroll } from '../../_hooks/useScrollAnimation';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ShowcaseSection } from './ShowcaseSection';
import { PricingSection } from './PricingSection';
import { CtaSection } from './CtaSection';
import { PartnersSection } from './PartnersSection';
import { ReviewsSection } from './ReviewsSection';
import { FinalCtaSection } from './FinalCtaSection';
import { Footer } from './Footer';

export function LandingPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  return (
    <div className="bg-hero-bg font-sora">
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
    </div>
  );
}
