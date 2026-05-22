// Template registry

export const templateRegistry = {
  "tech-premium": () => import("./tech-premium"),
};

export type TemplateId = keyof typeof templateRegistry;
