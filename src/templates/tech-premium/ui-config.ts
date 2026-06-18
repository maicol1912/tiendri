import { techPremiumManifest } from "./manifest";
import { techPremiumPalettes } from "./palettes";
import type { TemplateUIConfig } from "@/types/templates/ui-config";
import type { CustomizerPalette } from "@/components/customizer/ThemeCustomizer";

export const techPremiumUiConfig = {
  label: "Tech Premium",
  defaultConfig: techPremiumManifest,
  colorFields: [
    { key: "primary", label: "Color primario" },
    { key: "secondary", label: "Color secundario" },
    { key: "background", label: "Fondo de página" },
    { key: "foreground", label: "Color del texto" },
    { key: "card", label: "Fondo de tarjetas" },
    { key: "border", label: "Color de bordes" },
    { key: "muted", label: "Texto secundario" },
    { key: "accent", label: "Color de acento" },
    { key: "onPrimary", label: "Texto sobre primario" },
    { key: "footerBg", label: "Fondo del footer" },
  ],
  gridFields: [
    {
      key: "products",
      mobileLabel: "Productos por fila (celular)",
      desktopLabel: "Productos por fila (computador)",
    },
    {
      key: "categories",
      mobileLabel: "Categorías por fila (celular)",
      desktopLabel: "Categorías por fila (computador)",
    },
    {
      key: "listing",
      mobileLabel: "Catálogo por fila (celular)",
      desktopLabel: "Catálogo por fila (computador)",
    },
    {
      key: "search",
      mobileLabel: "Búsqueda por fila (celular)",
      desktopLabel: "Búsqueda por fila (computador)",
    },
  ],
  layoutOptions: [
    {
      key: "cardImageRatio",
      label: "Forma de las imágenes",
      options: [
        { value: "square", label: "Cuadrada" },
        { value: "portrait", label: "Vertical" },
        { value: "wide", label: "Horizontal" },
      ],
    },
  ],
  sectionLabels: [
    { id: "hero", label: "Banner principal" },
    { id: "banners", label: "Banners promocionales" },
    { id: "categories", label: "Categorías" },
    { id: "products", label: "Productos" },
    { id: "popular", label: "Productos populares" },
    { id: "discounts", label: "Descuentos" },
    { id: "summer-sale", label: "Banner de ofertas" },
  ],
  palettes: techPremiumPalettes as CustomizerPalette[],
} satisfies TemplateUIConfig;
