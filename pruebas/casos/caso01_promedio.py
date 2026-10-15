def calcular_promedio(notas):
    suma = 0
    for i in range(1, len(notas)):
        suma += notas[i]
    return suma / len(notas)

notas = [4.5, 3.0, 5.0]
print("Promedio:", calcular_promedio(notas))
print("Promedio vacio:", calcular_promedio([]))
