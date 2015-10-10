angular
    .module('fprApp')
    .controller('Main', Main);

Main.$inject = ['$scope', '$window', 'smoothScroll'];

function Main($scope, $window, smoothScroll) {
    var vm = this,
        thisDate = new Date();

    vm.currentYear = thisDate.getFullYear();

    $scope.$on('$stateChangeSuccess', function(event, toState) {
        var instaWidget = angular.element(document.querySelector('.insta-widget')),
            navOffsetHeight = 0;

        // find offset height of tag: fprnav
        // then scroll to when state is main.content & instaWidget is not undefined
        if (toState.name === 'content' && instaWidget[0]) {
            navOffsetHeight = instaWidget[0].clientHeight;
            $window.scrollTo(0, navOffsetHeight);
        } else {
            $window.scrollTo(0, 0);
        }
    });
}
