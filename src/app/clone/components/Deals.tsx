'use client';

import { useRef, type RefObject } from 'react';
import { usePhoneScroll } from '../hooks/usePhoneScroll';

// Deals Section — "The webs best hotel deals for events"
//
// EXACT layout from Webflow CSS (extracted from saved page):
//   .deals-sc: background-color:#f8f9f9; z-index:100; position:relative
//   .deals-s: grid-row-gap:60px; flex-direction:column; justify-content:center; align-items:center; padding-top:140px; padding-bottom:140px; display:flex
//   .phone-wrapper: z-index:10; justify-content:space-between; align-items:flex-start; width:100%; display:flex; position:relative
//   .left-column: padding-right:20px; position:relative
//   .right-column: padding-left:20px; position:relative
//   .text-pin-block: grid-row-gap:20px; flex-direction:column; align-items:flex-start; width:22ch; display:flex
//   .text-pin-block.right: padding-left:30px
//   .line-gradient-left: background-image:linear-gradient(#0000,#0000001f 50%,#0000); height:2px (HORIZONTAL line)
//   .line-gradient-left.left: margin-top:62px; margin-bottom:48px
//   .pin-image-block: width:22ch
//   .pin-image-block.right: padding-left:30px
//   .text-block: flex-direction:column; padding-left:60px; display:flex
//   ._1m-big: font-size:120px; font-weight:700; line-height:70px; position:relative; top:-7px
//   ._1m-small: color:gray; font-size:20px; line-height:20px (NO uppercase!)
//   ._1m-small.top: padding-left:24px
//   ._1m-small.down: margin-left:auto
//   .phone-area: justify-content:center; align-items:center; display:flex; position:absolute; inset:0%
//   .mobile-screens: height:600px; position:relative
//   .icon-scroller: background-color:#f5f5f5; border-radius:24px
//   .icon-wrapper: gap:28px; flex:none; width:1664px; display:flex

export interface DealsProps {
  heroRef: RefObject<HTMLElement | null>;
}

const hotelLogos = [
  { src: "/clone-assets/hotel-logo-1.avif", alt: "Hotel brand 1" },
  { src: "/clone-assets/hotel-logo-2.avif", alt: "Hotel brand 2" },
  { src: "/clone-assets/hotel-logo-3.avif", alt: "Hotel brand 3" },
  { src: "/clone-assets/hotel-logo-5.avif", alt: "Hotel brand 5" },
  { src: "/clone-assets/hotel-logo-4.avif", alt: "Hotel brand 4" },
  { src: "/clone-assets/hotel-logo-9.avif", alt: "Hotel brand 9" },
  { src: "/clone-assets/hotel-logo-6.avif", alt: "Hotel brand 6" },
  { src: "/clone-assets/hotel-logo-10.avif", alt: "Hotel brand 10" },
  { src: "/clone-assets/hotel-logo-7.avif", alt: "Hotel brand 7" },
];

const dealsCss = `
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .deals-icon-container {
    display: flex;
    flex: none;
    gap: 28px;
    animation: marquee-left 60s linear infinite;
  }
  .deals-icon-wrapper {
    display: flex;
    flex: none;
    gap: 28px;
    width: 1664px;
  }
  @media (prefers-reduced-motion: reduce) {
    .deals-icon-container { animation: none; }
  }
`;

function IconScroller() {
  return (
    // .icon-scroller: background-color:#f5f5f5; border-radius:24px
    // overflow:hidden + width:100% to contain the marquee
    <div
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: 24,
        overflow: "hidden",
        width: "100%",
      }}
      aria-hidden="true"
    >
      <style>{dealsCss}</style>
      {/* .icon-container: gap:28px; flex:none; width:6656px (= 4 × 1664); display:flex */}
      <div className="deals-icon-container">
        {/* First icon-wrapper set */}
        <div className="deals-icon-wrapper">
          {hotelLogos.map((logo, i) => (
            // .icon-frame: flex:none; width:160px
            <div key={`a-${i}`} style={{ flexShrink: 0, width: 160, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
        {/* Duplicate icon-wrapper for seamless loop */}
        <div className="deals-icon-wrapper">
          {hotelLogos.map((logo, i) => (
            <div key={`b-${i}`} style={{ flexShrink: 0, width: 160, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Deals({ heroRef }: DealsProps) {
  // phoneRef → .mobile-screens wrapper — gets the translateY(-140%) → 0 animation
  const phoneRef = useRef<HTMLDivElement>(null);
  usePhoneScroll(phoneRef, heroRef);

  return (
    // .deals-sc — background #f8f9f9, z-index 100, position relative
    <section
      style={{ backgroundColor: "#f8f9f9", position: "relative", zIndex: 100 }}
      aria-labelledby="deals-heading"
    >
      {/* .container-1280.deals-s
          container-1280: max-width:1280px; margin:auto; padding:0 40px; position:relative
          deals-s: grid-row-gap:60px; flex-direction:column; justify-content:center; align-items:center;
                   padding-top:140px; padding-bottom:140px; display:flex */}
      <div
        style={{
          maxWidth: 1280,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 140,
          paddingBottom: 140,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
          position: "relative",
        }}
      >

        {/* .head-block.deals — z-index:10; width:50ch; margin-bottom:20px; text-align:center */}
        <div style={{ zIndex: 10, width: "50ch", textAlign: "center", position: "relative" }}>
          {/* Desktop — .view-heading-block.deal-desktop */}
          <div className="hidden lg:block">
            <div style={{ overflow: "hidden" }}>
              <h2
                id="deals-heading"
                style={{
                  fontSize: 50,
                  fontWeight: 700,
                  lineHeight: "50px",
                  paddingBottom: 7,
                  color: "#000",
                  margin: 0,
                }}
              >
                The webs best hotel{" "}
              </h2>
            </div>
            <div style={{ overflow: "hidden" }}>
              <h2
                style={{
                  fontSize: 50,
                  fontWeight: 700,
                  lineHeight: "50px",
                  paddingBottom: 7,
                  color: "#000",
                  margin: 0,
                }}
              >
                deals for events
              </h2>
            </div>
          </div>
          {/* Mobile */}
          <div className="block lg:hidden">
            <h2
              aria-hidden="true"
              style={{
                fontSize: 36,
                fontWeight: 700,
                lineHeight: "40px",
                color: "#000",
                margin: 0,
              }}
            >
              The webs best hotel deals for events
            </h2>
          </div>
        </div>

        {/* .phone-wrapper — z-index:10; justify-content:space-between; align-items:flex-start; width:100%; display:flex; position:relative
            CRITICAL: .phone-area is position:absolute; inset:0% — centered in the wrapper
            Left and right columns define the visual width; phone floats absolutely centered.
            mobile-screens is height:600px, so wrapper needs at least that height. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            position: "relative",
            zIndex: 10,
            minHeight: 600,
          }}
        >

          {/* .left-column — padding-right:20px; position:relative
              DOM order (from original HTML):
              1. .text-pin-block (text)
              2. .line-gradient-left.left (horizontal gradient line)
              3. .pin-image-block (ONE group of 2 images) */}
          <div className="hidden lg:flex flex-col" style={{ paddingRight: 20, position: "relative" }}>

            {/* .text-pin-block — grid-row-gap:20px; flex-direction:column; align-items:flex-start; width:22ch; display:flex */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "22ch", gap: 20 }}>
              {/* .div-block-45 */}
              <div>
                {/* .body-m.mobile-set — font-size:20px; font-weight:400; line-height:24px */}
                <div style={{ fontSize: 20, fontWeight: 400, lineHeight: "24px", color: "#000" }}>
                  Search event-exclusive deals &amp; unlock secret prices
                </div>
              </div>
              {/* .pin-text-width.left — width:22ch */}
              <div style={{ width: "22ch" }}>
                {/* .body-s.grey — font-size:16px; font-weight:400; line-height:20px; color:gray */}
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: "20px", color: "gray" }}>
                  from your favourite hotel brands and apartments.
                </div>
              </div>
            </div>

            {/* .line-gradient-left.left — horizontal gradient; height:2px; margin-top:62px; margin-bottom:48px
                background-image:linear-gradient(#0000, #0000001f 50%, #0000) — fades center */}
            <div
              style={{
                backgroundImage: "linear-gradient(to right, #0000, #0000001f 50%, #0000)",
                height: 2,
                width: "22ch",
                marginTop: 62,
                marginBottom: 48,
              }}
            />

            {/* .pin-image-block — width:22ch — ONE group of 2 images */}
            <div style={{ width: "22ch", display: "flex", flexDirection: "column", gap: 0 }}>
              <img src="/clone-assets/pin-frame-1.avif" alt="" style={{ width: "100%", borderRadius: 12 }} />
              <img src="/clone-assets/pin-frame-2.avif" alt="" style={{ width: "100%", borderRadius: 12 }} />
            </div>

          </div>

          {/* .phone-area — position:absolute; inset:0%; display:flex; justify-content:center; align-items:center */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* .mobile-screens — height:600px; position:relative; will-change:transform */}
            <div
              ref={phoneRef}
              style={{
                height: 600,
                position: "relative",
                willChange: "transform",
                // Initial state: off-screen above — animation drives to 0%
                transform: "translate3d(0px, -140%, 0px)",
                width: 280,
              }}
              aria-label="EventBeds mobile app"
            >
              {/* .screen — position:absolute; inset:0; margin:4%; z-index:10; overflow:hidden */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "4%",
                  zIndex: 10,
                  overflow: "hidden",
                  clipPath: "polygon(90% 0, 96% 2%, 100% 5%, 100% 94%, 97% 98%, 90% 100%, 13% 100%, 3% 99%, 0 95%, 0 5%, 4% 2%, 11% 0)",
                }}
              >
                {/* Default: stadium image */}
                <img
                  src="/clone-assets/event-stadium.avif"
                  alt="Hotel search app interface"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* .mobile-frame — z-index:100; width:100%; height:100%; position:relative */}
              <img
                src="/clone-assets/mobile-frame.avif"
                alt=""
                aria-hidden="true"
                style={{
                  position: "relative",
                  zIndex: 100,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                loading="eager"
              />
            </div>
          </div>

          {/* .right-column — padding-left:20px; position:relative
              DOM order (from original HTML):
              1. .text-pin-block.right (text "Flexible rates..." + "over 1M properties")
              2. .pin-image-block.right (2 images — NO line divider here) */}
          <div
            className="hidden lg:flex flex-col"
            style={{ paddingLeft: 20, position: "relative" }}
          >

            {/* .text-pin-block.right — gap:20px; flex-direction:column; align-items:flex-start; width:22ch; padding-left:30px */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "22ch", gap: 20, paddingLeft: 30 }}>
              {/* .pin-text-width.right — width:20ch */}
              <div style={{ width: "20ch" }}>
                {/* .body-m._1m-set — font-size:20px; font-weight:400; line-height:24px */}
                <div style={{ fontSize: 20, fontWeight: 400, lineHeight: "24px", color: "#000" }}>
                  Flexible rates, massive savings and a choice of
                </div>
              </div>

              {/* .text-block — flex-direction:column; padding-left:60px; display:flex */}
              <div style={{ display: "flex", flexDirection: "column", paddingLeft: 60 }}>
                {/* ._1m-small.top — color:gray; font-size:20px; line-height:20px; padding-left:24px */}
                <span style={{ color: "gray", fontSize: 20, lineHeight: "20px", paddingLeft: 24 }}>over</span>
                {/* ._1m-big — font-size:120px; font-weight:700; line-height:70px; position:relative; top:-7px */}
                <span style={{ fontSize: 120, fontWeight: 700, lineHeight: "70px", position: "relative", top: -7, color: "#000" }}>1M</span>
                {/* ._1m-small.down — color:gray; font-size:20px; line-height:20px; margin-left:auto */}
                <span style={{ color: "gray", fontSize: 20, lineHeight: "20px", marginLeft: "auto" }}>properties</span>
              </div>
            </div>

            {/* .pin-image-block.right — width:22ch; padding-left:30px */}
            <div style={{ width: "22ch", paddingLeft: 30, display: "flex", flexDirection: "column", gap: 0 }}>
              <img src="/clone-assets/pin-frame-2.avif" alt="" style={{ width: "100%", borderRadius: 12 }} />
              <img src="/clone-assets/pin-frame-1.avif" alt="" style={{ width: "100%", borderRadius: 12 }} />
            </div>

          </div>

        </div>

        {/* .icon-scroller — logo marquee with rounded background */}
        <IconScroller />

      </div>
    </section>
  );
}
