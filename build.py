#!/usr/bin/env python3
"""
Arma el sitio de Black Dragon 3D.

Junta cada página de src/paginas/ con sus secciones y componentes y deja
el sitio listo en dist/: páginas HTML estáticas, un solo CSS y un solo JS.

Uso:
  python build.py            arma dist/ una vez
  python build.py --servir   arma, sirve en http://localhost:5173 y rearma al guardar

Directivas que se pueden escribir en los .html de src/:
  <!-- @incluir ruta/archivo.html clave="valor" ... -->
      Pega ese archivo en ese lugar. Dentro de él, {{clave}} se reemplaza por "valor".
  <!-- @usar ruta/carpeta -->
      No pega nada: solo suma el CSS y el JS de ese módulo (por ejemplo, botones).
  <!--- texto -->
      Comentario de documentación: queda en src/ pero no se copia a dist/.

El CSS y el JS de cada módulo se ordenan como los imports: primero lo que
un módulo usa y después el módulo. Así una sección puede ajustar a sus componentes.
"""

import re
import shutil
import sys
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
SRC = RAIZ / "src"
DIST = RAIZ / "dist"
ASSETS = RAIZ / "assets"
PUERTO = 5173

# Se cargan antes que cualquier módulo
GLOBALES_CSS = ["estilos/variables.css", "estilos/base.css"]
GLOBALES_JS = ["js/datos.js", "js/comun.js"]

# Cada directiva va sola en su línea; se captura la sangría para respetarla en dist/
DIRECTIVA = re.compile(r"^([ \t]*)<!--\s*@(incluir|usar)\s+(\S+)(.*?)-->[ \t]*\n?", re.S | re.M)
# Comentarios de documentación de los módulos (<!--- ... -->): no llegan a dist/
DOCUMENTACION = re.compile(r"[ \t]*<!---.*?-->\n?", re.S)
ATRIBUTO = re.compile(r'([\w-]+)="([^"]*)"')
VARIABLE = re.compile(r"\{\{\s*([\w-]+)\s*\}\}")
CARPETAS_DE_MODULOS = {"secciones", "componentes"}


class ErrorDeArmado(Exception):
    pass


def relativa(ruta):
    return ruta.relative_to(SRC).as_posix()


def reemplazar_variables(texto, valores, origen):
    def valor(m):
        clave = m.group(1)
        if clave not in valores:
            raise ErrorDeArmado(f"{origen}: falta el valor de {{{{{clave}}}}}")
        return valores[clave]

    return VARIABLE.sub(valor, texto)


def registrar(modulo, modulos):
    if not modulo.is_dir():
        raise ErrorDeArmado(f"no existe el módulo {relativa(modulo)}")
    if modulo not in modulos:
        modulos.append(modulo)


def armar(archivo, valores, modulos, cadena=()):
    """Devuelve el HTML de archivo con todas sus inclusiones resueltas."""
    if archivo in cadena:
        ruta = " → ".join(relativa(a) for a in (*cadena, archivo))
        raise ErrorDeArmado(f"inclusión circular: {ruta}")
    if not archivo.is_file():
        origen = relativa(cadena[-1]) if cadena else "?"
        raise ErrorDeArmado(f"{origen}: no existe {relativa(archivo)}")

    # Primero las variables, así un módulo puede pasarle las suyas a sus hijos
    texto = DOCUMENTACION.sub("", archivo.read_text(encoding="utf-8"))
    texto = reemplazar_variables(texto, valores, relativa(archivo))

    def resolver(m):
        sangria, tipo, ruta, resto = m.groups()
        destino = SRC / ruta
        if tipo == "usar":
            registrar(destino, modulos)
            return ""
        incluido = armar(destino, dict(ATRIBUTO.findall(resto)), modulos, (*cadena, archivo))
        lineas = incluido.strip("\n").split("\n")
        return "".join(f"{sangria}{linea}\n" if linea.strip() else "\n" for linea in lineas)

    html = DIRECTIVA.sub(resolver, texto)

    # El módulo se registra después de sus dependencias (orden de imports)
    if archivo.parent.parent.name in CARPETAS_DE_MODULOS:
        registrar(archivo.parent, modulos)
    return html


def empaquetar(globales, modulos, extension):
    partes = [f"/* Generado por build.py a partir de src/. No editar: editar src/ y volver a armar. */\n"]
    archivos = [SRC / g for g in globales] + [m / f"{m.name}.{extension}" for m in modulos]
    for archivo in archivos:
        if archivo.is_file():
            partes.append(f"\n/* ---------- {relativa(archivo)} ---------- */\n")
            partes.append(archivo.read_text(encoding="utf-8"))
    return "".join(partes)


def construir():
    modulos = []
    paginas = sorted((SRC / "paginas").glob("*.html"))

    salidas = {pagina.name: armar(pagina, {}, modulos) for pagina in paginas}

    (DIST / "css").mkdir(parents=True, exist_ok=True)
    (DIST / "js").mkdir(parents=True, exist_ok=True)
    for nombre, html in salidas.items():
        (DIST / nombre).write_text(html, encoding="utf-8")
    (DIST / "css" / "estilos.css").write_text(empaquetar(GLOBALES_CSS, modulos, "css"), encoding="utf-8")
    (DIST / "js" / "sitio.js").write_text(empaquetar(GLOBALES_JS, modulos, "js"), encoding="utf-8")
    shutil.copytree(ASSETS, DIST / "assets", dirs_exist_ok=True)

    print(f"✔ dist/ armado: {len(salidas)} páginas, {len(modulos)} módulos ({time.strftime('%H:%M:%S')})")


def construir_sin_cortar():
    try:
        construir()
        return True
    except ErrorDeArmado as e:
        print(f"✘ {e}")
        return False


def huella():
    """Fecha de modificación de todo lo que, si cambia, obliga a rearmar."""
    return {p: p.stat().st_mtime for carpeta in (SRC, ASSETS) for p in carpeta.rglob("*") if p.is_file()}


class SinCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Para ver los cambios al recargar, sin copias viejas del navegador
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *args):
        pass


def servir():
    construir_sin_cortar()
    servidor = ThreadingHTTPServer(("127.0.0.1", PUERTO), partial(SinCache, directory=str(DIST)))
    threading.Thread(target=servidor.serve_forever, daemon=True).start()
    print(f"Sirviendo dist/ en http://localhost:{PUERTO}  (Ctrl+C para cortar)")

    anterior = huella()
    try:
        while True:
            time.sleep(0.7)
            actual = huella()
            if actual != anterior:
                anterior = actual
                construir_sin_cortar()
    except KeyboardInterrupt:
        servidor.shutdown()


if __name__ == "__main__":
    # UTF-8 para que la consola de Windows muestre ✔ y tildes; line_buffering
    # para que los mensajes salgan al instante también fuera de una consola
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)
    if "--servir" in sys.argv:
        servir()
    else:
        sys.exit(0 if construir_sin_cortar() else 1)
