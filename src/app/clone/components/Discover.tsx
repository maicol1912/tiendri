'use client';

import { useRef, useEffect } from 'react';

// ─── Lerp (exact copy from original JS) ──────────────────────────────────────
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.min(1, Math.max(0, t));
}

// ─── Mobile / tablet static version (section.static-discover-sc) ─────────────
// Shown on screens < 992px. Hidden on desktop via CSS.
function DiscoverStatic() {
  return (
    <section
      className="block lg:hidden"
      style={{ willChange: 'background', backgroundColor: 'rgb(0,0,0)' }}
    >
      {/* container-full static-discover-s */}
      <div style={{ maxWidth: '100%', padding: '80px 5%' }}>
        {/* discover-header-block */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          {/* body-m grey */}
          <div style={{ fontSize: 20, fontWeight: 400, lineHeight: '24px', color: 'gray' }}>
            Discover
          </div>
          {/* view-heading-easy > heading-block-1 */}
          <div>
            <div>
              {/* heading-h1 white */}
              <h2
                style={{
                  paddingBottom: 7,
                  fontSize: 50,
                  fontWeight: 700,
                  lineHeight: '50px',
                  color: 'white',
                  margin: 0,
                }}
              >
                Easy search
              </h2>
            </div>
          </div>
        </div>

        {/* mobiles-wrapper-s */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            overflowX: 'auto',
          }}
        >
          {/* discovery-mobile-s #1 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 260,
              flexShrink: 0,
            }}
          >
            <div className="mobile-wrapper-size">
              <img
                className="image"
                src="/clone-assets/discover-phone-1.avif"
                alt="Preference"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            {/* down-position-block-s */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {/* down-text-block */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 200,
                  paddingTop: 46,
                  rowGap: 10,
                }}
              >
                {/* heading-h4 white */}
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: '32px',
                    color: 'white',
                    margin: 0,
                  }}
                >
                  Preference
                </h1>
                {/* body-s grey */}
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', color: 'gray' }}>
                  Nearest hotels to your event are shown on an easy-to-use map.
                </div>
              </div>
            </div>
          </div>

          {/* discovery-mobile-s #2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 260,
              flexShrink: 0,
            }}
          >
            <div className="mobile-wrapper-size">
              <img
                className="image"
                src="/clone-assets/discover-phone-2.avif"
                alt="Save"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 200,
                  paddingTop: 46,
                  rowGap: 10,
                }}
              >
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: '32px',
                    color: 'white',
                    margin: 0,
                  }}
                >
                  Save
                </h1>
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', color: 'gray' }}>
                  Your exclusive discount code and secret prices with savings up to 50%.
                </div>
              </div>
            </div>
          </div>

          {/* discovery-mobile-s #3 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 260,
              flexShrink: 0,
            }}
          >
            <div className="mobile-wrapper-size">
              <img
                className="image"
                src="/clone-assets/discover-phone-3.png"
                alt="Book"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 200,
                  paddingTop: 46,
                  rowGap: 10,
                }}
              >
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: '32px',
                    color: 'white',
                    margin: 0,
                  }}
                >
                  Book
                </h1>
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', color: 'gray' }}>
                  Compare and book your perfect hotel or apartment in seconds.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Desktop scroll-driven version (section.discover-sc) ─────────────────────
//
// LITERAL translation of the original HTML/CSS/JS:
//
// Structure:
//   section.discover-sc                    bg:#000, position:relative, z-index:50
//     div.discover-subhead                 z-index:10, height:300vh, position:relative
//       div.discover-height                height:400vh, position:relative, top:-100vh
//         div.discover-sticky              height:100vh, position:sticky, top:0, overflow:hidden
//           div#discover-scroll-container  width:100vw, height:100%, willChange:transform, transform:translateY(30%)
//             div.discovery-content        width:100%, height:100vh, position:relative
//               div.discover-header-block  textAlign:center, opacity:0, scale(1.7), translateY(10vh)
//               div.mobiles-block          display:flex, justifyContent:space-around, alignItems:center, width:100%, height:100%
//                 div.discovery-mobile.left    position:ABSOLUTE, z-index:10, width:387px, height:85%, transform:translate3d(-70%,40vh,0)
//                   img.image
//                   div.down-position-block    position:absolute, inset:auto 0% 0%, height:1px
//                     div.down-text-block      width:200px, paddingTop:46px
//                 div.discovery-mobile.center  position:relative (flex anchor), z-index:20, width:524px, height:115%, transform:translate3d(0,40vh,0)
//                   img.image
//                   div.down-position-block
//                 div.discovery-mobile.right   position:ABSOLUTE, z-index:10, width:387px, height:85%, transform:translate3d(70%,40vh,0)
//                   img.image
//                   div.down-position-block
//
// ANIMATION (exact JS copy):
//   progress = -discoverHeight.getBoundingClientRect().top / (discoverHeight.offsetHeight - window.innerHeight)
//   containerY  = lerp(30, 0, progress * 3)       → clamps at 0 after p=0.333
//   header p<0.3: opacity=p/0.3, scale=lerp(1.7,1.3,t),    translateY=lerp(10,5,t)
//   header p≥0.3: opacity=lerp(1,0,t2), scale=lerp(1.3,1,t2), translateY=lerp(5,0,t2)
//   phoneX       = lerp(70, 110, progress)    → X offset in % of phone width
//   phoneY       = lerp(40, -10, progress)    → Y in vh (rise from below)
//   sideHeight   = lerp(85, 70, progress)     → % of mobiles-block (=100vh)
//   centerHeight = lerp(115, 70, progress)    → % of mobiles-block
//
// LABELS: always in DOM inside each .discovery-mobile via .down-position-block
// (position:absolute, bottom:0). NO separate fade. They appear as phones rise.

function DiscoverDesktop() {
  const discoverHeightRef = useRef<HTMLDivElement>(null);
  const discoverContainerRef = useRef<HTMLDivElement>(null);
  const discoverHeaderRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    function updateDiscoverAnimation() {
      const discoverHeight = discoverHeightRef.current;
      const discoverContainer = discoverContainerRef.current;
      const discoverHeader = discoverHeaderRef.current;
      const phoneLeft = phoneLeftRef.current;
      const phoneCenter = phoneCenterRef.current;
      const phoneRight = phoneRightRef.current;

      if (!discoverHeight) return;

      // Exact copy of original JS (verbatim from index.html line 1508-1511):
      // scrolled = -rect.top  (no innerHeight offset — original does NOT subtract it)
      // totalScroll = discoverHeight.offsetHeight - window.innerHeight
      const rect = discoverHeight.getBoundingClientRect();
      const totalScroll = discoverHeight.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

      if (discoverContainer) {
        const containerY = lerp(30, 0, progress * 3);
        discoverContainer.style.transform = 'translateY(' + containerY + '%)';
      }

      if (discoverHeader) {
        let headerOpacity: number;
        let headerScale: number;
        let headerY: number;

        if (progress < 0.25) {
          const t = progress / 0.25;
          headerOpacity = t;
          headerScale = lerp(1.7, 1.1, t);
          headerY = lerp(24, 12, t);
        } else if (progress < 0.65) {
          headerOpacity = 1;
          headerScale = 1.1;
          headerY = 12;
        } else {
          const t2 = (progress - 0.65) / 0.35;
          headerOpacity = lerp(1, 0, t2);
          headerScale = lerp(1.1, 1, t2);
          headerY = lerp(12, 5, t2);
        }

        discoverHeader.style.opacity = String(headerOpacity);
        discoverHeader.style.transform = 'scale(' + headerScale + ') translateY(' + headerY + 'vh)';
      }

      if (phoneLeft && phoneCenter && phoneRight) {
        const phoneX = lerp(70, 110, progress);
        const phoneY = lerp(40, -10, progress);
        const sideHeight = lerp(85, 70, progress);
        const centerHeight = lerp(115, 70, progress);

        phoneLeft.style.transform = 'translate3d(-' + phoneX + '%, ' + phoneY + 'vh, 0)';
        phoneLeft.style.height = sideHeight + '%';
        phoneCenter.style.transform = 'translate3d(0, ' + phoneY + 'vh, 0)';
        phoneCenter.style.height = centerHeight + '%';
        phoneRight.style.transform = 'translate3d(' + phoneX + '%, ' + phoneY + 'vh, 0)';
        phoneRight.style.height = sideHeight + '%';
      }
    }

    function onScroll() {
      if (!ticking) {
        rafId = requestAnimationFrame(function () {
          updateDiscoverAnimation();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Initial call (exact copy from original)
    updateDiscoverAnimation();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    // section.discover-sc — hidden on mobile, shown on desktop
    // bg:#000, position:relative, z-index:50
    <section
      className="hidden lg:block"
      style={{
        willChange: 'background',
        backgroundColor: 'rgb(0,0,0)',
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* div.discover-subhead — z-index:10, height:300vh, position:relative */}
      <div
        style={{
          zIndex: 10,
          height: '200vh',
          position: 'relative',
        }}
      >
        {/* div.discover-height — height:400vh, position:relative, top:-100vh */}
        <div
          ref={discoverHeightRef}
          style={{
            height: '300vh',
            position: 'relative',
            top: '-100vh',
          }}
        >
          {/* div.discover-sticky — height:100vh, position:sticky, top:0, overflow:hidden */}
          <div
            style={{
              height: '100vh',
              position: 'sticky',
              top: 0,
              overflow: 'hidden',
            }}
          >
            {/* div.container-full.discover-s #discover-scroll-container
                width:100vw, height:100%, willChange:transform, transform:translateY(30%)
                Exact match to original HTML — no paddingTop, no extra height */}
            <div
              ref={discoverContainerRef}
              id="discover-scroll-container"
              style={{
                width: '100vw',
                height: '100%',
                willChange: 'transform',
                transform: 'translateY(30%)',
              }}
            >
              {/* div.discovery-content — width:100%, height:100vh, position:relative */}
              <div
                style={{
                  width: '100%',
                  height: '100vh',
                  position: 'relative',
                }}
              >
                {/* div.discover-header-block
                    textAlign:center, willChange:opacity,transform
                    initial: opacity:0, transform:scale3d(1.7,1.7,1) translateY(10vh) */}
                <div
                  ref={discoverHeaderRef}
                  style={{
                    textAlign: 'center',
                    fontSize: 65,
                    lineHeight: '65px',
                    willChange: 'opacity, transform',
                    opacity: 0,
                    transform: 'scale3d(1.7,1.7,1) translateY(10vh)',
                  }}
                >
                  {/* body-m grey */}
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 400,
                      lineHeight: '24px',
                      color: 'gray',
                    }}
                  >
                    Discover
                  </div>
                  {/* view-heading-easy > heading-block-1 */}
                  <div>
                    <div>
                      {/* heading-h1 white */}
                      <h2
                        style={{
                          paddingBottom: 7,
                          fontSize: 50,
                          fontWeight: 700,
                          lineHeight: '50px',
                          color: 'white',
                          margin: 0,
                        }}
                      >
                        Easy search
                      </h2>
                    </div>
                  </div>
                </div>

                {/* div.mobiles-block
                    display:flex, justifyContent:space-around, alignItems:center
                    width:100%, height:100% (= 100vh) */}
                <div
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                  }}
                >
                  {/* div.discovery-mobile.left
                      position:absolute (from CSS), z-index:10
                      willChange:transform,width,height
                      initial: transform:translate3d(-70%,40vh,0px), height:85%, width:387px */}
                  <div
                    ref={phoneLeftRef}
                    style={{
                      willChange: 'transform, width, height',
                      transform: 'translate3d(-70%, 40vh, 0px)',
                      height: '85%',
                      width: 387,
                      maxHeight: 1440,
                      position: 'absolute',
                      zIndex: 10,
                    }}
                  >
                    <img
                      className="image"
                      src="/clone-assets/discover-phone-1.avif"
                      alt="Preference"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {/* div.down-position-block
                        position:absolute, inset:auto 0% 0% (bottom:0, left:0, right:0)
                        height:1px, display:flex, justifyContent:center, alignItems:flex-start */}
                    <div
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: 1,
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 'auto',
                      }}
                    >
                      {/* div.down-text-block — width:200px, paddingTop:46px, flexCol, rowGap:10px */}
                      <div
                        style={{
                          rowGap: 10,
                          flexDirection: 'column',
                          width: 200,
                          paddingTop: 46,
                          display: 'flex',
                        }}
                      >
                        {/* heading-h4 white */}
                        <h1
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: '32px',
                            color: 'white',
                            margin: 0,
                          }}
                        >
                          Preference
                        </h1>
                        {/* body-s grey */}
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'gray',
                          }}
                        >
                          Nearest hotels to your event are shown on an easy-to-use map.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* div.discovery-mobile.center
                      position:relative (flex anchor — NOT absolute)
                      z-index:20
                      willChange:transform,width,height
                      initial: transform:translate3d(0px,40vh,0px), height:115%, width:524px */}
                  <div
                    ref={phoneCenterRef}
                    style={{
                      willChange: 'transform, width, height',
                      transform: 'translate3d(0px, 40vh, 0px)',
                      height: '115%',
                      width: 524,
                      maxHeight: 1440,
                      position: 'relative',
                      zIndex: 20,
                    }}
                  >
                    <img
                      className="image"
                      src="/clone-assets/discover-phone-2.avif"
                      alt="Save"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {/* down-position-block */}
                    <div
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: 1,
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 'auto',
                      }}
                    >
                      <div
                        style={{
                          rowGap: 10,
                          flexDirection: 'column',
                          width: 200,
                          paddingTop: 46,
                          display: 'flex',
                        }}
                      >
                        <h1
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: '32px',
                            color: 'white',
                            margin: 0,
                          }}
                        >
                          Save
                        </h1>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'gray',
                          }}
                        >
                          Your exclusive discount code and secret prices with savings up to 50%.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* div.discovery-mobile.right
                      position:absolute (from CSS), z-index:10
                      willChange:transform,width,height
                      initial: transform:translate3d(70%,40vh,0px), height:85%, width:387px */}
                  <div
                    ref={phoneRightRef}
                    style={{
                      willChange: 'transform, width, height',
                      transform: 'translate3d(70%, 40vh, 0px)',
                      height: '85%',
                      width: 387,
                      maxHeight: 1440,
                      position: 'absolute',
                      zIndex: 10,
                    }}
                  >
                    <img
                      className="image"
                      src="/clone-assets/discover-phone-3.png"
                      alt="Book"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                    {/* down-position-block */}
                    <div
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: 1,
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 'auto',
                      }}
                    >
                      <div
                        style={{
                          rowGap: 10,
                          flexDirection: 'column',
                          width: 200,
                          paddingTop: 46,
                          display: 'flex',
                        }}
                      >
                        <h1
                          style={{
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: '32px',
                            color: 'white',
                            margin: 0,
                          }}
                        >
                          Book
                        </h1>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'gray',
                          }}
                        >
                          Compare and book your perfect hotel or apartment in seconds.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* #how-it-works anchor */}
      <div id="how-it-works" style={{ position: 'absolute' }} />
    </section>
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
