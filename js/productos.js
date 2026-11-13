/* =========================================================
   Datos de contacto y productos
   Un solo lugar para editar: lo usan la landing y la ficha.
   ========================================================= */

// [TEXTO PENDIENTE] Número de WhatsApp con código de país, sin "+" ni espacios.
// Ej.: "5493411234567". Mientras esté vacío, WhatsApp abre el selector de contactos.
const WHATSAPP_NUMERO = "";

// Textos y precios tomados del diseño. Las descripciones largas que faltan
// usan la línea corta de la tarjeta hasta que el cliente las envíe.
const PRODUCTOS = {
  "dragon-ancestral": {
    nombre: "Dragón Ancestral",
    categoria: "Dragones · Resina",
    badge: "Más vendido",
    badgeTipo: "rojo",
    precio: 38900,
    descripcion: "Alas desplegables y base incluida. Acabado listo para pintar.",
    chips: ["28 cm", "Resina", "0,05 mm"],
    imagenes: [
      { src: "img/prod-dragon.jpg", alt: "Dragón Ancestral, figura de dragón con alas rojas desplegadas" },
      { src: "img/gal-dragon-cabeza.jpg", alt: "Detalle de la cabeza del Dragón Ancestral" }
    ]
  },
  "hechicero-encapuchado": {
    nombre: "Hechicero Encapuchado",
    categoria: "Rol · Miniatura",
    badge: "Nuevo",
    badgeTipo: "blanco",
    precio: 6500,
    descripcion: "Miniatura 32 mm · Lista para pintar.",
    chips: ["32 mm", "Miniatura"],
    imagenes: [
      { src: "img/prod-hechicero.jpg", alt: "Hechicero Encapuchado, miniatura con capucha roja y báculo luminoso" },
      { src: "img/gal-hechicero.jpg", alt: "Hechicero Encapuchado sobre fondo gris" }
    ]
  },
  "torre-del-calabozo": {
    nombre: "Torre del Calabozo",
    categoria: "Calabozos · PLA",
    badge: "Pack",
    badgeTipo: "rojo",
    precio: 24200,
    descripcion: "Set modular 12 piezas · Encastre sin pegamento.",
    chips: ["12 piezas", "PLA"],
    imagenes: [
      { src: "img/prod-torre.jpg", alt: "Torre del Calabozo, castillo modular blanco con techos rojos" },
      { src: "img/gal-torre.jpg", alt: "Torre modular vista de frente" }
    ]
  },
  "espadachina-carmesi": {
    nombre: "Espadachina Carmesí",
    categoria: "Anime · Resina",
    badge: "Personalizable",
    badgeTipo: "blanco",
    precio: 31500,
    descripcion: "Figura 22 cm · Elegí colores y pose.",
    chips: ["22 cm", "Resina"],
    imagenes: [
      { src: "img/prod-espadachina.jpg", alt: "Espadachina Carmesí, figura anime de pelo rojo con espada" },
      { src: "img/gal-espadachina.jpg", alt: "Espadachina Carmesí sobre fondo rojo" }
    ]
  }
};

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
