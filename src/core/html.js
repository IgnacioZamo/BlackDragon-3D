/* =========================================================
   html``: plantillas seguras, al estilo de JSX.
   Todo lo que se interpola se escapa, salvo que sea otra
   plantilla html`` (o una lista de ellas). Así los
   componentes se pueden anidar sin riesgo de inyectar HTML.
   ========================================================= */

class HTMLSeguro {
  constructor(valor) {
    this.valor = valor;
  }

  toString() {
    return this.valor;
  }
}

const ENTIDADES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ENTIDADES[c]);

function convertir(valor) {
  if (valor === null || valor === undefined || valor === false) return "";
  if (valor instanceof HTMLSeguro) return valor.valor;
  if (Array.isArray(valor)) return valor.map(convertir).join("");
  return escapar(valor);
}

export function html(partes, ...valores) {
  const resultado = partes.reduce(
    (acc, parte, i) => acc + parte + (i < valores.length ? convertir(valores[i]) : ""),
    ""
  );
  return new HTMLSeguro(resultado);
}

/** Solo para marcado propio y confiable (por ejemplo, los SVG de Icono). */
export const sinEscapar = (marcado) => new HTMLSeguro(marcado);
