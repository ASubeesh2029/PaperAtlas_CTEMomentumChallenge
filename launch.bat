@echo off
:: ============================================================
::  Paper Atlas — Desktop Launcher
::  Opens the app in a real app window (no browser chrome)
:: ============================================================
set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set "APP_DIR=%~dp0"
set "INDEX=%APP_DIR%index.html"

if not exist "%EDGE%" (
    echo Edge browser not found. Please install Microsoft Edge.
    pause
    exit /b 1
)

:: Launch in App mode — native window, no address bar, no tabs
start "" "%EDGE%" --app="file:///%INDEX:\=/%"  ^
    --window-size=1440,900 ^
    --window-position=40,40 ^
    --no-first-run ^
    --disable-default-apps ^
    --disable-extensions ^
    --disable-background-networking
