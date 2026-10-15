// ===============================================
// Landing page - Skill revisar-codigo
// JavaScript sencillo, sin librerías
// ===============================================

// Resultados reales de las pruebas (ver pruebas/resultados_por_caso.csv)
const resultados = [
  { caso: "01 promedio.py", esperados: 2, sinSkill: 2, conSkill: 2 },
  { caso: "02 login.py", esperados: 3, sinSkill: 3, conSkill: 2 },
  { caso: "03 Busqueda.java", esperados: 2, sinSkill: 2, conSkill: 2 },
  { caso: "04 carrito.js", esperados: 3, sinSkill: 2, conSkill: 3 },
  { caso: "05 duplicados.py", esperados: 1, sinSkill: 1, conSkill: 1 },
  { caso: "06 nombre.c", esperados: 4, sinSkill: 4, conSkill: 4 },
  { caso: "07 primo.py", esperados: 0, sinSkill: 0, conSkill: 0 },
  { caso: "08 estudiantes.sql", esperados: 2, sinSkill: 1, conSkill: 2 },
  { caso: "09 Cuenta.java", esperados: 4, sinSkill: 2, conSkill: 3 },
  { caso: "10 usuario.js", esperados: 3, sinSkill: 2, conSkill: 3 },
];

const MAX_ERRORES = 4; // el caso con más errores tiene 4

// ---------- Menú en celular ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const abierto = navLinks.classList.toggle("abierto");
  navToggle.setAttribute("aria-expanded", abierto);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("abierto"));
});

// ---------- Pestañas de la demo ----------
const pestanas = document.querySelectorAll(".pestana");

pestanas.forEach((pestana) => {
  pestana.addEventListener("click", () => {
    pestanas.forEach((p) => {
      p.classList.remove("activa");
      p.setAttribute("aria-selected", "false");
    });
    pestana.classList.add("activa");
    pestana.setAttribute("aria-selected", "true");

    document.querySelectorAll(".panel").forEach((panel) => (panel.hidden = true));
    document.getElementById("panel-" + pestana.dataset.tab).hidden = false;
  });
});

// ---------- Gráfica de barras ----------
function crearGrafica() {
  const grafica = document.getElementById("grafica");

  resultados.forEach((r) => {
    const fila = document.createElement("div");
    fila.className = "barra";
    fila.innerHTML = `
      <span class="barra__nombre">${r.caso}</span>
      <div class="barra__pista">
        <div class="barra__esp" data-ancho="${(r.esperados / MAX_ERRORES) * 100}"></div>
        <div class="barra__sin" data-ancho="${(r.sinSkill / MAX_ERRORES) * 100}"></div>
        <div class="barra__con" data-ancho="${(r.conSkill / MAX_ERRORES) * 100}"></div>
      </div>
      <span class="barra__valor">${r.conSkill}/${r.esperados}</span>
    `;
    grafica.appendChild(fila);
  });
}

function animarGrafica() {
  document.querySelectorAll("[data-ancho]").forEach((barra) => {
    barra.style.width = barra.dataset.ancho + "%";
  });
}

// ---------- Contadores del hero ----------
function animarContadores() {
  document.querySelectorAll("[data-contador]").forEach((el) => {
    const final = Number(el.dataset.contador);
    let actual = 0;
    const paso = Math.max(1, Math.ceil(final / 20));
    const intervalo = setInterval(() => {
      actual = Math.min(final, actual + paso);
      el.textContent = actual;
      if (actual === final) clearInterval(intervalo);
    }, 40);
  });
}

// ---------- Copiar la descripción de la Skill ----------
const descripcion =
  "Revisa código fuente (Python, Java, JavaScript, C/C++ o SQL) como un ingeniero de software senior, detecta bugs, vulnerabilidades, problemas de rendimiento y malas prácticas, y entrega correcciones explicadas con nivel de severidad. Usar cuando se pegue código y se pida revisarlo, encontrar errores, mejorar su calidad, preparar un pull request o entender por qué falla.";

document.getElementById("copiarDescripcion").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText(descripcion);
    e.target.textContent = "¡Copiada!";
  } catch (error) {
    e.target.textContent = "No se pudo copiar";
  }
  setTimeout(() => (e.target.textContent = "Copiar descripción"), 2000);
});

// ---------- Animaciones al hacer scroll ----------
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("visible");
      if (entrada.target.id === "resultados") animarGrafica();
      observador.unobserve(entrada.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".seccion").forEach((seccion) => {
  seccion.classList.add("aparecer");
  observador.observe(seccion);
});

crearGrafica();
animarContadores();
