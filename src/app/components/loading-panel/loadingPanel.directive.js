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
            currentState = '';

        scope.viewIsLoading = true;

        // if user navigates directly to search state
        // hide loading on state change success
        scope.$on('$stateChangeSuccess', function(event, toState) {
            currentState = toState.name;

            if (currentState === 'search' || currentState === '404') {
                _hideLoading();
            }
        });

        // show loading on state change start to FEED, CATEGORY, or TAG states
        scope.$on('$stateChangeStart', function(event, toState) {
            _showLoading();
        });

        $rootScope.$on('bgImageReady', _hideLoading);

        ////////////////////
        // Private functions
        ////////////////////
        function _showLoading() {
            scope.viewIsLoading = true;
            body.addClass('app-loading');
        }

        function _hideLoading() {
            scope.viewIsLoading = false;
            body.removeClass('app-loading');
        }
    }
}
