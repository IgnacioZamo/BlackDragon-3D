import { html } from "../../core/html.js";
import { Badge } from "../Badge/Badge.js";
import { BotonFavorito } from "../BotonFavorito/BotonFavorito.js";
import { Precio } from "../Precio/Precio.js";
import { linkWhatsAppProducto } from "../../utils/whatsapp.js";

/**
 * Tarjeta de producto. Toda la tarjeta lleva a la ficha; el corazón y
 * el "+" (pedido por WhatsApp) quedan por encima y funcionan aparte.
 */
export function TarjetaProducto(producto) {
  const { id, nombre, etiqueta, categorias, badge, precio, resumen, imagenes } = producto;
  const imagen = imagenes[0];

  return html`<li class="prod-card reveal" data-categorias="${categorias.join(" ")}">
    <div class="prod-card__media">
      <img src="${imagen.src}" alt="${imagen.alt}" width="${imagen.ancho}" height="${imagen.alto}" loading="lazy">
      ${Badge(badge)}
      ${BotonFavorito({ id, nombre, clase: "prod-card__fav" })}
    </div>
    <div class="prod-card__info">
      <p class="prod-card__cat">${etiqueta}</p>
      <h3><a href="?producto=${id}" class="prod-card__link">${nombre}</a></h3>
      <p class="prod-card__desc">${resumen}</p>
      <div class="prod-card__pie">
        ${Precio(precio)}
        <a class="prod-card__mas" href="${linkWhatsAppProducto(producto)}" target="_blank" rel="noopener">
          <span class="sr-only">Pedir ${nombre} por WhatsApp</span>
          <span aria-hidden="true">+</span>
        </a>
      </div>
    </div>
  </li>`;
}
