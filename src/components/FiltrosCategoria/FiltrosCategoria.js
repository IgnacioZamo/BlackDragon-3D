import { html } from "../../core/html.js";

/** Grupo de botones para filtrar por categoría. */
export const FiltrosCategoria = (filtros, activo = "todo") => html`
  <div class="filtros" role="group" aria-label="Filtrar piezas por categoría">
    ${filtros.map(
      (f) => html`<button class="filtro${f.id === activo ? " activo" : ""}" type="button" data-filtro="${f.id}" aria-pressed="${f.id === activo}">${f.texto}</button>`
    )}
  </div>`;

/** Marca como activo el botón del filtro elegido. */
export function marcarFiltroActivo(raiz, filtro) {
  raiz.querySelectorAll(".filtro").forEach((boton) => {
    const activo = boton.dataset.filtro === filtro;
    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
  });
}
