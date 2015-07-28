(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('Main', Main);

    Main.$inject = ['$scope', '$state'];

    function Main($scope, $state) {
        var vm = this,
            thisDate = new Date(),
            currentState = $state.current.name;

        vm.currentYear = thisDate.getFullYear();

        vm.isFeedView = (currentState === 'main.feed');

        $scope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name === 'main.content') {
                return vm.isFeedView = false;
            }
            return vm.isFeedView = true;
        });
    }
})();