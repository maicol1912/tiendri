# Template System — Mapa General

> Referencia de alto nivel. El código es la fuente de verdad.
> Para detalles de CSS vars, presets, secciones o variantes, ver los docs especializados.

---

## 1. Vision general

Un template es la identidad visual completa de la tienda de un comerciante: colores, tipografía, layout y componentes React que renderizan el storefront. Tiendri tiene 8 templates: `tech-premium`, `fashion`, `furniture-dark`, `furniture-light`, `beauty-soft`, `beauty-elegant`, `decor-warm` y `food-night`. Cada uno vive en `src/templates/{nombre}/` y es autónomo — no comparte componentes con otros templates.

---

## 2. Anatomia de un template

Todos los templates tienen exactamente estos archivos en su raíz:

- `config.ts` — valores por defecto del template: colores base, radios, grid, layout, branding y contenido inicial.
- `config-schema.ts` — declara qué campos puede editar el comerciante desde el dashboard; el dashboard lee este schema para construir los formularios automáticamente.
- `palettes.ts` — paletas de color preconstruidas que el ThemeCustomizer ofrece como punto de partida.
- `ui-config.ts` — configuración estática del customizer: campos de color editables, controles de grid, opciones de layout, etiquetas de sección y paletas disponibles.
- `index.tsx` — punto de entrada del template; exporta el componente raíz que recibe la config resuelta y los datos del storefront.
- `components/` — todos los componentes React del template (header, home, producto, carrito, etc.).

Adicionalmente, la mayoría de templates incluye:

- `mock/data.ts` y `mock/assets.ts` — datos e imágenes estáticas para el modo preview.
- `utils/grid-classes.ts` y `utils/layout-classes.ts` — mapas de variantes a clases CSS.
- `hooks/useTemplateNav.ts` — lógica de navegación interna del template.
- `types.ts` — tipos locales del template (interfaces de config extendida, etc.).

---

## 3. Flujo de resolucion

El config que llega a los componentes pasa por tres capas:

- Capa 1 — Defaults del template: los valores definidos en `config.ts`. Son el punto de partida si el comerciante no ha personalizado nada.
- Capa 2 — Customizacion del comerciante: un objeto `StoreCustomization` guardado en Supabase (producción) o localStorage (demo). Contiene solo los campos que el comerciante modificó.
- Capa 3 — CSS custom properties: el config resuelto se convierte en variables CSS `--t-*` inyectadas como `style` en el div `.template-scope`.

El flujo concreto:

- `resolveTemplateConfig(defaults, customization)` en `src/lib/` fusiona las dos primeras capas en un `ResolvedStoreConfig`.
- `buildCssVars(resolved)` en `src/lib/buildCssVars.ts` convierte ese objeto en un mapa de variables CSS.
- El layout del storefront (`src/app/[slug]/layout.tsx`) lee la config de Supabase, resuelve, e inyecta las vars en el DOM.
- Los componentes solo reciben `ResolvedStoreConfig` y leen colores y radios via las vars `--t-*` de Tailwind.

---

## 4. Registry

El registry en `src/templates/registry.ts` es el punto centralizado de acceso a configs y schemas de todos los templates. Expone dos loaders async:

- `getTemplateConfig(templateId)` — carga el `config.ts` del template solicitado con dynamic import. Fallback a `tech-premium` para IDs desconocidos.
- `getTemplateSchema(templateId)` — carga el `config-schema.ts` del template. Retorna `null` para IDs sin schema registrado.

Cada template se importa dinámicamente (dynamic import con `await import(...)`), por lo que su código solo entra al bundle cuando se necesita, no al arrancar la app.

---

## 5. Storefront vs Preview

Storefront (`src/app/[slug]/`): ruta de producción. Lee `store.template_id` desde Supabase, llama al registry para cargar los defaults del template correcto, fusiona con la customización guardada del comerciante y renderiza la tienda con datos reales.

Preview (`src/app/template/[templateName]/`): ruta de exploración. Carga el template por parámetro de URL, usa `TemplateLayoutClient` como shell cliente que mantiene el estado del customizer en memoria, e inyecta un `ThemeCustomizer` flotante para experimentar en tiempo real. Usa datos mock de `mock/data.ts`.

La diferencia clave: el storefront es producción con datos de Supabase; el preview es un sandbox con datos ficticios y customizer activo.

---

## 6. Como agregar un template nuevo

1. Crear la carpeta `src/templates/{nombre}/` con las subcarpetas `components/`, `mock/`, `utils/` y `hooks/`.
2. Crear `config.ts` con todos los defaults del template: colores (los 9 tokens base obligatorios), radios, grid, layout, branding y contenido inicial.
3. Crear `config-schema.ts` declarando los campos editables agrupados en tabs y secciones para el dashboard.
4. Crear `palettes.ts` con las paletas de color preconstruidas que el customizer ofrece.
5. Crear `ui-config.ts` con los campos de color, controles de grid, opciones de layout y etiquetas de sección que ThemeCustomizer va a mostrar.
6. Crear los componentes en `components/` usando exclusivamente CSS vars `--t-*` para colores y radios, sin valores hardcodeados.
7. Crear `index.tsx` como punto de entrada que ensambla los componentes y recibe `ResolvedStoreConfig` + datos del storefront.
8. Registrar el template en `src/templates/registry.ts`: agregar un `case` en `getTemplateConfig` y otro en `getTemplateSchema`.
9. Agregar la entrada en el mapa `TEMPLATE_UI_CONFIGS` dentro de `src/app/template/[templateName]/TemplateLayoutClient.tsx`, importando el `ui-config` del nuevo template.
10. Verificar tipos con `npx tsc --noEmit` antes de considerar el template listo.

---

## 7. Links a docs relacionados

- `docs/css-variables.md` — grupos de CSS vars `--t-*` y como funciona `buildCssVars`.
- `docs/preset-system.md` — paletas de color por template.
- `docs/composable-sections.md` — 3 slots composables, 12 variantes, guia practica.

---

_Actualizado: 2026-06-13_
