// Storefront Home Page — Phase 5.3 → migrado al engine centralizado
// Server Component: renders the live merchant store home page.
//
// Data flow:
//   - getStoreBySlug → template_id → getTemplateConfig + getTemplateSchema
//   - resolveTemplateConfig → ResolvedStoreConfig (merge defaults + customization)
//   - getTemplateManifest → TemplateManifest con variantes de slots
//   - getStorefrontProducts/Categories/BestSellers/DiscountProducts → real Supabase data
//   - TemplateLayout (_core) → frame orquestador que resuelve ruta y monta shells
//
// SEO: generateMetadata lee la tienda desde Supabase para generar <title> y OG tags.
//      React cache() en getStoreBySlug deduplica el fetch con el del layout.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreBySlug, appearanceToCustomization } from "@/catalog/getStoreBySlug";
import { resolveTemplateConfig } from "@/catalog/resolveTemplateConfig";
import { extractMediaTokens, resolveMediaUrlsForStorefront } from "@/catalog/resolveMediaUrlsForStorefront";
import type { StoreCustomization } from "@/types/templates";
import { getTemplateConfig, getTemplateSchema } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { getTemplateManifest } from "@/templates/manifest-resolver";
import { getStorefrontProducts, getStorefrontCategories, getStorefrontBestSellers, getStorefrontPopularProducts, getStorefrontDiscountProducts } from "@/catalog/getStorefrontData";
import { safeJsonLdStringify } from "@/shared/seo/safe-json-ld";

// ── Config ────────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiendri.com";

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
  const metaCustomization: StoreCustomization | undefined =
    appearanceToCustomization(store.store_appearance, effectiveTemplateId) ??
    (store.customization as StoreCustomization | undefined);
  const metaMediaTokens = metaCustomization
    ? extractMediaTokens(metaCustomization)
    : [];
  const metaUrlMap = metaMediaTokens.length > 0
    ? await resolveMediaUrlsForStorefront(store.id, metaMediaTokens)
    : new Map<string, string>();
  const resolvedConfig = resolveTemplateConfig(
    templateDefaults,
    metaCustomization,
    templateSchema ?? undefined,
    metaUrlMap,
  );
  const storeName = resolvedConfig.branding?.storeName ?? store.name;
  const description =
    resolvedConfig.branding?.description ?? store.description ?? undefined;
  const logo = resolvedConfig.branding?.logo ?? undefined;

  return {
    title: `${storeName} | Tiendri`,
    description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
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
    url: `${SITE_URL}/${slug}`,
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
  const pageCustomization: StoreCustomization | undefined =
    appearanceToCustomization(store.store_appearance, effectiveTemplateId) ??
    (store.customization as StoreCustomization | undefined);
  const pageMediaTokens = pageCustomization
    ? extractMediaTokens(pageCustomization)
    : [];
  const pageUrlMap = pageMediaTokens.length > 0
    ? await resolveMediaUrlsForStorefront(store.id, pageMediaTokens)
    : new Map<string, string>();
  const resolvedConfig = resolveTemplateConfig(
    templateDefaults,
    pageCustomization,
    templateSchema ?? undefined,
    pageUrlMap,
  );

  const storeName = resolvedConfig.branding?.storeName ?? store.name ?? slug;
  const description = resolvedConfig.branding?.description ?? store.description ?? undefined;
  const logo = resolvedConfig.branding?.logo ?? undefined;
  const whatsapp = resolvedConfig.branding?.whatsapp ?? undefined;
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

  // Cargar manifiesto y datos reales desde Supabase para el engine centralizado.
  // TemplateLayout es el frame orquestador del _core — resuelve variantes de
  // slots (header/footer/bottomNav) y monta el shell correcto según la ruta.
  const manifest = getTemplateManifest(effectiveTemplateId, resolvedConfig);

  const [products, categories, bestSellerProducts, featuredProducts, discountProducts] = await Promise.all([
    getStorefrontProducts(store.id),
    getStorefrontCategories(store.id),
    getStorefrontBestSellers(store.id),
    getStorefrontPopularProducts(store.id),
    getStorefrontDiscountProducts(store.id),
  ]);

  const bestSellers = bestSellerProducts.map((p) => ({
    productId: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    rating: p.rating ?? 0,
    imageUrl: p.images[0]?.url ?? null,
  }));

  const storeInfo = {
    name: storeName,
    slug,
    logo: logo ?? null,
    description,
    whatsapp,
    hours,
    paymentMethods,
    social_links: resolvedConfig.branding?.socialLinks
      ? {
          instagram: resolvedConfig.branding.socialLinks.instagram,
          facebook: resolvedConfig.branding.socialLinks.facebook,
          tiktok: resolvedConfig.branding.socialLinks.tiktok,
          twitter: resolvedConfig.branding.socialLinks.twitter,
          youtube: resolvedConfig.branding.socialLinks.youtube,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <TemplateLayout
        store={storeInfo}
        products={products}
        categories={categories}
        bestSellers={bestSellers}
        featuredProducts={featuredProducts}
        discountProducts={discountProducts}
        config={resolvedConfig}
        manifest={manifest}
      />
    </>
  );
}
