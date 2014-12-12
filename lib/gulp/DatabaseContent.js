var through = require('through2');
var File = require('vinyl');

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
                    console.log(blog.id)
                    global["_blog_" + blog.id] = blog.content
                    var file = new File({
                        cwd: "/",
                        base: "src/content/",
                        path: "src/content/articles/blog" + blog.id+ ".jade",
                        contents: new Buffer("extends ./../_layout/layout\nblock content\n  h1!= _blog_" + blog.id)
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

