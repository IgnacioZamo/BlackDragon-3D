import { html } from "../../core/html.js";

/**
 * Antetítulo + titular (con la parte final en degradado) + bajada opcional.
 * El titular se corta en dos líneas como en el diseño.
 */
export function CabeceraSeccion({ id, eyebrow, titulo, destacado, bajada, accion, enLinea = false }) {
  const corte = enLinea ? " " : html`<br> `;
  const encabezado = html`
    <p class="eyebrow">${eyebrow}</p>
    <h2 id="${id}">${titulo}${corte}<span class="grad">${destacado}</span></h2>`;

  // Sin bajada ni acción, el titular va solo (por ejemplo "Por qué Black Dragon")
  if (!bajada && !accion) return encabezado;

  return html`<div class="seccion__cabecera">
    <div>${encabezado}</div>
    ${bajada ? html`<p class="seccion__bajada">${bajada}</p>` : ""}
    ${accion || ""}
  </div>`;
}
