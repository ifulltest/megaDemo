//variables declaration
var downloadPage = require('../pages/downloadPage');

var data = require ('../utils/data.js');

var expect = require("chai").expect;

var fs = require('fs');
// var path = require('path');
// const filePath = path.resolve(__dirname, '..\\pages');

let contextOrd = 101;

describe('Download page test', function(){
    
    var desTitle = this.title;

    this.timeout(900000);

    before('download page test - before', async function(){

    });

    beforeEach(async function(){
        
    });

    after('download page test - before', async function(){

        // quit browser
        setTimeout(() => downloadPage.quit(), 4000);
    });

    context('the download winApp process test', function(){

        var contextTitle = this.title;
        
        var itOrd = 101;

        it('I goto download page', async function(){

            // goto login page
            downloadPage.gotoUrl(data().downloadPageUrl);downloadPage.sleep(2);
            
            // screenshot to report
            await downloadPage.findByCss(data().css_winAppDownloadLink);downloadPage.sleep(1);
            downloadPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);
            
        });
        
        it('I download the given app', async function(){

            // I click a given app downloading link
            // await driver.wait(until.elementLocated(By.css('body > table > tbody > tr > td:nth-child(2) > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(1) > a'))).click();sleep(3);
            // await driver.wait(until.elementLocated(By.css('.bottom-page.nav-buttons-bl.contrast.dark > a:nth-child(2)'))).click();sleep(3);
            await downloadPage.clickByCss(data().css_winAppDownloadLink);downloadPage.sleep(1);

            //check the given file is downloaded
            let i = 0;
            var downloaded = new Boolean();

            while (i < 1) {

                downloadPage.sleep(20);

                // const finalAppFile = __dirname+"\\7z1900-x64.exe";
                const finalAppFile = __dirname+"\\MEGAsyncSetup64.exe";
                // const finalAppFile = filePath+"\\MEGAsyncSetup64.exe";

                downloaded = fs.existsSync(finalAppFile);

                if(downloaded == true){// if(downloading == false && downloaded == true){
                    console.log("the given app is downloaded");
                    i = 1;
                }
                else{
                    console.log("the given app is downloading");
                }
            }

            if (i == 1){
                console.log("Found the given app file in downloading path: "+downloaded);
                downloadPage.screenShot(desTitle, contextOrd, contextTitle, itOrd++, this._runnable.title, this);
                expect(downloaded).to.be.true;
            }
        });
    });
});
