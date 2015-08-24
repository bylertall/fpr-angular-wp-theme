angular
    .module('fprApp')
    .directive('fprNav', fprNav);

fprNav.$inject = ['$window', '$timeout'];

function fprNav($window, $timeout) {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'components/navigation/navigation.html',
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var elNavContainer = angular.element(document.querySelector('.nav-container')),
            window = angular.element($window),
            offsetTop = 0,
            timer;

        // if instaWidget is present, set offset height once it's loaded
        scope.$on('instaWidgetLoaded', function () {
            offsetTop = _getOffsetTop(elem);
        });

        // update offset on state change
        scope.$on('$stateChangeSuccess', function () {
            // if timer exists, cancel it so you don't have multiple instances running
            if (timer) {
                $timeout.cancel(timer);
            }
        });

        // adjust offset on window resize
        window.on('resize', function () {
            offsetTop = _getOffsetTop(elem);
        });

        // check position on scroll
        window.on('scroll', function () {
            timer = $timeout(
                function () {
                    if ($window.pageYOffset >= offsetTop) {
                        elNavContainer.addClass('fixed');
                    } else {
                        elNavContainer.removeClass('fixed');
                    }
                }, 100
            );
        });
    }
}

function _getOffsetTop(element) {
    return element[0].offsetTop;
}