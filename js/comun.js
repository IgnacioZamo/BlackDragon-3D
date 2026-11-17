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

  /* ---------- Categorías del catálogo ----------
     Un producto pertenece a una categoría si alguna de sus "filtros"
     en el JSON coincide con alguna de sus "etiquetas" (sin importar
     tildes ni mayúsculas). El primer filtro de cada producto es la
     carpeta de su foto (assets/img/productos/<carpeta>/), que el script
     scripts/actualizar_productos.py carga solo.
     Ej.: "filtros": ["juegos", "gta", "tommy vercetti"] → Juegos. */
  const CATEGORIAS = [
    { id: "anime-comic", nombre: "Anime y Cómic", etiquetas: ["anime-comic", "anime", "comic", "comics"] },
    { id: "juegos", nombre: "Juegos", etiquetas: ["juegos", "juego", "videojuegos"] },
    { id: "personalizados", nombre: "Personalizados", etiquetas: ["personalizados", "personalizado", "personalizables"] },
    { id: "peliculas", nombre: "Películas", etiquetas: ["peliculas", "pelicula"] },
    { id: "restauraciones", nombre: "Restauraciones", etiquetas: ["restauraciones", "restauracion"] }
  ];

  // Sin tildes ni mayúsculas, para comparar "Cómic" con "comic"
  const normalizar = (texto) =>
    String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();

  const buscarCategoria = (id) => CATEGORIAS.find((c) => c.id === normalizar(id));

  // ¿El producto entra en este filtro? Acepta una categoría (anime, comic…) o cualquier valor de "filtros"
  function perteneceA(producto, filtro) {
    const filtros = (producto.filtros || []).map(normalizar);
    const categoria = buscarCategoria(filtro);
    const buscados = categoria ? categoria.etiquetas : [normalizar(filtro)];
    return filtros.some((f) => buscados.includes(f));
  }

  // Productos cuya foto se muestra entera, sin recortar (las de antes/después de Restauraciones)
  const SECCIONES_FOTO_COMPLETA = ["restauraciones"];
  const esFotoCompleta = (producto) => SECCIONES_FOTO_COMPLETA.some((s) => perteneceA(producto, s));

  // Sin precio en el JSON ("precio": null) se muestra "Consultar precio"
  const tienePrecio = (valor) => typeof valor === "number" && valor > 0;
  const formatearPrecio = (valor) => (tienePrecio(valor) ? "$ " + valor.toLocaleString("es-AR") : "Consultar precio");

  /* ---------- WhatsApp ---------- */
  function linkWhatsApp(mensaje = "¡Hola Black Dragon! Quiero pedir un presupuesto.") {
    const texto = encodeURIComponent(mensaje);
    return WHATSAPP_NUMERO ? `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}` : `https://wa.me/?text=${texto}`;
  }

  const linkWhatsAppProducto = (p) =>
    linkWhatsApp(
      tienePrecio(p.precio)
        ? `¡Hola Black Dragon! Quiero pedir: ${p.nombre} (${formatearPrecio(p.precio)}).`
        : `¡Hola Black Dragon! Quiero consultar por: ${p.nombre}.`
    );

  /* ---------- Tarjeta de producto ---------- */
  // Copia el molde #plantilla-producto (sections/componentes/tarjeta-producto) y lo completa
  function crearTarjeta(p) {
    const molde = document.getElementById("plantilla-producto");
    const tarjeta = molde.content.firstElementChild.cloneNode(true);
    const campo = (nombre) => tarjeta.querySelector(`[data-campo="${nombre}"]`);
    const imagen = (p.imagenes || [])[0] || { src: "", alt: "" };

    tarjeta.dataset.id = p.id;
    // Las fotos de antes/después no se recortan: se muestran enteras (ver tarjeta-producto.css)
    tarjeta.classList.toggle("prod-card--foto-completa", esFotoCompleta(p));
    campo("imagen").src = imagen.src;
    campo("imagen").alt = imagen.alt || p.nombre;

    // La etiqueta ("Más vendido", "Nuevo"...) es opcional
    if (p.etiqueta && p.etiqueta.texto) {
      campo("etiqueta").textContent = p.etiqueta.texto;
      campo("etiqueta").classList.add(`badge--${p.etiqueta.color || "rojo"}`);
    } else {
      campo("etiqueta").remove();
    }

    campo("favorito").dataset.fav = p.id;
    campo("favorito").querySelector(".sr-only").textContent = `Guardar ${p.nombre} en favoritos`;

    campo("categoria").textContent = p.categoria || "";
    campo("nombre").textContent = p.nombre;
    campo("nombre").href = `producto.html?id=${encodeURIComponent(p.id)}`;
    campo("resumen").textContent = p.resumen || "";
    campo("precio").textContent = formatearPrecio(p.precio);
    campo("precio").classList.toggle("precio--consultar", !tienePrecio(p.precio));

    campo("pedir").href = linkWhatsAppProducto(p);
    campo("pedir").querySelector(".sr-only").textContent = `Pedir ${p.nombre} por WhatsApp`;

    marcarFavoritos(tarjeta);
    return tarjeta;
  }

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
    const botones = raiz.matches && raiz.matches("[data-fav]") ? [raiz] : raiz.querySelectorAll("[data-fav]");
    botones.forEach((b) => b.setAttribute("aria-pressed", String(favoritos.has(b.dataset.fav))));
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

  return {
    CATEGORIAS,
    cargarProductos,
    normalizar,
    buscarCategoria,
    perteneceA,
    esFotoCompleta,
    SECCIONES_FOTO_COMPLETA,
    formatearPrecio,
    linkWhatsAppProducto,
    conectarWhatsApp,
    marcarFavoritos,
    observarReveal,
    crearTarjeta
  };
})();
