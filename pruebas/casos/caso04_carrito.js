function calcularTotal(productos) {
  var total = 0;
  for (var i = 0; i < productos.length; i++) {
    total += productos[i].precio * productos[i].cantidad;
  }
  if (total > 100000) {
    total = total * 0.9;
  }
  return total;
}

function mostrarProducto(nombre) {
  document.getElementById("detalle").innerHTML = "<h2>" + nombre + "</h2>";
}
