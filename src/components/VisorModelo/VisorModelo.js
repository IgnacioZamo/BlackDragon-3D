import { html } from "../../core/html.js";

/** Vista previa del modelado 3D con etiquetas de escala, material y entrega. */
export const VisorModelo = ({ imagen, chips }) => html`
  <div class="visor reveal">
    <img src="${imagen.src}" alt="${imagen.alt}" width="${imagen.ancho}" height="${imagen.alto}" loading="lazy">
    ${chips.map(
      (c) => html`<span class="visor__chip visor__chip--${c.posicion}"><span aria-hidden="true">${c.icono}</span> ${c.texto}</span>`
    )}
  </div>`;
