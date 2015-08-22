angular
    .module('fprApp')
    .controller('Main', Main);

Main.$inject = ['$scope', '$state', 'smoothScroll'];

function Main($scope, $state, smoothScroll) {
    var vm = this,
        thisDate = new Date(),
        currentState = $state.current.name;

    vm.currentYear = thisDate.getFullYear();

    vm.isFeedView = (currentState === 'main.feed');

    $scope.$on('$stateChangeSuccess', function(event, toState) {
        var header = document.getElementById('main-header');
        smoothScroll(header, {duration: 1});

        if (toState.name === 'main.content') {
            return vm.isFeedView = false;
        }
        return vm.isFeedView = true;
    });
}
