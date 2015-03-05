var through = require('through2');
var moment = require("moment");
var Post = require("./../blog/post")
var postItems = require("./../blog/post_items")
var matter = require('jade-var-matter');
var utils = require("./../utils");
var jade = require("jade");

function getTitle(filename){
    return filename.split("/")[2].replace(/\.jade$/ , "");
}

function getDate(filename) {
    return moment(filename.split("/")[1]).toDate();
}

function getId(filename) {
    return utils.md5(filename);
}
function PostFilter() {
    var stream = through.obj(function(file, enc, cb) {
        if(file.relative.match(/^posts\//)){
            //
            var mt = matter(file.contents)
            var post = new Post(
                getId(file.relative),
                mt.title,
                jade.compile(file.contents)(this),
                getDate(file.relative)
            )
            postItems.add(post)
            this.push(post.toFile());
            // file.path = post.filepath()

        }
        // this.push(file);
        cb();
    });
    return stream;
};

module.exports = PostFilter;

