angular
    .module('fprApp')
    .directive('fprPostDate', fprPostDate);

function fprPostDate() {
    var directive = {
        scope: {
            fprPostDate: '@'
        },
        templateUrl: 'components/postdate-widget/postdate-widget.html'
    };

    return directive;
}