angular.module('fprApp', ['ui.router', 'ngSanitize'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        //$urlRouterProvider.otherwise('/');

        $stateProvider
            .state('feed', {
                url: '/',
                templateUrl: WPAPI.partials_url + 'feed.html',
                controller: 'Feed as feed'

            })

            .state('content', {
                url: '/:year/:month/:day/:slug/',
                templateUrl: WPAPI.partials_url + 'content.html',
                controller: 'Content as content'
            })
    })

.controller('Feed', function($http) {
        var vm = this;

        $http.get(WPAPI.api_url + '/posts').success(function(res) {
            vm.posts = res;
            console.log(vm.posts);
        });

    })

.controller('Content', function($http, $stateParams) {
        var vm = this;

        $http.get(WPAPI.api_url + '/posts/?filter[name]=' + $stateParams.slug).success(function(res) {
            // filter returns an array of posts, only 1 should return
            vm.post = res[0];

            console.log(vm.post);
        });

    })
//
//.directive('headerBackground', function() {
//        return function(scope, element, attrs) {
//            attrs.$observe('headerBackground', function(url) {
//                element.css({
//                    'background-image': 'url(' + url + ')',
//                    'background-size': 'cover'
//                });
//            });
//
//
//        };
//
//    })