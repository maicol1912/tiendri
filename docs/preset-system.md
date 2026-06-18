# Sistema de Paletas — Referencia

> Leer `docs/template-system.md` para entender la capa de configuración antes de leer esto.
> El sistema de presets documentado antes (13 presets globales, gene clusters, guardrails) fue eliminado completamente.

---

## 1. Qué es una paleta

Una **paleta** es un bundle de tokens de color pre-construido que un merchant puede aplicar a su tienda con un clic. Reemplaza al sistema de presets globales: en vez de definir personalidad visual completa (tipografía, espaciado, layout), una paleta controla únicamente los colores de la tienda.

Cada paleta tiene un nombre, una descripción corta, un estilo (para categorización en el UI), una tira de preview con 4-5 colores, y los 9 tokens de color del sistema.

---

## 2. Cómo funcionan

### Qué controla una paleta

Una paleta define exclusivamente los 9 tokens de color semánticos del template: `primary`, `secondary`, `background`, `foreground`, `card`, `border`, `muted`, `accent` y `onPrimary`. No toca tipografía, espaciado, densidad ni variantes de layout — esos aspectos se configuran por separado en el customizer.

### Cómo la aplica el merchant

En el dashboard, bajo la pestaña Tema, el merchant ve una grilla de tarjetas de paleta agrupadas por estilo. Al hacer clic en una, los 9 tokens de color de esa paleta se aplican al template. El merchant puede además ajustar colores individuales encima de la paleta seleccionada usando la sección de personalización avanzada.

### Qué pasa al aplicar

Al seleccionar una paleta se guarda su `id` en `StoreCustomization.theme.paletteId`. La función `resolveTemplateConfig` resuelve los colores en 3 capas en orden de precedencia creciente:

1. Colores por defecto del template (definidos en `manifest.ts`)
2. Tokens de la paleta seleccionada (si hay `paletteId`)
3. Overrides individuales del merchant (si los hay)

El resultado final se escribe como CSS custom properties (`--t-*`) en el scope del template.

---

## 3. Paletas por template

Las paletas son **por template**, no globales. Cada template define las suyas propias en un archivo `palettes.ts` dentro de su directorio. Esto permite que cada template tenga paletas adaptadas a su estética particular.

| Template | Paletas |
|---|---|
| tech-premium | 16 |
| beauty-elegant | 16 |
| beauty-soft | 16 |
| decor-warm | 16 |
| furniture-light | 16 |
| furniture-dark | 16 |
| fashion | 12 |
| food-night | 16 |

La primera paleta de cada template está diseñada para coincidir exactamente con los colores por defecto del `manifest.ts` de ese template.

---

## 4. Cómo agregar una paleta nueva

1. Abrir el `palettes.ts` del template correspondiente en `src/templates/{template-name}/palettes.ts`.
2. Agregar un nuevo objeto al array exportado con: `id` único en kebab-case, `name` visible al merchant, `description` de una línea, `style` para categorización en el UI, array `preview` con 4-5 colores representativos, y objeto `colors` con los 9 tokens.
3. Verificar que los 9 tokens de color son coherentes entre sí (contraste suficiente entre `background`/`foreground`, entre `primary`/`onPrimary`).
4. Correr `npx tsc --noEmit` para verificar que los tipos son correctos.

---

## 5. Archivos clave

| Archivo | Qué contiene |
|---|---|
| `src/templates/{template}/palettes.ts` | Definición de paletas del template |
| `src/templates/{template}/ui-config.ts` | Expone las paletas al customizer |
| `src/types/templates/config-schema.ts` | Tipo `ColorPalette` |
| `src/types/templates/store-customization.ts` | Tipo `ThemeCustomization` (incluye `paletteId`) |
| `src/lib/validators/store-customization.schema.ts` | Validación Zod de `paletteId` |
| `src/lib/resolveTemplateConfig.ts` | Lógica de merge de 3 capas de color |
| `src/app/(dashboard)/dashboard/configuracion/tabs/theme-tab.tsx` | UI de selección de paletas |

### Documentación relacionada

- `docs/css-variables.md` — catálogo completo de CSS vars generadas a partir de los tokens de color
- `docs/template-system.md` — arquitectura general del sistema de templates y resolución de config
- `docs/product.md` — roadmap de customización en la sección "Customización del merchant"

---

_Última actualización: 2026-06-13_
_Basado en: `src/templates/*/palettes.ts`, `src/types/templates/config-schema.ts`, `src/lib/resolveTemplateConfig.ts`_
