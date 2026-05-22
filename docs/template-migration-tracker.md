# Template Migration Tracker

Estado de migración de templates desde el repo viejo (`tiendri`) al nuevo (`tiendri_v2`).

**Repo origen**: `D:\info maicol\Documents\PERSONAL_PROJECTS\tiendri\src\components\templates\`
**Repo destino**: `D:\info maicol\Documents\PERSONAL_PROJECTS\tiendri_v2\src\templates\`
**Skill de migración**: `ai/skills/template-migrator/SKILL.md`

---

## Templates Implementados (14 en repo viejo)

| # | Template Viejo | Template Nuevo | Archivos | Figma | Estado | Notas |
|---|---------------|----------------|----------|-------|--------|-------|
| 1 | `tech2` | `tech-premium` | 26 | Si | ✅ **MIGRADO** | Template de referencia. 6 páginas, customizer, URL routing. |
| 2 | `tech` | — | 24 | Si | 🔲 Pendiente | Variante tech más limpia |
| 3 | `electronic` | — | 32 | Si | 🔲 Pendiente | Template de electrónica (más archivos = más complejo) |
| 4 | `fashion` | — | 27 | Si | 🔲 Pendiente | Moda y accesorios |
| 5 | `food` | — | 29 | Si | 🔲 Pendiente | Comida y restaurantes |
| 6 | `beauty` | — | 25 | Si | 🔲 Pendiente | Belleza y cuidado personal |
| 7 | `beauty-v2` | — | 24 | Si | 🔲 Pendiente | Segunda versión de belleza |
| 8 | `beauty-v3` | — | 19 | Si | 🔲 Pendiente | Tercera versión de belleza |
| 9 | `furniture` | — | 40 | Si | 🔲 Pendiente | Muebles (más archivos = más complejo) |
| 10 | `modern-furniture` | — | 20 | Si | 🔲 Pendiente | Muebles estilo moderno |
| 11 | `decor` | — | 27 | Si | 🔲 Pendiente | Decoración del hogar |
| 12 | `pet` | — | 22 | Si | 🔲 Pendiente | Mascotas |
| 13 | `pet-v2` | — | 27 | Si | 🔲 Pendiente | Mascotas v2 |
| 14 | `pet-v3` | — | 24 | Si | 🔲 Pendiente | Mascotas v3 |

## Carpetas Vacías (12 — solo nombres, sin implementación)

Estas carpetas existen en el repo viejo pero están vacías. NO requieren migración.

`beauty-bold`, `belleza-audaz`, `belleza-elegante`, `belleza-suave`, `comida-nocturna`, `electronica-clasico`, `mascotas-alegre`, `mascotas-clasico`, `mascotas-moderno`, `moda-minimal`, `tech-limpio`, `tech-premium`

---

## Prioridad Sugerida de Migración

Basada en diversidad de verticales y complejidad:

| Prioridad | Template | Vertical | Razón |
|-----------|----------|----------|-------|
| 1 | `food` | Comida | Vertical principal en Colombia. Estructura diferente (menú, delivery). |
| 2 | `fashion` | Moda | Alto volumen de merchants potenciales. |
| 3 | `beauty` | Belleza | Tercer vertical más demandado. |
| 4 | `pet` | Mascotas | Nicho creciente. |
| 5 | `furniture` | Muebles | Template más complejo (40 archivos). |
| 6 | `decor` | Decoración | Similar a furniture. |
| 7 | `electronic` | Electrónica | Similar a tech-premium ya migrado. |
| 8 | `tech` | Tecnología | Muy similar a tech-premium, menor prioridad. |
| 9-13 | v2/v3 variants | Varios | Variantes de templates ya migrados — migrar después del base. |

---

## Proceso de Migración

Para cada template, seguir las 9 fases del skill `template-migrator`:

1. **Discovery** — explorar componentes, imágenes, datos
2. **Scaffold** — crear estructura de carpetas
3. **Config** — definir colores, grid, layout, secciones
4. **Components** — migrar con reglas (zero hardcoded, CSS vars, español)
5. **Images** — copiar y renombrar
6. **Customization** — conectar CSS vars + layout options
7. **URL Routing** — sub-rutas
8. **Integration** — registry + metadata
9. **Verification** — TypeScript, visual, navegación, customizer

**Tiempo estimado por template**: 2-4 horas (basado en la experiencia con tech-premium, excluyendo iteraciones de ajuste visual con Figma).

---

## Notas

- Los templates v2/v3 (beauty-v2, pet-v3, etc.) son variantes del template base. Migrar primero el base y después las variantes.
- `furniture` tiene 40 archivos — es el más complejo. Planear más tiempo.
- `electronic` (32 archivos) es similar a `tech2` que ya migramos. Debería ser rápido.
- Todos los templates tienen `url.txt` con links a Figma — SIEMPRE usar Figma como fuente de verdad visual.
