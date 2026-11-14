import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { CabeceraSeccion } from "../../components/CabeceraSeccion/CabeceraSeccion.js";
import { TarjetaTestimonio } from "../../components/TarjetaTestimonio/TarjetaTestimonio.js";
import { TESTIMONIOS } from "../../data/contenido.js";

/** Opiniones de clientes. */
export class Testimonios extends Seccion {
  render() {
    const { eyebrow, titulo, destacado, bajada, items } = TESTIMONIOS;

    return html`<section class="seccion testimonios" aria-labelledby="titulo-testimonios">
      <div class="container">
        ${CabeceraSeccion({ id: "titulo-testimonios", eyebrow, titulo, destacado, bajada })}
        <div class="testimonios__grid">${items.map(TarjetaTestimonio)}</div>
      </div>
    </section>`;
  }
}
