/* Catálogo de la landing: muestra los productos marcados con "destacado": true
   en data/productos.json. El catálogo completo está en productos.html. */
(function () {
  "use strict";

  const lista = document.getElementById("destacados");
  if (!lista) return;

  const aviso = lista.parentElement.querySelector(".productos__vacio");
  const MAXIMO = 4;

  BD.cargarProductos()
    .then((productos) => {
      // Si ninguno está marcado como destacado, se muestran los primeros del JSON
      const marcados = productos.filter((p) => p.destacado);
      const destacados = (marcados.length ? marcados : productos).slice(0, MAXIMO);

      destacados.forEach((p) => lista.appendChild(BD.crearTarjeta(p)));
      BD.observarReveal(lista);
    })
    .catch((error) => {
      console.error(error);
      aviso.textContent = "No pudimos cargar las piezas. Probá recargar la página.";
      aviso.hidden = false;
    });
})();
