import { html } from "../../core/html.js";

/** Lista de características en píldoras (28 cm, Resina, 0,05 mm…). */
export const ListaChips = (chips) => html`
  <ul class="lista-chips" aria-label="Características">
    ${chips.map((c) => html`<li>${c}</li>`)}
  </ul>`;
