angular.module("fprApp").run(["$templateCache", function($templateCache) {$templateCache.put("main.html","<header id=main-header> <div fpr-insta-widget ng-if=main.isFeedView></div> <fpr-nav></fpr-nav> </header> <main class=ui-view-container> <div ui-view autoscroll=false class=view-content></div> <a href=# title=\"Scroll to Top\" class=scroll-top scroll-to=main-header bs-affix data-offset-top=1000> <i class=flaticon-chevron10></i> </a> </main> <footer class=main-footer> <div class=nav-social-container> <div id=connect>CONNECT</div> <div class=nav-social> <ul class=nav-list> <li class=twitter> <a href=https://twitter.com/hey_im_kate title=\"Follow on Twitter\" target=_blank> <i class=\"social-icon flaticon-twitter1\"></i> </a> </li> <li class=tumblr> <a href=http://thefancypantsreport.tumblr.com title=\"Follow on Tumblr\" target=_blank> <i class=\"social-icon flaticon-socialnetwork176\"></i> </a> </li> <li class=pinterest> <a href=http://pinterest.com/theFPR title=\"Follow on Pinterest\" target=_blank> <i class=\"social-icon flaticon-pinterest11\"></i> </a> </li> <li class=facebook> <a href=https://www.facebook.com/pages/The-Fancy-Pants-Report/336791056362033 title=\"Follow on Facebook\" target=_blank> <i class=\"social-icon flaticon-facebook31\"></i> </a> </li> <li class=bloglovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow title=\"Follow on BlogLovin\" target=_blank> <i class=\"social-icon flaticon-favorite21\"></i> </a> </li> <li class=instagram> <a href=http://instagram.com/hey_im_kate title=\"Follow on Instagram\" target=_blank> <i class=\"social-icon flaticon-instagram12\"></i> </a> </li> </ul> </div> </div> <div class=footer-disclaimer>The Fancy Pants Report &copy; {{::main.currentYear}} - All Rights Reserved</div> </footer>");
$templateCache.put("core/404.html","<div class=not-found> <h1>Whoops, something went wrong...</h1> <div>Back to the <a href=\"/\">homepage</a> instead?</div> </div>");
$templateCache.put("layout/content/content.html","<article class=single-post fpr-page-title={{::content.post.title}}> <header class=post-header ng-style=\"::content.post.acf[\'featured_image\'] && {\'background-image\': \'url(\' + content.post.acf[\'featured_image\'] + \')\'}\"> <div fpr-post-date={{::content.post.date}}></div> <h1 class=post-title ng-bind-html=\"::content.post.title | uppercase\"></h1> </header>  <section ng-if=!content.isFormatted class=post-content ng-bind-html=::content.oldFormatContent></section>  <section ng-if=content.isFormatted class=post-content> <div class=post-images ng-bind-html=::content.post.content></div> <div class=outfit-details ng-bind-html=\"::content.post.acf[\'outfit_details\']\"></div> <div class=main-copy ng-bind-html=\"::content.post.acf[\'main_copy\']\"></div> <div class=blog-lovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow target=_blank> <img src=/wp-content/uploads/2014/11/bloglovin-button.jpg alt=\"The Fancy Pants Report on Bloglovin\'\"> </a> </div> </section>  <div ng-if=content.hasRewardStyleId reward-style=\"{{::content.post.acf[\'rewardstyle_id\']}}\"></div>  <section class=share> <h4>Share this post</h4> <a class=icon-twitter ng-href=\"https://twitter.com/share?text=Love%20this%20post%20from%20The%20Fancy%20Pants%20Report!&amp;url={{content.post.link}}\" onclick=\"window.open(this.href, \'twitter-share\', \'width=550,height=335\');return false;\"> <i class=\"social-icon flaticon-twitter1\"></i> </a> <a class=icon-facebook ng-href=\"https://www.facebook.com/sharer/sharer.php?u={{content.post.link}}\" onclick=\"window.open(this.href, \'facebook-share\',\'width=580,height=350\');return false;\"> <i class=\"social-icon flaticon-facebook31\"></i> </a> <a class=icon-tumblr ng-href=\"https://tumblr.com/share?url={{content.post.link}}\" onclick=\"window.open(this.href, \'tumblr-share\', \'width=490,height=530\');return false;\"> <i class=\"social-icon flaticon-socialnetwork176\"></i> </a>    </section> <div class=post-footer> <span ng-bind-html=::content.post.title></span> <span class=pipe-divider> | </span> <time datetime=\"{{::content.post.date | date: \'yyyy-MM-dd\'}}\">{{::content.post.date | date: \'MMM d, yyyy\'}}</time> <div class=post-terms> <h4 class=post-categories>Categories: </h4> <span ng-repeat=\"category in content.categories\"> <a ng-href={{category.link}}>{{category.name | lowercase}}</a><span ng-if=!$last>, </span> </span> <span class=pipe-divider> | </span> <h4 class=post-tag>Tags: </h4> <span ng-repeat=\"tag in content.tags\"> <a ng-href={{tag.link}}>{{tag.name | lowercase}}</a><span ng-if=!$last>, </span> </span> </div> </div> </article>");
$templateCache.put("layout/feed/feed.html","<article class=feed ng-repeat=\"post in feed.posts\" fpr-page-title> <header class=post-header ng-style=\"::post.acf[\'featured_image\'] && {\'background-image\': \'url(\' + post.acf[\'featured_image\'] + \')\'}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=read-more-button ng-if=\"::!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header>  <section ng-if=\"post.acf[\'is_featured\']\" class=\"post-content featured-post\"> <div class=post-images ng-bind-html=::post.content></div> <div class=outfit-details ng-bind-html=\"::post.acf[\'outfit_details\']\"></div> <div class=main-copy ng-bind-html=\"::post.acf[\'main_copy\']\"></div> <div class=blog-lovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow target=_blank> <img src=/wp-content/uploads/2014/11/bloglovin-button.jpg alt=\"The Fancy Pants Report on Bloglovin\'\"> </a> </div> </section> </article>  <fpr-load-more></fpr-load-more>");
$templateCache.put("components/insta-widget/insta-widget.html","<div class=insta-widget> <div class=insta-tile ng-repeat=\"photo in insta.feed | limitTo: 6\"> <a href=http://instagram.com/hey_im_kate target=_blank> <div class=insta-caption-container> <img class=icon-instagram src=/wp-content/uploads/2015/07/instagram12.svg> <div class=\"insta-likes insta-caption\"> <img class=\"icon-heart insta-caption-icon\" src=/wp-content/uploads/2015/07/favorite21.svg> <span>{{::photo.likes.count}}</span> </div> <div class=\"insta-comments insta-caption\"> <img class=\"icon-comment insta-caption-icon\" src=/wp-content/uploads/2015/07/speech-bubble17.svg> <span>{{::photo.comments.count}}</span> </div> </div> </a> <img fpr-insta-loaded class=insta-image ng-src={{photo.images.low_resolution.url}}> </div> </div>");
$templateCache.put("components/navigation/navigation.html","<nav class=main-nav> <div class=nav-container> <div class=blog-logo-container> <a class=blog-logo-link ui-sref=main.feed> <img class=blog-logo src=/wp-content/uploads/2015/07/FPR-logo-all-black1.png> </a> </div> <div class=nav-site> <ul class=nav-list>  <li><a>About</a></li> <li><a>Contact</a></li> <li><a>Shop</a></li> <li><a>Featured</a></li> <li ui-sref=main.search><a>Search</a></li> </ul> </div> <div class=nav-social> <ul class=nav-list> <li class=twitter> <a href=https://twitter.com/hey_im_kate title=\"Follow on Twitter\" target=_blank> <i class=\"social-icon flaticon-twitter1\"></i> </a> </li> <li class=tumblr> <a href=http://thefancypantsreport.tumblr.com title=\"Follow on Tumblr\" target=_blank> <i class=\"social-icon flaticon-socialnetwork176\"></i> </a> </li> <li class=pinterest> <a href=http://pinterest.com/theFPR title=\"Follow on Pinterest\" target=_blank> <i class=\"social-icon flaticon-pinterest11\"></i> </a> </li> <li class=facebook> <a href=https://www.facebook.com/pages/The-Fancy-Pants-Report/336791056362033 title=\"Follow on Facebook\" target=_blank> <i class=\"social-icon flaticon-facebook31\"></i> </a> </li> <li class=bloglovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow title=\"Follow on BlogLovin\" target=_blank> <i class=\"social-icon flaticon-favorite21\"></i> </a> </li> <li class=instagram> <a href=http://instagram.com/hey_im_kate title=\"Follow on Instagram\" target=_blank> <i class=\"social-icon flaticon-instagram12\"></i> </a> </li> </ul> </div> </div> </nav> ");
$templateCache.put("components/load-more-button/load-more.html","<div class=load-more-container ng-show=postsAvailable> <button ng-hide=\"loadingMorePosts || noMoreResults\" class=load-more-posts>Load More Posts</button> <div ng-show=noMoreResults class=no-results>No more posts...</div> <chasing-dots-spinner ng-show=loadingMorePosts></chasing-dots-spinner> </div>");
$templateCache.put("components/postdate-widget/postdate-widget.html","<div class=date-widget> <div class=date-container> <div class=month>{{fprPostDate | date: \"MMM\" | uppercase}}</div> <div class=day>{{fprPostDate | date: \"d\"}}</div> </div> </div>");
$templateCache.put("components/search/search.html","<div id=search-outer fpr-page-title=Search> <div class=search-inner> <form role=search class=search-form> <label>Search:</label> <input class=search-input type=text name=search ng-model=search.filter.s ng-keypress=search.getInitialResults($event) autofocus> </form> <div class=results-container ng-if=search.resultsActive> <div class=results-header-border> <h2 class=results-header>Search Results</h2> </div> <div class=results-error ng-show=search.noSearchStringError>You have to type something to search for!</div> <div class=results-error ng-if=search.showError>No posts found for: <span>{{search.currentSearchString}}</span></div> <div class=results-feed-container> <article class=\"feed results-tile\" ng-repeat=\"post in search.posts\" fpr-page-title=\"Search FPR\"> <header class=post-header ng-style=\"::post.acf[\'featured_image\'] && {\'background-image\': \'url(\' + post.acf[\'featured_image\'] + \')\'}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=read-more-button ng-if=\"!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header> </article> </div>  <div class=load-more-container ng-hide=search.showError> <button class=load-more-posts ng-hide=\"search.loadingMorePosts || search.noMoreResults\" ng-click=search.getMoreResults()>Load More Posts</button> <div ng-show=search.noMoreResults class=no-results>No more results...</div> <chasing-dots-spinner ng-show=search.loadingMorePosts></chasing-dots-spinner> </div> </div> </div> </div> ");
$templateCache.put("layout/terms/tag/tag.html","<div class=results-header-border> <h2 class=results-header>Tag Archives: {{::tag.currentTagName}}</h2> </div> <div class=results-num-posts ng-if=!tag.showError>Number of posts found: {{::tag.numPosts}}</div> <div class=results-error ng-if=tag.showError>No posts found for the tag: <span>{{::tag.currentTagName}}</span></div> <div class=results-feed-container> <article class=\"feed results-tile\" ng-repeat=\"post in tag.posts\" fpr-page-title=\"Tag: {{::tag.currentTagName}}\"> <header class=post-header ng-style=\"::post.acf[\'featured_image\'] && {\'background-image\': \'url(\' + post.acf[\'featured_image\'] + \')\'}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=read-more-button ng-if=\"!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header> </article> </div>  <fpr-load-more></fpr-load-more>");
$templateCache.put("layout/terms/category/category.html","<div class=results-header-border> <h2 class=results-header>Category Archives: {{::category.currentCategoryName}}</h2> </div> <div class=results-num-posts ng-if=!category.showError>Number of posts found: {{::category.numPosts}}</div> <div class=results-error ng-if=category.showError>No posts found for the tag: <span>{{::category.currentCategoryName}}</span></div> <div class=results-feed-container> <article class=\"feed results-tile\" ng-repeat=\"post in category.posts\" fpr-page-title=\"Category: {{::category.currentCategoryName}}\"> <header class=post-header ng-style=\"::post.acf[\'featured_image\'] && {\'background-image\': \'url(\' + post.acf[\'featured_image\'] + \')\'}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=read-more-button ng-if=\"!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header> </article> </div>  <fpr-load-more></fpr-load-more>");}]);