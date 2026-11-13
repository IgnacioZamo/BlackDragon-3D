/* =========================================================
   Ficha de producto: lee ?id= de la URL y completa la página.
   Corre antes de main.js para que favoritos y WhatsApp
   encuentren los atributos ya cargados.
   ========================================================= */

(function () {
  "use strict";

  const id = new URLSearchParams(window.location.search).get("id") || "dragon-ancestral";
  const p = PRODUCTOS[id];

  if (!p) {
    document.getElementById("no-encontrado").hidden = false;
    document.title = "Pieza no encontrada · Black Dragon 3D";
    return;
  }

  const $ = (sel) => document.getElementById(sel);

  document.title = `${p.nombre} · Black Dragon 3D`;
  document.querySelector('meta[name="description"]').content = `${p.nombre}: ${p.descripcion}`;

  $("miga-actual").textContent = p.nombre;
  $("categoria").textContent = p.categoria;
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

  const mostrarImagen = (img, boton) => {
    principal.src = img.src;
    principal.alt = img.alt;
    miniaturas.querySelectorAll(".miniatura").forEach((b) => b.setAttribute("aria-pressed", "false"));
    boton.setAttribute("aria-pressed", "true");
  };

  p.imagenes.forEach((img, i) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "miniatura";
    boton.setAttribute("aria-pressed", String(i === 0));
    boton.setAttribute("aria-label", `Ver imagen ${i + 1}: ${img.alt}`);
    boton.innerHTML = `<img src="${img.src}" alt="" loading="lazy">`;
    boton.addEventListener("click", () => mostrarImagen(img, boton));
    miniaturas.appendChild(boton);
  });

  principal.src = p.imagenes[0].src;
  principal.alt = p.imagenes[0].alt;

  $("btn-fav").dataset.fav = id;
  $("btn-fav").querySelector(".sr-only").textContent = `Guardar ${p.nombre} en favoritos`;
  $("btn-comprar").dataset.whatsappProducto = id;

  $("ficha").hidden = false;
})();
