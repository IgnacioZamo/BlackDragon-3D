#!/usr/bin/env python3
"""
Sincroniza data/productos.json con las imágenes de assets/img/productos/.

- Cada imagen nueva de la carpeta se agrega como producto con datos [PENDIENTE].
- Los productos que ya están no se tocan (nombre, precio, descripción, filtros…).
- Si una ruta del JSON no existe pero hay un archivo con el mismo nombre
  (por ejemplo, falta la extensión o cambian mayúsculas), se corrige.
- Si se borró la imagen de un producto, ese producto se quita del JSON.

Uso:  python scripts/actualizar_productos.py   (lo corre solo iniciar.bat)
"""

import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CARPETA = RAIZ / "assets" / "img" / "productos"
JSON = RAIZ / "data" / "productos.json"
EXTENSIONES = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def ruta_web(archivo):
    return archivo.relative_to(RAIZ).as_posix()


def nombre_legible(archivo):
    """Figura3D-Mago_Oscuro.jpeg -> "Mago Oscuro"; PrettyDerby -> "Pretty Derby"."""
    base = re.sub(r"^figura3d[-_ ]*", "", archivo.stem, flags=re.I)
    base = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", base)
    return re.sub(r"[-_]+", " ", base).strip() or archivo.stem


def crear_id(nombre, usados):
    base = re.sub(r"[^a-z0-9]+", "-", nombre.lower()).strip("-") or "producto"
    nuevo, n = base, 2
    while nuevo in usados:
        nuevo, n = f"{base}-{n}", n + 1
    return nuevo


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    imagenes = sorted(p for p in CARPETA.iterdir() if p.suffix.lower() in EXTENSIONES)
    por_ruta = {ruta_web(p).lower(): p for p in imagenes}
    por_nombre = {}
    for p in imagenes:
        por_nombre.setdefault(p.stem.lower(), p)

    datos = json.loads(JSON.read_text(encoding="utf-8")) if JSON.exists() else {"productos": []}
    productos, usadas, cambios = [], set(), []

    for producto in datos.get("productos", []):
        validas = []
        for imagen in producto.get("imagenes", []):
            src = imagen.get("src", "")
            archivo = por_ruta.get(src.lower()) or por_nombre.get(Path(src).stem.lower())
            if not archivo:
                cambios.append(f"  ! {producto.get('nombre', '?')}: no existe {src}")
                continue
            if ruta_web(archivo) != src:
                cambios.append(f"  ~ {producto.get('nombre', '?')}: ruta corregida a {ruta_web(archivo)}")
                imagen["src"] = ruta_web(archivo)
            usadas.add(archivo)
            validas.append(imagen)

        if validas:
            producto["imagenes"] = validas
            productos.append(producto)
        else:
            cambios.append(f"  - {producto.get('nombre', '?')}: se quitó (no tiene imágenes en la carpeta)")

    ids = {p["id"] for p in productos}
    for archivo in imagenes:
        if archivo in usadas:
            continue
        nombre = nombre_legible(archivo)
        nuevo_id = crear_id(nombre, ids)
        ids.add(nuevo_id)
        productos.append({
            "id": nuevo_id,
            "nombre": nombre,
            "categoria": "[PENDIENTE] Categoría",
            "filtros": ["figuras", nombre.lower()],
            "precio": None,
            "resumen": "[PENDIENTE] Resumen corto de la tarjeta",
            "descripcion": "[PENDIENTE] Descripción del producto.",
            "caracteristicas": [],
            "imagenes": [{"src": ruta_web(archivo), "alt": f"Figura impresa en 3D de {nombre}"}],
        })
        cambios.append(f"  + {nombre}: agregado desde {archivo.name}")

    JSON.write_text(json.dumps({"productos": productos}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Productos: {len(productos)} ({len(imagenes)} imágenes en assets/img/productos/)")
    print("\n".join(cambios) if cambios else "  Sin cambios.")


if __name__ == "__main__":
    main()
