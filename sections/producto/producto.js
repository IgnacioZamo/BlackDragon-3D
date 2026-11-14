/* Ficha de producto: busca el ?id= de la URL en data/productos.json y completa la página */
(function () {
  "use strict";

  const ficha = document.getElementById("ficha");
  if (!ficha) return;

  const $ = (id) => document.getElementById(id);
  const id = new URLSearchParams(window.location.search).get("id");

  function noEncontrado() {
    $("no-encontrado").hidden = false;
    document.title = "Pieza no encontrada · Black Dragon 3D";
  }

  function mostrar(p) {
    document.title = `${p.nombre} · Black Dragon 3D`;
    document.querySelector('meta[name="description"]').content = `${p.nombre}: ${p.descripcion}`;

    $("miga-actual").textContent = p.nombre;
    $("categoria").textContent = p.categoria;
    $("nombre").textContent = p.nombre;
    $("descripcion").textContent = p.descripcion;
    $("precio").textContent = BD.formatearPrecio(p.precio);

    if (p.etiqueta) {
      $("etiqueta").textContent = p.etiqueta.texto;
      $("etiqueta").classList.add(`badge--${p.etiqueta.color}`);
    } else {
      $("etiqueta").remove();
    }

    p.caracteristicas.forEach((texto) => {
      const li = document.createElement("li");
      li.textContent = texto;
      $("caracteristicas").appendChild(li);
    });

    // Imagen principal y miniaturas para cambiarla
    const principal = $("img-principal");
    const miniaturas = $("miniaturas");

    const elegir = (img, boton) => {
      principal.src = img.src;
      principal.alt = img.alt;
      miniaturas.querySelectorAll(".miniatura").forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
    };

    p.imagenes.forEach((img, i) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "miniatura";
      boton.setAttribute("aria-label", `Ver imagen ${i + 1}: ${img.alt}`);
      const miniatura = document.createElement("img");
      miniatura.src = img.src;
      miniatura.alt = "";
      boton.appendChild(miniatura);
      boton.addEventListener("click", () => elegir(img, boton));
      miniaturas.appendChild(boton);
      if (i === 0) elegir(img, boton);
    });

    const favorito = $("favorito");
    favorito.dataset.fav = p.id;
    favorito.querySelector(".sr-only").textContent = `Guardar ${p.nombre} en favoritos`;
    BD.marcarFavoritos(ficha);

    $("btn-comprar").href = BD.linkWhatsAppProducto(p);
    ficha.hidden = false;
  }

  BD.cargarProductos()
    .then((productos) => {
      const p = productos.find((producto) => producto.id === id);
      p ? mostrar(p) : noEncontrado();
    })
    .catch((error) => {
      console.error(error);
      noEncontrado();
    });
})();
