'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('default', ['build']);

gulp.task('build', ['lint', 'scripts', 'test']);

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!gulpfile.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts', function() {
  return gulp.src(['./app.js', 'src/*'])
    .pipe(sourcemaps.init())
	.pipe(concat('koara.js'))
	.pipe(gulp.dest('dist'))
	.pipe(rename('koara.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['default'], function() {
	gulp.src('.').pipe(webserver());
});

gulp.task('test', ['scripts'], function () {
	return gulp.src('test/*.js').pipe(jasmine());
})