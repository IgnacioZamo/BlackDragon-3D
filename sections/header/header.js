/* Menú hamburguesa de la navegación (celular y tablet).
   Se cierra con: la X del panel, un clic fuera del panel,
   la tecla Escape o al elegir un enlace. */
(function () {
  "use strict";

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  const botonCerrar = menu.querySelector(".nav__cerrar");
  const fondo = document.querySelector(".nav__fondo");

  // Marca la página actual: Productos (y la ficha de un producto) o Inicio en la landing
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  const actual = pagina === "producto.html" ? "productos.html" : pagina;
  menu.querySelectorAll("a:not(.btn)").forEach((enlace) => {
    const destino = enlace.getAttribute("href");
    const esActual = actual === "index.html" ? /#inicio$/.test(destino) : destino === actual;
    if (esActual) enlace.setAttribute("aria-current", "page");
  });

  const estaAbierto = () => menu.classList.contains("abierto");

  function abrir() {
    menu.classList.add("abierto");
    fondo.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    // En celular se frena el scroll de la página de atrás (ver header.css)
    document.documentElement.classList.add("menu-abierto");
    botonCerrar.focus();
  }

  function cerrar({ devolverFoco = false } = {}) {
    if (!estaAbierto()) return;
    menu.classList.remove("abierto");
    fondo.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("menu-abierto");
    if (devolverFoco) toggle.focus();
  }

  toggle.addEventListener("click", () => (estaAbierto() ? cerrar() : abrir()));
  botonCerrar.addEventListener("click", () => cerrar({ devolverFoco: true }));

  // Clic fuera del panel: en el fondo oscuro o en cualquier otra parte de la página
  document.addEventListener("click", (e) => {
    if (estaAbierto() && !menu.contains(e.target) && !toggle.contains(e.target)) cerrar();
  });

  // Al elegir una sección el menú se cierra para no tapar el contenido
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) cerrar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar({ devolverFoco: true });
  });

  // Si se agranda la ventana a escritorio con el menú abierto, se cierra
  window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => {
    if (e.matches) cerrar();
  });
})();
