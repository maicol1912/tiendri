// Template registry

export const templateRegistry = {
  "tech-premium": () => import("./tech-premium"),
  fashion: () => import("./fashion"),
  "pets-modern": () => import("./pets-modern"),
  "electronics-classic": () => import("./electronics-classic"),
  "furniture-dark": () => import("./furniture-dark"),
  "beauty-soft": () => import("./beauty-soft"),
};

export type TemplateId = keyof typeof templateRegistry;

// Schema registry — getTemplateSchema (async) and getTemplateSchemaSync (sync)
export { getTemplateSchema, getTemplateSchemaSync } from "./registry";
