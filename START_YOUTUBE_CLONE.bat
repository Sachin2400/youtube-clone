@echo off
title YouTube Clone - Starting Dev Server
echo ===================================================
echo           Starting YouTube Clone (Vite)
echo ===================================================
echo.
cd /d "%~dp0"
set PATH=C:\Users\sachi\AppData\Local\nvm\v20.20.2;%PATH%
start http://localhost:3000
npm run dev
pause

