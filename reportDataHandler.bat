rem switch to the working folder
set MEGAPATH = "D:\Software\Selenium\Mega-SeleniumJS-Mocha-POM"
pushd %MEGAPATH% && ping /n 3 127.0.0.1>nul

rem set the dynamic report name
if %time:~0,2% leq 9 (set h=0%time:~1,1%) else (set h=%time:~0,2%)
set y=%date:~0,4%& set m=%date:~5,2%& set d=%date:~8,2%& set mi=%time:~3,2%& set s=%time:~6,2%& set ms=%time:~9,2% && ping /n 3 127.0.0.1>nul

rem set the report-related storage structure
mkdir .\report\rpt-%y%%m%%d%%h%%mi%%s%
mkdir .\report\rpt-%y%%m%%d%%h%%mi%%s%\assets
mkdir .\megaDemo_github\megaDemo\report\rpt-%y%%m%%d%%h%%mi%%s%
echo |set /p="rpt-%y%%m%%d%%h%%mi%%s%">fn.txt

rem collect report files to the dynamic report folder and move the unnecessary files
@echo off
for /f "tokens=*" %%i in ('dir .\report\assets /b') do (
move ".\report\assets\%%i" ".\report\rpt-%y%%m%%d%%h%%mi%%s%\assets"
)

move .\report\autotestrpt.html .\report\rpt-%y%%m%%d%%h%%mi%%s%\
move .\report\autotestrpt.json .\report\rpt-%y%%m%%d%%h%%mi%%s%\
move .\report\autotestrpt.txt .\report\rpt-%y%%m%%d%%h%%mi%%s%\
if exist .\test\MEGAsyncSetup64.exe del .\test\MEGAsyncSetup64.exe

cd report
@echo off
for %%i in (*.jpg) do move "%%i" .\rpt-%y%%m%%d%%h%%mi%%s%
ping /n 2 127.0.0.1>nul & rmdir /q ..\report\assets
cd ..

rem copy report files to the local Github repository
pushd %MEGAPATH% && ping /n 3 127.0.0.1>nul
xcopy /s /e report\rpt-%y%%m%%d%%h%%mi%%s%\* megaDemo_github\megaDemo\report\rpt-%y%%m%%d%%h%%mi%%s%\
ping /n 2 127.0.0.1>nul



