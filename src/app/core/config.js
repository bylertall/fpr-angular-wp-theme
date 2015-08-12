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
            },
            onEnter: function(smoothScroll) {
                var header = document.getElementById('main-header');
                smoothScroll(header, {duration: 100});
            }
        })

        .state('main.category', {
            url: '/category/:category/',
            templateUrl: 'layout/category/category.html',
            controller: 'Category as category',
            resolve: {
                categoryPrepService: categoryPrepService
            }
        });
}

instaPrepService.$inject = ['instaService'];

function instaPrepService(instaService) {
    return instaService.getInstaFeed();
}

feedPrepService.$inject = ['wpService'];

function feedPrepService(wpService) {
    return wpService.getAllPosts(1);
}

singlePostPrepService.$inject = ['wpService', '$stateParams'];

function singlePostPrepService(wpService, $stateParams) {
    return wpService.getSinglePost($stateParams.slug);
}

categoryPrepService.$inject = ['wpService', '$stateParams'];

function categoryPrepService(wpService, $stateParams) {
    console.log('Category service!');
    return wpService.getPostsByCategory($stateParams.category);
}