// webdriver = require ('selenium-webdriver');
// chrome = require('selenium-webdriver/chrome');
// o = new chrome.Options();
// o.addArguments('start-fullscreen');
// o.setPageLoadStrategy("eager");
// var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(o).build();
// const { Builder, By, Key, until } = require ('selenium-webdriver');
// // const { sleep } = require('../pages/myfilesPageMega');

//variables declaration
var loginPage = require('../pages/loginPage');
var myfilesPage = require('../pages/myfilesPage');
var data = require ('../utils/data.js');
var expect = require("chai").expect;

// var MyfilesPage = require('../pages/myfilesPageMega');
// var myfilesPage;

let contextOrd = 101;

describe('Myfiles page test', function(){

    var desTitle = this.title;

    this.timeout(90000);
    
    before(async function(){

        // goto login page
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

        await loginPage.loginProcess();

    });

    beforeEach(async function(){

    });

    afterEach(async function(){
        
    });

    after(async function(){

        // click top more button
        await loginPage.clickByCss(data().css_TopMoreButton);loginPage.sleep(1);
        // loginPage.sleep(3);await loginPage.clickByXpath(data().xpath_TopMoreButton);loginPage.sleep(2);

        // click loghout button
        await loginPage.clickByCss(data().css_submitLogoutButton);loginPage.sleep(1);

        // click skip remember button
        await loginPage.clickByCss(data().css_skipRememberButton);loginPage.sleep(10);

        //[checkpoint] check by the url
        expect(await loginPage.getcurrentUrl()).to.equal(data().initialUrl);loginPage.sleep(1);

        // quit browser
        // setTimeout(() => loginPage.quit(), 4000);

    });

    context('the createFileProcess test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;

        // it('I complete the create file process', async function(){

        //     await myfilesPage.createFileProcess();
        // });

        it('I goto myfiles page', async function(){

            // goto myfiles page
            myfilesPage.gotoUrl(data().myFilesUrl);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

        });

        it('I right click', async function(){

            // right click
            await myfilesPage.actionsByContextClick(data().css_cloudDriveInputArea);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

        });

        it('I click new text file', async function(){

            // click new text file
            await myfilesPage.clickByXpath(data().xpath_newTextFile);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

        });

        it("I name the file", async function(){//"I name the file: "+data().sendKeys_FileName

            // name the file with the feature: mega+current datetime.txt

            // element.clear();
            await myfilesPage.clearByXpath(data().xpath_clearTextFileName);myfilesPage.sleep(1);

            // element.click();
            await myfilesPage.clickByXpath(data().xpath_clearTextFileName);myfilesPage.sleep(1);

            // element.sendKeys("mega"+curdate);
            await myfilesPage.sendKeysByXpath(data().xpath_clearTextFileName, data().sendKeys_FileName);myfilesPage.sleep(1);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(3);

        });

        it('I click create button', async function(){

            // click create button
            await myfilesPage.clickByCss(data().css_CreateFileButton);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(17);
            
            // [pre-checkpoint] wait until the active element switches from body to others
            var flag = 'BODY';
            var js = "return document.activeElement.tagName";
            while (flag === 'BODY') {
                flag = await myfilesPage.executeJSWithSingleCss(js);myfilesPage.sleep(2);
            }

            // [checkpoint] by the dynamic file content
            var result = await myfilesPage.getTextclickByCss(data().css_FileTitle);
            expect(result).to.equal(data().sendKeys_FilePartialName);myfilesPage.sleep(2);

        });

        it('I close the opened file', async function(){

            // close open file
            await myfilesPage.clickByCss(data().css_CloseOpenFile);

            myfilesPage.screenShot(desTitle, contextOrd++, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

        });
    });

    context('the editFileProcess test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;
        
        // it('I complete the edit file process', async function(){

        //     await myfilesPage.editFileProcess();
        // });

        it('I right click and open the given file', async function(){

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

            await myfilesPage.executeJS(js, data().css_FileBox_L, data().css_FileBox_R, data().css_Dropdown_Open);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(8);

        });
        
        it('I edit the file content', async function(){
            
            // switch to current active element
            await myfilesPage.switchToActiveElement();myfilesPage.sleep(1);

            // click on the starting point of the first line
            await myfilesPage.actionsClick();myfilesPage.sleep(1);
            
            // edit file content
            await myfilesPage.actionsSendKeys(data().sendKeys_FileName);
            
            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

        });

        it('I save the file content', async function(){

            // save file content
            await myfilesPage.clickByCss(data().css_SaveFileContent);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(11);

            // [checkpoint] check by saved file content
            var result = await myfilesPage.getTextclickByCss(data().css_FileFirstLine);myfilesPage.sleep(1);
            expect(result).to.equal(data().sendKeys_FileName);myfilesPage.sleep(5);

        });

        it('I close the opened file', async function(){

            // close open file
            await myfilesPage.clickByCss(data().css_CloseOpenFile);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

        });

        it('I check the edit process is successful by the given file name', async function(){

            // // I click demo pdf file            
            // await myfilesPage.clickByCss(data().css_LastFileName);myfilesPage.sleep(1);

            // switch to current active element
            await myfilesPage.switchToActiveElement();


            myfilesPage.screenShot(desTitle, contextOrd++, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

            // check whether expected file name exsited in the given nodelist
            var js = 
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

            var result = await myfilesPage.executeJSWithSingleCss(js);
            expect(result[0]).to.equal(data().sendKeys_FilePartialName);

        });
    });

    context('the renameFileProcess test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;

        it('I invoke the rename file function', async function(){

            // right click and click the rename button on the given file
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
            await myfilesPage.executeJS(js, data().css_FileBox_L, data().css_FileBox_R, data().css_Dropdown_Rename);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(3);

        });

        it('I rename the file', async function(){

            // rename the file, file name: mega+current datetime

            // element.clear();
            await myfilesPage.clearByCss(data().css_ClearRenameFileName);myfilesPage.sleep(1);

            // element.click();
            await myfilesPage.clickByCss(data().css_ClearRenameFileName);myfilesPage.sleep(1);

            // element.sendKeys("mega"+curdate);
            await myfilesPage.sendKeysByCss(data().css_ClearRenameFileName, data().sendKeys_FileName);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(3);

        });

        it('I click rename button', async function(){

            // click rename button
            await myfilesPage.clickByCss(data().css_RenameButton);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(10);

        });

        it('I check the rename file process is successful by the given file name', async function(){

            myfilesPage.screenShot(desTitle, contextOrd++, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

            var js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll(".megaList-content > a > span:nth-child(2)");
            let j = -1;
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FileName+`'){
                    arr[0] = nodeList[i].innerHTML
                }
            };
            return arr
            `

            var result = await myfilesPage.executeJSWithSingleCss(js);
            expect(result[0]).to.equal(data().sendKeys_FileName);myfilesPage.sleep(1);

        });
    });

    context('the deleteFileProcess test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;

        it('I invoke the delete file function', async function(){

            // right click and click the remove button on the given file
            var js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll(".megaList-content > a > span:nth-child(2)");
            let j = -1;
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FileName+`'){
                j = i + 1;
                }
            };
            return j
            `

            await myfilesPage.executeJS(js, data().css_FileBox_L, data().css_FileBox_R, data().css_Dropdown_Remove);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(3);

        });

        it('I confirm to delete', async function(){

            // confirm to remove
            await myfilesPage.clickByCss(data().css_ConfirmRemove);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(5);
    
        });

        it('I check the delete file process is successful by the given file name', async function(){

            myfilesPage.screenShot(desTitle, contextOrd++, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

            var js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll(".megaList-content > a > span:nth-child(2)");
            let j = -1;
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FileName+`'){
                    arr[0] = nodeList[i].innerHTML
                }
            };
            return arr
            `

            var result = await myfilesPage.executeJSWithSingleCss(js);
            expect(result[0]).to.equal('unmatched');myfilesPage.sleep(1);

        });
    });

    context('the resttoreFileProcess test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;

        it('I goto the rubbish bin page', async function(){

            // click the rubbish bin button
            await myfilesPage.clickByCss(data().css_RubbishBinButton);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(3);

            //[checkpoint] check by the url
            expect(await myfilesPage.getcurrentUrl()).to.equal(data().rubbishBinUrl);myfilesPage.sleep(3);

        });

        it('I invoke the restore file function', async function(){

            // right click and click the restore button on the given file
            var js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll('`+data().css_RubbishBinAllFiles+`');
            let j = -1;
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FileName+`'){
                j = i + 2;
                }
            };
            return j
            `

            await myfilesPage.executeJS(js, data().css_RubishBinFile_L, data().css_RubishBinFile_R, data().css_RubbishBinRestore);

            myfilesPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(8);

        });

        it('I check the restore file process is successful by the given file name', async function(){

            myfilesPage.screenShot(desTitle, contextOrd++, contextTitle, itOrd++, this._runnable.title, this);myfilesPage.sleep(1);

            var js = 
            `
            var arr = ['unmatched'];
            const nodeList = document.querySelectorAll(".megaList-content > a > span:nth-child(2)");
            let j = -1;
            for(let i = 0;i<nodeList.length;i++){
                if (nodeList[i].innerHTML === '`+data().sendKeys_FileName+`'){
                    arr[0] = nodeList[i].innerHTML
                }
            };
            return arr
            `

            var result = await myfilesPage.executeJSWithSingleCss(js);
            expect(result[0]).to.equal(data().sendKeys_FileName);myfilesPage.sleep(1);

        });
    })
})