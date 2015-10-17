angular
    .module('fprApp')
    .directive('fprLoadingPanel', fprLoadingPanel);

fprLoadingPanel.$inject = ['$rootScope', 'wpService'];

function fprLoadingPanel($rootScope, wpService) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'components/loading-panel/loading-panel.html',
        scope: true,
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var body = angular.element(document.body),
            currentState;

        scope.viewIsLoading = true;

        // if user navigates directly to search state
        // hide loading on state change success
        scope.$on('$stateChangeSuccess', function(event, toState) {
            currentState = toState.name;

            if (currentState === 'search') {
                _hideLoading();
            }
        });

        // show loading on state change start to FEED, CATEGORY, or TAG states
        scope.$on('$stateChangeStart', function(event, toState) {
            // show loading if going to feed view and have not gotten posts from WP yet
            if (toState.name === 'feed' && !wpService.feed.length) {
                _showLoading();
            }

            // show loading on transition to category & tag views
            if (toState.name === 'category' || toState.name === 'tag') {
                _showLoading();
            }
        });

        $rootScope.$on('bgImageReady', _hideLoading);

        ////////////////////
        // Private functions
        ////////////////////
        function _showLoading() {
            scope.viewIsLoading = true;
            body.addClass('no-scroll');
        }

        function _hideLoading() {
            scope.viewIsLoading = false;
            body.removeClass('no-scroll');
        }
    }
}
