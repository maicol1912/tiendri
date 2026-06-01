// Template registry

export const templateRegistry = {
  "tech-premium": () => import("./tech-premium"),
  fashion: () => import("./fashion"),
};

export type TemplateId = keyof typeof templateRegistry;

// Schema registry — getTemplateSchema (async) and getTemplateSchemaSync (sync)
export { getTemplateSchema, getTemplateSchemaSync } from "./registry";
