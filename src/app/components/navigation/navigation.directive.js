angular
    .module('fprApp')
    .directive('fprNav', fprNav);

fprNav.$inject = ['$window'];

function fprNav($window) {
    var directive = {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/navigation/navigation.html',
        controller: 'NavigationController as nav'
    };

    return directive;
}
