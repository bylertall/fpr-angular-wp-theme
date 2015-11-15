angular.module("fprApp").run(["$templateCache", function($templateCache) {$templateCache.put("core/404.html","<div class=not-found> <h1>Whoops, something went wrong...</h1> <div>Back to the <a href=\"/\">homepage</a> instead?</div> </div>");
$templateCache.put("components/comments/comment.html","<div class=comment-container> <button class=\"fpr-btn comment-btn\" ng-if=!comment.commentsReady ng-click=comment.showComments()>Leave a Comment</button> <div class=disqus-comment-count disqus-identifier=comment.disqusIdentifier></div> <div class=disqus-container> <div id=disqus_thread></div> <noscript>Please enable JavaScript to view the <a href=https://disqus.com/?ref_noscript rel=nofollow>comments powered by Disqus.</a></noscript> </div> </div> ");
$templateCache.put("components/insta-widget/insta-widget.html","<div class=insta-widget> <div class=insta-tile ng-repeat=\"photo in insta.feed | limitTo: insta.tileCount\"> <a href=http://instagram.com/hey_im_kate target=_blank> <div class=insta-caption-container> <i class=\"icon-instagram flaticon-instagram12\"></i> <div class=\"insta-likes insta-caption\"> <i class=\"icon-heart insta-caption-icon flaticon-favorite21\"></i> <span>{{::photo.likes.count}}</span> </div> <div class=\"insta-comments insta-caption\"> <i class=\"icon-comment insta-caption-icon flaticon-chat9\"></i> <span>{{::photo.comments.count}}</span> </div> </div> </a> <img fpr-insta-loaded class=insta-image nopin=nopin ng-src={{::photo.images.standard_resolution.url}}> </div> </div> ");
$templateCache.put("components/load-more-button/load-more.html","<div class=load-more-container> <button ng-hide=\"loadingMorePosts || noMoreResults\" class=load-more-posts>Load More Posts</button> <div ng-show=noMoreResults class=no-results>No more posts...</div> <chasing-dots-spinner ng-show=loadingMorePosts></chasing-dots-spinner> </div>");
$templateCache.put("components/loading-panel/loading-panel.html","<div class=\"loading-panel fade\" ng-if=viewIsLoading> <div class=loading-panel-inner> <div class=loading-title>FPR</div> <chasing-dots-spinner class=loading-spinner></chasing-dots-spinner> </div> </div>");
$templateCache.put("components/navigation/mobileMenu.modal.html","<div class=modal> <div class=modal-dialog> <div class=modal-content> <div class=modal-header> <i ng-click=$hide() class=\"close-icon flaticon-cross97\"></i> </div> <div class=\"modal-body ng-binding\"> <div class=\"modal nav-site\"> <ul class=\"modal nav-list\">  <li><a>About</a></li> <li><a>Contact</a></li> <li><a>Shop</a></li> <li><a>Featured</a></li> <li ui-sref=search><a>Search</a></li> </ul> </div> </div> <div class=modal-footer> <div class=nav-social-container> <div class=\"connect nav-social\"> <ul class=\"connect nav-list\"> <li class=twitter> <a href=https://twitter.com/hey_im_kate title=\"Follow on Twitter\" target=_blank> <i class=\"social-icon flaticon-twitter1\"></i> </a> </li> <li class=tumblr> <a href=http://thefancypantsreport.tumblr.com title=\"Follow on Tumblr\" target=_blank> <i class=\"social-icon flaticon-socialnetwork176\"></i> </a> </li> <li class=pinterest> <a href=http://pinterest.com/theFPR title=\"Follow on Pinterest\" target=_blank> <i class=\"social-icon flaticon-pinterest11\"></i> </a> </li> <li class=facebook> <a href=https://www.facebook.com/pages/The-Fancy-Pants-Report/336791056362033 title=\"Follow on Facebook\" target=_blank> <i class=\"social-icon flaticon-facebook31\"></i> </a> </li> <li class=bloglovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow title=\"Follow on BlogLovin\" target=_blank> <i class=\"social-icon flaticon-favorite21\"></i> </a> </li> <li class=instagram> <a href=http://instagram.com/hey_im_kate title=\"Follow on Instagram\" target=_blank> <i class=\"social-icon flaticon-instagram12\"></i> </a> </li> </ul> </div> </div> </div> </div> </div> </div> ");
$templateCache.put("components/navigation/navigation.html","<nav class=main-nav id=main-nav> <div class=nav-container fpr-affix offset-top=250 affix-to-top=true> <div class=blog-logo-container> <a class=blog-logo-link ui-sref=feed ui-sref-opts=\"{reload: true}\"> <img nopin=nopin class=blog-logo src=/wp-content/uploads/2015/07/FPR-logo-all-black1.png> </a> </div> <i class=\"mobile-menu-button flaticon-lines7\" ng-click=nav.showMenuModal()></i> <div class=nav-site> <ul class=nav-list>  <li><a>About</a></li> <li><a>Contact</a></li> <li><a>Shop</a></li> <li><a>Featured</a></li> <li ui-sref=search><a>Search</a></li> </ul> </div> <div class=nav-social> <ul class=nav-list> <li class=twitter> <a href=https://twitter.com/hey_im_kate title=\"Follow on Twitter\" target=_blank> <i class=\"social-icon flaticon-twitter1\"></i> </a> </li> <li class=tumblr> <a href=http://thefancypantsreport.tumblr.com title=\"Follow on Tumblr\" target=_blank> <i class=\"social-icon flaticon-socialnetwork176\"></i> </a> </li> <li class=pinterest> <a href=http://pinterest.com/theFPR title=\"Follow on Pinterest\" target=_blank> <i class=\"social-icon flaticon-pinterest11\"></i> </a> </li> <li class=facebook> <a href=https://www.facebook.com/pages/The-Fancy-Pants-Report/336791056362033 title=\"Follow on Facebook\" target=_blank> <i class=\"social-icon flaticon-facebook31\"></i> </a> </li> <li class=bloglovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow title=\"Follow on BlogLovin\" target=_blank> <i class=\"social-icon flaticon-favorite21\"></i> </a> </li> <li class=instagram> <a href=http://instagram.com/hey_im_kate title=\"Follow on Instagram\" target=_blank> <i class=\"social-icon flaticon-instagram12\"></i> </a> </li> </ul> </div> </div> </nav> ");
$templateCache.put("components/rewardstyle-widget/rewardstyle.html","<div class=shopthepost-widget data-widget-id={{rstyle.rsId}}> <div class=rs-adblock><img src=//assets.rewardstyle.com/images/search/350.gif onerror=\"this.parentNode.innerHTML=\\\'Disable your ad blocking software to view this content.\\\'\" style=\"width: 15px; height: 15px;\"> <noscript>JavaScript is currently disabled in this browser. Reactivate it to view this content.</noscript> </div> <div> </div></div>");
$templateCache.put("components/share/share.html","<div class=share fpr-affix offset-top=750 offset-unpin=1650> <a class=\"share-icon icon-twitter\" ng-href=\"https://twitter.com/share?text=Love%20this%20post%20from%20The%20Fancy%20Pants%20Report!&amp;url={{content.post.link}}\" onclick=\"window.open(this.href, \'twitter-share\', \'width=550,height=335\');return false;\"> <i class=\"social-icon flaticon-twitter1\"></i> </a> <a class=\"share-icon icon-facebook\" ng-href=\"https://www.facebook.com/sharer/sharer.php?u={{content.post.link}}\" onclick=\"window.open(this.href, \'facebook-share\',\'width=580,height=350\');return false;\"> <i class=\"social-icon flaticon-facebook31\"></i> </a> <a class=\"share-icon icon-tumblr\" ng-href=\"https://tumblr.com/share?url={{content.post.link}}\" onclick=\"window.open(this.href, \'tumblr-share\', \'width=490,height=530\');return false;\"> <i class=\"social-icon flaticon-socialnetwork176\"></i> </a> <a class=\"share-icon icon-pinterest\" null href=\"//www.pinterest.com/pin/create/button/\" data-pin-do=buttonBookmark data-pin-shape=round data-pin-height=32> <img src=//s-passets.pinimg.com/images/pidgets/pinit_bg_en_round_red_32_2.png> </a> </div> ");
$templateCache.put("layout/content/content.html","<article class=\"single-post fade\" ng-if=content.contentLoaded> <fpr-page-meta meta-description=\"{{::content.post.excerpt | htmlToPlaintext}}\" meta-title={{::content.post.title}} meta-img=\"{{::content.post.acf[\'featured_image\']}}\" meta-terms={{::content.post.terms.post_tag}}> </fpr-page-meta> <header class=post-header fpr-preload-bg=\"{{::content.post.acf[\'featured_image\']}}\"> <h1 class=post-title ng-bind-html=\"::content.post.title | uppercase\"></h1> </header> <section class=post-content>  <div ng-if=::!content.isFormatted class=old-post-content ng-bind-html=::content.oldFormatContent></div>  <div ng-if=::content.isFormatted> <div class=post-images ng-bind-html=::content.post.content></div> <div class=outfit-details ng-bind-html=\"::content.post.acf[\'outfit_details\']\"></div> <div class=main-copy ng-bind-html=\"::content.post.acf[\'main_copy\']\"></div> </div>  <div ng-if=::content.rewardstyleId class=rewardstyle-container> <h3 class=rewardstyle-title ng-bind-html=\"::content.post.acf[\'rewardstyle_title\']\"></h3> <reward-style rs-id={{::content.rewardstyleId}}></reward-style> </div> <div class=blog-lovin> <a href=http://www.bloglovin.com/en/blog/3440067/the-fancy-pants-report/follow target=_blank> <img src=/wp-content/uploads/2014/11/bloglovin-button.jpg alt=\"The Fancy Pants Report on Bloglovin\'\"> </a> </div> </section>  <fpr-comments></fpr-comments> <div class=post-footer> <span ng-bind-html=::content.post.title></span> <span class=pipe-divider> | </span> <time datetime=\"{{::content.post.date | date: \'yyyy-MM-dd\'}}\">{{::content.post.date | date: \'MMM d, yyyy\'}}</time> <div class=post-terms> <h4 class=post-categories>Categories: </h4> <span ng-repeat=\"category in content.categories\"> <a ng-href={{category.link}}>{{category.name | lowercase}}</a><span ng-if=!$last>, </span> </span> <span class=pipe-divider> | </span> <h4 class=post-tag>Tags: </h4> <span ng-repeat=\"tag in content.tags\"> <a ng-href={{tag.link}}>{{tag.name | lowercase}}</a><span ng-if=!$last>, </span> </span> </div> </div> </article> ");
$templateCache.put("layout/feed/feed.html","<fpr-page-meta></fpr-page-meta> <article class=\"feed fade\" ng-repeat=\"post in feed.posts track by $index\"> <header class=post-header fpr-preload-bg=\"{{::post.acf[\'featured_image\']}}\"> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2>   <button type=button class=\"fpr-btn read-more\"> <h4>Read More</h4> </button> </a>  <div ng-click=\"feed.rsWidget.toggle(post.acf[\'rewardstyle_id\'])\" class=shop-btn> <i class=flaticon-clothes17 alt=\"Shop the Post\"></i> </div> </header>  <div ng-if=\"post.acf[\'rewardstyle_id\'] === feed.rsWidget.activeId\" class=\"rs-widget-container am-fade-and-scale\"> <reward-style rs-id=\"{{::post.acf[\'rewardstyle_id\']}}\" class=rs-widget></reward-style> </div>   </article>  <fpr-load-more></fpr-load-more> ");
$templateCache.put("layout/search/search.html","<div id=search-outer> <fpr-page-meta meta-title=\"Search the FPR\" meta-description=\"Search Page\"> </fpr-page-meta> <div class=search-inner> <form role=search class=search-form> <label>Search:</label> <input id=search class=search-input type=text name=search ng-model=search.filter.s ng-keypress=search.getInitialResults($event)> </form> <div class=results-container ng-if=search.resultsActive> <div class=results-header-border> <h2 class=results-header>Search Results</h2> </div> <div class=results-error ng-show=search.noSearchStringError>You have to type something to search for!</div> <div class=results-error ng-if=search.showError>No posts found for: <span>{{search.currentSearchString}}</span></div> <div class=results-feed-container> <article class=\"feed fade results-tile\" ng-repeat=\"post in search.posts track by post.ID\"> <header class=post-header fpr-preload-bg=\"{{::post.acf[\'featured_image\']}}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=\"read-more fpr-btn\" ng-if=\"!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header> </article> </div>  <div class=load-more-container ng-hide=search.showError> <button class=load-more-posts ng-hide=\"search.loadingMorePosts || search.noMoreResults\" ng-click=search.getMoreResults()>Load More Posts</button> <div ng-show=search.noMoreResults class=no-results>No more results...</div> <chasing-dots-spinner ng-show=search.loadingMorePosts></chasing-dots-spinner> </div> </div> </div> </div> ");
$templateCache.put("layout/terms/category/category.html","<div class=results-header-border> <h2 class=results-header>Category Archives: {{::category.currentCategoryName}}</h2> </div> <div class=results-num-posts ng-if=!category.showError>Number of posts found: {{::category.numPosts}}</div> <div class=results-error ng-if=category.showError>No posts found for the tag: <span>{{::category.currentCategoryName}}</span></div> <div class=results-feed-container> <fpr-page-meta meta-title=\"Category: {{::category.currentCategoryName}}\" meta-description=\"Category Archives | Category Term: {{::category.currentCategoryName}}\"> </fpr-page-meta> <article class=\"feed fade results-tile\" ng-repeat=\"post in category.posts track by post.ID\"> <header class=post-header fpr-preload-bg=\"{{::post.acf[\'featured_image\']}}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=\"read-more fpr-btn\" ng-if=\"!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header> </article> </div>  <fpr-load-more></fpr-load-more> ");
$templateCache.put("layout/terms/tag/tag.html","<div class=results-header-border> <h2 class=results-header>Tag Archives: {{::tag.currentTagName}}</h2> </div> <div class=results-num-posts ng-if=!tag.showError>Number of posts found: {{::tag.numPosts}}</div> <div class=results-error ng-if=tag.showError>No posts found for the tag: <span>{{::tag.currentTagName}}</span></div> <div class=results-feed-container> <fpr-page-meta meta-title=\"Tag: {{::tag.currentTagName}}\" meta-description=\"Tag Archives | Tag Term: {{::tag.currentTagName}}\"> </fpr-page-meta> <article class=\"feed fade results-tile\" ng-repeat=\"post in tag.posts track by post.ID\"> <header class=post-header fpr-preload-bg=\"{{::post.acf[\'featured_image\']}}\"> <div fpr-post-date={{::post.date}}></div> <a class=post-title-link ng-href={{::post.link}}> <h2 class=post-title ng-bind-html=\"::post.title | uppercase\"></h2> <button type=button class=\"read-more fpr-btn\" ng-if=\"!post.acf[\'is_featured\']\"> <h4>Read More</h4> </button> </a> </header> </article> </div>  <fpr-load-more></fpr-load-more> ");}]);