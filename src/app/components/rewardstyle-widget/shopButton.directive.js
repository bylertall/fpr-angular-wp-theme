angular
    .module('fprApp')
    .directive('fprShopButton', fprShopButton);

function fprShopButton() {
    var directive = {
        scope: {},
        templateUrl: 'components/rewardstyle-widget/shopButton.html',
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {

    }
}