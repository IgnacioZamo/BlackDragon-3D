import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { CabeceraSeccion } from "../../components/CabeceraSeccion/CabeceraSeccion.js";
import { ItemGaleria } from "../../components/ItemGaleria/ItemGaleria.js";
import { GALERIA } from "../../data/contenido.js";

/** Galería de piezas terminadas: una foto grande y cuatro chicas. */
export class Galeria extends Seccion {
  render() {
    const { eyebrow, titulo, destacado, bajada, items } = GALERIA;

    return html`<section class="seccion galeria" id="galeria" aria-labelledby="titulo-galeria">
      <div class="container">
        ${CabeceraSeccion({ id: "titulo-galeria", eyebrow, titulo, destacado, bajada })}
        <div class="galeria__grid">${items.map(ItemGaleria)}</div>
      </div>
    </section>`;
  }
}
