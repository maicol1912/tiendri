---
name: video-analysis
description: >
  Extraer y analizar frames de video con ffmpeg para entender referencias visuales, animaciones, UI patterns y transiciones.
  Trigger: Cuando el usuario comparta un video (MP4, MOV, WebM) como referencia visual, demo de producto, o inspiración de diseño.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- El usuario comparte un video de referencia de un sitio web
- Se necesita analizar animaciones, transiciones o flujos de UI desde un video
- Comparar el diseño actual con una referencia en video
- Extraer patrones visuales de una grabación de pantalla

## Critical Patterns

### Requisito

`ffmpeg` debe estar instalado. Verificar con:
```bash
ffmpeg -version
```

### Flujo de análisis

| Paso | Qué hacer |
|------|-----------|
| 1 | Obtener duración e info del video |
| 2 | Extraer frames según la necesidad (ver tabla de fps abajo) |
| 3 | Ver los frames como imágenes (Read tool) |
| 4 | Analizar patrones visuales, colores, layouts, animaciones |
| 5 | Documentar hallazgos |
| 6 | Limpiar frames temporales cuando ya no se necesiten |

### Elegir fps según el contenido

| Tipo de contenido | FPS recomendado | Razón |
|-------------------|----------------|-------|
| Scroll lento por una web | 1 fps (1 frame/seg) | Poco cambio entre frames |
| Navegación normal | 2 fps (1 frame cada 0.5s) | Balance entre cobertura y cantidad |
| Animaciones y transiciones | 5 fps (1 frame cada 0.2s) | Captura transiciones rápidas |
| Micro-animaciones (hover, glow) | 10 fps (1 frame cada 0.1s) | Detalle máximo, muchos frames |

### Comandos

**Obtener info del video (duración, resolución, codec):**
```bash
ffprobe -v quiet -print_format json -show_format -show_streams "video.mp4" 2>&1 | head -30
```

**Extraer frames — fórmula general:**
```bash
mkdir -p tmp/video-frames
ffmpeg -i "ruta/al/video.mp4" -vf "fps={FPS}" -q:v 2 "tmp/video-frames/frame_%04d.jpg"
```

**Ejemplos concretos:**
```bash
# 1 frame por segundo (scroll lento)
ffmpeg -i "video.mp4" -vf "fps=1" -q:v 2 "tmp/video-frames/frame_%04d.jpg"

# 5 frames por segundo (transiciones)
ffmpeg -i "video.mp4" -vf "fps=5" -q:v 2 "tmp/video-frames/frame_%04d.jpg"

# 10 frames por segundo (micro-animaciones)
ffmpeg -i "video.mp4" -vf "fps=10" -q:v 2 "tmp/video-frames/frame_%04d.jpg"

# Extraer solo un rango de tiempo (de 5s a 15s)
ffmpeg -i "video.mp4" -ss 5 -to 15 -vf "fps=5" -q:v 2 "tmp/video-frames/frame_%04d.jpg"

# Extraer un solo frame en un momento exacto (segundo 8)
ffmpeg -i "video.mp4" -ss 8 -frames:v 1 -q:v 2 "tmp/video-frames/momento.jpg"
```

**Contar frames extraídos:**
```bash
ls tmp/video-frames/*.jpg | wc -l
```

**Limpiar frames temporales:**
```bash
rm -rf tmp/video-frames/
```

### Cómo analizar los frames

1. **Ver frames espaciados** — no todos. Empezar con frame_0001, saltar de a 10-15 frames para entender la estructura general
2. **Identificar secciones** — cada cambio visual grande = nueva sección del sitio
3. **Buscar patrones** — ¿qué se repite? ¿colores? ¿layouts? ¿efectos?
4. **Capturar transiciones** — si dos frames consecutivos son muy diferentes, la transición entre ellos es importante
5. **Documentar** — listar los hallazgos: paleta de colores, tipografía, efectos, layouts, animaciones

### Qué buscar en cada frame

| Elemento | Qué observar |
|----------|-------------|
| **Colores** | Paleta dominante, fondo, acentos, contraste |
| **Tipografía** | Tamaño de headings, peso, si es serif/sans-serif |
| **Layout** | Grid, asimetría, bento, full-width vs contenedor |
| **Cards** | Bordes, sombras, glassmorphism, transparencia |
| **3D** | Objetos 3D, globos, visualizaciones, partículas |
| **Animaciones** | Fade, slide, scale, parallax, glow, pulse |
| **Backgrounds** | Gradientes, patrones, texturas, dark/light |
| **Espaciado** | Ritmo entre secciones, densidad del contenido |
| **Navegación** | Navbar fija, menú hamburguesa, estilo de links |
| **CTAs** | Color, forma, posición, efecto hover |

### Salida de directorio temporal

Siempre usar `tmp/video-frames/` dentro del proyecto para los frames extraídos. Limpiar cuando el análisis termine.

## Resources

- **ffmpeg docs**: ffmpeg.org/documentation.html
- **Documentación**: Ver [references/](references/) para docs del proyecto
