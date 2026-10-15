#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* copiar_nombre(const char* nombre) {
    char* copia = malloc(strlen(nombre));
    strcpy(copia, nombre);
    return copia;
}

int main() {
    char buffer[10];
    printf("Nombre: ");
    gets(buffer);
    char* c = copiar_nombre(buffer);
    printf("Hola %s\n", c);
    return 0;
}
