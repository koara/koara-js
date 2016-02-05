'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', ['build']);

gulp.task('build', ['minify']);

gulp.task('minify', function() {
  return gulp.src(['src/parser.js', 'src/charstream.js'])
    .pipe(sourcemaps.init())
	.pipe(concat('koara.js'))
	.pipe(gulp.dest('dist'))
	.pipe(rename('koara.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist'));
});