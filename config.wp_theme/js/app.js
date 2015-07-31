'use strict';

angular.module('fprApp').factory('WPService', function ($http, $sce) {
    var WPService = {
        feed: [],
        post: {},
        isFormatted: false,
        trustedPostContent: undefined,
        categories: [],
        currentPage: 1,
        totalPages: 1
    };

    function _isFormatted(post) {
        // check if WP-ACF is set for post
        // if not, run post.content through $sce.trustAsHtml

        if (post.acf['main_copy'] !== '') {
            return WPService.isFormatted = true;
        }

        WPService.trustedPostContent = $sce.trustAsHtml(post.content);
        return WPService.isFormatted = false;
    }

    WPService.getAllPosts = function(page) {
        var postArrayLength = WPService.feed.length;

        // only get if feed is empty
        if (!postArrayLength) {
            return $http.get(WPAPI.api_url + '/posts/?page=' + page + '?post_format=image')
                .success(function(res) {
                    WPService.feed = res;
                    console.log(WPService.feed);
            });
        }
    };

    WPService.singlePost = function(slug) {
        var i,
            postArrayLength = WPService.feed.length;

        if (postArrayLength) {
            for (i = 0; i < postArrayLength; i++) {
                if (WPService.feed[i].slug === slug) {
                    WPService.post = WPService.feed[i];
                    return _isFormatted(WPService.post);
                }
            }
        }

        return $http.get(WPAPI.api_url + '/posts/?filter[name]=' + slug)
            .success(function(res) {
                // filter returns an array of posts, only 1 should return
                WPService.post = res[0];
                _isFormatted(WPService.post);
            });


    };

    //WPService.getAllCategories = function() {
    //    if (WPService.categories.length) {
    //        return;
    //    }
    //
    //    return $http.get(WPAPI.api_url + '/taxonomies/categories/terms')
    //        .success(function(res) {
    //            WPService.categories = res;
    //        });
    //
    //};

    return WPService;
});
(function() {
    'use strict';

    angular
        .module('fprApp')
        .config(Config);

    Config.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

    function Config($locationProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: WPAPI.partials_url + 'main.html',
                controller: 'Main as main',
                resolve: {
                    dataInsta: function(InstaService) {
                        return InstaService.getInstaFeed();
                    }
                }
            })
            .state('main.feed', {
                url: '/',
                templateUrl: WPAPI.partials_url + 'feed.html',
                controller: 'Feed as feed',
                resolve: {
                    dataFeed: function(WPService) {
                        return WPService.getAllPosts(1);
                    }
                }
            })

            .state('main.content', {
                url: '/:year/:month/:day/:slug/',
                templateUrl: WPAPI.partials_url + 'content.html',
                controller: 'Content as content',
                resolve: {
                    dataPost: function(WPService, $stateParams) {
                        return WPService.singlePost($stateParams.slug);
                    }
                },
                onEnter: function(smoothScroll) {
                    var header = document.getElementById('main-header');
                    smoothScroll(header, {duration: 800});
                }
            });
    }
})();


.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

})
(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('Main', Main);

    Main.$inject = ['$scope', '$state'];

    function Main($scope, $state) {
        var vm = this,
            thisDate = new Date(),
            currentState = $state.current.name;

        vm.currentYear = thisDate.getFullYear();

        vm.isFeedView = (currentState === 'main.feed');

        $scope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name === 'main.content') {
                return vm.isFeedView = false;
            }
            return vm.isFeedView = true;
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprPageTitle', fprPageTitle);

    function fprPageTitle() {
        var directive = {
            restrict: 'EA',
            link: link
        };

        return directive;
    }

    function link(scope, elem, attrs) {
        var title = document.querySelector('title'),
            defaultTitle = "The Fancy Pants Report | A San Francisco Style Blog by Kate Ogata";

        if (attrs.pageTitle) {
            return title.innerHTML = attrs.pageTitle + ' | The Fancy Pants Report';
        }
        return title.innerHTML = defaultTitle;
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('Content', Content);

    Content.$inject = ['WPService'];

    function Content(WPService) {
        var vm = this;

        vm.post = WPService.post;
        vm.categories = WPService.post.terms['category'];
        vm.tags = WPService.post.terms['post_tag'];

        vm.isFormatted = WPService.isFormatted;
        vm.oldFormatContent = WPService.trustedPostContent;
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('Feed', Feed);

    Feed.$inject = ['WPService'];

    function Feed(WPService) {
        var vm = this;
        vm.posts = WPService.feed;
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprNav', fprNav);

    fprNav.$inject = ['$window', '$timeout'];

    function fprNav($window, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: WPAPI.partials_url + 'navigation.html',
            link: link
        };

        return directive;
    }

    function _getOffsetTop (element) {
        return element[0].offsetTop;
    }

    function link(scope, elem, attrs) {
        var elNavContainer = angular.element(document.querySelector('.nav-container')),
            window = angular.element($window),
            offsetTop = 0,
            timer;

        // if instaWidget is present, set offset height once it's loaded
        scope.$on('instaWidgetLoaded', function () {
            offsetTop = _getOffsetTop(elem);
        });

        // update offset on state change
        scope.$on('$stateChangeSuccess', function (event, toState) {
            // if timer exists, cancel it so you don't have multiple instances running
            if (timer) {
                $timeout.cancel(timer);
            }

            // if moving to content view, set offset to 0
            //otherwise:
            // remove fixed class so that the nav bar isn't stuck
            // and measure new offset
            if (toState.name === 'main.content') {
                offsetTop = 0;
            } else {
                elNavContainer.removeClass('fixed');
                offsetTop = _getOffsetTop(elem);
            }
        });

        // adjust offset on window resize
        window.on('resize', function () {
            offsetTop = _getOffsetTop(elem);
        });

        // check position on scroll
        window.on('scroll', function () {
            timer = $timeout(
                function () {
                    if ($window.pageYOffset >= offsetTop) {
                        elNavContainer.addClass('fixed');
                    } else {
                        elNavContainer.removeClass('fixed');
                    }
                }, 100
            );
        });
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprPostDate', fprPostDate);

    function fprPostDate() {
        var directive = {
            scope: {
                postDate: '@'
            },
            templateUrl: WPAPI.partials_url + 'post-date-widget.html'
        };

        return directive;
    }
})();
'use strict';

angular.module('fprApp').factory('InstaService', function($http) {
    var InstaService = {
        feed: []
    };

    InstaService.getInstaFeed = function() {
        // only get if feed is empty
        if (!InstaService.feed.length) {
            return $http.jsonp('https://api.instagram.com/v1/users/8382535/media/recent/?client_id=b2df96d07b1f4851ab7ddd155d35de11', {
                params: {
                    count: 24,
                    callback: 'JSON_CALLBACK'
                }
            }).success(function(res) {
               InstaService.feed = res.data;
            });
        }
        return;
    }

    return InstaService;

})
(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprInstaLoaded', fprInstaLoaded);

    function fprInstaLoaded() {
        return {
            link: link
        }
    }

    function link(scope, elem, attrs) {
        if (scope.$first){
            elem.on('load', function() {
                scope.$emit('instaWidgetLoaded');
            });
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('InstaWidget', InstaWidget);

    InstaWidget.$inject = ['InstaService'];

    function InstaWidget(InstaService) {
        var vm = this;

        vm.feed = InstaService.feed;
    }
})();
(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprInstaWidget', fprInstaWidget);

    function fprInstaWidget() {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'InstaWidget as insta',
            templateUrl: WPAPI.partials_url + 'insta-widget.html'
        }
    }
})();