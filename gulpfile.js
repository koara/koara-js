var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var eslint = require('gulp-eslint');
var webserver = require('gulp-webserver');

gulp.task('default', ['lint', 'test'], function() {});

gulp.task('lint', function() {
	return gulp.src(['**/*.js', '!gulpfile.js', '!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
	return gulp.src('test/string*.js').pipe(jasmine());
})

gulp.task('serve', ['default'], function() {
	gulp.src('.').pipe(webserver());
});

