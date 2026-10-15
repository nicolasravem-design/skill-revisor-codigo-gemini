# 🧑‍💻 revisar-codigo — Skill para Gemini

> Skill propia que convierte a **Gemini** en un revisor de código "senior": detecta bugs, fallas de seguridad, problemas de rendimiento y malas prácticas, les pone una **severidad** y explica cómo corregirlos.

![Gemini Skill](https://img.shields.io/badge/Gemini-Skill-4f8cff)
![Lenguajes](https://img.shields.io/badge/revisa-Python%20%7C%20Java%20%7C%20JS%20%7C%20C%20%7C%20SQL-34d399)
![Pruebas](https://img.shields.io/badge/errores%20detectados-22%2F24-success)
![Estado](https://img.shields.io/badge/estado-terminado-blue)

**Actividad:** Evaluación de Seguimiento — Desarrollo de Skills integradas a Gemini
**Carrera:** Ingeniería Informática · Tercer semestre · 2026
**Autor:** Nicolas Muñoz Rave — GitHub [@nicolasravem-design](https://github.com/nicolasravem-design)

🌐 **Landing page:** https://nicolasravem-design.github.io/skill-revisor-codigo-gemini/

---

## 📑 Tabla de contenido

1. [¿Qué problema resuelve?](#-qué-problema-resuelve)
2. [Entregables](#-entregables)
3. [Estructura del repositorio](#-estructura-del-repositorio)
4. [¿Qué es una Skill en Gemini?](#-qué-es-una-skill-en-gemini)
5. [Nuestra Skill: `revisar-codigo`](#-nuestra-skill-revisar-codigo)
6. [Cómo instalarla y usarla](#-cómo-instalarla-y-usarla)
7. [Pruebas y resultados](#-pruebas-y-resultados)
8. [Landing page](#-landing-page)
9. [Herramientas utilizadas](#-herramientas-utilizadas)
10. [Documentación del desarrollo](#-documentación-del-desarrollo)
11. [Limitaciones y trabajo futuro](#-limitaciones-y-trabajo-futuro)
12. [Referencias](#-referencias)

---

## 🎯 ¿Qué problema resuelve?

En la carrera escribimos mucho código y casi nunca hay alguien con experiencia que lo revise antes de entregarlo. Cuando le pedimos a una IA "revisa mi código", la respuesta cambia en cada chat: a veces da una lista, a veces solo el código corregido, casi nunca dice **en qué línea** está el error ni **qué tan grave** es.

La Skill `revisar-codigo` estandariza esa revisión: siempre sigue la misma checklist (bugs → seguridad → rendimiento → legibilidad → buenas prácticas), siempre clasifica los hallazgos por severidad y siempre explica el porqué, para que sirva para **aprender** y no solo para copiar la corrección.

## 📦 Entregables

| # | Entregable | Herramienta | Dónde está |
|---|-----------|-------------|------------|
| 1 | Infografía | ChatGPT | [`entregables/infografia-skills-gemini.png`](entregables/infografia-skills-gemini.png) |
| 2 | Video corto | Google Flow | [`entregables/video-revisar-codigo.mp4`](entregables/video-revisar-codigo.mp4) |
| 3 | Landing page + README | HTML/CSS/JS (ver nota sobre Antigravity/OpenCode) | [`landing-page/`](landing-page/) y este archivo |
| 4 | Repositorio público | GitHub | este repositorio |
| 5 | Skill para Gemini | Gemini → Personalizar → Habilidades | [`skill/revisar-codigo/SKILL.md`](skill/revisar-codigo/SKILL.md) |
| 6 | Documentación del desarrollo | Markdown | [`documentacion/`](documentacion/) |
| 7 | Cuaderno de datos | Jupyter / Google Colab | [`cuaderno/analisis_pruebas_skill.ipynb`](cuaderno/analisis_pruebas_skill.ipynb) |

## 🗂️ Estructura del repositorio

```
skill-revisor-codigo-gemini/
├── README.md                     ← estás aquí
├── LICENSE
├── .gitignore
├── .github/workflows/pages.yml   ← publica la landing en GitHub Pages
│
├── skill/                        ← LA SKILL
│   ├── revisar-codigo/
│   │   ├── SKILL.md              ← nombre, descripción e instrucciones
│   │   └── references/
│   │       └── checklist-por-lenguaje.md
│   └── revisar-codigo.zip        ← paquete listo para subir a Gemini
│
├── pruebas/                      ← cómo probamos la Skill
│   ├── casos/                    ← 10 programas con errores sembrados
│   ├── errores_esperados.csv     ← los 24 errores que debía encontrar
│   ├── resultados_por_caso.csv   ← métricas de las 20 ejecuciones
│   ├── deteccion_por_error.csv   ← qué error detectó cada modo
│   └── respuestas/               ← respuestas reales de Gemini
│
├── cuaderno/
│   ├── analisis_pruebas_skill.ipynb   ← cuaderno de datos
│   └── graficas/                      ← gráficas exportadas
│
├── landing-page/                 ← página web
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/                   ← infografía y video
│
├── documentacion/                ← bitácora del desarrollo paso a paso
│   ├── 01-investigacion.md
│   ├── 02-infografia.md
│   ├── 03-video.md
│   ├── 04-landing-page.md
│   ├── 05-repositorio.md
│   ├── 06-integracion-gemini.md
│   ├── 07-cuaderno-de-datos.md
│   └── capturas/
│
└── entregables/                  ← archivos finales para entregar
```

## 💡 ¿Qué es una Skill en Gemini?

Una **Skill** (en la app en español: *habilidad*) es un conjunto de instrucciones reutilizables que enseña a Gemini a hacer un tipo de tarea siempre de la misma manera. Se crean en **gemini.google.com → Personalizar → Habilidades** y, según Google, desde **noviembre de 2026 reemplazan a los Gems** en las cuentas personales.

Una Skill tiene 3 partes:

| Parte | Para qué sirve | En nuestra Skill |
|-------|----------------|------------------|
| **Nombre** | Identificarla. Minúsculas y guiones, empezando con verbo. | `revisar-codigo` |
| **Descripción** | Gemini **solo lee esto** para decidir si la usa. Máx. 1024 caracteres, con "Usar cuando…". | "Revisa código fuente… Usar cuando se pegue código y se pida revisarlo…" |
| **Instrucciones** (+ archivos) | El paso a paso, la plantilla de salida y los errores a evitar. | `SKILL.md` + `references/checklist-por-lenguaje.md` |

**¿Cómo la usa Gemini?** (*progressive disclosure*)

```
Mensaje del usuario
      │
      ▼
¿Coincide con el nombre/descripción de alguna Skill activa? ──No──► responde normal
      │ Sí
      ▼
Lee las instrucciones completas del SKILL.md
      │
      ▼
¿Necesita un archivo de referencia? ──Sí──► abre references/checklist-por-lenguaje.md
      │
      ▼
Responde con la plantilla de la Skill
```

**Skill vs. prompt normal vs. Gem**

| | Prompt normal | Gem | Skill |
|---|---|---|---|
| Se reutiliza | ❌ hay que reescribirlo | ✅ | ✅ |
| Se activa sola | ❌ | ❌ hay que abrir el Gem | ✅ según la descripción |
| Se combinan varias en un chat | — | ❌ | ✅ |
| Formato estándar `SKILL.md` | ❌ | ❌ | ✅ (también Gemini CLI y Antigravity) |

Más detalle en [`documentacion/01-investigacion.md`](documentacion/01-investigacion.md).

## 🛠️ Nuestra Skill: `revisar-codigo`

**Archivo principal:** [`skill/revisar-codigo/SKILL.md`](skill/revisar-codigo/SKILL.md)

- **Entrada:** código en Python, Java, JavaScript, C/C++ o SQL (pegado en el chat).
- **Proceso:** checklist en 5 pasos → bugs, seguridad, rendimiento, legibilidad, buenas prácticas.
- **Severidades:** 🔴 Crítico · 🟠 Alto · 🟡 Medio · 🟢 Bajo.
- **Salida (siempre igual):**
  1. **Resumen** — lenguaje, qué hace, calificación /10 y veredicto (✅ / ⚠️ / ❌).
  2. **Hallazgos** — tabla `# | Severidad | Línea | Categoría | Problema | Cómo corregirlo`.
  3. **Código corregido** — con comentarios en las líneas cambiadas.
  4. **Lo que está bien** — refuerzo positivo.
  5. **Para aprender más** — conceptos para estudiar.
- **Reglas importantes:** no inventar errores, no reescribir todo el programa, explicar cada corrección, no ayudar a ocultar plagio.

## 🚀 Cómo instalarla y usarla

### Opción A — Subir el paquete (recomendada)
1. Descarga [`skill/revisar-codigo.zip`](skill/revisar-codigo.zip).
2. Ve a [gemini.google.com](https://gemini.google.com) → **Personalizar** → **Habilidades**.
3. **Crear → Subir** → elige el `.zip` → revisa los campos → **Crear**.

### Opción B — Crearla a mano
1. **Personalizar → Habilidades → Crear → Crear de forma manual**.
2. Copia el `name`, la `description` y el cuerpo del `SKILL.md` en los campos correspondientes.

### Usarla
Abre un chat nuevo, pega tu código y escribe algo como *"revisa este código"*. Gemini activa la Skill solo; también puedes escribir `/` y elegir `revisar-codigo`.

> **Requisitos (según Google):** cuenta personal de Google, mayor de 18 años y la opción "Conservar la actividad" activada.

**Bonus:** como `SKILL.md` es un formato abierto, la misma carpeta funciona en **Gemini CLI** y **Google Antigravity** copiándola en la carpeta de skills del proyecto (ver [`documentacion/06-integracion-gemini.md`](documentacion/06-integracion-gemini.md)).

## 📊 Pruebas y resultados

Hicimos **20 ejecuciones reales** en Gemini (modo Pro) el 15/10/2026: 10 casos de prueba **sin** la Skill (línea base) y los mismos 10 **con** la Skill. En ambos casos el prompt fue exactamente `Revisa este codigo y dime que errores tiene:` + el código, cada uno en un chat nuevo. No mencionamos la Skill: Gemini tenía que activarla sola.

Los casos tienen **24 errores sembrados a propósito** (ver [`pruebas/errores_esperados.csv`](pruebas/errores_esperados.csv)). El caso 7 no tiene errores, para medir si la IA inventa problemas.

| Métrica | Sin Skill | Con Skill |
|---|:---:|:---:|
| Errores detectados | 19 / 24 (79.2 %) | **22 / 24 (91.7 %)** |
| Falsos positivos | 0 | 0 |
| Respuestas con severidad | 0 / 10 | **10 / 10** |
| Respuestas con número de línea | 0 / 10 | **10 / 10** |
| Respuestas con la misma estructura | 0 / 10 | **10 / 10** |
| Activación automática de la Skill | — | **10 / 10** |
| Tiempo promedio de respuesta | **29.1 s** | 35.5 s |

**Lo que aprendimos:**
- La Skill encontró errores de "buenas prácticas" que Gemini sin Skill pasaba por alto (números mágicos, `SELECT *`, `Scanner` sin cerrar, promesa sin `.catch()`), porque la checklist le obliga a revisarlos.
- **No es perfecta:** en el caso 2 no mencionó que la contraseña se guarda en texto plano (la línea base sí), y en el caso 9 ninguno de los dos modos detectó el uso de `double` para dinero.
- Tiende a **subir la severidad** de algunos hallazgos (14 de 22 coincidieron con la severidad esperada).
- Es ~6 s más lenta porque escribe una respuesta más completa.

El análisis completo, con gráficas, está en el **cuaderno de datos**: [`cuaderno/analisis_pruebas_skill.ipynb`](cuaderno/analisis_pruebas_skill.ipynb)
[![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/nicolasravem-design/skill-revisor-codigo-gemini/blob/main/cuaderno/analisis_pruebas_skill.ipynb)

## 🌐 Landing page

Página de una sola vista hecha con **HTML, CSS y JavaScript puro** (sin frameworks), responsive y con modo oscuro.

- **En línea:** https://nicolasravem-design.github.io/skill-revisor-codigo-gemini/
- **En local:** abre `landing-page/index.html` en el navegador, o con Python:
  ```bash
  python -m http.server 8000 --directory landing-page
  ```

Secciones: inicio, qué es una Skill, cómo funciona, demo (con/sin Skill), resultados con gráfica, infografía y video, instalación.

> **Nota sobre Antigravity + OpenCode:** la actividad pide diseñar la página en Google Antigravity con OpenCode. El código de esta versión se generó con un asistente de IA y queda listo para abrirse como *workspace* en Antigravity; el archivo [`AGENTS.md`](AGENTS.md) tiene las reglas del proyecto que leen tanto OpenCode como Antigravity. El paso a paso está en [`documentacion/04-landing-page.md`](documentacion/04-landing-page.md).

## 🧰 Herramientas utilizadas

| Herramienta | Uso en el proyecto |
|---|---|
| **Gemini** (gemini.google.com) | Investigación (code review) y creación/pruebas de la Skill |
| **ChatGPT** | Generación de la infografía |
| **Google Flow** (modelo Omni 1.1 Flash) | Video corto de 24 s en 3 escenas |
| **Google Antigravity + OpenCode** | Entorno sugerido para editar la landing (ver nota) |
| **GitHub + GitHub Pages** | Repositorio público y hosting de la landing |
| **Python (pandas, matplotlib) + Jupyter** | Cuaderno de análisis de datos |
| **Claude (Claude Code + Claude in Chrome)** | Automatización del navegador, redacción y organización del repositorio |

## 📝 Documentación del desarrollo

La bitácora completa, paso a paso y con capturas, está en [`documentacion/`](documentacion/):

1. [Investigación](documentacion/01-investigacion.md)
2. [Infografía con ChatGPT](documentacion/02-infografia.md)
3. [Video con Flow](documentacion/03-video.md)
4. [Landing page](documentacion/04-landing-page.md)
5. [Repositorio en GitHub](documentacion/05-repositorio.md)
6. [Integración y pruebas en Gemini](documentacion/06-integracion-gemini.md)
7. [Cuaderno de datos](documentacion/07-cuaderno-de-datos.md)

## ⚠️ Limitaciones y trabajo futuro

- Solo se probaron 10 casos cortos (máx. 20 líneas); falta probar con proyectos reales de varios archivos.
- La evaluación de "detectado / no detectado" la hizo una persona leyendo cada respuesta; podría automatizarse.
- Gemini puede cambiar su comportamiento con nuevas versiones del modelo, así que los resultados pueden variar.
- Ideas: agregar ejemplos de salida dentro de la Skill para afinar la severidad, y una regla explícita sobre contraseñas en texto plano.

## 📚 Referencias

- Google. *Crear y gestionar habilidades para las aplicaciones de Gemini.* https://support.google.com/gemini/answer/17094296
- Google. *Escribir habilidades eficaces para las aplicaciones de Gemini.* https://support.google.com/gemini/answer/17102773
- Google. *Transición de Gems a habilidades.* https://support.google.com/gemini/answer/18560919
- Google. *Agent skills — Google Antigravity.* https://antigravity.google/docs/skills
- Google Codelabs. *Authoring Google Antigravity Skills.* https://codelabs.developers.google.com/getting-started-with-antigravity-skills
- McConnell, S. (2004). *Code Complete* (2.ª ed.). Microsoft Press.

---

<sub>Proyecto académico sin fines comerciales. Licencia MIT.</sub>
