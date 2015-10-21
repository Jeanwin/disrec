@echo off
echo [INFO] Make sure that the system has been installed and configured the FMPP.

if "%FMPP_HOME%" == "" goto end

%FMPP_HOME%/bin/fmpp

echo [INFO] Code generation is completed.

:end
pause