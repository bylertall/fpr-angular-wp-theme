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
            controller: 'Main as main',
            resolve: {
                instaPrepService: instaPrepService
            }
        })
        .state('main.feed', {
            url: '/',
            templateUrl: 'layout/feed/feed.html',
            controller: 'Feed as feed',
            resolve: {
                feedPrepService: feedPrepService
            }
        })

        .state('main.content', {
            url: '/:year/:month/:day/:slug/',
            templateUrl: 'layout/content/content.html',
            controller: 'Content as content',
            resolve: {
                singlePostPrepService: singlePostPrepService
            }
        })

        .state('main.category', {
            url: '/category/:category/',
            templateUrl: 'layout/terms/category/category.html',
            controller: 'Category as category',
            resolve: {
                categoryPrepService: categoryPrepService
            }
        })

        .state('main.tag', {
            url: '/tag/:tag/',
            templateUrl: 'layout/terms/tag/tag.html',
            controller: 'Tag as tag',
            resolve: {
                tagPrepService: tagPrepService
            }
        })

        .state('main.search', {
            url: '/search',
            templateUrl: 'components/search/search.html',
            controller: 'Search as search'
        })

        .state('main.404', {
            url: '/404',
            templateUrl: 'core/404.html'
        });
}

instaPrepService.$inject = ['instaService'];

function instaPrepService(instaService) {
    return instaService.getInstaFeed();
}

feedPrepService.$inject = ['wpService'];

function feedPrepService(wpService) {
    if (wpService.feed.length) return;

    return wpService.getFeed();
}

singlePostPrepService.$inject = ['wpService', '$stateParams'];

function singlePostPrepService(wpService, $stateParams) {
    return wpService.getSinglePost($stateParams.slug);
}

categoryPrepService.$inject = ['wpService', '$stateParams'];

function categoryPrepService(wpService, $stateParams) {
    return wpService.getPostsByCategory($stateParams.category);
}

tagPrepService.$inject = ['wpService', '$stateParams'];

function tagPrepService(wpService, $stateParams) {
    return wpService.getPostsByTag($stateParams.tag);
}