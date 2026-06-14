# Video Embedding Pattern

**Quién lo usa**: Camilo (implementación), Valentina (definición de estructura visual)
**Cuándo**: Siempre que se integre un video generado por IA (Steve) en una página o sección

## Contexto

Los videos generados por IA tienen fondo negro. Para que se fundan visualmente con el fondo dark de la página, se aplica un degradado CSS en overlay que cubre los 4 bordes del video.

## Patrón completo (implementación — Camilo)

```tsx
<div className="relative w-full overflow-hidden" style={{ borderRadius: '20px' }}>
  <video autoPlay loop muted playsInline className="w-full block">
    <source src="/videos/{nombre}.mp4" type="video/mp4" />
  </video>
  {/* Degradado en los 4 bordes — funde el video con el fondo */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        linear-gradient(to right, var(--ember-bg-deep) 0%, transparent 15%, transparent 85%, var(--ember-bg-deep) 100%),
        linear-gradient(to bottom, var(--ember-bg-deep) 0%, transparent 12%, transparent 88%, var(--ember-bg-deep) 100%)
      `,
    }}
  />
</div>
```

## Reglas obligatorias

1. Videos SIEMPRE con `autoPlay loop muted playsInline` — sin excepción
2. SIEMPRE incluir el degradado CSS overlay que funde los bordes con el fondo de la sección
3. Elementos flotantes cerca del video DEBEN tener `z-20` o superior para no quedar por debajo del overlay
4. Videos en `public/videos/` con nombres descriptivos en kebab-case
5. Usar la CSS variable del fondo de la sección (`--ember-bg-deep` u otro según el contexto del tema)

## Responsabilidades

| Rol | Qué hace |
|-----|----------|
| Valentina | Define dónde va el video, qué degradado usar, qué elementos van flotantes cerca |
| Camilo | Implementa el `<video>` + el overlay div con el degradado + `z-index` de elementos flotantes |

## Skill relacionado

Antes de escribir cualquier `<video>`: cargar `ai/skills/video-integration/`
