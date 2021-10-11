// variables declaration
// var webdriver = require('selenium-webdriver');
// const { Builder, By, Key, until } = require ('selenium-webdriver');

// const headStatus = ''; //screenshot switch, '' ~ screenshot is enable, 'headless' ~ screenshot is disaable

// chrome = require('selenium-webdriver/chrome');
// o = new chrome.Options();
// min = 56000;
// max = 65500;
// let nextPort = parseInt(Math.random()*(max-min+1)+min,10);
// o.addArguments('start-fullscreen');
// // o.addArguments('disable-infobars');
// // o.addArguments(headStatus);
// o.addArguments("--remote-debugging-port=" + nextPort);
// // o.setPageLoadStrategy("normal");//eager

// var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();


var loginPage = require('../pages/loginPage');

var data = require ('../utils/data.js');

var expect = require("chai").expect;

let contextOrd = 101;

// var path = require('path');
// jsName = path.basename(module.filename.slice(__filename.lastIndexOf(path.sep)+1, module.filename.length -3));


describe('Login page test', function(){
    
    var desTitle = this.title;

    this.timeout(60000);

    before('I goto login page and accept cookies', async function(){
        // // open home page
        // await loginPage.gotoUrl(data().baseUrl);loginPage.sleep(10);

        // // accept cookies
        // await loginPage.clickByCss(data().css_acceptCookies);

        // goto login page
        // driver.get('https://mega.nz/login');
        loginPage.gotoUrl(data().loginUrl);loginPage.sleep(1);
        
        // accept cookies
        await loginPage.findByCss(data().css_acceptCookies);
        var js = "return document.querySelector('.content-block.step1.active > div').dataset.psId";
        var result = await loginPage.executeJSWithSingleCss(js);
        if(result === null){
            // console.log("Object is null, no need to operate on it.");
        }else{
            // console.log("the value of the object: "+ result);
            await loginPage.clickByCss(data().css_acceptCookies);loginPage.sleep(1);
        }        
    });

    beforeEach(async function(){
        
    });

    after('I logout and quit the browser', async function(){
        
        // click top more button
        loginPage.sleep(3);await loginPage.clickByCss(data().css_TopMoreButton);loginPage.sleep(2);
        // loginPage.sleep(3);await loginPage.clickByXpath(data().xpath_TopMoreButton);loginPage.sleep(2);

        // click loghout button
        await loginPage.clickByCss(data().css_submitLogoutButton);loginPage.sleep(2);

        // click skip remember button
        await loginPage.clickByCss(data().css_skipRememberButton);loginPage.sleep(10);

        // [checkpoint] check by the url
        expect(await loginPage.getcurrentUrl()).to.equal(data().initialUrl);loginPage.sleep(1);

        // quit browser
        // setTimeout(() => loginPage.quit(), 4000);
    });

    context('login process test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;

        it('I goto login page', async function(){

            // goto login page
            loginPage.gotoUrl(data().loginUrl);loginPage.sleep(2);

            // screenshot to report
            loginPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);
            
        });
        
        it('I input login name', async function(){

            // clear name textbox
            await loginPage.clearById(data().id_LoginName);loginPage.sleep(1);
        
            // input login name
            await loginPage.sendKeysById(data().id_LoginName, data().sendKeys_LoginName);

            loginPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);loginPage.sleep(1);

        });
    
        it('I input login password', async function(){

            // click password textbox
            await loginPage.clickById(data().id_LoginPassword);loginPage.sleep(1);
            // clear password textbox
            await loginPage.clearById(data().id_LoginPassword);loginPage.sleep(1);
            // input login password
            await loginPage.sendKeysById(data().id_LoginPassword, data().sendKeys_LoginPassword);loginPage.sleep(2);

            loginPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);

        });

        it('I uncheck the remember me', async function(){

            // uncheck the remember me
            await loginPage.clickByCss(data().css_UncheckRememberMe);loginPage.sleep(1);

            loginPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);loginPage.sleep(1);

        });
    
        it('I submit login information', async function(){

            // submit login information
            await loginPage.clickByCss(data().css_submitLoginButton);loginPage.sleep(6);

            loginPage.screenShot(desTitle, contextOrd++, contextTitle, itOrd++, this._runnable.title, this);
    
            // [checkpoint] check by url
            expect(await loginPage.getcurrentUrl()).to.equal(data().myFilesUrl);
            
        });
    });
});