import { html } from "../../core/html.js";
import { Header } from "../../sections/Header/Header.js";
import { DetalleProducto } from "../../sections/DetalleProducto/DetalleProducto.js";
import { Footer } from "../../sections/Footer/Footer.js";
import { Boton } from "../../components/Boton/Boton.js";
import { buscarProducto } from "../../data/productos.js";
import { linkWhatsApp } from "../../utils/whatsapp.js";

/** Ficha de producto: index.html?producto=<id> */
export class PaginaProducto {
  constructor({ id }) {
    this.producto = buscarProducto(id);
    this.secciones = [
      new Header({ enInicio: false }),
      new DetalleProducto({ producto: this.producto }),
      new Footer({ compacto: true })
    ];
  }

  render() {
    return html`
      <a class="skip-link" href="#contenido">Saltar al contenido</a>
      ${this.secciones.map((s) => s.render())}
      ${Boton({ texto: "WhatsApp", href: linkWhatsApp(), clase: "whatsapp-flotante", externo: true })}`;
  }

  montar(raiz) {
    this.actualizarMetadatos();
    this.secciones.forEach((s) => s.montar(raiz));
  }

  actualizarMetadatos() {
    const p = this.producto;
    document.title = p ? `${p.nombre} · Black Dragon 3D` : "Pieza no encontrada · Black Dragon 3D";
    if (p) document.querySelector('meta[name="description"]').content = `${p.nombre}: ${p.descripcion}`;
  }
}
