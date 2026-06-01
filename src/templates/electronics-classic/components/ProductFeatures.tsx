// Electronics Classic — Product Features
// Description / Reviews tabs + about section + feature showcase.
// All colors via var(--t-*). ZERO hardcoded hex.
// Tab style follows layout?.tabStyle.

import Image from "next/image";
import type { ProductAbout, FeatureShowcase, ProductFeature } from "../types";
// Note: tabStyleClasses(style, isActive) returns a single className string.

type ActiveTab = "description" | "reviews";

interface ProductFeaturesProps {
  description?: string;
  keyFeatures: ProductFeature[];
  featuresDescription?: string;
  about: ProductAbout;
  showcase: FeatureShowcase;
  layout?: { tabStyle?: string };
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function ProductFeatures({
  description,
  keyFeatures,
  featuresDescription,
  about,
  showcase,
  layout,
  activeTab,
  onTabChange,
}: ProductFeaturesProps) {
  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "description", label: "Descripción" },
    { key: "reviews", label: "Reseñas" },
  ];

  const tabStyle = layout?.tabStyle ?? "underline";
  const tabList = tabStyle === "underline" ? "flex border-b border-[var(--t-surface)]" : "flex gap-2 flex-wrap";
  const tabItem = "py-2 px-4 text-sm font-medium transition-colors";

  return (
    <div className="flex flex-col gap-10">
      {/* Tab switcher */}
      <div>
        <div className={tabList} role="tablist" aria-label="Información del producto">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={activeTab === t.key}
              onClick={() => onTabChange(t.key)}
              className={tabItem}
              style={
                activeTab === t.key
                  ? {
                      color: "var(--t-primary)",
                      borderBottom: "2px solid var(--t-primary)",
                    }
                  : {
                      color: "var(--t-text-muted)",
                      borderBottom: "2px solid transparent",
                    }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          aria-label={activeTab === "description" ? "Descripción" : "Reseñas"}
          className="mt-6"
        >
          {activeTab === "description" ? (
            <div className="flex flex-col gap-4">
              {description && (
                <p className="text-[var(--t-text-secondary)] text-sm leading-relaxed">
                  {description}
                </p>
              )}
              {/* Key features list */}
              {keyFeatures.length > 0 && (
                <ul className="flex flex-col gap-3 mt-2">
                  {keyFeatures.map((feat) => (
                    <li key={feat.id} className="flex items-start gap-2 text-sm text-[var(--t-text-secondary)]">
                      <span
                        className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--t-primary)" }}
                        aria-hidden="true"
                      />
                      {feat.label}
                    </li>
                  ))}
                </ul>
              )}
              {featuresDescription && (
                <p className="text-[var(--t-text-muted)] text-xs italic mt-1">
                  {featuresDescription}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[var(--t-text-muted)] text-sm">
              Ir a la sección de reseñas abajo.
            </p>
          )}
        </div>
      </div>

      {/* About section */}
      <div
        className="rounded-[var(--t-radius-card)] overflow-hidden"
        style={{ backgroundColor: "var(--t-section-bg)" }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Text */}
          <div className="flex flex-col gap-3 p-6 md:p-8 justify-center">
            <h3 className="text-lg md:text-xl font-bold text-[var(--t-text-primary)]">
              {about.headline}
            </h3>
            <p className="text-[var(--t-text-secondary)] text-sm leading-relaxed">
              {about.description}
            </p>
            <div className="mt-2">
              <p className="font-semibold text-[var(--t-text-primary)] text-sm">
                {about.caption}
              </p>
              <p className="text-[var(--t-text-muted)] text-xs mt-1">
                {about.subcaption}
              </p>
            </div>
          </div>
          {/* Image */}
          <div className="relative w-full aspect-square">
            <Image
              src={about.image}
              alt={about.headline}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Feature showcase */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Image */}
        <div className="relative w-full aspect-square rounded-[var(--t-radius-card)] overflow-hidden" style={{ backgroundColor: "var(--t-surface)" }}>
          <Image
            src={showcase.image}
            alt={showcase.headline}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            loading="lazy"
          />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-3">
          <p className="text-[var(--t-primary)] text-xs font-semibold uppercase tracking-wider">
            {showcase.subtitle}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-[var(--t-text-primary)]">
            {showcase.headline}
          </h3>
          <p className="text-[var(--t-text-secondary)] text-sm leading-relaxed">
            {showcase.description}
          </p>
        </div>
      </div>
    </div>
  );
}
