/**
 * Landing page — Tiendri
 * Server Component: exports metadata + JSON-LD structured data.
 * All interactive behavior (hooks, scroll animations) lives in LandingPageClient.
 */

import type { Metadata } from 'next';
import { LandingPageClient } from './_components/landing/LandingPageClient';
import { safeJsonLdStringify } from '@/shared/seo/safe-json-ld';

export const metadata: Metadata = {
  title: 'Tiendri — Creá tu tienda online y recibí pedidos por WhatsApp',
  description:
    'Crea tu catálogo online en 5 minutos. Sin comisiones. Recibí cada pedido directamente por WhatsApp. Ideal para comerciantes colombianos.',
  openGraph: {
    title: 'Tiendri — Tu negocio online en 5 minutos',
    description:
      'Catálogo online + pedidos por WhatsApp. Sin comisiones. Para comerciantes colombianos.',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
    url: 'https://tiendri.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiendri — Tu negocio online en 5 minutos',
    description: 'Catálogo online + pedidos por WhatsApp.',
    images: ['/og-default.png'],
  },
  alternates: { canonical: 'https://tiendri.com' },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Tiendri',
      url: 'https://tiendri.com',
      description: 'Crea tu catálogo online y recibe pedidos por WhatsApp',
    },
    {
      '@type': 'Organization',
      name: 'Tiendri',
      url: 'https://tiendri.com',
      logo: 'https://tiendri.com/logo.png',
      description:
        'Plataforma SaaS para comerciantes colombianos. Catálogo online + pedidos por WhatsApp.',
      sameAs: [],
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(websiteJsonLd) }}
      />
      <LandingPageClient />
    </>
  );
}
