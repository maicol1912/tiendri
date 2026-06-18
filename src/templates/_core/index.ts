// _core/index.ts
// Punto de entrada del engine de templates.
// Re-exporta TemplateLayout, shells y pages.

export { TemplateLayout } from "./TemplateLayout";
export type { TemplateLayoutProps } from "./TemplateLayout";

export * from "./shells";
export * from "./pages";
