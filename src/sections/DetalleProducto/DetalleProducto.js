import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { Badge } from "../../components/Badge/Badge.js";
import { BotonFavorito, montarBotonesFavorito } from "../../components/BotonFavorito/BotonFavorito.js";
import { Miniaturas, montarMiniaturas } from "../../components/Miniaturas/Miniaturas.js";
import { ListaChips } from "../../components/ListaChips/ListaChips.js";
import { Precio } from "../../components/Precio/Precio.js";
import { Boton } from "../../components/Boton/Boton.js";
import { IconoRojo } from "../../components/IconoRojo/IconoRojo.js";
import { linkWhatsAppProducto } from "../../utils/whatsapp.js";

/**
 * Ficha de un producto.
 * props.producto El producto a mostrar, o undefined si el id no existe.
 */
export class DetalleProducto extends Seccion {
  render() {
    const { producto } = this.props;
    return html`<main id="contenido" class="detalle">
      <div class="container">${producto ? this.renderFicha(producto) : this.renderNoEncontrado()}</div>
    </main>`;
  }

  renderFicha(producto) {
    const { id, nombre, etiqueta, badge, precio, descripcion, chips, imagenes } = producto;
    const principal = imagenes[0];

    return html`
      <nav class="detalle__migas" aria-label="Ruta de navegación">
        <a href="./">Inicio</a>
        <span aria-hidden="true">/</span>
        <a href="./#productos">Catálogo</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${nombre}</span>
      </nav>

      <div class="detalle__grid">
        <div class="detalle__media">
          <div class="detalle__img">
            <img src="${principal.src}" alt="${principal.alt}" width="${principal.ancho}" height="${principal.alto}">
            ${Badge(badge)}
          </div>
          ${BotonFavorito({ id, nombre, clase: "detalle__fav" })}
          ${Miniaturas(imagenes)}
        </div>

        <div class="detalle__info">
          <p class="detalle__etiqueta">${etiqueta}</p>
          <h1>${nombre}</h1>
          <p class="detalle__desc">${descripcion}</p>
          ${ListaChips(chips)}

          <div class="detalle__compra">
            ${Precio(precio)}
            ${Boton({ texto: "Pedir por WhatsApp", href: linkWhatsAppProducto(producto), grande: true, externo: true })}
          </div>

          <a class="detalle__medida" href="./#a-medida">
            ${IconoRojo("✦")}
            <span>
              <strong>¿La querés a tu manera?</strong>
              <span>Elegí colores, escala y pose</span>
            </span>
          </a>
        </div>
      </div>`;
  }

  renderNoEncontrado() {
    return html`<div class="detalle__no-encontrado">
      <h1>No encontramos esa pieza</h1>
      <p>Puede que el enlace esté incompleto o que la pieza ya no esté en el catálogo.</p>
      ${Boton({ texto: "Ver piezas destacadas", href: "./#productos" })}
    </div>`;
  }

  montar(raiz) {
    const { producto } = this.props;
    if (!producto) return;

    const seccion = raiz.querySelector(".detalle");
    montarMiniaturas(seccion, producto.imagenes, seccion.querySelector(".detalle__img img"));
    montarBotonesFavorito(seccion);
  }
}
