// make a stream so that we can use gulp pipe style
// i don't know if it's stupid
//
//http://stackoverflow.com/questions/20709063/how-do-i-implement-a-basic-node-stream-readable-example
//
// https://github.com/wearefractal/vinyl
// var File = require('vinyl');
//
// var coffeeFile = new File({
//   cwd: "/",
//     base: "/test/",
//       path: "/test/file.coffee",
//         contents: new Buffer("test = 123")
//         });))
var util = require('util');
var Readable = require('stream').Readable;

var ContentStream = function(buffer , options) {
    Readable.call(this, options); // pass through the options to the Readable constructor
    this.counter = 0;
    this.length = buffer.length
    this.buffer = buffer;
    this.path = "/Users/kkshen/proj/lettuce/src/content/mytest.jade"
    this.data = buffer;
};

util.inherits(ContentStream, Readable); // inherit the prototype methods

ContentStream.prototype._read = function(n) {
    if(this.counter > this.length){
        this.push(null);
    }else {
        this.counter += n;
        this.push(this.buffer.slice(this.counter-n , this.counter + n));
    }
};

ContentStream.prototype.isStream = function() {
    return true;
}

// var mystream = new MyStream();
// mystream.pipe(process.stdout);
module.exports = ContentStream;
