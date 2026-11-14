/* =========================================================
   Funciones compartidas: precios, enlaces de WhatsApp y
   animación de aparición. Las usan varias secciones.
   ========================================================= */

function formatearPrecio(valor) {
  return "$ " + valor.toLocaleString("es-AR");
}

function linkWhatsApp(mensaje) {
  const texto = encodeURIComponent(mensaje);
  return WHATSAPP_NUMERO
    ? `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}

function mensajeProducto(id) {
  const p = PRODUCTOS[id];
  return p
    ? `¡Hola Black Dragon! Quiero pedir: ${p.nombre} (${formatearPrecio(p.precio)}).`
    : "¡Hola Black Dragon! Quiero hacer una consulta.";
}

// Se espera al DOMContentLoaded para que la ficha ya haya cargado sus datos
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    a.href = linkWhatsApp("¡Hola Black Dragon! Quiero pedir un presupuesto.");
  });

  document.querySelectorAll("[data-whatsapp-producto]").forEach((a) => {
    a.href = linkWhatsApp(mensajeProducto(a.dataset.whatsappProducto));
  });

  /* Aparición suave al entrar en pantalla */
  const revelables = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revelables.forEach((el) => el.classList.add("visible"));
    return;
  }

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
});
