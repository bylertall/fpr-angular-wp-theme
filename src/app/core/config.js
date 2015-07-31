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
                    instaPrepService: instaPrepService
                }
            })
            .state('main.feed', {
                url: '/',
                templateUrl: WPAPI.partials_url + 'layout/feed/feed.html',
                controller: 'Feed as feed',
                resolve: {
                    postPrepService: postPrepService
                }
            })

            .state('main.content', {
                url: '/:year/:month/:day/:slug/',
                templateUrl: WPAPI.partials_url + 'layout/content/content.html',
                controller: 'Content as content',
                resolve: {
                    dataPost: function(wpService, $stateParams) {
                        return wpService.singlePost($stateParams.slug);
                    }
                },
                onEnter: function(smoothScroll) {
                    var header = document.getElementById('main-header');
                    smoothScroll(header, {duration: 800});
                }
            });
    }

    instaPrepService.$inject = ['instaService'];
    function instaPrepService (instaService) {
        return instaService.getInstaFeed();
    }

    postPrepService.$inject = ['wpService'];
    function postPrepService (wpService) {
        console.log('Post prep service!');
        return wpService.getAllPosts(1);
    }
})();