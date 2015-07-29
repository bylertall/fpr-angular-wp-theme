var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}),
    config = require('./gulp.config')(),
    del = require('del');


gulp.task('copy-php', function() {
    log('Copying PHP files to theme folder');

    return gulp
        .src(config.all_php)
        .pipe(gulp.dest(config.temp));
});

gulp.task('style', ['clean-style'], function() {
    log('Compiling Sass --> CSS');

    return gulp
        .src(config.main_style)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-style', function(done) {
    var files = config.temp + '**/*.css';

    clean(files, done);
});

gulp.task('sass-watcher', function() {
    gulp.watch([config.all_style], ['style']);
});

// Logging function
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

// Clean function
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));

    del(path, done);
}