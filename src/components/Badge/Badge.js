import { html } from "../../core/html.js";

/** Etiqueta sobre la imagen del producto ("Más vendido", "Nuevo"…). */
export const Badge = ({ texto, tipo }) => html`<span class="badge badge--${tipo}">${texto}</span>`;
