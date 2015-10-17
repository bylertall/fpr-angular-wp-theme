<!DOCTYPE html>
<html <?php language_attributes();?>>
	<head>
		<base href="<?php $url_info = parse_url( home_url() ); echo trailingslashit( $url_info['path'] ); ?>">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>The Fancy Pants Report | A San Francisco Style Blog by Kate Ogata</title>
		<?php wp_head(); ?>
	</head>

	<body class="no-scroll">
		<div class="angular-wrapper" ng-app="fprApp" ng-strict-di ng-controller="mainController as main">
			<fpr-loading-panel></fpr-loading-panel>

			<header id="main-header">
			    <fpr-insta-widget tile-count="6"></fpr-insta-widget>
			    <fpr-nav></fpr-nav>
			</header>

			<main class="ui-view-container">
			    <div class="view-content fade" ui-view></div>

				<!-- Share buttons -->
				<fpr-share-buttons ng-show="main.singlePostView"></fpr-share-buttons>

			    <a href="#" title="Scroll to Top" class="scroll-top" fpr-affix offset-top="1250" offset-unpin="1500">
			        <i class="flaticon-chevron10" scroll-to="main-header"></i>
			    </a>
			</main>

			<footer class="main-footer">
			    <div class="bottom-insta-widget">
			        <div class="insta-widget-header"><h3>More From Instagram</h3></div>
			        <fpr-insta-widget tile-count="15"></fpr-insta-widget>
			    </div>

			    <div class="nav-social-container">
			        <div id="connect">CONNECT</div>

			        <div class="connect nav-social">
			            <ul class="connect nav-list">
			                <li class="twitter">
			                    <a href="https://twitter.com/hey_im_kate" title="Follow on Twitter" target="_blank">
			                        <i class="social-icon flaticon-twitter1"></i>
			                    </a>
			                </li>
			                <li class="tumblr">
			                    <a href="http://thefancypantsreport.tumblr.com" title="Follow on Tumblr" target="_blank">
			                        <i class="social-icon flaticon-socialnetwork176"></i>
			                    </a>
			                </li>
			                <li class="pinterest">
			                    <a href="http://pinterest.com/theFPR" title="Follow on Pinterest" target="_blank">
			                        <i class="social-icon flaticon-pinterest11"></i>
			                    </a>
			                </li>
			                <li class="facebook">
			                    <a href="https://www.facebook.com/pages/The-Fancy-Pants-Report/336791056362033" title="Follow on Facebook" target="_blank">
			                        <i class="social-icon flaticon-facebook31"></i>
			                    </a>
			                </li>
			                <li class="bloglovin">
			                    <a href="http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow" title="Follow on BlogLovin" target="_blank">
			                        <i class="social-icon flaticon-favorite21"></i>
			                    </a>
			                </li>
			                <li class="instagram">
			                    <a href="http://instagram.com/hey_im_kate" title="Follow on Instagram" target="_blank">
			                        <i class="social-icon flaticon-instagram12"></i>
			                    </a>
			                </li>
			            </ul>
			        </div>
			    </div>

			    <div class="footer-disclaimer">The Fancy Pants Report &copy; {{::main.currentYear}} - All Rights Reserved</div>

			    <div ng-hide="true">Icons made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>, <a href="http://www.flaticon.com/authors/elegant-themes" title="Elegant Themes">Elegant Themes</a>, <a href="http://www.flaticon.com/authors/icomoon" title="Icomoon">Icomoon</a>, <a href="http://www.flaticon.com/authors/simpleicon" title="SimpleIcon">SimpleIcon</a>, <a href="http://www.flaticon.com/authors/catalin-fertu" title="Catalin Fertu">Catalin Fertu</a>, <a href="http://www.flaticon.com/authors/balraj-chana" title="Balraj Chana">Balraj Chana</a>, <a href="http://www.flaticon.com/authors/google" title="Google">Google</a>, <a href="http://www.flaticon.com/authors/anton-saputro" title="Anton Saputro">Anton Saputro</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
			</footer>
		</div>

		<?php wp_footer(); ?>
		<!-- Google Analytics -->
			<script>
				window.ga = window.ga || function() {
					(ga.q = ga.q || []).push(arguments)
				};
				ga.l = +new Date;
	//----- TODO: set ID below ------------------------------
				ga('create', 'UA-XXXXX-Y', 'auto');
			</script>
			<script async src='//www.google-analytics.com/analytics.js'></script>
		<!-- End Google Analytics -->
	</body>
</html>
