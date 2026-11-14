/* =========================================================
   Productos destacados. Textos y precios tomados del diseño;
   las descripciones largas que faltan usan la línea corta de
   la tarjeta hasta que el cliente las envíe.
   ========================================================= */

const IMG = "assets/img";

export const PRODUCTOS = [
  {
    id: "dragon-ancestral",
    nombre: "Dragón Ancestral",
    etiqueta: "Dragones · Resina",
    categorias: ["dragones"],
    badge: { texto: "Más vendido", tipo: "rojo" },
    precio: 38900,
    resumen: "Alas desplegables · 28 cm · Base incluida",
    descripcion: "Alas desplegables y base incluida. Acabado listo para pintar.",
    chips: ["28 cm", "Resina", "0,05 mm"],
    imagenes: [
      { src: `${IMG}/prod-dragon.jpg`, alt: "Dragón Ancestral, figura de dragón con alas rojas desplegadas", ancho: 565, alto: 522 },
      { src: `${IMG}/gal-dragon-cabeza.jpg`, alt: "Detalle de la cabeza del Dragón Ancestral", ancho: 1200, alto: 933 }
    ]
  },
  {
    id: "hechicero-encapuchado",
    nombre: "Hechicero Encapuchado",
    etiqueta: "Rol · Miniatura",
    categorias: ["rol"],
    badge: { texto: "Nuevo", tipo: "blanco" },
    precio: 6500,
    resumen: "Miniatura 32 mm · Lista para pintar",
    descripcion: "Miniatura 32 mm · Lista para pintar.",
    chips: ["32 mm", "Miniatura"],
    imagenes: [
      { src: `${IMG}/prod-hechicero.jpg`, alt: "Hechicero Encapuchado, miniatura con capucha roja y báculo luminoso", ancho: 565, alto: 522 },
      { src: `${IMG}/gal-hechicero.jpg`, alt: "Hechicero Encapuchado sobre fondo gris", ancho: 579, alto: 394 }
    ]
  },
  {
    id: "torre-del-calabozo",
    nombre: "Torre del Calabozo",
    etiqueta: "Calabozos · PLA",
    categorias: ["calabozos", "packs"],
    badge: { texto: "Pack", tipo: "rojo" },
    precio: 24200,
    resumen: "Set modular 12 piezas · Encastre sin pegamento",
    descripcion: "Set modular 12 piezas · Encastre sin pegamento.",
    chips: ["12 piezas", "PLA"],
    imagenes: [
      { src: `${IMG}/prod-torre.jpg`, alt: "Torre del Calabozo, castillo modular blanco con techos rojos", ancho: 568, alto: 526 },
      { src: `${IMG}/gal-torre.jpg`, alt: "Torre modular vista de frente", ancho: 579, alto: 395 }
    ]
  },
  {
    id: "espadachina-carmesi",
    nombre: "Espadachina Carmesí",
    etiqueta: "Anime · Resina",
    categorias: ["anime"],
    badge: { texto: "Personalizable", tipo: "blanco" },
    precio: 31500,
    resumen: "Figura 22 cm · Elegí colores y pose",
    descripcion: "Figura 22 cm · Elegí colores y pose.",
    chips: ["22 cm", "Resina"],
    imagenes: [
      { src: `${IMG}/prod-espadachina.jpg`, alt: "Espadachina Carmesí, figura anime de pelo rojo con espada", ancho: 568, alto: 522 },
      { src: `${IMG}/gal-espadachina.jpg`, alt: "Espadachina Carmesí sobre fondo rojo", ancho: 578, alto: 395 }
    ]
  }
];

export const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === id);
