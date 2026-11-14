import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { Marca } from "../../components/Marca/Marca.js";
import { FOOTER } from "../../data/contenido.js";
import { REDES, CORREO, HORARIO } from "../../data/contacto.js";
import { linkWhatsApp } from "../../utils/whatsapp.js";

/**
 * Pie de página.
 * props.compacto true en páginas internas: solo la línea legal.
 */
export class Footer extends Seccion {
  render() {
    const { descripcion, catalogo, info, legal } = FOOTER;
    const whatsapp = linkWhatsApp();

    if (this.props.compacto) {
      return html`<footer class="footer footer--compacto">
        <div class="container"><p class="footer__legal">${legal}</p></div>
      </footer>`;
    }

    return html`<footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__marca">
            ${Marca({ grande: true })}
            <p>${descripcion}</p>
            <ul class="footer__redes">
              ${REDES.map((r) => html`<li><a href="${r.href}" aria-label="${r.nombre}">${r.sigla}</a></li>`)}
              <li><a href="${whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a></li>
            </ul>
          </div>

          <nav aria-labelledby="footer-catalogo">
            <h2 class="footer__titulo" id="footer-catalogo">Catálogo</h2>
            <ul class="footer__lista">
              ${catalogo.map((c) => html`<li><a href="#productos" data-filtro-link="${c.filtro}">${c.texto}</a></li>`)}
            </ul>
          </nav>

          <nav aria-labelledby="footer-info">
            <h2 class="footer__titulo" id="footer-info">Info</h2>
            <ul class="footer__lista">
              ${info.map((i) => html`<li><a href="${i.href}">${i.texto}</a></li>`)}
            </ul>
          </nav>

          <div>
            <h2 class="footer__titulo">Contacto</h2>
            <ul class="footer__lista">
              <li><a href="${whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="${REDES[0].href}">Instagram</a></li>
              <li><a href="${CORREO}">Correo electrónico</a></li>
              <li>${HORARIO}</li>
            </ul>
          </div>
        </div>

        <p class="footer__legal">${legal}</p>
      </div>
    </footer>`;
  }
}
