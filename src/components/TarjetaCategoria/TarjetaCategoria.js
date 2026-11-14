import { html } from "../../core/html.js";
import { Icono } from "../Icono/Icono.js";

/**
 * Tarjeta de categoría del catálogo. Al hacer clic baja a las piezas
 * destacadas y pide filtrar por su categoría (data-filtro-link).
 */
export const TarjetaCategoria = ({ id, nombre, cantidad, texto, imagen }) => html`
  <a class="cat-card cat-card--${id} reveal" href="#productos" data-filtro-link="${id}">
    <img src="${imagen.src}" alt="" width="${imagen.ancho}" height="${imagen.alto}" loading="lazy">
    <span class="cat-card__cant">${cantidad}</span>
    <span class="cat-card__flecha" aria-hidden="true">${Icono("flechaDiagonal")}</span>
    <span class="cat-card__info">
      <strong>${nombre}</strong>
      <span>${texto}</span>
    </span>
  </a>`;
