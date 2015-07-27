<!DOCTYPE html>
<html <?php language_attributes();?>>
	<head>
		<base href="<?php $url_info = parse_url( home_url() ); echo trailingslashit( $url_info['path'] ); ?>">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>The Fancy Pants Report | A San Francisco Style Blog by Kate Ogata</title>
		<?php wp_head(); ?>
	</head>

	<body>
		<div class="angular-wrapper" ng-app="fprApp">
			<ui-view></ui-view>
		</div>

		<?php wp_footer(); ?>
	</body>
</html>