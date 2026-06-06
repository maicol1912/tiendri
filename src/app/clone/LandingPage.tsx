'use client';

import { useRef, useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Deals } from './components/Deals';
import { Discover } from './components/Discover';
import { Hotel } from './components/Hotel';
import { Benefits } from './components/Benefits';
import { Partners } from './components/Partners';
import { Reviews } from './components/Reviews';
import { Founders } from './components/Founders';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PopupModal } from './components/PopupModal';

/**
 * EventBeds landing page — main composition component.
 *
 * Architecture:
 * - Lenis smooth scroll initialized here (desktop only)
 * - Hero section ref shared with Deals so the phone scroll animation can track it
 * - Popup modal state lifted here: Partners + CTA can both open it
 *
 * Section order (matches original HTML exactly):
 *  1. Navbar        — sticky, auto-hide scroll-down / show scroll-up
 *  2. Hero          — desktop parallax city layers + hotel pins; mobile variants
 *  3. Deals         — phone drop from -140% + icon scroller marquee
 *  4. Discover      — 400vh scroll-pinned, 3 phones converge
 *  5. Hotel         — "Book and relax": black overlay fade + sequential window/card reveal
 *  6. Benefits      — "Deals to make your eyes water": parallax widget rise
 *  7. Partners      — dual dark cards + vertical brand sliders (rAF)
 *  8. Reviews       — 5-card scattered pile, hover spreads cards
 *  9. Founders      — word-by-word text reveal on scroll
 * 10. CTA           — email form + horizontal ticker
 * 11. Footer        — sticky reveal from below
 * 12. PopupModal    — accessible dialog (ESC + backdrop close, focus trap)
 */
export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  // Lenis smooth scroll — desktop only
  useSmoothScroll();

  return (
    <>
      {/* Global: prefers-reduced-motion kills all animations */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        body { overflow-x: hidden !important; }
        ::selection { background-color: #8D8AFF; color: white; }
      `}</style>

      {/* Keyboard skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* heroRef is passed to Deals so the phone animation can track hero scroll progress */}
        <Hero sectionRef={heroRef} />

        {/* Phone drop animation reads heroRef to compute scroll progress */}
        <Deals heroRef={heroRef} />

        {/* Scroll-pinned 400vh: 3 phones converge (desktop) / static cards (mobile) */}
        <Discover />

        {/* Black overlay fades → windows illuminate → cards slide up */}
        <Hotel />

        {/* Parallax widget rise: widgets-wrapper, logo-wrapper, tag-area */}
        <Benefits />

        {/* Dual dark cards + vertical brand sliders (left up / right down) */}
        <Partners onOpenSignup={() => setPopupOpen(true)} />

        {/* 5 scattered review cards, hover fans them out */}
        <Reviews />

        {/* Founders avatars + word-by-word letter reveal */}
        <Founders />

        {/* "Don't miss out" email form + horizontal ticker */}
        <CTA onOpenSignup={() => setPopupOpen(true)} />

        {/* Sticky footer (appears to scroll up from below) */}
        <Footer />
      </main>

      {/* VIP waitlist modal */}
      <PopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
