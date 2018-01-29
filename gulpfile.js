var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browser = require('browser-sync').create(),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    iconfont     = require("gulp-iconfont"),
    consolidate  = require("gulp-consolidate");


gulp.task('sass', function () {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      output_style: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browser.stream({match: '**/*.css'}));
});

// Starts a BrowerSync instance
gulp.task('serve', ['sass'], function(){
  browser.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task("build:icons", function() {
    return gulp.src(["./assets/icons/*.svg"]) //path to svg icons
      .pipe(iconfont({
        fontName: "myicons",
        formats: ["ttf", "eot", "woff", "svg"],
        centerHorizontally: true,
        fixedWidth: true,
        normalize: true,
        fontHeight: 1000
      }))
      .on("glyphs", (glyphs) => {

        gulp.src("./assets/icons/util/*.scss") // Template for scss files
            .pipe(consolidate("lodash", {
                glyphs: glyphs,
                fontName: "myicons",
                fontPath: "../assets/fonts/"
            }))
            .pipe(gulp.dest("./assets/scss/icons/")); // generated scss files with classes
      })
      .pipe(gulp.dest("./dist/assets/fonts/")); //icon font destination
});

// Runs all of the above tasks and then waits for files to change
gulp.task('default', ['serve'], function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
  gulp.watch('./**/*.html').on('change', browser.reload);
});