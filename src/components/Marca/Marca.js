import { html } from "../../core/html.js";

/** Logo + nombre de la marca. El logo es decorativo: el nombre ya está en texto. */
export function Marca({ href = "#inicio", grande = false } = {}) {
  const tamano = grande ? 80 : 56;
  return html`<a class="marca" href="${href}" aria-label="Black Dragon 3D, ir al inicio">
    <img class="marca__logo${grande ? " marca__logo--grande" : ""}" src="assets/img/logo.png" alt="" width="${tamano}" height="${tamano}"${grande ? html` loading="lazy"` : ""}>
    <span class="marca__nombre">Black Dragon <span>3D</span></span>
  </a>`;
}
