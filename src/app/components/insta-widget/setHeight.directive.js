angular
    .module('fprApp')
    .directive('fprSetHeight', fprSetHeight);

fprSetHeight.$inject = ['$window'];

function fprSetHeight($window) {
    var directive = {
        restrict: 'A',
        link: link
    };

    function link(scope, elem, attr) {
        var w = angular.element($window);
        var bottomInstaEl = angular.element(document.querySelector('.bottom-insta-widget'));

        elem.css('height', calcHeight(w[0].innerWidth, !!attr.bottom) + 'px');

        w.bind('resize', function () {
            calcHeight(w[0].outerWidth, attr.margin)
            elem.css('height', calcHeight(w[0].innerWidth, !!attr.bottom) + 'px');
        });

        function calcHeight(width, isBottom) {
            if (width > 768) {
                if (isBottom) {
                    return bottomInstaEl[0].offsetWidth / 5;
                }
                return width / 6 - 3;
            } else {
                if (isBottom) {
                    return bottomInstaEl[0].offsetWidth / 3;
                }
                return width / 3 - 6;
            }
        }
    }

    return directive;
}
