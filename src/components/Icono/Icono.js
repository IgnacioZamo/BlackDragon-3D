/* Íconos SVG en línea. Usan currentColor para heredar el color del texto. */
import { sinEscapar } from "../../core/html.js";

const TRAZOS = {
  flechaDiagonal: '<path d="M7 17 17 7M8 7h9v9"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  corazon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  cubo: '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
  reloj: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  expandir: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
  camion: '<path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'
};

export function Icono(nombre, grosor = 2) {
  return sinEscapar(
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${grosor}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TRAZOS[nombre]}</svg>`
  );
}
