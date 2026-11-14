import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { ChipPunto } from "../../components/ChipPunto/ChipPunto.js";
import { Boton } from "../../components/Boton/Boton.js";
import { TarjetaFlotante } from "../../components/TarjetaFlotante/TarjetaFlotante.js";
import { Cinta } from "../../components/Cinta/Cinta.js";
import { HERO, CINTA } from "../../data/contenido.js";

/** Portada de la landing: titular, botones, estadísticas y figura destacada. */
export class Hero extends Seccion {
  render() {
    const { chip, bajada, stats, imagen, tarjetas } = HERO;

    return html`<div class="hero container">
        <div class="hero__texto">
          ${ChipPunto(chip)}
          <h1 class="hero__titulo">Tu universo <span class="hero__grad">friki, impreso</span> en 3D.</h1>
          <p class="hero__bajada">${bajada}</p>
          <div class="hero__acciones">
            ${Boton({ texto: "Ver catálogo", href: "#catalogo", grande: true, flecha: true })}
            ${Boton({ texto: "Pedí tu figura a medida", href: "#a-medida", variante: "oscuro", grande: true })}
          </div>
          <dl class="hero__stats">
            ${stats.map(
              (s) => html`<div>
                <dt>${s.lectura ? html`<span aria-hidden="true">${s.valor}</span><span class="sr-only">${s.lectura}</span>` : s.valor}</dt>
                <dd>${s.texto}</dd>
              </div>`
            )}
          </dl>
        </div>

        <div class="hero__arte">
          <div class="hero__anillos" aria-hidden="true"></div>
          <img class="hero__img" src="${imagen.src}" alt="${imagen.alt}" width="${imagen.ancho}" height="${imagen.alto}" fetchpriority="high">
          ${tarjetas.map(TarjetaFlotante)}
        </div>
      </div>
      ${Cinta(CINTA)}`;
  }
}
