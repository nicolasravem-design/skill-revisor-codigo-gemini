# Paso 5 — Repositorio público en GitHub

**Repositorio:** https://github.com/nicolasravem-design/skill-revisor-codigo-gemini
**Landing en GitHub Pages:** https://nicolasravem-design.github.io/skill-revisor-codigo-gemini/

## Organización de carpetas

Separamos el proyecto por entregable, para que el profesor encuentre cada cosa rápido:

| Carpeta | Contenido |
|---|---|
| `skill/` | La Skill (`SKILL.md` + `references/`) y el `.zip` listo para subir a Gemini |
| `pruebas/` | Casos de prueba, errores esperados, resultados (CSV) y respuestas reales de Gemini |
| `cuaderno/` | Cuaderno de Jupyter con el análisis y sus gráficas |
| `landing-page/` | Página web (HTML, CSS, JS y assets) |
| `documentacion/` | Bitácora del desarrollo (un archivo por paso) y capturas |
| `entregables/` | Infografía y video en su versión final |
| `.github/workflows/` | Automatización para publicar la landing en GitHub Pages |

Archivos de la raíz: `README.md` (documentación principal), `AGENTS.md` (reglas para agentes de código como OpenCode/Antigravity), `LICENSE` (MIT) y `.gitignore`.

## Pasos realizados

```bash
# 1. Crear el repositorio local
git init -b main
git add .
git commit -m "..."        # varios commits, uno por parte del proyecto

# 2. Crear el repositorio público en GitHub y subir el código
gh repo create nicolasravem-design/skill-revisor-codigo-gemini --public --source . --push

# 3. Activar GitHub Pages usando GitHub Actions
gh api -X POST repos/nicolasravem-design/skill-revisor-codigo-gemini/pages -f build_type=workflow
```

## Commits

Hicimos un commit por cada parte del proyecto (en el mismo orden en que se trabajó), con mensajes en español:

1. Estructura inicial, README y licencia
2. Skill `revisar-codigo` (`SKILL.md`, referencia y `.zip`)
3. Casos de prueba, resultados y respuestas de Gemini
4. Infografía y video
5. Landing page
6. Cuaderno de datos
7. Documentación del desarrollo y capturas
8. Workflow de GitHub Pages y `AGENTS.md`

## GitHub Pages

El archivo `.github/workflows/pages.yml` publica **solo la carpeta `landing-page/`** cada vez que hay un `push` a `main` que la modifica. Así la página queda en línea sin tener que moverla a la raíz del repositorio.
