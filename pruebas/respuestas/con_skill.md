# Respuestas de Gemini CON la Skill `revisar-codigo`

Mismo prompt que la línea base (`Revisa este codigo y dime que errores tiene:` + código). **No se nombró la Skill**: se probó si Gemini la activa sola a partir de su descripción.
Modelo: Gemini (modo Pro) en gemini.google.com, chat nuevo por cada caso, 15/10/2026.

---

## Caso 1 — caso01_promedio.py (41.6 s) — Skill activada: sí

### Resumen
- **Lenguaje:** Python
- **Qué hace el código:** Calcula el promedio aritmético de una lista de notas.
- **Calificación:** 3/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 5 | Bug | Produce un ZeroDivisionError si la lista de notas está vacía, lo cual hace que el programa falle (como pasa en la última línea). | Validar si la lista está vacía antes de hacer la división, devolviendo 0 o manejando el error. |
| 2 | Crítico | 3 | Lógica | El bucle for inicia en el índice 1, omitiendo la primera nota de la lista (índice 0). El promedio calculado siempre será incorrecto. | Iterar directamente sobre los elementos en lugar de los índices, o usar sum(). |
| 3 | Bajo | 3-4 | Prácticas | Iterar con índices y sumar manualmente con un bucle no es el estilo idiomático en Python ("Pythonic"). | Eliminar el bucle y usar la función integrada sum(notas). |

### Código corregido
```python
def calcular_promedio(notas):
    # Validar si la lista está vacía para evitar división por cero
    if not notas:
        return 0
    # Usar sum() reemplaza el bucle completo y asegura que se sumen todos los elementos
    return sum(notas) / len(notas)
```

### Lo que está bien
- Nombres descriptivos: Las variables y funciones (calcular_promedio, suma, notas) dejan perfectamente clara su intención.
- Casos de prueba: Es una excelente práctica incluir pruebas manuales que prueben tanto un escenario ideal como un caso borde (lista vacía).

### Para aprender más
- Funciones integradas (Built-in functions): sum() está implementada internamente en C, lo que la hace más rápida y legible.
- Evaluación de colecciones vacías (Truth value testing): `if not notas:` es la forma recomendada de comprobar si una lista no tiene elementos.

---

## Caso 2 — caso02_login.py (49.5 s) — Skill activada: sí

### Resumen
- **Lenguaje:** Python
- **Qué hace el código:** Verifica si las credenciales de un usuario coinciden con las almacenadas en la base de datos para iniciar sesión.
- **Calificación:** 3/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 6-7 | Seguridad | Vulnerabilidad grave de inyección SQL por concatenar texto directamente. Un atacante podría entrar enviando algo como ' OR '1'='1. | Usar parámetros (?) dentro de la consulta SQL y pasar las variables como una tupla en .execute(). |
| 2 | Medio | 4-11 | Rendimiento | La conexión a la base de datos nunca se cierra (fuga de conexiones). | Ejecutar .close() sobre la conexión, idealmente dentro de un bloque try...finally. |
| 3 | Bajo | 6 | Buenas prácticas | Se realiza un SELECT *, lo que extrae todas las columnas sin necesidad. | Cambiar a SELECT 1 o SELECT id. |
| 4 | Bajo | 9-11 | Legibilidad | La validación de retorno condicional (if resultado: return True) es redundante. | Devolver directamente el booleano. |

### Código corregido
```python
import sqlite3

def login(usuario, clave):
    conexion = sqlite3.connect("usuarios.db")
    try:
        cursor = conexion.cursor()
        # Se usan '?' para evitar la inyección SQL. SELECT 1 por eficiencia.
        consulta = "SELECT 1 FROM usuarios WHERE usuario = ? AND clave = ?"
        cursor.execute(consulta, (usuario, clave))
        resultado = cursor.fetchone()
        return resultado is not None
    finally:
        conexion.close()
```

### Lo que está bien
- El uso de fetchone() es apropiado en vez de fetchall().
- La función tiene un propósito único bien definido.

### Para aprender más
- SQL Injection y parametrización de consultas.
- Manejo de recursos en Python: try...finally.

> Observación del evaluador: la Skill **no mencionó** que la contraseña se compara en texto plano (error 2-B), que la línea base sí detectó.

---

## Caso 3 — caso03_Busqueda.java (28.4 s) — Skill activada: sí

### Resumen
- **Lenguaje:** Java
- **Qué hace el código:** Busca un String específico dentro de un arreglo y retorna su posición, o -1 si no lo encuentra.
- **Calificación:** 4/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 3 | Bug | La condición i <= nombres.length evalúa un elemento extra al final. Lanzará ArrayIndexOutOfBoundsException. | Cambiar el operador a <: i < nombres.length. |
| 2 | Crítico | 4 | Bug | En Java, == compara referencias, no el valor de texto. | Usar objetivo.equals(nombres[i]). |
| 3 | Alto | 4 | Bug | Posible NullPointerException si objetivo llega a ser null al usar .equals(). | Validar previamente si los parámetros son nulos. |

### Código corregido
```java
public class Busqueda {
    public static int buscar(String[] nombres, String objetivo) {
        // Validamos nulos al inicio para evitar excepciones
        if (nombres == null || objetivo == null) return -1;
        // Cambiamos <= por < para evitar salirnos de los límites del arreglo
        for (int i = 0; i < nombres.length; i++) {
            // Usamos .equals() para comparar el contenido de los Strings
            if (objetivo.equals(nombres[i])) {
                return i;
            }
        }
        return -1;
    }
}
```

### Lo que está bien
- Nomenclatura clara; retorno anticipado; retornar -1 es la convención estándar (como .indexOf()).

### Para aprender más
- Comparación por referencia (==) vs. por valor (.equals()).
- Índices base cero y excepciones ArrayIndexOutOfBoundsException / NullPointerException.

---

## Caso 4 — caso04_carrito.js (33.3 s) — Skill activada: sí

### Resumen
- **Lenguaje:** JavaScript
- **Qué hace el código:** Calcula el costo total de un arreglo de productos (aplicando un descuento si supera cierto límite) y muestra el nombre de un producto en el DOM.
- **Calificación:** 5/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Alto | 13 | Seguridad | Riesgo de ataque XSS al inyectar directamente la variable nombre mediante innerHTML. | Usar textContent o document.createElement(). |
| 2 | Alto | 1-3 | Bug | No se valida que productos sea realmente un arreglo antes de leer .length (null/undefined). | Comprobar !Array.isArray(productos) al inicio. |
| 3 | Bajo | 2-3 | Buenas prácticas | Uso de var, que puede causar problemas de alcance (scope). | Usar let y const. |
| 4 | Bajo | 6-7 | Legibilidad | Uso de "números mágicos" (100000 y 0.9). | Asignarlos a constantes con nombres descriptivos. |

### Código corregido
Define `LIMITE_DESCUENTO = 100000` y `FACTOR_DESCUENTO = 0.9`, valida con `Array.isArray`, usa `for...of` y `let`, y en `mostrarProducto` crea el `<h2>` con `document.createElement` + `textContent`.

### Lo que está bien
- Los nombres de las funciones reflejan su intención; la lógica del descuento es correcta.

### Para aprender más
- Vulnerabilidades XSS en frontend (innerHTML vs. textContent).
- JavaScript moderno (ES6+): var, let y const.

---

## Caso 5 — caso05_duplicados.py (45.6 s) — Skill activada: sí

### Resumen
- **Lenguaje:** Python
- **Qué hace el código:** Verifica si existe algún elemento duplicado dentro de una lista.
- **Calificación:** 6/10
- **Veredicto:** ⚠️ Aprobado con cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Medio | 2-5 | Rendimiento | El algoritmo tiene una complejidad de tiempo O(n²) debido a los bucles anidados. | Utilizar un set, reduciendo la complejidad a O(n). |
| 2 | Bajo | 3 | Rendimiento | El bucle interno siempre empieza en 0, por lo que compara pares dos veces. | El bucle interno debería empezar en i + 1. |

### Código corregido
```python
def tiene_duplicados(lista):
    # Un set elimina los duplicados automáticamente.
    return len(lista) != len(set(lista))
```

### Lo que está bien
- La lógica base es correcta; tuvo en cuenta el caso i != j.

### Para aprender más
- Estructuras de datos en Python (set).
- Notación Big O.

---

## Caso 6 — caso06_nombre.c (47.3 s) — Skill activada: sí

### Resumen
- **Lenguaje:** C
- **Qué hace el código:** Solicita un nombre al usuario por consola, hace una copia dinámica de esa cadena en memoria y luego la imprime con un saludo.
- **Calificación:** 3/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 14 | Seguridad | Uso de gets(): fue removida del estándar C11 porque no comprueba la longitud de la entrada (buffer overflow). | Reemplazar por fgets(buffer, sizeof(buffer), stdin). |
| 2 | Crítico | 6 | Bug | strlen() no incluye el carácter nulo \0; strcpy escribe un byte fuera del espacio reservado. | malloc(strlen(nombre) + 1). |
| 3 | Medio | 16 | Rendimiento | Fuga de memoria: c nunca se libera. | Llamar a free(c) después de imprimir. |
| 4 | Medio | 6 | Buenas prácticas | El valor de retorno de malloc no se valida (NULL → Segmentation fault). | Envolver el uso del puntero en if (copia != NULL). |

### Código corregido
Usa `malloc(strlen(nombre) + 1)`, valida `NULL`, reemplaza `gets` por `fgets` + `strcspn` para quitar el salto de línea y libera la memoria con `free(c)`.

### Lo que está bien
- Modularización (función dedicada a copiar el nombre); cabeceras correctas.

### Para aprender más
- Buffer overflow en C y por qué gets es peligrosa.
- Ciclo de vida de la memoria dinámica (malloc/free).

---

## Caso 7 — caso07_primo.py (25.7 s) — Skill activada: sí — caso de control sin errores

### Resumen
- **Lenguaje:** Python
- **Qué hace el código:** Determina si un número es primo iterando hasta la raíz cuadrada del número e imprime la lista de números primos menores a 20.
- **Calificación:** 10/10
- **Veredicto:** ✅ Aprobado

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|

El código no presenta errores, cumple con su objetivo y no tiene vulnerabilidades ni problemas críticos de rendimiento.

### Código corregido
Versión opcional que descarta los pares y avanza `i += 2`.

### Lo que está bien
- Complejidad O(√n) al detenerse en `i * i <= n`.
- Type hints, docstring y bloque `if __name__ == "__main__":`.

### Para aprender más
- Wheel factorization y Criba de Eratóstenes.

---

## Caso 8 — caso08_estudiantes.sql (24.2 s) — Skill activada: sí

### Resumen
- **Lenguaje:** SQL
- **Qué hace el código:** Actualiza el promedio de un estudiante y consulta los estudiantes de una carrera específica.
- **Calificación:** 3/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 2 | Bug | El UPDATE no tiene cláusula WHERE: el promedio de todos los estudiantes se cambia a 0 (pérdida masiva de datos). | Añadir WHERE codigo = 1020. |
| 2 | Medio | 5 | Buenas prácticas | Se usa SELECT *: ineficiente en producción. | Enumerar solo las columnas necesarias. |

### Código corregido
```sql
UPDATE estudiantes SET promedio = 0 WHERE codigo = 1020; -- Se añadió la cláusula WHERE
SELECT codigo, nombre, promedio FROM estudiantes WHERE carrera = 'Ingenieria' ORDER BY promedio; -- Columnas explícitas
```

### Lo que está bien
- Los comentarios describen la intención; WHERE y ORDER BY bien aplicados en el SELECT.

### Para aprender más
- DML (UPDATE/DELETE) sin WHERE y cómo prevenirlo.
- Por qué evitar SELECT *.

---

## Caso 9 — caso09_Cuenta.java (27.2 s) — Skill activada: sí

### Resumen
- **Lenguaje:** Java
- **Qué hace el código:** Define una clase Cuenta para retirar dinero de un saldo mediante ingreso por consola.
- **Calificación:** 4/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 14-16 | Buenas prácticas | El bloque catch (Exception e) {} está vacío (swallowing exceptions). | Imprimir el error o manejar la excepción con un mensaje claro. |
| 2 | Alto | 6-8 | Bug / Lógica | retirar no valida si el monto supera el saldo o si es negativo. | Agregar if (monto > saldo) / if (monto <= 0) y lanzar una excepción. |
| 3 | Medio | 11 | Rendimiento | El Scanner nunca se cierra (resource leak). | Usar try-with-resources. |
| 4 | Bajo | 4 | Lógica | saldo inicia en 0.0 y no hay constructor ni método para depositar. | Crear un constructor Cuenta(double saldoInicial). |

### Código corregido
Agrega constructor con saldo inicial, valida `monto <= 0` y `monto > saldo` con `IllegalArgumentException`, usa try-with-resources para el `Scanner` y captura `InputMismatchException` con mensajes claros.

### Lo que está bien
- Encapsulamiento de `saldo` como private; compila; intención de usar try-catch.

### Para aprender más
- Programación defensiva.
- try-with-resources en Java.

> Observación del evaluador: no mencionó el uso de `double` para dinero (error 9-C). Calificó el catch vacío como Crítico (se esperaba Medio).

---

## Caso 10 — caso10_usuario.js (32.1 s) — Skill activada: sí

### Resumen
- **Lenguaje:** JavaScript
- **Qué hace el código:** Intenta obtener los datos de un usuario desde una API REST mediante su ID y mostrar su nombre en la consola.
- **Calificación:** 3/10
- **Veredicto:** ❌ Requiere cambios

### Hallazgos
| # | Severidad | Línea(s) | Categoría | Problema | Cómo corregirlo |
|---|-----------|----------|-----------|----------|-----------------|
| 1 | Crítico | 2 | Bug | Falta await en fetch(): respuesta guarda la promesa pendiente (respuesta.json is not a function). | Añadir await antes de fetch(...). |
| 2 | Crítico | 3 | Bug | .json() también devuelve una Promesa; sin await se retorna una promesa. | Añadir await antes de respuesta.json(). |
| 3 | Alto | 3 | Lógica | No se verifica si la petición HTTP fue exitosa (404/500). | Validar if (!respuesta.ok) y lanzar un error. |
| 4 | Alto | 7 | Buenas prácticas | La promesa no tiene .catch() (Unhandled Promise Rejection). | Añadir .catch(error => console.error(error)). |

### Código corregido
Agrega `await` en `fetch` y `json()`, valida `respuesta.ok`, envuelve en try/catch y comprueba `if (u)` antes de imprimir.

### Lo que está bien
- Uso de async/await y de const.

### Para aprender más
- Event Loop y promesas en JavaScript.
- API Fetch: `.ok` y `.status`.
