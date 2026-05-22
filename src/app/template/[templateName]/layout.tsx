// Tech Premium — Shared template layout
// Wraps ALL sub-routes under /template/[templateName]/ with:
//  - CartProvider (cart state persists across page navigations)
//  - CSS variable injection (.template-scope div)
//  - Theme customizer (floating button + drawer)
//
// Server component — reads templateName from params, validates it,
// then delegates UI to TemplateLayoutClient (client component).

import { notFound } from "next/navigation";
import { templateRegistry } from "@/templates";
import { TemplateLayoutClient } from "./TemplateLayoutClient";
import { mockStore } from "@/templates/tech-premium/mock/data";

interface TemplateLayoutProps {
  children: React.ReactNode;
  params: Promise<{ templateName: string }>;
}

export default async function TemplateLayout({
  children,
  params,
}: TemplateLayoutProps) {
  const { templateName } = await params;

  // Only tech-premium has the full sub-route architecture for now.
  // Other templates still use the page.tsx customizer path.
  if (!(templateName in templateRegistry)) {
    notFound();
  }

  // For non-tech-premium templates the layout is transparent — they render
  // their content via page.tsx directly (customizer page takes full control).
  if (templateName !== "tech-premium") {
    return <>{children}</>;
  }

  return (
    <TemplateLayoutClient storeSlug={mockStore.slug}>
      {children}
    </TemplateLayoutClient>
  );
}
