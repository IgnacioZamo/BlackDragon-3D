import { html } from "../../core/html.js";

/**
 * Cinta de palabras en movimiento. Es decorativa (aria-hidden):
 * el contenido real está en el catálogo. La lista se repite dos
 * veces para que el bucle de la animación no tenga cortes.
 */
export function Cinta(palabras) {
  const tramo = palabras.map((p) => html`<span>${p}</span><i>✦</i>`);
  return html`<div class="cinta" aria-hidden="true">
    <div class="cinta__pista">${tramo}${tramo}</div>
  </div>`;
}
