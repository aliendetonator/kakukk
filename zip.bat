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

set /p selection="Selection: "

2>NUL CALL :CASE_%selection%
IF ERRORLEVEL 1 CALL :DEFAULT_CASE

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