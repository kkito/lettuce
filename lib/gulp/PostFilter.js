var through = require('through2');
var moment = require("moment")
var Post = require("./../blog/post")
var postItems = require("./../blog/post_items")

function getTitle(filename){
    return filename.split("/")[2].replace(/\.jade$/ , "");
}

function getDate(filename) {
    return moment(filename.split("/")[1]).toDate();
}

function getId(filename) {
    return filename;
}
function PostFilter() {
    var stream = through.obj(function(file, enc, cb) {
        if(file.relative.match(/^posts\//)){
            //
            postItems.add(new Post(
                getId(file.relative),
                getTitle(file.relative),
                file.contents,
                getDate(file.relative)
            ))
        }
        this.push(file);
        cb();
    });
    return stream;
};

module.exports = PostFilter;

