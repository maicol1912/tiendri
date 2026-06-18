import { MessageCircle, Phone, Clock, CreditCard, Truck } from "lucide-react";
import type { StoreInfo } from "@/types/store";

interface StoreInfoPageProps {
  store: StoreInfo;
  header: React.ReactNode;
  onBack?: () => void;
}

function normalizeSocialUrl(value: string, baseUrl: string): string {
  if (value.startsWith("http")) return value;
  const handle = value.startsWith("@") ? value.slice(1) : value;
  return `${baseUrl}${handle}`;
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M12 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoreInfoPage({ store, header, onBack }: StoreInfoPageProps) {
  const whatsappHref = store.whatsapp
    ? `https://wa.me/${store.whatsapp.replace(/\D/g, "")}`
    : null;

  const instagramHandle = store.social_links?.instagram
    ? store.social_links.instagram.startsWith("http")
      ? store.social_links.instagram
        .replace("https://instagram.com/", "")
        .replace("https://www.instagram.com/", "")
      : store.social_links.instagram.replace(/^@/, "")
    : null;

  const instagramUrl = store.social_links?.instagram
    ? normalizeSocialUrl(store.social_links.instagram, "https://instagram.com/")
    : null;

  const facebookHandle = store.social_links?.facebook
    ? store.social_links.facebook.startsWith("http")
      ? store.social_links.facebook
        .replace("https://facebook.com/", "")
        .replace("https://www.facebook.com/", "")
      : store.social_links.facebook.replace(/^@/, "")
    : null;

  const facebookUrl = store.social_links?.facebook
    ? normalizeSocialUrl(store.social_links.facebook, "https://facebook.com/")
    : null;

  const tiktokHandle = store.social_links?.tiktok
    ? store.social_links.tiktok.startsWith("http")
      ? store.social_links.tiktok
        .replace("https://tiktok.com/@", "")
        .replace("https://www.tiktok.com/@", "")
      : store.social_links.tiktok.replace(/^@/, "")
    : null;

  const tiktokUrl = store.social_links?.tiktok
    ? normalizeSocialUrl(store.social_links.tiktok, "https://tiktok.com/@")
    : null;

  const hasSocial = !!(instagramUrl || facebookUrl || tiktokUrl);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      {header}

      {onBack && (
        <div className="max-w-2xl mx-auto px-5 pt-4">
          <button
            type="button"
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "var(--t-background)",
              border: "1px solid var(--t-border)",
              cursor: "pointer",
              color: "var(--t-foreground)",
            }}
            onClick={onBack}
            aria-label="Volver"
          >
            <BackIcon />
          </button>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-5 py-6 pb-[calc(80px+env(safe-area-inset-bottom,0px))] lg:pb-8 flex flex-col gap-6">
        <div
          className="flex flex-col items-center gap-4 py-10 rounded-[var(--t-radius-card)]"
          style={{ backgroundColor: "var(--t-background)" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "var(--t-primary)" }}
          >
            {store.logo ? (
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--t-on-primary)" }}
              >
                {store.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h1
            className="text-[22px] font-bold text-center leading-tight tracking-tight"
            style={{ color: "var(--t-foreground)" }}
          >
            {store.name}
          </h1>

          {store.description && (
            <p
              className="text-sm text-center max-w-xs leading-relaxed"
              style={{ color: "var(--t-muted)" }}
            >
              {store.description}
            </p>
          )}
        </div>

        {store.whatsapp && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Contacto
            </h2>

            <div
              className="flex flex-col divide-y overflow-hidden"
              style={{
                backgroundColor: "var(--t-background)",
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
              }}
            >
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-primary)" }}
                  >
                    <MessageCircle size={18} strokeWidth={1.75} style={{ color: "var(--t-on-primary)" }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>WhatsApp</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--t-foreground)" }}>
                      +{store.whatsapp}
                    </span>
                  </div>
                </a>
              )}

              <a
                href={`tel:+${store.whatsapp}`}
                className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-background)", border: "1px solid var(--t-border)" }}
                >
                  <Phone size={18} strokeWidth={1.75} style={{ color: "var(--t-foreground)" }} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs" style={{ color: "var(--t-muted)" }}>Teléfono</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--t-foreground)" }}>
                    +{store.whatsapp}
                  </span>
                </div>
              </a>
            </div>
          </section>
        )}

        {store.hours && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Horarios
            </h2>
            <div
              className="flex items-center gap-3 px-4 py-4 overflow-hidden"
              style={{
                backgroundColor: "var(--t-background)",
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                <Clock size={18} strokeWidth={1.75} style={{ color: "var(--t-on-primary)" }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t-foreground)" }}>
                {store.hours}
              </p>
            </div>
          </section>
        )}

        {store.paymentMethods && store.paymentMethods.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Métodos de pago
            </h2>
            <div
              className="px-4 py-4 overflow-hidden"
              style={{
                backgroundColor: "var(--t-background)",
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--t-primary)" }}
                >
                  <CreditCard size={18} strokeWidth={1.75} style={{ color: "var(--t-on-primary)" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--t-foreground)" }}>
                  Aceptamos
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {store.paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--t-background)",
                      color: "var(--t-foreground)",
                      border: "1px solid var(--t-border)",
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {store.shippingInfo && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Envío
            </h2>
            <div
              className="flex items-center gap-3 px-4 py-4 overflow-hidden"
              style={{
                backgroundColor: "var(--t-background)",
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                <Truck size={18} strokeWidth={1.75} style={{ color: "var(--t-on-primary)" }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t-foreground)" }}>
                {store.shippingInfo}
              </p>
            </div>
          </section>
        )}

        {hasSocial && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--t-muted)" }}
            >
              Redes sociales
            </h2>

            <div
              className="flex flex-col divide-y overflow-hidden"
              style={{
                backgroundColor: "var(--t-background)",
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
              }}
            >
              {instagramUrl && instagramHandle && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-background)", border: "1px solid var(--t-border)", color: "var(--t-muted)" }}
                  >
                    <InstagramIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>Instagram</span>
                    <span className="text-sm font-semibold truncate" style={{ color: "var(--t-foreground)" }}>
                      @{instagramHandle}
                    </span>
                  </div>
                </a>
              )}

              {facebookUrl && facebookHandle && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-background)", border: "1px solid var(--t-border)", color: "var(--t-muted)" }}
                  >
                    <FacebookIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>Facebook</span>
                    <span className="text-sm font-semibold truncate" style={{ color: "var(--t-foreground)" }}>
                      {facebookHandle}
                    </span>
                  </div>
                </a>
              )}

              {tiktokUrl && tiktokHandle && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--t-background)", border: "1px solid var(--t-border)", color: "var(--t-muted)" }}
                  >
                    <TikTokIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: "var(--t-muted)" }}>TikTok</span>
                    <span className="text-sm font-semibold truncate" style={{ color: "var(--t-foreground)" }}>
                      @{tiktokHandle}
                    </span>
                  </div>
                </a>
              )}
            </div>
          </section>
        )}

        {store.whatsapp && (
          <a
            href={whatsappHref ?? `https://wa.me/${store.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 text-center text-base font-semibold transition-opacity hover:opacity-90"
            style={{
              borderRadius: "var(--t-radius-button)",
              backgroundColor: "var(--t-primary)",
              color: "var(--t-on-primary)",
              display: "block",
            }}
          >
            Contactar por WhatsApp
          </a>
        )}
      </main>
    </div>
  );
}
