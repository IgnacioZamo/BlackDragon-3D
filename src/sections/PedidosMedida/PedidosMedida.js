import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { CabeceraSeccion } from "../../components/CabeceraSeccion/CabeceraSeccion.js";
import { Paso } from "../../components/Paso/Paso.js";
import { VisorModelo } from "../../components/VisorModelo/VisorModelo.js";
import { PEDIDOS_MEDIDA } from "../../data/contenido.js";

/** Pedidos a medida: los tres pasos y la vista previa del modelado. */
export class PedidosMedida extends Seccion {
  render() {
    const { eyebrow, titulo, destacado, bajada, pasos, visor } = PEDIDOS_MEDIDA;

    return html`<section class="seccion medida" id="a-medida" aria-labelledby="titulo-medida">
      <div class="container medida__grid">
        <div>
          ${CabeceraSeccion({ id: "titulo-medida", eyebrow, titulo, destacado })}
          <p class="medida__bajada">${bajada}</p>
          <ol class="medida__pasos">
            ${pasos.map((paso, i) => Paso({ numero: i + 1, ...paso }))}
          </ol>
        </div>
        ${VisorModelo(visor)}
      </div>
    </section>`;
  }
}
