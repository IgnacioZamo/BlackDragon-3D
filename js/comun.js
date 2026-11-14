/* =========================================================
   Funciones compartidas por las secciones (objeto BD):
   productos del JSON, precios, WhatsApp, favoritos y la
   animación de aparición.
   ========================================================= */

// [TEXTO PENDIENTE] Número de WhatsApp con código de país, sin "+" ni espacios.
// Ej.: "5493411234567". Mientras esté vacío, WhatsApp abre el selector de contactos.
const WHATSAPP_NUMERO = "";

const BD = (function () {
  "use strict";

  /* ---------- Productos (data/productos.json) ---------- */
  let pedidoProductos;

  // Se pide una sola vez aunque lo usen varias secciones
  function cargarProductos() {
    pedidoProductos =
      pedidoProductos ||
      fetch("data/productos.json").then((r) => {
        if (!r.ok) throw new Error(`No se pudo cargar data/productos.json (${r.status})`);
        return r.json().then((datos) => datos.productos);
      });
    return pedidoProductos;
  }

  const formatearPrecio = (valor) => "$ " + Number(valor).toLocaleString("es-AR");

  /* ---------- WhatsApp ---------- */
  function linkWhatsApp(mensaje = "¡Hola Black Dragon! Quiero pedir un presupuesto.") {
    const texto = encodeURIComponent(mensaje);
    return WHATSAPP_NUMERO ? `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}` : `https://wa.me/?text=${texto}`;
  }

  const linkWhatsAppProducto = (p) =>
    linkWhatsApp(`¡Hola Black Dragon! Quiero pedir: ${p.nombre} (${formatearPrecio(p.precio)}).`);

  // Completa los botones marcados con data-whatsapp
  function conectarWhatsApp(raiz) {
    raiz.querySelectorAll("[data-whatsapp]").forEach((a) => (a.href = linkWhatsApp()));
  }

  /* ---------- Favoritos (solo en este navegador) ---------- */
  const CLAVE_FAVORITOS = "bd3d-favoritos";

  const favoritos = (function () {
    try {
      return new Set(JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)) || []);
    } catch (e) {
      return new Set();
    }
  })();

  function marcarFavoritos(raiz) {
    raiz.querySelectorAll("[data-fav]").forEach((b) => b.setAttribute("aria-pressed", String(favoritos.has(b.dataset.fav))));
  }

  // Un solo escuchador para todos los corazones, incluso los que se agregan después
  document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-fav]");
    if (!boton) return;
    const id = boton.dataset.fav;
    favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
    boton.setAttribute("aria-pressed", String(favoritos.has(id)));
    try {
      localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify([...favoritos]));
    } catch (err) {
      /* Sin almacenamiento disponible: funciona igual durante la sesión */
    }
  });

  /* ---------- Aparición suave al entrar en pantalla ---------- */
  const observador =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entradas) =>
            entradas.forEach((entrada) => {
              if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
              }
            }),
          { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        )
      : null;

  function observarReveal(raiz) {
    raiz.querySelectorAll(".reveal:not(.visible)").forEach((el) => (observador ? observador.observe(el) : el.classList.add("visible")));
  }

  // Cuando js/incluir.js termina de unir las secciones
  document.addEventListener("secciones-cargadas", () => {
    conectarWhatsApp(document);
    observarReveal(document);
  });

  return { cargarProductos, formatearPrecio, linkWhatsAppProducto, conectarWhatsApp, marcarFavoritos, observarReveal };
})();
