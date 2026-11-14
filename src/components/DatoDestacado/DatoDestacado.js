import { html } from "../../core/html.js";

/** Tarjeta roja con un número grande (0,05 mm) y su explicación. */
export const DatoDestacado = ({ numero, unidad, texto }) => html`
  <div class="dato-destacado reveal">
    <p class="dato-destacado__numero">${numero}<span>${unidad}</span></p>
    <p class="dato-destacado__texto">${texto}</p>
  </div>`;
