import { html } from "../../core/html.js";

/** Foto de la galería con su epígrafe. */
export const ItemGaleria = ({ src, alt, texto, ancho, alto, grande = false }) => html`
  <figure class="gal-item${grande ? " gal-item--grande" : ""} reveal">
    <img src="${src}" alt="${alt}" width="${ancho}" height="${alto}" loading="lazy">
    <figcaption>${texto}</figcaption>
  </figure>`;
