var gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
    webserver = require('gulp-webserver');

gulp.task('default', ['test'], function() {});

gulp.task('test', function () {
	return gulp.src('test/stringreader.js').pipe(jasmine());
})

gulp.task('serve', ['default'], function() {
	gulp.src('.').pipe(webserver());
});

