angular
    .module('fprApp')
    .directive('fprInstaWidget', fprInstaWidget);

function fprInstaWidget() {
    return {
        restrict: 'EA',
        scope: {},
        bindToController: {
            tileCount: '@'
        },
        controller: 'InstaWidget as insta',
        templateUrl: 'components/insta-widget/insta-widget.html'
    };
}
