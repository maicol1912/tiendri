# Sistema de Onboarding

Wizard de configuración inicial + tour guiado para nuevos merchants.

---

## 1. Flujo del wizard

Wizard de 5 pasos que captura datos básicos de la tienda y preferencias de estilo, luego crea la tienda y redirige al dashboard.

La ruta es `src/app/(onboarding)/onboarding/page.tsx`. El step activo se controla por query param (`?step=N`), lo que permite navegación con el botón Atrás del browser.

Pasos:

- Paso 1 — Tu tienda: nombre, número de WhatsApp y slug generado automáticamente
- Paso 2 — Tu catálogo: modo de catálogo (simple o por secciones)
- Paso 3 — El estilo: selección de vibe (personalidad visual de la tienda)
- Paso 4 — El look: color de acento y logo (misma pantalla que paso 5 en la implementación actual)
- Paso 5 — Tu marca: color de acento y logo

Al completar el paso 5 se ejecuta `handleCreateStore()`: escribe la metadata de la tienda y la customización en localStorage, marca el onboarding como completado, dispara el flag del tour en sessionStorage y redirige a `/onboarding?step=celebration`. La pantalla de celebración muestra el link de la tienda y el botón para ir al dashboard.

---

## 2. Sistema de vibes

Un vibe es un arquetipo de personalidad visual que determina el estilo inicial de la tienda. El merchant elige un vibe en el paso 3; esa elección selecciona el `defaultTemplateId` (actualmente siempre `tech-premium` en MVP) y los colores de preview representativos.

Existen 5 vibes definidos en `src/lib/onboarding/vibe-preset-map.ts`:

- `elegante` — Joyería, boutique, beauty
- `moderno` — Tecnología, moda juvenil, gaming
- `energetico` — Ropa deportiva, moda caribeña, merch
- `calido` — Artesanías, café especial, vintage
- `catalogo` — Abarrotes, ferretería, B2B

Cada vibe define nombre, descripción, `defaultTemplateId` y 3 colores hex de preview. La conexión con presets fue removida de la implementación actual; el vibe solo mapea al template.

---

## 3. Estado y guards

`OnboardingProvider` (`src/lib/onboarding/onboarding-provider.tsx`) gestiona el estado del wizard vía React Context. Persiste en localStorage como draft para que el merchant pueda cerrar el browser y continuar donde quedó. El estado incluye: step actual, nombre, whatsapp, slug, catalogMode, selectedVibe, accentColor y logoUrl.

El guard de redirect está en `src/lib/onboarding/first-time.ts`: expone `isOnboardingCompleted()` y `shouldRedirectToOnboarding()`. Retorna `true` en servidor (SSR-safe) para evitar redirects en SSR; la verificación real ocurre solo en cliente. `markOnboardingCompleted()` se llama al crear la tienda y escribe la flag en localStorage.

---

## 4. Tour guiado

Después del primer acceso al dashboard, un tour guiado de 5 pasos resalta las funciones clave: productos, categorías, configuración, preview y compartir. Se implementa con driver.js, definido en `src/lib/onboarding/tour-steps.ts` y activado por `src/hooks/useDashboardTour.ts`.

El tour se dispara cuando `sessionStorage['tiendri_tour_trigger'] === 'true'` (flag efímero escrito al crear la tienda) y `localStorage['tiendri_tour_completed']` no existe. Una vez completado o cerrado, se escribe `tiendri_tour_completed` en localStorage y no se vuelve a mostrar.

---

## 5. Como modificar el wizard

1. Agregar o quitar un componente de paso en `src/components/onboarding/` con la convención `step{N}-{nombre}.tsx`
2. Actualizar el objeto `stepComponents` en `src/app/(onboarding)/onboarding/page.tsx` para mapear el número de paso al componente
3. Actualizar `TOTAL_STEPS` y `STEP_TITLES` en `src/components/onboarding/onboarding-shell.tsx`
4. Actualizar `canProceedForStep()` en la misma página con la lógica de validación del nuevo paso
5. Si el paso captura un nuevo campo, agregarlo a `OnboardingState` en `src/types/onboarding.ts` y a `INITIAL_ONBOARDING_STATE`
6. Para agregar un vibe: añadir el ID a `VibeId` en `src/types/onboarding.ts` y la config completa a `VIBE_CONFIGS` en `src/lib/onboarding/vibe-preset-map.ts`

---

## 6. Archivos clave

- `src/app/(onboarding)/onboarding/page.tsx` — página principal: orquesta pasos, validación y creación de tienda
- `src/components/onboarding/onboarding-shell.tsx` — shell: barra de progreso, animaciones, botones de navegación
- `src/components/onboarding/step1-store-info.tsx` — paso 1
- `src/components/onboarding/step2-catalog-mode.tsx` — paso 2
- `src/components/onboarding/step3-vibe-selection.tsx` — paso 3
- `src/components/onboarding/step5-branding.tsx` — pasos 4 y 5 (branding)
- `src/components/onboarding/celebration-screen.tsx` — pantalla de celebración post-submit
- `src/lib/onboarding/onboarding-provider.tsx` — React Context + persistencia de draft
- `src/lib/onboarding/vibe-preset-map.ts` — definición de los 5 vibes
- `src/lib/onboarding/first-time.ts` — guard de redirect y flags de completion
- `src/lib/onboarding/tour-steps.ts` — pasos del tour guiado
- `src/hooks/useDashboardTour.ts` — hook que dispara el tour en el dashboard
- `src/types/onboarding.ts` — tipos: OnboardingState, VibeId, AccentColor, CatalogMode

---

_Última actualización: 2026-06-13_
_Basado en código real de `src/app/(onboarding)/`, `src/lib/onboarding/`, `src/components/onboarding/`, `src/types/onboarding.ts`_
