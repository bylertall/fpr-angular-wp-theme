(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprNav', fprNav);

    fprNav.$inject = ['$window', '$timeout'];

    function fprNav($window, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: WPAPI.partials_url + 'components/navigation/navigation.html',
            link: link
        };

        return directive;

        function _getOffsetTop(element) {
            return element[0].offsetTop;
        }

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
            scope.$on('$stateChangeSuccess', function (event, toState) {
                // if timer exists, cancel it so you don't have multiple instances running
                if (timer) {
                    $timeout.cancel(timer);
                }

                // if moving to content view, set offset to 0
                //otherwise:
                // remove fixed class so that the nav bar isn't stuck
                // and measure new offset
                if (toState.name === 'main.content') {
                    offsetTop = 0;
                } else {
                    elNavContainer.removeClass('fixed');
                    offsetTop = _getOffsetTop(elem);
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
})();