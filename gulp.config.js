module.exports = function() {
    var stylePath = './src/sass/';
    var appPath = './src/app/';

    var config = {
        temp: './tmp/',

        /**
         * File Paths
         */
        // all theme php files
        all_php: './*.php',


        all_style: stylePath + '*.scss',
        main_style: stylePath + 'style.scss',

        component_js: appPath + '/**/*.js',
        main_js: './src/app.js',
        
        all_html: appPath + '**/*.html',

        // wordpress theme directory
        wp_theme: './../../wordpress/wp-content/themes/fpr-blog/'
    };

    return config;
};