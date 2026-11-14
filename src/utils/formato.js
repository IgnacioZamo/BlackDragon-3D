/** Formatea un precio en pesos con separador de miles argentino: $ 38.900 */
export const formatearPrecio = (valor) => "$ " + valor.toLocaleString("es-AR");
