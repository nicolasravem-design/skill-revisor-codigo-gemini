# Paso 4 — Landing page

**Carpeta:** [`landing-page/`](../landing-page/)
**En línea:** https://nicolasravem-design.github.io/skill-revisor-codigo-gemini/
**Tecnologías:** HTML5, CSS3 (variables, grid, flexbox) y JavaScript sin librerías.

## Estructura

```
landing-page/
├── index.html        ← contenido y secciones
├── css/styles.css    ← estilos (paleta de la infografía, responsive)
├── js/main.js        ← menú móvil, pestañas de la demo, gráfica y contadores
└── assets/
    ├── infografia.png
    ├── video.mp4          ← versión comprimida del video de Flow
    └── video-portada.jpg
```

## Secciones

1. **Inicio (hero):** qué es `revisar-codigo`, botones a "Instalar" y "GitHub", contadores animados (22/24, 10/10, 0) y una ventana tipo editor con el caso 1 y sus hallazgos.
2. **¿Qué es una Skill?:** las 3 partes (nombre, descripción, instrucciones) y comparación con un prompt normal.
3. **¿Cómo funciona?:** los 3 pasos de carga progresiva, la checklist y la escala de severidad.
4. **Demo:** pestañas *Con la Skill / Sin la Skill* con respuestas reales de Gemini al mismo código.
5. **Resultados:** 4 métricas y una gráfica de barras por caso, generada con JavaScript a partir de los datos de `pruebas/resultados_por_caso.csv`.
6. **Infografía y video.**
7. **Instalar:** pasos para subir la Skill y vista previa del `SKILL.md` con botón para copiar la descripción.

## Decisiones técnicas

- **Sin frameworks:** es una sola página; HTML/CSS/JS puro carga rápido y se puede alojar gratis en GitHub Pages.
- **Paleta oscura** (azul marino + verde) para que combine con la infografía y el video.
- **Responsive:** a menos de 720 px el menú se vuelve un botón ☰ y las columnas pasan a una sola.
- **Accesibilidad:** `alt` en imágenes, `aria-*` en el menú y las pestañas, contraste alto y `prefers-reduced-motion` para desactivar animaciones.
- **Animaciones con `IntersectionObserver`:** las secciones aparecen al hacer scroll y la gráfica se llena cuando se ve.

## Antigravity + OpenCode

La guía de la actividad pide diseñar la landing en **Google Antigravity** usando **OpenCode**. En el equipo donde armamos el proyecto no estaban instalados ni Antigravity ni OpenCode, así que el código de esta versión se escribió con la ayuda de un asistente de IA (Claude Code). Para continuar el desarrollo en el entorno pedido:

1. Instalar Google Antigravity desde https://antigravity.google y abrir la carpeta del repositorio como *workspace*.
2. Instalar OpenCode en la terminal integrada de Antigravity:
   ```bash
   npm install -g opencode-ai
   ```
3. Ejecutar `opencode` dentro de la carpeta del proyecto. OpenCode (y también el agente de Antigravity) lee el archivo [`AGENTS.md`](../AGENTS.md) de la raíz, donde están las reglas del proyecto (tecnologías, paleta, estructura, idioma).
4. Prompts sugeridos para seguir mejorando la página:
   - *"Agrega una sección de preguntas frecuentes con 4 preguntas sobre la Skill, respetando los estilos de css/styles.css."*
   - *"Revisa index.html con la Skill revisar-codigo y corrige problemas de accesibilidad."*
   - *"Agrega un modo claro que se active con un botón y guarde la preferencia en localStorage."*
5. Ver los cambios con el servidor local:
   ```bash
   python -m http.server 8000 --directory landing-page
   ```

Además, como Antigravity soporta el formato `SKILL.md`, se puede copiar `skill/revisar-codigo/` a la carpeta de skills del workspace para que el agente de Antigravity revise el propio código de la landing (ver [06-integracion-gemini.md](06-integracion-gemini.md)).

## Cómo probarla en local

```bash
git clone https://github.com/nicolasravem-design/skill-revisor-codigo-gemini.git
cd skill-revisor-codigo-gemini
python -m http.server 8000 --directory landing-page
# abrir http://localhost:8000
```

Capturas: `capturas/11-landing-page.jpg` (escritorio) y `capturas/12-landing-page-movil.jpg` (celular, 375 px).
