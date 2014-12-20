var File = require('vinyl');
var moment = require("moment")
var util = require("util")
var DataCenter = require("./../DataCenter");

var postItems = {};
postItems.data = []
postItems.add = function(item){
    this.data.push(item)
};
postItems.init = function(){
    return DataCenter.getBlogs()
    .then(function(blogs) {
        console.log("the blog size is" + blogs.length)
        blogs.map(function(blog) {
            // if(blog.id < 104){
            //     return;
            // }
            var dt = moment(blog.recordtime).format("YYYY-MM-DD")
            global["_blog_" + blog.id] = blog.content
            var basepath = "src/content/"
            var basefile = util.format("posts/%s/%s%s" , dt , blog.id ,blog.title.replace(/ /g , "_").replace(/\//g, "-"))

            var path = util.format("%s%s.jade" , basepath , basefile);
            var url = basefile + ".html"
                console.log(path)
            var file = new File({
                cwd: "/",
                base: basepath,
                path: path,
                contents: new Buffer("extends ./../../_layout/layout\nblock content\n  h1!= _blog_" + blog.id)
            });
            file.title =blog.title
            file.url = url
            postItems.add(file)
        })
    })
};
global._postItems = postItems;
module.exports = postItems;
