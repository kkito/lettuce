var gulp = require('gulp');
var jade = require("gulp-jade");
var contentFilter = require("./lib/gulp/contentFilter");
var stream = require("stream")
var ContentStream = require("./lib/gulp/ContentStream")
var File = require('vinyl');
var through = require('through2');

gulp.task('default', function() {
    // place code for your default task here
    console.log("hello")
    gulp.src('src/content/**/*.jade')
    .pipe(contentFilter())
    .pipe(jade())
    .pipe(gulp.dest('output'));


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
                base: "/content/",
                path: "/content/myfile2.jade",
                contents: new Buffer("h2 hello myfile2")
            });
            this.push(file)
            cb();
        });
        return stream;
    }())
    .pipe(jade())
    .pipe(gulp.dest('output'));
});
