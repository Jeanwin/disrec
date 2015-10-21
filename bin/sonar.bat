@echo off
echo [INFO] Use sonar-maven-plugin run the project.

cd ..

set MAVEN_OPTS=%MAVEN_OPTS% -XX:MaxPermSize=128m
call mvn sonar:sonar

cd bin
pause