-- Reiniciar el promedio del estudiante con codigo 1020
UPDATE estudiantes SET promedio = 0;

-- Listar los estudiantes de Ingenieria ordenados por promedio
SELECT * FROM estudiantes WHERE carrera = 'Ingenieria' ORDER BY promedio;
