'use client';

import { useRef, useState } from 'react';
import { useNavbarScroll } from '../hooks/useScrollAnimation';

// Navbar — scroll hide on down / show on up + mobile menu toggle
//
// EXACT CSS from Webflow:
//   .navbar: background-color:#171717; border-radius:12px; width:95%; height:auto;
//            margin:auto; padding:8px 8px 8px 20px; position:fixed; inset:16px 0% auto;
//            transition: all 0.4s
//   .navbar.change: background-color:#f2f3f3; border:1px solid #dadbdb
//
// The navbar starts as dark pill (default), switches to light on scroll (via .change class).
// In our static version we keep it as .change (light) since Webflow JS applies .change dynamically.

const NavArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M15.0004 6.03551H0.999643" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.1211 1.08594L15.0008 6.03498L10.1211 10.9854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EventBedsWordmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="30" viewBox="0 0 755 144" fill="none">
    <g clipPath="url(#eb-nav-logo)">
      <path d="M734.07 29.5585H737.119V38.095H739.383V29.5585H742.447V27.6299H734.07V29.5585Z" fill="currentColor"/>
      <path d="M743.348 38.095H745.507V31.0834L748.254 38.095H750.095L752.842 31.0834V38.095H755V27.6299H752.087L749.25 35.3143L746.322 27.6299H743.348V38.095Z" fill="currentColor"/>
      <path d="M227.917 106.118C244.13 106.118 254.663 96.6618 256.556 84.8413H240.107C238.686 90.5152 233.953 93.4703 227.207 93.4703C218.805 93.4703 213.243 88.2693 212.888 79.6403V78.8129H257.029C257.384 76.9216 257.503 74.9121 257.503 73.1391C257.266 55.2901 244.959 43.9424 226.734 43.9424C207.918 43.9424 195.492 56.2357 195.492 75.1485C195.492 93.9431 207.681 106.118 227.917 106.118ZM213.243 67.938C214.19 60.7275 219.633 56.3539 226.852 56.3539C234.426 56.3539 239.515 60.4911 240.698 67.938H213.243Z" fill="currentColor"/>
      <path d="M273.791 105.409H294.501L316.394 44.6514H298.88L284.442 88.3872L269.768 44.6514H251.898L273.791 105.409Z" fill="currentColor"/>
      <path d="M343.207 106.118C359.42 106.118 369.952 96.6618 371.846 84.8413H355.396C353.976 90.5152 349.242 93.4703 342.497 93.4703C334.095 93.4703 328.533 88.2693 328.178 79.6403V78.8129H372.319C372.674 76.9216 372.792 74.9121 372.792 73.1391C372.556 55.2901 360.248 43.9424 342.024 43.9424C323.207 43.9424 310.781 56.2357 310.781 75.1485C310.781 93.9431 322.971 106.118 343.207 106.118ZM328.533 67.938C329.479 60.7275 334.923 56.3539 342.142 56.3539C349.716 56.3539 354.804 60.4911 355.988 67.938H328.533Z" fill="currentColor"/>
      <path d="M410.905 43.9424C401.556 43.9424 395.994 47.4886 392.089 52.2168L390.55 44.6517H375.994V105.409H392.68V74.3211C392.68 63.8009 397.651 57.6542 406.289 57.6542C414.692 57.6542 418.597 63.0916 418.597 73.3755V105.409H435.283V71.7206C435.283 50.9165 424.041 43.9424 410.905 43.9424Z" fill="currentColor"/>
      <path d="M444.26 88.0327C444.26 99.6168 450.058 105.409 461.656 105.409H475.265V91.3424H466.981C462.603 91.3424 460.946 89.5694 460.946 85.314V58.7178H474.91V44.6515H460.946V27.6299H444.26V44.6515H434.201V58.7178H444.26V88.0327Z" fill="currentColor"/>
      <path d="M512.099 43.9423C503.697 43.9423 497.78 47.4885 493.756 52.3349V27.8369H477.07V105.409H491.626L493.283 97.1346C497.188 102.335 503.223 106.118 511.98 106.118C528.43 106.118 540.264 93.7066 540.264 74.912C540.264 55.6446 528.43 43.9423 512.099 43.9423ZM508.312 92.5246C499.2 92.5246 493.519 85.3141 493.519 74.912C493.519 64.6282 499.2 57.5359 508.312 57.5359C517.424 57.5359 523.341 64.6282 523.341 75.0302C523.341 85.4323 517.424 92.5246 508.312 92.5246Z" fill="currentColor"/>
      <path d="M573.674 106.118C589.886 106.118 600.419 96.6618 602.312 84.8413H585.863C584.443 90.5152 579.709 93.4703 572.963 93.4703C564.561 93.4703 558.999 88.2693 558.644 79.6403V78.8129H602.786C603.141 76.9216 603.259 74.9121 603.259 73.1391C603.022 55.2901 590.715 43.9424 572.49 43.9424C553.674 43.9424 541.248 56.2357 541.248 75.1485C541.248 93.9431 553.437 106.118 573.674 106.118ZM558.999 67.938C559.946 60.7275 565.39 56.3539 572.608 56.3539C580.182 56.3539 585.271 60.4911 586.454 67.938H558.999Z" fill="currentColor"/>
      <path d="M650.602 52.2167C646.697 47.2521 640.661 43.9423 632.259 43.9423C616.046 43.9423 604.094 56.1174 604.094 74.912C604.094 94.1794 616.046 106.118 632.377 106.118C641.135 106.118 647.052 102.217 651.075 97.0164L652.732 105.409H667.288V27.8369H650.602V52.2167ZM636.046 92.5246C626.934 92.5246 621.135 85.4323 621.135 75.0302C621.135 64.6282 626.934 57.5359 636.046 57.5359C645.158 57.5359 650.839 64.7464 650.839 75.1484C650.839 85.4323 645.158 92.5246 636.046 92.5246Z" fill="currentColor"/>
      <path d="M670.164 85.1954C670.874 98.1979 682.354 106.118 699.276 106.118C715.608 106.118 726.968 98.4343 726.968 86.3774C726.968 72.6656 715.371 69.4741 701.407 68.0556C692.649 66.9918 687.442 66.519 687.442 61.909C687.442 58.0082 691.703 55.6441 698.211 55.6441C704.957 55.6441 709.572 58.5992 710.046 63.4456H726.022C725.193 51.0341 713.951 43.8236 697.62 43.8236C681.999 43.7054 671.466 51.6252 671.466 63.6821C671.466 76.2118 682.472 79.4033 696.673 81.0582C706.495 82.3584 710.637 82.7131 710.637 87.6777C710.637 91.933 706.377 94.1789 699.395 94.1789C691.229 94.1789 686.614 90.5146 686.022 85.1954H670.164Z" fill="currentColor"/>
      <path d="M71.6847 0.157227C32.098 0.157227 0 32.2552 0 71.8419V143.515H71.6847C91.4837 143.515 109.402 135.491 122.362 122.519C135.333 109.559 143.358 91.641 143.358 71.8419C143.358 32.2552 111.271 0.157227 71.6847 0.157227ZM110.417 109.696L109.242 116.695C99.1549 125.016 86.1492 130.054 71.9582 130.019C48.1013 129.974 25.2817 115.692 16.4707 89.7602L64.2985 83.4683L107.852 104.533C109.733 105.547 110.77 107.61 110.417 109.696ZM119.638 105.49C119.638 105.49 119.832 103.245 119.934 102.116C120.094 100.27 119.056 98.5256 117.335 97.7391L73.2576 78.0427L88.1326 66.2795C89.5574 64.6951 91.7801 64.0568 93.8432 64.6381C104.66 67.6929 115.466 70.7477 126.272 73.8024C128.472 74.4179 130.022 76.6863 129.794 78.9203C128.745 88.3582 125.428 97.1122 119.638 105.49Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="eb-nav-logo">
        <rect width="755" height="144" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const navLinks = [
  { label: "For business", href: "/for-business" },
  { label: "For Venues", href: "/venues" },
  { label: "Partner API", href: "/partner-api" },
  { label: "Knowledge Base", href: "/knowledge-base" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useNavbarScroll(navRef as React.RefObject<HTMLElement | null>);

  return (
    // .navbar — dark pill fixed at top:16px, 95% width, centered
    // On page it has .change class which makes it light (#f2f3f3 background)
    <nav
      ref={navRef}
      role="banner"
      aria-label="Main navigation"
      style={{
        position: "fixed",
        // inset: 16px 0% auto → top:16px, left:0, right:0, bottom:auto
        top: 16,
        left: 0,
        right: 0,
        zIndex: 9999,
        // .navbar.change = light version (default visible state when on the hero)
        backgroundColor: "#f2f3f3",
        border: "1px solid #dadbdb",
        borderRadius: 12,
        width: "95%",
        margin: "0 auto",
        padding: "8px 8px 8px 20px",
        transition: "all 0.4s, transform 0.4s ease-out",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* .container-full.nav-set — display:flex, justify-between, align-center */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <a href="/" aria-label="home" style={{ flexShrink: 0, color: "black", textDecoration: "none" }}>
          <EventBedsWordmark />
        </a>

        {/* Desktop nav links — hidden lg:flex */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 24 }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
                color: "black",
                textDecoration: "none",
                opacity: 0.8,
              }}
            >
              <span>{link.label}</span>
              <NavArrowIcon />
            </a>
          ))}
        </div>

        {/* Right: CTA button + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Desktop CTA button */}
          <a
            href="https://outlook.office365.com/owa/calendar/NuBreedHotels@nubreedhotels.com/bookings/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex"
            style={{
              alignItems: "center",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Book Demo
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-menu-open"
            className="flex lg:hidden"
            style={{
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              border: "1px solid #dadbdb",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 16 }}>
              <div
                style={{
                  height: 1,
                  backgroundColor: "black",
                  width: "100%",
                  transition: "transform 0.2s",
                  transform: menuOpen ? "rotate(45deg) translate(0, 3px)" : "none",
                }}
              />
              <div
                style={{
                  height: 1,
                  backgroundColor: "black",
                  width: "100%",
                  transition: "opacity 0.2s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div
          id="nav-menu-open"
          className="lg:hidden"
          style={{ padding: "16px 0 8px", display: "flex", flexDirection: "column", gap: 16 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                fontSize: 16,
                fontWeight: 500,
                color: "black",
                textDecoration: "none",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span>{link.label}</span>
              <NavArrowIcon />
            </a>
          ))}
          <a
            href="https://eventbeds.zendesk.com/hc/en-gb"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "12px 20px",
              marginTop: 8,
              backgroundColor: "black",
              color: "white",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Book Demo
          </a>
        </div>
      )}
    </nav>
  );
}
