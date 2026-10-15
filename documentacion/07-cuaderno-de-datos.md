# Paso 7 — Cuaderno de datos

**Archivo:** [`cuaderno/analisis_pruebas_skill.ipynb`](../cuaderno/analisis_pruebas_skill.ipynb)
**Abrir en Colab:** https://colab.research.google.com/github/nicolasravem-design/skill-revisor-codigo-gemini/blob/main/cuaderno/analisis_pruebas_skill.ipynb

## Datos de entrada

| Archivo | Filas | Contenido |
|---|---|---|
| `pruebas/errores_esperados.csv` | 24 | Cada error sembrado: caso, lenguaje, línea, severidad esperada, categoría y descripción |
| `pruebas/resultados_por_caso.csv` | 20 | Una fila por ejecución (10 sin Skill + 10 con Skill): tiempo, errores detectados, falsos positivos, formato, calificación y veredicto |
| `pruebas/deteccion_por_error.csv` | 24 | Si cada error fue detectado sin Skill y con Skill, y la severidad que le dio la Skill |

## Qué hace el cuaderno

1. Carga los CSV con **pandas** (si se abre en Colab, los lee directo desde GitHub).
2. Exploración: primeras filas y valores faltantes.
3. **P1** — tasa de detección por modo y por caso.
4. **P2** — detección por categoría y lista de errores que encontró solo un modo.
5. **P3** — cumplimiento de formato (severidad, línea, plantilla).
6. **P4** — tiempos de respuesta y correlación con la cantidad de errores.
7. **P5** — matriz de confusión de la severidad.
8. Conclusiones y mejoras.

Las gráficas se guardan en `cuaderno/graficas/`:

| Gráfica | Archivo |
|---|---|
| Tasa de detección | `01_tasa_deteccion.png` |
| Detección por caso | `02_deteccion_por_caso.png` |
| Detección por categoría | `03_deteccion_por_categoria.png` |
| Tiempos de respuesta | `04_tiempos.png` |
| Matriz de severidad | `05_matriz_severidad.png` |

## Cómo ejecutarlo en local

```bash
pip install pandas matplotlib jupyter
cd cuaderno
jupyter notebook analisis_pruebas_skill.ipynb
```

## Principales resultados

- Detección: **91.7 %** con Skill vs **79.2 %** sin Skill.
- La Skill ayuda sobre todo en **buenas prácticas y legibilidad**.
- 10/10 respuestas con plantilla, severidad y número de línea; 0 falsos positivos.
- Cuesta ~6 s más por respuesta.
- 14 de 22 severidades coinciden con lo esperado; la Skill tiende a exagerar la gravedad.
