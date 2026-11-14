import { html } from "../../core/html.js";

/** Cuadrado rojo con un número, un símbolo o un ícono SVG adentro. Decorativo. */
export const IconoRojo = (contenido) => html`<span class="icono-rojo" aria-hidden="true">${contenido}</span>`;
