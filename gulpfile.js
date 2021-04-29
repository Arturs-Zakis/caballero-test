var autoprefixer = require('autoprefixer');
var browsersync = require('browser-sync').create();
var minify = require('gulp-minify');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var gulp = require('gulp');

// browserSync
function browserSync() {
  browsersync.init({
    server: {
      baseDir: './src',
      directory: false
    }
  })
}

// browserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function clean() {
  return gulp.src('./dist/');
}

function css() {
  return gulp
    .src('./src/scss/**/app.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./src/css/'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    // .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browsersync.reload({ stream: true }));
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src('./src/js/**/*')
      .pipe(browsersync.stream())
  );
}


// build tasks
function buildCss() {
  return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./dist/css'));
}

function buildHtml() {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./dist/'));
}

function buildJs() {
  return gulp.src('./src/js/**/*')
    .pipe(minify({ ext: { min: '.min.js' } }))
    .pipe(gulp.dest('./dist/js'));
}

function buildAssets() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
}

function watchFiles() {
  gulp.watch('./src/scss/**/*', gulp.series(css));
  gulp.watch('./src/js/**/*', gulp.series(scripts));
  gulp.watch('./src/*.html', gulp.series(browserSyncReload));
  // gulp.watch('./src/img/**/*', images);
}

const start = gulp.parallel(css, browserSync, watchFiles);
// const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
const build = gulp.series(clean, buildHtml, buildCss, buildJs, buildAssets);

exports.default = start;
exports.build = build;