angular
    .module('fprApp')
    .directive('fprLoadingPanel', fprLoadingPanel);

fprLoadingPanel.$inject = ['$rootScope', '$timeout'];

function fprLoadingPanel($rootScope, $timeout) {
    var directive = {
        restrict: 'AE',
        replace: true,
        templateUrl: 'components/loading-panel/loading-panel.html',
        scope: true,
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var body = angular.element(document.body),
            timer;

        scope.viewIsLoading = true;

        scope.$on('$stateChangeStart', function(event, toState) {
                scope.viewIsLoading = true;
                body.addClass('no-scroll');
        });

        $rootScope.$on('$viewContentLoaded', function() {
            if (timer) $timeout.cancel(timer);

            timer = $timeout(function () {
                scope.viewIsLoading = false;
                body.removeClass('no-scroll');
            }, 550);
        });
    }
}