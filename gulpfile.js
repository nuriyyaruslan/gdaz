const gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      rigger = require('gulp-rigger');


const { series, parallel } = require('gulp');

let build = 'build',
    source = 'src';

/* include Header.html Footer.html  */
function fileinclude() {
    return gulp.src([
        source + '/*.html'
    ])
        .on('error', function (err) {
            this.emit('end')
        })
        .pipe(rigger()) 
        .pipe(gulp.dest('./build/'));
};

//css bundle here  
function bundleCss() {
    return gulp.src([
        source + '/libs/components-bootstrap/css/bootstrap.min.css'
        // plugin`s css 
    ])
        .pipe(cleanCSS()) //minify
        .pipe(concat("plugins.min.css"))
        .pipe(gulp.dest(build + '/assets/css'))
};

//sass compiles here
function customSass() {
    return gulp.src([
        source + '/assets/sass/imports.scss' // Always at the end
    ])

        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest(build + '/assets/css'))
};

// scripts bundle starts
 function bundleScript() {
    return gulp.src([
        source + '/libs/jquery/dist/jquery.min.js',
        source + '/libs/components-bootstrap/js/bootstrap.min.js'
        // Plugin`s js here
    ])
        .pipe(uglify()) //minify
        .pipe(concat('plugins.min.js'))
        .pipe(gulp.dest(build + '/assets/js'))
};

// scripts copy starts
function script() {
    return gulp.src([
        source + '/assets/js/script.js' // Always at the end
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(build + '/assets/js'))
};

//icon min
function icons(){
    return gulp.src(source + '/assets/css-dep/icons/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(build + '/assets/css/icons'))
};

//fonts copy
function fonts(){
    return gulp.src(source + '/assets/css-dep/fonts/**/*')
    .pipe(gulp.dest(build + '/assets/css/fonts'))
};

// img copy
function imgs(){
    return gulp.src(source + '/assets/img/**/*')
    .pipe(gulp.dest(build + '/assets/img'))
};

//watch files
function watch() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(source + '/*.html', gulp.series(fileinclude));
    gulp.watch(source + '/assets/**/*.scss', gulp.series(customSass));
    gulp.watch(source + '/assets/**/*.js', gulp.series(script));
    gulp.watch(source + '/assets/img/**/*', gulp.series(imgs));
    gulp.watch(source + '/assets/css-dep/icons/**/*', gulp.series(icons));
    gulp.watch(source + '/assets/css-dep/fonts/**/*', gulp.series(fonts));
    gulp.watch("build/**/*").on("change", browserSync.reload);

};

exports.build = build;
exports.default = series(fileinclude, bundleCss, bundleScript, customSass, script, imgs, icons, fonts, parallel(series(watch)));