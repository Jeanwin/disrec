@echo off
echo [INFO] Use maven Package the project.

cd ..

set MAVEN_OPTS=%MAVEN_OPTS% -XX:MaxPermSize=128m
call mvn clean package -Dmaven.test.skip=true -o

cd bin
pause