# AGENTS.md

Reglas del proyecto para agentes de código (OpenCode, Google Antigravity, Gemini CLI, etc.).

## Sobre el proyecto
- Proyecto académico de Ingeniería Informática (tercer semestre): una Skill para Gemini llamada `revisar-codigo` y su landing page.
- Todo el contenido visible (textos, comentarios, commits) va en **español**.

## Estructura
- `skill/revisar-codigo/SKILL.md` → la Skill. No cambiar el `name`. La `description` debe seguir en tercera persona, con "Usar cuando…" y menos de 1024 caracteres.
- `landing-page/` → página web estática (HTML + CSS + JS puro). **No usar frameworks ni librerías de JS.**
- `pruebas/` → datos de las pruebas. Son datos reales: **no modificar los CSV** salvo para agregar nuevas ejecuciones.
- `cuaderno/` → cuaderno de Jupyter que analiza los CSV de `pruebas/`.
- `documentacion/` → bitácora del desarrollo en Markdown.

## Estilo de la landing page
- Colores definidos como variables en `:root` de `css/styles.css` (azul marino `--fondo`, verde `--verde`, azul `--azul`). Reusar las variables, no escribir colores nuevos sueltos.
- Fuentes: Inter (texto) y JetBrains Mono (código).
- Debe verse bien desde 360 px de ancho y respetar `prefers-reduced-motion`.
- Nombres de clases en español y en minúsculas (`.tarjeta`, `.seccion--alt`).

## Comprobación antes de terminar
- Abrir `landing-page/index.html` con `python -m http.server 8000 --directory landing-page` y revisar la consola del navegador sin errores.
- Si se cambia el `SKILL.md`, regenerar `skill/revisar-codigo.zip` (con `SKILL.md` en la raíz y rutas con `/`).
