/* =========================================================
   Interacciones compartidas: menú, WhatsApp, favoritos,
   filtros del catálogo y animaciones de aparición.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");

  if (toggle && menu) {
    const cerrar = () => {
      menu.classList.remove("abierto");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".sr-only").textContent = "Abrir menú";
    };

    toggle.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.querySelector(".sr-only").textContent = abierto ? "Cerrar menú" : "Abrir menú";
    });

    // Al elegir una sección el menú se cierra para no tapar el contenido
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) cerrar();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("abierto")) {
        cerrar();
        toggle.focus();
      }
    });
  }

  /* ---------- Enlaces de WhatsApp ---------- */
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    a.href = linkWhatsApp("¡Hola Black Dragon! Quiero pedir un presupuesto.");
  });

  document.querySelectorAll("[data-whatsapp-producto]").forEach((a) => {
    a.href = linkWhatsApp(mensajeProducto(a.dataset.whatsappProducto));
  });

  /* ---------- Favoritos (se guardan solo en este navegador) ---------- */
  const CLAVE_FAV = "bd3d-favoritos";

  const leerFavoritos = () => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_FAV)) || [];
    } catch (e) {
      return [];
    }
  };

  const guardarFavoritos = (lista) => {
    try {
      localStorage.setItem(CLAVE_FAV, JSON.stringify(lista));
    } catch (e) {
      /* Sin almacenamiento disponible: el corazón funciona igual en la sesión */
    }
  };

  const favoritos = new Set(leerFavoritos());

  document.querySelectorAll("[data-fav]").forEach((btn) => {
    const id = btn.dataset.fav;
    btn.setAttribute("aria-pressed", String(favoritos.has(id)));

    btn.addEventListener("click", () => {
      favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
      btn.setAttribute("aria-pressed", String(favoritos.has(id)));
      guardarFavoritos([...favoritos]);
    });
  });

  /* ---------- Filtros del catálogo ---------- */
  const filtros = document.querySelectorAll(".filtro");
  const tarjetas = document.querySelectorAll(".prod-card");
  const vacio = document.getElementById("productos-vacio");

  const aplicarFiltro = (filtro) => {
    let visibles = 0;

    filtros.forEach((b) => {
      const activo = b.dataset.filtro === filtro;
      b.classList.toggle("activo", activo);
      b.setAttribute("aria-pressed", String(activo));
    });

    tarjetas.forEach((card) => {
      const cats = card.dataset.categorias.split(" ");
      const mostrar = filtro === "todo" || cats.includes(filtro);
      card.hidden = !mostrar;
      if (mostrar) visibles++;
    });

    if (vacio) vacio.hidden = visibles > 0;
  };

  filtros.forEach((b) => {
    b.addEventListener("click", () => aplicarFiltro(b.dataset.filtro));
  });

  // Las tarjetas de categoría y los links del footer filtran antes de bajar
  document.querySelectorAll("[data-filtro-link]").forEach((a) => {
    a.addEventListener("click", () => aplicarFiltro(a.dataset.filtroLink));
  });

  /* ---------- Aparición al hacer scroll ---------- */
  const revelables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observer.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revelables.forEach((el) => observer.observe(el));
  } else {
    revelables.forEach((el) => el.classList.add("visible"));
  }
})();
