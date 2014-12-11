var gulp = require('gulp');
var jade = require("gulp-jade");
var contentFilter = require("./lib/gulp/contentFilter");
gulp.task('default', function() {
    // place code for your default task here
    // console.log("hello")
    gulp.src('src/content/**/*.jade')
    .pipe(contentFilter())
    .pipe(jade())
    .pipe(gulp.dest('output'));
});
