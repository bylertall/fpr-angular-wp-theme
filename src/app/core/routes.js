angular
    .module('fprApp')
    .config(Config);

Config.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

function Config($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('main', {
            abstract: true,
            templateUrl: 'main.html',
            controller: 'Main as main'
        })
        .state('main.feed', {
            url: '/',
            templateUrl: 'layout/feed/feed.html',
            controller: 'Feed as feed'
        })

        .state('main.content', {
            url: '/:year/:month/:day/:slug/',
            templateUrl: 'layout/content/content.html',
            controller: 'Content as content'
        })

        .state('main.category', {
            url: '/category/:category/',
            templateUrl: 'layout/terms/category/category.html',
            controller: 'Category as category'
        })

        .state('main.tag', {
            url: '/tag/:tag/',
            templateUrl: 'layout/terms/tag/tag.html',
            controller: 'Tag as tag'
        })

        .state('main.search', {
            url: '/search',
            templateUrl: 'layout/search/search.html',
            controller: 'Search as search'
        })

        .state('main.404', {
            url: '/404',
            templateUrl: 'core/404.html'
        });
}
