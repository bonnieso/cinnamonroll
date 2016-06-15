var gulp = require('gulp');
var webpack = require('gulp-webpack');
var plugins = require('gulp-load-plugins')();

gulp.task('sass', require('./tasks/sass')(gulp, plugins));

gulp.task('sass-watch', function() {
  gulp.watch('../src/sass/*.{sass,scss}', ['sass']);
});

gulp.task('js', function() {
  return gulp.src('../src/js/*.jsx')
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('../www/'));
});

gulp.task('default',['sass-watch','js'], function () {
});
