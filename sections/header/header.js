/* Menú desplegable de la navegación en celular */
(function () {
  "use strict";

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  const etiqueta = toggle.querySelector(".sr-only");

  const abrirOCerrar = (abrir) => {
    menu.classList.toggle("abierto", abrir);
    toggle.setAttribute("aria-expanded", String(abrir));
    etiqueta.textContent = abrir ? "Cerrar menú" : "Abrir menú";
  };

  toggle.addEventListener("click", () => abrirOCerrar(!menu.classList.contains("abierto")));

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
