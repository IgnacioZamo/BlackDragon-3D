# Black Dragon 3D

Landing page y ficha de producto para **Black Dragon 3D**, un taller de impresión 3D de figuras de anime, dragones, calabozos modulares y accesorios de rol. Maquetado a partir de los diseños de `Diseño/` (versión de cuerpo claro).

## Estructura

El sitio es HTML estático, CSS y un poco de JS, como siempre, pero **organizado en módulos**: cada sección y cada componente tiene su carpeta con su `.html`, su `.css` y, si lo necesita, su `.js`. El script `build.py` los junta y deja el sitio final en `dist/`.

```
BlackDragon/
├── build.py                       # Arma dist/ a partir de src/
├── assets/
│   ├── img/                       # Logo, favicon e ilustraciones recortadas del diseño
│   └── iconos/                    # Íconos SVG de los beneficios
├── src/
│   ├── paginas/
│   │   ├── index.html             # Landing: <head> + qué secciones van y en qué orden
│   │   └── producto.html          # Ficha de producto (?id=<producto>)
│   ├── secciones/                 # Un módulo por sección de la página
│   │   ├── header/                #   header.html + header.css
│   │   ├── hero/
│   │   ├── categorias/
│   │   ├── productos/             #   productos.html + .css + .js (filtros)
│   │   ├── galeria/
│   │   ├── pedidos-medida/
│   │   ├── por-que/
│   │   ├── testimonios/
│   │   ├── cta/
│   │   ├── footer/
│   │   └── detalle-producto/      #   .html + .css + .js (completa la ficha)
│   ├── componentes/               # Piezas reutilizables que usan las secciones
│   │   ├── navegacion/            #   .html + .css + .js (menú móvil)
│   │   ├── tarjeta-producto/  tarjeta-categoria/  tarjeta-testimonio/  tarjeta-flotante/
│   │   ├── item-galeria/  paso/  beneficio/  marca/  cinta/
│   │   ├── boton-favorito/        #   .html + .css + .js (favoritos)
│   │   └── boton/  badge/  precio/  chip-punto/  icono-rojo/  filtros/  cabecera-seccion/
│   │       visor-modelo/  dato-destacado/  lista-chips/  miniaturas/   (solo .css)
│   ├── estilos/
│   │   ├── variables.css          # Paleta, tipografías, espaciados, radios y breakpoints
│   │   └── base.css               # Reset y utilidades globales
│   └── js/
│       ├── datos.js               # Número de WhatsApp y datos de los productos
│       └── comun.js               # Precios, enlaces de WhatsApp y animación de aparición
├── dist/                          # Sitio armado (no se edita ni se sube a git)
└── Diseño/                        # Láminas de diseño de referencia (fuera del repo)
```

### Cómo se arma

Dentro de los `.html` de `src/` se usan dos directivas en forma de comentario:

```html
<!-- @incluir componentes/paso/paso.html numero="1" titulo="Contanos tu idea" texto="…" -->
<!-- @usar componentes/boton -->
```

- `@incluir` pega ese archivo en ese lugar. Dentro del archivo incluido, `{{numero}}`, `{{titulo}}`, etc. se reemplazan por los valores pasados. Así una tarjeta se escribe una sola vez y se usa varias veces.
- `@usar` no pega nada: avisa que esa parte usa los estilos de un módulo (por ejemplo, los botones).
- Los comentarios `<!--- … -->` (con tres guiones) documentan cada módulo y no se copian al sitio final.

`build.py` arma cada página de `src/paginas/` y junta los CSS y JS de todos los módulos usados en un solo `css/estilos.css` y un solo `js/sitio.js`. Los ordena como si fueran imports: primero lo que un módulo usa y después el módulo, así una sección puede ajustar a sus componentes.

### Cómo se agrega algo

- **Una sección:** crear `src/secciones/nombre/nombre.html` (y `nombre.css`, y `nombre.js` si necesita), y sumarla con `@incluir` en `src/paginas/index.html`.
- **Un componente:** crear `src/componentes/nombre/` con sus archivos e incluirlo desde la sección que lo usa.
- **Reordenar la landing:** mover las líneas `@incluir` en `src/paginas/index.html`.

## Tecnologías y stack

HTML, CSS y JavaScript puro, sin dependencias. El único agregado es `build.py`, un script de Python sin librerías externas (solo hace falta tener Python 3). Junta los módulos en archivos estáticos: el resultado es HTML común, bueno para SEO y para las vistas previas al compartir el link, con un solo CSS y un solo JS. Las fuentes se cargan desde Google Fonts.
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

Para trabajar (arma, sirve en <http://localhost:5173> y vuelve a armar cada vez que se guarda un archivo de `src/` o `assets/`):

```bash
python build.py --servir
```

Para generar el sitio final una sola vez (por ejemplo, antes de subirlo al hosting):

```bash
python build.py
```

Lo que se sube al hosting es el contenido de `dist/`. **No se edita `dist/`**: se edita `src/` y se vuelve a armar.
## Decisiones respecto del diseño

- El botón **"Agregar al carrito"** de la ficha móvil se reemplazó por **"Pedir por WhatsApp"**, porque por ahora no hay carrito ni pagos. El "+" de cada tarjeta también abre WhatsApp con el producto precargado.
- Los favoritos (corazón) se guardan solo en el navegador del visitante.

## Pendientes

- [ ] **Logo original** (PNG con fondo transparente o SVG). El actual está recortado de la captura del diseño.
- [ ] **Fotos reales** de las piezas. Las imágenes actuales son ilustraciones recortadas de las láminas de diseño.
- [ ] **Número de WhatsApp**: completar `WHATSAPP_NUMERO` en `src/js/datos.js`. Mientras esté vacío, WhatsApp abre el selector de contactos.
- [ ] Enlaces de **Instagram, Facebook, TikTok y correo** en `src/secciones/footer/footer.html` (hoy son `#`).
- [ ] Páginas de **Envíos y pagos** y **Preguntas frecuentes**.
- [ ] **Descripciones largas** de Hechicero, Torre y Espadachina (hoy usan la línea corta de la tarjeta).
- [ ] Cantidades reales por categoría (24, 38, 16 y 50+ salen del diseño).
- [ ] Imagen Open Graph con URL absoluta cuando haya dominio.
- [ ] Probar en Firefox y en un celular real.
