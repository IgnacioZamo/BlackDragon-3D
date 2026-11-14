/* Favoritos: se guardan solo en este navegador.
   Escucha a nivel documento para que también funcione en la ficha,
   donde el id del producto se carga después. */
(function () {
  "use strict";

  const CLAVE = "bd3d-favoritos";

  const leer = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(CLAVE)) || []);
    } catch (e) {
      return new Set();
    }
  };

  const guardar = (favoritos) => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify([...favoritos]));
    } catch (e) {
      /* Sin almacenamiento disponible: funciona igual durante la sesión */
    }
  };

  const favoritos = leer();

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-fav]").forEach((boton) => {
      boton.setAttribute("aria-pressed", String(favoritos.has(boton.dataset.fav)));
    });
  });

  document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-fav]");
    if (!boton) return;
    const id = boton.dataset.fav;
    favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
    boton.setAttribute("aria-pressed", String(favoritos.has(id)));
    guardar(favoritos);
  });
})();
