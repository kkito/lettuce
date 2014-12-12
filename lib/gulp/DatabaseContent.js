var through = require('through2');
var File = require('vinyl');
var moment = require("moment")
var util = require("util")

function databaseContent(getAllBlog) {
    var started = false;
    var stream = through.obj(function(file, enc, cb) {
        var self = this;
        if(!started){
            started = true;
            console.log("======" + file)
            getAllBlog()
            .then(function(blogs) {
                console.log("the blog size is" + blogs.length)
                blogs.map(function(blog) {
                    // if(blog.id < 104){
                    //     return;
                    // }
                    var dt = moment(blog.recordtime).format("YYYY-MM-DD")
                    global["_blog_" + blog.id] = blog.content
                    var basepath = "src/content/"
                    var path = util.format("%sposts/%s/%s%s.jade" , basepath , dt , blog.id ,blog.title.replace(/ /g , "_").replace(/\//g, "-"))
                    console.log(path)
                    var file = new File({
                        cwd: "/",
                        base: basepath,
                        path: path,
                        contents: new Buffer("extends ./../../_layout/layout\nblock content\n  h1!= _blog_" + blog.id)
                    });
                    self.push(file)
                })
            })
        }
        this.push(file);
        cb();
    });
    return stream;
};

module.exports = databaseContent;

