'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var karma = require('karma');

gulp.task('default', ['lint', 'scripts', 'test']);
gulp.task('ci', ['default']);


gulp.task('scripts', function() {
});

gulp.task('lint', function() {
  return gulp.src(['lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
	new karma.Server({ configFile: __dirname + '/karma.conf.js', singleRun: true }, done).start();
});