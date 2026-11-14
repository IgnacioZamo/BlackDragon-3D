# Black Dragon 3D

Landing page y ficha de producto para **Black Dragon 3D**, un taller de impresión 3D de figuras de anime, dragones, calabozos modulares y accesorios de rol. Maquetado a partir de los diseños de `Diseño/` (versión de cuerpo claro).

## Estructura

Organizada por módulos, al estilo de React: `index.html` solo monta la clase `App`; `App` elige una **página**; cada página arma sus **secciones**; cada sección usa **componentes**. Cada sección y cada componente vive en su propia carpeta, con su JS y su CSS juntos.

```
BlackDragon/
├── index.html                  # Solo <div id="app"> + src/main.js
├── assets/img/                 # Logo, favicon e ilustraciones recortadas del diseño
├── src/
│   ├── main.js                 # Punto de entrada: new App(#app).iniciar()
│   ├── App.js                  # Elige la página según la URL y la monta
│   ├── core/
│   │   ├── html.js             # Plantillas html`` que escapan el contenido (tipo JSX)
│   │   └── Seccion.js          # Clase base: render() + montar(raiz)
│   ├── pages/
│   │   ├── PaginaInicio/       # Landing
│   │   └── PaginaProducto/     # Ficha: ?producto=<id>
│   ├── sections/               # Un módulo por sección (clase que extiende Seccion)
│   │   ├── Header/  Hero/  Categorias/  Productos/  Galeria/
│   │   ├── PedidosMedida/  PorQue/  Testimonios/  Cta/  Footer/
│   │   └── DetalleProducto/
│   ├── components/             # Piezas reutilizables (funciones que devuelven html``)
│   │   ├── Boton/  Icono/  Marca/  ChipPunto/  CabeceraSeccion/  Badge/  Precio/
│   │   ├── TarjetaCategoria/  TarjetaProducto/  BotonFavorito/  FiltrosCategoria/
│   │   ├── TarjetaFlotante/  Cinta/  ItemGaleria/  Paso/  IconoRojo/  VisorModelo/
│   │   └── Beneficio/  DatoDestacado/  TarjetaTestimonio/  Miniaturas/  ListaChips/
│   ├── data/
│   │   ├── contacto.js         # WhatsApp, redes, correo y horario
│   │   ├── productos.js        # Productos (nombre, precio, imágenes, chips…)
│   │   └── contenido.js        # Textos de cada sección
│   ├── utils/                  # whatsapp, formato de precio, favoritos, eventos, reveal
│   └── styles/
│       ├── variables.css       # Paleta, tipografías, espaciados, radios y breakpoints
│       ├── base.css            # Reset y utilidades globales
│       └── index.css           # Importa todos los CSS (globales → componentes → secciones → páginas)
└── Diseño/                     # Láminas de diseño de referencia (fuera del repo)
```

### Cómo se agrega algo

- **Un componente**: crear `src/components/Nombre/Nombre.js` (exporta una función que devuelve `html```) y `Nombre.css`; sumar el CSS en `src/styles/index.css`.
- **Una sección**: crear `src/sections/Nombre/Nombre.js` con una clase que extiende `Seccion` (`render()` para el marcado y `montar(raiz)` para los eventos), sumar su CSS en `index.css` y agregarla a la lista de la página en `src/pages/PaginaInicio/PaginaInicio.js`.
- **Textos y productos**: se editan en `src/data/`, sin tocar componentes.

## Tecnologías y stack

HTML, CSS y JavaScript puro con **módulos ES nativos**, sin dependencias ni build. Los componentes son funciones que devuelven plantillas `html```, que escapan el contenido; las secciones son clases con `render()` y `montar()`. Así se logra una organización tipo React sin instalar nada. Las fuentes se cargan desde Google Fonts.

Contras de este enfoque, a tener en cuenta:
- **Necesita un servidor** (local o el hosting): los módulos ES no funcionan abriendo `index.html` con doble clic (`file://`).
- **El contenido se dibuja con JavaScript.** Google lo indexa, pero otros buscadores y las vistas previas al compartir el link ven solo el `<head>`. Si el SEO pasa a ser prioridad, el siguiente paso natural es migrar a **Astro**: tiene la misma estructura de componentes y genera HTML estático.
- `index.css` carga cada CSS con `@import`, lo que suma pedidos al servidor. Para producción conviene unificarlos (por ejemplo con Lightning CSS o el build de Astro).

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
10. Ficha de producto (`?producto=dragon-ancestral`, `hechicero-encapuchado`, `torre-del-calabozo`, `espadachina-carmesi`).

Breakpoints mobile-first: 640 px, 960 px y 1200 px.

## Cómo ejecutarlo

Hace falta un servidor local, porque los módulos ES no cargan desde `file://`:

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
- [ ] **Número de WhatsApp**: completar `WHATSAPP_NUMERO` en `src/data/contacto.js`. Mientras esté vacío, WhatsApp abre el selector de contactos.
- [ ] Enlaces de **Instagram, Facebook, TikTok y correo** en `src/data/contacto.js` (hoy son `#`).
- [ ] Páginas de **Envíos y pagos** y **Preguntas frecuentes**.
- [ ] **Descripciones largas** de Hechicero, Torre y Espadachina (hoy usan la línea corta de la tarjeta).
- [ ] Cantidades reales por categoría (24, 38, 16 y 50+ salen del diseño).
- [ ] Imagen Open Graph con URL absoluta cuando haya dominio.
- [ ] Probar en Firefox y en un celular real.
