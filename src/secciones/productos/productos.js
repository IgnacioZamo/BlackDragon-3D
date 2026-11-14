/* Filtros de las piezas destacadas.
   También filtran las tarjetas de categoría y los enlaces del footer (data-filtro-link). */
(function () {
  "use strict";

  const seccion = document.getElementById("productos");
  if (!seccion) return;

  const botones = seccion.querySelectorAll(".filtro");
  const tarjetas = seccion.querySelectorAll(".prod-card");
  const vacio = seccion.querySelector(".productos__vacio");

  const filtrar = (filtro) => {
    let visibles = 0;

    botones.forEach((boton) => {
      const activo = boton.dataset.filtro === filtro;
      boton.classList.toggle("activo", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });

    tarjetas.forEach((tarjeta) => {
      const mostrar = filtro === "todo" || tarjeta.dataset.categorias.split(" ").includes(filtro);
      tarjeta.hidden = !mostrar;
      if (mostrar) visibles++;
    });

    vacio.hidden = visibles > 0;
  };

  botones.forEach((boton) => boton.addEventListener("click", () => filtrar(boton.dataset.filtro)));

  document.querySelectorAll("[data-filtro-link]").forEach((enlace) => {
    enlace.addEventListener("click", () => filtrar(enlace.dataset.filtroLink));
  });
})();
