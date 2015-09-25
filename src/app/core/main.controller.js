angular
    .module('fprApp')
    .controller('Main', Main);

Main.$inject = ['$scope', 'smoothScroll'];

function Main($scope, smoothScroll) {
    var vm = this,
        thisDate = new Date();

    vm.currentYear = thisDate.getFullYear();

    $scope.$on('$stateChangeSuccess', function(event, toState) {
        var header = document.getElementById('main-header'),
            nav = document.getElementById('main-nav');

        // if going to content page, scroll to nav (so instawidget is not visible)
        // otherwise scroll all the way to top
        if (toState.name === 'main.content') {
            smoothScroll(nav, {duration: 1});
        } else if (toState.name !== 'main.feed') {
            smoothScroll(header, {duration: 1});
        }
    });
}