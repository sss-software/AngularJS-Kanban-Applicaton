/**
 * Gulpfile
 */
var gulp = require('gulp');
var minify = require('gulp-minify');
var ngAnnotate = require('gulp-ng-annotate');
var webserver = require('gulp-webserver');

gulp.task('min', ['annotate'], function () {
    gulp.src('./dist/js/*.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            exclude: ['libs'],
            noSource: true
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('annotate', function () {
    return gulp.src('./assets/js/modules/*.js')
        .pipe(ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest('dist/js'));
});

/**
 * Live Reload Server
 */

gulp.task('serve', ['annotate', 'min'], function () {
    return gulp.src('./')
        .pipe(webserver({
            fallback: './index.html',
            port: 3000,
            open: true,
            livereload: true
        }));
});