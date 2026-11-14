import { html } from "../../core/html.js";

/**
 * Botón con forma de enlace.
 * @param {object} p
 * @param {string} p.texto
 * @param {string} [p.href]
 * @param {"primario"|"oscuro"|"blanco"} [p.variante]
 * @param {boolean} [p.grande]
 * @param {boolean} [p.flecha]   Agrega → al final
 * @param {boolean} [p.externo]  Abre en otra pestaña (WhatsApp)
 * @param {string}  [p.clase]    Clases extra
 */
export function Boton({ texto, href = "#", variante = "primario", grande = false, flecha = false, externo = false, clase = "" }) {
  const clases = ["btn", `btn--${variante}`, grande && "btn--grande", clase].filter(Boolean).join(" ");
  return html`<a class="${clases}" href="${href}"${externo ? html` target="_blank" rel="noopener"` : ""}>${texto}${flecha ? html` <span aria-hidden="true">→</span>` : ""}</a>`;
}

/**
 * Botón redondo que solo muestra un ícono.
 * La etiqueta queda para lectores de pantalla.
 */
export function BotonIcono({ icono, etiqueta, clase = "", atributos = "" }) {
  return html`<button class="btn-icono ${clase}" type="button" ${atributos}>
    <span class="sr-only">${etiqueta}</span>
    ${icono}
  </button>`;
}
