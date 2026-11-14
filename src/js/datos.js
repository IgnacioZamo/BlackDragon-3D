/* =========================================================
   Datos de contacto y productos (los usa la ficha de producto
   y los enlaces de WhatsApp). Un solo lugar para editarlos.
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
      { src: "assets/img/prod-dragon.jpg", alt: "Dragón Ancestral, figura de dragón con alas rojas desplegadas" },
      { src: "assets/img/gal-dragon-cabeza.jpg", alt: "Detalle de la cabeza del Dragón Ancestral" }
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
      { src: "assets/img/prod-hechicero.jpg", alt: "Hechicero Encapuchado, miniatura con capucha roja y báculo luminoso" },
      { src: "assets/img/gal-hechicero.jpg", alt: "Hechicero Encapuchado sobre fondo gris" }
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
      { src: "assets/img/prod-torre.jpg", alt: "Torre del Calabozo, castillo modular blanco con techos rojos" },
      { src: "assets/img/gal-torre.jpg", alt: "Torre modular vista de frente" }
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
      { src: "assets/img/prod-espadachina.jpg", alt: "Espadachina Carmesí, figura anime de pelo rojo con espada" },
      { src: "assets/img/gal-espadachina.jpg", alt: "Espadachina Carmesí sobre fondo rojo" }
    ]
  }
};
