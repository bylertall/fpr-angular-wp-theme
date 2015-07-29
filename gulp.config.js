module.exports = function() {
    var stylePath = './src/sass/';
    var jsPath = './src/app/';

    var config = {
        temp: './tmp',

        /**
         * File Paths
         */
        // all theme php files
        all_php: './*.php',


        all_style: stylePath + '*.scss',
        main_style: stylePath + 'style.scss',

        all_js: jsPath + '**/*.js',

        // wordpress theme directory
        wp_theme: '../../wordpress/wp-content/themes/fpr-blog'
    };

    return config;
};