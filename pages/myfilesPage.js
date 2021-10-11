const { Builder, By, Key, until } = require ('selenium-webdriver');

var BasePage = require ('./basepage');

var data = require ('../utils/data.js');

var expect = require("chai").expect;

class MyfilesPage extends BasePage{

    async createFileProcess(){

        // right click
        await this.actionsByContextClick(data().css_cloudDriveInputArea);this.sleep(1);
    
        // click new text file
        await this.clickByXpath(data().xpath_newTextFile);this.sleep(1);

        // name the file, file name: mega+current datetime.txt
        // element.clear();
        await this.clearByXpath(data().xpath_clearTextFileName);this.sleep(1);

        // element.click();
        await this.clickByXpath(data().xpath_clearTextFileName);this.sleep(1);

        // element.sendKeys("mega"+curdate);
        await this.sendKeysByXpath(data().xpath_clearTextFileName, data().sendKeys_FileName);this.sleep(3);

        // click create button
        await this.clickByCss(data().css_CreateFileButton);this.sleep(10);

        // [checkpoint] click create button
        // await driver.wait(until.elementLocated(By.css(data().css_FileTitle)));this.sleep(1);
        // var result = await driver.findElement(By.css(data().css_FileTitle)).getText();this.sleep(1);

        // var result = await driver.wait(until.elementLocated(By.css(data().css_FileTitle))).then(el => el.getText().then(x=>x));
        var result = this.getTextclickByCss(data().css_FileTitle);
        expect(result).to.equal(data().sendKeys_FilePartialName);this.sleep(2);

        // [optional] close open file
        await this.clickByCss(data().css_CloseOpenFile);this.sleep(1);

    }

    async editFileProcess(){

        // right click and open the given file
        var js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll(".megaList-content > a > span:nth-child(2)");
            let j = -1;
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FilePartialName+`'){
                j = i + 1;
                }
            };
            return j
            `

        await driver.executeScript(js).then(async function(return_value) {

            // console.log("file order no.: "+return_value);
            // right click file name text box
            await driver.actions().contextClick(driver.wait(until.elementLocated(By.css(data().css_FileBox_L+return_value+data().css_FileBox_R)))).perform();//driver.sleep(1);
            // await driver.actions().contextClick(await this.clickByCss(data().css_FileBox_L+return_value+data().css_FileBox_R)).perform();driver.sleep(1);;
            
            // click open
            //await clickByCss(data().css_Dropdown_Open);this.sleep(3);
            await driver.wait(until.elementLocated(By.css(data().css_Dropdown_Open))).click();

        });this.sleep(8);

        
        // [optional] file first line 
        // await this.findByCss(data().css_FileFirstLine);this.sleep(5);

        // [optional] file content mouse cursor
        // // await driver.wait(until.elementLocated(By.css(data().css_FileContentCursor))).click();this.sleep(3);
        // var js = 'document.querySelector("#bodyel > section.text-editor-container > div > section > div > div:nth-child(1) > textarea").click()';
        // await driver.executeScript(js);this.sleep(2);

        // edit file content
        // await this.sendKeysByCss(data().css_FileContentCursor, data().sendKeys_FileName);this.sleep(1);
        await driver.switchTo().activeElement();this.sleep(1);
        await driver.actions().click().perform();this.sleep(1);
        await driver.actions().sendKeys(Key.chord(data().sendKeys_FileName)).perform();this.sleep(1);

        // save file content
        await this.clickByCss(data().css_SaveFileContent);this.sleep(11);

        // [checkpoint] save file content
        var result = await driver.wait(until.elementLocated(By.css('.CodeMirror-line > span'))).then(el => el.getText().then(x=>x));this.sleep(1);
        expect(result).to.equal(data().sendKeys_FileName);this.sleep(5);//sendKeys_FilePartialName

        // close open file
        await this.clickByCss(data().css_CloseOpenFile);this.sleep(1);

        // click demo pdf file            
        await this.clickByCss(data().css_LastFileName);this.sleep(1);

        // check whether expected file name exsited in the given nodelist
        js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll(".megaList-content > a > span:nth-child(2)");
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FilePartialName+`'){
                arr[0] = nodeList[i].innerHTML
                }
            };
            return arr
            `
        await driver.executeScript(js).then(function(return_value) {
            
            console.log("FilePartialName: "+return_value);

            expect(return_value[0]).to.equal(data().sendKeys_FilePartialName);
        });
    }    
}
module.exports = new MyfilesPage();
// module.exports = MyfilesPage;

/*
Way1
// myfilesPageMega
module.exports = MyfilesPage;

// myfilesPageMegaTest.js
var MyfilesPage = require('../pages/myfilesPageMega');
var myfilesPage;
 myfilesPage = new MyfilesPage();

Way2
// myfilesPageMega
 module.exports = new MyfilesPage();

// myfilesPageMegaTest.js
 var myfilesPage = require('../pages/myfilesPageMega');
 myfilesPage.gotoUrl(data().loginUrl);
 ...
 */