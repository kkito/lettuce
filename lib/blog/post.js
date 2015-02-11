var File = require('vinyl');
var util = require("util")
var moment = require("moment")
var Class = require("jsclass/src/core").Class

var basepath = "src/content/";

var Post = new Class({
    initialize: function(id, title , content , published_at){
        this.id = id;
        this.title = title;
        this.content = content;
        this.published_at = published_at;
        this.fromdb = false;
    }, 
    setFromDB: function(){
        this.fromdb = true;
        return this;
    },
    isFromDB: function(){
        return this.fromdb;
    },
    pageTitle: function(){
        return this.title.replace(/ /g , "_")
        .replace(/\//g, "-")
    },
    echo: function(){
        console.log(this.id)
    }, 
    dtStr: function(){
        return moment(this.published_at).format("YYYY-MM-DD")
    },
    basefile: function(){
        return util.format(
            "posts/%s/%s" , 
            this.dtStr(), 
            this.pageTitle()
        )
    },
    filepath: function(){
        return util.format("%s%s.jade" , 
                           this.basedir(),
                           this.basefile()
                          );
    },
    url: function(){
        return this.basefile() + ".html"
    },
    basedir: function(){
        return basepath;
    },
    fileContent: function(){
        global["_blog_" + this.id] = this.content
        return new Buffer("extends ./../../_layout/layout\nblock content\n  .db-blog-item!= _blog_" + this.id)
    },
    toFile: function(){
        return new File({
            cwd: "/",
            base: this.basedir(),
            path: this.filepath(),
            contents: this.fileContent()
        });
    }
})

module.exports = Post
