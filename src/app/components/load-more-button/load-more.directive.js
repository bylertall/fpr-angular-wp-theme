angular
    .module('fprApp')
    .directive('fprLoadMore', fprLoadMore);

fprLoadMore.$inject = ['$state', '$stateParams', 'wpService'];

function fprLoadMore($state, $stateParams, wpService) {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'components/load-more-button/load-more.html',
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        // use state.current.name to find state
        // use switch to run correct getMore function on click
        var currentState = $state.current.name;

        scope.loadingMorePosts = false;
        scope.noMoreResults = false;
        scope.postsAvailable = true;

        // if < 10 posts found, don't show load more
        switch (currentState) {
            case 'main.category':
                if (wpService.totalCategoryPosts <= 10) {
                    scope.postsAvailable = false;
                }
                break;

            case 'main.tag':
                if (wpService.totalTagPosts <= 10) {
                    scope.postsAvailable = false;
                }
                break;

            default:
                scope.postsAvailable = true;
        }

        elem.on('click', function () {
            // do nothing if no more results
            if (scope.noMoreResults) return;

            switch (currentState) {
                case 'main.feed':
                    scope.loadingMorePosts = true;

                    wpService.getFeed().success(
                        function(res) {
                            if (res.length < 10) {
                                scope.noMoreResults = true;
                            }
                            scope.loadingMorePosts = false;
                        }
                    );
                    break;

                case 'main.category':
                    var category = $stateParams.category;
                    scope.loadingMorePosts = true;

                    wpService.getPostsByCategory(category).success(
                        function(res) {
                            scope.noMoreResults = res.length < 10;
                            scope.loadingMorePosts = false;
                        }
                    );
                    break;

                case 'main.tag':
                    var tag = $stateParams.tag;
                    scope.loadingMorePosts = true;

                    wpService.getPostsByTag(tag).success(
                        function(res) {
                            scope.noMoreResults = res.length < 10;
                            scope.loadingMorePosts = false;
                        }
                    );
                    break;

                default:
                    scope.loadingMorePosts = false;
                    scope.noMoreResults = false;
            }
        });
    }
}