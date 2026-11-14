import { html } from "../../core/html.js";
import { BotonIcono } from "../Boton/Boton.js";
import { Icono } from "../Icono/Icono.js";
import { esFavorito, alternarFavorito } from "../../utils/favoritos.js";

/** Corazón para guardar un producto en favoritos. */
export const BotonFavorito = ({ id, nombre, clase = "" }) =>
  BotonIcono({
    icono: Icono("corazon"),
    etiqueta: `Guardar ${nombre} en favoritos`,
    clase: `boton-favorito ${clase}`,
    atributos: html`data-fav="${id}" aria-pressed="${esFavorito(id)}"`
  });

/** Conecta todos los corazones que haya dentro de raiz. */
export function montarBotonesFavorito(raiz) {
  raiz.querySelectorAll("[data-fav]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const activo = alternarFavorito(boton.dataset.fav);
      boton.setAttribute("aria-pressed", String(activo));
    });
  });
}
