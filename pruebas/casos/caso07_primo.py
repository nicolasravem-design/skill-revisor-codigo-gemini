def es_primo(n: int) -> bool:
    """Retorna True si n es un numero primo."""
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True


if __name__ == "__main__":
    print([x for x in range(20) if es_primo(x)])
