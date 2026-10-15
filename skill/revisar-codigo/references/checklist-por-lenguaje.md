# Checklist por lenguaje

Errores típicos que hay que buscar según el lenguaje del código recibido.

## Python
- Argumentos por defecto mutables (`def f(x=[])`).
- `except:` o `except Exception:` que esconden errores.
- Comparar con `None` usando `==` en vez de `is`.
- Archivos abiertos sin `with`.
- Concatenar strings para armar consultas SQL (usar parámetros `?` o `%s`).
- Modificar una lista mientras se recorre.

## Java
- Comparar `String` con `==` en vez de `.equals()`.
- `NullPointerException` por no validar objetos.
- Recursos (`Scanner`, `Connection`, `FileReader`) sin cerrar o sin `try-with-resources`.
- Índices fuera de rango en arreglos (`i <= arr.length`).
- `catch (Exception e) {}` vacío.

## JavaScript
- Usar `==` en vez de `===`.
- Variables con `var` que causan problemas de alcance.
- Promesas sin `await` o sin `.catch()`.
- Insertar texto del usuario con `innerHTML` (XSS).
- `eval()` con datos externos.

## C / C++
- Desbordamiento de buffer (`gets`, `strcpy` sin límite).
- Memoria reservada con `malloc`/`new` que nunca se libera.
- Punteros sin inicializar o usados después de `free`.
- División entera cuando se esperaba decimal.

## SQL
- `SELECT *` en consultas de producción.
- `UPDATE` o `DELETE` sin `WHERE`.
- Consultas armadas con concatenación de texto.
- Falta de índices en columnas que se filtran mucho.
