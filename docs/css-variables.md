# CSS Variables — Tiendri V2

## Qué es

El sistema de tematización de Tiendri usa CSS custom properties para controlar el 100% del aspecto visual de los templates. Ningún template hardcodea colores, tipografía, ni espaciados — todo llega vía variables CSS prefijadas con `--t-`. Estas variables se inyectan como `style={{}}` en el div wrapper `.template-scope`, lo que las mantiene aisladas del resto del dashboard o de la página de marketing.

---

## Grupos de variables

| Grupo | Qué controla | Aprox. cantidad |
|---|---|---|
| Colores (`--t-{token}`) | Los 9 tokens base (primary, secondary, background, foreground, card, border, muted, accent, onPrimary), el derivado `--t-primary-rgb` para efectos rgba, y `--t-card-foreground` para texto dentro de cards | ~11 |
| Radius (`--t-radius-*`) | Radio de bordes: base, sm, lg, imagen. También los keys propios del template (card, button, category) | 4–6 |
| Tipografía (`--t-type-*`) | Peso, tamaño y transform de headings; tamaño y peso de body; contraste entre tamaños; ancho máximo de párrafos | ~8 |
| Espaciado (`--t-space-*`) | Cuatro tokens de espaciado (section, card, item, gap) impulsados por densidad | 4 |
| Grid y layout (`--t-grid-cols-*`, `--t-container-max`, `--t-image-fit`) | Columnas de producto en mobile/desktop, ancho máximo del contenedor, modo de ajuste de imagen | 4 |
| Card background mode (`--t-card-bg-mode`) | Modo semántico de fondo de tarjeta (no un color directo, sino un identificador: white, surface, transparent, primary-tint) | 1 |
| Fuentes (`--font-*`, `--template-heading-font`) | Variables de fuente para body, heading y el alias `--font-sans`. Se resuelven desde el font pair del tema o desde `config.font`/`config.headingFont` directamente | 3–4 |

### `--t-card-foreground`

Generada por `buildCssVars.ts`. Color de texto para contenido dentro de cards. Derivado automáticamente usando luminancia WCAG — si la card (`--t-card`) es significativamente más clara que el background de la página, usa el color oscuro del background como texto; en light themes usa `--t-foreground` normalmente. Consumida en `CoreCheckoutPage.tsx` (order summary card).

---

## Cómo se generan

`buildCssVars()` en `src/lib/buildCssVars.ts` recibe un `ResolvedStoreConfig` (la config ya resuelta por `resolveTemplateConfig`) y retorna un `Record<string, string>` plano que se inyecta en el wrapper del template.

Internamente delega grupos a funciones auxiliares: `buildTypographyExtendedVars`, `buildCardVars`, `buildLayoutVars`, y `buildColorVars`. Cada función tiene sus propios defaults inlineados para garantizar que ningún valor salga como `undefined`.

Para el espaciado existe un comportamiento en dos capas: primero se aplican los valores de `layoutDensity` (compact / balanced / spacious), y luego, si el merchant configuró explícitamente `spacingDensity` (tight / normal / airy), esos valores sobreescriben los anteriores. Ambos escriben a los mismos `--t-space-*` que consumen los componentes.

Una particularidad: la fuente del body se inyecta además como `fontFamily` (camelCase, sin prefijo `--`), que React mapea a la propiedad CSS `font-family` sobre el elemento `.template-scope`. Esto no es un CSS custom property — es intencional.

---

## Cómo se consumen

Los templates y componentes referencian las variables con `var(--t-primary)`, `var(--t-space-section)`, etc., ya sea en Tailwind (`border-[var(--t-primary)]`) o en estilos inline. El div `.template-scope` actúa como raíz de scope: todas las variables están disponibles para cualquier descendiente. Componentes compartidos como `QuantityStepper` también usan `--t-*` para adaptarse al tema activo sin necesitar props adicionales.

---

## Cómo agregar una variable nueva

1. Emitir la variable en `buildCssVars.ts`, dentro del builder que corresponda al grupo semántico.
2. Si el valor es configurable por el merchant, agregar el campo a `StoreCustomization` en `src/types/templates/store-customization.ts` y propagarlo en `resolveTemplateConfig`.
3. Si debe aparecer en el dashboard de configuración, agregar el campo al `config-schema.ts` del template correspondiente.
4. Consumir con `var(--t-nueva-var)` en los componentes del template.

---

## Archivos clave

- `src/lib/buildCssVars.ts` — generador principal de todas las variables
- `src/app/[slug]/layout.tsx` — donde se inyectan las variables en el storefront público
- `src/app/template/[templateName]/TemplateLayoutClient.tsx` — donde se inyectan en el preview del dashboard
- `src/types/templates/primitives.ts` — tipos de los tokens (DensityPreset, BorderRadiusScale, CardBackground, etc.)
- `src/types/templates/store-customization.ts` — campos configurables por el merchant

Ver también: `docs/template-system.md` para el contexto completo del sistema de templates.
