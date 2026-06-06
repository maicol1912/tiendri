'use client';

import { type RefObject } from 'react';

// Hero Section — static visual component
// Parallax city layers + phone scroll animation documented in ANIMATIONS.md
// sectionRef: forwarded to the desktop <section> so Deals/usePhoneScroll can measure its height/top.

export interface HeroProps {
  /** Ref forwarded from LandingPage — used by Deals/usePhoneScroll to compute phone drop progress. */
  sectionRef?: RefObject<HTMLElement | null>;
}

const EventBedsLogoPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 35 35" fill="none">
    <circle cx="17.0127" cy="17.1513" r="17.0127" fill="#CDE06A"/>
    <path
      d="M25.2816 25.2886L25.0467 26.6716C23.0279 28.3159 20.4251 29.3115 17.5851 29.3048C12.8106 29.2958 8.2438 26.4734 6.48047 21.349L16.0521 20.1057L24.7684 24.2682C25.1447 24.4687 25.3523 24.8764 25.2816 25.2886ZM27.1271 24.4574C27.1271 24.4574 27.1658 24.0137 27.1864 23.7907C27.2183 23.4258 27.0107 23.0812 26.6663 22.9258L17.8451 19.0335L20.822 16.709C21.1071 16.3959 21.552 16.2697 21.9648 16.3846C24.1296 16.9883 26.2922 17.5919 28.4547 18.1956C28.8949 18.3172 29.2052 18.7655 29.1596 19.2069C28.9497 21.072 28.2859 22.8019 27.1271 24.4574Z"
      fill="black"
    />
  </svg>
);

// Hotel price pin — matches .pin.figure in original
function HotelPin({ price }: { price: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "white",
        borderRadius: 999,
        padding: "8px 12px 8px 8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        minWidth: 90,
      }}
    >
      <div style={{ width: 28, height: 28, flexShrink: 0 }}>
        <EventBedsLogoPin />
      </div>
      <span style={{ color: "black", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>
        {price}
      </span>
    </div>
  );
}

// Stadium circular pin — matches .pin.stadion in original
function StadiumPin() {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        position: "relative",
      }}
    >
      <img
        src="/clone-assets/event-stadium.avif"
        alt="Stadium"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 16,
          height: 16,
          backgroundColor: "#CDE06A",
          borderRadius: "50%",
          border: "2px solid white",
        }}
      />
    </div>
  );
}

// Desktop Hero — 3-layer city parallax (static snapshot)
// Matches original .hero-sc section structure exactly:
// - .container-full.hero-s: position relative, 100vh, overflow hidden
// - .city-layers: absolute, fills entire hero
//   - .back-layer-wrapper: position absolute, display flex, full size
//     - .back-city (z-10), .middle-city (z-30), .front-city (z-30)
//     - .head-wrapper.original (z-20): heading
// - .front-layer: absolute, contains pins + hover cities at z-100
// - .down-gradient: absolute bottom, z-100
function HeroDesktop({ sectionRef }: HeroProps) {
  return (
    <section
      ref={sectionRef}
      className="hidden lg:block"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        // .hero-sc: background-color:#f7f7f8
        backgroundColor: "#f7f7f8",
      }}
    >
      {/* Back layer wrapper — display flex, full size, centered content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Back city — z-index 10 */}
        <div
          style={{
            zIndex: 10,
            position: "absolute",
            top: 0,
            bottom: 0,
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ width: "130vw", position: "absolute", display: "flex" }}>
            <img
              src="/clone-assets/city-builds-2.avif"
              alt=""
              loading="eager"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Middle city — z-index 30 */}
        <div
          style={{
            zIndex: 30,
            position: "absolute",
            inset: 0,
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ width: "130vw", position: "absolute", display: "flex" }}>
            <img
              src="/clone-assets/city-middle.avif"
              alt=""
              loading="eager"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Front city — z-index 30 */}
        <div
          style={{
            zIndex: 30,
            position: "absolute",
            top: 0,
            bottom: 0,
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ width: "130vw", position: "absolute", display: "flex" }}>
            <img
              src="/clone-assets/city-front.avif"
              alt=""
              loading="eager"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Head wrapper original — z-20, THE VISIBLE HEADING */}
        <div
          style={{
            zIndex: 20,
            position: "absolute",
            top: "17vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* .subheader.hero — font-size:28px; line-height:28px; color:gray */}
          <p
            style={{
              fontSize: 28,
              lineHeight: "28px",
              color: "gray",
              fontWeight: 400,
              marginBottom: 16,
              margin: "0 0 16px 0",
            }}
          >
            Discover your next
          </p>
          {/* .heading-mega — font-size:130px; text-transform:uppercase; line-height:1.1 */}
          <h1
            style={{
              fontWeight: 900,
              lineHeight: 1.1,
              color: "black",
              textTransform: "uppercase",
              fontSize: 130,
              margin: 0,
            }}
          >
            perfect <span style={{ opacity: 0.2 }}>s</span>tay
          </h1>
        </div>

        {/* Interaction div */}
        <div style={{ position: "absolute", width: "100%", height: "100%" }} />
      </div>

      {/* Front layer — pins at z-100, positioned over entire hero */}
      {/* hover-dots-wrapper: position absolute, width 130vw */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 100,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Stadium pin — bottom:30.2%, left:33.5% */}
        <div style={{ position: "absolute", bottom: "30.2%", left: "33.5%", zIndex: 100 }}>
          <StadiumPin />
        </div>
        {/* Hotel pin £335 — bottom:44%, left:30% */}
        <div style={{ position: "absolute", bottom: "44%", left: "30%", zIndex: 100 }}>
          <HotelPin price="£335" />
        </div>
        {/* Hotel pin £349 — bottom:37%, right:38.5% */}
        <div style={{ position: "absolute", bottom: "37%", right: "38.5%", zIndex: 100 }}>
          <HotelPin price="£349" />
        </div>
        {/* Hotel pin £285 — bottom:24.5%, right:30.5% */}
        <div style={{ position: "absolute", bottom: "24.5%", right: "30.5%", zIndex: 100 }}>
          <HotelPin price="£285" />
        </div>
      </div>

      {/* Bottom gradient — .down-gradient */}
      <div
        style={{
          zIndex: 100,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, #ffffff)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

// Tablet Hero
function HeroTablet() {
  return (
    <section className="hidden md:block lg:hidden relative overflow-hidden">
      <div className="relative w-full">
        <img
          src="/clone-assets/hero-tablet.avif"
          alt=""
          style={{ width: "100%", objectFit: "cover" }}
          loading="eager"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, #ffffff)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 32px",
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "black", fontWeight: 500, marginBottom: 16, opacity: 0.6 }}>
            Discover your next
          </p>
          <h1
            style={{
              textAlign: "center",
              fontWeight: 900,
              lineHeight: 1,
              color: "black",
              fontSize: "clamp(56px, 9vw, 100px)",
            }}
          >
            perfect stay
          </h1>
        </div>
        {/* Tablet pins */}
        <div style={{ position: "absolute", zIndex: 10, bottom: "50%", left: "22%" }}>
          <HotelPin price="£349" />
        </div>
        <div style={{ position: "absolute", zIndex: 10, bottom: "42%", right: "22%" }}>
          <HotelPin price="£335" />
        </div>
        <div style={{ position: "absolute", zIndex: 10, bottom: "28%", right: "15%" }}>
          <HotelPin price="£120" />
        </div>
        <div style={{ position: "absolute", zIndex: 10, pointerEvents: "none", bottom: "35%", left: "40%" }}>
          <StadiumPin />
        </div>
      </div>
    </section>
  );
}

// Mobile Hero
function HeroMobile() {
  return (
    <section className="block md:hidden relative overflow-hidden" style={{ minHeight: "80vh" }}>
      <img
        src="/clone-assets/hero-mobile-city.avif"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        loading="eager"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 30%, #ffffff)",
        }}
      />
      {/* Mobile pins */}
      <div style={{ position: "absolute", zIndex: 10, top: "28%", left: "8%" }}>
        <HotelPin price="£285" />
      </div>
      <div style={{ position: "absolute", zIndex: 10, top: "38%", right: "8%" }}>
        <HotelPin price="£335" />
      </div>
      <div style={{ position: "absolute", zIndex: 10, top: "50%", left: "22%" }}>
        <HotelPin price="£120" />
      </div>
      {/* Mobile heading — bottom of section */}
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, padding: "0 24px", zIndex: 10 }}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "black", fontWeight: 500, marginBottom: 16, opacity: 0.6 }}>
          Discover your next
        </p>
        <div style={{ overflow: "hidden" }}>
          <h1 style={{ fontWeight: 900, lineHeight: 1, color: "black", fontSize: 72, margin: 0 }}>perfect</h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <h1 style={{ fontWeight: 900, lineHeight: 1, color: "black", fontSize: 72, margin: 0 }}>stay</h1>
        </div>
      </div>
    </section>
  );
}

export function Hero({ sectionRef }: HeroProps) {
  return (
    <>
      {/* sectionRef forwarded to desktop section — usePhoneScroll measures it from Deals */}
      <HeroDesktop sectionRef={sectionRef} />
      <HeroTablet />
      <HeroMobile />
    </>
  );
}
