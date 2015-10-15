angular
    .module('fprApp')
    .controller('mainController', mainController);

mainController.$inject = ['$scope', '$window'];

function mainController($scope, $window) {
    var vm = this,
        thisDate = new Date();

    vm.currentYear = thisDate.getFullYear();
    // sets show/hide of sharing buttons
    vm.singlePostView = false;

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
            vm.singlePostView = false;
        }

        if (toState.name === 'content') {
            vm.singlePostView = true;
        } else {
            vm.singlePostView = false;
        }
    });
}
