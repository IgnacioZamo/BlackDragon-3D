/* Productos: muestra todo data/productos.json con buscador y filtros.
   - Botones de filtro: primero las 4 categorías del catálogo (BD.CATEGORIAS en js/comun.js),
     siempre, aunque todavía no tengan productos. Después, los grupos del JSON que no entran
     en ninguna categoría (primer valor de "filtros", por ejemplo "peliculas").
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

  // Nombre lindo para los grupos extra; si no está acá se muestra con mayúscula inicial
  const ETIQUETAS = { peliculas: "Películas", originales: "Originales" };
  const etiquetaFiltro = (f) => ETIQUETAS[f] || f.charAt(0).toUpperCase() + f.slice(1);

  const { normalizar } = BD;

  const parametros = new URLSearchParams(window.location.search);
  const estado = { filtro: normalizar(parametros.get("filtro")) || "todo", busqueda: parametros.get("q") || "" };
  // ?filtro=comics (o cualquier etiqueta de una categoría) activa el botón de esa categoría
  const categoriaPorEtiqueta = BD.CATEGORIAS.find((c) => c.etiquetas.includes(estado.filtro));
  if (categoriaPorEtiqueta) estado.filtro = categoriaPorEtiqueta.id;

  const mensajeVacio = sinResultados.querySelector(".catalogo-completo__mensaje");
  let tarjetas = [];

  function agregarBoton(filtro, texto) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filtro";
    boton.dataset.filtro = filtro;
    boton.textContent = texto;
    contenedorFiltros.appendChild(boton);
  }

  function crearBotonesFiltro(productos) {
    BD.CATEGORIAS.forEach((c) => agregarBoton(c.id, c.nombre));

    // Grupos que no son una categoría, para que ningún producto quede sin botón
    const extras = productos
      .filter((p) => !BD.CATEGORIAS.some((c) => BD.perteneceA(p, c.id)))
      .map((p) => normalizar((p.filtros || [])[0]))
      .filter(Boolean);
    [...new Set(extras)].forEach((filtro) => agregarBoton(filtro, etiquetaFiltro(filtro)));

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

    tarjetas.forEach(({ tarjeta, producto, texto }) => {
      const pasaFiltro = estado.filtro === "todo" || BD.perteneceA(producto, estado.filtro);
      const pasaBusqueda = palabras.every((palabra) => texto.includes(palabra));
      tarjeta.hidden = !(pasaFiltro && pasaBusqueda);
      if (!tarjeta.hidden) visibles++;
    });

    cantidad.textContent = visibles === 1 ? "1 producto" : `${visibles} productos`;

    // Categoría todavía vacía (sin búsqueda escrita): se avisa que vienen productos
    const categoria = BD.buscarCategoria(estado.filtro);
    mensajeVacio.textContent =
      categoria && !palabras.length
        ? `Todavía no hay productos en ${categoria.nombre}. ¡Próximamente!`
        : "No encontramos productos con esa búsqueda.";
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
        const texto = normalizar([p.nombre, p.categoria, p.resumen, ...(p.filtros || [])].join(" "));
        return { tarjeta, producto: p, texto };
      });
      aplicar();
      BD.observarReveal(lista);
    })
    .catch((error) => {
      console.error(error);
      cantidad.textContent = "No pudimos cargar los productos. Probá recargar la página.";
    });
})();
