/* =========================================================
   Une los HTML de las secciones.
   Cada <div data-incluir="ruta.html"> se reemplaza por el
   contenido de ese archivo. Funciona en cadena: index.html
   incluye sections/principal.html, que incluye cada sección.

   Opcional: data-base="index.html" hace que los enlaces "#..."
   de esa parte apunten a la landing (para páginas internas).

   Necesita un servidor (local o el hosting): el navegador no
   deja leer archivos con fetch abriendo el HTML con doble clic.
   ========================================================= */

(function () {
  "use strict";

  async function traer(ruta, base) {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) throw new Error(`No se pudo cargar ${ruta} (${respuesta.status})`);
    const html = await respuesta.text();
    return base ? html.replaceAll('href="#', `href="${base}#`) : html;
  }

  // Reemplaza cada [data-incluir] dentro de raiz, y lo que estos a su vez incluyan
  async function incluir(raiz, baseHeredada) {
    const lugares = [...raiz.querySelectorAll("[data-incluir]")];

    await Promise.all(
      lugares.map(async (lugar) => {
        const base = lugar.dataset.base || baseHeredada;
        const plantilla = document.createElement("template");
        plantilla.innerHTML = await traer(lugar.dataset.incluir, base);
        await incluir(plantilla.content, base);
        lugar.replaceWith(plantilla.content);
      })
    );
  }

  // Los <script> que llegan dentro de un HTML incluido no se ejecutan solos:
  // se vuelven a crear, en el orden de la página, uno después del otro.
  async function ejecutarScripts() {
    for (const viejo of document.querySelectorAll("body script[src]")) {
      const nuevo = document.createElement("script");
      nuevo.src = viejo.getAttribute("src");
      await new Promise((listo) => {
        nuevo.onload = nuevo.onerror = listo;
        viejo.replaceWith(nuevo);
      });
    }
  }

  // Espera a que los CSS de cada sección terminen de cargar, para no mostrar la página sin estilos
  function esperarEstilos() {
    const hojas = [...document.querySelectorAll('link[rel="stylesheet"]')].filter((l) => !l.sheet);
    return Promise.all(
      hojas.map(
        (hoja) =>
          new Promise((listo) => {
            hoja.addEventListener("load", listo, { once: true });
            hoja.addEventListener("error", listo, { once: true });
          })
      )
    );
  }

  // Como las secciones llegan después, el navegador no encuentra el #ancla al abrir: se salta a mano
  function irAlAncla() {
    const destino = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!destino) return;
    const saltar = () => destino.scrollIntoView({ behavior: "instant", block: "start" });
    document.readyState === "complete" ? saltar() : window.addEventListener("load", saltar, { once: true });
  }

  // Abierta con doble clic (file://) el navegador bloquea fetch: se avisa cómo abrirla
  function avisarSinServidor() {
    document.body.innerHTML =
      '<div class="error-carga">' +
      "<h1>Falta abrir la página desde un servidor</h1>" +
      "<p>Esta web une varios archivos HTML, y el navegador no lo permite si se abre con doble clic.</p>" +
      "<p>Abrí <strong>iniciar.bat</strong> (en la carpeta del proyecto) y se va a abrir sola en el navegador.</p>" +
      "</div>";
    document.documentElement.classList.remove("cargando");
  }

  async function iniciar() {
    if (window.location.protocol === "file:") {
      avisarSinServidor();
      return;
    }

    try {
      await incluir(document.body);
      await esperarEstilos();
      await ejecutarScripts();
      document.dispatchEvent(new Event("secciones-cargadas"));
    } catch (error) {
      console.error(error);
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<p class="error-carga">No se pudo cargar la página. Si la abriste con doble clic, abrila desde un servidor (ver README).</p>'
      );
    }
    document.documentElement.classList.remove("cargando");
    irAlAncla();
  }

  iniciar();
})();
