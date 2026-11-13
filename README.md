# Black Dragon 3D

Landing page y ficha de producto para **Black Dragon 3D**, un taller de impresión 3D de figuras de anime, dragones, calabozos modulares y accesorios de rol. Maquetado a partir de los diseños de `Diseño/` (versión de cuerpo claro).

## Estructura

```
BlackDragon/
├── index.html          # Landing: hero, categorías, productos, galería, a medida, beneficios, testimonios, CTA y footer
├── producto.html       # Ficha de producto (se completa según ?id=)
├── css/
│   ├── variables.css   # Paleta, tipografías, espaciados, radios y breakpoints
│   ├── base.css        # Reset, tipografía y componentes reutilizables (botones, chips, eyebrow)
│   └── secciones.css   # Estilos de cada sección y de la ficha de producto
├── js/
│   ├── productos.js    # Número de WhatsApp y datos de los productos (fuente única)
│   ├── producto.js     # Arma la ficha de producto a partir de los datos
│   └── main.js         # Menú móvil, filtros, favoritos, enlaces de WhatsApp y animaciones
├── img/                # Logo, favicon e ilustraciones recortadas del diseño
└── Diseño/             # Láminas de diseño de referencia (fuera del repo)
```

## Tecnologías y stack

HTML, CSS y JavaScript puro, sin dependencias ni build. Es un sitio de dos páginas sin lógica compleja, así que un framework no aporta nada y solo sumaría peso. Las fuentes se cargan desde Google Fonts.

## Paleta

| Nombre    | Variable       | Hex       |
|-----------|----------------|-----------|
| Obsidiana | `--obsidiana`  | `#0C1014` |
| Carbón    | `--carbon`     | `#1A2028` |
| Sangre    | `--sangre`     | `#5A0415` |
| Dragón    | `--dragon`     | `#A40725` |
| Brasa     | `--brasa`      | `#E0243F` |
| Humo      | `--humo`       | `#DADDE3` |
| Niebla    | `--niebla`     | `#EEF0F3` |

Degradados: **Fuego** (`--grad-fuego`: `#E0243F → #A40725 → #5A0415`) y **Niebla** (`--grad-niebla`: `#F4F5F7 → #DADDE3`).

## Tipografías

- **Poppins** 600, 700 y 800: titulares, precios y botones (tracking −2,5 %).
- **Inter** 400, 500 y 600: texto corrido y detalles (base de 16 a 18 px).

## Secciones

1. Header con navegación (menú desplegable en celular).
2. Hero con titular, botones, estadísticas, figura destacada y cinta de categorías.
3. Catálogo: tarjetas de las 4 categorías (filtran las piezas destacadas).
4. Piezas destacadas con filtros (Todo, Dragones, Anime, Calabozos, Rol, Packs), favoritos y pedido por WhatsApp.
5. Galería.
6. Pedidos a medida en 3 pasos.
7. Por qué Black Dragon.
8. Testimonios.
9. CTA a WhatsApp y footer.
10. Ficha de producto (`producto.html?id=dragon-ancestral`, `hechicero-encapuchado`, `torre-del-calabozo`, `espadachina-carmesi`).

Breakpoints mobile-first: 640 px, 960 px y 1200 px.

## Cómo ejecutarlo

Abrir `index.html` en el navegador funciona. Para probarlo como en producción, conviene un servidor local:

```bash
python -m http.server 5173
```

y entrar a <http://localhost:5173>.

## Decisiones respecto del diseño

- El botón **"Agregar al carrito"** de la ficha móvil se reemplazó por **"Pedir por WhatsApp"**, porque por ahora no hay carrito ni pagos. El "+" de cada tarjeta también abre WhatsApp con el producto precargado.
- Los favoritos (corazón) se guardan solo en el navegador del visitante.

## Pendientes

- [ ] **Logo original** (PNG con fondo transparente o SVG). El actual está recortado de la captura del diseño.
- [ ] **Fotos reales** de las piezas. Las imágenes actuales son ilustraciones recortadas de las láminas de diseño.
- [ ] **Número de WhatsApp**: completar `WHATSAPP_NUMERO` en `js/productos.js`. Mientras esté vacío, WhatsApp abre el selector de contactos.
- [ ] Enlaces de **Instagram, Facebook, TikTok y correo** (hoy son `#` en el footer).
- [ ] Páginas de **Envíos y pagos** y **Preguntas frecuentes**.
- [ ] **Descripciones largas** de Hechicero, Torre y Espadachina (hoy usan la línea corta de la tarjeta).
- [ ] Cantidades reales por categoría (24, 38, 16 y 50+ salen del diseño).
- [ ] Imagen Open Graph con URL absoluta cuando haya dominio.
- [ ] Probar en Firefox y en un celular real.
