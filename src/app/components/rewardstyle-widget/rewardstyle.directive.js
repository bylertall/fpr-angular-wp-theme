angular
    .module('fprApp')
    .directive('rewardStyle', rewardStyle);

function rewardStyle() {
    var directive = {
        restrict: 'AE',
        controller: 'rewardstyleController as rstyle',
        templateUrl: 'components/rewardstyle-widget/rewardstyle.html',
        scope: {},
        bindToController: {
            rsId: '@'
        }
    };

    return directive;
}
