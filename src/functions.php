<?php

function my_scripts() {

	wp_register_script(
		'angularjs',
		get_template_directory_uri() . '/bower_components/angular/angular.min.js',
		array(), null, false
	);

	wp_register_script(
		'angularjs-ui-router',
        get_template_directory_uri() . '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        array(), null, false
	);

	wp_register_script(
		'angularjs-sanitize',
		get_template_directory_uri() . '/bower_components/angular-sanitize/angular-sanitize.min.js',
		array(), null, false
	);

	wp_register_script(
		'angular-smooth-scroll',
		get_template_directory_uri() . '/bower_components/ngSmoothScroll/angular-smooth-scroll.min.js',
		array(), null, false
	);

	wp_register_script(
		'angular-strap',
		get_template_directory_uri() . '/bower_components/angular-strap/dist/angular-strap.min.js',
		array(), null, false
	);

	wp_register_script(
		'angular-strap-tpl',
		get_template_directory_uri() . '/bower_components/angular-strap/dist/angular-strap.tpl.min.js',
		array(), null, false
	);

	wp_register_script(
		'reward-style',
		'http://widgets.rewardstyle.com/js/shopthepost.js',
		array(), null, false
	);

	wp_enqueue_script(
		'my-scripts',
		get_template_directory_uri() . '/js/app.js',
		array( 'angularjs', 'angularjs-ui-router', 'angularjs-sanitize', 'angular-smooth-scroll', 'angular-strap', 'angular-strap-tpl', 'reward-style')
	);

	wp_enqueue_style( 'flaticon.css', get_template_directory_uri() . '/assets/icons/flaticon.css' );

	wp_enqueue_style( 'angular-motion.css', get_template_directory_uri() . '/bower_components/angular-motion/dist/angular-motion.min.css' );

	wp_enqueue_style( 'style.css', get_stylesheet_uri() );

	wp_localize_script(
		'my-scripts',
		'WPAPI',
			array(
				'api_url' => json_url(),
				'api_nonce' => wp_create_nonce('wp_json')
			)
	);
}

add_action( 'wp_enqueue_scripts', 'my_scripts' );