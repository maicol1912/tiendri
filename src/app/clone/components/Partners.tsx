'use client';

// Partners Section — "Safe & secure payments" + "Members get much more" + Brand slider
// Brand card vertical scroll animations: CSS keyframe (brand-scroll-up / brand-scroll-down).

export interface PartnersProps {
  /** Called when user clicks "Sign up to our newsletter" — opens PopupModal in parent. */
  onOpenSignup?: () => void;
}

const paymentCards = [
  { src: "/clone-assets/pay-card-2.avif", alt: "Payment card" },
  { src: "/clone-assets/pay-card-1.avif", alt: "Payment card" },
  { src: "/clone-assets/pay-card-3.avif", alt: "Payment card" },
  { src: "/clone-assets/pay-card-6.avif", alt: "Payment card" },
  { src: "/clone-assets/pay-card-5.avif", alt: "Payment card" },
  { src: "/clone-assets/pay-card-4.avif", alt: "Payment card" },
];

// Brand card images — CDN-protected (403 on direct download).
// Using CDN URLs directly; Camilo can lazy-load these.
const leftBrandCards = [
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980095f3e55539a4efd58_brand-card-39.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980090b3cac46d7b24d5c_brand-card-37.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f9800937fbb26f5ed95afe_brand-card-38.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98008db0a47d27ac2e3c0_brand-card-36.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98008e7ed0c1f7dce67e2_brand-card-35.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980076a55e999d1e117c3_brand-card-34.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98007ae21e9483d6f6a13_brand-card-33.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98006e7ed0c1f7dce6639_brand-card-32.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980066a55e999d1e116be_brand-card-31.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f9800637fbb26f5ed95943_brand-card-30.jpg",
];

const rightBrandCards = [
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98002db0a47d27ac2dd3a_brand-card-19.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980020b3cac46d7b24832_brand-card-18.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98001ae21e9483d6f6393_brand-card-16.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f9800137fbb26f5ed954c9_brand-card-17.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f98001db0a47d27ac2dbfe_brand-card-12.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980006a55e999d1e1116b_brand-card-13.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f9800037fbb26f5ed953c1_brand-card-14.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f980000b3cac46d7b2476a_brand-card-15.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f97fff0b3cac46d7b246ba_brand-card-9.jpg",
  "https://cdn.prod.website-files.com/64d9d44b74f7cd98eec10d8d/64f97fffae21e9483d6f6187_brand-card-7.jpg",
];

const brandScrollUpStyle = `
  @keyframes brand-scroll-up {
    from { transform: translateY(0); }
    to { transform: translateY(-50%); }
  }
  @keyframes brand-scroll-down {
    from { transform: translateY(0); }
    to { transform: translateY(50%); }
  }
  .brand-col-up {
    animation: brand-scroll-up 40s linear infinite;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .brand-col-down {
    animation: brand-scroll-down 40s linear infinite;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

function BrandCard({ src }: { src: string }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#e8e8e8] flex-shrink-0">
      <img
        src={src}
        alt=""
        className="w-full object-contain"
        style={{ height: 100, padding: 15, boxSizing: "border-box" }}
      />
    </div>
  );
}

const BuildingIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="24" width="48" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <rect x="20" y="36" width="10" height="20" fill="currentColor"/>
    <rect x="34" y="36" width="10" height="12" fill="currentColor"/>
    <polygon points="4,26 32,6 60,26" fill="currentColor"/>
    <rect x="27" y="8" width="10" height="8" fill="currentColor"/>
  </svg>
);

export function Partners({ onOpenSignup }: PartnersProps) {
  const doubled = [...leftBrandCards, ...leftBrandCards];
  const doubledRight = [...rightBrandCards, ...rightBrandCards];

  return (
    <section className="bg-white py-20">
      <style>{brandScrollUpStyle}</style>

      {/* Two main cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1400px] mx-auto px-6 gap-5 mb-12">

        {/* Left card — Safe & secure payments (black) */}
        <div
          className="rounded-3xl overflow-hidden bg-black relative flex flex-col justify-between"
          style={{ minHeight: "60vh" }}
        >
          {/* Payment cards grid */}
          <div className="p-10 flex flex-col gap-4">
            <div className="flex gap-3">
              {paymentCards.slice(0, 3).map((c, i) => (
                <div key={i} className="flex-1 rounded-xl overflow-hidden">
                  <img src={c.src} alt={c.alt} className="w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {paymentCards.slice(3).map((c, i) => (
                <div key={i} className="flex-1 rounded-xl overflow-hidden">
                  <img src={c.src} alt={c.alt} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="px-10 pb-10">
            <h2
              className="text-white font-black leading-tight mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 60px)" }}
            >
              Safe &amp; secure <br />payments
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-sm">
              We're supported by stripe, our super-secure electronic payment partner and accept all major credit &amp; debit cards.
            </p>
          </div>
        </div>

        {/* Right card — Members get much more (black) */}
        <div
          className="rounded-3xl overflow-hidden bg-black relative flex flex-col"
          style={{ minHeight: "60vh" }}
        >
          {/* Text block */}
          <div className="px-10 pt-10 z-10 relative">
            <h2
              className="text-white font-black leading-tight mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 60px)" }}
            >
              Members get <br />much more
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-8">
              Join our members waiting list to get exclusive access to more deals, VIP benefits and inspiration than ever before.
            </p>
            {/* CTA button */}
            <button
              type="button"
              onClick={onOpenSignup}
              className="inline-flex items-center px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-100 transition-colors"
            >
              Sign up to our newsletter
            </button>
          </div>

          {/* Person image */}
          <div className="relative flex-1 mt-6">
            <img
              src="/clone-assets/black-card-person.avif"
              alt=""
              className="w-full object-cover object-top"
              style={{ transform: "scale(1.2)", transformOrigin: "bottom center" }}
            />
            {/* Floating widgets — fade in on scroll (Camilo) */}
            <div
              className="absolute right-0 top-1/4 flex flex-col gap-3 pr-4"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              <img src="/clone-assets/black-card-widget-1.avif" alt="" className="w-32 rounded-xl shadow-2xl" />
              <img src="/clone-assets/black-card-widget-2.avif" alt="" className="w-32 rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>

      </div>

      {/* Brand slider — "Our high-level partners" */}
      <div
        className="flex flex-col lg:flex-row bg-[#f5f5f5] rounded-3xl mx-auto py-16 px-10"
        style={{ maxWidth: 1300, height: 650, overflow: "hidden", position: "relative" }}
      >
        {/* Left: heading */}
        <div className="flex flex-col w-full lg:w-2/5 flex-shrink-0">
          <BuildingIcon />
          <h2
            className="font-black text-black leading-tight mt-10 mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            Our high-level partners
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed max-w-xs">
            We cooperate with top partners and provide access to over 1m properties in 180 countries.
          </p>
        </div>

        {/* Right: scrolling columns */}
        <div className="absolute right-10 top-0 bottom-0 flex gap-6 overflow-hidden" style={{ width: "50%" }}>
          {/* Left column scrolls UP */}
          <div className="flex-1 overflow-hidden">
            <div className="brand-col-up">
              {doubled.map((src, i) => (
                <BrandCard key={i} src={src} />
              ))}
            </div>
          </div>

          {/* Right column scrolls DOWN */}
          <div className="flex-1 overflow-hidden">
            <div className="brand-col-down">
              {doubledRight.map((src, i) => (
                <BrandCard key={i} src={src} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
