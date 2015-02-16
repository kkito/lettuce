var through = require('through2');
var moment = require("moment")
var Post = require("./../blog/post")
var postItems = require("./../blog/post_items")
var marked= require('marked');

function getTitle(filename){
    return filename.split("/")[2].replace(/\.jade$/ , "");
}

function getDate(filename) {
    return moment(filename.split("/")[1]).toDate();
}

function getId(filename) {
    return filename;
}
function MarkDownFilter() {
    var stream = through.obj(function(file, enc, cb) {
        // console.log(marked(file.contents.toString("utf-8")))
        if(file.relative.match(/\.md$/)){
            var content = marked(file.contents.toString("utf-8"));
            var post = new Post(
                "TODOID",
                "TODO title",
                content , 
                "2015-02-16"
            )
            postItems.add(post)
            this.push(post.toFile());
        }
        cb();
    });
    return stream;
};

module.exports = MarkDownFilter;


