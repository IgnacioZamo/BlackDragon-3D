/* Ficha de producto: lee ?id= de la URL y completa la página con js/datos.js */
(function () {
  "use strict";

  const ficha = document.getElementById("ficha");
  if (!ficha) return;

  const $ = (id) => document.getElementById(id);
  const id = new URLSearchParams(window.location.search).get("id") || "dragon-ancestral";
  const p = PRODUCTOS[id];

  if (!p) {
    $("no-encontrado").hidden = false;
    document.title = "Pieza no encontrada · Black Dragon 3D";
    return;
  }

  document.title = `${p.nombre} · Black Dragon 3D`;
  document.querySelector('meta[name="description"]').content = `${p.nombre}: ${p.descripcion}`;

  $("miga-actual").textContent = p.nombre;
  $("etiqueta").textContent = p.categoria;
  $("nombre").textContent = p.nombre;
  $("descripcion").textContent = p.descripcion;
  $("precio").textContent = formatearPrecio(p.precio);

  const badge = $("badge");
  badge.textContent = p.badge;
  badge.classList.add(`badge--${p.badgeTipo}`);

  p.chips.forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    $("chips").appendChild(li);
  });

  // Imagen principal y miniaturas para cambiarla
  const principal = $("img-principal");
  const miniaturas = $("miniaturas");

  const mostrar = (img, boton) => {
    principal.src = img.src;
    principal.alt = img.alt;
    miniaturas.querySelectorAll(".miniatura").forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
  };

  p.imagenes.forEach((img, i) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "miniatura";
    boton.setAttribute("aria-pressed", String(i === 0));
    boton.setAttribute("aria-label", `Ver imagen ${i + 1}: ${img.alt}`);
    const miniatura = document.createElement("img");
    miniatura.src = img.src;
    miniatura.alt = "";
    boton.appendChild(miniatura);
    boton.addEventListener("click", () => mostrar(img, boton));
    miniaturas.appendChild(boton);
  });

  principal.src = p.imagenes[0].src;
  principal.alt = p.imagenes[0].alt;

  // El corazón y el botón de compra toman el id; comun.js y boton-favorito.js hacen el resto
  const fav = ficha.querySelector("[data-fav]");
  fav.dataset.fav = id;
  fav.querySelector(".sr-only").textContent = `Guardar ${p.nombre} en favoritos`;
  $("btn-comprar").dataset.whatsappProducto = id;

  ficha.hidden = false;
})();
