import { html } from "../../core/html.js";
import { Header } from "../../sections/Header/Header.js";
import { Hero } from "../../sections/Hero/Hero.js";
import { Categorias } from "../../sections/Categorias/Categorias.js";
import { Productos } from "../../sections/Productos/Productos.js";
import { Galeria } from "../../sections/Galeria/Galeria.js";
import { PedidosMedida } from "../../sections/PedidosMedida/PedidosMedida.js";
import { PorQue } from "../../sections/PorQue/PorQue.js";
import { Testimonios } from "../../sections/Testimonios/Testimonios.js";
import { Cta } from "../../sections/Cta/Cta.js";
import { Footer } from "../../sections/Footer/Footer.js";
import { conectarEnlacesDeFiltro } from "../../utils/eventos.js";
import { activarReveal } from "../../utils/reveal.js";

/** Landing: arma las secciones en el orden del diseño. */
export class PaginaInicio {
  constructor() {
    this.header = new Header({ enInicio: true, contenido: new Hero() });
    // Para reordenar, agregar o quitar secciones alcanza con tocar esta lista
    this.secciones = [
      new Categorias(),
      new Productos(),
      new Galeria(),
      new PedidosMedida(),
      new PorQue(),
      new Testimonios(),
      new Cta()
    ];
    this.footer = new Footer();
  }

  render() {
    return html`
      <a class="skip-link" href="#contenido">Saltar al contenido</a>
      ${this.header.render()}
      <main id="contenido" class="cuerpo">
        ${this.secciones.map((s) => s.render())}
      </main>
      ${this.footer.render()}`;
  }

  montar(raiz) {
    [this.header, ...this.secciones, this.footer].forEach((s) => s.montar(raiz));
    conectarEnlacesDeFiltro(raiz);
    activarReveal(raiz);
  }
}
