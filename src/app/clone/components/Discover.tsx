'use client';

import { useRef, useEffect } from 'react';
import { lerp } from '../lib/animations';

// ─── Phone image data ────────────────────────────────────────────────────────

const phones = [
  {
    src: '/clone-assets/discover-phone-1.avif',
    alt: 'Preference screen',
    label: 'Preference',
    description: 'Nearest hotels to your event are shown on an easy-to-use map.',
    position: 'left' as const,
  },
  {
    src: '/clone-assets/discover-phone-2.avif',
    alt: 'Save screen',
    label: 'Save',
    description: 'Your exclusive discount code and secret prices with savings up to 50%.',
    position: 'center' as const,
  },
  {
    src: '/clone-assets/discover-phone-3.png',
    alt: 'Book screen',
    label: 'Book',
    description: 'Compare and book your perfect hotel or apartment in seconds.',
    position: 'right' as const,
  },
];

// ─── Mobile / tablet static version ─────────────────────────────────────────
// Shown on screens < lg. Three phone cards in a row with labels below.

function DiscoverStatic() {
  return (
    <section
      className="block lg:hidden bg-black"
      style={{ paddingTop: 80, paddingBottom: 80 }}
      aria-labelledby="discover-heading-mobile"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p
            style={{
              color: '#9ca3af',
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 16,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Discover
          </p>
          <h2
            id="discover-heading-mobile"
            style={{
              color: '#fff',
              fontWeight: 900,
              lineHeight: 1,
              fontSize: 'clamp(40px, 8vw, 64px)',
              margin: 0,
            }}
          >
            Easy search
          </h2>
        </div>

        {/* Phone cards */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            overflowX: 'auto',
            paddingBottom: 16,
          }}
        >
          {phones.map((phone) => (
            <div
              key={phone.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 220,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  borderRadius: 24,
                  overflow: 'hidden',
                  aspectRatio: '9 / 19',
                }}
              >
                <img
                  src={phone.src}
                  alt={phone.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div
                style={{
                  paddingTop: 24,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 20,
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {phone.label}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                  {phone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Desktop scroll-driven version ──────────────────────────────────────────
//
// Structure (mirrors original Webflow HTML exactly):
//
//   <section class="discover-sc"> ← black bg, full width
//     <div class="discover-height">  ← height:400vh; position:relative; top:-100vh
//       <div class="discover-sticky"> ← height:100vh; position:sticky; top:0; overflow:hidden
//         <div id="discover-scroll-container"> ← starts at translateY(30%), animates to 0%
//           <div class="discovery-content">
//             <div class="discover-header-block"> ← opacity:0; scale(1.7); fades in then out
//             <div class="mobiles-block">
//               <div class="discovery-mobile left">  ← translate3d(-70%,40vh,0); h:85%; w:387px
//               <div class="discovery-mobile center"> ← translate3d(0,40vh,0);    h:115%; w:524px
//               <div class="discovery-mobile right">  ← translate3d(70%,40vh,0);  h:85%; w:387px
//
// The phones use % height relative to the STICKY container (100vh),
// so 85% = 85vh and 115% = 115vh effectively — but we compute from the container's
// actual height for correctness. The original HTML uses % of parent (.discovery-content
// or .mobiles-block) which itself fills the sticky container.
//
// ANIMATION (from original JS, exact values):
//   progress = scrolled / (400vh - 100vh)  = scrolled / totalScroll
//
//   containerY = lerp(30, 0, progress*3)   → clamps at 0 after p=0.33
//   header:
//     p < 0.3: opacity=p/0.3, scale=lerp(1.7,1.3,t), translateY=lerp(10,5,t)
//     p ≥ 0.3: opacity=lerp(1,0,t2), scale=lerp(1.3,1,t2), translateY=lerp(5,0,t2)
//   phones:
//     phoneX = lerp(70, 110, progress)     → X spread outward (% of own width)
//     phoneY = lerp(40, -10, progress)     → Y rise (vh)
//     sideH  = lerp(85, 70, progress)      → side phone height (% → use vh directly)
//     centerH= lerp(115, 70, progress)     → center phone height (%)
//
// IMPORTANT: height "85%" in the original is % of the parent (.mobiles-block),
// which stretches to fill the sticky 100vh container. We replicate with vh.
//
// LABEL POSITIONING: Labels sit BELOW each phone (not inside/overlaid).
// Each .discovery-mobile is a flex column: [phone image] + [down-position-block].
// The phone image fills the animated height, labels sit below it.
// Labels fade in as the progress approaches 1.

function DiscoverDesktop() {
  const heightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    function update() {
      const height = heightRef.current;
      const container = containerRef.current;
      const header = headerRef.current;
      const left = phoneLeftRef.current;
      const center = phoneCenterRef.current;
      const right = phoneRightRef.current;
      const labels = labelsRef.current;

      if (!height) return;

      const rect = height.getBoundingClientRect();
      const totalScroll = height.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

      // Container: translateY(30%) → translateY(0%) (first 33% of scroll)
      if (container) {
        const containerY = lerp(30, 0, progress * 3);
        container.style.transform = `translateY(${containerY}%)`;
      }

      // Header: fade in (p 0→0.3) then fade out (p 0.3→0.7)
      if (header) {
        let opacity: number;
        let scale: number;
        let translateY: number;

        if (progress < 0.3) {
          const t = progress / 0.3;
          opacity = t;
          scale = lerp(1.7, 1.3, t);
          translateY = lerp(10, 5, t);
        } else {
          const t2 = Math.min(1, (progress - 0.3) / 0.4);
          opacity = lerp(1, 0, t2);
          scale = lerp(1.3, 1, t2);
          translateY = lerp(5, 0, t2);
        }

        header.style.opacity = String(opacity);
        header.style.transform = `scale(${scale}) translateY(${translateY}vh)`;
      }

      // Phones: spread from ±70% to ±110% translateX of own width,
      //         rise from 40vh to -10vh, heights equalize
      if (left && center && right) {
        const phoneX = lerp(70, 110, progress);
        const phoneY = lerp(40, -10, progress);
        const sideH = lerp(85, 70, progress);
        const centerH = lerp(115, 70, progress);

        left.style.transform = `translate3d(-${phoneX}%, ${phoneY}vh, 0)`;
        left.style.height = `${sideH}vh`;

        center.style.transform = `translate3d(0px, ${phoneY}vh, 0)`;
        center.style.height = `${centerH}vh`;

        right.style.transform = `translate3d(${phoneX}%, ${phoneY}vh, 0)`;
        right.style.height = `${sideH}vh`;
      }

      // Labels: fade in during last 30% of scroll (p 0.7→1)
      if (labels) {
        const labelOpacity = Math.min(1, Math.max(0, (progress - 0.7) / 0.3));
        labels.style.opacity = String(labelOpacity);
      }
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
    // Outer 400vh scroll budget, top:-100vh overlaps with previous section.
    // marginBottom:-100vh compensates so the next section follows immediately.
    <div
      ref={heightRef}
      className="hidden lg:block bg-black"
      style={{
        height: '400vh',
        position: 'relative',
        top: '-100vh',
        marginBottom: '-100vh',
      }}
    >
      {/* Sticky panel — pinned at viewport top for the full 400vh scroll */}
      <div
        style={{
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* Animated container — slides from Y=30% to Y=0% */}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
            transform: 'translateY(30%)',
            position: 'relative',
          }}
        >
          {/* Heading — starts scaled up & invisible, fades in then out */}
          <div
            ref={headerRef}
            style={{
              textAlign: 'center',
              marginBottom: 48,
              willChange: 'opacity, transform',
              opacity: 0,
              transform: 'scale(1.7) translateY(10vh)',
              position: 'relative',
              zIndex: 50,
              pointerEvents: 'none',
            }}
            aria-labelledby="discover-heading"
          >
            <p
              style={{
                color: '#9ca3af',
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 12,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Discover
            </p>
            <h2
              id="discover-heading"
              style={{
                color: '#fff',
                fontWeight: 900,
                lineHeight: 1,
                fontSize: 'clamp(56px, 7vw, 96px)',
                margin: 0,
              }}
            >
              Easy search
            </h2>
          </div>

          {/*
            Phones container — flex row, no gap.
            Side phones overlap center via translateX(±70% of own width) + z-index.
            The flex row just provides horizontal layout; actual position driven by translateX.
            Each phone div is a flex column: [img fills animated height] + [label below].
          */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
            }}
          >
            {/* LEFT phone — 387px wide, starts at -70% translateX (overlapping center),
                spreads to -110% as scroll progresses. z-index:10 (behind center). */}
            <div
              ref={phoneLeftRef}
              style={{
                width: 387,
                height: '85vh',
                position: 'relative',
                zIndex: 10,
                flexShrink: 0,
                willChange: 'transform, height',
                transform: 'translate3d(-70%, 40vh, 0px)',
                borderRadius: 40,
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <img
                src="/clone-assets/discover-phone-1.avif"
                alt="Preference"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* CENTER phone — 524px wide, starts at translateY(40vh), no X shift.
                z-index:30 (on top of side phones). Tallest initially (115vh). */}
            <div
              ref={phoneCenterRef}
              style={{
                width: 524,
                height: '115vh',
                position: 'relative',
                zIndex: 30,
                flexShrink: 0,
                willChange: 'transform, height',
                transform: 'translate3d(0px, 40vh, 0px)',
                borderRadius: 40,
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <img
                src="/clone-assets/discover-phone-2.avif"
                alt="Save"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* RIGHT phone — 387px wide, starts at +70% translateX,
                spreads to +110% as scroll progresses. z-index:10 (behind center). */}
            <div
              ref={phoneRightRef}
              style={{
                width: 387,
                height: '85vh',
                position: 'relative',
                zIndex: 10,
                flexShrink: 0,
                willChange: 'transform, height',
                transform: 'translate3d(70%, 40vh, 0px)',
                borderRadius: 40,
                overflow: 'hidden',
                backgroundColor: '#111',
              }}
            >
              <img
                src="/clone-assets/discover-phone-3.png"
                alt="Book"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/*
            Labels row — positioned below the phones, aligned to each phone's center.
            Uses absolute positioning so it doesn't affect the phone layout.
            Fades in during the last 30% of scroll progress.

            The label columns are centered under each phone. We use the same
            widths as the phones (387 / 524 / 387) and the same order.
            The overall width = 387 + 524 + 387 = 1298px, centered in the container.
          */}
          <div
            ref={labelsRef}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginTop: 40,
              opacity: 0,
              willChange: 'opacity',
              pointerEvents: 'none',
              width: '100%',
              maxWidth: 1298,
            }}
          >
            {/* Label: Preference (left phone) */}
            <div
              style={{
                width: 387,
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{ maxWidth: 260 }}>
                <h3
                  style={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 24,
                    margin: '0 0 8px',
                    lineHeight: 1.2,
                  }}
                >
                  Preference
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                  Nearest hotels to your event are shown on an easy-to-use map.
                </p>
              </div>
            </div>

            {/* Label: Save (center phone) */}
            <div
              style={{
                width: 524,
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{ maxWidth: 320 }}>
                <h3
                  style={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 24,
                    margin: '0 0 8px',
                    lineHeight: 1.2,
                  }}
                >
                  Save
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                  Your exclusive discount code and secret prices with savings up to 50%.
                </p>
              </div>
            </div>

            {/* Label: Book (right phone) */}
            <div
              style={{
                width: 387,
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{ maxWidth: 260 }}>
                <h3
                  style={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 24,
                    margin: '0 0 8px',
                    lineHeight: 1.2,
                  }}
                >
                  Book
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                  Compare and book your perfect hotel or apartment in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function Discover() {
  return (
    <>
      <DiscoverDesktop />
      <DiscoverStatic />
    </>
  );
}
