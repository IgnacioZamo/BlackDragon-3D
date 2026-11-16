# Black Dragon 3D

Landing page y ficha de producto para **Black Dragon 3D**, un taller de impresión 3D de figuras de anime, dragones, calabozos modulares y accesorios de rol. Maquetado a partir de los diseños de `Diseño/` (versión de cuerpo claro).

> **Versión 1.0.0: primera versión para presentar al cliente.** Incluye landing, página Productos con buscador, ficha de producto y catálogo desde `data/productos.json`. Los textos marcados como `[PENDIENTE]` y los datos de contacto se completan con el cliente (ver *Pendientes*).

## Estructura

```
BlackDragon/
├── index.html                  # Página principal: carga sections/principal.html
├── productos.html              # Productos: catálogo completo con buscador
├── producto.html               # Ficha de producto: carga header, producto y footer
├── iniciar.bat                 # Abre la web (y suma las fotos nuevas al JSON)
├── actualizar-productos.bat    # Solo suma las fotos nuevas al JSON
├── scripts/actualizar_productos.py
├── sections/
│   ├── principal.html          # HTML general de la landing: qué secciones van y en qué orden
│   ├── header/                 # header.html + header.css + header.js (menú móvil)
│   ├── hero/                   # hero.html + hero.css (portada y cinta de categorías)
│   ├── catalogo/               # catalogo.html + catalogo.css + catalogo.js (categorías y piezas)
│   ├── galeria/                # galeria.html + galeria.css
│   ├── pedidos/                # pedidos.html + pedidos.css (pedidos a medida)
│   ├── por-que/                # por-que.html + por-que.css (por qué Black Dragon)
│   ├── testimonios/            # testimonios.html + testimonios.css
│   ├── contacto/               # contacto.html + contacto.css (llamado a WhatsApp)
│   ├── footer/                 # footer.html + footer.css
│   ├── productos/              # productos.html + .css + .js (buscador y filtros)
│   ├── producto/               # producto.html + producto.css + producto.js (ficha)
│   └── componentes/tarjeta-producto/  # Molde de tarjeta que usan catálogo y Productos
├── data/
│   └── productos.json          # Productos: nombre, precio, descripción, imágenes…
├── css/
│   ├── variables.css           # Paleta, tipografías, espaciados, radios y breakpoints
│   ├── base.css                # Reset y utilidades globales
│   └── componentes.css         # Piezas que usan varias secciones (botones, etiquetas, precio…)
├── js/
│   ├── incluir.js              # Une los HTML de las secciones
│   └── comun.js                # Productos, precios, WhatsApp, favoritos y animaciones
├── assets/
│   ├── img/                    # Logo, favicon e imágenes de las secciones
│   │   └── productos/          # Imágenes de los productos
│   └── iconos/                 # Íconos SVG
└── Diseño/                     # Láminas de diseño de referencia (fuera del repo)
```

### Cómo se enlazan los HTML

`index.html` tiene el `<head>` y una sola línea que trae el HTML general:

```html
<div data-incluir="sections/principal.html"></div>
```

`sections/principal.html` arma la página con una línea por sección:

```html
<div data-incluir="sections/catalogo/catalogo.html"></div>
<div data-incluir="sections/galeria/galeria.html"></div>
```

Cada HTML de sección enlaza su propio CSS (y su JS, si tiene) al principio y al final del archivo. `js/incluir.js` reemplaza cada `data-incluir` por el contenido de ese archivo cuando se abre la página.

- **Reordenar, agregar o quitar una sección:** mover o borrar su línea en `sections/principal.html`.
- **Sección nueva:** crear `sections/nombre/nombre.html` (y su `.css`) y sumar su línea en `principal.html`.

### Productos (`data/productos.json`)

Cada producto tiene esta forma:

```json
{
  "id": "dragon-ancestral",
  "nombre": "Dragón Ancestral",
  "categoria": "Dragones · Resina",
  "filtros": ["dragones"],
  "etiqueta": { "texto": "Más vendido", "color": "rojo" },
  "precio": 38900,
  "resumen": "Alas desplegables · 28 cm · Base incluida",
  "descripcion": "Alas desplegables y base incluida. Acabado listo para pintar.",
  "caracteristicas": ["28 cm", "Resina", "0,05 mm"],
  "imagenes": [
    { "src": "assets/img/productos/dragon-ancestral-1.jpg", "alt": "Descripción de la foto" }
  ]
}
```

- `id`: identificador sin espacios ni tildes. Se usa en el enlace a la ficha (`producto.html?id=dragon-ancestral`).
- `filtros`: palabras con las que se encuentra el producto. Definen en qué **categoría** aparece (ver abajo) y las usa el buscador (serie, personaje…).
- `etiqueta`: cartel sobre la foto; `color` puede ser `rojo` o `blanco`. Se puede borrar si el producto no lleva.
- `precio`: número sin puntos ni signo; la página lo muestra como `$ 38.900`. Con `null` muestra "Consultar precio".
- `destacado`: `true` para que aparezca en "Piezas destacadas" de la landing (se muestran hasta 4). Todos los productos se ven en `productos.html`.
- `resumen`: línea corta de la tarjeta. `descripcion`: texto de la ficha.
- `imagenes`: la primera es la de la tarjeta; todas se ven en la ficha. Para cambiarlas, poner los archivos en `assets/img/productos/` y actualizar `src`. `alt` describe la foto para quienes no la ven.

Los productos aparecen en el catálogo en el mismo orden que en el JSON. El buscador de `productos.html` busca en nombre, categoría, resumen y todos los `filtros`.

### Categorías del catálogo

Las tarjetas de "Elegí tu universo" y los botones de `productos.html` son cuatro categorías. Un producto entra en una categoría si **alguno** de sus `filtros` es una de estas palabras (sin importar tildes ni mayúsculas):

| Categoría | Palabras en `filtros` |
|-----------|-----------------------|
| Anime | `anime` |
| Cómic | `comic`, `comics` |
| Personalizables | `personalizable`, `personalizables` |
| Creaciones únicas | `creaciones unicas`, `creacion unica` |

Un producto puede estar en varias, por ejemplo `"filtros": ["anime", "personalizables", "goku"]`. Cada tarjeta de categoría arma sola su collage con las fotos de sus productos (los `destacado` primero) y muestra cuántos hay; sin productos dice "Próximamente". Las categorías se cambian en `js/comun.js` (`CATEGORIAS`).

Los productos que no entran en ninguna categoría (hoy Anakin, con `peliculas`, y Rockera, con `originales`) tienen su propio botón en `productos.html`, armado con el primer valor de sus `filtros`.

### Sumar productos nuevos

Copiar la foto en `assets/img/productos/` y abrir `iniciar.bat` (o `actualizar-productos.bat`). El script `scripts/actualizar_productos.py`:

- agrega al JSON un producto por cada foto nueva, con los textos en `[PENDIENTE]` para completar;
- no toca los productos que ya están;
- corrige rutas mal escritas (por ejemplo, sin la extensión `.jpeg`);
- quita del JSON los productos cuya foto se borró.

## Tecnologías y stack

HTML, CSS y JavaScript puro, sin dependencias ni instalación. Un HTML no puede incluir otros por sí solo, así que `js/incluir.js` (un script corto) los une al abrir la página. Las fuentes se cargan desde Google Fonts.

**Necesita un servidor:** el navegador no deja leer otros archivos si se abre `index.html` con doble clic. Cualquier hosting sirve, y para trabajar en la computadora alcanza con el servidor de Python (ver abajo).

Como el contenido se une con JavaScript, Google lo indexa, pero las vistas previas al compartir el link (WhatsApp, redes) muestran solo el título, la descripción y la imagen del `<head>`.

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

1. **Header:** navegación (menú desplegable en celular).
2. **Hero:** titular, botones, estadísticas, figura destacada y cinta de categorías.
3. **Catálogo:** tarjetas de las 4 categorías (filtran las piezas) y piezas destacadas con filtros, favoritos y pedido por WhatsApp.
4. **Galería.**
5. **Pedidos:** pedidos a medida en 3 pasos.
6. **Por qué Black Dragon.**
7. **Testimonios.**
8. **Contacto:** llamado a escribir por WhatsApp.
9. **Footer.**
10. **Ficha de producto** (`producto.html?id=…`).

Breakpoints mobile-first: 640 px, 960 px y 1200 px.

## Cómo ejecutarlo

**Doble clic en `iniciar.bat`**: levanta el servidor y abre <http://localhost:5173> en el navegador. Para detenerlo, se cierra esa ventana. Necesita Python instalado.

**No abrir `index.html` con doble clic**: el navegador bloquea que la página lea los HTML de `sections/` y aparece un aviso.

También se puede levantar a mano desde la carpeta del proyecto:

```bash
python -m http.server 5173
```

Para publicar, se sube la carpeta completa (menos `Diseño/`) al hosting; ahí funciona sin hacer nada.

## Decisiones respecto del diseño

- El botón **"Agregar al carrito"** de la ficha móvil se reemplazó por **"Pedir por WhatsApp"**, porque por ahora no hay carrito ni pagos. El "+" de cada tarjeta también abre WhatsApp con el producto precargado.
- Los favoritos (corazón) se guardan solo en el navegador del visitante.

## Pendientes

- [ ] **Imágenes de los productos**: reemplazar las de `assets/img/productos/` (hoy son ilustraciones recortadas del diseño) y revisar `src` y `alt` en `data/productos.json`.
- [ ] **Precios y descripciones** definitivos en `data/productos.json`. Hechicero, Torre y Espadachina usan la línea corta como descripción.
- [ ] **Logo original** (PNG con fondo transparente o SVG). El actual está recortado de la captura del diseño.
- [ ] **Número de WhatsApp**: completar `WHATSAPP_NUMERO` al principio de `js/comun.js`. Mientras esté vacío, WhatsApp abre el selector de contactos.
- [ ] Enlaces de **Instagram, Facebook, TikTok y correo** en `sections/footer/footer.html` (hoy son `#`).
- [ ] Páginas de **Envíos y pagos** y **Preguntas frecuentes**.
- [ ] Cantidades reales por categoría (24, 38, 16 y 50+ salen del diseño).
- [ ] Imagen Open Graph con URL absoluta cuando haya dominio.
- [ ] Probar en Firefox y en un celular real.
