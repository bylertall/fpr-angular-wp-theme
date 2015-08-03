module.exports = function() {
    var src = './src/';
    var appPath = src + 'app/';
    var stylePath = src + 'sass/';
    var wp_theme = './../../wordpress/wp-content/themes/fpr-blog/';


    var config = {
        /**
         * File Paths
         */
        src: src,

        all_style: stylePath + '*.scss',
        main_style: stylePath + 'style.scss',

        component_js: appPath + '/**/*.js',
        main_js: src + 'app.js',
        all_js: src + '**/*.js',
        core_folder: appPath + 'core/',

        all_php: src + '*.php',
        htmltemplates: appPath + '**/*.html',

        /**
         * wp folders
         */
        wp_theme: wp_theme,
        wp_assets: wp_theme + 'assets/',
        wp_bower: wp_theme + 'bower_components/',
        wp_partials: wp_theme + 'partials/',
        wp_js: wp_theme + 'js/',

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'fprApp',
                standAlone: false
            }
        },
    };

    return config;
};