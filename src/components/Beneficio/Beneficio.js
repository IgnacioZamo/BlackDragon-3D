import { html } from "../../core/html.js";
import { IconoRojo } from "../IconoRojo/IconoRojo.js";
import { Icono } from "../Icono/Icono.js";

/** Tarjeta blanca con ícono, título y texto. */
export const Beneficio = ({ icono, titulo, texto }) => html`
  <article class="beneficio reveal">
    ${IconoRojo(Icono(icono, 1.8))}
    <h3>${titulo}</h3>
    <p>${texto}</p>
  </article>`;
