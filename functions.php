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
	);d

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

	wp_enqueue_script(
		'my-scripts',
		get_template_directory_uri() . '/js/scripts.js',
		array( 'angularjs', 'angularjs-ui-router', 'angularjs-sanitize', 'angular-smooth-scroll' )
	);

	wp_enqueue_script(
		'wp-service',
		get_stylesheet_directory_uri() . '/js/WPService.js'
	);

	wp_enqueue_script(
		'insta-service',
		get_stylesheet_directory_uri() . '/js/InstaService.js'
	);

	wp_enqueue_style( 'style.css', get_stylesheet_uri() );

	wp_localize_script(
		'my-scripts',
		'WPAPI',
			array(
				'api_url' => json_url(),
				'api_nonce' => wp_create_nonce('wp_json'),
				'partials_url' => trailingslashit( get_template_directory_uri() ) . 'partials/'
			)
	);
}

add_action( 'wp_enqueue_scripts', 'my_scripts' );


function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');
?>