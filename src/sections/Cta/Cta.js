import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { Boton } from "../../components/Boton/Boton.js";
import { CTA } from "../../data/contenido.js";
import { linkWhatsApp } from "../../utils/whatsapp.js";

/** Llamado final a escribir por WhatsApp. */
export class Cta extends Seccion {
  render() {
    const { titulo, texto, boton } = CTA;

    return html`<section class="cta" id="contacto" aria-labelledby="titulo-cta">
      <div class="container">
        <div class="cta__caja">
          <div>
            <h2 id="titulo-cta">${titulo}</h2>
            <p>${texto}</p>
          </div>
          ${Boton({ texto: boton, href: linkWhatsApp(), variante: "blanco", grande: true, flecha: true, externo: true })}
        </div>
      </div>
    </section>`;
  }
}
