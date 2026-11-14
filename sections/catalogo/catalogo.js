/* Catálogo: arma las tarjetas con data/productos.json y maneja los filtros.
   También filtran las tarjetas de categoría y los enlaces del footer (data-filtro-link). */
(function () {
  "use strict";

  const seccion = document.getElementById("productos");
  if (!seccion) return;

  const lista = seccion.querySelector(".productos__grid");
  const vacio = seccion.querySelector(".productos__vacio");
  const botones = seccion.querySelectorAll(".filtro");
  const molde = document.getElementById("plantilla-producto");

  function crearTarjeta(p) {
    const tarjeta = molde.content.firstElementChild.cloneNode(true);
    const campo = (nombre) => tarjeta.querySelector(`[data-campo="${nombre}"]`);
    const imagen = p.imagenes[0];

    tarjeta.dataset.categorias = p.filtros.join(" ");

    campo("imagen").src = imagen.src;
    campo("imagen").alt = imagen.alt;

    // La etiqueta ("Más vendido", "Nuevo"...) es opcional
    if (p.etiqueta) {
      campo("etiqueta").textContent = p.etiqueta.texto;
      campo("etiqueta").classList.add(`badge--${p.etiqueta.color}`);
    } else {
      campo("etiqueta").remove();
    }

    campo("favorito").dataset.fav = p.id;
    campo("favorito").querySelector(".sr-only").textContent = `Guardar ${p.nombre} en favoritos`;

    campo("categoria").textContent = p.categoria;
    campo("nombre").textContent = p.nombre;
    campo("nombre").href = `producto.html?id=${encodeURIComponent(p.id)}`;
    campo("resumen").textContent = p.resumen;
    campo("precio").textContent = BD.formatearPrecio(p.precio);

    campo("pedir").href = BD.linkWhatsAppProducto(p);
    campo("pedir").querySelector(".sr-only").textContent = `Pedir ${p.nombre} por WhatsApp`;

    return tarjeta;
  }

  function filtrar(filtro) {
    let visibles = 0;

    botones.forEach((boton) => {
      const activo = boton.dataset.filtro === filtro;
      boton.classList.toggle("activo", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });

    lista.querySelectorAll(".prod-card").forEach((tarjeta) => {
      const mostrar = filtro === "todo" || tarjeta.dataset.categorias.split(" ").includes(filtro);
      tarjeta.hidden = !mostrar;
      if (mostrar) visibles++;
    });

    vacio.hidden = visibles > 0;
  }

  botones.forEach((boton) => boton.addEventListener("click", () => filtrar(boton.dataset.filtro)));
  document.querySelectorAll("[data-filtro-link]").forEach((enlace) => {
    enlace.addEventListener("click", () => filtrar(enlace.dataset.filtroLink));
  });

  BD.cargarProductos()
    .then((productos) => {
      productos.forEach((p) => lista.appendChild(crearTarjeta(p)));
      BD.marcarFavoritos(lista);
      BD.observarReveal(lista);
    })
    .catch((error) => {
      console.error(error);
      vacio.textContent = "No pudimos cargar las piezas. Probá recargar la página.";
      vacio.hidden = false;
    });
})();
