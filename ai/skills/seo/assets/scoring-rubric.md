# Rúbrica de Scoring SEO — 100 puntos

## 1. Metadata (25 pts)

| Check | Pts | Criterio |
|-------|-----|----------|
| Title existe | 3 | Toda página pública tiene title |
| Title longitud | 3 | 50-60 caracteres |
| Title keyword | 3 | Keyword principal al inicio |
| Description existe | 3 | Toda página pública tiene description |
| Description longitud | 3 | 150-160 caracteres |
| Description CTA | 2 | Incluye llamado a la acción |
| Open Graph completo | 4 | title, description, image, type, url |
| Twitter Cards | 4 | card, title, description, image |

**Deducciones**: Title faltante: -5 | Title muy corto/largo: -2 | Description faltante: -5 | OG faltante: -3 | Twitter faltante: -2

## 2. Structured Data (20 pts)

| Check | Pts | Criterio |
|-------|-----|----------|
| JSON-LD existe | 8 | Al menos un schema por página pública |
| Campos requeridos | 6 | @context, @type, name + campos del tipo |
| Schema correcto por tipo | 4 | Product para productos, Organization para tienda |
| Validación pasa | 2 | Sin errores en Google Rich Results Test |

**Deducciones**: Sin structured data: -8 | Campos faltantes: -3 | Schema incorrecto: -4

## 3. Contenido (20 pts)

| Check | Pts | Criterio |
|-------|-----|----------|
| H1 único | 4 | Exactamente UN H1 por página |
| Jerarquía headings | 3 | H1 → H2 → H3 sin saltos |
| Alt text en imágenes | 4 | TODA imagen tiene alt descriptivo |
| Links internos | 3 | Al menos 2-3 links internos por página |
| Contenido suficiente | 3 | Landing: >200 palabras, páginas: >100 |
| Keyword en H1 | 3 | H1 contiene keyword principal |

**Deducciones**: H1 duplicado/faltante: -4 | Imágenes sin alt: -2 por imagen | Sin links internos: -3

## 4. Technical SEO (15 pts)

| Check | Pts | Criterio |
|-------|-----|----------|
| robots.txt | 3 | Existe, permite storefronts, bloquea dashboard |
| sitemap.xml | 3 | Existe, incluye tiendas públicas |
| URLs limpias | 3 | Semánticas, sin IDs, sin query params innecesarios |
| HTTPS | 2 | Enforced en toda la app |
| Canonical URLs | 2 | Definidos en páginas con riesgo de duplicado |
| No broken links | 2 | Sin links internos rotos |

## 5. Performance (10 pts)

| Check | Pts | Criterio |
|-------|-----|----------|
| next/image | 3 | No hay `<img>` directo, todo vía next/image |
| next/font | 2 | Fonts optimizados con display: swap |
| WebP | 2 | Imágenes servidas en WebP |
| Code splitting | 2 | dynamic imports para componentes heavy |
| No render blocking | 1 | Sin scripts blocking en head |

## 6. Mobile (10 pts)

| Check | Pts | Criterio |
|-------|-----|----------|
| Viewport meta | 2 | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Responsive | 3 | Layout se adapta correctamente a 320px-1440px |
| Tap targets | 2 | Botones/links mínimo 44x44px |
| Font legible | 2 | Mínimo 16px para body text |
| No horizontal scroll | 1 | Sin overflow-x en ningún breakpoint |

## Calificaciones

| Score | Calificación | Acción |
|-------|-------------|--------|
| 90-100 | Excelente | Mantener y monitorear |
| 75-89 | Bueno | Corregir hallazgos medios |
| 60-74 | Regular | Priorizar hallazgos altos |
| 40-59 | Pobre | Plan de remediación urgente |
| <40 | Crítico | Detener y corregir antes de seguir |
