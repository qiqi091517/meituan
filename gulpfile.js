var gulp = require("gulp");

var server = require("gulp-webserver");

var scss = require("gulp-sass");

var clean = require("gulp-clean-css");

var autoprefixer = require("gulp-autoprefixer");

var querystring = require("querystring");

var path = require("path");

var url = require("url");

var fs = require("fs");

var data = require("./mock")

var userlist = [{
    username: "qq",
    pwd: 111
}];
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
                if (pathname === "/api/login") {
                    var arr = [];
                    req.on("data", function(chunk) {
                        arr.push(chunk)
                    })
                    req.on("end", function() {
                        var params = querystring.parse(Buffer.concat(arr).toString())
                        console.log(params)
                        var isHas = userlist.some(function(item) {
                            return item.username == params.username && item.pwd == params.pwd
                        })
                        if (isHas) {
                            res.end(JSON.stringify({ code: 1, msg: "登陆成功" }))
                        } else {
                            res.end(JSON.stringify({ code: 0, msg: "登陆失败" }))
                        }
                    })
                } else if (/\/api/g.test(req.url)) {
                    res.end(JSON.stringify({ code: 1, msg: data(req.url) }))

                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }

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