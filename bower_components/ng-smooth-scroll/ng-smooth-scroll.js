(function () {
    angular.module('ng-smooth-scroll', [])
    .directive('ngSmoothScroll', [function () {

        return {
            restrict: 'A',
            link: function (scope, element) {
                console.log('[smoothScrol] init');

                var trigger = angular.element('.scroll-to', element);

                trigger.on('click', function () {
                    var $this = angular.element(this),
                        targetHref = $this.attr('href'),
                        targetLocation = $("a[name=" + targetHref.slice(1) + "]");

                    $('html, body').animate({
                        scrollTop: targetLocation.offset().top
                    }, 800);

                    return false;
                });
            }
        }
    }]);
}());