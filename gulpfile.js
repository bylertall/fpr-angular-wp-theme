var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}),
    config = require('./gulp.config')(),
    del = require('del');

// ***
// to be optimized: dev tasks, for working with WP
gulp.task('copy-assets', function() {
    log('Copying assets to theme folder');

    return gulp
        .src([
            './src/assets/**/*',
            './bower_components/**/*'
        ])
        .pipe(gulp.dest(config.temp + 'assets/'));
});

gulp.task('copy-php', function() {
    log('Copying PHP files to theme folder');

    return gulp
        .src(config.all_php)
        .pipe(gulp.dest(config.temp));
});



gulp.task('clean-temp', function (done) {
    log('Cleaning up temp folder...');
    var files = './tmp/';
    var options = {force: true};

    clean(files, options, done);
});

gulp.task('clean-wptheme', function (done) {
    log('Cleaning up wp theme folder...');
    var files = config.wp_theme;
    var options = {force: true};

    clean(files, options, done);
});

gulp.task('dev-clean', ['clean-temp', 'clean-wptheme'], function(done) {
    log('Dev cleanup running...')
});

// ***
// Style tasks
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

// ***
// JS tasks

gulp.task('js', function() {
    log('Building app.js');

    return gulp
        .src([config.main_js, config.component_js])
        .pipe($.jshint())
        //.pipe($.jscs())
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(config.temp + 'js/'));
});

// ***
// Html tasks ** TODO: update to templatecache

gulp.task('html', function() {
    log('Moving html files to partial fldr');
    log($.util.colors.red('TODO: use templatecache'));

    return gulp
        .src(config.all_html)
        .pipe(gulp.dest(config.temp + 'partials'));
});

gulp.task('dev', ['copy-assets', 'copy-php', 'style', 'js', 'html'], function() {
    log('Dev Build');

    return gulp
        .src(config.temp + '**/*')
        .pipe(gulp.dest(config.wp_theme));
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
function clean(path, options, done) {
    log('Cleaning: ' + $.util.colors.blue(path));

    del(path, options, done);
}