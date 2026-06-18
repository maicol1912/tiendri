// Template registry

export const templateRegistry = {
  "tech-premium": () => import("./tech-premium/manifest"),
  fashion: () => import("./fashion/manifest"),
  "furniture-dark": () => import("./furniture-dark/manifest"),
  "furniture-light": () => import("./furniture-light/manifest"),
  "beauty-soft": () => import("./beauty-soft/manifest"),
  "beauty-elegant": () => import("./beauty-elegant/manifest"),
  "decor-warm": () => import("./decor-warm/manifest"),
  "food-night": () => import("./food-night/manifest"),
};

export type TemplateId = keyof typeof templateRegistry;

// Schema registry — async loader, code-splits each schema per template
export { getTemplateSchema, getTemplateConfig } from "./registry";
