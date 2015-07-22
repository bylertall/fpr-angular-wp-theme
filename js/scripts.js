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

.controller('Main', function() {
        var vm = this,
            thisDate = new Date();

        vm.currentYear = thisDate.getFullYear();


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

.controller('InstaWidget', function($state, $rootScope, InstaService) {
        var vm = this,
            currentState = $state.current.name;

        vm.feed = InstaService.feed;
        vm.isFeedView = currentState === 'main.feed';

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name == 'main.content') {
                return vm.isFeedView = false;
            }
            return vm.isFeedView = true;
        })
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

.directive('fprNav', function($rootScope, $window, $timeout, $affix) {
        function _setAffix(elem) {
            $timeout(function() {
                var navContainer = elem.children(),
                    window = angular.element($window),
                    offset = 0;

                offset = elem[0].offsetTop.toString();

                console.log(offset);

                $affix(navContainer, {
                    offsetTop: offset,
                    offsetParent: '0',
                    target: window
                });
            }, 250);
        }

        return {
            restrict: 'EA',
            replace: true,
            templateUrl: WPAPI.partials_url + 'navigation.html',
            link: function(scope, elem, attrs) {
                _setAffix(elem);

                $rootScope.$on('$stateChangeSuccess', function() {
                    _setAffix(elem);
                })
            }
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

        };
    })


// ------------------ Come back to pagination ------------------
//.directive('postsNavLink', function() {
//        return {
//            restrict: 'EA',
//            templateUrl: WPAPI.partials_api + 'posts-nav-link.html'
//        }
//    })