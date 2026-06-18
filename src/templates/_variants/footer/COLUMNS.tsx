// Footer variant: COLUMNS
// Extracted from tech-premium Footer.
// Dark background, 3-column layout: logo+description, services, assistance.
// Social icons + "Creado con Tiendri" attribution row.
// Mobile: single column, centered.

import { memo } from "react";
import type { FooterSlotProps } from "./types";

const ColumnsFooter = memo(function ColumnsFooter({
  store,
  services = [],
  assistance = [],
}: FooterSlotProps) {
  return (
    <footer className="bg-[var(--t-footer-bg)] text-[var(--t-on-primary)] px-6 py-12 pb-24 lg:px-[160px] lg:py-[104px] lg:pb-[104px]">
      <div className="flex flex-col items-center lg:items-start gap-8 lg:gap-6">
        {/* Top section: Logo + nav columns */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-10 lg:gap-0">
          {/* Logo + description */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <span
              className="text-[22px] font-bold italic lowercase tracking-tight"
              aria-label={store.name}
            >
              {store.name.toLowerCase()}
            </span>
            {store.description && (
              <p className="text-[var(--t-muted)] text-sm font-medium leading-relaxed max-w-[384px] text-center lg:text-left">
                {store.description}
              </p>
            )}
          </div>

          {/* Footer navigation columns */}
          <div className="flex flex-col sm:flex-row gap-10 lg:gap-16 text-center lg:text-left">
            {/* Services */}
            {services.length > 0 && (
              <nav aria-label="Servicios">
                <h3 className="text-base font-semibold leading-4 mb-4">Servicios</h3>
                <ul className="flex flex-col gap-2 list-none m-0 p-0">
                  {services.map((item) => (
                    <li key={item}>
                      <span className="text-[var(--t-muted)] text-sm font-normal leading-8 cursor-pointer hover:text-[var(--t-on-primary)] transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Assistance */}
            {assistance.length > 0 && (
              <nav aria-label="Asistencia al comprador">
                <h3 className="text-base font-semibold leading-4 mb-4">
                  Asistencia al comprador
                </h3>
                <ul className="flex flex-col gap-2 list-none m-0 p-0">
                  {assistance.map((item) => (
                    <li key={item}>
                      <span className="text-[var(--t-muted)] text-sm font-normal leading-8 cursor-pointer hover:text-[var(--t-on-primary)] transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        {/* Social icons + Tiendri attribution */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-4">
          <div className="flex items-center gap-6 lg:gap-4">
            {store.social_links?.twitter && (
              <a
                href={store.social_links.twitter}
                className="text-[var(--t-on-primary)] hover:text-[var(--t-on-primary)]/70 transition-colors"
                aria-label="Seguinos en Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg>
              </a>
            )}
            {store.social_links?.facebook && (
              <a
                href={store.social_links.facebook}
                className="text-[var(--t-on-primary)] hover:text-[var(--t-on-primary)]/70 transition-colors"
                aria-label="Seguinos en Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a8 8 0 1 0-9.25 7.903v-5.59H4.719V8H6.75V6.237c0-2.005 1.194-3.112 3.022-3.112.875 0 1.79.156 1.79.156V5.25h-1.008c-.994 0-1.304.617-1.304 1.25V8h2.219l-.355 2.313H9.25v5.59A8.002 8.002 0 0 0 16 8Z" />
                </svg>
              </a>
            )}
            {store.social_links?.tiktok && (
              <a
                href={store.social_links.tiktok}
                className="text-[var(--t-on-primary)] hover:text-[var(--t-on-primary)]/70 transition-colors"
                aria-label="Seguinos en TikTok"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M11.335 0h-2.27v10.957c0 1.305-.977 2.384-2.219 2.384-1.242 0-2.218-1.08-2.218-2.384 0-1.28.952-2.334 2.17-2.384V6.26C4.158 6.31 2 8.538 2 11.28 2 14.046 4.207 16 6.87 16c2.664 0 4.735-2.13 4.735-4.72V5.44a6.728 6.728 0 0 0 3.395.923V4.05c-1.92-.2-3.665-1.552-3.665-4.05Z" />
                </svg>
              </a>
            )}
            {store.social_links?.instagram && (
              <a
                href={store.social_links.instagram}
                className="text-[var(--t-on-primary)] hover:text-[var(--t-on-primary)]/70 transition-colors"
                aria-label="Seguinos en Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0Zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002Zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92Zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217Zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334Z" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-xs text-[var(--t-muted)]">
            Creado con{" "}
            <a
              href="https://tiendri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold no-underline"
              style={{ color: "var(--t-on-primary)" }}
            >
              Tiendri
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});

export default ColumnsFooter;
