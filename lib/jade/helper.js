var config = require("./../config")
var jadeHelper =  {}
jadeHelper.url = function(path) {
    // return "/test/t/web" + path;
    return config.urlprefix + path;
}

module.exports = jadeHelper;
