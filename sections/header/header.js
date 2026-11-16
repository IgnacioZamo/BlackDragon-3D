/* Menú hamburguesa de la navegación (celular y tablet) */
(function () {
  "use strict";

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  const etiqueta = toggle.querySelector(".sr-only");

  // Marca la página actual: Productos (y la ficha de un producto) o Inicio en la landing
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  const actual = pagina === "producto.html" ? "productos.html" : pagina;
  menu.querySelectorAll("a:not(.btn)").forEach((enlace) => {
    const destino = enlace.getAttribute("href");
    const esActual = actual === "index.html" ? /#inicio$/.test(destino) : destino === actual;
    if (esActual) enlace.setAttribute("aria-current", "page");
  });

  const abrirOCerrar = (abrir) => {
    menu.classList.toggle("abierto", abrir);
    toggle.setAttribute("aria-expanded", String(abrir));
    etiqueta.textContent = abrir ? "Cerrar menú" : "Abrir menú";
    // En celular el menú tapa toda la pantalla: se frena el scroll de atrás (ver header.css)
    document.documentElement.classList.toggle("menu-abierto", abrir);
  };

  toggle.addEventListener("click", () => abrirOCerrar(!menu.classList.contains("abierto")));

  // Si se agranda la ventana a escritorio con el menú abierto, se cierra
  window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => {
    if (e.matches) abrirOCerrar(false);
  });

  // Al elegir una sección el menú se cierra para no tapar el contenido
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) abrirOCerrar(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("abierto")) {
      abrirOCerrar(false);
      toggle.focus();
    }
  });
})();
