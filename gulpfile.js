const gulp = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const htmlbeautify = require('gulp-html-beautify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Задача для перезагрузки браузера
function reload(done) {
  browserSync.reload();
  done();
}

// JS
function scripts() {
  return gulp.src('source/assets/js/**/*.js')
    .pipe(gulp.dest('htdocs/f/js/'))
    .pipe(browserSync.stream());
}

// Stylus -> CSS
function styles() {
  return gulp.src('source/assets/styles/*.styl')
    .pipe(stylus().on('error', console.log))
    .pipe(cleanCSS())
    .pipe(gulp.dest('htdocs/f/css/'))
    .pipe(browserSync.stream());
}

// Pug -> HTML
function compilePug() {
  return gulp.src('source/pug/*.pug')
    .pipe(pug().on('error', console.log))
    .pipe(htmlbeautify({
        indent_size: 2,
        indent_inner_html: true
    }))
    .pipe(gulp.dest('htdocs/html/'));
}

// Images
function images() {
  return gulp.src('source/assets/images/**/*.{png,jpg,jpeg,gif,svg,webp}')
    .pipe(gulp.dest('htdocs/f/i/'))
    .pipe(browserSync.stream());
}

// Fonts
function fonts() {
  return gulp.src('source/assets/fonts/**/*')
    .pipe(gulp.dest('htdocs/f/fonts/'))
    .pipe(browserSync.stream());
}

// BrowserSync
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './htdocs',
    },
  });
  done();
}

// Watcher
function watchFiles() {
  gulp.watch('source/assets/js/**/*', gulp.series(scripts));
  gulp.watch('source/assets/styles/**/*', gulp.series(styles));
  gulp.watch('source/pug/**/*', gulp.series(compilePug, reload));
  gulp.watch('source/assets/images/**/*', gulp.series(images));
  gulp.watch('source/assets/fonts/**/*', gulp.series(fonts));
}

// Экспортируем задачи
exports.scripts = scripts;
exports.styles = styles;
exports.pug = compilePug;
exports.images = images;
exports.fonts = fonts;
exports.serve = serve;
exports.watch = gulp.series(
  gulp.parallel(scripts, styles, compilePug, images, fonts),
  serve,
  watchFiles
);

exports.default = exports.watch;
