@echo off
rem Abre la web de Black Dragon 3D en http://localhost:5173
rem Hace falta un servidor porque index.html une los HTML de sections/ con JavaScript,
rem y el navegador no lo permite si se abre el archivo con doble clic.
rem Para cortar el servidor: cerrar esta ventana.

cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo No se encontro Python. Instalalo desde https://www.python.org/downloads/ y volve a intentar.
  pause
  exit /b 1
)

rem Suma al catalogo las fotos nuevas de assets\img\productos y corrige rutas
echo Revisando productos...
python scripts\actualizar_productos.py
echo.

rem Abre el navegador un segundo despues, cuando el servidor ya esta escuchando
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 1; Start-Process 'http://localhost:5173/'"

echo Black Dragon 3D en http://localhost:5173  (cerrar esta ventana para detener)
python -m http.server 5173 --bind 127.0.0.1
