var faker = require('faker');
driverUtil = require('./technicUtil');

var curdate = new Date().Format("yyyyMMddHHmmss");
var curPartialDate = new Date().Format("yyyyMMddHH");

var data = function(){
    return{

        ////website ~ https://mega.io
        //initial page data
        initialUrl: 'https://mega.nz/start'
        ,timestamp: curPartialDate

        //home page data
        ,baseUrl: 'https://mega.io'
        ,css_acceptCookies: '.accept-cookies'//homePage - .top-buttons > button:nth-child(2)  loginPage - .accept-cookies

        //login page data
        ,loginUrl: 'https://mega.nz/login'
        ,css_LoginButton: '.accept-cookies' //.top-login-button
        ,id_LoginName: 'login-name2'
        ,sendKeys_LoginName: '0512gaoyuan@gmail.com'
        ,id_LoginPassword: 'login-password2'
        ,sendKeys_LoginPassword: 'gygy0512'
        ,css_UncheckRememberMe: '.login-check.checkboxOn.checkbox'
        ,css_submitLoginButton: '.login-button'

        //logout page data
        ,css_TopMoreButton: '#topmenu > section.topbar.top-head.js-topbar > div:nth-child(7) > button.btn-icon.js-more-menu.js-top-buttons'//.icon-side-menu
        // ,xpath_TopMoreButton: '/html/body/div[6]/div[2]/section[1]/div[6]/button[2]'
        
        ,css_submitLogoutButton: '#topmenu > div > div > div.top-menu-content > div.top-menu-footer > button'//.mega-button.branded-red.logout
        ,css_skipRememberButton: '.button-prd-skip'

        //myfiles page data
        ,myFilesUrl: 'https://mega.nz/fm/8xQElTAB'
        ,css_demoPdfFile: '.megaList-content a:nth-last-child(1)'
        ,css_cloudDriveInputArea: '.megaList-content'//.file-block-scrolling.megaList.megaListContainer.ui-selectable
        ,xpath_newTextFile: '/html/body/div[7]/div[3]/div[11]/a/span'
        ,css_cancelCreateFileButton: '.cancel-create-file'
        ,xpath_clearTextFileName: '/html/body/section[4]/div[9]/section/div/div[1]/input'
        ,sendKeys_FileName: 'mega'+curdate
        ,css_CreateFileButton: 'button.mega-button.positive.fm-dialog-new-file-button.create-file > span'
        ,css_FileTitle: '.text-editor-file-name'
        ,sendKeys_FilePartialName: 'mega'+curPartialDate
        ,css_fileListObj: 'span.file-block-title'
        ,css_CloseOpenFile: 'button[class="close-btn"]'// li > button.close-btn
        ,css_LastFileName: '.megaList-content a:nth-last-child(1)'
        ,css_FileBox_L: '.megaList-content > a:nth-child('
        ,css_FileBox_R: ') >span'
        ,css_Dropdown_Open: '.dropdown.body.files-menu.context > div:nth-child(3) > a:nth-child(1) > span'
        ,css_Dropdown_Rename: 'a.dropdown-item.rename-item'//.dropdown.body.files-menu.context > div:nth-child(8) > a.dropdown-item.rename-item
        ,css_ClearRenameFileName: 'input[name="dialog-rename"]'
        ,css_RenameButton: '.rename-dialog-button.rename'
        ,css_Dropdown_Remove: 'a.dropdown-item.remove-item'//.dropdown.body.files-menu.context > div:nth-child(14)
        ,css_ConfirmRemove: '.space-between > .mega-button.positive.confirm'

        //myfile content page data
        ,css_closeFileButton: 'ul.bar.control > li:nth-child(2) > button'
        ,css_FileFirstLine: '.CodeMirror-line > span'
        ,css_FileContentCursor: '#bodyel > section.text-editor-container > div > section > div > div:nth-child(1) > textarea'//section > div > div:nth-child(1) > textarea
        ,css_SaveFileContent: '.save-btn'

        // myfile rubbish bin page data
        ,css_RubbishBinButton: '.btn-myfiles.js-lpbtn.rubbish-bin.js-fm-tab.ui-droppable.filled'
        ,rubbishBinUrl: 'https://mega.nz/fm/UhRAlT5b'
        ,css_RubbishBinAllFiles: 'tbody >tr >td[megatype = "fname"] > span:nth-child(2)'
        ,css_RubishBinFile_L: 'tbody >tr:nth-child('
        ,css_RubishBinFile_R: ') >td[megatype = "fname"]'
        ,css_RubbishBinRestore: '.dropdown-item.revert-item'

        // download page data
        ,downloadPageUrl: "https://mega.nz/sync"
        ,css_winAppDownloadLink: ".bottom-page.nav-buttons-bl.contrast.dark > a:nth-child(2)"
    }
}

module.exports = data;