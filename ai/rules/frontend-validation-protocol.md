# Frontend Validation Protocol

**Quién lo usa**: Camilo (validación funcional + Golden Path), Valentina (validación visual)
**Cuándo**: OBLIGATORIO antes de reportar cualquier tarea como terminada. `tsc --noEmit` verifica tipos, NO comportamiento en runtime — ambos son necesarios.

---

## Viewports de referencia

| Viewport | Width × Height | Uso |
|---|---|---|
| Mobile | 375 × 812 | Validación mobile (baseline) |
| Tablet | 768 × 1024 | Verificación tablet si aplica |
| Desktop | 1440 × 900 | Validación desktop (obligatorio) |

---

## Protocolo de Camilo — Golden Path Funcional

1. **Verificar que el dev server está corriendo** — si no, levantarlo con `pnpm dev`
2. **Cargar skill de browser**: leer `ai/skills/browser-testing/SKILL.md` y `ai/skills/agent-browser/SKILL.md`
3. **Revisar errores de consola PRIMERO**: `browser_console_messages` — CERO errores JS antes de continuar
4. **Verificar el Golden Path completo** con `browser_navigate` + interacciones:
   - [ ] Home page renderiza todos los componentes sin errores visuales
   - [ ] Navegación funciona: click en producto → página de detalle se carga
   - [ ] Agregar producto al carrito funciona (botón responde, carrito se actualiza)
   - [ ] Carrito muestra items, increment/decrement de cantidad funciona
   - [ ] Carrito persiste en `localStorage` entre recargas (`browser_evaluate → localStorage.getItem('tc_cart_{slug}')`)
   - [ ] Checkout form valida campos requeridos (intentar submit vacío → errores visibles)
   - [ ] Link de WhatsApp se genera con el formato `wa.me/{phone}?text=...` correcto
   - [ ] Search filtra productos correctamente al escribir
   - [ ] Animaciones de Framer Motion / GSAP no causan errores en consola
   - [ ] No hay scroll horizontal no deseado en ninguna página
5. **Verificar responsive** en AMBOS viewports:
   - Mobile: `browser_resize → { width: 375, height: 812 }` → screenshot
   - Desktop: `browser_resize → { width: 1440, height: 900 }` → screenshot
6. **Si hay errores**: corregir y repetir desde el paso 3. Hasta 3 iteraciones.
7. **Solo reportar como terminado** después de que TODO el Golden Path pase sin errores.

### Checks adicionales Camilo

- **Overflow**: verificar que no hay scroll no deseado en páginas `h-screen`
- **Responsive**: si el cambio afecta layout, verificar en 375px Y 1024px

---

## Protocolo de Valentina — Validación Visual

1. **Verificar que el dev server está corriendo** — si no, levantarlo con `pnpm dev`
2. **Cargar skill de browser**: leer `ai/skills/browser-testing/SKILL.md` y `ai/skills/agent-browser/SKILL.md`
3. **Navegar a la ruta correspondiente** con `browser_navigate`
4. **Capturar screenshots en AMBOS viewports**:
   - Mobile: `browser_resize → { width: 375, height: 812 }` → `browser_take_screenshot`
   - Desktop: `browser_resize → { width: 1440, height: 900 }` → `browser_take_screenshot`
5. **Verificar visualmente** que cada componente cumple:
   - [ ] Colores coinciden con el design system aprobado (CSS variables del tema)
   - [ ] Tipografía: jerarquía clara, tamaños correctos, peso correcto
   - [ ] Spacing: padding/margin coherente con el sistema de 8px
   - [ ] Bordes, sombras y efectos glassmorphism se ven como se definieron
   - [ ] Responsive: en mobile no hay overflow horizontal, en desktop el contenido supera el 40% del viewport
   - [ ] TODOS los elementos del mockup están presentes (badges, ratings, banners, etc.)
   - [ ] Imágenes no colapsan ni se cortan (`object-cover` / `object-contain` correcto)
   - [ ] Estados visuales correctos (hover states se ven bien vía `browser_hover`)
6. **Si hay errores visuales**: corregir y repetir desde el paso 4. Hasta 3 iteraciones.
7. **Solo reportar como terminado** después de que los screenshots confirmen que todo está correcto.

---

## Evidencia de entrega (ambos agentes)

Al reportar al CTO, incluir:
- Screenshots de mobile (375px) y desktop (1440px) como evidencia
- Camilo: confirmación explícita "Golden Path validado — CERO errores de consola"
- Valentina: checklist de validación visual completada
- Si hubo correcciones: mencionar qué se corrigió y en cuántas iteraciones

---

## Lo que NO es validación suficiente

- "Funciona en mi cabeza" → NO
- `tsc --noEmit` sin errores → NECESARIO pero NO SUFICIENTE
- "El código se ve correcto" sin haber interactuado con los flujos → NO
- Solo verificar mobile sin desktop (o viceversa) → NO
- Verificar solo la home sin probar navegación → NO
