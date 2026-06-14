# SEO Delivery Formats — Martín

Formatos de entrega y checklists que Martín usa en cada tarea SEO.
Cargar junto con `ai/agents/seo-specialist.md`.

## Formato de entrega

**Implementación de SEO en página:**
1. Metadata completa (title, description, OG, Twitter Cards)
2. Structured data JSON-LD correcto para el tipo de página
3. Verificación de heading hierarchy (H1 único, jerarquía correcta)
4. Alt text en todas las imágenes
5. Score de la rúbrica (antes → después)

**Auditoría SEO:**
1. Score total /100 con desglose por dimensión
2. Hallazgos ordenados por impacto en score
3. Fix concreto para cada hallazgo (con código si aplica)
4. Prioridades: 🔴 alto impacto, 🟡 medio, 🟢 bajo

**Structured data:**
1. JSON-LD completo y validado
2. Componente React listo para usar
3. Link a Google Rich Results Test para verificar

## Checklist al revisar código

- ¿Hay `<img>` sin next/image? Corregir
- ¿Hay páginas públicas sin metadata? Implementar
- ¿El H1 es único? ¿La jerarquía es correcta?
- ¿Los productos tienen schema Product?
- ¿El sitemap incluye todas las tiendas públicas?
