'use strict';

angular.module('fprApp', ['ui.router', 'ngSanitize', 'smoothScroll', 'mgcrea.ngStrap'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
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
                    smoothScroll(header);
                }
            })
    })

.controller('Main', function($state, $scope) {
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
    })

.controller('Feed', function(WPService) {
        var vm = this;

        vm.posts = WPService.feed;
    })

.controller('Content', function(WPService) {
        var vm = this;

        vm.post = WPService.post;
        vm.categories = WPService.post.terms['category'];
        vm.tags = WPService.post.terms['post_tag'];

        vm.isFormatted = WPService.isFormatted;
        vm.oldFormatContent = WPService.trustedPostContent;
    })

.controller('InstaWidget', function(InstaService) {
        var vm = this;

        vm.feed = InstaService.feed;
    })

.directive('postDate', function() {
        return {
                scope: {
                    postDate: '@'
                },
                templateUrl: WPAPI.partials_url + 'post-date-widget.html'
        };


    })

.directive('instaWidget', function() {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'InstaWidget as insta',
            templateUrl: WPAPI.partials_url + 'insta-widget.html'
        }
    })

.directive('fprNav', function($window, $timeout) {
        function _getOffsetTop (element) {
            return element[0].offsetTop;
        }

        function link(scope, elem, attrs) {
            var elNavContainer = angular.element(document.querySelector('.nav-container')),
                window = angular.element($window),
                offsetTop = 0,
                timer;

            // if instaWidget is present, set offset height once it's loaded
            scope.$on('instaWidgetLoaded', function() {
                offsetTop = _getOffsetTop(elem);
            });

            // update offset on state change
            scope.$on('$stateChangeSuccess', function(event, toState) {
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
            window.on('resize', function() {
                offsetTop = _getOffsetTop(elem);
            });

            // check position on scroll
            window.on('scroll', function() {
                timer = $timeout(
                    function() {
                        if($window.pageYOffset >= offsetTop) {
                            elNavContainer.addClass('fixed');
                        } else {
                            elNavContainer.removeClass('fixed');
                        }
                    }, 100
                );
            });
        }

        return {
            restrict: 'EA',
            replace: true,
            templateUrl: WPAPI.partials_url + 'navigation.html',
            link: link
        }
    })

.directive('viewTitle', function() {
        var title = document.querySelector('title'),
            defaultTitle = "The Fancy Pants Report | A San Francisco Style Blog by Kate Ogata";

        return {
            restrict: 'EA',
            link: function(scope, elem, attrs) {

                if (attrs.pageTitle) {
                    return title.innerHTML = attrs.pageTitle + ' | The Fancy Pants Report';
                }
                return title.innerHTML = defaultTitle;
            }

        }
    })

.directive('imageLoaded', function() {
        return {
            link: link
        }

        function link(scope, elem, attrs) {
            if (scope.$first){
                elem.on('load', function() {
                    scope.$emit('instaWidgetLoaded');
                });
            }
        }
    })


// ------------------ Come back to pagination ------------------
//.directive('postsNavLink', function() {
//        return {
//            restrict: 'EA',
//            templateUrl: WPAPI.partials_api + 'posts-nav-link.html'
//        }
//    })