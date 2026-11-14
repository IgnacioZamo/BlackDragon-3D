import { html } from "../../core/html.js";

/** Opinión de un cliente con estrellas y avatar con su inicial. */
export const TarjetaTestimonio = ({ cita, nombre, rol }) => html`
  <figure class="testimonio reveal">
    <p class="testimonio__estrellas" aria-label="5 de 5 estrellas">★★★★★</p>
    <blockquote>“${cita}”</blockquote>
    <figcaption>
      <span class="testimonio__avatar" aria-hidden="true">${nombre.charAt(0)}</span>
      <span><strong>${nombre}</strong> ${rol}</span>
    </figcaption>
  </figure>`;
