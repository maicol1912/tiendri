# Referencias

- **Implementación canónica**: `src/app/(auth)/auth/components/VisualPanel.tsx`
- **Video del auth**: `public/videos/auth-shelf-to-send.mp4`
- **Keyframes originales**: `tmp/resources/KF1-KF4`
- **Prompts de video**: `tmp/auth-video-kling-prompts.md`, `tmp/auth-video-seedance-prompt.md`, `tmp/auth-video-domoai-prompts.md`
- **Design system**: `ai/skills/design-system/SKILL.md`

## Herramientas de generación de video

| Herramienta | Tipo | Free tier | Start+End frame |
|-------------|------|-----------|-----------------|
| Kling AI (klingai.com) | Image to Video | 66 créditos/día | ✅ 2 frames |
| DomoAI (domoai.app) | Frames to Video | Gratis | ✅ 2-8 frames |
| Seedance 2.0 (Dreamina) | Multi-frame | ~66-80 créditos/día | ✅ Multi-frame |
| Runway (runwayml.com) | Image to Video | 125 créditos | ✅ Gen-3 only |

## Flujo de generación

1. **Valentina** define la dirección visual del video (concepto, narrativa, estilo)
2. **Steve** genera los prompts de keyframes (GPT Image 2) y de video (Kling/Seedance)
3. **CTO** genera las imágenes y el video en las herramientas
4. **Camilo** integra el video en el componente usando esta skill
