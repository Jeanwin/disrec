@echo off
echo [INFO] Use maven cargo-plugin run the project.

cd ..

set MAVEN_OPTS=%MAVEN_OPTS% -XX:MaxPermSize=128m
call mvn clean package cargo:redeploy -Dmaven.test.skip=true -o

cd bin
pause