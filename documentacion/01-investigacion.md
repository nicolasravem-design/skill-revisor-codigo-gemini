# Paso 1 — Investigación: Skills en Gemini aplicadas a la Ingeniería Informática

**Fecha:** 15/10/2026
**Herramientas:** Gemini (gemini.google.com, modo Pro) y documentación oficial de Google.

## 1.1 Pregunta de investigación

¿Cómo se diseña una Skill para Gemini que sirva en el ejercicio profesional de un ingeniero de software, y cómo comprobamos que funciona?

## 1.2 ¿Qué es una Skill en Gemini?

Según la ayuda oficial de Google, una **habilidad (Skill)** es un conjunto de instrucciones y preferencias que enseña a Gemini a realizar un tipo de tarea recurrente "como lo harías tú". Funciona como una *hoja resumen* del conocimiento de un experto.

| Característica | Detalle (fuente oficial) |
|---|---|
| Dónde se crean | gemini.google.com → **Personalizar** → **Habilidades** |
| Formas de crearlas | Con Gemini (conversación), desde una plantilla, manualmente o **subiendo un `SKILL.md`** (o un `.zip` con el `SKILL.md` en la raíz) |
| Campos | **Nombre** (minúsculas y guiones), **Descripción** (1-2 frases, máx. 1024 caracteres), **Instrucciones** y archivos de apoyo opcionales |
| Cómo se activan | Automáticamente cuando el mensaje encaja con la descripción, o a mano escribiendo `/` (pronto `@`) |
| Límites | Se pueden crear todas las que quieras, pero solo **100 activas** a la vez; archivos de hasta 100 MB; no se permiten scripts que accedan a internet |
| Requisitos | Cuenta personal de Google, mayor de 18 años, "Conservar la actividad" activado |
| Gems | Desde **noviembre de 2026** los Gems de cuentas personales se convierten automáticamente en Skills (2027 para cuentas de trabajo y educación) |

### Cómo las usa Gemini por dentro

1. Revisa **solo el nombre y la descripción** de las Skills activas para decidir si alguna aplica.
2. Si aplica, lee las **instrucciones completas**.
3. Los **archivos adjuntos** (plantillas, guías) se abren solo si los necesita.

Por eso la descripción es la parte más importante: si es genérica, Gemini no activa la Skill cuando debería.

### Skill vs. prompt vs. Gem

| | Prompt normal | Gem | Skill |
|---|---|---|---|
| Reutilizable | No | Sí | Sí |
| Se activa sola | No | No (hay que abrir el Gem) | Sí, por la descripción |
| Varias en un mismo chat | — | No | Sí |
| Formato abierto `SKILL.md` | No | No | Sí (también Gemini CLI y Google Antigravity) |

### Buenas prácticas oficiales para escribirlas

- **Nombre:** empezar con un verbo que diga lo que hace (`revisar-codigo`, no `datos-codigo`).
- **Descripción:** en tercera persona, con ejemplos de "Usar cuando…".
- **Instrucciones:** enfocarse en el *tipo* de tarea, no en un caso puntual; dar plantillas de salida; incluir una sección de **errores habituales**; usar **listas de comprobación**; decir **qué hacer si falta información**.
- **Cuándo NO crear una Skill:** si la tarea es de una sola vez, si Gemini ya lo hace bien sin ayuda o si los pasos cambian todo el tiempo.

### Relación con el estándar Agent Skills

El archivo `SKILL.md` (frontmatter YAML con `name` y `description` + cuerpo en Markdown + carpetas opcionales como `references/`) es un formato abierto. Además de la app de Gemini, lo leen **Gemini CLI** y **Google Antigravity**, lo que permite reutilizar la misma Skill en el editor de código.

## 1.3 La Skill aplicada a la profesión: revisión de código

Elegimos la **revisión de código (code review)** porque es una tarea diaria del ingeniero de software y porque los estudiantes casi nunca tenemos a alguien con experiencia que revise lo que programamos.

Le preguntamos a Gemini por la revisión de código en la industria (ver captura `capturas/02-gemini-investigacion-code-review.jpg`). Resumen de lo que respondió:

- **Qué es:** práctica en la que otros desarrolladores examinan el código antes de integrarlo a la rama principal; busca calidad, compartir conocimiento y evitar errores en producción.
- **Criterios de un ingeniero senior:**
  1. Bugs y lógica de negocio (casos borde, efectos colaterales).
  2. Seguridad (inyección SQL, datos sensibles expuestos, entradas sin validar).
  3. Legibilidad y mantenibilidad (nombres, números mágicos, complejidad).
  4. Rendimiento (complejidad Big O, consultas N+1, memoria).
  5. Buenas prácticas (SOLID, DRY, convenciones del equipo).
- **Datos citados por Gemini:**
  - Un estudio de SmartBear en Cisco Systems encontró que las revisiones "ligeras" (comentarios en GitHub/GitLab) toman menos del 20 % del tiempo de una inspección formal y encuentran una cantidad similar de errores.
  - Steve McConnell (*Code Complete*) reporta un promedio de 15 a 50 defectos por cada 1000 líneas de código durante el desarrollo.
- **Cómo ayuda la IA:** como "primer filtro" antes del humano: análisis estático, detección de vulnerabilidades conocidas (OWASP Top 10), resúmenes del cambio y sugerencias de refactorización y pruebas.

Estos 5 criterios se convirtieron directamente en la **checklist** de nuestra Skill.

## 1.4 Hallazgo durante la investigación: Gemini no habla de sus propias Skills

Intentamos preguntarle a Gemini qué son sus Skills y cómo diseñar una. En **5 intentos** con distinta redacción respondió con mensajes genéricos como *"No te puedo ayudar con eso, ya que soy un modelo de lenguaje…"* o *"No me han programado para hacer algo así"*. En cambio, preguntas sobre revisión de código (sin mencionar Skills) funcionaron sin problema.

Nuestra hipótesis es que cuando el mensaje habla de "crear una habilidad/asistente", Gemini intenta usar su función interna de creación de Skills y falla. Por eso la parte conceptual se completó con la **documentación oficial de Google** (sección Referencias) y la Skill se creó desde **Personalizar → Habilidades**.

## 1.5 Métricas definidas para evaluar la Skill

| Métrica | Cómo se mide |
|---|---|
| Tasa de detección | errores detectados / errores sembrados |
| Falsos positivos | errores que la IA reporta y no existen |
| Cumplimiento de formato | % de respuestas con severidad, línea y plantilla |
| Activación automática | % de casos donde Gemini usó la Skill sin nombrarla |
| Tiempo de respuesta | segundos desde enviar hasta terminar la respuesta |
| Concordancia de severidad | % de hallazgos con la severidad esperada |

Los resultados están en el [cuaderno de datos](../cuaderno/analisis_pruebas_skill.ipynb).

## Referencias

- Google. *Crear y gestionar habilidades para las aplicaciones de Gemini.* https://support.google.com/gemini/answer/17094296
- Google. *Escribir habilidades eficaces para las aplicaciones de Gemini.* https://support.google.com/gemini/answer/17102773
- Google. *Transición de Gems a habilidades.* https://support.google.com/gemini/answer/18560919
- Google. *Agent skills — Google Antigravity.* https://antigravity.google/docs/skills
- McConnell, S. (2004). *Code Complete* (2.ª ed.). Microsoft Press.
