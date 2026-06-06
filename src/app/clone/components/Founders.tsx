'use client';

import { useRef, useEffect } from 'react';

// Founders Section — "We are Joseph and Paul, the Co-founders of EventBeds™"
// Word-by-word reveal: scroll progress through section drives how many .founder-word spans are visible.

const founderText = `Having worked in the events and technology industry for over two decades, we discovered that event accommodation is not only expensive but also challenging to navigate when searching for the best deals. On average, customers will visit four different websites before making a reservation, which we found to be inefficient. As a result, we wanted to create a better solution. In 2019, we came up with the idea for EventBeds™, with a goal of making the process of finding the best deals for event accommodation easier and more enjoyable for our valued customers. Our platform offers a mix of event-exclusive deals and secret discounts from some of the world's largest hotel chains and boutique properties across 180 countries. As a result, you can save both time and money, with average savings of over 20%. We are continually striving to make EventBeds™ even better, and we invite you to join our newsletter to stay up to date on our latest developments. We take pride in what we have built and are thrilled to drive the industry forward into the future. Thanks, and we look forward to serving you.`;

export function Founders() {
  const words = founderText.split(' ');
  const sectionRef = useRef<HTMLElement>(null);

  // Word-by-word scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spans = Array.from(section.querySelectorAll<HTMLElement>('.founder-word'));

    if (prefersReducedMotion) {
      // Show all words immediately
      spans.forEach((span) => { span.style.opacity = '1'; });
      return;
    }

    let rafId: number;
    let ticking = false;

    // Reveal founders pin when section enters view
    const pin = section.querySelector<HTMLElement>('[data-founders="pin"]');
    if (pin) {
      const pinObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          pin.style.opacity = '1';
          pin.style.transform = 'rotateZ(-6deg)';
          pinObserver.disconnect();
        }
      }, { threshold: 0.3 });
      pinObserver.observe(pin);
    }

    function update() {
      const rect = section!.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (-rect.top + window.innerHeight * 0.3) / (rect.height * 0.7)),
      );
      const wordsToShow = Math.floor(progress * spans.length);
      spans.forEach((span, i) => {
        span.style.opacity = i < wordsToShow ? '1' : '0';
      });
    }

    function onScroll() {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-20 px-6 lg:px-10" aria-labelledby="founders-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left: avatars + heading */}
          <div className="flex-shrink-0 max-w-lg">
            {/* Founder avatars */}
            <div className="flex items-end gap-4 mb-10">
              <div
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ transform: "rotateZ(-8.6deg)" }}
              >
                <img
                  src="/clone-assets/founder-joseph.avif"
                  alt="Joseph"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ transform: "rotateZ(5deg)" }}
              >
                <img
                  src="/clone-assets/founder-paul.avif"
                  alt="Paul"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Heading */}
            <p className="text-neutral-500 text-base font-medium mb-3">We are</p>
            <h2
              id="founders-heading"
              className="text-white font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              Joseph and Paul,<br />the Co-founders of EventBeds&#8482;
            </h2>

            {/* Tag badge — fades in + tilts when visible */}
            <div
              data-founders="pin"
              className="inline-flex items-center px-4 py-2 bg-neutral-800 rounded-full"
              style={{
                transform: 'rotateZ(-6deg) translateY(10px)',
                opacity: 0,
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <span className="text-white text-sm">by NuBreed Hotels</span>
            </div>
          </div>

          {/* Right: founder letter — words reveal on scroll (Camilo) */}
          <div className="flex-1">
            {/*
              Static render: all words shown at low opacity.
              Camilo adds scroll-linked word reveal:
              each .founder-word transitions from opacity-0 to opacity-100
              as the user scrolls through the section.
            */}
            <p
              id="founder-words"
              className="text-white text-lg leading-relaxed font-medium"
              style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="founder-word"
                  style={{ opacity: 0, transition: "opacity 0.15s ease", marginRight: 4 }}
                >
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
