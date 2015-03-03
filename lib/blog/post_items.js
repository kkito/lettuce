var File = require('vinyl');
var moment = require("moment")
var util = require("util")
var DataCenter = require("./../DataCenter");
var Post = require("./post")

var postItems = {};
postItems.data = []
postItems.add = function(item){
    item.published_at = moment(item.published_at)
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
            // var dt = moment(blog.recordtime).format("YYYY-MM-DD")
            // global["_blog_" + blog.id] = blog.content
            // var basepath = "src/content/"
            // var basefile = util.format("posts/%s/%s%s" , dt , blog.id ,blog.title.replace(/ /g , "_").replace(/\//g, "-"))

            // var path = util.format("%s%s.jade" , basepath , basefile);
            // var url = basefile + ".html"
            //     console.log(path)
            // var file = new File({
            //     cwd: "/",
            //     base: basepath,
            //     path: path,
            //     contents: new Buffer("extends ./../../_layout/layout\nblock content\n  h1!= _blog_" + blog.id)
            // });
            // file.title =blog.title
            // file.url = url
            postItems.add(new Post(
                blog.id,
                blog.title,
                blog.content,
                blog.recordtime
            ).setFromDB())
        })
    })
};

postItems.links = function(){
    postItems.data.sort(function(x , y) {
        // console.log(x.published_at)
        // console.log(x.published_at.valueOf())
        return x.published_at.valueOf() - y.published_at.valueOf();
    })
    return postItems.data.map(function(post){
        return {url: post.url() , title: post.title}
    })
}
global._postItems = postItems;
module.exports = postItems;
