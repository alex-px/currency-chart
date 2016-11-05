var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var concatJs = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var packageJson = require('./package.json');

var cssToConcat = [
    './static/css/calendar.css',
    './currency/static/currency/css/currency.css'
];

var jsToConcat = [
    './static/js/calendar.js',
    './bower_components/highcharts/highcharts.js',
    './currency/static/currency/js/currency.js'

];

gulp.task('js', function() {
    return gulp.src(jsToConcat)
        .pipe(concatJs('bundle.js'))
        .pipe(gulp.dest('./staticfiles/js/'));
});

gulp.task('jsmin', ['js'], function() {
    return gulp.src('staticfiles/js/bundle.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./staticfiles/js/'));
});

gulp.task('concat-css', function() {
    return gulp.src(cssToConcat)
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest('./staticfiles/css/'));
});

gulp.task('css', ['concat-css'], function () {
    return gulp.src('./staticfiles/css/bundle.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./staticfiles/css/'));
});

gulp.task('build', ['jsmin', 'css']);