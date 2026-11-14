import { html } from "../../core/html.js";
import { Seccion } from "../../core/Seccion.js";
import { Marca } from "../../components/Marca/Marca.js";
import { Boton, BotonIcono } from "../../components/Boton/Boton.js";
import { Icono } from "../../components/Icono/Icono.js";
import { NAVEGACION } from "../../data/contenido.js";

/**
 * Encabezado con la navegación.
 * props.enInicio  true en la landing; en otras páginas los enlaces vuelven a ella.
 * props.contenido Sección que va dentro del header oscuro (el Hero en la landing).
 */
export class Header extends Seccion {
  render() {
    const { enInicio = true, contenido } = this.props;
    // En la ficha de producto, "./#ancla" vuelve a la landing y baja a la sección
    const base = enInicio ? "" : "./";

    return html`<header class="header${enInicio ? "" : " header--compacto"}"${enInicio ? html` id="inicio"` : ""}>
      <nav class="nav container" aria-label="Principal">
        ${Marca({ href: `${base}#inicio` })}

        <ul class="nav__links" id="menu">
          ${NAVEGACION.map((item) => html`<li><a href="${base}#${item.ancla}">${item.texto}</a></li>`)}
          <li class="nav__cta-movil">${Boton({ texto: "Pedir presupuesto", href: `${base}#contacto` })}</li>
        </ul>

        ${Boton({ texto: "Pedir presupuesto", href: `${base}#contacto`, clase: "nav__cta" })}
        ${BotonIcono({
          icono: Icono("menu"),
          etiqueta: "Abrir menú",
          clase: "nav__toggle",
          atributos: html`aria-expanded="false" aria-controls="menu"`
        })}
      </nav>
      ${contenido ? contenido.render() : ""}
    </header>`;
  }

  montar(raiz) {
    this.props.contenido?.montar(raiz);

    const toggle = raiz.querySelector(".nav__toggle");
    const menu = raiz.querySelector("#menu");
    const etiqueta = toggle.querySelector(".sr-only");

    const abrirOCerrar = (abrir) => {
      menu.classList.toggle("abierto", abrir);
      toggle.setAttribute("aria-expanded", String(abrir));
      etiqueta.textContent = abrir ? "Cerrar menú" : "Abrir menú";
    };

    toggle.addEventListener("click", () => abrirOCerrar(!menu.classList.contains("abierto")));

    // Al elegir una sección el menú se cierra para no tapar el contenido
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) abrirOCerrar(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("abierto")) {
        abrirOCerrar(false);
        toggle.focus();
      }
    });
  }
}
