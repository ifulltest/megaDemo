// sleep time: millisecond
slp = function sleep(delay) {
    for (var t = Date.now(); Date.now() - t <= delay*1000;);
    return slp;
}

// file write
fw = function fileWrite(){
    var fs = require('fs')
    var util = require('util')
    var logFile = fs.createWriteStream('console.log')//'console.log', { flags: 'a' }
    // write given message to file
    console.log = function() {
        logFile.write(util.format.apply(null, arguments) + '\n')
        process.stdout.write(util.format.apply(null, arguments) + '\n')
    }
    return fw;
}

// date format
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //Month 
        "d+": this.getDate(), //Day
        "H+": this.getHours(), //Hour 
        "m+": this.getMinutes(), //Minute 
        "s+": this.getSeconds(), //Second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //Quarter
        "S": this.getMilliseconds() //Millisecond 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}