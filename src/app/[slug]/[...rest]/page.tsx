// Storefront Catch-All — handles /[slug]/catalogo, /[slug]/carrito, /[slug]/producto/[id], etc.
// TemplateLayout (client component) reads usePathname() and resolves the correct shell,
// so this page just provides the same data as the home page.

import { notFound } from "next/navigation";
import { getStoreBySlug, appearanceToCustomization } from "@/catalog/getStoreBySlug";
import { resolveTemplateConfig } from "@/catalog/resolveTemplateConfig";
import { extractMediaTokens, resolveMediaUrlsForStorefront } from "@/catalog/resolveMediaUrlsForStorefront";
import type { StoreCustomization } from "@/types/templates";
import { getTemplateConfig, getTemplateSchema } from "@/templates";
import { TemplateLayout } from "@/templates/_core";
import { getTemplateManifest } from "@/templates/manifest-resolver";
import { getStorefrontProducts, getStorefrontCategories, getStorefrontBestSellers, getStorefrontPopularProducts, getStorefrontDiscountProducts } from "@/catalog/getStorefrontData";

interface CatchAllPageProps {
  params: Promise<{ slug: string; rest: string[] }>;
}

export default async function StorefrontCatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;

  const store = await getStoreBySlug(slug);
  if (!store) notFound();

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
  const hours = resolvedConfig.business?.hours ?? undefined;
  const paymentMethods = resolvedConfig.business?.paymentMethods ?? undefined;

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
  );
}
