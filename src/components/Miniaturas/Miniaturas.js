import { html } from "../../core/html.js";

/** Miniaturas para cambiar la imagen principal de la ficha. */
export const Miniaturas = (imagenes) => html`
  <div class="miniaturas" role="group" aria-label="Imágenes del producto">
    ${imagenes.map(
      (img, i) => html`<button type="button" class="miniatura" data-indice="${i}" aria-pressed="${i === 0}" aria-label="Ver imagen ${i + 1}: ${img.alt}">
        <img src="${img.src}" alt="" loading="lazy">
      </button>`
    )}
  </div>`;

/** Al elegir una miniatura, cambia la imagen principal (img) por la elegida. */
export function montarMiniaturas(raiz, imagenes, imgPrincipal) {
  const botones = raiz.querySelectorAll(".miniatura");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const img = imagenes[Number(boton.dataset.indice)];
      imgPrincipal.src = img.src;
      imgPrincipal.alt = img.alt;
      botones.forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
    });
  });
}
