'use strict';

angular.module('fprApp', ['ui.router', 'ngSanitize', 'smoothScroll'])

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

.controller('InstaWidget', function($rootScope, InstaService) {
        var vm = this;

        vm.feed = InstaService.feed;
        vm.isFeedView = true;

        $rootScope.$on('$stateChangeStart', function(event, toState) {
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

.directive('fprNav', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: WPAPI.partials_url + 'navigation.html'
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