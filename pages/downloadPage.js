var webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require ('selenium-webdriver');

var BasePage = require ('./basepage');

var data = require ('../utils/data.js');

var expect = require("chai").expect;

// const screenshot = require('screenshot-desktop');

// const addContext = require('mochawesome/addContext');

class DownloadPage extends BasePage{

    async downloadProcess(){
   
        // to do list
    }

}
module.exports = new DownloadPage();