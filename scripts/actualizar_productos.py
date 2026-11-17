#!/usr/bin/env python3
"""
Sincroniza data/productos.json con las imágenes de assets/img/productos/.

Cada subcarpeta es una sección del catálogo:
  anime-comic/  juegos/  peliculas/  personalizados/  restauraciones/

- Cada imagen nueva se agrega como producto de la sección de su carpeta,
  con los textos en [PENDIENTE] para completar.
- Los productos que ya están no se tocan (nombre, precio, descripción, filtros…).
- Si una ruta del JSON no existe pero hay un archivo con el mismo nombre
  (falta la extensión, cambian mayúsculas o se movió de carpeta), se corrige;
  si cambió de carpeta, el producto pasa a esa sección.
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

# Nombre de cada sección para el campo "categoria" de los productos nuevos
NOMBRES_SECCION = {
    "anime-comic": "Anime y Cómic",
    "juegos": "Juegos",
    "peliculas": "Películas",
    "personalizados": "Personalizados",
    "restauraciones": "Restauraciones",
}


def ruta_web(archivo):
    return archivo.relative_to(RAIZ).as_posix()


def seccion_de(archivo):
    """assets/img/productos/juegos/mario.jpeg -> "juegos" (None si está suelta)."""
    if archivo.parent == CARPETA:
        return None
    nombre = archivo.relative_to(CARPETA).parts[0]
    return re.sub(r"[\s_]+", "-", nombre.strip().lower())


def nombre_legible(archivo):
    """mago-oscuro.jpeg -> "Mago oscuro"; Figura3D-PrettyDerby -> "Pretty Derby".
    Las fotos con nombre automático (WhatsApp Image…) quedan [PENDIENTE]."""
    if re.match(r"(whatsapp image|img[-_ ]?\d|image\d|foto)", archivo.stem, flags=re.I):
        return None
    base = re.sub(r"^figura3d[-_ ]*", "", archivo.stem, flags=re.I)
    base = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", base)
    base = re.sub(r"[-_]+", " ", base).strip()
    return base[:1].upper() + base[1:] if base else None


def crear_id(nombre, usados):
    base = re.sub(r"[^a-z0-9]+", "-", nombre.lower()).strip("-") or "producto"
    nuevo, n = base, 2
    while nuevo in usados:
        nuevo, n = f"{base}-{n}", n + 1
    return nuevo


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    imagenes = sorted(p for p in CARPETA.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONES)
    por_ruta = {ruta_web(p).lower(): p for p in imagenes}
    por_nombre = {}
    for p in imagenes:
        por_nombre.setdefault(p.stem.lower(), p)

    datos = json.loads(JSON.read_text(encoding="utf-8")) if JSON.exists() else {"productos": []}
    productos, usadas, cambios = [], set(), []

    for producto in datos.get("productos", []):
        validas = []
        for i, imagen in enumerate(producto.get("imagenes", [])):
            src = imagen.get("src", "")
            archivo = por_ruta.get(src.lower()) or por_nombre.get(Path(src).stem.lower())
            if not archivo:
                cambios.append(f"  ! {producto.get('nombre', '?')}: no existe {src}")
                continue
            if ruta_web(archivo) != src:
                cambios.append(f"  ~ {producto.get('nombre', '?')}: ruta corregida a {ruta_web(archivo)}")
                imagen["src"] = ruta_web(archivo)
                # La foto principal cambió de carpeta: el producto pasa a esa sección
                nueva = seccion_de(archivo)
                filtros = producto.get("filtros", [])
                if i == 0 and nueva and filtros and filtros[0] in NOMBRES_SECCION and filtros[0] != nueva:
                    cambios.append(f"    sección: {filtros[0]} → {nueva}")
                    filtros[0] = nueva
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
        seccion = seccion_de(archivo)
        nombre = nombre_legible(archivo)
        nuevo_id = crear_id(nombre or f"{seccion or 'producto'}-nuevo", ids)
        ids.add(nuevo_id)
        productos.append({
            "id": nuevo_id,
            "nombre": nombre or "[PENDIENTE] Nombre del producto",
            "categoria": NOMBRES_SECCION.get(seccion, "[PENDIENTE] Categoría"),
            "filtros": [f for f in (seccion, (nombre or "").lower()) if f],
            "precio": None,
            "resumen": "[PENDIENTE] Resumen corto de la tarjeta",
            "descripcion": "[PENDIENTE] Descripción del producto.",
            "caracteristicas": [],
            "imagenes": [{"src": ruta_web(archivo), "alt": f"Figura impresa en 3D de {nombre}" if nombre else "[PENDIENTE] Descripción de la foto"}],
        })
        cambios.append(f"  + {nombre or archivo.name}: agregado en {seccion or 'sin sección'}")

    JSON.write_text(json.dumps({"productos": productos}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Productos: {len(productos)} ({len(imagenes)} imágenes en assets/img/productos/)")
    print("\n".join(cambios) if cambios else "  Sin cambios.")


if __name__ == "__main__":
    main()
