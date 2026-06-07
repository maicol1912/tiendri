"use client";

// Benefits Section — "Deals to make your eyes water"
// Static visual component. Parallax on widget overlays documented in ANIMATIONS.md.

import { useEffect, useRef } from "react";

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>("[data-animate]");

    // Apply initial hidden state — preserve any existing transform (e.g. scale)
    elements.forEach((el) => {
      const delay = el.dataset.animateDelay ?? "0s";
      const baseTransform = el.style.transform || "";
      el.dataset.baseTransform = baseTransform;
      el.style.opacity = "0";
      el.style.transform = `${baseTransform} translateY(30px)`;
      el.style.transition = `opacity 0.6s ease-out ${delay}, transform 0.6s ease-out ${delay}`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const baseTransform = el.dataset.baseTransform || "";
            el.style.opacity = "1";
            el.style.transform = `${baseTransform} translateY(0)`;
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-20 pb-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* Section heading */}
        <div className="mb-20">
          <h2
            data-animate
            data-animate-delay="0s"
            className="hidden lg:block font-black leading-tight text-black"
            style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
          >
            Deals to make<br />your eyes water
          </h2>
          <h2
            data-animate
            data-animate-delay="0s"
            className="block lg:hidden font-black leading-tight text-black"
            style={{ fontSize: "clamp(36px, 8vw, 60px)" }}
          >
            Deals to make your eyes water
          </h2>
        </div>

        {/* Grid Set 1 — Event exclusives: image LEFT, text RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-4 lg:-mb-16 items-center">
          {/* Image cluster */}
          <div
            data-animate
            data-animate-delay="0s"
            className="relative"
          >
            <div className="relative flex items-start">
              {/* Side column — woman photo */}
              <div className="flex-shrink-0 relative z-0" style={{ width: '55%' }}>
                <img
                  src="/clone-assets/benf-col-3.avif"
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
              </div>
              {/* Main cell — phone mockup, overlaps woman */}
              <div className="flex-shrink-0 relative z-10" style={{ width: '55%', marginLeft: '-15%' }}>
                <img
                  src="/clone-assets/benf-col-2.avif"
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
                {/* Widget overlay — parallax (Camilo) */}
                <div className="absolute -bottom-6 -left-4 w-1/2 rounded-xl overflow-hidden shadow-2xl">
                  <img src="/clone-assets/benf-col-1.avif" alt="" className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3">
            <h3
              data-animate
              data-animate-delay="0.1s"
              className="font-black text-black"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Event exclusives
            </h3>
            <p
              data-animate
              data-animate-delay="0.2s"
              className="text-neutral-500 text-base leading-relaxed hidden lg:block"
            >
              VIP benefits only available with EventBeds&#8482;
            </p>
          </div>
        </div>

        {/* Grid Set 2 — Brand discounts: text LEFT, image RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3
              data-animate
              data-animate-delay="0s"
              className="font-black text-black"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Brand discounts
            </h3>
            <p
              data-animate
              data-animate-delay="0.1s"
              className="text-neutral-500 text-base leading-relaxed"
            >
              Unlock secret prices at your favourite brands with powerful discounts
            </p>
          </div>

          {/* Image cluster */}
          <div
            data-animate
            data-animate-delay="0.2s"
            className="relative order-1 lg:order-2"
            style={{ transform: "scale(0.7)", transformOrigin: "top right" }}
          >
            <div className="relative">
              {/* Main image */}
              <img
                src="/clone-assets/benf-col-8.avif"
                alt=""
                className="w-full rounded-2xl object-cover"
              />
              {/* Widget pins — translateY 70px → 0 on scroll parallax (Camilo) */}
              <div
                className="absolute top-1/2 left-0 flex flex-col gap-3 -translate-x-1/2"
                style={{ transform: "translateY(70px)" }}
              >
                <div className="w-24 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-6.avif" alt="" className="w-full" />
                </div>
                <div className="w-24 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-9.avif" alt="" className="w-full" />
                </div>
              </div>
              {/* Logo pins — translateY 90px → 0 on scroll parallax (Camilo) */}
              <div
                className="absolute bottom-0 right-0 flex flex-col gap-2"
                style={{ transform: "translateY(90px)" }}
              >
                <div className="w-20 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-10.avif" alt="" className="w-full" />
                </div>
                <div className="w-20 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-4.avif" alt="" className="w-full" />
                </div>
                <div className="w-20 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-5.avif" alt="" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Set 3 — Referral scheme: image LEFT (offset right), text RIGHT */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ marginTop: "-100px" }}
        >
          {/* Image cluster */}
          <div
            data-animate
            data-animate-delay="0s"
            className="relative"
            style={{ transform: "scale(0.95)", transformOrigin: "top left", marginLeft: "30%" }}
          >
            <div className="relative">
              <img
                src="/clone-assets/benf-col-13.avif"
                alt="Access exclusive discounts"
                className="w-full rounded-2xl object-cover"
              />
              {/* Tag pins — translateY 70px → 0 on scroll (Camilo) */}
              <div
                className="absolute bottom-0 left-0 flex gap-2"
                style={{ transform: "translateY(70px)" }}
              >
                <div className="w-28 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-12.avif" alt="" className="w-full" />
                </div>
                <div className="w-28 rounded-xl overflow-hidden shadow-xl">
                  <img src="/clone-assets/benf-col-11.avif" alt="" className="w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3" style={{ marginRight: "20%" }}>
            <h3
              data-animate
              data-animate-delay="0.1s"
              className="font-black text-black"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Referral scheme
            </h3>
            <p
              data-animate
              data-animate-delay="0.2s"
              className="text-neutral-500 text-base leading-relaxed"
            >
              Send your exclusive discounts to other event attendees. Share the love ♥
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
