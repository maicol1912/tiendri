// manifest-resolver.ts
// Dado un templateId y un TemplateConfig resuelto, devuelve el TemplateManifest
// completo con las variantes de slots que cada template declara.
//
// Centraliza la lógica para que tanto la ruta de preview (/template/[name])
// como la ruta de storefront (/[slug]) usen exactamente el mismo manifiesto.

import type { TemplateConfig } from "@/types/templates/template-config";
import type { TemplateManifest } from "@/types/templates/manifest";

/**
 * Construye un TemplateManifest a partir del config ya cargado del template.
 * Las variantes de slots vienen directamente del manifest.ts de cada template.
 *
 * @param templateId - Identificador del template (ej. "tech-premium")
 * @param config     - TemplateConfig ya cargado via getTemplateConfig()
 */
export function getTemplateManifest(
  templateId: string,
  config: TemplateConfig
): TemplateManifest {
  const manifest = config as Partial<TemplateManifest>;
  if (!manifest.variants) {
    throw new Error(
      `Template "${templateId}" does not declare variants in its manifest.ts`
    );
  }
  return config as TemplateManifest;
}
