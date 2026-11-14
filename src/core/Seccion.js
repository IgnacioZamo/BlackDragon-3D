/* =========================================================
   Clase base de las secciones.
   - render(): devuelve el marcado (html``).
   - montar(raiz): se llama una vez que el marcado está en el
     DOM, para conectar eventos. Equivale a un useEffect.
   ========================================================= */

import { html } from "./html.js";

export class Seccion {
  constructor(props = {}) {
    this.props = props;
  }

  render() {
    return html``;
  }

  // eslint-disable-next-line no-unused-vars
  montar(raiz) {}
}
