/* =========================================================
   Eventos entre secciones. Las secciones no se conocen entre
   sí: las tarjetas de categoría y el footer avisan que hay que
   filtrar, y la sección de productos escucha.
   ========================================================= */

export const EVENTO_FILTRAR = "bd:filtrar-productos";

export const pedirFiltro = (categoria) =>
  document.dispatchEvent(new CustomEvent(EVENTO_FILTRAR, { detail: { categoria } }));

export const escucharFiltro = (callback) =>
  document.addEventListener(EVENTO_FILTRAR, (e) => callback(e.detail.categoria));

/** Conecta todos los enlaces con data-filtro-link dentro de raiz. */
export function conectarEnlacesDeFiltro(raiz) {
  raiz.querySelectorAll("[data-filtro-link]").forEach((enlace) => {
    enlace.addEventListener("click", () => pedirFiltro(enlace.dataset.filtroLink));
  });
}
