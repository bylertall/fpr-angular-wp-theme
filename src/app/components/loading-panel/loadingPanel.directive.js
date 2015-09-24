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
        var body = angular.element(document.body);

        scope.viewIsLoading = true;

        scope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name === 'main.feed' && !wpService.feed.length) {
                scope.viewIsLoading = true;
                body.addClass('no-scroll');
            }
        });

        scope.$on('$stateChangeSuccess', function(event, toState){
            if(toState.name === 'main.search') {
                scope.viewIsLoading = false;
                body.removeClass('no-scroll');
            }
        });

        $rootScope.$on('bgImageReady', function() {
            scope.viewIsLoading = false;
            body.removeClass('no-scroll');
        });
    }
}