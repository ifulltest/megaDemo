rem start the report generating command. %para is the js file that you want to run.
pushd D:\Software\Selenium\Mega-SeleniumJS-Mocha-POM
npx mocha --no-timeouts --bail --reporter mochawesome --require mochawesome/register --reporter-options reportDir=./report/,reportFilename=autotestrpt %1 %2 %3 %4 %5 %6 >.\report\autotestrpt.txt
