var gulp = require('gulp');
var webpack = require('gulp-webpack');
var plugins = require('gulp-load-plugins')();

// gulp.task('default', function() {
//   return gulp.src('../src/js/*.jsx')
//     .pipe(webpack(require('../webpack.config.js')))
//     .pipe(gulp.dest('../www/'));
// });

gulp.task('sass', require('./tasks/sass')(gulp, plugins));

gulp.task('js', function() {
  return gulp.src('../src/js/*.jsx')
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest('../www/'));
});

gulp.task('default',['sass','js'], function () {
    gulp.watch('../src/sass/*.{sass,scss}', ['sass']);
});
