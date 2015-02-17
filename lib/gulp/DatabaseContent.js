var through = require('through2');
var File = require('vinyl');
var moment = require("moment")
var util = require("util")
var postItems = require("./../blog/post_items")

function databaseContent() {
    var started = false;
    var stream = through.obj(function(file, enc, cb) {
        var self = this;
        if(!started){
            started = true;
            postItems.init()
            .then(function(){
                postItems.data.map(function(post){
                    if(post.isFromDB()){
                        self.push(post.toFile())
                    }
                })
            })
        }
        this.push(file);
        cb();
    });
    return stream;
};

module.exports = databaseContent;

