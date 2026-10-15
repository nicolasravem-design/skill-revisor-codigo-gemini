async function obtenerUsuario(id) {
  const respuesta = fetch("https://api.ejemplo.com/usuarios/" + id);
  const datos = respuesta.json();
  return datos;
}

obtenerUsuario(5).then(u => console.log(u.nombre));
