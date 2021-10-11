const {Key} = require('selenium-webdriver');

var BasePage = require ('./basepage');

var data = require ('../utils/data.js');

var expect = require("chai").expect;

class LoginPage extends BasePage{

    async loginProcess(){
   
        // goto login page
        this.gotoUrl(data().loginUrl);this.sleep(2);

        // clear name textbox
        await this.clearById(data().id_LoginName);this.sleep(1);
        // input login name
        await this.sendKeysById(data().id_LoginName, data().sendKeys_LoginName);this.sleep(1);

        // click password textbox
        await this.clickById(data().id_LoginPassword);this.sleep(1);
        // clear password textbox
        await this.clearById(data().id_LoginPassword);this.sleep(1);
        // input login password
        await this.sendKeysById(data().id_LoginPassword, data().sendKeys_LoginPassword);this.sleep(2);

        // uncheck the remember me
        await this.clickByCss(data().css_UncheckRememberMe);this.sleep(1);

        // submit login information
        await this.clickByCss(data().css_submitLoginButton);this.sleep(9);

        // [checkpoint] check by url
        expect(await this.getcurrentUrl()).to.equal(data().myFilesUrl);this.sleep(1);
    }

}
module.exports = new LoginPage();