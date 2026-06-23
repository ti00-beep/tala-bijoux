@echo off
echo.
echo === TALA BIJOUX - Envoi vers GitHub ===
echo.
echo Patientez, une fenetre GitHub va s ouvrir...
echo.
set GIT="C:\Program Files\Git\cmd\git.exe"
%GIT% push -u origin main
echo.
echo Termine !
echo.
pause
