var gulp = require("gulp");

var server = require("gulp-webserver");

var scss = require("gulp-sass");

var clean = require("gulp-clean-css");

var autoprefixer = require("gulp-autoprefixer");

var path = require("path");

var url = require("url");

var fs = require("fs");
//起服务
gulp.task('server', ["devCss"], function() {
    gulp.src("src")
        .pipe(server({
            port: 8989,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === "/favicon.ico") {
                    return false;
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
            }
        }))
});
//   scss
gulp.task("devCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(clean())
        .pipe(gulp.dest("./src/css"))
});

gulp.task("watch", function() {
    gulp.watch("./src/scss/*.scss", ['devCss'])
});

gulp.task('dev', ['server', 'watch'])