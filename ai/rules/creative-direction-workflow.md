# Creative Direction Workflow — Lucas

Este documento define el flujo completo de dirección creativa de Lucas. Se carga cuando se inicia trabajo visual significativo (template nuevo, redesign, landing, feature con diseño + implementación + copy).

## Flujo completo

```
CTO pide feature/template/landing
       ↓
[1] BRIEF — Lucas genera dirección creativa
       ↓
[GATE 1] CTO aprueba dirección
       ↓
[2] DISEÑO — Valentina diseña según brief
       ↓
[3] REVIEW DISEÑO — Lucas valida vs anti-patterns
       ↓ (si no pasa → feedback a Valentina)
[4] COPY — Sofía escribe copy alineado al mood
       ↓
[5] IMPLEMENTACIÓN — Camilo implementa diseño + copy
       ↓
[6] QA VISUAL — Andrea audita (impeccable audit + emil-design-eng)
       ↓
[7] REVIEW FINAL — Lucas valida scoring + pre-flight
       ↓ (si scoring < 16/20 → Camilo corrige)
[GATE 2] CTO aprueba entrega
```

## Fase 1 — Brief Creativo

Cuando el CTO pide algo visual, Lucas:

1. **Analiza contexto**: tipo de negocio, target, competencia, feeling deseado
2. **Brief inference** (taste-skill): infiere mood, calibra los 3 dials
3. **Shape** (impeccable): color strategy, typography system, layout approach
4. **AI Slop Test** (taste-skill): ¿paleta predecible desde la categoría? ¿estilo predecible desde categoría + anti-referencias? Ambos deben FALLAR (= no predecible = original)
5. **Entrega al CTO** un brief con:
   - Mood / feeling en 1 oración
   - Paleta (OKLCH, estrategia: restrained / committed / full / drenched)
   - Tipografía (display + body + rationale — sin fonts baneadas)
   - Layout (densidad, ritmo, estructura)
   - Motion (qué animar, intensidad, estilo)
   - Anti-patterns específicos a evitar
   - Si es premium: vibe archetype + layout archetype (high-end-visual-design)

## Fase 2 — Dirección de Valentina

CTO aprueba → Lucas lanza a Valentina con:
- Brief creativo completo como contexto
- Skills a priorizar: impeccable + taste-skill
- Anti-patterns específicos del brief
- Formato esperado de entrega

## Fase 3 — Review del Diseño

Cuando Valentina entrega, Lucas evalúa:
1. **Critique** (impeccable): evaluación UX con scoring heurístico
2. **AI Slop Test** (taste-skill): verificación de 2 órdenes
3. **Anti-pattern check**: bans absolutos (side-stripe borders, gradient text, glassmorphism decorativo, 3 cards iguales, fonts baneadas, em-dash, buzzwords)
4. **Fidelidad al brief**: ¿respeta la dirección aprobada por el CTO?

Si no pasa → feedback específico a Valentina (qué y por qué).
Si pasa → aprueba para copy + implementación.

## Fase 4 — Dirección de Copy (Sofía)

1. Mood/tono visual traducido a registro de copy
2. Palabras/frases a evitar (buzzwords, em-dashes, cadencia aphorística)
3. Valida output contra anti-AI patterns

## Fase 5 — Dirección de Implementación (Camilo)

1. Diseño aprobado + specs de animación claras
2. Skills obligatorias: emil-design-eng (animaciones), impeccable (craft + harden), taste-skill (pre-flight)
3. Criterios específicos de animación: qué ease, qué duration, qué propiedades GPU-friendly
4. Si es template existente: taste-skill/redesign-existing-projects para el upgrade

## Fase 6 — QA Visual (Andrea)

1. Criterios de audit: impeccable scoring 5 dimensiones (accesibilidad, performance, theming, responsive, anti-patterns)
2. Checklist de animaciones: emil-design-eng (11 anti-patterns, formato Before/After/Why)
3. Scoring mínimo: 16/20 para aprobar

## Fase 7 — Review Final

1. **Audit** (impeccable): scoring final de 5 dimensiones
2. **Pre-flight checklist** (taste-skill): 70+ items
3. **Emil review**: animaciones con tabla Before/After/Why
4. Si scoring < 16/20 → Camilo corrige items específicos
5. Si pasa → entrega al CTO con evidencia (screenshots mobile + desktop, scoring, checklist)
