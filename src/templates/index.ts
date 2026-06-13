// Template registry

export const templateRegistry = {
  "tech-premium": () => import("./tech-premium"),
  fashion: () => import("./fashion"),
  "furniture-dark": () => import("./furniture-dark"),
  "furniture-light": () => import("./furniture-light"),
  "beauty-soft": () => import("./beauty-soft"),
  "beauty-elegant": () => import("./beauty-elegant"),
  "decor-warm": () => import("./decor-warm"),
  "food-night": () => import("./food-night"),
};

export type TemplateId = keyof typeof templateRegistry;

// Schema registry — getTemplateSchema (async) and getTemplateSchemaSync (sync)
export { getTemplateSchema, getTemplateSchemaSync } from "./registry";
