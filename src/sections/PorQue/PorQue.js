import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { CabeceraSeccion } from "../../components/CabeceraSeccion/CabeceraSeccion.js";
import { DatoDestacado } from "../../components/DatoDestacado/DatoDestacado.js";
import { Beneficio } from "../../components/Beneficio/Beneficio.js";
import { POR_QUE } from "../../data/contenido.js";

/** Por qué Black Dragon: el dato de 0,05 mm y cuatro beneficios. */
export class PorQue extends Seccion {
  render() {
    const { eyebrow, titulo, destacado, dato, beneficios } = POR_QUE;

    return html`<section class="seccion porque" aria-labelledby="titulo-porque">
      <div class="container">
        ${CabeceraSeccion({ id: "titulo-porque", eyebrow, titulo, destacado })}
        <div class="porque__grid">
          ${DatoDestacado(dato)}
          ${beneficios.map(Beneficio)}
        </div>
      </div>
    </section>`;
  }
}
