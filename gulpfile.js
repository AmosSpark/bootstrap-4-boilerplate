var gulp = require("gulp");
var brow = require("browser-sync").create();
var sass = require("gulp-sass");

function jsfunc() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/popper.min.js",
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(brow.stream());
}
function sassfunc() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(brow.stream());
}
function servefunc() {
  brow.init({
    server: "./src",
  });
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
    gulp.parallel("sassfunc")
  );
  gulp.watch("src/*.html").on("change", brow.reload);
}

exports.jsfunc = jsfunc;
exports.servefunc = servefunc;
exports.sassfunc = sassfunc;
exports.default = gulp.parallel(jsfunc, sassfunc, servefunc);
