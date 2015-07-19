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
			<main ui-view></main>
			<footer class="main-footer">
				<div class="nav-social-container">
					<div id="connect">CONNECT</div>

					<div class="nav-social">
						<ul class="nav-list">
							<li class="twitter">
								<a href="https://twitter.com/hey_im_kate"title="Follow on Twitter" target="_blank">
									<img class="social-icon" src="/wp-content/uploads/2015/07/twitter1.svg" />
								</a>
							</li>
							<li class="tumblr">
								<a href="http://thefancypantsreport.tumblr.com" title="Follow on Tumblr" target="_blank">
									<img class="social-icon" src="/wp-content/uploads/2015/07/socialnetwork176.svg" />
								</a>
							</li>
							<li class="pinterest">
								<a href="http://pinterest.com/theFPR" title="Follow on Pinterest" target="_blank">
									<img class="social-icon" src="/wp-content/uploads/2015/07/pinterest11.svg" />
								</a>
							</li>
							<li class="facebook">
								<a href="https://www.facebook.com/pages/The-Fancy-Pants-Report/336791056362033" title="Follow on Facebook" target="_blank">
									<img class="social-icon" src="/wp-content/uploads/2015/07/facebook31.svg" />
								</a>
							</li>
							<li class="bloglovin">
								<a href="http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow" title="Follow on BlogLovin" target="_blank">
									<img class="social-icon" src="/wp-content/uploads/2015/07/favorite21.svg" />
								</a>
							</li>
							<li class="instagram">
								<a href="http://instagram.com/hey_im_kate" title="Follow on Instagram" target="_blank">
									<img class="social-icon" src="/wp-content/uploads/2015/07/instagram12.svg" />
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="footer-disclaimer">The Fancy Pants Report &copy; <?php echo date( 'Y' ); ?> - All Rights Reserved</div>
			</footer>
		</div>

		<?php wp_footer(); ?>
	</body>
</html>