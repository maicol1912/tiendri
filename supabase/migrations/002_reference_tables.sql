-- ── Migration: 002_reference_tables ─────────────────────────────────────────
-- Phase 2: Reference tables (templates, plans, currencies) + seed data
-- These tables have rich metadata that is queried at runtime.
-- Depends on: 001_enums (no enum columns here, but logical ordering)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. templates ─────────────────────────────────────────────────────────────
-- 8 templates implemented: tech-premium, fashion, furniture-dark, furniture-light,
-- beauty-soft, beauty-elegant, decor-warm, food-night
-- Rich metadata (palettes JSONB, default_variants JSONB, colors JSONB). JOINed by stores.

CREATE TABLE IF NOT EXISTS public.templates (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  code              text        UNIQUE NOT NULL,  -- e.g. "tech-premium", "fashion" — for programmatic lookups
  name              text        NOT NULL,          -- e.g. "Tech Premium", "Fashion" — for display in UI
  description       text        NOT NULL,          -- e.g. "Ideal para tecnologia, electronica y gadgets"
  industry          text[]      NOT NULL,     -- e.g. ARRAY['electronics','tech','gadgets'] — multiple industries per template
  appearance        text        NOT NULL DEFAULT 'light'
                                CHECK (appearance IN ('light', 'dark')),
  is_active         boolean     NOT NULL DEFAULT true,
  sort_order        int         NOT NULL DEFAULT 0,

  -- ── Template defaults (JSONB — always read WITH the template) ──────────────
  -- These are nested data that belong to the template entity.
  -- They are always read together when resolving a store's config.

  -- Default color tokens: { primary, secondary, background, foreground, card, border, muted, accent, onPrimary, ...extras }
  default_colors    jsonb       NOT NULL DEFAULT '{}'::jsonb,

  -- Default variant selections: { header: "DEFAULT", hero: "PROMO_CARD", ... }
  default_variants  jsonb       NOT NULL DEFAULT '{}'::jsonb,

  -- Default sections: [{ id: "hero", visible: true }, { id: "categories", visible: true }, ...]
  default_sections  jsonb       NOT NULL DEFAULT '[]'::jsonb,

  -- Array of palette objects: [{ id, name, description, style, preview, colors }, ...]
  -- Each palette is a complete color set. ~16 per template.
  palettes          jsonb       NOT NULL DEFAULT '[]'::jsonb,

  -- Additional template metadata: fonts, grid config, layout defaults, radius tokens, etc.
  metadata          jsonb       NOT NULL DEFAULT '{}'::jsonb,

  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public: read templates" ON public.templates FOR SELECT TO public USING (true);

-- GIN index on the industry array for efficient "find templates by industry" queries
-- e.g. WHERE industry @> ARRAY['beauty'] or WHERE 'tech' = ANY(industry)
CREATE INDEX idx_templates_industry ON public.templates USING GIN (industry);


-- ── 2. plans ─────────────────────────────────────────────────────────────────
-- Plans have complex metadata (pricing, limits, feature flags) used in triggers
-- to enforce resource caps. Each store has its own plan (paid independently).

CREATE TABLE IF NOT EXISTS public.plans (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text        UNIQUE NOT NULL,  -- "free", "pro", "negocio" — for programmatic lookups
  name            text        NOT NULL,          -- "Gratis", "Pro", "Negocio" — for display in UI
  price_cop       int         NOT NULL DEFAULT 0,  -- monthly price in COP (0 = free)
  product_limit   int,        -- NULL = unlimited
  storage_limit   int,        -- bytes, NULL = unlimited
  category_limit  int         NOT NULL DEFAULT 50,
  media_limit     int         NOT NULL DEFAULT 100,
  features        jsonb       NOT NULL DEFAULT '[]'::jsonb,
  -- features: ["analytics", "order_history", "custom_sections", "priority_support", ...]
  is_active       boolean     NOT NULL DEFAULT true,
  sort_order      int         NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public: read plans" ON public.plans FOR SELECT TO public USING (true);


-- ── 3. currencies ─────────────────────────────────────────────────────────────
-- Currencies have structured metadata (symbol, locale, decimal_places) that the
-- frontend needs for price formatting via Intl.NumberFormat. An enum would lose this metadata.

CREATE TABLE IF NOT EXISTS public.currencies (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text        UNIQUE NOT NULL,  -- ISO 4217: "COP", "USD", "EUR" — for programmatic lookups
  name            text        NOT NULL,          -- "Peso Colombiano", "US Dollar" — for display in UI
  symbol          text        NOT NULL,          -- "$", "EUR"
  decimal_places  int         NOT NULL DEFAULT 0,  -- COP=0, USD=2
  locale          text        NOT NULL DEFAULT 'es-CO',  -- for Intl.NumberFormat
  is_active       boolean     NOT NULL DEFAULT true,
  sort_order      int         NOT NULL DEFAULT 0
);

ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public: read currencies" ON public.currencies FOR SELECT TO public USING (true);


-- ── SEED DATA ─────────────────────────────────────────────────────────────────

-- Plans (3 plans)
-- Plans are per-store: each store pays its own plan independently.
-- All users can create multiple stores. Multi-store is NOT a paid feature.
-- Negocio differentiates with: custom domain, advanced analytics, white-label branding.
INSERT INTO public.plans (code, name, price_cop, product_limit, storage_limit, category_limit, media_limit, features, sort_order) VALUES
  ('free',    'Gratis',  0,     20,   52428800,   50,  100,
    '["all_templates", "orders", "qr_code", "search"]'::jsonb,
    0),
  ('pro',     'Pro',     49900, NULL, 524288000,  50,  500,
    '["all_templates", "orders", "qr_code", "search", "analytics", "order_history", "custom_sections", "priority_support"]'::jsonb,
    1),
  ('negocio', 'Negocio', 99900, NULL, 1073741824, 50, 1000,
    '["all_templates", "orders", "qr_code", "search", "analytics", "order_history", "custom_sections", "priority_support", "custom_domain", "advanced_reports", "white_label"]'::jsonb,
    2)
ON CONFLICT (code) DO NOTHING;

-- Currencies (8 currencies)
-- id is auto-generated UUID; insert by code+name so conflict target is the unique code
INSERT INTO public.currencies (code, name, symbol, decimal_places, locale, sort_order) VALUES
  ('COP', 'Peso Colombiano',      '$',   0, 'es-CO', 0),
  ('USD', 'Dolar Estadounidense',  '$',   2, 'en-US', 1),
  ('EUR', 'Euro',                  'EUR', 2, 'es-ES', 2),
  ('MXN', 'Peso Mexicano',        '$',   2, 'es-MX', 3),
  ('ARS', 'Peso Argentino',       '$',   2, 'es-AR', 4),
  ('BRL', 'Real Brasileno',       'R$',  2, 'pt-BR', 5),
  ('CLP', 'Peso Chileno',         '$',   0, 'es-CL', 6),
  ('PEN', 'Sol Peruano',          'S/',  2, 'es-PE', 7)
ON CONFLICT (code) DO NOTHING;

-- Templates (8 templates)
-- id UUID is auto-generated; use code as the human-readable key and conflict target.
-- tech-premium and fashion have full JSONB data.
-- The remaining 6 have placeholder '{}' for default_colors, palettes, and metadata
-- (populated from their respective manifest.ts and palettes.ts files via a seed script).

-- tech-premium
INSERT INTO public.templates (code, name, description, industry, appearance, sort_order, default_colors, default_variants, default_sections, palettes, metadata) VALUES
  ('tech-premium', 'Tech Premium', 'Ideal para tecnologia, electronica y gadgets', ARRAY['electronics', 'tech', 'gadgets'], 'light', 0,
    -- default_colors
    '{"primary":"#000000","secondary":"#211C24","background":"#FAFAFA","foreground":"#000000","card":"#F6F6F6","border":"#B5B5B5","muted":"#787878","accent":"#FFB547","onPrimary":"#FFFFFF","footerBg":"#000000"}'::jsonb,
    -- default_variants
    '{"header":"DEFAULT","hero":"PROMO_CARD","categoryNav":"HORIZONTAL_SCROLL","productCard":"BELOW_IMAGE","footer":"COLUMNS","bottomNav":"EDGE","searchBar":"INLINE"}'::jsonb,
    -- default_sections
    '[{"id":"hero","visible":true},{"id":"categories","visible":true},{"id":"products","visible":true},{"id":"popular","visible":true}]'::jsonb,
    -- palettes (first 4 shown; full 16 come from palettes.ts)
    '[
      {"id":"obsidian","name":"Obsidiana","description":"Negro sobre blanco — minimalismo tech con maximo contraste","style":"minimal","preview":["#000000","#FAFAFA","#211C24","#F6F6F6","#909090"],"colors":{"primary":"#000000","secondary":"#211C24","background":"#FAFAFA","foreground":"#000000","card":"#F6F6F6","border":"#B5B5B5","muted":"#787878","accent":"#FFB547","onPrimary":"#FFFFFF"}},
      {"id":"midnight-luxury","name":"Lujo Nocturno","description":"Elegancia oscura con acentos dorados — para marcas premium","style":"premium","preview":["#0D1117","#C9A84C","#161B22","#E6EDF3","#1C2128"],"colors":{"primary":"#C9A84C","secondary":"#1C2128","background":"#0D1117","foreground":"#E6EDF3","card":"#161B22","border":"#30363D","muted":"#7D8590","accent":"#E3B341","onPrimary":"#0D1117"}},
      {"id":"arctic-steel","name":"Acero Artico","description":"Azules corporativos con grises frios — profesional y confiable","style":"corporate","preview":["#1B2A4A","#2B5EA7","#F4F7FB","#E8EEF4","#4A6B8A"],"colors":{"primary":"#1B2A4A","secondary":"#2B5EA7","background":"#F4F7FB","foreground":"#1B2A4A","card":"#EDF1F7","border":"#B8C7D9","muted":"#6B839E","accent":"#F5A623","onPrimary":"#FFFFFF"}},
      {"id":"neon-circuit","name":"Circuito Neon","description":"Fondo oscuro con acentos electricos — para tiendas gaming y tech","style":"cyberpunk","preview":["#0A0A0F","#00E5FF","#FF2D78","#14141F","#E0E0E8"],"colors":{"primary":"#00E5FF","secondary":"#FF2D78","background":"#0A0A0F","foreground":"#E0E0E8","card":"#14141F","border":"#2A2A3C","muted":"#6B6B82","accent":"#FFD700","onPrimary":"#0A0A0F"}}
    ]'::jsonb,
    -- metadata
    '{
      "font":"Inter",
      "headingFont":"var(--font-display), ui-sans-serif, system-ui, sans-serif",
      "grid":{"products":{"mobile":2,"desktop":4},"categories":{"mobile":3,"desktop":6},"listing":{"mobile":2,"desktop":3},"search":{"mobile":2,"desktop":3}},
      "radius":{"card":"9px","category":"15px","button":"8px"},
      "layout":{"cardImageRatio":"wide","gridDensity":"standard","spacingDensity":"normal","imageFit":"contain"},
      "branding":{"storeName":"Mi Tienda","description":"Tu tienda online en Tiendri","socialLinks":{}},
      "content":{
        "heroBanner":{"image":"/mocks/tech-premium/hero-bento.png","title":"","subtitle":"","ctaText":""},
        "navLinks":[{"label":"Inicio","href":"/"},{"label":"Catalogo","href":"/catalogo"},{"label":"Info","href":"/info"}],
        "footerServices":["Programa de bonos","Tarjetas de regalo","Credito y pago","Contratos de servicio","Cuenta sin efectivo","Metodos de pago"],
        "footerAssistance":["Buscar pedido","Terminos de envio","Cambios y devoluciones","Garantia","Preguntas frecuentes","Terminos de uso"],
        "productTabs":[{"id":"new-arrival","label":"Nuevos"},{"id":"bestseller","label":"Mas vendidos"},{"id":"featured","label":"Destacados"}],
        "popularSearches":["iPhone","AirPods","MacBook","Apple Watch","Samsung Galaxy","iPad"]
      },
      "business":{"currency":"COP","paymentMethods":[]},
      "heroConstrained":false,"heroDesktopOnly":true,"showSearchBar":false,"categorySize":"large","categoriesWide":true,"showOriginalPrice":false,"cardTextCenter":true
    }'::jsonb
  )
ON CONFLICT (code) DO NOTHING;

-- fashion
INSERT INTO public.templates (code, name, description, industry, appearance, sort_order, default_colors, default_variants, default_sections, palettes, metadata) VALUES
  ('fashion', 'Fashion', 'Ideal para moda, ropa, accesorios y estilo de vida', ARRAY['clothing', 'accessories', 'boutique'], 'light', 1,
    '{"primary":"#000000","secondary":"#D9D9D9","background":"#F5F5F0","foreground":"#000000","card":"#FFFFFF","border":"#D9D9D9","muted":"#8A8A8A","accent":"#000000","onPrimary":"#FFFFFF","buttonBg":"#D9D9D9","buttonText":"#000000","surface":"#D9D9D9","searchBg":"#D9D9D9"}'::jsonb,
    '{"header":"GLASS","hero":"EDITORIAL","categoryNav":"HORIZONTAL_SCROLL","productCard":"BELOW_IMAGE","footer":"COLUMNS","bottomNav":"EDGE","searchBar":"INLINE"}'::jsonb,
    '[{"id":"hero","visible":true},{"id":"featured","visible":true},{"id":"products","visible":true},{"id":"editorial","visible":true}]'::jsonb,
    '[]'::jsonb,  -- palettes populated from fashion/palettes.ts
    '{
      "font":"Inter",
      "headingFont":"var(--font-display), ui-sans-serif, system-ui, sans-serif",
      "grid":{"products":{"mobile":2,"desktop":4},"categories":{"mobile":2,"desktop":4},"listing":{"mobile":2,"desktop":4},"search":{"mobile":2,"desktop":4}},
      "radius":{"card":"0px","category":"0px","button":"0px"},
      "layout":{"cardImageRatio":"portrait","gridDensity":"compact","spacingDensity":"airy","imageFit":"cover","cardStyle":"transparent"},
      "branding":{"storeName":"Mi Tienda de Moda","description":"Tu destino de moda en Colombia","socialLinks":{}},
      "content":{
        "heroBanner":{"title":"Coleccion","subtitle":"Verano 2026","ctaText":"Ir a la tienda"},
        "navLinks":[{"label":"INICIO","href":"/"},{"label":"CATALOGO","href":"/catalogo"},{"label":"INFO","href":"/info"}],
        "footerServices":["Guia de tallas","Tarjetas de regalo","Programa de lealtad","Cuotas sin interes","Metodos de pago","Envio express"],
        "footerAssistance":["Rastrear pedido","Politica de envios","Cambios y devoluciones","Cuidado de prendas","Preguntas frecuentes","Terminos y condiciones"],
        "productTabs":[{"id":"new-arrival","label":"Nueva Coleccion"},{"id":"bestseller","label":"Mas Vendidos"},{"id":"featured","label":"Destacados"}],
        "popularSearches":["Camiseta negra","Vestido midi","Blazer mujer","Pantalon slim","Chaqueta oversize","Accesorios"],
        "editorialHeading":"NUESTRO ENFOQUE AL","editorialSubheading":"DISENO DE MODA","editorialBody":"Cada pieza nace de la observacion de lo cotidiano. Trabajamos con materiales sostenibles y procesos artesanales para crear ropa que no sigue tendencias."
      },
      "business":{"currency":"COP","paymentMethods":[]},
      "showSearchBar":false,"showAddToCartInGrid":false,"showCategories":false,"showDiscountBadge":false,"showOriginalPrice":true,"productsHeading":"NUEVA COLECCION","heroTitleLight":"Nueva","headerIcon":"diamond","heroFeaturedCount":4
    }'::jsonb
  )
ON CONFLICT (code) DO NOTHING;

-- Remaining 6 templates — default_colors, palettes, metadata use placeholders.
-- These should be populated from their respective manifest.ts and palettes.ts files
-- via a seed script generated from the TypeScript sources.
INSERT INTO public.templates (code, name, description, industry, appearance, sort_order, default_colors, default_variants, default_sections, palettes, metadata) VALUES
  ('furniture-dark',  'Furniture Dark',  'Ideal para muebles y decoracion — estetica oscura y elegante',   ARRAY['furniture', 'home', 'interior'], 'dark',  2,
    '{}'::jsonb,
    '{"header":"GREETING","hero":"SPLIT","categoryNav":"HORIZONTAL_SCROLL","productCard":"BELOW_IMAGE","footer":"COLUMNS","bottomNav":"EDGE","searchBar":"INLINE"}'::jsonb,
    '[]'::jsonb, '[]'::jsonb, '{}'::jsonb),

  ('furniture-light', 'Furniture Light', 'Ideal para muebles y decoracion — estetica clara y acogedora',   ARRAY['furniture', 'home', 'interior'], 'light', 3,
    '{}'::jsonb,
    '{"header":"GREETING_SIMPLE","hero":"CARD_SPLIT","categoryNav":"GRID","productCard":"BELOW_IMAGE","footer":"COLUMNS","bottomNav":"DOT_INDICATOR","searchBar":"INLINE"}'::jsonb,
    '[]'::jsonb, '[]'::jsonb, '{}'::jsonb),

  ('beauty-soft',     'Beauty Soft',     'Ideal para cosmeticos y belleza — tonos suaves y femeninos',     ARRAY['cosmetics', 'skincare', 'beauty'], 'light', 4,
    '{}'::jsonb,
    '{"header":"GREETING_SIMPLE","hero":"FULL_BLEED","categoryNav":"HORIZONTAL_SCROLL","productCard":"BELOW_IMAGE","footer":"COMPACT","bottomNav":"FLOATING_PILL","searchBar":"INLINE"}'::jsonb,
    '[]'::jsonb, '[]'::jsonb, '{}'::jsonb),

  ('beauty-elegant',  'Beauty Elegant',  'Ideal para cosmeticos y belleza — elegancia premium',            ARRAY['luxury', 'beauty', 'jewelry'], 'light', 5,
    '{}'::jsonb,
    '{"header":"MINIMAL","hero":"CAROUSEL","categoryNav":"HORIZONTAL_SCROLL","productCard":"BELOW_IMAGE","footer":"COMPACT","bottomNav":"DOT_INDICATOR","searchBar":"ICON_TRIGGER"}'::jsonb,
    '[]'::jsonb, '[]'::jsonb, '{}'::jsonb),

  ('decor-warm',      'Decor Warm',      'Ideal para decoracion del hogar — colores calidos y acogedores', ARRAY['home decor', 'crafts', 'artisanal'], 'light', 6,
    '{}'::jsonb,
    '{"header":"DEFAULT","hero":"CONTAINED","categoryNav":"COLUMNAR","productCard":"WITH_DESCRIPTION","footer":"COLUMNS","bottomNav":"EDGE","searchBar":"INLINE"}'::jsonb,
    '[]'::jsonb, '[]'::jsonb, '{}'::jsonb),

  ('food-night',      'Food Night',      'Ideal para restaurantes, pizzerias y delivery — estetica oscura', ARRAY['restaurants', 'food', 'delivery'], 'dark',  7,
    '{}'::jsonb,
    '{"header":"DEFAULT","hero":"PROMO_CARD","categoryNav":"CHIPS","productCard":"BELOW_IMAGE","footer":"COMPACT","bottomNav":"FLOATING_PILL","searchBar":"INLINE"}'::jsonb,
    '[]'::jsonb, '[]'::jsonb, '{}'::jsonb)

ON CONFLICT (code) DO NOTHING;
