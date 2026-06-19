// Storefront Home Page — Phase 5.3 → migrado al engine centralizado
// Server Component: renders the live merchant store home page.
//
// Data flow:
//   - getStoreBySlug → template_id → getTemplateConfig + getTemplateSchema
//   - resolveTemplateConfig → ResolvedStoreConfig (merge defaults + customization)
//   - getTemplateManifest → TemplateManifest con variantes de slots
//   - getTemplateMockData → StoreInfo + StorefrontProduct[] + Category[] (Phase 7+: Supabase)
//   - TemplateLayout (_core) → frame orquestador que resuelve ruta y monta shells
//
// SEO: generateMetadata lee la tienda desde Supabase para generar <title> y OG tags.
//      React cache() en getStoreBySlug deduplica el fetch con el del layout.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/catalog/getStoreBySlug";
import { resolveTemplateConfig } from "@/catalog/resolveTemplateConfig";
import { getTemplateConfig, getTemplateSchema } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { getTemplateManifest } from "@/templates/manifest-resolver";
import { getTemplateMockData } from "@/templates/mock-loader";
import { safeJsonLdStringify } from "@/shared/seo/safe-json-ld";

// ── Types ─────────────────────────────────────────────────────────────────────

interface StorefrontPageProps {
  params: Promise<{ slug: string }>;
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: StorefrontPageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    return {
      title: "Tienda no encontrada | Tiendri",
    };
  }

  // Resolve branding for SEO — use the store's actual template_id
  const effectiveTemplateId = store.template_id ?? "tech-premium";
  const [templateDefaults, templateSchema] = await Promise.all([
    getTemplateConfig(effectiveTemplateId),
    getTemplateSchema(effectiveTemplateId),
  ]);
  const resolvedConfig = resolveTemplateConfig(
    templateDefaults,
    store.customization ?? undefined,
    templateSchema ?? undefined,
  );
  const storeName = resolvedConfig.branding?.storeName ?? store.name;
  const description =
    resolvedConfig.branding?.description ?? store.description ?? undefined;
  const logo = resolvedConfig.branding?.logo ?? undefined;

  return {
    title: `${storeName} | Tiendri`,
    description,
    alternates: { canonical: `https://tiendri.com/${slug}` },
    openGraph: {
      title: storeName,
      description,
      images: [{ url: logo ?? "/og-default.png", width: 1200, height: 630 }],
      siteName: "Tiendri",
      type: "website",
    },
  };
}

// ── JSON-LD builder ───────────────────────────────────────────────────────────

function buildLocalBusinessJsonLd(
  slug: string,
  storeName: string,
  description: string | undefined,
  logo: string | undefined,
  city: string | undefined,
  address: string | undefined,
  hours: string | undefined,
  paymentMethods: string[] | undefined,
  whatsapp: string | undefined
): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: storeName,
    url: `https://tiendri.com/${slug}`,
  };

  if (description) jsonLd.description = description;
  if (logo) jsonLd.logo = logo;
  if (address) jsonLd.address = address;
  if (city) jsonLd.addressLocality = city;
  if (hours) jsonLd.openingHours = hours;

  if (whatsapp) {
    jsonLd.telephone = `+${whatsapp}`;
    jsonLd.sameAs = [`https://wa.me/${whatsapp}`];
  }

  if (paymentMethods && paymentMethods.length > 0) {
    jsonLd.paymentAccepted = paymentMethods.join(", ");
  }

  return jsonLd;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function StorefrontPage({ params }: StorefrontPageProps) {
  const { slug } = await params;

  // Validate store existence (layout already does this, but Next.js renders
  // page independently so we guard here too).
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  // Resolve branding and business data for JSON-LD — use the store's actual template_id.
  // Note: React cache() in getStoreBySlug deduplicates the Supabase fetch, and
  // Next.js deduplicates the dynamic imports in getTemplateConfig/getTemplateSchema.
  const effectiveTemplateId = store.template_id ?? "tech-premium";
  const [templateDefaults, templateSchema] = await Promise.all([
    getTemplateConfig(effectiveTemplateId),
    getTemplateSchema(effectiveTemplateId),
  ]);
  const resolvedConfig = resolveTemplateConfig(
    templateDefaults,
    store.customization ?? undefined,
    templateSchema ?? undefined,
  );

  const storeName = resolvedConfig.branding?.storeName ?? store.name ?? slug;
  const description = resolvedConfig.branding?.description ?? store.description ?? undefined;
  const logo = resolvedConfig.branding?.logo ?? undefined;
  const whatsapp = resolvedConfig.branding?.whatsapp ?? store.whatsapp ?? undefined;
  const city = resolvedConfig.business?.city ?? undefined;
  const address = resolvedConfig.business?.address ?? undefined;
  const hours = resolvedConfig.business?.hours ?? undefined;
  const paymentMethods = resolvedConfig.business?.paymentMethods ?? undefined;

  const jsonLd = buildLocalBusinessJsonLd(
    slug,
    storeName,
    description,
    logo,
    city,
    address,
    hours,
    paymentMethods,
    whatsapp
  );

  // Cargar manifiesto y datos mock para el engine centralizado.
  // TemplateLayout es el frame orquestador del _core — resuelve variantes de
  // slots (header/footer/bottomNav) y monta el shell correcto según la ruta.
  // Los datos reales desde Supabase reemplazarán mockData en Phase 7+.
  const manifest = getTemplateManifest(effectiveTemplateId, resolvedConfig);
  const mockData = await getTemplateMockData(effectiveTemplateId);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <TemplateLayout
        store={mockData.store}
        products={mockData.products}
        categories={mockData.categories}
        config={resolvedConfig}
        manifest={manifest}
      />
    </>
  );
}
