// Generic Template Layout
// Wraps ALL sub-routes under /template/[templateName]/ with:
//  - CartProvider (template-specific, cart state persists across page navigations)
//  - CSS variable injection (.template-scope div, data-driven via buildCssVars)
//  - Theme customizer (floating button + drawer)
//
// Server component — reads templateName from params, validates it,
// then delegates UI to TemplateLayoutClient (client component).
//
// Supported templates: tech-premium, fashion
// To add a new template: add it to LAYOUT_SUPPORTED_TEMPLATES and
// add its config/palettes to TEMPLATE_UI_CONFIGS in TemplateLayoutClient.tsx.

import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { TemplateLayoutClient } from "./TemplateLayoutClient";
import { mockStore as techPremiumMockStore } from "@/templates/tech-premium/mock/data";
import { mockStore as fashionMockStore } from "@/templates/fashion/mock/data";
import { mockStore as petsModernMockStore } from "@/templates/pets-modern/mock/data";
import { mockStore as electronicsClassicMockStore } from "@/templates/electronics-classic/mock/data";
import { mockStore as furnitureDarkMockStore } from "@/templates/furniture-dark/mock/data";
import { mockStore as beautySoftMockStore } from "@/templates/beauty-soft/mock/data";
import { mockStore as beautyElegantMockStore } from "@/templates/beauty-elegant/mock/data";
import { mockStore as decorWarmMockStore } from "@/templates/decor-warm/mock/data";

// Templates that use the full TemplateLayoutClient layout (CSS vars + customizer + cart).
// Templates NOT in this set get a transparent wrapper — they manage their own providers.
const LAYOUT_SUPPORTED_TEMPLATES = new Set(["tech-premium", "fashion", "pets-modern", "electronics-classic", "furniture-dark", "beauty-soft", "beauty-elegant", "decor-warm"]);

interface TemplateLayoutProps {
  children: React.ReactNode;
  params: Promise<{ templateName: string }>;
}

function getStoreSlug(templateName: string): string {
  if (templateName === "fashion") return fashionMockStore.slug;
  if (templateName === "pets-modern") return petsModernMockStore.slug;
  if (templateName === "electronics-classic") return electronicsClassicMockStore.slug;
  if (templateName === "furniture-dark") return furnitureDarkMockStore.slug;
  if (templateName === "beauty-soft") return beautySoftMockStore.slug;
  if (templateName === "beauty-elegant") return beautyElegantMockStore.slug;
  if (templateName === "decor-warm") return decorWarmMockStore.slug;
  return techPremiumMockStore.slug;
}

export default async function TemplateLayout({
  children,
  params,
}: TemplateLayoutProps) {
  const { templateName } = await params;

  if (!(templateName in templateRegistry)) {
    notFound();
  }

  // Templates not yet migrated to the sub-route architecture get a transparent wrapper.
  // Their shell components include their own CartProvider + CSS var injection.
  if (!LAYOUT_SUPPORTED_TEMPLATES.has(templateName)) {
    return <>{children}</>;
  }

  return (
    <TemplateLayoutClient
      storeSlug={getStoreSlug(templateName)}
      templateName={templateName}
    >
      {children}
    </TemplateLayoutClient>
  );
}
