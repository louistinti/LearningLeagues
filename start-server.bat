@echo off
cd /d "%~dp0"
echo Starting Learning Leagues server at http://localhost:8000/
echo Close this window to stop the server.
echo.
powershell.exe -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
