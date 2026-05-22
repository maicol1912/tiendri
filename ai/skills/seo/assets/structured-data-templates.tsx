/**
 * Structured Data templates para Tiendri
 * Cada storefront público necesita Organization + Products
 */

// Organization — para la tienda
export function StoreJsonLd({
  name,
  url,
  logo,
  description,
}: {
  name: string
  url: string
  logo: string | null
  description: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    description,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Product — para cada producto del catálogo
export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency,
  available,
  storeName,
  storeUrl,
}: {
  name: string
  description: string
  image: string | null
  price: number
  currency: string
  available: boolean
  storeName: string
  storeUrl: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image && { image }),
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: storeName,
        url: storeUrl,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// WebSite — para la landing de Tiendri
export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tiendri',
    url: 'https://tiendri.com',
    description: 'Creá tu catálogo online en minutos y recibí pedidos por WhatsApp',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tiendri.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
