var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}),
    browserSync = require('browser-sync'),
    config = require('./gulp.config')(),
    del = require('del');

////////////////////////////////////////////////////////
// ASSET TASKS  ////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('copy-assets', ['clean-assets'], function() {
    log('Copying assets to theme folder');

    return gulp
        .src('./src/assets/**/*')
        .pipe(gulp.dest(config.wp_assets));
});

gulp.task('clean-assets', function(done) {
    log('Cleaning wp assets folder');
    var options = {force: true};

    clean(config.wp_assets, options, done);
});

////////////////////////////////////////////////////////
// WATCH TASKS  ////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('copy-bower', ['clean-bower'], function() {
    log('Copying bower components to theme folder');

    return gulp
        .src('./bower_components/**/*')
        .pipe(gulp.dest(config.wp_bower));
});

gulp.task('clean-bower', function(done) {
    log('Cleaning bower components');
    var options = {force: true};

    clean(config.wp_bower, options, done);
});

////////////////////////////////////////////////////////
// PHP TASKS  //////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('copy-php', ['clean-php'], function() {
    log('Copying PHP files to theme folder');

    return gulp
        .src(config.all_php)
        .pipe(gulp.dest(config.wp_theme));
});

gulp.task('clean-php', function(done) {
    log('Clean php files');
    var files = config.wp_theme + '*.php',
        options = {force: true};

    clean(files,options, done);
});

////////////////////////////////////////////////////////
// STYLE TASKS  ////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('style', ['clean-style'], function() {
    log('Compiling Sass --> CSS');

    return gulp
        .src(config.main_style)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulp.dest(config.wp_theme));
});

gulp.task('clean-style', function(done) {
    var files = config.wp_theme + 'style.css',
        options = {force: true};

    clean(files, options, done);
});

////////////////////////////////////////////////////////
// JAVASCRIPT TASKS  ///////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('js', ['clean-js', 'templatecache'], function() {
    log('Building app.js');

    return gulp
        .src([config.main_js, config.component_js])
        .pipe($.iife({
            prependSemicolon: false
        }))
        //TODO: add linting & style check somewhere else
        // .pipe($.jshint())
        // .pipe($.jscs())
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(config.wp_js));
});

gulp.task('clean-js', function(done) {
    log('Clean app.js');
    var files = config.wp_theme + 'js/app.js',
        options = {force: true};

    clean(files, options, done);
});

////////////////////////////////////////////////////////
// HTML TASKS  /////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('templatecache', ['clean-templatecache'], function() {
    log('Creating an AngularJS $templateCache');

    var minifyOptions = {
        empty: true,
        loose: true
    };

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml(minifyOptions))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.core_folder));
});

gulp.task('clean-templatecache', function(done) {
    log('Cleaning templatecache');
    var file = config.core_folder + 'templates.js';

    clean(file, done);
});

gulp.task('copy-partials', ['clean-partials'], function() {
    log('Copying partials to theme folder');

    return gulp
        .src(config.htmltemplates)
        .pipe(gulp.dest(config.wp_theme + '/partials'));
});

gulp.task('clean-partials', function(done) {
    log('Cleaning partials folder');
    var files = config.wp_partials,
        options = {force: true};

    clean(files, options, done);
});

////////////////////////////////////////////////////////
// WATCH TASKS  ////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('php-watcher', function() {
    gulp.watch([config.all_php], ['copy-php']);
});

gulp.task('style-watcher', function() {
    gulp.watch([config.all_style], ['style']);
});

gulp.task('js-watcher', function() {
    gulp.watch([config.all_js], ['js']);
});

gulp.task('html-watcher', function() {
    gulp.watch([config.htmltemplates], ['js', 'copy-partials']);
});

////////////////////////////////////////////////////////
// BUILD TASKS  ////////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('serve', [
        'copy-assets',
        'copy-bower',
        'copy-php',
        'style',
        'js',
        'copy-partials',
        'style-watcher',
        'php-watcher',
        'html-watcher',
        'js-watcher'
    ],
    function() {
        startBrowserSync().init();
        log('Dev Build Complete, watching js, css, html...');
    });

//////////////////////////////////////////

////////////////////////////////////////////////////////
// BROWSER SYNC  ///////////////////////////////////////
////////////////////////////////////////////////////////
gulp.task('browserSync', function() {
    startBrowserSync().init()
});

function startBrowserSync() {
    var port = 8888;

    if (browserSync.active) {
        return;
    }

    log('Starting browser-sync on port: ' + port);

    var options = {
        port: 8888,
        files: [
            config.wp_theme
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: false,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    }

    browserSync(options);
}

////////////////////////////////////////////////////////
// LOGGING  ////////////////////////////////////////////
////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////
// CLEAN  //////////////////////////////////////////////
////////////////////////////////////////////////////////
function clean(path, options, done) {
    log('Cleaning: ' + $.util.colors.blue(path));

    del(path, options, done);
}
