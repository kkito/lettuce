var crypto = require('crypto');


var utils = {};

utils.md5 = function(str){
    var md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}

module.exports = utils;
