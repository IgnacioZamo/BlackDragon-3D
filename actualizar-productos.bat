@echo off
rem Suma a data\productos.json las fotos nuevas de assets\img\productos
rem (iniciar.bat ya lo hace al abrir la web; este sirve para correrlo solo)
cd /d "%~dp0"
python scripts\actualizar_productos.py
echo.
pause
