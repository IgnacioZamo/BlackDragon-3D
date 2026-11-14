import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { CabeceraSeccion } from "../../components/CabeceraSeccion/CabeceraSeccion.js";
import { Boton } from "../../components/Boton/Boton.js";
import { FiltrosCategoria, marcarFiltroActivo } from "../../components/FiltrosCategoria/FiltrosCategoria.js";
import { TarjetaProducto } from "../../components/TarjetaProducto/TarjetaProducto.js";
import { montarBotonesFavorito } from "../../components/BotonFavorito/BotonFavorito.js";
import { PRODUCTOS } from "../../data/productos.js";
import { FILTROS } from "../../data/contenido.js";
import { escucharFiltro } from "../../utils/eventos.js";

/** Piezas destacadas con filtros por categoría. */
export class Productos extends Seccion {
  render() {
    return html`<section class="seccion productos" id="productos" aria-labelledby="titulo-productos">
      <div class="container">
        ${CabeceraSeccion({
          id: "titulo-productos",
          eyebrow: "Más pedidos",
          titulo: "Piezas",
          destacado: "destacadas",
          enLinea: true,
          accion: Boton({ texto: "Ver todo el catálogo", href: "#catalogo", variante: "blanco", flecha: true })
        })}
        ${FiltrosCategoria(FILTROS)}
        <ul class="productos__grid">${PRODUCTOS.map(TarjetaProducto)}</ul>
        <p class="productos__vacio" hidden>Todavía no hay piezas destacadas en esta categoría.</p>
      </div>
    </section>`;
  }

  montar(raiz) {
    const seccion = raiz.querySelector("#productos");
    const tarjetas = seccion.querySelectorAll(".prod-card");
    const vacio = seccion.querySelector(".productos__vacio");

    const filtrar = (filtro) => {
      let visibles = 0;
      marcarFiltroActivo(seccion, filtro);
      tarjetas.forEach((tarjeta) => {
        const mostrar = filtro === "todo" || tarjeta.dataset.categorias.split(" ").includes(filtro);
        tarjeta.hidden = !mostrar;
        if (mostrar) visibles++;
      });
      vacio.hidden = visibles > 0;
    };

    seccion.querySelectorAll(".filtro").forEach((boton) => {
      boton.addEventListener("click", () => filtrar(boton.dataset.filtro));
    });

    // Las tarjetas de categoría y el footer piden filtrar desde afuera
    escucharFiltro(filtrar);
    montarBotonesFavorito(seccion);
  }
}
