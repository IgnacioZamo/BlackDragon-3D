import { html } from "../../core/html.js";
import { IconoRojo } from "../IconoRojo/IconoRojo.js";

/** Un paso numerado del proceso de pedido a medida. */
export const Paso = ({ numero, titulo, texto }) => html`
  <li class="paso reveal">
    ${IconoRojo(numero)}
    <div>
      <h3>${titulo}</h3>
      <p>${texto}</p>
    </div>
  </li>`;
