/* Productos: muestra todo data/productos.json con buscador y filtros.
   - Botones de filtro: el primer valor de "filtros" de cada producto (anime, películas…).
   - Buscador: busca en nombre, categoría, resumen y todos los "filtros".
   - Acepta ?filtro=anime y ?q=goku en la URL (los usan los enlaces de la landing). */
(function () {
  "use strict";

  const lista = document.getElementById("lista-productos");
  if (!lista) return;

  const campoBusqueda = document.getElementById("buscar");
  const contenedorFiltros = document.getElementById("filtros-productos");
  const cantidad = document.getElementById("cantidad-productos");
  const sinResultados = document.getElementById("sin-resultados");

  // Nombre lindo para los botones; si un filtro no está acá se muestra con mayúscula inicial
  const ETIQUETAS = { peliculas: "Películas", comics: "Cómics", originales: "Originales" };
  const etiquetaFiltro = (f) => ETIQUETAS[f] || f.charAt(0).toUpperCase() + f.slice(1);

  // Sin tildes ni mayúsculas, para que "pelicula" encuentre "Películas"
  const normalizar = (texto) =>
    String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");

  const parametros = new URLSearchParams(window.location.search);
  const estado = { filtro: normalizar(parametros.get("filtro")) || "todo", busqueda: parametros.get("q") || "" };
  let tarjetas = [];

  function crearBotonesFiltro(productos) {
    const principales = [...new Set(productos.map((p) => normalizar((p.filtros || [])[0])).filter(Boolean))];
    principales.forEach((filtro) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "filtro";
      boton.dataset.filtro = filtro;
      boton.textContent = etiquetaFiltro(filtro);
      contenedorFiltros.appendChild(boton);
    });

    contenedorFiltros.addEventListener("click", (e) => {
      const boton = e.target.closest("[data-filtro]");
      if (!boton) return;
      estado.filtro = boton.dataset.filtro;
      aplicar();
    });
  }

  function aplicar() {
    const palabras = normalizar(estado.busqueda).split(/\s+/).filter(Boolean);
    let visibles = 0;

    contenedorFiltros.querySelectorAll("[data-filtro]").forEach((boton) => {
      const activo = boton.dataset.filtro === estado.filtro;
      boton.classList.toggle("activo", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });

    tarjetas.forEach(({ tarjeta, filtros, texto }) => {
      const pasaFiltro = estado.filtro === "todo" || filtros.includes(estado.filtro);
      const pasaBusqueda = palabras.every((palabra) => texto.includes(palabra));
      tarjeta.hidden = !(pasaFiltro && pasaBusqueda);
      if (!tarjeta.hidden) visibles++;
    });

    cantidad.textContent = visibles === 1 ? "1 producto" : `${visibles} productos`;
    sinResultados.hidden = visibles > 0;

    // La URL guarda la búsqueda: se puede compartir o volver con el botón Atrás
    const url = new URL(window.location.href);
    estado.filtro === "todo" ? url.searchParams.delete("filtro") : url.searchParams.set("filtro", estado.filtro);
    estado.busqueda ? url.searchParams.set("q", estado.busqueda) : url.searchParams.delete("q");
    history.replaceState(null, "", url);
  }

  campoBusqueda.value = estado.busqueda;
  campoBusqueda.addEventListener("input", () => {
    estado.busqueda = campoBusqueda.value;
    aplicar();
  });

  BD.cargarProductos()
    .then((productos) => {
      crearBotonesFiltro(productos);
      tarjetas = productos.map((p) => {
        const tarjeta = BD.crearTarjeta(p);
        lista.appendChild(tarjeta);
        const filtros = (p.filtros || []).map(normalizar);
        const texto = normalizar([p.nombre, p.categoria, p.resumen, ...(p.filtros || [])].join(" "));
        return { tarjeta, filtros, texto };
      });
      aplicar();
      BD.observarReveal(lista);
    })
    .catch((error) => {
      console.error(error);
      cantidad.textContent = "No pudimos cargar los productos. Probá recargar la página.";
    });
})();
