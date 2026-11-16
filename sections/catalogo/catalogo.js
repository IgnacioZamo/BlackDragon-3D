/* Catálogo de la landing (datos de data/productos.json):
   1. Tarjetas de categoría: collage con las fotos de cada categoría y cantidad de modelos.
   2. Piezas destacadas: los productos con "destacado": true.
   El catálogo completo está en productos.html. */
(function () {
  "use strict";

  const tarjetasCategoria = document.querySelectorAll(".cat-card[data-categoria]");
  const lista = document.getElementById("destacados");
  if (!tarjetasCategoria.length && !lista) return;

  const aviso = lista && lista.parentElement.querySelector(".productos__vacio");
  const MAXIMO_DESTACADOS = 4;

  function armarCollage(tarjeta, productos) {
    const categoria = tarjeta.dataset.categoria;
    const maximo = Number(tarjeta.dataset.maxFotos) || 2;
    const collage = tarjeta.querySelector(".cat-card__collage");
    const cantidad = tarjeta.querySelector(".cat-card__cant");

    // Primero los destacados, así el collage muestra las piezas más lindas
    const deLaCategoria = productos
      .filter((p) => BD.perteneceA(p, categoria))
      .sort((a, b) => Number(Boolean(b.destacado)) - Number(Boolean(a.destacado)));

    if (!deLaCategoria.length) {
      collage.classList.add("cat-card__collage--vacio");
      cantidad.textContent = "Próximamente";
      return;
    }

    const fotos = deLaCategoria.slice(0, maximo);
    collage.dataset.fotos = fotos.length;
    fotos.forEach((p) => {
      const img = document.createElement("img");
      img.src = p.imagenes[0].src;
      img.alt = "";
      img.loading = "lazy";
      collage.appendChild(img);
    });

    cantidad.textContent = deLaCategoria.length === 1 ? "1 modelo" : `${deLaCategoria.length} modelos`;
  }

  function mostrarDestacados(productos) {
    // Si ninguno está marcado como destacado, se muestran los primeros del JSON
    const marcados = productos.filter((p) => p.destacado);
    const destacados = (marcados.length ? marcados : productos).slice(0, MAXIMO_DESTACADOS);

    destacados.forEach((p) => lista.appendChild(BD.crearTarjeta(p)));
    BD.observarReveal(lista);
  }

  BD.cargarProductos()
    .then((productos) => {
      tarjetasCategoria.forEach((tarjeta) => armarCollage(tarjeta, productos));
      if (lista) mostrarDestacados(productos);
    })
    .catch((error) => {
      console.error(error);
      if (aviso) {
        aviso.textContent = "No pudimos cargar las piezas. Probá recargar la página.";
        aviso.hidden = false;
      }
    });
})();
