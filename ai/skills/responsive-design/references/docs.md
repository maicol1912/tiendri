# Referencias

- **Design system tokens**: `ai/skills/design-system/SKILL.md`
- **Video integration**: `ai/skills/video-integration/SKILL.md`
- **Tailwind breakpoints**: Default mobile-first (sm:640, md:768, lg:1024, xl:1280)
- **Target device**: Android gama media, 360-412px, datos móviles lentos

## Ejemplos canónicos en el proyecto

| Pattern | Archivo | Qué demuestra |
|---------|---------|---------------|
| Carousel pricing | `src/components/landing/PricingSection.tsx` | Cards → carousel con dots + auto-scroll |
| Carousel showcase | `src/components/landing/ShowcaseSection.tsx` | Marquee con rAF + swipe manual |
| Timeline responsive | `src/components/landing/HowItWorksSection.tsx` | Icons centrados arriba mobile, izquierda desktop |
| Split screen auth | `src/app/(auth)/auth/components/AuthSplitScreen.tsx` | Split → card glassmorphism |
| Hero responsive | `src/components/landing/HeroSection.tsx` | Video adaptativo, métricas compactas |
| Navbar hamburger | `src/components/landing/Navbar.tsx` | Links hidden, hamburger, touch targets |
