import { html } from "../../core/html.js";

/** Tarjeta translúcida que flota sobre la figura del hero. */
export const TarjetaFlotante = ({ icono, titulo, texto, posicion }) => html`
  <div class="tarjeta-flotante tarjeta-flotante--${posicion}">
    <span class="tarjeta-flotante__icono" aria-hidden="true">${icono}</span>
    <div>
      <strong>${titulo}</strong>
      <span>${texto}</span>
    </div>
  </div>`;
