/* Favoritos guardados solo en este navegador. Si el almacenamiento
   no está disponible (modo privado, bloqueado), funcionan en la sesión. */

const CLAVE = "bd3d-favoritos";

function leer() {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE)) || []);
  } catch (e) {
    return new Set();
  }
}

const favoritos = leer();

export const esFavorito = (id) => favoritos.has(id);

export function alternarFavorito(id) {
  favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...favoritos]));
  } catch (e) {
    /* Sin almacenamiento: queda en memoria */
  }
  return favoritos.has(id);
}
