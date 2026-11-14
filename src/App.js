/* =========================================================
   App: elige la página según la URL, la dibuja y la monta.
   - index.html                     → PaginaInicio
   - index.html?producto=<id>       → PaginaProducto
   ========================================================= */

import { PaginaInicio } from "./pages/PaginaInicio/PaginaInicio.js";
import { PaginaProducto } from "./pages/PaginaProducto/PaginaProducto.js";

export class App {
  constructor(raiz) {
    this.raiz = raiz;
  }

  elegirPagina() {
    const idProducto = new URLSearchParams(window.location.search).get("producto");
    return idProducto ? new PaginaProducto({ id: idProducto }) : new PaginaInicio();
  }

  iniciar() {
    const pagina = this.elegirPagina();
    this.raiz.innerHTML = pagina.render().toString();
    pagina.montar(this.raiz);
    this.irAlAncla();
  }

  // El contenido se dibuja con JS, así que el navegador no encuentra el #ancla
  // al cargar: hay que hacer el salto a mano después de montar.
  irAlAncla() {
    const { hash } = window.location;
    if (!hash) return;
    const destino = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!destino) return;

    // Se espera al "load": antes de eso el navegador puede volver el scroll a 0.
    // Salto instantáneo, porque el scroll suave también se interrumpe al cargar.
    const saltar = () => destino.scrollIntoView({ behavior: "instant", block: "start" });
    if (document.readyState === "complete") saltar();
    else window.addEventListener("load", saltar, { once: true });
  }
}
