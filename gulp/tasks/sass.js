var sass = require('gulp-sass');

module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('../src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../www/css'));
    };
};
