var through = require('through2');

function contentFilter() {
    var stream = through.obj(function(file, enc, cb) {
        console.log(file)
        console.log(file.relative)
        var name_in_content = file.path.replace(file.base , "/")
        // if include _ , then not generate
        // TODO should make it in config file 
        if(name_in_content.indexOf("/_") == -1) {
            this.push(file);
        }
        cb();
    });
    return stream;
};

module.exports = contentFilter;
