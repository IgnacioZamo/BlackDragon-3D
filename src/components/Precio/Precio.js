import { html } from "../../core/html.js";
import { formatearPrecio } from "../../utils/formato.js";

export const Precio = (valor) => html`<p class="precio">${formatearPrecio(valor)}</p>`;
