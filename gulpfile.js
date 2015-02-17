var gulp = require('gulp');
var jade = require("gulp-jade");
var sass = require('gulp-sass');
var contentFilter = require("./lib/gulp/contentFilter");
var stream = require("stream")
var ContentStream = require("./lib/gulp/ContentStream")
var File = require('vinyl');
var through = require('through2');
var databaseContent = require("./lib/gulp/DatabaseContent")
var PostFilter = require("./lib/gulp/PostFilter")
var MarkDownFilter = require("./lib/gulp/MarkDownFilter")

var DataCenter = require("./lib/DataCenter")
var postItems = require("./lib/blog/post_items")
var jadeHelper = require("./lib/jade/helper");
var Post = require("./lib/blog/post")

function buildJadeFromPipe(fromPipe) {
    fromPipe
    .pipe(jade({
        locals: jadeHelper
    }))
    .pipe(gulp.dest('output'));
}

gulp.task("dbpost" , function(){
    postItems.init()
    .then(function(){
        buildJadeFromPipe(
            gulp.src('src/content/posts/**/*.jade')
            // deal the database item
            .pipe(databaseContent())
            // remove prefix with _ jade layout etc
            .pipe(contentFilter())
        );
    });
})
gulp.task("jadepost" , function(){
    buildJadeFromPipe(
        gulp.src('src/content/**/*.jade')
        // deal the jade  post
        .pipe(PostFilter())
        // remove prefix with _ jade layout etc
        .pipe(contentFilter())
    );
})

gulp.task("markdownpost" , function(){
    buildJadeFromPipe(
        gulp.src('src/content/**/*.md')
        .pipe(MarkDownFilter())
    );
})

gulp.task('default', ["dbpost" , "jadepost" , "markdownpost" , "bower" , "sass" , "js"] , function() {
    buildJadeFromPipe(
        gulp.src('src/content/posts/*.jade')
    );
});
var webserver = require('gulp-webserver');

gulp.task('s', function() {
    gulp.src('output')
    .pipe(webserver({
        livereload: true,
        host: "0.0.0.0",
        directoryListing: "output",
        open: true
    }));
});

gulp.task('sass', function () {
    gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('output/css'));
});

gulp.task('js' , function(){
    gulp.src('src/js/*.js')
    .pipe(gulp.dest('output/js'));
})

gulp.task('bower', function() {
    var bower = require('main-bower-files');
    var bowerNormalizer = require('gulp-bower-normalize');
    return gulp.src(bower(), {base: './bower_components'})
    .pipe(bowerNormalizer({bowerJson: './bower.json'}))
    .pipe(gulp.dest('./output/js/'))
});
