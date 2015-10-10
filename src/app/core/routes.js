angular
    .module('fprApp')
    .config(Config);

Config.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

function Config($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('feed', {
            url: '/',
            templateUrl: 'layout/feed/feed.html',
            controller: 'Feed as feed'
        })

        .state('content', {
            url: '/:year/:month/:day/:slug/',
            templateUrl: 'layout/content/content.html',
            controller: 'Content as content'
        })

        .state('category', {
            url: '/category/:category/',
            templateUrl: 'layout/terms/category/category.html',
            controller: 'Category as category'
        })

        .state('tag', {
            url: '/tag/:tag/',
            templateUrl: 'layout/terms/tag/tag.html',
            controller: 'Tag as tag'
        })

        .state('search', {
            url: '/search',
            templateUrl: 'layout/search/search.html',
            controller: 'Search as search'
        })

        .state('404', {
            url: '/404',
            templateUrl: 'core/404.html'
        })
}
