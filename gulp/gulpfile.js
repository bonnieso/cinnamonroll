var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();
gulp.task('sass', require('./tasks/sass')(gulp, plugins));

gulp.task('default',['sass'], function () {
    gulp.watch('../src/sass/*.{sass,scss}', ['sass']);
});
