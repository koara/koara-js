'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var jasmine = require('gulp-jasmine');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['lint', 'bundle', 'test']);

gulp.task('bundle', function() {
	var b = browserify({ entries: './index.js', debug: true, transform: [reactify] });
	return b.bundle()
	    .pipe(source('index.js'))
	    .pipe(rename('koara.js'))
	    .pipe(buffer())
	    .pipe(gulp.dest('dist'))
	    .pipe(rename('koara.min.js'))
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(uglify())
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src(['lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
	return gulp.src('test/ch*.js').pipe(jasmine());
});

gulp.task('test-travisci', ['test'], function (done) {
});
