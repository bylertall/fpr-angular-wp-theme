angular
    .module('fprApp')
    .directive('fprShareButtons', fprShareButtons);

function fprShareButtons() {
    var directive = {
        scope: {},
        controller: 'shareController as share',
        templateUrl: 'components/share/share.html'
    };

    return directive;
}
