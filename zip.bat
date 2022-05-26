:start

@echo off
cls

echo Zipping project
echo ----------------
echo (1) Frontend
echo (2) Backend
echo (3) Full Project
echo (4) Exit
echo ----------------
echo.

echo Selection: 
choice /c 1234 /n
if %errorlevel%==1 goto CASE_1
if %errorlevel%==2 goto CASE_2
if %errorlevel%==3 goto CASE_3
if %errorlevel%==4 goto CASE_4
goto DEFAULT_CASE


:CASE_1
    echo Zipping frontend...
    git archive --format zip --output frontend.zip HEAD:frontend
    GOTO END_CASE
:CASE_2
    echo Zipping backend...
    git archive --format zip --output backend.zip HEAD:backend
    GOTO END_CASE
:CASE_3
    echo Zipping full project...
    git archive --format zip --output full.zip HEAD
    GOTO END_CASE
:CASE_4
    echo Exiting
    exit
:DEFAULT_CASE
    echo Invalid selection
    pause
    GOTO start
:END_CASE
    echo Done!
    pause
    GOTO start