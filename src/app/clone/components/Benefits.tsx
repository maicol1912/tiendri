// Benefits Section — "Deals to make your eyes water"
// Static visual component. Parallax on widget overlays documented in ANIMATIONS.md.

export function Benefits() {
  return (
    <section className="bg-white pt-20 pb-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* Section heading */}
        <div className="mb-20">
          <h2
            className="hidden lg:block font-black leading-tight text-black"
            style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
          >
            Deals to make<br />your eyes water
          </h2>
          <h2
            className="block lg:hidden font-black leading-tight text-black"
            style={{ fontSize: "clamp(36px, 8vw, 60px)" }}
          >
            Deals to make your eyes water
          </h2>
        </div>

        {/* Grid Set 1 — Event exclusives: image LEFT, text RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-4 lg:-mb-16 items-center">
          {/* Image cluster */}
          <div className="relative" style={{ transform: "scale(0.7)", transformOrigin: "top left", marginBottom: "-30%" }}>
            <div className="relative flex gap-4">
              {/* Side column */}
              <div className="w-1/3 flex-shrink-0">
                <img
                  src="/clone-assets/benf-col-3.avif"
                  alt=""
                  className="w-full rounded-2xl object-cover"
                />
              </div>
              {/* Main cell */}
              <div className="flex-1 relative">
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
            <h3 className="font-black text-black" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Event exclusives
            </h3>
            <p className="text-neutral-500 text-base leading-relaxed hidden lg:block">
              VIP benefits only available with EventBeds&#8482;
            </p>
          </div>
        </div>

        {/* Grid Set 2 — Brand discounts: text LEFT, image RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3 className="font-black text-black" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Brand discounts
            </h3>
            <p className="text-neutral-500 text-base leading-relaxed">
              Unlock secret prices at your favourite brands with powerful discounts
            </p>
          </div>

          {/* Image cluster */}
          <div
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
            <h3 className="font-black text-black" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              Referral scheme
            </h3>
            <p className="text-neutral-500 text-base leading-relaxed">
              Send your exclusive discounts to other event attendees. Share the love ♥
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
