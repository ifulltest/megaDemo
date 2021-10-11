// variables declaration
var webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require ('selenium-webdriver');

chrome = require('selenium-webdriver/chrome');
var service = new chrome.ServiceBuilder('.\\utils\\chromedriver.exe').build();
chrome.setDefaultService(service);
o = new chrome.Options();
o.excludeSwitches("enable-logging");

var path = require('path');

const headStatus = 'head'; //screenshot switch, '' ~ screenshot is enable, 'headless' ~ screenshot is disaable
// min = 56000;max = 65500;
// let nextPort = parseInt(Math.random()*(max-min+1)+min,10);
// o.addArguments("--remote-debugging-port=" + nextPort);
o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
o.addArguments(headStatus);//headless, head
o.addArguments('disable-popup-blocking');//not work
o.addArguments('--safebrowsing-disable-download-protection');//not work
o.addArguments('--ignore-certificate-errors-spki-list'); //ignore the error: handshake failed; returned -1, SSL error code 1, net_error -107
o.setUserPreferences({"download.default_directory": path.resolve(__dirname, '..\\test')
,"safebrowsing.enabled": true
//not worked setUserPreferences
,"download.prompt_for_download": false
,"download.restrictions": "0"
,"platform_settings.danger_level": "not_dangerous"
,"credentials_enable_service": false
// // ,"strictFileInteractability": "accept"
});
// o.setPageLoadStrategy("normal");//normal, eager
// o.add_experimental_option({"download_restrictions": 0});//not a function
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();

// var capabilities = webdriver.Capabilities.chrome();
// capabilities.set('chromeOptions',{'args': ['--headless', '--disable-gpu']});
// var driver = new webdriver.Builder().withCapabilities(capabilities).build();

driver.manage().setTimeouts({implicit: (10000)});

const screenshot = require('screenshot-desktop');

const addContext = require('mochawesome/addContext');

class BasePage{
    constructor(){
        global.driver = driver;
    }
    
    gotoUrl(theURL){

        driver.get(theURL);
    }

    async getcurrentUrl(){
        return await driver.getCurrentUrl().then(result => result);
    }    

    quit(){
        driver.quit();
    }

    async clearById(id){
        await driver.wait(until.elementLocated(By.id(id))).clear();
    }

    async clickById(id){
        await driver.wait(until.elementLocated(By.id(id))).click();
    }

    async sendKeysById(id, key){
        await driver.wait(until.elementLocated(By.id(id))).sendKeys(key);
    }

    async clearByCss(css){
        await driver.wait(until.elementLocated(By.css(css))).clear();
    }

    async clickByCss(css){
        await driver.wait(until.elementLocated(By.css(css))).click();
    }

    async getTextclickByCss(css){
        return await driver.wait(until.elementLocated(By.css(css))).then(el => el.getText().then(x=>x));
    }

    async findByCss(css){
        await driver.wait(until.elementLocated(By.css(css)));
    }

    async textFindByCss(css){
        return await driver.wait(until.elementLocated(By.css(css))).then(result => result);
    }

    async sendKeysByCss(css, key){
        await driver.wait(until.elementLocated(By.css(css))).sendKeys(key);
    }

    async clearByXpath(xpath){
        await driver.wait(until.elementLocated(By.xpath(xpath))).clear();
    }

    async clickByXpath(xpath){
        await driver.wait(until.elementLocated(By.xpath(xpath))).click();
    }

    async sendKeysByXpath(xpath, key){
        await driver.wait(until.elementLocated(By.xpath(xpath))).sendKeys(key);
    }

    async actionsByContextClick(ele){
        await driver.actions().contextClick(await driver.wait(until.elementLocated(By.css(ele)))).perform();
    }

    async executeJS(js, css1l, css1r, css2){
        await driver.executeScript(js).then(async function(return_value) {
            // console.log("return_value: "+return_value);

            // element.click();
            await driver.wait(until.elementLocated(By.css(css1l+return_value+css1r))).click();

            // right click file name text box
            await driver.actions().contextClick(driver.wait(until.elementLocated(By.css(css1l+return_value+css1r)))).perform();
            
            // click open or rename
            await driver.wait(until.elementLocated(By.css(css2))).click();
        });
    }

    async executeJSWithSingleCss(js){
        return await driver.executeScript(js).then(result => result);   
    }

    async switchToActiveElement(){
        await driver.switchTo().activeElement();
    }

    async actionsClick(){
        await driver.actions().click().perform();
    }

    async actionsSendKeys(key){
        await driver.actions().sendKeys(Key.chord(key)).perform();
    }

    sleep(seconds){
        var e = new Date().getTime() + (seconds * 1000);
        while (new Date().getTime() <= e) {}
    }

    screenShot(desTitle, contextOrd, contextTitle, itOrd, itTitle, pointer){
        // const addObj = desTitle+'-'+contextOrd+'-'+contextTitle+'-'+itOrd+'-'+itTitle+'.jpg';
        // screenshot({ filename: './report/'+desTitle+'-'+contextOrd+'-'+contextTitle+'-'+itOrd+'-'+itTitle+'.jpg' });
        // addContext(pointer, addObj);
        if(headStatus === 'head'){
            const addObj = desTitle+'-'+contextOrd+'-'+contextTitle+'-'+itOrd+'-'+itTitle+'.jpg';
            screenshot({ filename: './report/'+desTitle+'-'+contextOrd+'-'+contextTitle+'-'+itOrd+'-'+itTitle+'.jpg' });
            addContext(pointer, addObj);
        }
        else if(headStatus === 'headless'){
            return headStatus;
        }
        else {return headStatus;}
    } 
}

module.exports = BasePage;