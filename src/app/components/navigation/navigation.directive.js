angular
    .module('fprApp')
    .directive('fprNav', fprNav);

fprNav.$inject = ['$window', '$timeout'];

function fprNav($window, $timeout) {
    var directive = {
        restrict: 'EA',
        templateUrl: 'components/navigation/navigation.html',
        controller: 'NavigationController as nav',
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var elNavContainer = angular.element(document.querySelector('.nav-container')),
            window = angular.element($window),
            offsetTop = 200,
            timer;

        scope.$on('$stateChangeStart', function() {
            if (timer) {
                $timeout.cancel(timer);
                console.log('canceled timer');
            }
        });

        // adjust offset on window resize
        window.on('resize', function () {
            offsetTop = _getOffsetTop(elem);
        });

        // check position on scroll
        window.on('scroll', function () {
            timer = $timeout(function() {
                if (offsetTop === 0) {
                    offsetTop = _getOffsetTop(elem);
                }

                if ($window.pageYOffset >= offsetTop) {
                    elNavContainer.addClass('fixed');
                } else {
                    elNavContainer.removeClass('fixed');
                }
            }, 250);
        });

        function _getOffsetTop(element) {
            return element[0].offsetTop;
        }
    }
}
