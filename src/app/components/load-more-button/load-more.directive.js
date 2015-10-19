angular
    .module('fprApp')
    .directive('fprLoadMore', fprLoadMore);

fprLoadMore.$inject = ['$state', '$stateParams', 'wpService'];

function fprLoadMore($state, $stateParams, wpService) {
    var directive = {
        restrict: 'E',
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

        if (currentState === 'category') {
            scope.noMoreResults = wpService.totalCategoryPosts <= 10;
        }

        if (currentState === 'tag') {
            scope.noMoreResults = wpService.totalTagPosts <= 10;
        }

        elem.on('click', function () {
            var tag, category;
            // do nothing if no more results
            if (scope.noMoreResults) {
                return;
            }

            switch (currentState) {
                case 'feed':
                    scope.loadingMorePosts = true;

                    wpService.getFeed().then(
                        function(res) {
                            if (res.length < 10) {
                                scope.noMoreResults = true;
                            }
                            scope.loadingMorePosts = false;
                        }
                    );
                    break;

                case 'category':
                    category = $stateParams.category;
                    scope.loadingMorePosts = true;

                    wpService.getPostsByCategory(category)
                        .then(function(res) {
                            scope.noMoreResults = res.data.length < 10;
                            scope.loadingMorePosts = false;
                        });
                    break;

                case 'tag':
                    tag = $stateParams.tag;
                    scope.loadingMorePosts = true;

                    wpService.getPostsByTag(tag)
                        .then(function(res) {
                            scope.noMoreResults = res.data.length < 10;
                            scope.loadingMorePosts = false;
                        });
                    break;

                default:
                    scope.loadingMorePosts = false;
                    scope.noMoreResults = false;
            }
        });
    }
}
