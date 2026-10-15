# Respuestas de Gemini SIN la Skill (línea base)

Prompt usado en todos los casos: `Revisa este codigo y dime que errores tiene:` + el código del caso.
Modelo: Gemini (modo Pro) en gemini.google.com, chat nuevo por cada caso, 15/10/2026.

---

## Caso 1 — caso01_promedio.py (14.2 s)

El código tiene dos errores principales: uno lógico que afecta el resultado y otro de ejecución que detiene el programa.

Omite el primer elemento (Error lógico): El bucle for i in range(1, len(notas)): empieza en el índice 1. En Python, los índices de las listas empiezan en 0, por lo que el código está ignorando la primera nota (en tu ejemplo, el 4.5 nunca se suma).

División por cero (Error de ejecución): Cuando pasas una lista vacía calcular_promedio([]), la longitud de notas es 0. Al intentar calcular suma / len(notas) en la última línea de la función, Python arrojará un error ZeroDivisionError.

Aquí tienes el código corregido. Además de solucionar los errores, he cambiado el bucle a una forma más "Pythónica" y directa:

```python
def calcular_promedio(notas):
    # Validar que la lista no esté vacía para evitar división por cero
    if not notas:
        return 0  # o puedes retornar None, dependiendo de lo que necesites

    suma = 0
    # Iterar directamente sobre los elementos en lugar de usar índices
    for nota in notas:
        suma += nota

    return suma / len(notas)
```

Nota: En Python también puedes calcular el promedio sin usar bucles, aprovechando la función integrada sum(): return sum(notas) / len(notas).

---

## Caso 2 — caso02_login.py (28.8 s)

El código tiene una vulnerabilidad de seguridad crítica y un problema de gestión de recursos. Aquí están los errores principales:

1. Vulnerabilidad Crítica: Inyección SQL
Estás construyendo la consulta concatenando cadenas (+ usuario +). Esto permite que un atacante ingrese texto malicioso para saltarse el login o robar datos.
Ejemplo de ataque: Si alguien pone como usuario ' OR '1'='1, la consulta final quedaría ... WHERE usuario = '' OR '1'='1', lo cual siempre es verdadero y dará acceso sin importar la contraseña.
Solución: Usar consultas parametrizadas con ?.

2. Fuga de recursos (No se cierra la conexión)
El código abre una conexión a la base de datos pero nunca la cierra. Si esta función se llama muchas veces, bloqueará la base de datos o consumirá toda la memoria disponible.
Solución: Usar el bloque with (Context Manager) o llamar a conexion.close() al final.

3. Simplificación del retorno (Opcional)
El bloque if resultado: return True else: return False es redundante. Se puede retornar directamente la evaluación booleana.

4. Contraseñas en texto plano (Conceptual)
Aunque no es un error de sintaxis, verificar contraseñas directamente con clave = ... asume que están guardadas en texto plano en la base de datos, lo cual es una pésima práctica de seguridad. Deberían guardarse y compararse usando hashes (con librerías como bcrypt o werkzeug.security).

Código Corregido *(bloque de código omitido en la captura)*

---

## Caso 3 — caso03_Busqueda.java (29.3 s)

El código tiene dos errores principales clásicos en Java:

Desbordamiento de índice (ArrayIndexOutOfBoundsException):
En el ciclo for, la condición es i <= nombres.length. Como los arreglos en Java tienen índice cero, el último elemento válido siempre está en nombres.length - 1. Al usar <=, el ciclo intentará acceder a una posición que no existe, provocando un error en tiempo de ejecución.
Solución: Cambiar a i < nombres.length.

Comparación incorrecta de Strings:
La condición nombres[i] == objetivo utiliza el operador ==. En Java, este operador compara referencias en memoria (es decir, si ambos objetos apuntan al mismo espacio), no el contenido del texto.
Solución: Utilizar el método .equals() *(resto de la respuesta: código corregido)*

---

## Caso 4 — caso04_carrito.js (30.6 s)

El código funciona en su lógica básica, pero tiene una vulnerabilidad de seguridad crítica y utiliza prácticas anticuadas de JavaScript.

1. Vulnerabilidad de seguridad (XSS)
En la función mostrarProducto, usar innerHTML e inyectar directamente la variable nombre expone la aplicación a ataques de Cross-Site Scripting (XSS). Si un usuario malintencionado logra pasar un string con código malicioso (por ejemplo, <script>alert('hack')</script>), el navegador lo ejecutará.
Solución: Usa textContent para insertar texto de forma segura, creando primero el elemento, o sanitiza el input si estrictamente necesitas usar innerHTML.

2. Uso de var en lugar de let / const
El uso de var puede causar problemas de alcance (scope) y es una práctica obsoleta en JavaScript moderno (ES6+).
Solución: Usa const para variables que no cambian y let para las que sí se reasignan.

3. Métodos de arreglos modernos
El bucle for tradicional es correcto, pero JavaScript moderno ofrece métodos más legibles y funcionales como reduce() para sumar valores de un arreglo.

4. Falta de validación de datos (Programación defensiva)
Si productos no es un arreglo, o si viene vacío/nulo, productos.length arrojará un error. Si precio o cantidad no son números, el total será NaN (Not a Number).

Código Refactorizado y Seguro *(incluye reduce(), validación con Array.isArray y textContent; mantiene el número 100000 sin constante)*

---

## Caso 5 — caso05_duplicados.py (24.9 s)

El código no tiene errores de sintaxis ni de lógica básica (funcionará correctamente y devolverá True o False según corresponda), pero tiene graves problemas de eficiencia y diseño.

1. Es muy ineficiente (Complejidad O(n²))
Al usar dos bucles anidados que recorren toda la lista, el código hace comparaciones redundantes. Si tienes una lista de 1,000 elementos, el código hará 1,000,000 de comprobaciones. Además, compara pares repetidos.
Solución si quieres mantener los bucles: que el segundo bucle empiece desde i + 1.

2. No es "Pythonico" (La forma óptima)
La estructura de datos set elimina automáticamente los duplicados y su búsqueda es muchísimo más rápida (Complejidad O(n)).

```python
def tiene_duplicados(lista):
    return len(lista) != len(set(lista))
```

---

## Caso 6 — caso06_nombre.c (59.2 s)

El código tiene varios errores y malas prácticas, principalmente relacionados con la gestión de memoria y la seguridad.

Falta de espacio para el carácter nulo en malloc (Desbordamiento de búfer):
La función strlen(nombre) devuelve la cantidad de caracteres de la cadena, pero no incluye el carácter nulo (\0). Al copiar con strcpy, se escribirá fuera de la memoria asignada.
Solución: Cambiar a malloc(strlen(nombre) + 1);

Uso de la función extremadamente peligrosa gets():
La función gets() fue eliminada del estándar C11 porque no verifica el tamaño del búfer de destino. Si el usuario escribe más de 9 caracteres, sobrescribirá memoria adyacente (buffer overflow).
Solución: Usar fgets(buffer, sizeof(buffer), stdin);

Fuga de memoria (Memory Leak):
El puntero c recibe memoria dinámica asignada mediante malloc, pero nunca se libera.
Solución: Llamar a free(c); antes del return 0; en el main.

Falta de validación de malloc (Buena práctica):
Si no hay suficiente memoria disponible, malloc devuelve NULL. Intentar usar strcpy en un puntero nulo colapsará el programa.
Solución: Comprobar si copia == NULL antes de usarlo.

> Nota: un primer intento de este caso se envió con el código duplicado por un error de la automatización (60.5 s); se repitió en un chat nuevo y se registró la segunda ejecución.

---

## Caso 7 — caso07_primo.py (15.4 s) — caso de control sin errores

He revisado tu código y la realidad es que no tiene ningún error. Es un código excelente, funcional y muy bien escrito.

De hecho, aplicaste varias buenas prácticas que vale la pena destacar:
- Eficiencia matemática: Al usar la condición while i * i <= n:, estás comprobando los divisores solo hasta la raíz cuadrada de n (O(√n)).
- Tipado estático (Type Hints): El uso de (n: int) -> bool hace que el código sea más legible.
- Docstrings: Explicas claramente lo que hace la función.
- Buenas prácticas de Python: if __name__ == "__main__": y una comprensión de listas muy limpia.

Si ejecutas el código, la salida será: [2, 3, 5, 7, 11, 13, 17, 19]

Una sugerencia de optimización (Opcional): descartar los números pares desde el principio y comprobar solo los impares (i += 2).

---

## Caso 8 — caso08_estudiantes.sql (29.3 s)

El error principal y más crítico está en la primera instrucción: te falta la cláusula WHERE en el UPDATE.

Al ejecutar UPDATE estudiantes SET promedio = 0; vas a reiniciar el promedio a 0 para todos los estudiantes de la tabla, borrando los datos de los demás, en lugar de afectar únicamente al estudiante 1020.

La segunda instrucción (SELECT) está correcta y cumple con lo que dice el comentario.

```sql
UPDATE estudiantes SET promedio = 0 WHERE codigo = 1020;
SELECT * FROM estudiantes WHERE carrera = 'Ingenieria' ORDER BY promedio;
```

---

## Caso 9 — caso09_Cuenta.java (33.8 s)

El código compila y se ejecutará sin arrojar errores de sintaxis, pero contiene varios errores lógicos y malas prácticas de programación orientada a objetos:

Falta de validación en el método retirar:
Permite retirar más dinero del que hay en la cuenta (dejando el saldo en negativo) e incluso permite ingresar un monto negativo (0 - (-50) = 50).

Bloque try-catch inútil y vacío:
El método retirar no lanza ninguna excepción, por lo que el bloque try es redundante. Además, dejar un bloque catch (Exception e) {} vacío es un anti-patrón (swallowing exceptions).

Falta de un saldo inicial (Constructor):
La variable saldo se inicializa por defecto en 0.0. La cuenta siempre quedará en números rojos en la primera transacción.

Acceso directo a atributos privados:
System.out.println("Saldo: " + c.saldo); accede directamente al atributo privado saldo. Rompe el principio de encapsulamiento. Lo correcto es usar un método getter.

Código corregido y optimizado *(no capturado completo)*

---

## Caso 10 — caso10_usuario.js (25.1 s)

El código tiene un problema principal: le faltan las palabras clave await, lo que provoca que las promesas no se resuelvan correctamente.

Falta await en fetch(): La función fetch es asíncrona y devuelve una Promesa. Al no poner await, la constante respuesta guardará la Promesa pendiente.

Falta await en respuesta.json(): El método .json() también devuelve una Promesa. Además, intentar llamar a respuesta.json() lanzará un error de tipo (respuesta.json is not a function).

Código corregido: agrega await, `if (!respuesta.ok) throw new Error(...)` ("Opcional pero recomendado") y un bloque try/catch.
