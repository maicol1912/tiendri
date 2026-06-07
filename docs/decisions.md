# Decisiones Arquitectónicas (ADRs)

Registro de decisiones técnicas importantes con su contexto y justificación.
Formato: título, contexto, decisión, alternativas consideradas, consecuencias.

---

## ADR-001: Templates auto-contenidos (sin componentes compartidos de storefront)

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Teníamos `src/components/storefront/` con componentes compartidos (CartDrawer, SearchBar, CheckoutForm). La idea era que todos los templates los reutilicen.

**Decisión**: Cada template tiene sus PROPIOS componentes. No hay componentes compartidos de storefront. Los stubs en `src/components/storefront/` fueron eliminados.

**Alternativas**:
- Componentes compartidos con theming via props → Descartada: los templates son visualmente TAN diferentes que los componentes compartidos terminarían siendo más complejos que componentes independientes.
- Componentes base + wrappers por template → Descartada: agrega una capa de abstracción sin beneficio real.

**Consecuencias**: Más código duplicado entre templates, pero cada template es independiente — se puede modificar sin riesgo de romper otro. La skill `template-migrator` documenta qué componentes crear para cada template.

---

## ADR-002: CSS variables (--t-*) para colores, no Tailwind theme

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Necesitábamos colores personalizables por template y por merchant. Tailwind tiene su propio sistema de theming pero es estático (build-time).

**Decisión**: Inyectar colores como CSS custom properties (`--t-primary`, `--t-card-bg`, etc.) en un div `.template-scope` a nivel de layout. Componentes consumen via `var(--t-*)`.

**Alternativas**:
- Tailwind theme extendido → Descartada: no permite cambios en runtime (el customizer necesita cambios en vivo).
- CSS-in-JS (styled-components) → Descartada: no compatible con server components de Next.js.
- Inline styles en cada componente → Descartada: pierde las utilidades de Tailwind.

**Consecuencias**: Los cambios de color son instantáneos (solo CSS, sin re-render de React). 32+ variables por template. El prefijo `--t-` es genérico (reutilizable por cualquier template).

---

## ADR-003: Static Tailwind class maps para grid columns

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Grid columns deben ser configurables (1-6). Tailwind purga clases generadas dinámicamente (`grid-cols-${n}`).

**Decisión**: Usar objetos estáticos de mapeo (`Record<number, string>`) donde cada clase Tailwind está escrita como string literal completo. Función `gridColsClass(mobile, desktop)` retorna las clases.

**Alternativas**:
- CSS custom properties con `repeat(var(--n), ...)` → Descartada: soporte inconsistente en browsers.
- Inline styles con `gridTemplateColumns` → Descartada: no maneja responsive (necesita media queries).
- Tailwind safelist → Descartada: infla el bundle con clases no usadas.

**Consecuencias**: Las clases siempre existen en el source code → Tailwind nunca las purga. Rango limitado a 1-6 columns (suficiente para nuestro caso).

---

## ADR-004: URL routing real en vez de state-based

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Inicialmente usamos `useState<CurrentPage>` para navegar entre páginas del template preview. Esto fue un atajo rápido pero impedía browser back/forward, URLs compartibles y SEO.

**Decisión**: Cada página del template tiene su propia sub-ruta Next.js (`/template/[name]/catalogo`, `/template/[name]/carrito`, etc.). Navegación via `useRouter().push()` y hook `useTemplateNav()`.

**Alternativas**:
- Mantener state-based para preview, URL routing solo para live → Descartada: duplica lógica de navegación.
- Hash routing (#cart, #search) → Descartada: no funciona con SSR, no es estándar.

**Consecuencias**: Browser history funciona. URLs son compartibles. Futuro storefront live (`/[slug]/`) seguirá el mismo patrón. CartProvider y customizer viven en el layout compartido para persistir entre navegaciones.

---

## ADR-005: Mode "live" vs "preview" — solo afecta checkout

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: El template preview (`/template/[name]`) y el storefront real (`/[slug]`) usan los MISMOS componentes. La diferencia es mínima.

**Decisión**: Un prop `mode: "live" | "preview"` se pasa al template. En `preview`, el checkout muestra un CTA "¿Te gustó? Creá tu tienda" en vez de enviar el mensaje de WhatsApp. Todo lo demás (carrito, búsqueda, filtros, detalle) es 100% funcional en ambos modos.

**Alternativas**:
- Deshabilitar carrito en preview (isPreview flag) → Descartada por el CTO: el merchant necesita ver la experiencia COMPLETA.
- Componentes separados para preview y live → Descartada: duplicación innecesaria.

**Consecuencias**: El template preview es una tienda mock completa. El único cambio está en `CheckoutAction` (último paso del checkout).

---

## ADR-006: Theme Customizer como drawer flotante

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Necesitábamos un panel para editar configuraciones del template en tiempo real. Inicialmente se implementó como sidebar fijo a la izquierda.

**Decisión**: Botón flotante (bottom-right, estilo Next.js dev tools) que abre un drawer overlay desde la derecha. El template siempre es full-width.

**Alternativas**:
- Sidebar fijo izquierdo → Descartada por el CTO: comprimía el template y rompía la experiencia de preview.
- Barra superior colapsable → Descartada: ocupa espacio vertical valioso.

**Consecuencias**: El template se ve siempre en su tamaño real. El drawer flotante no afecta el layout. En mobile se oculta (tool de desktop).

---

## ADR-007: Spanish-first para todo el UI

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Target market es Colombia/LATAM. Los merchants tienen zero experiencia técnica.

**Decisión**: Todo el texto de UI está en español colombiano. Los nombres de marca/producto se mantienen en inglés (iPhone, Samsung Galaxy, etc.). El customizer usa labels amigables ("Esquinas de tarjetas" en vez de "border-radius").

**Alternativas**:
- Inglés por defecto + i18n después → Descartada: el producto es para el mercado hispanohablante desde el día uno.
- Español formal (España) → Descartada: usamos voseo y expresiones colombianas.

**Consecuencias**: `lang="es"` en el HTML root. Todos los aria-labels, botones, placeholders, headings en español. El skill `template-migrator` incluye traducciones de referencia.

---

## ADR-008: Fonts — Inter body + Aeonik headings, scoped por template

**Fecha**: 2026-05-21
**Estado**: Actualizada (2026-06-07)

**Contexto**: El diseño actual usa Inter para body y Aeonik (fuente custom) para headings. Aeonik tiene dos pesos: Air (400) y Black (900), lo que da un contraste tipográfico marcado entre headings livianos y bold.

**Decisión**: Ambas fuentes cargadas en root layout como CSS variables (`--font-inter`, `--font-display`). La aplicación a headings es POR TEMPLATE via `.template-scope` utility + `--template-heading-font`. Para headings que requieran pesos intermedios no disponibles en Aeonik, usar Inter como fallback.

**Alternativas**:
- Solo Inter para todo → Descartada: pierde la identidad visual de Aeonik en headings.
- Font global para headings → Descartada: cada template podría necesitar fuentes diferentes.
- Cargar fuentes por template (next/font dinámico) → Diferida: se implementará cuando haya templates con fuentes distintas.

**Consecuencias**: Font scoping per-template. La landing page usa Aeonik Black (900) para hero h1 (80-130px) y section h2 (48-80px), con Inter para body text. Futuros templates pueden definir su propia `headingFont` en config.

---

## ADR-009: resolveTemplateConfig — merge shallow por sub-objeto

**Fecha**: 2026-05-21
**Estado**: Aceptada

**Contexto**: Cuando un merchant personaliza su tienda, solo cambia algunos campos (ej: color primario, estilo de cards). Necesitamos mergear sus overrides con los defaults del template.

**Decisión**: `resolveTemplateConfig(template, customization)` hace shallow merge por cada sub-objeto: colors, radius, grid, layout. Las sections se reemplazan completamente (porque el orden importa).

**Alternativas**:
- Deep merge recursivo → Descartada: complejidad innecesaria, nuestros objetos son flat (1 nivel de profundidad).
- Reemplazo completo → Descartada: el merchant tendría que especificar TODOS los colores aunque solo cambie uno.

**Consecuencias**: El `StoreCustomization` en Supabase es Partial — solo contiene lo que el merchant cambió. El resolver llena el resto con defaults del template.
