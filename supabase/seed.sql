-- ══════════════════════════════════════════════════════════════════
-- Tiendri V2 — Demo Store Seed Data (Part 1: System User + Tech Premium + Fashion)
-- ══════════════════════════════════════════════════════════════════

-- Create demo system user in auth.users
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'demo@tiendri.com',
  crypt('demo-not-for-login-2024', gen_salt('bf')),
  now(), now(), now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Demo System"}'
) ON CONFLICT (id) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════
-- STORE 1: Tech Premium — "Cyber"
-- Fixed store UUID: 10000000-0000-0000-0000-000000000001
-- ══════════════════════════════════════════════════════════════════

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  palette_id,
  payment_methods,
  onboarding_completed,
  business_info
) VALUES (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Cyber',
  'cyber-store',
  'Tu tienda de tecnología de confianza. Los mejores gadgets, smartphones y accesorios.',
  '[
    {"platform": "whatsapp", "value": "573001234567"},
    {"platform": "instagram", "value": "@cyberstore"},
    {"platform": "facebook", "value": "cyberstore"},
    {"platform": "tiktok", "value": "@cyberstore"}
  ]'::jsonb,
  (SELECT id FROM public.templates WHERE code = 'tech-premium'),
  (SELECT id FROM public.plans WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  'obsidian',
  ARRAY['efectivo', 'nequi', 'daviplata', 'tarjeta', 'transferencia']::public.payment_method[],
  true,
  '{
    "city": "Bogotá",
    "address": "Cra 7 # 32-45, Centro Comercial Tiendri",
    "hours": "Lun–Vie 8am–8pm · Sáb 9am–6pm · Dom cerrado",
    "shippingInfo": {
      "cost": 8000,
      "estimatedTime": "1–3 días hábiles en Bogotá, 2–5 días al resto del país",
      "freeAbove": 150000
    }
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- store_appearance for Cyber (tech-premium)
INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
) VALUES (
  '10000000-0000-0000-0000-000000000001',
  'obsidian',
  'minimalista',
  '{
    "colors": {
      "primary": "#000000",
      "secondary": "#211C24",
      "background": "#FAFAFA",
      "foreground": "#000000",
      "card": "#F6F6F6",
      "border": "#B5B5B5",
      "muted": "#787878",
      "accent": "#FFB547",
      "onPrimary": "#FFFFFF"
    },
    "radius": {"card": "9px", "category": "15px", "button": "8px"}
  }'::jsonb,
  '{
    "grid": {
      "products": {"mobile": 2, "desktop": 4},
      "categories": {"mobile": 3, "desktop": 6}
    },
    "cardImageRatio": "wide",
    "gridDensity": "standard",
    "spacingDensity": "normal"
  }'::jsonb,
  '{
    "header": "DEFAULT",
    "hero": "PROMO_CARD",
    "categoryNav": "HORIZONTAL_SCROLL",
    "productCard": "BELOW_IMAGE",
    "footer": "COLUMNS",
    "bottomNav": "EDGE",
    "searchBar": "INLINE"
  }'::jsonb,
  '[
    {"id": "hero", "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products", "visible": true},
    {"id": "popular", "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio", "href": "/"},
      {"label": "Catalogo", "href": "/catalogo"},
      {"label": "Info", "href": "/info"}
    ],
    "footerServices": ["Programa de bonos", "Tarjetas de regalo", "Credito y pago", "Contratos de servicio", "Cuenta sin efectivo", "Metodos de pago"],
    "footerAssistance": ["Buscar pedido", "Terminos de envio", "Cambios y devoluciones", "Garantia", "Preguntas frecuentes", "Terminos de uso"],
    "productTabs": [
      {"id": "new-arrival", "label": "Nuevos"},
      {"id": "bestseller", "label": "Mas vendidos"},
      {"id": "featured", "label": "Destacados"}
    ],
    "popularSearches": ["iPhone", "AirPods", "MacBook", "Apple Watch", "Samsung Galaxy", "iPad"],
    "productGroups": {
      "displayMode": "tabs",
      "groups": [
        {
          "id": "a0000001-0000-0000-0000-000000000001",
          "name": "Nuevos",
          "productIds": [
            "31000000-0000-0000-0000-000000000001",
            "31000000-0000-0000-0000-000000000002",
            "31000000-0000-0000-0000-000000000003",
            "31000000-0000-0000-0000-000000000004",
            "31000000-0000-0000-0000-000000000005",
            "31000000-0000-0000-0000-000000000006"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000001-0000-0000-0000-000000000002",
          "name": "Más vendidos",
          "productIds": [
            "31000000-0000-0000-0000-000000000001",
            "31000000-0000-0000-0000-000000000003",
            "31000000-0000-0000-0000-000000000004",
            "31000000-0000-0000-0000-000000000005",
            "31000000-0000-0000-0000-000000000007"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000001-0000-0000-0000-000000000003",
          "name": "Destacados",
          "productIds": [
            "31000000-0000-0000-0000-000000000001",
            "31000000-0000-0000-0000-000000000005",
            "31000000-0000-0000-0000-000000000007"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName": "Cyber",
    "description": "Tu tienda de tecnología de confianza"
  }'::jsonb
) ON CONFLICT (store_id) DO NOTHING;


-- ── Tech Premium: Categories ──────────────────────────────────────────────────
-- Fixed UUIDs pattern: 2100000000000000000000000000000{seq}

INSERT INTO public.categories (id, store_id, name, slug, icon, sort_order) VALUES
  ('21000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Teléfonos',    'telefonos',    'Smartphone', 0),
  ('21000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Relojes',      'relojes',      'Watch',      1),
  ('21000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Cámaras',      'camaras',      'Camera',     2),
  ('21000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Audífonos',    'audifonos',    'Headphones', 3),
  ('21000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 'Computadores', 'computadores', 'Monitor',    4),
  ('21000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 'Gaming',       'gaming',       'Gamepad2',   5)
ON CONFLICT (id) DO NOTHING;


-- ── Tech Premium: Products ────────────────────────────────────────────────────
-- Prices from mock data are in USD. Converting to COP at approx 4,000 COP/USD
-- rounded to nearest 1,000 (integer column, stored in pesos).
-- prod-01: $1299 USD → 5,199,000 COP  | originalPrice $1499 → 5,999,000 COP
-- prod-02: $1099 USD → 4,399,000 COP  | originalPrice $1199 → 4,799,000 COP
-- prod-03: $399 USD  → 1,599,000 COP  | originalPrice $429  → 1,719,000 COP
-- prod-04: $249 USD  → 999,000 COP    | originalPrice $279  → 1,119,000 COP
-- prod-05: $1099 USD → 4,399,000 COP  | originalPrice $1199 → 4,799,000 COP
-- prod-06: $1099 USD → 4,399,000 COP  | originalPrice $1199 → 4,799,000 COP
-- prod-07: $499 USD  → 1,999,000 COP  | originalPrice $549  → 2,199,000 COP
-- prod-08: $299 USD  → 1,199,000 COP  | originalPrice $349  → 1,399,000 COP
-- disc-01: $149 USD  → 599,000 COP    | originalPrice $229  → 919,000 COP
-- disc-02: $999 USD  → 3,999,000 COP  | originalPrice $1399 → 5,599,000 COP
-- disc-03: $1299 USD → 5,199,000 COP  | originalPrice $1699 → 6,799,000 COP
-- disc-04: $149 USD  → 599,000 COP    | originalPrice $199  → 799,000 COP

-- Fixed product UUIDs pattern: 3100000000000000000000000000000{seq}

INSERT INTO public.products (
  id, store_id, category_id,
  name, slug, subtitle, description,
  price, compare_at_price,
  available, featured, is_best_seller,
  tags, specs, stock, sort_order
) VALUES
  -- prod-01: iPhone 14 Pro Max
  (
    '31000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000001',
    'iPhone 14 Pro Max',
    'iphone-14-pro-max',
    'Pro. Beyond.',
    'Pantalla Super Retina XDR de 6.7". Chip A16 Bionic. Sistema de cámara Pro de 48 MP. Dynamic Island y Always-On Display.',
    5199000,
    5999000,
    true, true, true,
    ARRAY['_new', '_featured', 'apple', 'iphone', 'smartphone'],
    '{"Procesador": "A16 Bionic", "RAM": "6 GB", "Almacenamiento": "256 GB", "Pantalla": "6.7 OLED", "Camara": "48 MP"}'::jsonb,
    NULL,
    0
  ),
  -- prod-02: Samsung Galaxy S23 Ultra
  (
    '31000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000001',
    'Samsung Galaxy S23 Ultra',
    'samsung-galaxy-s23-ultra',
    'Galaxy AI. Ahora en tu mano.',
    'Pantalla Dynamic AMOLED 6.8". Chip Snapdragon 8 Gen 2. S Pen integrado. Cámara de 200 MP con zoom 100x Space Zoom.',
    4399000,
    4799000,
    true, true, false,
    ARRAY['_new', 'samsung', 'galaxy', 'smartphone', 'android'],
    '{"Procesador": "Snapdragon 8 Gen 2", "RAM": "12 GB", "Almacenamiento": "256 GB", "Pantalla": "6.8 AMOLED", "Camara": "200 MP"}'::jsonb,
    NULL,
    1
  ),
  -- prod-03: Apple Watch Series 9
  (
    '31000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000002',
    'Apple Watch Series 9',
    'apple-watch-series-9',
    'Más inteligente. Más brillante. Más poderoso.',
    'Chip S9 SiP de doble núcleo. Pantalla Retina siempre activa. Monitoreo de oxígeno en sangre. Resistente al agua 50m.',
    1599000,
    1719000,
    true, false, true,
    ARRAY['_new', 'apple', 'smartwatch', 'wearable'],
    '{"Chip": "S9 SiP", "Pantalla": "45mm Retina LTPO", "Resistencia": "50m WR", "Bateria": "18 horas"}'::jsonb,
    NULL,
    2
  ),
  -- prod-04: AirPods Pro (2nd Generation)
  (
    '31000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000004',
    'AirPods Pro (2a Generación)',
    'airpods-pro-2da-gen',
    'Cancelación activa de ruido. Sonido adaptativo.',
    'Cancelación activa de ruido mejorada. Audio adaptativo. Chip H2. Hasta 30h de batería total con estuche MagSafe.',
    999000,
    1119000,
    true, false, true,
    ARRAY['_new', 'apple', 'airpods', 'audifonos', 'inalambrico'],
    '{"Chip": "H2", "Cancelacion de ruido": "Activa", "Bateria": "6h / 30h con estuche", "Resistencia": "IPX4"}'::jsonb,
    NULL,
    3
  ),
  -- prod-05: MacBook Air M2
  (
    '31000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000005',
    'MacBook Air M2',
    'macbook-air-m2',
    'El más potente de todos los tiempos.',
    'Chip M2 con CPU 8 núcleos y GPU 10 núcleos. Pantalla Liquid Retina 13.6". Hasta 18h de batería. Diseño fanless silencioso.',
    4399000,
    4799000,
    true, true, true,
    ARRAY['_new', '_featured', 'apple', 'macbook', 'laptop', 'computador'],
    '{"Chip": "Apple M2", "CPU": "8 nucleos", "GPU": "10 nucleos", "RAM": "8 GB", "Almacenamiento": "256 GB SSD", "Pantalla": "13.6 Liquid Retina"}'::jsonb,
    NULL,
    4
  ),
  -- prod-06: iPad Pro 12.9"
  (
    '31000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000001',
    'iPad Pro 12.9"',
    'ipad-pro-12-9',
    'La pantalla más avanzada de cualquier iPad.',
    'Pantalla Liquid Retina XDR 12.9". Chip M2. Chip M2. Compatible con Apple Pencil (2a gen) y Magic Keyboard.',
    4399000,
    4799000,
    true, false, false,
    ARRAY['_new', 'apple', 'ipad', 'tablet'],
    '{"Chip": "Apple M2", "Pantalla": "12.9 Liquid Retina XDR", "RAM": "8 GB", "Almacenamiento": "128 GB", "Conectividad": "Wi-Fi 6E"}'::jsonb,
    NULL,
    5
  ),
  -- prod-07: PlayStation 5 Console
  (
    '31000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000006',
    'PlayStation 5 Console',
    'playstation-5-console',
    'Juega sin límites.',
    'CPU AMD Zen 2 de 8 núcleos. GPU con 10.28 TFLOPS. SSD ultra-rápido de 825 GB. Ray tracing. 4K a 120 fps.',
    1999000,
    2199000,
    false, true, true,
    ARRAY['sony', 'playstation', 'ps5', 'gaming', 'consola'],
    '{"CPU": "AMD Zen 2, 8 nucleos", "GPU": "10.28 TFLOPS RDNA 2", "Almacenamiento": "825 GB SSD", "Resolucion": "Hasta 8K", "FPS": "120 fps"}'::jsonb,
    0,
    6
  ),
  -- prod-08: Sony WH-1000XM5
  (
    '31000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000004',
    'Sony WH-1000XM5 Headphones',
    'sony-wh-1000xm5',
    'Cancela el ruido. Domina el silencio.',
    'Cancelación de ruido líder del sector. 8 micrófonos. Hasta 30h de batería. Carga rápida 3 min = 3h de reproducción.',
    1199000,
    1399000,
    true, false, false,
    ARRAY['sony', 'audifonos', 'inalambrico', 'noise-cancelling'],
    '{"Controlador": "30mm", "Cancelacion de ruido": "8 micrófonos", "Bateria": "30 horas", "Carga rapida": "3 min = 3h", "Conexion": "Bluetooth 5.2"}'::jsonb,
    NULL,
    7
  ),
  -- disc-01: Samsung Galaxy Buds2 Pro
  (
    '31000000-0000-0000-0000-000000000009',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000004',
    'Samsung Galaxy Buds2 Pro',
    'samsung-galaxy-buds2-pro',
    'ANC. Audio de alta resolución 24 bits.',
    'Cancelación activa de ruido inteligente. Audio de alta resolución 24 bits. Hasta 8h de batería. Resistente al agua IPX7.',
    599000,
    919000,
    true, false, false,
    ARRAY['_sale', 'samsung', 'audifonos', 'inalambrico', 'anc'],
    '{"ANC": "Inteligente", "Audio": "24 bits", "Bateria": "8h / 29h con estuche", "Resistencia": "IPX7"}'::jsonb,
    NULL,
    8
  ),
  -- disc-02: ASUS ROG Gaming Laptop
  (
    '31000000-0000-0000-0000-000000000010',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000006',
    'ASUS ROG Gaming Laptop',
    'asus-rog-gaming-laptop',
    'Dominá el juego.',
    'Intel Core i9. RTX 4080. Pantalla QHD 240Hz. 32 GB DDR5 RAM. 1 TB NVMe SSD. Sistema de refrigeración líquida.',
    3999000,
    5599000,
    true, false, false,
    ARRAY['_sale', 'asus', 'rog', 'gaming', 'laptop', 'computador'],
    '{"CPU": "Intel Core i9", "GPU": "NVIDIA RTX 4080", "RAM": "32 GB DDR5", "Almacenamiento": "1 TB NVMe", "Pantalla": "16 QHD 240Hz"}'::jsonb,
    NULL,
    9
  ),
  -- disc-03: Fujifilm X-T5 Camera
  (
    '31000000-0000-0000-0000-000000000011',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000003',
    'Fujifilm X-T5 Camera',
    'fujifilm-x-t5-camera',
    'Sensor 40MP. Cuerpo compacto retro.',
    'Sensor X-Trans CMOS 5 HR de 40.2 MP. Motor de imagen X-Processor 5. Estabilización de imagen 7 paradas. Video 6.2K.',
    5199000,
    6799000,
    true, false, false,
    ARRAY['_sale', 'fujifilm', 'camara', 'mirrorless', 'fotografia'],
    '{"Sensor": "40.2 MP X-Trans CMOS 5 HR", "Procesador": "X-Processor 5", "IBIS": "7 paradas", "Video": "6.2K", "Montura": "Fujifilm X"}'::jsonb,
    NULL,
    10
  ),
  -- disc-04: Xiaomi Smart Watch S3
  (
    '31000000-0000-0000-0000-000000000012',
    '10000000-0000-0000-0000-000000000001',
    '21000000-0000-0000-0000-000000000002',
    'Xiaomi Smart Watch S3',
    'xiaomi-smart-watch-s3',
    'Pantalla AMOLED. GPS dual.',
    'Pantalla AMOLED 1.43" de 466x466 px. GPS de doble frecuencia. Monitoreo de salud 24/7. Hasta 12 días de batería.',
    599000,
    799000,
    true, false, false,
    ARRAY['_sale', 'xiaomi', 'smartwatch', 'wearable'],
    '{"Pantalla": "1.43 AMOLED 466x466", "GPS": "Dual frecuencia", "Bateria": "Hasta 12 dias", "Resistencia": "5 ATM"}'::jsonb,
    NULL,
    11
  )
ON CONFLICT (id) DO NOTHING;


-- ── Tech Premium: Product Images ──────────────────────────────────────────────

INSERT INTO public.product_images (id, product_id, store_id, url, sort_order) VALUES
  -- iPhone 14 Pro Max — 4 images (uses products 0–3 from assets)
  ('41000000-0000-0000-0000-000000000001', '31000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-01.png', 0),
  ('41000000-0000-0000-0000-000000000002', '31000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-02.png', 1),
  ('41000000-0000-0000-0000-000000000003', '31000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-03.png', 2),
  ('41000000-0000-0000-0000-000000000004', '31000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-04.png', 3),
  -- Samsung Galaxy S23 Ultra
  ('41000000-0000-0000-0000-000000000005', '31000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-02.png', 0),
  -- Apple Watch Series 9
  ('41000000-0000-0000-0000-000000000006', '31000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-03.png', 0),
  -- AirPods Pro
  ('41000000-0000-0000-0000-000000000007', '31000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-04.png', 0),
  -- MacBook Air M2
  ('41000000-0000-0000-0000-000000000008', '31000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-05.png', 0),
  -- iPad Pro 12.9"
  ('41000000-0000-0000-0000-000000000009', '31000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-06.png', 0),
  -- PlayStation 5
  ('41000000-0000-0000-0000-000000000010', '31000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-07.png', 0),
  -- Sony WH-1000XM5
  ('41000000-0000-0000-0000-000000000011', '31000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/product-08.png', 0),
  -- Samsung Galaxy Buds2 Pro
  ('41000000-0000-0000-0000-000000000012', '31000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/discount-01.png', 0),
  -- ASUS ROG Gaming Laptop
  ('41000000-0000-0000-0000-000000000013', '31000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/discount-02.png', 0),
  -- Fujifilm X-T5
  ('41000000-0000-0000-0000-000000000014', '31000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/discount-03.png', 0),
  -- Xiaomi Smart Watch S3
  ('41000000-0000-0000-0000-000000000015', '31000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000001', '/mocks/tech-premium/discount-04.png', 0)
ON CONFLICT (id) DO NOTHING;


-- ── Tech Premium: Product Variants ────────────────────────────────────────────
-- iPhone 14 Pro Max — colors (price modifier = 0, same base price across colors)
-- Storage variants carry a price modifier

INSERT INTO public.product_variants (id, product_id, name, price_modifier, type, metadata) VALUES
  -- iPhone 14 Pro Max — storage variants
  ('51000000-0000-0000-0000-000000000001', '31000000-0000-0000-0000-000000000001', '128 GB',  0,      'storage', '{"label": "128GB", "order": 1}'),
  ('51000000-0000-0000-0000-000000000002', '31000000-0000-0000-0000-000000000001', '256 GB',  200000, 'storage', '{"label": "256GB", "order": 2}'),
  ('51000000-0000-0000-0000-000000000003', '31000000-0000-0000-0000-000000000001', '512 GB',  500000, 'storage', '{"label": "512GB", "order": 3}'),
  ('51000000-0000-0000-0000-000000000004', '31000000-0000-0000-0000-000000000001', '1 TB',    900000, 'storage', '{"label": "1TB",   "order": 4}'),
  -- Samsung Galaxy S23 Ultra — storage variants
  ('51000000-0000-0000-0000-000000000005', '31000000-0000-0000-0000-000000000002', '256 GB',  0,      'storage', '{"label": "256GB", "order": 1}'),
  ('51000000-0000-0000-0000-000000000006', '31000000-0000-0000-0000-000000000002', '512 GB',  400000, 'storage', '{"label": "512GB", "order": 2}'),
  -- Apple Watch Series 9 — size variants (mm)
  ('51000000-0000-0000-0000-000000000007', '31000000-0000-0000-0000-000000000003', '41 mm',   0,      'size',    '{"label": "41mm",  "order": 1}'),
  ('51000000-0000-0000-0000-000000000008', '31000000-0000-0000-0000-000000000003', '45 mm',   100000, 'size',    '{"label": "45mm",  "order": 2}'),
  -- MacBook Air M2 — storage configs (treated as storage type)
  ('51000000-0000-0000-0000-000000000009', '31000000-0000-0000-0000-000000000005', '8 GB RAM / 256 GB SSD',  0,      'storage', '{"label": "8GB/256GB",  "order": 1}'),
  ('51000000-0000-0000-0000-000000000010', '31000000-0000-0000-0000-000000000005', '8 GB RAM / 512 GB SSD',  400000, 'storage', '{"label": "8GB/512GB",  "order": 2}'),
  ('51000000-0000-0000-0000-000000000011', '31000000-0000-0000-0000-000000000005', '16 GB RAM / 512 GB SSD', 900000, 'storage', '{"label": "16GB/512GB", "order": 3}'),
  -- iPad Pro 12.9" — storage variants
  ('51000000-0000-0000-0000-000000000012', '31000000-0000-0000-0000-000000000006', '128 GB Wi-Fi', 0,      'storage', '{"label": "128GB", "order": 1}'),
  ('51000000-0000-0000-0000-000000000013', '31000000-0000-0000-0000-000000000006', '256 GB Wi-Fi', 400000, 'storage', '{"label": "256GB", "order": 2}'),
  ('51000000-0000-0000-0000-000000000014', '31000000-0000-0000-0000-000000000006', '512 GB Wi-Fi', 900000, 'storage', '{"label": "512GB", "order": 3}')
ON CONFLICT (id) DO NOTHING;


-- ══════════════════════════════════════════════════════════════════
-- STORE 2: Fashion — "Moda Élite"
-- Fixed store UUID: 10000000-0000-0000-0000-000000000002
-- ══════════════════════════════════════════════════════════════════

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  palette_id,
  payment_methods,
  onboarding_completed,
  business_info
) VALUES (
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Moda Élite',
  'moda-elite',
  'Tu destino de moda en Colombia. Ropa de calidad premium para toda la familia.',
  '[
    {"platform": "whatsapp", "value": "573001234567"},
    {"platform": "instagram", "value": "@modaelite"},
    {"platform": "facebook", "value": "modaelite"},
    {"platform": "tiktok", "value": "@modaelite"}
  ]'::jsonb,
  (SELECT id FROM public.templates WHERE code = 'fashion'),
  (SELECT id FROM public.plans WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  NULL,
  ARRAY['efectivo', 'nequi', 'daviplata', 'tarjeta']::public.payment_method[],
  true,
  '{
    "city": "Bogotá",
    "address": "Zona T, Cra 13 # 82-74",
    "hours": "Lun–Sáb 9am–7pm · Dom 10am–4pm",
    "shippingInfo": {
      "estimatedTime": "Bogotá y Medellín 1–2 días. Resto del país 3–5 días hábiles",
      "freeAbove": 200000
    }
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- store_appearance for Moda Élite (fashion)
INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
) VALUES (
  '10000000-0000-0000-0000-000000000002',
  NULL,
  'elegante',
  '{
    "colors": {
      "primary": "#000000",
      "secondary": "#D9D9D9",
      "background": "#F5F5F0",
      "foreground": "#000000",
      "card": "#FFFFFF",
      "border": "#D9D9D9",
      "muted": "#8A8A8A",
      "accent": "#000000",
      "onPrimary": "#FFFFFF"
    },
    "radius": {"card": "0px", "category": "0px", "button": "0px"}
  }'::jsonb,
  '{
    "grid": {
      "products": {"mobile": 2, "desktop": 4},
      "categories": {"mobile": 2, "desktop": 4}
    },
    "cardImageRatio": "portrait",
    "gridDensity": "compact",
    "spacingDensity": "airy",
    "imageFit": "cover"
  }'::jsonb,
  '{
    "header": "GLASS",
    "hero": "EDITORIAL",
    "categoryNav": "HORIZONTAL_SCROLL",
    "productCard": "BELOW_IMAGE",
    "footer": "COLUMNS",
    "bottomNav": "EDGE",
    "searchBar": "INLINE"
  }'::jsonb,
  '[
    {"id": "hero", "visible": true},
    {"id": "featured", "visible": true},
    {"id": "products", "visible": true},
    {"id": "editorial", "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "INICIO", "href": "/"},
      {"label": "CATALOGO", "href": "/catalogo"},
      {"label": "INFO", "href": "/info"}
    ],
    "footerServices": ["Guia de tallas", "Tarjetas de regalo", "Programa de lealtad", "Cuotas sin interes", "Metodos de pago", "Envio express"],
    "footerAssistance": ["Rastrear pedido", "Politica de envios", "Cambios y devoluciones", "Cuidado de prendas", "Preguntas frecuentes", "Terminos y condiciones"],
    "productTabs": [
      {"id": "new-arrival", "label": "Nueva Coleccion"},
      {"id": "bestseller", "label": "Mas Vendidos"},
      {"id": "featured", "label": "Destacados"}
    ],
    "popularSearches": ["Camiseta negra", "Vestido midi", "Blazer mujer", "Pantalon slim", "Chaqueta oversize", "Accesorios"],
    "productGroups": {
      "displayMode": "tabs",
      "groups": [
        {
          "id": "a0000002-0000-0000-0000-000000000001",
          "name": "Nueva Colección",
          "productIds": [
            "32000000-0000-0000-0000-000000000001",
            "32000000-0000-0000-0000-000000000002",
            "32000000-0000-0000-0000-000000000003",
            "32000000-0000-0000-0000-000000000004",
            "32000000-0000-0000-0000-000000000005",
            "32000000-0000-0000-0000-000000000006"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000002-0000-0000-0000-000000000002",
          "name": "Más Vendidos",
          "productIds": [
            "32000000-0000-0000-0000-000000000001",
            "32000000-0000-0000-0000-000000000002",
            "32000000-0000-0000-0000-000000000003",
            "32000000-0000-0000-0000-000000000008"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000002-0000-0000-0000-000000000003",
          "name": "Destacados",
          "productIds": [
            "32000000-0000-0000-0000-000000000003",
            "32000000-0000-0000-0000-000000000004",
            "32000000-0000-0000-0000-000000000001"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName": "Moda Élite",
    "description": "Tu destino de moda en Colombia"
  }'::jsonb
) ON CONFLICT (store_id) DO NOTHING;


-- ── Fashion: Categories ───────────────────────────────────────────────────────
-- Fixed UUIDs pattern: 22000000-0000-0000-0000-00000000000{seq}

INSERT INTO public.categories (id, store_id, name, slug, icon, sort_order) VALUES
  ('22000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Hombres',    'hombres',    'User',      0),
  ('22000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Mujeres',    'mujeres',    'UserRound', 1),
  ('22000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'Niños',      'ninos',      'Baby',      2),
  ('22000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'Accesorios', 'accesorios', 'Gem',       3)
ON CONFLICT (id) DO NOTHING;


-- ── Fashion: Products ─────────────────────────────────────────────────────────
-- Prices are already in COP (integer pesos) — used as-is.
-- Fixed product UUIDs pattern: 32000000-0000-0000-0000-00000000000{seq}

INSERT INTO public.products (
  id, store_id, category_id,
  name, slug, subtitle, description,
  price, compare_at_price,
  available, featured, is_best_seller,
  tags, specs, stock, sort_order
) VALUES
  -- prod-01: Camiseta Hombre
  (
    '32000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000001',
    'Camiseta Hombre',
    'camiseta-basica-premium',
    'Camiseta Básica Premium',
    'Confeccionada en algodón 100% peinado de 220 g/m², con corte recto y acabados que resisten el paso del tiempo.',
    89900,
    119900,
    true, true, true,
    ARRAY['_new', '_featured', 'camiseta', 'hombre', 'basico', 'algodon'],
    '{"Material": "Algodón 100% peinado", "Gramaje": "220 g/m2", "Corte": "Recto", "Cuidado": "Lavado a maquina 30°C"}'::jsonb,
    NULL,
    0
  ),
  -- prod-02: Pantalón Hombre
  (
    '32000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000001',
    'Pantalón Hombre',
    'pantalon-slim-fit-negro',
    'Slim Fit Negro',
    'Pantalón slim fit de tela premium anti-arrugas. Corte moderno que estiliza la figura. Perfecto para el día a día.',
    129900,
    159900,
    true, false, true,
    ARRAY['_new', 'pantalon', 'hombre', 'slim-fit', 'negro'],
    '{"Material": "97% Algodón, 3% Elastano", "Corte": "Slim Fit", "Cierre": "Cremallera YKK", "Cuidado": "Lavado a maquina 30°C"}'::jsonb,
    NULL,
    1
  ),
  -- prod-03: Vestido Mujer
  (
    '32000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000002',
    'Vestido Mujer',
    'vestido-midi-elegante',
    'Midi Elegante',
    'Vestido midi de silueta fluida. Tela viscosa de alta calidad. Ideal para ocasiones formales y semiformales.',
    179900,
    229900,
    true, true, true,
    ARRAY['_new', '_featured', 'vestido', 'mujer', 'midi', 'elegante'],
    '{"Material": "100% Viscosa", "Largo": "Midi (rodilla +15 cm)", "Cierre": "Cremallera invisible", "Cuidado": "Lavado a mano o en seco"}'::jsonb,
    NULL,
    2
  ),
  -- prod-04: Chaqueta Mujer
  (
    '32000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000002',
    'Chaqueta Mujer',
    'chaqueta-oversize-minimalista',
    'Oversize Minimalista',
    'Chaqueta oversize de mezcla de lana. Silueta relajada y contemporánea. Bolsillos laterales. Cuello solapa.',
    249900,
    299900,
    true, true, false,
    ARRAY['_new', 'chaqueta', 'mujer', 'oversize', 'minimalista'],
    '{"Material": "70% Lana, 30% Poliéster", "Corte": "Oversize", "Bolsillos": "2 laterales", "Cuidado": "Solo en seco"}'::jsonb,
    NULL,
    3
  ),
  -- prod-05: Camisa Hombre
  (
    '32000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000001',
    'Camisa Hombre',
    'camisa-oxford-clasica',
    'Oxford Clásica',
    'Camisa Oxford de algodón puro. Tejido resistente y de fácil planchado. Cuello button-down. Corte regular fit.',
    119900,
    NULL,
    true, false, false,
    ARRAY['_new', 'camisa', 'hombre', 'oxford', 'clasica'],
    '{"Material": "100% Algodón Oxford", "Corte": "Regular Fit", "Cuello": "Button-Down", "Cuidado": "Lavado a maquina 40°C"}'::jsonb,
    NULL,
    4
  ),
  -- prod-06: Falda Mujer
  (
    '32000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000002',
    'Falda Mujer',
    'falda-plisada-midi',
    'Plisada Midi',
    'Falda plisada midi en tela satinada. Cintura elástica. Caída perfecta y movimiento elegante.',
    109900,
    139900,
    true, false, false,
    ARRAY['_new', 'falda', 'mujer', 'plisada', 'midi'],
    '{"Material": "100% Poliéster Satinado", "Largo": "Midi", "Cintura": "Elastica", "Cuidado": "Lavado a mano"}'::jsonb,
    NULL,
    5
  ),
  -- prod-07: Conjunto Niños
  (
    '32000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000003',
    'Conjunto Niños',
    'conjunto-deportivo-nino',
    'Deportivo Niño',
    'Conjunto deportivo para niños en tela técnica transpirable. Incluye chaqueta y pantalón. Tallas 4 a 14 años.',
    79900,
    99900,
    false, false, false,
    ARRAY['ninos', 'deportivo', 'conjunto', 'infantil'],
    '{"Material": "90% Poliéster, 10% Elastano", "Incluye": "Chaqueta + pantalon", "Tallas": "4–14 años", "Cuidado": "Lavado a maquina 30°C"}'::jsonb,
    0,
    6
  ),
  -- prod-08: Bolso Accesorio
  (
    '32000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000004',
    'Bolso Accesorio',
    'bolso-tote-minimalista',
    'Tote Minimalista',
    'Bolso tote de cuero vegano. Capacidad para laptop 13". Asas reforzadas. Interior con bolsillo con cremallera.',
    159900,
    189900,
    true, false, true,
    ARRAY['_new', 'bolso', 'tote', 'accesorio', 'cuero-vegano'],
    '{"Material": "Cuero vegano PU", "Dimensiones": "40 x 35 x 12 cm", "Capacidad": "Laptop 13\"", "Interior": "Bolsillo con cremallera"}'::jsonb,
    NULL,
    7
  ),
  -- disc-01: Blazer Estructurado Negro
  (
    '32000000-0000-0000-0000-000000000009',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000002',
    'Blazer Estructurado Negro',
    'blazer-estructurado-negro',
    'Elegancia sin esfuerzo',
    'Blazer estructurado de mezcla de lana. Hombreras suaves. Forro interior completo. Dos botones frontales.',
    199900,
    289900,
    true, false, false,
    ARRAY['_sale', 'blazer', 'mujer', 'negro', 'estructurado'],
    '{"Material": "65% Lana, 35% Poliéster", "Forro": "Completo", "Botones": "2 frontales", "Cuidado": "Solo en seco"}'::jsonb,
    NULL,
    8
  ),
  -- disc-02: Pantalón Cargo Unisex
  (
    '32000000-0000-0000-0000-000000000010',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000001',
    'Pantalón Cargo Unisex',
    'pantalon-cargo-unisex',
    'Estilo urbano versátil',
    'Pantalón cargo unisex de algodón. 6 bolsillos funcionales. Cordón ajustable en cintura y tobillo. Corte relaxed.',
    109900,
    149900,
    true, false, false,
    ARRAY['_sale', 'pantalon', 'cargo', 'unisex', 'urbano'],
    '{"Material": "100% Algodón", "Bolsillos": "6 funcionales", "Corte": "Relaxed", "Cuidado": "Lavado a maquina 30°C"}'::jsonb,
    NULL,
    9
  ),
  -- disc-03: Vestido Maxi Fluido
  (
    '32000000-0000-0000-0000-000000000011',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000002',
    'Vestido Maxi Fluido',
    'vestido-maxi-fluido',
    'Elegancia sin límites',
    'Vestido maxi de tela fluida. Largo hasta el tobillo. Escote en V. Manga corta acampanada. Lavado a mano.',
    139900,
    199900,
    true, false, false,
    ARRAY['_sale', 'vestido', 'maxi', 'mujer', 'fluido'],
    '{"Material": "100% Viscosa", "Largo": "Maxi (hasta el tobillo)", "Escote": "V", "Cuidado": "Lavado a mano"}'::jsonb,
    NULL,
    10
  ),
  -- disc-04: Gorra Dad Hat Negra
  (
    '32000000-0000-0000-0000-000000000012',
    '10000000-0000-0000-0000-000000000002',
    '22000000-0000-0000-0000-000000000004',
    'Gorra Dad Hat Negra',
    'gorra-dad-hat-negra',
    'El accesorio que lo completa todo',
    'Gorra dad hat de algodón no estructurado. Visera curva. Ajuste trasero con hebilla metálica. Talla única.',
    49900,
    69900,
    true, false, false,
    ARRAY['_sale', 'gorra', 'accesorio', 'unisex', 'dad-hat'],
    '{"Material": "100% Algodón", "Estructura": "No estructurada", "Ajuste": "Hebilla metalica", "Talla": "Unica"}'::jsonb,
    NULL,
    11
  )
ON CONFLICT (id) DO NOTHING;


-- ── Fashion: Product Images ───────────────────────────────────────────────────

INSERT INTO public.product_images (id, product_id, store_id, url, sort_order) VALUES
  -- Camiseta Hombre — 4 images (detail view uses products[0-2] + detailMain)
  ('42000000-0000-0000-0000-000000000001', '32000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-1.png', 0),
  ('42000000-0000-0000-0000-000000000002', '32000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-2.png', 1),
  ('42000000-0000-0000-0000-000000000003', '32000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-3.png', 2),
  ('42000000-0000-0000-0000-000000000004', '32000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/detail-main.png', 3),
  -- Pantalón Hombre
  ('42000000-0000-0000-0000-000000000005', '32000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-2.png', 0),
  -- Vestido Mujer
  ('42000000-0000-0000-0000-000000000006', '32000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-3.png', 0),
  -- Chaqueta Mujer (uses listing-1)
  ('42000000-0000-0000-0000-000000000007', '32000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-1.png', 0),
  -- Camisa Hombre (uses listing-2)
  ('42000000-0000-0000-0000-000000000008', '32000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-2.png', 0),
  -- Falda Mujer (uses listing-3)
  ('42000000-0000-0000-0000-000000000009', '32000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-3.png', 0),
  -- Conjunto Niños (uses listing-4)
  ('42000000-0000-0000-0000-000000000010', '32000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-4.png', 0),
  -- Bolso Accesorio (uses product-1)
  ('42000000-0000-0000-0000-000000000011', '32000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-1.png', 0),
  -- Blazer Estructurado Negro (uses listing-2)
  ('42000000-0000-0000-0000-000000000012', '32000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-2.png', 0),
  -- Pantalón Cargo Unisex (uses listing-3)
  ('42000000-0000-0000-0000-000000000013', '32000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-3.png', 0),
  -- Vestido Maxi Fluido (uses listing-4)
  ('42000000-0000-0000-0000-000000000014', '32000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/listing-4.png', 0),
  -- Gorra Dad Hat Negra (uses product-1)
  ('42000000-0000-0000-0000-000000000015', '32000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000002', '/mocks/fashion/product-1.png', 0)
ON CONFLICT (id) DO NOTHING;


-- ── Fashion: Product Variants ─────────────────────────────────────────────────
-- Size variants for clothing. Price modifier = 0 (same price across sizes).
-- Colors are stored in store_appearance / UI layer, not as DB variants.

INSERT INTO public.product_variants (id, product_id, name, price_modifier, type, metadata) VALUES
  -- Camiseta Hombre — tallas
  ('52000000-0000-0000-0000-000000000001', '32000000-0000-0000-0000-000000000001', 'XS',  0, 'size', '{"label": "XS",  "order": 1}'),
  ('52000000-0000-0000-0000-000000000002', '32000000-0000-0000-0000-000000000001', 'S',   0, 'size', '{"label": "S",   "order": 2}'),
  ('52000000-0000-0000-0000-000000000003', '32000000-0000-0000-0000-000000000001', 'M',   0, 'size', '{"label": "M",   "order": 3}'),
  ('52000000-0000-0000-0000-000000000004', '32000000-0000-0000-0000-000000000001', 'L',   0, 'size', '{"label": "L",   "order": 4}'),
  ('52000000-0000-0000-0000-000000000005', '32000000-0000-0000-0000-000000000001', 'XL',  0, 'size', '{"label": "XL",  "order": 5}'),
  ('52000000-0000-0000-0000-000000000006', '32000000-0000-0000-0000-000000000001', 'XXL', 0, 'size', '{"label": "XXL", "order": 6}'),
  -- Pantalón Hombre — tallas numéricas
  ('52000000-0000-0000-0000-000000000007', '32000000-0000-0000-0000-000000000002', '28', 0, 'size', '{"label": "28", "order": 28}'),
  ('52000000-0000-0000-0000-000000000008', '32000000-0000-0000-0000-000000000002', '30', 0, 'size', '{"label": "30", "order": 30}'),
  ('52000000-0000-0000-0000-000000000009', '32000000-0000-0000-0000-000000000002', '32', 0, 'size', '{"label": "32", "order": 32}'),
  ('52000000-0000-0000-0000-000000000010', '32000000-0000-0000-0000-000000000002', '34', 0, 'size', '{"label": "34", "order": 34}'),
  ('52000000-0000-0000-0000-000000000011', '32000000-0000-0000-0000-000000000002', '36', 0, 'size', '{"label": "36", "order": 36}'),
  -- Vestido Mujer — tallas
  ('52000000-0000-0000-0000-000000000012', '32000000-0000-0000-0000-000000000003', 'XS', 0, 'size', '{"label": "XS", "order": 1}'),
  ('52000000-0000-0000-0000-000000000013', '32000000-0000-0000-0000-000000000003', 'S',  0, 'size', '{"label": "S",  "order": 2}'),
  ('52000000-0000-0000-0000-000000000014', '32000000-0000-0000-0000-000000000003', 'M',  0, 'size', '{"label": "M",  "order": 3}'),
  ('52000000-0000-0000-0000-000000000015', '32000000-0000-0000-0000-000000000003', 'L',  0, 'size', '{"label": "L",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000016', '32000000-0000-0000-0000-000000000003', 'XL', 0, 'size', '{"label": "XL", "order": 5}'),
  -- Chaqueta Mujer — tallas
  ('52000000-0000-0000-0000-000000000017', '32000000-0000-0000-0000-000000000004', 'S',  0, 'size', '{"label": "S",  "order": 2}'),
  ('52000000-0000-0000-0000-000000000018', '32000000-0000-0000-0000-000000000004', 'M',  0, 'size', '{"label": "M",  "order": 3}'),
  ('52000000-0000-0000-0000-000000000019', '32000000-0000-0000-0000-000000000004', 'L',  0, 'size', '{"label": "L",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000020', '32000000-0000-0000-0000-000000000004', 'XL', 0, 'size', '{"label": "XL", "order": 5}'),
  -- Camisa Hombre — tallas
  ('52000000-0000-0000-0000-000000000021', '32000000-0000-0000-0000-000000000005', 'S',   0, 'size', '{"label": "S",   "order": 2}'),
  ('52000000-0000-0000-0000-000000000022', '32000000-0000-0000-0000-000000000005', 'M',   0, 'size', '{"label": "M",   "order": 3}'),
  ('52000000-0000-0000-0000-000000000023', '32000000-0000-0000-0000-000000000005', 'L',   0, 'size', '{"label": "L",   "order": 4}'),
  ('52000000-0000-0000-0000-000000000024', '32000000-0000-0000-0000-000000000005', 'XL',  0, 'size', '{"label": "XL",  "order": 5}'),
  ('52000000-0000-0000-0000-000000000025', '32000000-0000-0000-0000-000000000005', 'XXL', 0, 'size', '{"label": "XXL", "order": 6}'),
  -- Falda Mujer — tallas
  ('52000000-0000-0000-0000-000000000026', '32000000-0000-0000-0000-000000000006', 'XS', 0, 'size', '{"label": "XS", "order": 1}'),
  ('52000000-0000-0000-0000-000000000027', '32000000-0000-0000-0000-000000000006', 'S',  0, 'size', '{"label": "S",  "order": 2}'),
  ('52000000-0000-0000-0000-000000000028', '32000000-0000-0000-0000-000000000006', 'M',  0, 'size', '{"label": "M",  "order": 3}'),
  ('52000000-0000-0000-0000-000000000029', '32000000-0000-0000-0000-000000000006', 'L',  0, 'size', '{"label": "L",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000030', '32000000-0000-0000-0000-000000000006', 'XL', 0, 'size', '{"label": "XL", "order": 5}'),
  -- Conjunto Niños — tallas por edad
  ('52000000-0000-0000-0000-000000000031', '32000000-0000-0000-0000-000000000007', '4 años',  0, 'size', '{"label": "4 años",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000032', '32000000-0000-0000-0000-000000000007', '6 años',  0, 'size', '{"label": "6 años",  "order": 6}'),
  ('52000000-0000-0000-0000-000000000033', '32000000-0000-0000-0000-000000000007', '8 años',  0, 'size', '{"label": "8 años",  "order": 8}'),
  ('52000000-0000-0000-0000-000000000034', '32000000-0000-0000-0000-000000000007', '10 años', 0, 'size', '{"label": "10 años", "order": 10}'),
  ('52000000-0000-0000-0000-000000000035', '32000000-0000-0000-0000-000000000007', '12 años', 0, 'size', '{"label": "12 años", "order": 12}'),
  ('52000000-0000-0000-0000-000000000036', '32000000-0000-0000-0000-000000000007', '14 años', 0, 'size', '{"label": "14 años", "order": 14}'),
  -- Blazer Estructurado Negro — tallas
  ('52000000-0000-0000-0000-000000000037', '32000000-0000-0000-0000-000000000009', 'XS', 0, 'size', '{"label": "XS", "order": 1}'),
  ('52000000-0000-0000-0000-000000000038', '32000000-0000-0000-0000-000000000009', 'S',  0, 'size', '{"label": "S",  "order": 2}'),
  ('52000000-0000-0000-0000-000000000039', '32000000-0000-0000-0000-000000000009', 'M',  0, 'size', '{"label": "M",  "order": 3}'),
  ('52000000-0000-0000-0000-000000000040', '32000000-0000-0000-0000-000000000009', 'L',  0, 'size', '{"label": "L",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000041', '32000000-0000-0000-0000-000000000009', 'XL', 0, 'size', '{"label": "XL", "order": 5}'),
  -- Pantalón Cargo Unisex — tallas
  ('52000000-0000-0000-0000-000000000042', '32000000-0000-0000-0000-000000000010', 'S',  0, 'size', '{"label": "S",  "order": 2}'),
  ('52000000-0000-0000-0000-000000000043', '32000000-0000-0000-0000-000000000010', 'M',  0, 'size', '{"label": "M",  "order": 3}'),
  ('52000000-0000-0000-0000-000000000044', '32000000-0000-0000-0000-000000000010', 'L',  0, 'size', '{"label": "L",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000045', '32000000-0000-0000-0000-000000000010', 'XL', 0, 'size', '{"label": "XL", "order": 5}'),
  -- Vestido Maxi Fluido — tallas
  ('52000000-0000-0000-0000-000000000046', '32000000-0000-0000-0000-000000000011', 'XS', 0, 'size', '{"label": "XS", "order": 1}'),
  ('52000000-0000-0000-0000-000000000047', '32000000-0000-0000-0000-000000000011', 'S',  0, 'size', '{"label": "S",  "order": 2}'),
  ('52000000-0000-0000-0000-000000000048', '32000000-0000-0000-0000-000000000011', 'M',  0, 'size', '{"label": "M",  "order": 3}'),
  ('52000000-0000-0000-0000-000000000049', '32000000-0000-0000-0000-000000000011', 'L',  0, 'size', '{"label": "L",  "order": 4}'),
  ('52000000-0000-0000-0000-000000000050', '32000000-0000-0000-0000-000000000011', 'XL', 0, 'size', '{"label": "XL", "order": 5}')
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════
-- END OF SEED PART 1
-- ══════════════════════════════════════════════════════════════════
-- ── Seed Part 2: Demo stores — furniture-dark + furniture-light ───────────────
-- Depends on seed-1.sql (demo user 00000000-0000-0000-0000-000000000001 must exist)
-- Idempotent: all inserts use ON CONFLICT DO NOTHING
-- ─────────────────────────────────────────────────────────────────────────────

-- ═══════════════════════════════════════════════════════════════════════════════
-- TEMPLATE: furniture-dark
-- Store UUID : 10000000-0000-0000-0000-000000000003
-- Currency   : COP
-- ═══════════════════════════════════════════════════════════════════════════════

-- ── 1. stores ─────────────────────────────────────────────────────────────────

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  onboarding_completed,
  business_info
) VALUES (
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'Akshan Home',
  'demo-furniture-dark',
  'Muebles y decoración de calidad para tu hogar.',
  '[
    {"platform": "whatsapp",  "value": "573001234567"},
    {"platform": "instagram", "value": "@akshanhome"},
    {"platform": "facebook",  "value": "akshanhome"}
  ]'::jsonb,
  (SELECT id FROM public.templates  WHERE code = 'furniture-dark'),
  (SELECT id FROM public.plans      WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  true,
  '{
    "hours": "Lun–Vie 9am–6pm · Sáb 10am–4pm",
    "shippingInfo": {
      "description": "Entrega e instalación incluida en Bogotá. Envío nacional 4–7 días hábiles."
    },
    "paymentMethods": ["Efectivo", "Nequi", "Daviplata", "Tarjeta débito/crédito", "Crédito 6 cuotas"]
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ── 2. store_appearance ───────────────────────────────────────────────────────

INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
) VALUES (
  '10000000-0000-0000-0000-000000000003',
  NULL,
  'minimalista',
  '{}'::jsonb,
  '{}'::jsonb,
  -- Template defaults: header=GREETING, hero=SPLIT, categoryNav=HORIZONTAL_SCROLL, etc.
  '{}'::jsonb,
  '[
    {"id": "hero",       "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products",   "visible": true},
    {"id": "popular",    "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio",   "href": "/"},
      {"label": "Catálogo", "href": "/catalogo"},
      {"label": "Info",     "href": "/info"}
    ],
    "popularSearches": ["Sofás", "Mesas", "Sillas", "Camas", "Armarios"],
    "productTabs": [
      {"id": "new-arrival", "label": "Nuevos"},
      {"id": "bestseller",  "label": "Más vendidos"},
      {"id": "featured",    "label": "Destacados"}
    ],
    "productGroups": {
      "displayMode": "stacked",
      "groups": [
        {
          "id": "a0000003-0000-0000-0000-000000000001",
          "name": "Sala de Estar",
          "productIds": [
            "30000000-0000-0000-0003-000000000001",
            "30000000-0000-0000-0003-000000000002",
            "30000000-0000-0000-0003-000000000007",
            "30000000-0000-0000-0003-000000000008",
            "30000000-0000-0000-0003-000000000009"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000003-0000-0000-0000-000000000002",
          "name": "Comedor",
          "productIds": [
            "30000000-0000-0000-0003-000000000004",
            "30000000-0000-0000-0003-000000000005",
            "30000000-0000-0000-0003-000000000003"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000003-0000-0000-0000-000000000003",
          "name": "Dormitorio",
          "productIds": [
            "30000000-0000-0000-0003-000000000006",
            "30000000-0000-0000-0003-000000000003"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName":   "Akshan Home",
    "description": "Muebles y decoración de calidad para tu hogar."
  }'::jsonb
)
ON CONFLICT (store_id) DO NOTHING;

-- ── 3. categories — furniture-dark ───────────────────────────────────────────
-- UUID pattern: 20000000-0000-0000-0003-{seq:012}

INSERT INTO public.categories (id, store_id, name, slug, image, icon, sort_order) VALUES
  ('20000000-0000-0000-0003-000000000001', '10000000-0000-0000-0000-000000000003', 'Sala',            'sala',             '/mocks/furniture-dark/category-living-room.jpg', 'Sofa',        0),
  ('20000000-0000-0000-0003-000000000002', '10000000-0000-0000-0000-000000000003', 'Dormitorio',      'dormitorio',       '/mocks/furniture-dark/category-bedroom.jpg',     'BedDouble',   1),
  ('20000000-0000-0000-0003-000000000003', '10000000-0000-0000-0000-000000000003', 'Comedor',         'comedor',          '/mocks/furniture-dark/category-dining.jpg',      'UtensilsCrossed', 2),
  ('20000000-0000-0000-0003-000000000004', '10000000-0000-0000-0000-000000000003', 'Oficina',         'oficina',          '/mocks/furniture-dark/category-office.jpg',      'Briefcase',   3),
  ('20000000-0000-0000-0003-000000000005', '10000000-0000-0000-0000-000000000003', 'Exterior',        'exterior',         '/mocks/furniture-dark/category-outdoor.jpg',     'TreePalm',    4),
  ('20000000-0000-0000-0003-000000000006', '10000000-0000-0000-0000-000000000003', 'Almacenamiento',  'almacenamiento',   '/mocks/furniture-dark/category-storage.jpg',     'Archive',     5)
ON CONFLICT (id) DO NOTHING;

-- ── 4. products — furniture-dark ──────────────────────────────────────────────
-- UUID pattern: 30000000-0000-0000-0003-{seq:012}
-- category_id references: sala=...0001, dormitorio=...0002, comedor=...0003, almacenamiento=...0006

INSERT INTO public.products (
  id, store_id, category_id,
  name, slug, description,
  price, compare_at_price,
  available, featured, is_best_seller,
  tags, sort_order
) VALUES
  -- Deep Seat Sofa (sala) — best-seller
  (
    '30000000-0000-0000-0003-000000000001',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000001',
    'Deep Seat Sofa', 'deep-seat-sofa',
    'Sofá de asiento profundo con tapizado premium en tela bouclé. Ideal para salas grandes con estilo contemporáneo.',
    1200000, 1500000,
    true, false, true,
    ARRAY['_new', '_popular'], 0
  ),
  -- Rivera Corner Sofa (sala) — best-seller
  (
    '30000000-0000-0000-0003-000000000002',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000001',
    'Rivera Corner Sofa', 'rivera-corner-sofa',
    'Sofá esquinero Rivera con tapizado en cuero sintético. Máximo confort para tu sala de estar.',
    2100000, NULL,
    true, false, true,
    ARRAY['_popular'], 1
  ),
  -- Oak Storage Cabinet (almacenamiento) — featured
  (
    '30000000-0000-0000-0003-000000000003',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000006',
    'Oak Storage Cabinet', 'oak-storage-cabinet',
    'Gabinete de almacenamiento en madera de roble maciza. Diseño escandinavo con puertas corredizas.',
    680000, 850000,
    true, true, false,
    ARRAY['_sale'], 2
  ),
  -- Solid Wood Dining Table (comedor) — featured
  (
    '30000000-0000-0000-0003-000000000004',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000003',
    'Solid Wood Dining Table', 'solid-wood-dining-table',
    'Mesa de comedor en madera maciza con acabado natural. Disponible para 6 y 8 personas.',
    950000, NULL,
    true, true, false,
    ARRAY['_featured'], 3
  ),
  -- Dining Chair Set (comedor) — featured
  (
    '30000000-0000-0000-0003-000000000005',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000003',
    'Dining Chair Set (x2)', 'dining-chair-set',
    'Set de 2 sillas de comedor con asiento acolchado y patas de metal matte. Elegante y ergonómica.',
    380000, 480000,
    true, true, false,
    ARRAY['_sale', '_featured'], 4
  ),
  -- Floating Nightstand (dormitorio)
  (
    '30000000-0000-0000-0003-000000000006',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000002',
    'Floating Nightstand', 'floating-nightstand',
    'Mesita de noche flotante en MDF con acabado mate. Con cajón y estante abierto. Fácil instalación.',
    220000, NULL,
    true, false, false,
    ARRAY['_new'], 5
  ),
  -- Swivel Accent Chair (sala) — best-seller
  (
    '30000000-0000-0000-0003-000000000007',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000001',
    'Swivel Accent Chair', 'swivel-accent-chair',
    'Silla giratoria de acento con base dorada y tapizado en terciopelo. Un toque de lujo para cualquier espacio.',
    540000, 660000,
    true, false, true,
    ARRAY['_popular', '_sale'], 6
  ),
  -- Borrego Round Ottoman (sala) — featured
  (
    '30000000-0000-0000-0003-000000000008',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000001',
    'Borrego Round Ottoman', 'borrego-round-ottoman',
    'Puf redondo estilo borrego en piel sintética beige. Perfecta combinación de funcionalidad y estilo nórdico.',
    290000, NULL,
    true, true, false,
    ARRAY['_featured'], 7
  ),
  -- Leather Lounge Chair (sala) — best-seller
  (
    '30000000-0000-0000-0003-000000000009',
    '10000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0003-000000000001',
    'Leather Lounge Chair', 'leather-lounge-chair',
    'Silla lounge en cuero natural con reposapiés. Diseño icónico inspirado en la arquitectura de mediados de siglo.',
    890000, 1100000,
    true, false, true,
    ARRAY['_popular', '_sale'], 8
  )
ON CONFLICT (id) DO NOTHING;

-- ── 5. product_images — furniture-dark ───────────────────────────────────────

INSERT INTO public.product_images (product_id, store_id, url, sort_order) VALUES
  -- Deep Seat Sofa
  ('30000000-0000-0000-0003-000000000001', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-deep-seat-sofa.jpg',  0),
  -- Rivera Corner Sofa
  ('30000000-0000-0000-0003-000000000002', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-rivera-sofa.jpg',      0),
  -- Oak Storage Cabinet
  ('30000000-0000-0000-0003-000000000003', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-oak-storage.jpg',      0),
  -- Solid Wood Dining Table
  ('30000000-0000-0000-0003-000000000004', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-wood-table.jpg',       0),
  -- Dining Chair Set
  ('30000000-0000-0000-0003-000000000005', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-dining-chair.jpg',     0),
  -- Floating Nightstand
  ('30000000-0000-0000-0003-000000000006', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-nightstand.jpg',       0),
  -- Swivel Accent Chair
  ('30000000-0000-0000-0003-000000000007', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-swivel-chair.jpg',     0),
  -- Borrego Round Ottoman
  ('30000000-0000-0000-0003-000000000008', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-borrego-round.jpg',    0),
  -- Leather Lounge Chair — 3 images
  ('30000000-0000-0000-0003-000000000009', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/product-chair-leather.jpg',    0),
  ('30000000-0000-0000-0003-000000000009', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/desc-table-chair.jpg',         1),
  ('30000000-0000-0000-0003-000000000009', '10000000-0000-0000-0000-000000000003', '/mocks/furniture-dark/desc-table-detail.jpg',        2)
ON CONFLICT DO NOTHING;

-- ── 6. product_variants — furniture-dark ──────────────────────────────────────
-- naturalColors: Beige, Nogal oscuro, Roble claro
-- Applied to: Deep Seat Sofa, Rivera Corner Sofa, Leather Lounge Chair

INSERT INTO public.product_variants (product_id, name, price_modifier, type, metadata) VALUES
  -- Deep Seat Sofa colors
  ('30000000-0000-0000-0003-000000000001', 'Beige',        0, 'color', '{"hex": "#C8AD7F", "label": "Beige"}'),
  ('30000000-0000-0000-0003-000000000001', 'Nogal oscuro', 0, 'color', '{"hex": "#3B2912", "label": "Nogal oscuro"}'),
  ('30000000-0000-0000-0003-000000000001', 'Roble claro',  0, 'color', '{"hex": "#C4A35A", "label": "Roble claro"}'),
  -- Rivera Corner Sofa colors
  ('30000000-0000-0000-0003-000000000002', 'Beige',        0, 'color', '{"hex": "#C8AD7F", "label": "Beige"}'),
  ('30000000-0000-0000-0003-000000000002', 'Nogal oscuro', 0, 'color', '{"hex": "#3B2912", "label": "Nogal oscuro"}'),
  ('30000000-0000-0000-0003-000000000002', 'Roble claro',  0, 'color', '{"hex": "#C4A35A", "label": "Roble claro"}'),
  -- Leather Lounge Chair colors
  ('30000000-0000-0000-0003-000000000009', 'Beige',        0, 'color', '{"hex": "#C8AD7F", "label": "Beige"}'),
  ('30000000-0000-0000-0003-000000000009', 'Nogal oscuro', 0, 'color', '{"hex": "#3B2912", "label": "Nogal oscuro"}'),
  ('30000000-0000-0000-0003-000000000009', 'Roble claro',  0, 'color', '{"hex": "#C4A35A", "label": "Roble claro"}')
ON CONFLICT DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- TEMPLATE: furniture-light
-- Store UUID : 10000000-0000-0000-0000-000000000004
-- Currency   : USD
-- ═══════════════════════════════════════════════════════════════════════════════

-- ── 1. stores ─────────────────────────────────────────────────────────────────

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  onboarding_completed,
  business_info
) VALUES (
  '10000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000001',
  'KASA',
  'kasa-furniture',
  'Muebles escandinavos para espacios modernos y acogedores.',
  '[
    {"platform": "whatsapp",  "value": "573001234567"},
    {"platform": "instagram", "value": "@kasa.furniture"},
    {"platform": "facebook",  "value": "kasafurniture"}
  ]'::jsonb,
  (SELECT id FROM public.templates  WHERE code = 'furniture-light'),
  (SELECT id FROM public.plans      WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'USD'),
  'simple',
  true,
  '{
    "hours": "Lun–Sáb 9am–6pm · Dom 10am–3pm",
    "shippingInfo": {
      "description": "Envío gratis en pedidos mayores a $200.000. Entrega e instalación incluida en Bogotá."
    },
    "paymentMethods": ["Efectivo", "Nequi", "Daviplata", "Tarjeta", "Financiamiento disponible"]
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ── 2. store_appearance ───────────────────────────────────────────────────────

INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
) VALUES (
  '10000000-0000-0000-0000-000000000004',
  NULL,
  'minimalista',
  '{}'::jsonb,
  '{}'::jsonb,
  -- Template defaults: header=GREETING_SIMPLE, hero=CARD_SPLIT, categoryNav=GRID, etc.
  '{}'::jsonb,
  '[
    {"id": "hero",       "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products",   "visible": true},
    {"id": "featured",   "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio",   "href": "/"},
      {"label": "Catálogo", "href": "/catalogo"},
      {"label": "Info",     "href": "/info"}
    ],
    "popularSearches": ["Mesas", "Sillas", "Gabinetes", "Sofás", "Camas"],
    "productTabs": [
      {"id": "new-arrival", "label": "Nuevos"},
      {"id": "bestseller",  "label": "Más vendidos"},
      {"id": "featured",    "label": "Destacados"}
    ],
    "productGroups": {
      "displayMode": "stacked",
      "groups": [
        {
          "id": "a0000004-0000-0000-0000-000000000001",
          "name": "Mesas y Comedor",
          "productIds": [
            "30000000-0000-0000-0004-000000000001",
            "30000000-0000-0000-0004-000000000003",
            "30000000-0000-0000-0004-000000000010",
            "30000000-0000-0000-0004-000000000011"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000004-0000-0000-0000-000000000002",
          "name": "Sillas y Asientos",
          "productIds": [
            "30000000-0000-0000-0004-000000000002",
            "30000000-0000-0000-0004-000000000009",
            "30000000-0000-0000-0004-000000000008"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000004-0000-0000-0000-000000000003",
          "name": "Dormitorio",
          "productIds": [
            "30000000-0000-0000-0004-000000000004",
            "30000000-0000-0000-0004-000000000007"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName":   "KASA",
    "description": "Muebles escandinavos para espacios modernos y acogedores."
  }'::jsonb
)
ON CONFLICT (store_id) DO NOTHING;

-- ── 3. categories — furniture-light ──────────────────────────────────────────
-- UUID pattern: 20000000-0000-0000-0004-{seq:012}
-- Note: furniture-light mockCategories only has 5 entries with icon names in PascalCase
-- (the template uses Lucide icon names in PascalCase, unlike furniture-dark).

INSERT INTO public.categories (id, store_id, name, slug, image, icon, sort_order) VALUES
  ('20000000-0000-0000-0004-000000000001', '10000000-0000-0000-0000-000000000004', 'Mesas',      'mesas',      '/mocks/furniture-light/category-dining.jpg',     'Grid3x3',    0),
  ('20000000-0000-0000-0004-000000000002', '10000000-0000-0000-0000-000000000004', 'Sillas',     'sillas',     '/mocks/furniture-light/category-living-room.jpg','Armchair',   1),
  ('20000000-0000-0000-0004-000000000003', '10000000-0000-0000-0000-000000000004', 'Gabinetes',  'gabinetes',  '/mocks/furniture-light/category-workspace.jpg',  'Package',    2),
  ('20000000-0000-0000-0004-000000000004', '10000000-0000-0000-0000-000000000004', 'Sofás',      'sofas',      '/mocks/furniture-light/category-living-room.jpg','Sofa',       3),
  ('20000000-0000-0000-0004-000000000005', '10000000-0000-0000-0000-000000000004', 'Camas',      'camas',      '/mocks/furniture-light/category-bedroom.jpg',    'Bed',        4)
ON CONFLICT (id) DO NOTHING;

-- ── 4. products — furniture-light ─────────────────────────────────────────────
-- UUID pattern: 30000000-0000-0000-0004-{seq:012}
-- Prices are in USD (as floats in mock data; stored as int cents-style → multiply × 100)
-- category mapping: cat-table=...0001, cat-chair=...0002, cat-cabinet=...0003,
--                   cat-sofa=...0004,  cat-bed=...0005
-- Note: price stored as int (USD cents × 100 for display at 2 decimal places)
-- USD prices from mock: 105→10500, 250→25000, 60→6000, 400→40000, 240→24000,
--                       220→22000, 292→29200, 120→12000, 200→20000, 400→40000,
--                       180→18000, 350→35000
-- compare_at_price: 150→15000, 450→45000, 220→22000

INSERT INTO public.products (
  id, store_id, category_id,
  name, slug, description,
  price, compare_at_price,
  available, featured, is_best_seller,
  tags, sort_order
) VALUES
  -- Livaro (mesas)
  (
    '30000000-0000-0000-0004-000000000001',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000001',
    'Livaro', 'livaro',
    'Mesa de comedor escandinava con acabado de madera cálida. Ideal para espacios modernos y acogedores. Soporta hasta 6 personas.',
    10500, 15000,
    true, true, false,
    ARRAY['_sale', '_featured'], 0
  ),
  -- Sodra (sillas)
  (
    '30000000-0000-0000-0004-000000000002',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000002',
    'Sodra', 'sodra',
    'Silla tapizada con diseño wingback. Tapicería en terciopelo verde con detalles de madera.',
    25000, NULL,
    true, false, false,
    ARRAY['_new'], 1
  ),
  -- Sundhoj (mesas)
  (
    '30000000-0000-0000-0004-000000000003',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000001',
    'Sundhoj', 'sundhoj',
    'Lámpara de pie elegante con luz cálida. Perfecta para sala o dormitorio.',
    6000, NULL,
    true, false, false,
    ARRAY['_new'], 2
  ),
  -- Fjallvik (camas)
  (
    '30000000-0000-0000-0004-000000000004',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000005',
    'Fjallvik', 'fjallvik',
    'Cama plataforma moderna con tapicería teal y almacenamiento integrado. Tamaño queen.',
    40000, NULL,
    true, false, true,
    ARRAY['_popular'], 3
  ),
  -- Vallfor (gabinetes)
  (
    '30000000-0000-0000-0004-000000000005',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000003',
    'Vallfor', 'vallfor',
    'Gabinete retro con puertas de colores y acabado en madera cálida. 3 compartimentos con estantes ajustables.',
    24000, NULL,
    true, false, false,
    ARRAY['_new'], 4
  ),
  -- Hollvik (gabinetes)
  (
    '30000000-0000-0000-0004-000000000006',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000003',
    'Hollvik', 'hollvik',
    'Librero mid-century con tonos cálidos. Estantes abiertos para libros y decoración.',
    22000, NULL,
    true, false, true,
    ARRAY['_popular'], 5
  ),
  -- Branno (camas)
  (
    '30000000-0000-0000-0004-000000000007',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000005',
    'Branno', 'branno',
    'Cama de lujo con cabecero acolchado en tela ámbar. Con mesitas de noche integradas.',
    29200, 45000,
    true, true, false,
    ARRAY['_sale', '_featured'], 6
  ),
  -- Morby (sofas)
  (
    '30000000-0000-0000-0004-000000000008',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000004',
    'Morby', 'morby',
    'Banco contemporáneo con cojín turquesa y estructura de metal negro. Ideal para entradas.',
    12000, NULL,
    true, false, false,
    ARRAY['_new'], 7
  ),
  -- Granholt (sillas)
  (
    '30000000-0000-0000-0004-000000000009',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000002',
    'Granholt', 'granholt',
    'Silla wingback clásica en terciopelo rojo. Respaldo capitoné con ribetes de latón.',
    20000, NULL,
    true, false, false,
    ARRAY['_featured'], 8
  ),
  -- Farlov (mesas)
  (
    '30000000-0000-0000-0004-000000000010',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000001',
    'Farlov', 'farlov',
    'Mesa de comedor minimalista en gris mate. Para 6 personas. Patas de acero antirrayaduras.',
    40000, NULL,
    true, false, true,
    ARRAY['_popular'], 9
  ),
  -- Boise (mesas)
  (
    '30000000-0000-0000-0004-000000000011',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000001',
    'Boise', 'boise',
    'Mesa auxiliar de diseño nórdico. Perfecta para sala de estar o dormitorio.',
    18000, 22000,
    true, false, false,
    ARRAY['_sale'], 10
  ),
  -- Harlov (gabinetes)
  (
    '30000000-0000-0000-0004-000000000012',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0004-000000000003',
    'Harlov', 'harlov',
    'Librero con estilo industrial. Estructura de metal con estantes de madera.',
    35000, NULL,
    true, false, false,
    ARRAY['_new'], 11
  )
ON CONFLICT (id) DO NOTHING;

-- ── 5. product_images — furniture-light ───────────────────────────────────────

INSERT INTO public.product_images (product_id, store_id, url, sort_order) VALUES
  -- Livaro — 2 images
  ('30000000-0000-0000-0004-000000000001', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-livaro-table.jpg',      0),
  ('30000000-0000-0000-0004-000000000001', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-farlov-table.jpg',      1),
  -- Sodra
  ('30000000-0000-0000-0004-000000000002', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-sodra-chair.jpg',       0),
  -- Sundhoj
  ('30000000-0000-0000-0004-000000000003', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-sundhoj-lamp.jpg',      0),
  -- Fjallvik
  ('30000000-0000-0000-0004-000000000004', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-branno-bed.jpg',        0),
  -- Vallfor
  ('30000000-0000-0000-0004-000000000005', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-vallfor-cabinet.jpg',   0),
  -- Hollvik
  ('30000000-0000-0000-0004-000000000006', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-hollvik-sideboard.jpg', 0),
  -- Branno
  ('30000000-0000-0000-0004-000000000007', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-branno-bed.jpg',        0),
  -- Morby
  ('30000000-0000-0000-0004-000000000008', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-morby-bench.jpg',       0),
  -- Granholt
  ('30000000-0000-0000-0004-000000000009', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-granholt-chair.jpg',    0),
  -- Farlov
  ('30000000-0000-0000-0004-000000000010', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-farlov-table.jpg',      0),
  -- Boise
  ('30000000-0000-0000-0004-000000000011', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-boise-table.jpg',       0),
  -- Harlov
  ('30000000-0000-0000-0004-000000000012', '10000000-0000-0000-0000-000000000004', '/mocks/furniture-light/product-harlov-bookshelf.jpg',  0)
ON CONFLICT DO NOTHING;

-- ── 6. product_variants — furniture-light ─────────────────────────────────────
-- Livaro: Roble natural, Roble oscuro, Roble claro
-- Sodra:  Verde celery, Marrón, Azul marino
-- Granholt: Terciopelo rojo, Cuero marrón, Azul medianoche

INSERT INTO public.product_variants (product_id, name, price_modifier, type, metadata) VALUES
  -- Livaro colors
  ('30000000-0000-0000-0004-000000000001', 'Roble natural', 0, 'color', '{"hex": "#C4A882", "label": "Roble natural"}'),
  ('30000000-0000-0000-0004-000000000001', 'Roble oscuro',  0, 'color', '{"hex": "#3B2912", "label": "Roble oscuro"}'),
  ('30000000-0000-0000-0004-000000000001', 'Roble claro',   0, 'color', '{"hex": "#C4A35A", "label": "Roble claro"}'),
  -- Sodra colors
  ('30000000-0000-0000-0004-000000000002', 'Verde celery',  0, 'color', '{"hex": "#ACB87C", "label": "Verde celery"}'),
  ('30000000-0000-0000-0004-000000000002', 'Marrón',        0, 'color', '{"hex": "#795548", "label": "Marrón"}'),
  ('30000000-0000-0000-0004-000000000002', 'Azul marino',   0, 'color', '{"hex": "#003153", "label": "Azul marino"}'),
  -- Granholt colors
  ('30000000-0000-0000-0004-000000000009', 'Terciopelo rojo',  0, 'color', '{"hex": "#8B0000", "label": "Terciopelo rojo"}'),
  ('30000000-0000-0000-0004-000000000009', 'Cuero marrón',     0, 'color', '{"hex": "#795548", "label": "Cuero marrón"}'),
  ('30000000-0000-0000-0004-000000000009', 'Azul medianoche',  0, 'color', '{"hex": "#191970", "label": "Azul medianoche"}')
ON CONFLICT DO NOTHING;
-- ── Seed Part 3: beauty-soft + beauty-elegant demo stores ─────────────────────
-- Depends on: seed-1.sql (system user 00000000-0000-0000-0000-000000000001)
--             migration 002 (templates, plans, currencies already seeded)
-- No system user creation here — that is in seed-1.sql.
-- ─────────────────────────────────────────────────────────────────────────────

-- ══════════════════════════════════════════════════════════════════════════════
-- BEAUTY-SOFT — store UUID: 10000000-0000-0000-0000-000000000005
-- Store name: Glow Studio  |  slug: glow-studio
-- ══════════════════════════════════════════════════════════════════════════════

-- ── stores ────────────────────────────────────────────────────────────────────

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  palette_id,
  payment_methods,
  onboarding_completed,
  business_info
) VALUES (
  '10000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000001',
  'Glow Studio',
  'glow-studio',
  'Tu tienda de cuidado de piel con productos premium para una piel radiante.',
  '[
    {"platform": "whatsapp",  "value": "573001234567"},
    {"platform": "instagram", "value": "glowstudio.co"},
    {"platform": "facebook",  "value": "glowstudiocol"},
    {"platform": "tiktok",    "value": "glowstudio"}
  ]'::jsonb,
  (SELECT id FROM public.templates  WHERE code = 'beauty-soft'),
  (SELECT id FROM public.plans      WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  NULL,
  '{}',
  true,
  '{
    "hours": "Lun–Sáb 9am–7pm · Dom 10am–5pm",
    "shippingInfo": {
      "cost": 0,
      "estimatedTime": "2–4 días hábiles",
      "freeAbove": 80000
    }
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;


-- ── store_appearance ──────────────────────────────────────────────────────────

INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
) VALUES (
  '10000000-0000-0000-0000-000000000005',
  NULL,
  'minimalista',
  '{}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  '[
    {"id": "hero",       "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products",   "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio",    "href": "/"},
      {"label": "Catálogo",  "href": "/catalogo"},
      {"label": "Info",      "href": "/info"}
    ],
    "popularSearches": ["Sérum", "Limpiador", "Protector solar", "Mascarilla"],
    "productGroups": {
      "displayMode": "tabs",
      "groups": [
        {
          "id": "a0000005-0000-0000-0000-000000000001",
          "name": "Skincare",
          "productIds": [
            "30000000-0000-0000-0005-000000000001",
            "30000000-0000-0000-0005-000000000004",
            "30000000-0000-0000-0005-000000000005"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000005-0000-0000-0000-000000000002",
          "name": "Maquillaje",
          "productIds": [
            "30000000-0000-0000-0005-000000000002",
            "30000000-0000-0000-0005-000000000003"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000005-0000-0000-0000-000000000003",
          "name": "Cuidado Capilar",
          "productIds": [
            "30000000-0000-0000-0005-000000000001",
            "30000000-0000-0000-0005-000000000005"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName": "Glow Studio",
    "description": "Tu tienda de cuidado de piel con productos premium para una piel radiante.",
    "logo": "/mocks/beauty-soft/avatar.png"
  }'::jsonb
) ON CONFLICT (store_id) DO NOTHING;


-- ── categories (beauty-soft) ──────────────────────────────────────────────────
-- UUID pattern: 20000000-0000-0000-0005-{seq:12 hex digits}

INSERT INTO public.categories (id, store_id, name, slug, image, icon, sort_order) VALUES
  ('20000000-0000-0000-0005-000000000001', '10000000-0000-0000-0000-000000000005', 'Limpieza',    'limpieza',    '/mocks/beauty-soft/category-cleanse.png',    'Droplets',     0),
  ('20000000-0000-0000-0005-000000000002', '10000000-0000-0000-0000-000000000005', 'Hidratación', 'hidratacion', '/mocks/beauty-soft/category-moisturize.png', 'Heart',        1),
  ('20000000-0000-0000-0005-000000000003', '10000000-0000-0000-0000-000000000005', 'Tratamiento', 'tratamiento', '/mocks/beauty-soft/category-treat.png',      'Sparkles',     2),
  ('20000000-0000-0000-0005-000000000004', '10000000-0000-0000-0000-000000000005', 'Protección',  'proteccion',  '/mocks/beauty-soft/category-protect.png',    'ShieldCheck',  3),
  ('20000000-0000-0000-0005-000000000005', '10000000-0000-0000-0000-000000000005', 'Mascaras',    'mascaras',    '/mocks/beauty-soft/category-mask.png',       'Smile',        4),
  ('20000000-0000-0000-0005-000000000006', '10000000-0000-0000-0000-000000000005', 'Cuerpo',      'cuerpo',      '/mocks/beauty-soft/category-body.png',       'User',         5),
  ('20000000-0000-0000-0005-000000000007', '10000000-0000-0000-0000-000000000005', 'Accesorios',  'accesorios',  '/mocks/beauty-soft/category-tools.png',      'ShoppingBag',  6),
  ('20000000-0000-0000-0005-000000000008', '10000000-0000-0000-0000-000000000005', 'Kits',        'kits',        '/mocks/beauty-soft/category-kits.png',       'Gift',         7)
ON CONFLICT (id) DO NOTHING;


-- ── products (beauty-soft) ────────────────────────────────────────────────────
-- UUID pattern: 30000000-0000-0000-0005-{seq:12 hex digits}
-- compare_at_price must be > price (per CHECK constraint)

INSERT INTO public.products (
  id, store_id, category_id,
  name, slug, subtitle, description,
  price, compare_at_price,
  available, featured, is_best_seller,
  tags, specs, stock, sort_order
) VALUES

  -- prod-serum → cat-treat (000000000003)
  (
    '30000000-0000-0000-0005-000000000001',
    '10000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0005-000000000003',
    'Sérum Iluminador Vitamina C',
    'serum-iluminador-vitamina-c',
    'Vitamina C estabilizada • Ácido glicólico 10%',
    'Sérum concentrado con vitamina C estabilizada y ácido glicólico al 10%. Activa el brillo natural y unifica el tono en 4 semanas.',
    92000,  115000,
    true, true, true,
    ARRAY['_new', '_popular', '_featured'],
    '{"Vitamina C": "Estabilizada", "Ácido glicólico": "10%", "Resultado": "4 semanas"}'::jsonb,
    NULL, 0
  ),

  -- prod-cleanser → cat-cleanse (000000000001)
  (
    '30000000-0000-0000-0005-000000000002',
    '10000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0005-000000000001',
    'Limpiador Facial Suave',
    'limpiador-facial-suave',
    'pH balanceado • Aloe vera y pepino',
    'Gel limpiador de pH balanceado con extracto de aloe vera y pepino. Remueve impurezas sin resecar la piel.',
    55000, 68000,
    true, false, true,
    ARRAY['_popular'],
    '{"pH": "Balanceado", "Ingredientes clave": "Aloe vera, Pepino", "Tipo de piel": "Todo tipo"}'::jsonb,
    NULL, 1
  ),

  -- prod-foam-cleanser → cat-cleanse (000000000001)
  (
    '30000000-0000-0000-0005-000000000003',
    '10000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0005-000000000001',
    'Limpiador Espuma Poros',
    'limpiador-espuma-poros',
    'Ácido salicílico 2% • Control de sebo',
    'Espuma limpiadora con ácido salicílico al 2%. Controla el exceso de sebo y minimiza los poros visibles.',
    62000, NULL,
    true, false, false,
    ARRAY['_new'],
    '{"Ácido salicílico": "2%", "Beneficio": "Control de sebo y poros", "Tipo de piel": "Grasa y mixta"}'::jsonb,
    NULL, 2
  ),

  -- prod-face-pack → cat-mask (000000000005)
  (
    '30000000-0000-0000-0005-000000000004',
    '10000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0005-000000000005',
    'Mascarilla Hidratante Noche',
    'mascarilla-hidratante-noche',
    'Ácido hialurónico • Ceramidas',
    'Mascarilla sleeping pack con ácido hialurónico y ceramidas. Restaura la barrera cutánea mientras duermes.',
    78000, 95000,
    true, true, false,
    ARRAY['_featured'],
    '{"Ingredientes": "Ácido hialurónico, Ceramidas", "Uso": "Nocturno", "Tipo": "Sleeping pack"}'::jsonb,
    NULL, 3
  ),

  -- prod-sunscreen → cat-protect (000000000004)
  (
    '30000000-0000-0000-0005-000000000005',
    '10000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0005-000000000004',
    'Protector Solar SPF 50+',
    'protector-solar-spf-50',
    'SPF 50+ PA++++ • Toque seco',
    'Protector solar facial de amplio espectro SPF 50+ PA++++. Toque seco, sin residuo blanco. Ideal bajo maquillaje.',
    58000, 72000,
    true, true, true,
    ARRAY['_popular', '_featured'],
    '{"SPF": "50+", "PA": "++++", "Acabado": "Toque seco", "Uso": "Bajo maquillaje"}'::jsonb,
    NULL, 4
  )

ON CONFLICT (id) DO NOTHING;


-- ── product_images (beauty-soft) ──────────────────────────────────────────────
-- UUID pattern: 40000000-0000-0000-0005-{seq:12 hex digits}

INSERT INTO public.product_images (id, product_id, store_id, url, sort_order) VALUES
  -- Sérum (1 image)
  ('40000000-0000-0000-0005-000000000001', '30000000-0000-0000-0005-000000000001', '10000000-0000-0000-0000-000000000005', '/mocks/beauty-soft/product-serum.png',          0),
  -- Limpiador Facial (2 images)
  ('40000000-0000-0000-0005-000000000002', '30000000-0000-0000-0005-000000000002', '10000000-0000-0000-0000-000000000005', '/mocks/beauty-soft/product-cleanser.png',        0),
  ('40000000-0000-0000-0005-000000000003', '30000000-0000-0000-0005-000000000002', '10000000-0000-0000-0000-000000000005', '/mocks/beauty-soft/product-detail-cleanser.png', 1),
  -- Limpiador Espuma (1 image)
  ('40000000-0000-0000-0005-000000000004', '30000000-0000-0000-0005-000000000003', '10000000-0000-0000-0000-000000000005', '/mocks/beauty-soft/product-foam-cleanser.png',   0),
  -- Mascarilla Noche (1 image)
  ('40000000-0000-0000-0005-000000000005', '30000000-0000-0000-0005-000000000004', '10000000-0000-0000-0000-000000000005', '/mocks/beauty-soft/product-face-pack.png',       0),
  -- Protector Solar (1 image)
  ('40000000-0000-0000-0005-000000000006', '30000000-0000-0000-0005-000000000005', '10000000-0000-0000-0000-000000000005', '/mocks/beauty-soft/product-sunscreen.png',       0)
ON CONFLICT (id) DO NOTHING;


-- ── product_variants (beauty-soft) ────────────────────────────────────────────
-- beauty-soft products have no size/color variants in mock data — none inserted.


-- ══════════════════════════════════════════════════════════════════════════════
-- BEAUTY-ELEGANT — store UUID: 10000000-0000-0000-0000-000000000006
-- Store name: Blushora  |  slug: blushora
-- ══════════════════════════════════════════════════════════════════════════════

-- ── stores ────────────────────────────────────────────────────────────────────

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  palette_id,
  payment_methods,
  onboarding_completed,
  business_info
) VALUES (
  '10000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000001',
  'Blushora',
  'blushora',
  'Tu tienda de belleza exclusiva con cosméticos y cuidado personal premium.',
  '[
    {"platform": "whatsapp",  "value": "573001234567"},
    {"platform": "instagram", "value": "blushora.co"},
    {"platform": "facebook",  "value": "blushorabeauty"},
    {"platform": "tiktok",    "value": "blushora"}
  ]'::jsonb,
  (SELECT id FROM public.templates  WHERE code = 'beauty-elegant'),
  (SELECT id FROM public.plans      WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  NULL,
  '{}',
  true,
  '{
    "hours": "Lun–Vie 9am–6pm · Sáb 10am–4pm · Dom cerrado",
    "shippingInfo": {
      "estimatedTime": "2–5 días hábiles"
    }
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;


-- ── store_appearance ──────────────────────────────────────────────────────────

INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
) VALUES (
  '10000000-0000-0000-0000-000000000006',
  NULL,
  'minimalista',
  '{}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  '[
    {"id": "hero",       "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products",   "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio",    "href": "/"},
      {"label": "Catálogo",  "href": "/catalogo"},
      {"label": "Info",      "href": "/info"}
    ],
    "popularSearches": ["Sérum", "Paleta", "Base", "Perfume", "Kit regalo"],
    "productGroups": {
      "displayMode": "tabs",
      "groups": [
        {
          "id": "a0000006-0000-0000-0000-000000000001",
          "name": "Cuidado de Piel",
          "productIds": [
            "30000000-0000-0000-0006-000000000001",
            "30000000-0000-0000-0006-000000000002",
            "30000000-0000-0000-0006-000000000003"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000006-0000-0000-0000-000000000002",
          "name": "Maquillaje",
          "productIds": [
            "30000000-0000-0000-0006-000000000004",
            "30000000-0000-0000-0006-000000000005",
            "30000000-0000-0000-0006-000000000007"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000006-0000-0000-0000-000000000003",
          "name": "Sets y Fragancias",
          "productIds": [
            "30000000-0000-0000-0006-000000000006",
            "30000000-0000-0000-0006-000000000008",
            "30000000-0000-0000-0006-000000000001"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName": "Blushora",
    "description": "Tu tienda de belleza exclusiva con cosméticos y cuidado personal premium."
  }'::jsonb
) ON CONFLICT (store_id) DO NOTHING;


-- ── categories (beauty-elegant) ───────────────────────────────────────────────
-- UUID pattern: 20000000-0000-0000-0006-{seq:12 hex digits}

INSERT INTO public.categories (id, store_id, name, slug, icon, sort_order) VALUES
  ('20000000-0000-0000-0006-000000000001', '10000000-0000-0000-0000-000000000006', 'Makeup',      'makeup',      'Palette',     0),
  ('20000000-0000-0000-0006-000000000002', '10000000-0000-0000-0000-000000000006', 'Skincare',    'skincare',    'Droplet',     1),
  ('20000000-0000-0000-0006-000000000003', '10000000-0000-0000-0000-000000000006', 'Fragrance',   'fragrance',   'Flower2',     2),
  ('20000000-0000-0000-0006-000000000004', '10000000-0000-0000-0000-000000000006', 'Accesorios',  'accesorios',  'Gem',         3),
  ('20000000-0000-0000-0006-000000000005', '10000000-0000-0000-0000-000000000006', 'Kits Regalo', 'kits-regalo', 'Gift',        4)
ON CONFLICT (id) DO NOTHING;


-- ── products (beauty-elegant) ─────────────────────────────────────────────────
-- UUID pattern: 30000000-0000-0000-0006-{seq:12 hex digits}
-- compare_at_price must be > price (per CHECK constraint)

INSERT INTO public.products (
  id, store_id, category_id,
  name, slug, subtitle, description,
  price, compare_at_price,
  available, featured, is_best_seller,
  tags, specs, stock, sort_order
) VALUES

  -- p-serum-vitc → cat-skincare (000000000002)
  (
    '30000000-0000-0000-0006-000000000001',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000002',
    'Purple Glow Vitamin C Serum',
    'purple-glow-vitamin-c-serum',
    '20% Vitamin C • Anti-aging',
    'Sérum antioxidante con vitamina C al 20% y resveratrol. Ilumina y protege contra el envejecimiento prematuro.',
    112000, 140000,
    true, true, true,
    ARRAY['_new', '_popular', '_featured'],
    '{"Vitamina C": "20%", "Ingrediente extra": "Resveratrol", "Beneficio": "Iluminador antiedad"}'::jsonb,
    NULL, 0
  ),

  -- p-lotion-daily → cat-skincare (000000000002)
  (
    '30000000-0000-0000-0006-000000000002',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000002',
    'Peptide Rich Moisturizer',
    'peptide-rich-moisturizer',
    'Peptide Complex • Anti-wrinkle',
    'Crema con complejo de péptidos y ceramidas. Restaura la barrera cutánea y reduce las líneas finas.',
    89000, 108000,
    true, true, false,
    ARRAY['_popular'],
    '{"Ingredientes": "Péptidos, Ceramidas", "Beneficio": "Antiedad, Barrera cutánea", "Fórmula": "Sin parabenos • Sin sulfatos"}'::jsonb,
    NULL, 1
  ),

  -- p-night-revival → cat-skincare (000000000002)
  (
    '30000000-0000-0000-0006-000000000003',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000002',
    'Night Revival Cream',
    'night-revival-cream',
    'Retinol • Niacinamide',
    'Crema nocturna regeneradora con retinol encapsulado y niacinamida. Despierta con piel renovada.',
    98000, 125000,
    true, false, false,
    ARRAY['_new'],
    '{"Retinol": "Encapsulado", "Niacinamida": "Sí", "Uso": "Nocturno"}'::jsonb,
    NULL, 2
  ),

  -- p-lotion-swirl → cat-makeup (000000000001)
  (
    '30000000-0000-0000-0006-000000000004',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000001',
    'Blur & Glow Foundation',
    'blur-glow-liquid-foundation',
    'Full Coverage • SPF 20',
    'Base líquida de cobertura completa con efecto blur instantáneo. Larga duración 16h, resistente al agua.',
    98000, 125000,
    true, true, false,
    ARRAY['_featured'],
    '{"Cobertura": "Completa", "SPF": "20", "Duración": "16h", "Water resistant": "Sí"}'::jsonb,
    NULL, 3
  ),

  -- p-lakme-palette → cat-makeup (000000000001)
  (
    '30000000-0000-0000-0006-000000000005',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000001',
    'Violet Haze Eye Palette',
    'violet-haze-eye-palette',
    '12 Shades • Highly Pigmented',
    'Paleta de 12 sombras en tonos violetas, malvas y lilas. Fórmula ultrasuave de alta pigmentación.',
    135000, 168000,
    true, true, true,
    ARRAY['_popular', '_featured'],
    '{"Sombras": "12 tonos", "Tonos": "Violetas, Malvas, Lilas", "Pigmentación": "Alta"}'::jsonb,
    NULL, 4
  ),

  -- p-gift-set → cat-sets (000000000005)
  (
    '30000000-0000-0000-0006-000000000006',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000005',
    'Blushora Starter Gift Set',
    'blushora-starter-gift-set',
    '4 Bestsellers • Gift Box Included',
    'Set regalo con sérum, crema hidratante, labial y mini paleta de sombras. El regalo perfecto para ella.',
    220000, 280000,
    false, true, false,
    ARRAY['_featured'],
    '{"Contenido": "Sérum, Crema, Labial, Paleta", "Presentación": "Gift box", "Unidades": "4 productos"}'::jsonb,
    0, 5
  ),

  -- p-night-lotion (Berry Crush Lip Gloss) → cat-makeup (000000000001)
  (
    '30000000-0000-0000-0006-000000000007',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000001',
    'Berry Crush Lip Gloss',
    'berry-crush-lip-gloss',
    'Matte Finish • 12h Wear',
    'Labial líquido de larga duración en tonos berry y ciruela. Fórmula no resecante con aceite de jojoba.',
    58000, 72000,
    true, false, false,
    ARRAY['_new'],
    '{"Acabado": "Matte", "Duración": "12h", "Ingrediente": "Aceite de jojoba", "Tonos": "Berry, Ciruela"}'::jsonb,
    NULL, 6
  ),

  -- p-perfume-violet → cat-fragrance (000000000003)
  (
    '30000000-0000-0000-0006-000000000008',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0006-000000000003',
    'Violet Bloom Eau de Parfum',
    'violet-bloom-eau-de-parfum',
    '100ml • Floral Woody',
    'Fragancia floral-amaderada con notas de violeta, iris y cedro blanco. Una firma olfativa única.',
    175000, NULL,
    true, true, false,
    ARRAY['_new', '_featured'],
    '{"Volumen": "100ml", "Familia": "Floral-amaderada", "Notas": "Violeta, Iris, Cedro blanco"}'::jsonb,
    NULL, 7
  )

ON CONFLICT (id) DO NOTHING;


-- ── product_images (beauty-elegant) ───────────────────────────────────────────
-- UUID pattern: 40000000-0000-0000-0006-{seq:12 hex digits}

INSERT INTO public.product_images (id, product_id, store_id, url, sort_order) VALUES
  -- Purple Glow Vitamin C Serum
  ('40000000-0000-0000-0006-000000000001', '30000000-0000-0000-0006-000000000001', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-serum.png',         0),
  -- Peptide Rich Moisturizer
  ('40000000-0000-0000-0006-000000000002', '30000000-0000-0000-0006-000000000002', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-skin-lotion.png',   0),
  -- Night Revival Cream
  ('40000000-0000-0000-0006-000000000003', '30000000-0000-0000-0006-000000000003', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-night-revival.png', 0),
  -- Blur & Glow Foundation
  ('40000000-0000-0000-0006-000000000004', '30000000-0000-0000-0006-000000000004', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-lotion-swirl.png',  0),
  -- Violet Haze Eye Palette
  ('40000000-0000-0000-0006-000000000005', '30000000-0000-0000-0006-000000000005', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/detail-lakme.png',           0),
  -- Blushora Starter Gift Set (reuses serum image)
  ('40000000-0000-0000-0006-000000000006', '30000000-0000-0000-0006-000000000006', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-serum.png',         0),
  -- Berry Crush Lip Gloss (reuses lotion image)
  ('40000000-0000-0000-0006-000000000007', '30000000-0000-0000-0006-000000000007', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-skin-lotion.png',   0),
  -- Violet Bloom Eau de Parfum (reuses night-revival image)
  ('40000000-0000-0000-0006-000000000008', '30000000-0000-0000-0006-000000000008', '10000000-0000-0000-0000-000000000006', '/mocks/beauty-elegant/product-night-revival.png', 0)
ON CONFLICT (id) DO NOTHING;


-- ── product_variants (beauty-elegant) ────────────────────────────────────────
-- Blur & Glow Foundation has shade variants (common for foundations).
-- Violet Haze Eye Palette has no variants (single SKU palette).
-- All other products: single SKU, no variants.

INSERT INTO public.product_variants (id, product_id, name, price_modifier, type, metadata) VALUES
  -- Blur & Glow Foundation — shade variants (price_modifier = 0, same price per shade)
  ('50000000-0000-0000-0006-000000000001', '30000000-0000-0000-0006-000000000004', 'N10 Porcelana',   0, 'color', '{"hex": "#F5F0E8", "label": "N10 Porcelana"}'),
  ('50000000-0000-0000-0006-000000000002', '30000000-0000-0000-0006-000000000004', 'N20 Beige Suave', 0, 'color', '{"hex": "#C8AD7F", "label": "N20 Beige Suave"}'),
  ('50000000-0000-0000-0006-000000000003', '30000000-0000-0000-0006-000000000004', 'N30 Arena',       0, 'color', '{"hex": "#C2B280", "label": "N30 Arena"}'),
  ('50000000-0000-0000-0006-000000000004', '30000000-0000-0000-0006-000000000004', 'N40 Natural',     0, 'color', '{"hex": "#E8C4A0", "label": "N40 Natural"}'),
  ('50000000-0000-0000-0006-000000000005', '30000000-0000-0000-0006-000000000004', 'N50 Miel',        0, 'color', '{"hex": "#D4AF37", "label": "N50 Miel"}'),
  -- Berry Crush Lip Gloss — color variants
  ('50000000-0000-0000-0006-000000000006', '30000000-0000-0000-0006-000000000007', 'Berry Rose',    0, 'color', '{"hex": "#8B0045", "label": "Berry Rose"}'),
  ('50000000-0000-0000-0006-000000000007', '30000000-0000-0000-0006-000000000007', 'Ciruela Oscura',0, 'color', '{"hex": "#4B0082", "label": "Ciruela Oscura"}'),
  ('50000000-0000-0000-0006-000000000008', '30000000-0000-0000-0006-000000000007', 'Vino Intenso',  0, 'color', '{"hex": "#8B0000", "label": "Vino Intenso"}')
ON CONFLICT (id) DO NOTHING;
-- ── Seed Part 4: Demo Stores — decor-warm + food-night ───────────────────────
-- Depends on: seed-1 (system user 00000000-0000-0000-0000-000000000001 exists)
--             002_reference_tables (templates, plans, currencies seeded)
-- UUIDs:
--   decor-warm  store  → 10000000-0000-0000-0000-000000000007
--   food-night  store  → 10000000-0000-0000-0000-000000000008
-- ─────────────────────────────────────────────────────────────────────────────


-- ═══════════════════════════════════════════════════════════════════════════════
-- DECOR WARM — Casa Bonita
-- ═══════════════════════════════════════════════════════════════════════════════

-- ── 1. Store ──────────────────────────────────────────────────────────────────

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  palette_id,
  payment_methods,
  onboarding_completed,
  business_info
)
VALUES (
  '10000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000001',
  'Casa Bonita',
  'decor-warm-preview',
  'Tu tienda de muebles y decoración para el hogar perfecto.',
  '[
    {"platform": "whatsapp",  "value": "573001234567"},
    {"platform": "instagram", "value": "casabonita.co"},
    {"platform": "facebook",  "value": "casabonitacol"}
  ]'::jsonb,
  (SELECT id FROM public.templates WHERE code = 'decor-warm'),
  (SELECT id FROM public.plans      WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  NULL,
  ARRAY['nequi', 'daviplata', 'transferencia', 'efectivo', 'tarjeta']::public.payment_method[],
  true,
  '{
    "hours":        "Lun–Sáb 9am–7pm · Dom cerrado",
    "shippingInfo": "Envío en Bogotá: 1–2 días. Envío nacional: 3–7 días hábiles. Artículos grandes incluyen instalación."
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;


-- ── 2. Store Appearance ───────────────────────────────────────────────────────

INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
)
VALUES (
  '10000000-0000-0000-0000-000000000007',
  NULL,
  'minimalista',
  '{}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  '[
    {"id": "hero",       "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products",   "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio",      "href": "/"},
      {"label": "Catálogo",    "href": "/catalogo"},
      {"label": "Info",        "href": "/info"}
    ],
    "productGroups": {
      "displayMode": "stacked",
      "groups": [
        {
          "id": "a0000007-0000-0000-0000-000000000001",
          "name": "Salas y Sillas",
          "productIds": [
            "30000000-0000-0000-0007-000000000001",
            "30000000-0000-0000-0007-000000000002",
            "30000000-0000-0000-0007-000000000003",
            "30000000-0000-0000-0007-000000000004"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000007-0000-0000-0000-000000000002",
          "name": "Dormitorio",
          "productIds": [
            "30000000-0000-0000-0007-000000000005",
            "30000000-0000-0000-0007-000000000006",
            "30000000-0000-0000-0007-000000000007"
          ],
          "sortOrder": 1
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName":   "Casa Bonita",
    "description": "Tu tienda de muebles y decoración para el hogar perfecto."
  }'::jsonb
)
ON CONFLICT (store_id) DO NOTHING;


-- ── 3. Categories ─────────────────────────────────────────────────────────────
-- UUIDs: 20000000-0000-0000-0007-{seq:012}

INSERT INTO public.categories (id, store_id, name, slug, description, icon, sort_order)
VALUES
  ('20000000-0000-0000-0007-000000000001', '10000000-0000-0000-0000-000000000007',
   'Salas',          'salas',          'Sofás, sillones y mesas para tu sala',  'Sofa',      0),
  ('20000000-0000-0000-0007-000000000002', '10000000-0000-0000-0000-000000000007',
   'Escritorios',    'escritorios',    'Escritorios y sillas de oficina',        'BookOpen',  1),
  ('20000000-0000-0000-0007-000000000003', '10000000-0000-0000-0000-000000000007',
   'Dormitorio',     'dormitorio',     'Camas, colchones y ropa de cama',        'BedDouble', 2),
  ('20000000-0000-0000-0007-000000000004', '10000000-0000-0000-0000-000000000007',
   'Decoración',     'decoracion',     'Cuadros, plantas y objetos decorativos', 'Flower2',   3),
  ('20000000-0000-0000-0007-000000000005', '10000000-0000-0000-0000-000000000007',
   'Iluminación',    'iluminacion',    'Lámparas y accesorios de iluminación',   'Lamp',      4),
  ('20000000-0000-0000-0007-000000000006', '10000000-0000-0000-0000-000000000007',
   'Almacenamiento', 'almacenamiento', 'Estantes, cajones y organizadores',      'Archive',   5)
ON CONFLICT (id) DO NOTHING;


-- ── 4. Products ───────────────────────────────────────────────────────────────
-- UUIDs: 30000000-0000-0000-0007-{seq:012}
-- Categories mapping (mock categoryId → real category UUID):
--   cat-chair  → salas     (20000000-0000-0000-0007-000000000001)  [closest fit — sillas]
--   cat-living → salas     (20000000-0000-0000-0007-000000000001)
--   cat-bed    → dormitorio (20000000-0000-0000-0007-000000000003)

INSERT INTO public.products (
  id,
  store_id,
  category_id,
  name,
  slug,
  description,
  price,
  compare_at_price,
  available,
  featured,
  is_best_seller,
  tags,
  sort_order
)
VALUES
  -- dw-p1: Silla Aluminio (cat-chair → salas)
  ('30000000-0000-0000-0007-000000000001',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000001',
   'Silla Aluminio',
   'silla-aluminio',
   'Silla de aluminio premium con diseño minimalista y resistente.',
   380000,
   520000,
   true,
   false,
   true,
   ARRAY['_popular'],
   0),

  -- dw-p2: Silla Estilizada (cat-chair → salas)
  ('30000000-0000-0000-0007-000000000002',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000001',
   'Silla Estilizada',
   'silla-estilizada',
   'Silla estilizada con tela suave y patas de madera natural.',
   295000,
   NULL,
   true,
   false,
   false,
   ARRAY[]::text[],
   1),

  -- dw-p3: Sofá Escandinavo (cat-living → salas)
  ('30000000-0000-0000-0007-000000000003',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000001',
   'Sofá Escandinavo',
   'sofa-escandinavo',
   'Sofá nórdico de 3 puestos con estructura en madera maciza.',
   1850000,
   2200000,
   true,
   true,
   true,
   ARRAY['_featured', '_popular'],
   2),

  -- dw-p4: Sofá Chesterfield (cat-living → salas)
  ('30000000-0000-0000-0007-000000000004',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000001',
   'Sofá Chesterfield',
   'sofa-chesterfield',
   'Sofá Chesterfield clásico en cuero legítimo con detalles capitoné.',
   2800000,
   3400000,
   true,
   true,
   false,
   ARRAY['_featured'],
   3),

  -- dw-p5: Cama King Marrón (cat-bed → dormitorio)
  ('30000000-0000-0000-0007-000000000005',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000003',
   'Cama King Marrón',
   'cama-king-marron',
   'Cama king size con cabecero tapizado en tela texturizada.',
   2100000,
   NULL,
   true,
   false,
   false,
   ARRAY[]::text[],
   4),

  -- dw-p6: Cama Verde Natura (cat-bed → dormitorio)
  ('30000000-0000-0000-0007-000000000006',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000003',
   'Cama Verde Natura',
   'cama-verde-natura',
   'Cama con cabecero acolchado en tonos naturales y verdes.',
   1650000,
   1950000,
   true,
   false,
   false,
   ARRAY['_sale'],
   5),

  -- dw-p7: Cama King Premium (cat-bed → dormitorio)
  ('30000000-0000-0000-0007-000000000007',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000003',
   'Cama King Premium',
   'cama-king-premium',
   'Cama king premium con plataforma baja y cabecero de madera.',
   2450000,
   2900000,
   true,
   true,
   false,
   ARRAY['_featured', '_new'],
   6),

  -- dw-p8: Cama Individual (cat-bed → dormitorio)
  ('30000000-0000-0000-0007-000000000008',
   '10000000-0000-0000-0000-000000000007',
   '20000000-0000-0000-0007-000000000003',
   'Cama Individual',
   'cama-individual',
   'Cama individual con almacenaje integrado y acabado en madera clara.',
   980000,
   NULL,
   false,
   false,
   false,
   ARRAY[]::text[],
   7)

ON CONFLICT (id) DO NOTHING;


-- ── 5. Product Images ─────────────────────────────────────────────────────────

INSERT INTO public.product_images (id, product_id, store_id, url, sort_order)
VALUES
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000001', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/chair-aluminum.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000002', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/chair-stylish.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000003', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/sofa-scandinavian.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000004', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/sofa-chesterfield.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000005', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/bed-brown.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000006', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/bed-green.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000007', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/bed-king.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0007-000000000008', '10000000-0000-0000-0000-000000000007',
   '/mocks/decor-warm/bed-single.png', 0)

ON CONFLICT DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════════
-- FOOD NIGHT — PizzaNight
-- ═══════════════════════════════════════════════════════════════════════════════

-- ── 1. Store ──────────────────────────────────────────────────────────────────

INSERT INTO public.stores (
  id,
  owner_id,
  name,
  slug,
  description,
  social_media,
  template_id,
  plan_id,
  currency_id,
  catalog_mode,
  palette_id,
  payment_methods,
  onboarding_completed,
  business_info
)
VALUES (
  '10000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000001',
  'PizzaNight',
  'pizza-night-store',
  NULL,
  '[
    {"platform": "whatsapp",  "value": "573001234567"},
    {"platform": "instagram", "value": "pizzanight"},
    {"platform": "facebook",  "value": "pizzanight"}
  ]'::jsonb,
  (SELECT id FROM public.templates WHERE code = 'food-night'),
  (SELECT id FROM public.plans      WHERE code = 'pro'),
  (SELECT id FROM public.currencies WHERE code = 'COP'),
  'simple',
  NULL,
  ARRAY['nequi', 'daviplata', 'efectivo', 'tarjeta']::public.payment_method[],
  true,
  '{
    "hours":        "Lun–Dom 12pm–11pm · Domicilios hasta las 10:30pm",
    "shippingInfo": "Domicilio en 30–45 minutos dentro de la ciudad. Sin costo mínimo de pedido."
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;


-- ── 2. Store Appearance ───────────────────────────────────────────────────────

INSERT INTO public.store_appearance (
  store_id,
  palette_id,
  font_pair,
  theme,
  layout,
  variants,
  sections,
  content,
  branding
)
VALUES (
  '10000000-0000-0000-0000-000000000008',
  NULL,
  'minimalista',
  '{}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  '[
    {"id": "hero",       "visible": true},
    {"id": "categories", "visible": true},
    {"id": "products",   "visible": true}
  ]'::jsonb,
  '{
    "navLinks": [
      {"label": "Inicio",    "href": "/"},
      {"label": "Menú",      "href": "/catalogo"},
      {"label": "Info",      "href": "/info"}
    ],
    "productGroups": {
      "displayMode": "tabs",
      "groups": [
        {
          "id": "a0000008-0000-0000-0000-000000000001",
          "name": "Platos Fuertes",
          "productIds": [
            "30000000-0000-0000-0008-000000000001",
            "30000000-0000-0000-0008-000000000002",
            "30000000-0000-0000-0008-000000000005",
            "30000000-0000-0000-0008-000000000006"
          ],
          "sortOrder": 0
        },
        {
          "id": "a0000008-0000-0000-0000-000000000002",
          "name": "Especiales",
          "productIds": [
            "30000000-0000-0000-0008-000000000003",
            "30000000-0000-0000-0008-000000000005",
            "30000000-0000-0000-0008-000000000001"
          ],
          "sortOrder": 1
        },
        {
          "id": "a0000008-0000-0000-0000-000000000003",
          "name": "Veggie",
          "productIds": [
            "30000000-0000-0000-0008-000000000004",
            "30000000-0000-0000-0008-000000000002"
          ],
          "sortOrder": 2
        }
      ]
    }
  }'::jsonb,
  '{
    "storeName": "PizzaNight"
  }'::jsonb
)
ON CONFLICT (store_id) DO NOTHING;


-- ── 3. Categories ─────────────────────────────────────────────────────────────
-- UUIDs: 20000000-0000-0000-0008-{seq:012}

INSERT INTO public.categories (id, store_id, name, slug, description, icon, sort_order)
VALUES
  ('20000000-0000-0000-0008-000000000001', '10000000-0000-0000-0000-000000000008',
   'Pizzas',        'pizzas',        'Pizzas artesanales al horno de piedra',   'Pizza',     0),
  ('20000000-0000-0000-0008-000000000002', '10000000-0000-0000-0000-000000000008',
   'Hamburguesas',  'hamburguesas',  'Hamburguesas gourmet con ingredientes frescos', 'Utensils', 1),
  ('20000000-0000-0000-0008-000000000003', '10000000-0000-0000-0000-000000000008',
   'Pollos',        'pollos',        'Pollo asado y fajitas al estilo casero',  'Drumstick', 2),
  ('20000000-0000-0000-0008-000000000004', '10000000-0000-0000-0000-000000000008',
   'Vegetariano',   'vegetariano',   'Opciones sin carne llenas de sabor',      'Salad',     3),
  ('20000000-0000-0000-0008-000000000005', '10000000-0000-0000-0000-000000000008',
   'Combos',        'combos',        'Combos para compartir con toda la familia', 'Package',  4),
  ('20000000-0000-0000-0008-000000000006', '10000000-0000-0000-0000-000000000008',
   'Bebidas',       'bebidas',       'Bebidas frías y calientes',               'Coffee',    5)
ON CONFLICT (id) DO NOTHING;


-- ── 4. Products ───────────────────────────────────────────────────────────────
-- UUIDs: 30000000-0000-0000-0008-{seq:012}
-- category mapping: cat-01→pizzas, cat-02→hamburguesas, cat-03→pollos, cat-04→vegetariano

INSERT INTO public.products (
  id,
  store_id,
  category_id,
  name,
  slug,
  description,
  price,
  compare_at_price,
  available,
  featured,
  is_best_seller,
  tags,
  sort_order
)
VALUES
  -- prod-01: Pizza de Res y Jalapeños (cat-01 → pizzas)
  ('30000000-0000-0000-0008-000000000001',
   '10000000-0000-0000-0000-000000000008',
   '20000000-0000-0000-0008-000000000001',
   'Pizza de Res y Jalapeños',
   'pizza-res-jalapenos',
   'Pizza con carne de res premium, jalapeños frescos, queso mozzarella y salsa de tomate artesanal.',
   35000,
   42000,
   true,
   true,
   true,
   ARRAY['_popular', '_featured'],
   0),

  -- prod-02: Pizza Fajita de Pollo (cat-01 → pizzas)
  ('30000000-0000-0000-0008-000000000002',
   '10000000-0000-0000-0000-000000000008',
   '20000000-0000-0000-0008-000000000001',
   'Pizza Fajita de Pollo',
   'pizza-fajita-pollo',
   'Pizza con pollo a las fajitas, pimientos, cebolla caramelizada y crema de cilantro.',
   32000,
   NULL,
   true,
   false,
   true,
   ARRAY['_popular'],
   1),

  -- prod-03: Pizza Tikka Masala (cat-01 → pizzas)
  ('30000000-0000-0000-0008-000000000003',
   '10000000-0000-0000-0000-000000000008',
   '20000000-0000-0000-0008-000000000001',
   'Pizza Tikka Masala',
   'pizza-tikka-masala',
   'Fusión Indo-Italiana con pollo tikka, salsa masala, queso paneer y cilantro fresco.',
   38000,
   45000,
   true,
   true,
   false,
   ARRAY['_featured', '_new'],
   2),

  -- prod-04: Pizza Vegetariana Deluxe (cat-04 → vegetariano)
  ('30000000-0000-0000-0008-000000000004',
   '10000000-0000-0000-0000-000000000008',
   '20000000-0000-0000-0008-000000000004',
   'Pizza Vegetariana Deluxe',
   'pizza-vegetariana-deluxe',
   'Vegetales frescos, aceitunas, champiñones, pimientos y queso gratinado. Sin carne.',
   28000,
   NULL,
   true,
   false,
   false,
   ARRAY[]::text[],
   3),

  -- prod-05: Fajita Supreme al Horno (cat-03 → pollos)
  ('30000000-0000-0000-0008-000000000005',
   '10000000-0000-0000-0000-000000000008',
   '20000000-0000-0000-0008-000000000003',
   'Fajita Supreme al Horno',
   'fajita-supreme-horno',
   'Bandeja de fajitas supreme con pollo, res, camarones y todo el acompañamiento.',
   42000,
   50000,
   true,
   true,
   true,
   ARRAY['_popular', '_featured', '_bestseller'],
   4),

  -- prod-06: Pizza BBQ con Tocineta (cat-01 → pizzas)
  ('30000000-0000-0000-0008-000000000006',
   '10000000-0000-0000-0000-000000000008',
   '20000000-0000-0000-0008-000000000001',
   'Pizza BBQ con Tocineta',
   'pizza-bbq-tocineta',
   'Pizza con salsa BBQ ahumada, tocineta crujiente, cebolla morada y queso gouda.',
   36000,
   NULL,
   false,
   false,
   true,
   ARRAY['_popular'],
   5)

ON CONFLICT (id) DO NOTHING;


-- ── 5. Product Images ─────────────────────────────────────────────────────────

INSERT INTO public.product_images (id, product_id, store_id, url, sort_order)
VALUES
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000001', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-beef.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000002', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-fajita.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000003', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-tikka.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000004', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-veg.png', 0),
  -- prod-05 has 3 images in mock (detail view)
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/detail-fajita.png', 0),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-beef.png', 1),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-fajita.png', 2),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000006', '10000000-0000-0000-0000-000000000008',
   '/mocks/food-night/pizza-beef.png', 0)

ON CONFLICT DO NOTHING;


-- ── 6. Product Variants (size options) ───────────────────────────────────────
-- food-night uses S / M / L / XL size variants for all products.
-- price_modifier is offset from base price:
--   S  → −3000 (smaller = cheaper)
--   M  →     0 (base price, no offset)
--   L  → +5000
--   XL → +8000

INSERT INTO public.product_variants (id, product_id, name, price_modifier, type, metadata)
VALUES
  -- prod-01 Pizza de Res y Jalapeños
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000001', 'S',  -3000, 'size', '{"label": "S",  "order": 2}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000001', 'M',      0, 'size', '{"label": "M",  "order": 3}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000001', 'L',   5000, 'size', '{"label": "L",  "order": 4}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000001', 'XL',  8000, 'size', '{"label": "XL", "order": 5}'),

  -- prod-02 Pizza Fajita de Pollo
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000002', 'S',  -3000, 'size', '{"label": "S",  "order": 2}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000002', 'M',      0, 'size', '{"label": "M",  "order": 3}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000002', 'L',   5000, 'size', '{"label": "L",  "order": 4}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000002', 'XL',  8000, 'size', '{"label": "XL", "order": 5}'),

  -- prod-03 Pizza Tikka Masala
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000003', 'S',  -3000, 'size', '{"label": "S",  "order": 2}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000003', 'M',      0, 'size', '{"label": "M",  "order": 3}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000003', 'L',   5000, 'size', '{"label": "L",  "order": 4}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000003', 'XL',  8000, 'size', '{"label": "XL", "order": 5}'),

  -- prod-04 Pizza Vegetariana Deluxe
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000004', 'S',  -3000, 'size', '{"label": "S",  "order": 2}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000004', 'M',      0, 'size', '{"label": "M",  "order": 3}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000004', 'L',   5000, 'size', '{"label": "L",  "order": 4}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000004', 'XL',  8000, 'size', '{"label": "XL", "order": 5}'),

  -- prod-05 Fajita Supreme al Horno
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', 'S',  -3000, 'size', '{"label": "S",  "order": 2}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', 'M',      0, 'size', '{"label": "M",  "order": 3}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', 'L',   5000, 'size', '{"label": "L",  "order": 4}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000005', 'XL',  8000, 'size', '{"label": "XL", "order": 5}'),

  -- prod-06 Pizza BBQ con Tocineta
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000006', 'S',  -3000, 'size', '{"label": "S",  "order": 2}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000006', 'M',      0, 'size', '{"label": "M",  "order": 3}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000006', 'L',   5000, 'size', '{"label": "L",  "order": 4}'),
  (gen_random_uuid(), '30000000-0000-0000-0008-000000000006', 'XL',  8000, 'size', '{"label": "XL", "order": 5}')

ON CONFLICT DO NOTHING;
