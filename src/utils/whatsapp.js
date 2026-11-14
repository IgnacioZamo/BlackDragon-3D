import { WHATSAPP_NUMERO } from "../data/contacto.js";
import { formatearPrecio } from "./formato.js";

/** Arma un enlace de WhatsApp con el mensaje ya escrito. */
export function linkWhatsApp(mensaje = "¡Hola Black Dragon! Quiero pedir un presupuesto.") {
  const texto = encodeURIComponent(mensaje);
  return WHATSAPP_NUMERO
    ? `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}

export const linkWhatsAppProducto = (producto) =>
  linkWhatsApp(`¡Hola Black Dragon! Quiero pedir: ${producto.nombre} (${formatearPrecio(producto.precio)}).`);
