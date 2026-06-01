// Storefront Home Page — Phase 5.3
// Server Component: renders the live merchant store home page.
//
// Data flow:
//   - The parent layout.tsx (Server Component) fetches the store and resolves
//     the config, passing both to StorefrontConfigProvider (Client Component).
//   - This page renders StorefrontHomeShell (Client Component) which reads
//     config + store from the context via useStorefrontConfig().
//   - The shell passes data as props to HomePage (presentational, no state).
//
// SEO: generateMetadata reads the store from Supabase to produce per-store
//      <title> and OG tags. This is an independent fetch — Next.js deduplicates
//      the Supabase request with the layout's fetch via React cache (if enabled).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/getStoreBySlug";
import { resolveTemplateConfig } from "@/lib/resolveTemplateConfig";
import { techPremiumConfig } from "@/templates/tech-premium/config";
import { techPremiumConfigSchema } from "@/templates/tech-premium/config-schema";
import { StorefrontHomeShell } from "@/templates/tech-premium/components/StorefrontHomeShell";

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

  // Resolve branding for SEO
  const resolvedConfig = resolveTemplateConfig(
    techPremiumConfig,
    store.customization ?? undefined,
    techPremiumConfigSchema,
  );
  const storeName = resolvedConfig.branding?.storeName ?? store.name;
  const description =
    resolvedConfig.branding?.description ?? store.description ?? undefined;
  const logo = resolvedConfig.branding?.logo ?? undefined;

  return {
    title: `${storeName} | Tiendri`,
    description,
    openGraph: {
      title: storeName,
      description,
      ...(logo ? { images: [{ url: logo }] } : {}),
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

  // Resolve branding and business data for JSON-LD
  const resolvedConfig = resolveTemplateConfig(
    techPremiumConfig,
    store.customization ?? undefined,
    techPremiumConfigSchema,
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

  // StorefrontHomeShell is a Client Component that reads config + store from
  // StorefrontConfigProvider (set up by the parent layout) and renders the
  // home page using the tech-premium template with mock product data for now.
  // Product fetching from Supabase is a separate feature (Phase 7+).
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StorefrontHomeShell />
    </>
  );
}
