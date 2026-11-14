/* =========================================================
   Textos y datos de cada sección, tomados del diseño.
   Separados del marcado para editarlos sin tocar componentes.
   ========================================================= */

const IMG = "assets/img";

export const NAVEGACION = [
  { texto: "Inicio", ancla: "inicio" },
  { texto: "Catálogo", ancla: "catalogo" },
  { texto: "Pedidos a medida", ancla: "a-medida" },
  { texto: "Galería", ancla: "galeria" },
  { texto: "Contacto", ancla: "contacto" }
];

export const HERO = {
  chip: "Impresión 3D de colección",
  bajada:
    "Figuras de anime, dragones épicos y calabozos modulares para tus partidas. Diseño a medida, acabado de coleccionista y envíos a todo el país.",
  stats: [
    { valor: "+1.200", texto: "piezas entregadas" },
    { valor: "0,05 mm", texto: "altura de capa en resina" },
    { valor: "4,9 ★", texto: "valoración de clientes", lectura: "4,9 estrellas" }
  ],
  imagen: {
    src: `${IMG}/dragon-ancestral.jpg`,
    alt: "Figura impresa en 3D del Dragón Ancestral: dragón gris con alas rojas sobre una base de roca",
    ancho: 1200,
    alto: 828
  },
  tarjetas: [
    { icono: "🐉", titulo: "Dragón Ancestral", texto: "Resina · 28 cm", posicion: "arriba" },
    { icono: "✦", titulo: "Detalle 0,05 mm", texto: "Listo para pintar", posicion: "abajo" }
  ]
};

export const CINTA = ["Figuras de anime", "Dragones", "Calabozos", "Rol y accesorios", "Pedidos a medida"];

export const CATEGORIAS = {
  eyebrow: "Catálogo",
  titulo: "Elegí tu",
  destacado: "universo",
  bajada: "Cuatro mundos, cientos de piezas. Todo impreso en nuestro taller y revisado a mano antes de salir.",
  items: [
    { id: "dragones", nombre: "Dragones", cantidad: "24 modelos", texto: "Desde minis de escritorio hasta 40 cm", imagen: { src: `${IMG}/dragon-ancestral.jpg`, ancho: 1200, alto: 828 } },
    { id: "anime", nombre: "Figuras de anime", cantidad: "38 modelos", texto: "Personajes originales y a pedido", imagen: { src: `${IMG}/cat-anime.jpg`, ancho: 505, alto: 762 } },
    { id: "calabozos", nombre: "Calabozos", cantidad: "16 sets", texto: "Modulares, listos para rol", imagen: { src: `${IMG}/cat-calabozos.jpg`, ancho: 448, alto: 266 } },
    { id: "rol", nombre: "Rol y accesorios", cantidad: "50+ ítems", texto: "Dados, soportes, llaveros", imagen: { src: `${IMG}/cat-rol.jpg`, ancho: 448, alto: 272 } }
  ]
};

export const FILTROS = [
  { id: "todo", texto: "Todo" },
  { id: "dragones", texto: "Dragones" },
  { id: "anime", texto: "Anime" },
  { id: "calabozos", texto: "Calabozos" },
  { id: "rol", texto: "Rol" },
  { id: "packs", texto: "Packs" }
];

export const GALERIA = {
  eyebrow: "Galería",
  titulo: "Capa por capa,",
  destacado: "pieza por pieza",
  bajada: "El detalle se ve de cerca. Así quedan nuestras piezas terminadas, listas para exhibir o pintar.",
  items: [
    { src: `${IMG}/gal-dragon-cabeza.jpg`, alt: "Primer plano de la cabeza del Dragón Ancestral con cuernos blancos y ojo rojo", texto: "Detalle de cabeza · Dragón Ancestral", ancho: 1200, alto: 933, grande: true },
    { src: `${IMG}/gal-hechicero.jpg`, alt: "Miniatura de hechicero encapuchado con báculo", texto: "Hechicero · 32 mm", ancho: 579, alto: 394 },
    { src: `${IMG}/gal-d20.jpg`, alt: "Dado de veinte caras gris con el número 20 en rojo", texto: "D20 de colección", ancho: 578, alto: 394 },
    { src: `${IMG}/gal-torre.jpg`, alt: "Torre modular de calabozo con bandera roja", texto: "Torre modular", ancho: 579, alto: 395 },
    { src: `${IMG}/gal-espadachina.jpg`, alt: "Figura de espadachina estilo anime de 22 cm", texto: "Espadachina · 22 cm", ancho: 578, alto: 395 }
  ]
};

export const PEDIDOS_MEDIDA = {
  eyebrow: "Pedidos a medida",
  titulo: "¿Tenés una idea?",
  destacado: "La hacemos realidad.",
  bajada: "Mandanos un boceto, una referencia o tu modelo 3D y recibí un presupuesto sin compromiso en menos de 24 horas.",
  pasos: [
    { titulo: "Contanos tu idea", texto: "Por WhatsApp o formulario: imágenes, medidas y uso." },
    { titulo: "Diseñamos y aprobás", texto: "Modelado 3D con vista previa antes de imprimir." },
    { titulo: "Imprimimos y enviamos", texto: "Acabado, control de calidad y envío embalado." }
  ],
  visor: {
    imagen: { src: `${IMG}/medida-espadachina.jpg`, alt: "Vista previa del modelado 3D de una figura a medida sobre una grilla de escala", ancho: 1100, alto: 854 },
    chips: [
      { icono: "📐", texto: "Escala 1:8", posicion: "izq" },
      { icono: "🎨", texto: "Resina gris + base negra", posicion: "der" },
      { icono: "⏱", texto: "Entrega estimada: 7 días", posicion: "abajo" }
    ]
  }
};

export const POR_QUE = {
  eyebrow: "Por qué Black Dragon",
  titulo: "Detalle de coleccionista,",
  destacado: "hecho con paciencia.",
  dato: { numero: "0,05", unidad: "mm", texto: "Altura de capa en resina: el nivel de detalle que se nota en las manos, las alas y las texturas." },
  beneficios: [
    { icono: "cubo", titulo: "Resina y PLA premium", texto: "Materiales de primera: colores firmes y piezas resistentes." },
    { icono: "reloj", titulo: "Entregas rápidas", texto: "Stock listo para despachar y pedidos a medida en pocos días." },
    { icono: "expandir", titulo: "Pintura a mano", texto: "¿La querés lista? Pintamos tu pieza con acabado profesional." },
    { icono: "camion", titulo: "Envíos a todo el país", texto: "Embalaje reforzado para que llegue perfecta." }
  ]
};

export const TESTIMONIOS = {
  eyebrow: "Clientes",
  titulo: "Lo que dicen",
  destacado: "de nosotros",
  bajada: "Coleccionistas, masters de rol y creadores que ya tienen su pieza en casa.",
  items: [
    { cita: "El dragón llegó impecable y con un nivel de detalle que no esperaba. Quedó increíble en mi estantería.", nombre: "Matías R.", rol: "Coleccionista" },
    { cita: "Armaron el calabozo para mi campaña y mis jugadores quedaron fascinados. Súper recomendables.", nombre: "Lucía G.", rol: "Master de rol" },
    { cita: "Les pasé un boceto y me devolvieron exactamente lo que imaginaba. Atención rápida y muy amable.", nombre: "Sebastián P.", rol: "Pedido a medida" }
  ]
};

export const CTA = {
  titulo: "Dale vida a tu próxima figura.",
  texto: "Escribinos y recibí tu presupuesto en menos de 24 horas.",
  boton: "Escribir por WhatsApp"
};

export const FOOTER = {
  descripcion: "Impresión 3D de figuras, dragones y calabozos para fanáticos del anime, el rol y la cultura friki.",
  catalogo: [
    { texto: "Dragones", filtro: "dragones" },
    { texto: "Figuras de anime", filtro: "anime" },
    { texto: "Calabozos", filtro: "calabozos" },
    { texto: "Rol y accesorios", filtro: "rol" }
  ],
  // [TEXTO PENDIENTE] Páginas de envíos y preguntas frecuentes
  info: [
    { texto: "Pedidos a medida", href: "#a-medida" },
    { texto: "Envíos y pagos", href: "#" },
    { texto: "Preguntas frecuentes", href: "#" },
    { texto: "Contacto", href: "#contacto" }
  ],
  legal: "© 2026 Black Dragon · Todos los derechos reservados"
};
