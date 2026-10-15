import sqlite3

def login(usuario, clave):
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    consulta = "SELECT * FROM usuarios WHERE usuario = '" + usuario + "' AND clave = '" + clave + "'"
    cursor.execute(consulta)
    resultado = cursor.fetchone()
    if resultado:
        return True
    return False
