var gulp = require('gulp');
var jade = require("gulp-jade");
var contentFilter = require("./lib/gulp/contentFilter");
var stream = require("stream")
var ContentStream = require("./lib/gulp/ContentStream")
var File = require('vinyl');
var through = require('through2');
var databaseContent = require("./lib/gulp/DatabaseContent")

var DataCenter = require("./lib/DataCenter")

// 从jade中读取fonter matter
//https://github.com/jessaustin/jade-var-matter
gulp.task('default', function() {
    // place code for your default task here
    console.log("hello")
    gulp.src('src/content/**/*.jade')
    // .pipe(contentFilter())
    // .pipe(databaseContent())
    .pipe(databaseContent(DataCenter.getBlogs))
    .pipe(jade())
    .pipe(gulp.dest('output'));


    /*
    new File({
    cwd: "/",
    base: "/content/",
    path: "/content/myfile.jade",
    contents: new Buffer("h2 hello myfile")
    }).pipe(function() {
    var stream = through.obj(function(file, enc, cb) {
    file = new File({
    cwd: "/",
    base: "/content/",
    path: "/content/myfile.jade",
    contents: new Buffer("h2 hello myfile")
    });
    console.log(file)
    this.push(file)
    file = new File({
    cwd: "/",
    base: "src/content/",
    path: "src/content/myfile2.jade",
    contents: new Buffer("extends ./_layout/layout\nblock content\n  h1 hello world")
    });
    this.push(file)
    cb();
    });
    return stream;
    }())
    .pipe(jade())
    .pipe(gulp.dest('output'));
    DataCenter.getBlogs()
    .then(function(posts) {
    console.log("posts size is " + posts.length)
    })
    .error(function(err) {
    console.log("error happened " + err)
    })
    */
});
var webserver = require('gulp-webserver');

gulp.task('s', function() {
    gulp.src('output')
    .pipe(webserver({
        livereload: true,
        directoryListing: "output",
        open: true
    }));
});
