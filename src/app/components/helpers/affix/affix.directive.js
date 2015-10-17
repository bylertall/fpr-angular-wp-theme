angular
    .module('fprApp')
    .directive('fprAffix', fprAffix);

fprAffix.$inject = ['$window', '$document', '$state'];

function fprAffix($window, $document, $state) {
    var directive = {
        scope: {
            offsetTop: '@',
            offsetBottom: '@',
            offsetUnpin: '@',
            affixToTop: '@'
        },
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var windowEl = angular.element($window),
            affixActive = false,
            offsetTop = +scope.offsetTop || 500,
            offsetBottom = +scope.offsetBottom || 0,
            offsetUnpin = +scope.offsetUnpin || 0,
            affixToTop = !!scope.affixToTop || false;

        scope.$on('$stateChangeSuccess', function() {
            windowEl.bind('scroll', scrollHandler);
        });

        function scrollHandler() {
            var windowYOffset = $window ? $window.pageYOffset : elem.scrollTop,
                parentDistanceFromTop = elem[0].parentElement.offsetTop,
                distanceFromBottom = $document[0].documentElement.offsetHeight - windowYOffset;

            if (affixToTop) {
                // add affix class if elem hits top of browser
                if (!affixActive && (windowYOffset > parentDistanceFromTop)) {
                    activateAffix();
                } else if (affixActive && (windowYOffset <= parentDistanceFromTop)) {
                    inactivateAffix();
                }
            } else {
                // add affix class if user has scrolled past offsetTop & haven't hit unpin
                // add to offsetUnpin height to avoid glitching during unpin
                if (!affixActive && (windowYOffset >= offsetTop && distanceFromBottom > (offsetUnpin + 250))) {
                    activateAffix();
                }

                // remove affix class if user hasn't scrolled past offsetTop
                if (affixActive && windowYOffset <= offsetTop) {
                    inactivateAffix();
                }

                // remove affix class if within unpin bottom area
                if (affixActive && (distanceFromBottom <= offsetUnpin)) {
                    inactivateAffix();
                }
            }

            function inactivateAffix() {
                affixActive = false;
                elem.removeClass('affix');
            }

            function activateAffix() {
                affixActive = true;
                elem.addClass('affix');
            }
        }
    }
}
