# Paso 6 — Integración y pruebas de la Skill en Gemini

## 6.1 Diseño de la Skill

**Archivo:** [`skill/revisar-codigo/SKILL.md`](../skill/revisar-codigo/SKILL.md)

| Campo | Valor | Por qué |
|---|---|---|
| `name` | `revisar-codigo` | Minúsculas y guiones, empieza con verbo (regla oficial). |
| `description` | "Revisa código fuente (Python, Java, JavaScript, C/C++ o SQL) como un ingeniero de software senior, […] Usar cuando se pegue código y se pida revisarlo, encontrar errores, mejorar su calidad, preparar un pull request o entender por qué falla." | En tercera persona y con "Usar cuando…", para que Gemini la active sola. 371 caracteres (< 1024). |
| Instrucciones | Pasos con checklist, 4 niveles de severidad, plantilla de salida, reglas, errores habituales, qué hacer si falta información y ética académica. | Sigue las buenas prácticas de la guía oficial "Escribir habilidades eficaces". |
| Referencia | `references/checklist-por-lenguaje.md` | Errores típicos por lenguaje; Gemini lo abre solo si lo necesita. |

## 6.2 Empaquetado

El `.zip` debe tener el `SKILL.md` en la raíz. El primer `.zip` lo hicimos con `Compress-Archive` de PowerShell y Gemini mostró la ruta como `references\checklist…` (con barra invertida), así que lo rehicimos con Python para que use `/`:

```python
import zipfile
with zipfile.ZipFile("revisar-codigo.zip", "w", zipfile.ZIP_DEFLATED) as z:
    z.write("revisar-codigo/SKILL.md", "SKILL.md")
    z.write("revisar-codigo/references/checklist-por-lenguaje.md",
            "references/checklist-por-lenguaje.md")
```

## 6.3 Integración en Gemini

1. gemini.google.com → **Personalizar** → pestaña **Habilidades** (`capturas/01-gemini-personalizar-habilidades.jpg`).
2. **Crear → Subir** → seleccionar `revisar-codigo.zip`.
3. Gemini llenó automáticamente nombre, descripción e instrucciones (`capturas/03-gemini-skill-cargada-desde-zip.jpg`) y mostró los archivos `SKILL.md` y `references/` (`capturas/04-gemini-skill-archivos-skillmd-references.jpg`).
4. **Crear** → la Skill aparece en **Activas** (`capturas/05-gemini-skill-activa.jpg`).

## 6.4 Plan de pruebas

- **10 casos** en `pruebas/casos/` con **24 errores sembrados** (`pruebas/errores_esperados.csv`):

| Caso | Lenguaje | Qué tiene |
|---|---|---|
| 01 | Python | off-by-one en `range`, división por cero |
| 02 | Python | inyección SQL, contraseña en texto plano, conexión sin cerrar |
| 03 | Java | `i <= length`, `String` comparado con `==` |
| 04 | JavaScript | XSS con `innerHTML`, números mágicos, `var` |
| 05 | Python | algoritmo O(n²) |
| 06 | C | `malloc` sin espacio para `\0`, `gets()`, fuga de memoria, `malloc` sin validar |
| 07 | Python | **sin errores** (control de falsos positivos) |
| 08 | SQL | `UPDATE` sin `WHERE`, `SELECT *` |
| 09 | Java | retiro sin validar, `catch` vacío, `double` para dinero, `Scanner` sin cerrar |
| 10 | JavaScript | falta `await`, no valida `respuesta.ok`, promesa sin `.catch()` |

- **Procedimiento:** chat nuevo por caso, modo Pro, prompt idéntico (`Revisa este codigo y dime que errores tiene:` + código). Primero las 10 **sin** Skill y luego las 10 **con** la Skill activa, sin nombrarla.
- **Medición del tiempo:** un pequeño script en la consola del navegador guardaba la hora al enviar y la hora en que desaparecía el botón "Detener respuesta".
- **Evaluación:** leímos cada respuesta y marcamos qué errores esperados encontró, si inventó errores, si usó severidad/línea/plantilla. Todo quedó en `pruebas/resultados_por_caso.csv` y `pruebas/deteccion_por_error.csv`; las respuestas están en `pruebas/respuestas/`.

## 6.5 Resultados

| Métrica | Sin Skill | Con Skill |
|---|:---:|:---:|
| Errores detectados | 19/24 (79.2 %) | **22/24 (91.7 %)** |
| Falsos positivos | 0 | 0 |
| Con severidad / con línea / con plantilla | 0/10 | **10/10** |
| Activación automática | — | **10/10** |
| Tiempo promedio | 29.1 s | 35.5 s |

Ejemplo real de respuesta con la Skill: `capturas/06-gemini-respuesta-con-skill.jpg`.

**Errores que solo encontró la Skill:** números mágicos (4-B), `SELECT *` (8-B), `Scanner` sin cerrar (9-D), promesa sin `.catch()` (10-C).
**Error que solo encontró la línea base:** contraseña en texto plano (2-B).
**Error que nadie encontró:** `double` para dinero (9-C).

El análisis completo (por categoría, tiempos y matriz de severidad) está en el [cuaderno de datos](../cuaderno/analisis_pruebas_skill.ipynb).

## 6.6 Usar la misma Skill fuera de la app de Gemini

Como el `SKILL.md` es un formato abierto, la carpeta `skill/revisar-codigo/` también se puede usar en:

- **Gemini CLI:** copiarla en la carpeta de skills del proyecto (por ejemplo `.gemini/skills/revisar-codigo/`) y llamarla con `/revisar-codigo`.
- **Google Antigravity:** copiarla en la carpeta de skills del *workspace* (según la documentación actual, `.agents/skills/revisar-codigo/`).

Las rutas pueden cambiar entre versiones; conviene revisar https://antigravity.google/docs/skills antes de copiarla.

## 6.7 Mejoras para la versión 2

1. Agregar "contraseñas guardadas o comparadas en texto plano" a la checklist de seguridad.
2. Agregar "`double`/`float` para dinero" a la checklist de Java.
3. Incluir un ejemplo por nivel de severidad para que no exagere la gravedad.
