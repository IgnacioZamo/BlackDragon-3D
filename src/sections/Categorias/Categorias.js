import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { CabeceraSeccion } from "../../components/CabeceraSeccion/CabeceraSeccion.js";
import { TarjetaCategoria } from "../../components/TarjetaCategoria/TarjetaCategoria.js";
import { CATEGORIAS } from "../../data/contenido.js";

/** Catálogo: las cuatro categorías en grilla tipo mosaico. */
export class Categorias extends Seccion {
  render() {
    const { eyebrow, titulo, destacado, bajada, items } = CATEGORIAS;

    return html`<section class="seccion categorias" id="catalogo" aria-labelledby="titulo-categorias">
      <div class="container">
        ${CabeceraSeccion({ id: "titulo-categorias", eyebrow, titulo, destacado, bajada, enLinea: true })}
        <div class="categorias__grid">${items.map(TarjetaCategoria)}</div>
      </div>
    </section>`;
  }
}
